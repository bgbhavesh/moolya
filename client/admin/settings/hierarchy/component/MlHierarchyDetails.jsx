import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
var Select = require('react-select');
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
import {findDeptAndsubDeptActionHandler} from '../actions/findDeptAndsubDeptAction';
import MlAssignHierarchy from './MlAssignHierarchy';
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import formHandler from '../../../../commons/containers/MlFormHandler';
import {updateRolesActionHandler} from '../actions/updateRolesAction'
import {updateHierarchyAssignmentsActionHandler} from '../actions/updateFinalApprovalAction'
import {OnToggleSwitch,initalizeFloatLabel,passwordVisibilityHandler} from '../../../utils/formElemUtil';

export default class MlHierarchyDetails extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      loading:true,data:{},
      hierarchyInfo:[{departmentId:'',departmentName:'',subDepartmentId:'',subDepartmentName:'',isMoolya:''}],
      unassignedRoles:[],
      assignedRoles:[],
      finalApproval:null,
      isExpanded:false
    }
    return this;
  }
  componentDidUpdate(){
    OnToggleSwitch(true,true);
  }
  getAssignRoleDetails(details){
    console.log(details);
    this.setState({'assignedRoles':details})
  }
  getUnAssignRoleDetails(details){
    console.log(details);
    this.setState({'unassignedRoles':details})
  }
  getFinalApprovalRole(details){
    console.log(details);
    this.setState({'finalApproval':details})
  }
  getFinalApprovalDetails(details){
    this.setState({'finalApproval':details})
  }
  componentDidMount() {
    $('.switch input').change(function() {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      } else {
        $(this).parent('.switch').removeClass('on');
      }
    });
  }

  componentWillMount(){
   const resp=this.findDeptAndsubDept();
    return resp;
  }
  async findDeptAndsubDept(){
    let clusterId = this.props.clusterId;
    const response = await findDeptAndsubDeptActionHandler(clusterId);
    if(response){
      let hierarchyInfo=[];
      for (let i = 0; i < response.length; i++) {
        let json = {
          departmentId: response[i].departmentId,
          departmentName:response[i].departmentName,
          subDepartmentId:response[i].subDepartmentId,
          subDepartmentName:response[i].subDepartmentName,
          isMoolya:response[i].isMoolya,
          isActive:response[i].isActive
        }
        hierarchyInfo.push(json)
      }
      this.setState({hierarchyInfo:hierarchyInfo});
    }
  }

  async  updateunassignedRoles() {
    let roles = []
    let hierarchyInfo=this.state.unassignedRoles.teamStructureAssignment;
    if(hierarchyInfo){
      for (let i = 0; i < hierarchyInfo.length; i++) {
        let json = {
          id: hierarchyInfo[i].roleId,
          isHierarchyAssigned:hierarchyInfo[i].isAssigned
        }
        roles.push(json)
      }
      const response = await updateRolesActionHandler(roles);
      return response;
    }

  }
  async  updateassignRoles() {
    let roles = []
    let hierarchyInfo=this.state.assignedRoles.teamStructureAssignment;
    if(hierarchyInfo){
      for (let i = 0; i < hierarchyInfo.length; i++) {
        let json = {
          id: hierarchyInfo[i].roleId,
          isHierarchyAssigned:hierarchyInfo[i].isAssigned
        }
        roles.push(json)
      }
      const response = await updateRolesActionHandler(roles);
      return response;
    }

  }
  async  updatehierarchyAssignments() {
    let finalApproval = null,hierarchyInfo = null;
    if(this.state.finalApproval&&this.state.finalApproval.isChecked){
      finalApproval = {
        department          : this.state.finalApproval.department,
        subDepartment       : this.state.finalApproval.subDepartment,
        role                : this.state.finalApproval.role,
        isChecked           : this.state.finalApproval.isChecked
      };
      hierarchyInfo={
        parentDepartment    : this.state.finalApproval.parentDepartment,
        parentSubDepartment : this.state.finalApproval.parentSubDepartment,
        clusterId           : this.props.clusterId,
        teamStructureAssignment :this.state.unassignedRoles.teamStructureAssignment, //_.union(this.state.unassignedRoles.teamStructureAssignment,this.state.assignedRoles.teamStructureAssignment),
        finalApproval         : finalApproval
      }
      console.log(hierarchyInfo);
      const response = await updateHierarchyAssignmentsActionHandler(hierarchyInfo);
      //this.state.isExpanded=true
      return response;
    }
  }

  isExpandableRow() {
    return true;
  }

  expandComponent(row) {
    let rowValue,selctedRowDetails=false;
    let selectedRow=this.refs.table
    if(selectedRow){
     let selectedRowValue=selectedRow.state.selectedRowKeys;
     if(selectedRowValue.length==1){
       if(selectedRowValue[0]){
         rowValue=selectedRowValue[0]
         if(rowValue==row.departmentId){
           selctedRowDetails=true
         }
       }
     }
    }
    return (
      <div>
      {selctedRowDetails?
      <MlAssignHierarchy departmentInfo={row} clusterId={this.props.clusterId} getUnAssignRoleDetails={this.getUnAssignRoleDetails.bind(this)} getAssignRoleDetails={this.getAssignRoleDetails.bind(this)} getFinalApprovalRole={this.getFinalApprovalRole.bind(this)} getFinalApprovalDetails={this.getFinalApprovalDetails.bind(this)}/>:
        <div></div>
      }
      </div>
    );
  }
  updateHierarchy() {
    const assigned = this.updateunassignedRoles();
    const upAssigned = this.updateassignRoles();
    const hierarchyAssignment = this.updatehierarchyAssignments();
    //if(this.state.isExpanded){
      toastr.success("Update Successful");
    //}
    return assigned;
  }
  SwitchBtn(cell,row){
    let activeDetails=false
    if(row.isActive!=null){
      activeDetails=true
    }
    return(
      <div>
    {activeDetails?(<div className="form-group switch_wrap"><label className="switch"><input type="checkbox" ref="status" id="status" checked={row.isActive}/><div className="slider"></div></label></div>):''}
      </div>
    )

  }
  render() {

    let MlActionConfig = [
      {
        actionName: 'save',
        showAction: true,
        handler: this.updateHierarchy.bind(this)
      }
    ];
    const options = {
      expandRowBgColor: 'rgb(242, 255, 163)'
    };
   const selectRow = {
      mode: 'checkbox',
      bgColor: '#feeebf',
      clickToSelect: true, // click to select, default is false
      clickToExpand: true // click to expand row, default is false
    };
    return (

      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Hierarchy Assignment</h2>
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <BootstrapTable ref='table' data={ this.state.hierarchyInfo }
                               options={ options }
                               expandableRow={ this.isExpandableRow }
                               expandComponent={ this.expandComponent.bind(this) }
                              selectRow={selectRow}
                              hover={true}
                               pagination
                               search
              >
                <TableHeaderColumn dataField="departmentId" isKey={true} dataSort={true} hidden={true}></TableHeaderColumn>
                <TableHeaderColumn dataField="subDepartmentId" dataSort={true} hidden={true}></TableHeaderColumn>
                <TableHeaderColumn dataField="isMoolya" hidden={true}>isMoolya</TableHeaderColumn>
                <TableHeaderColumn dataField="departmentName">Department</TableHeaderColumn>
                <TableHeaderColumn dataField="subDepartmentName">Sub-Department</TableHeaderColumn>
                <TableHeaderColumn dataField="isActive" dataFormat={this.SwitchBtn.bind(this)}>Status</TableHeaderColumn>
              </BootstrapTable>

            </ScrollArea>
          </div>
        </div>
        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
      </div>
    )
  }
}
;
