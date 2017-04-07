import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var Select = require('react-select');
var FontAwesome = require('react-fontawesome');
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import Moolyaselect from "../../../../commons/components/select/MoolyaSelect";
import {findDeptRolesActionHandler} from '../actions/findDepartmentRolesAction'
var Select = require('react-select');
var FontAwesome = require('react-fontawesome');
import {findAssignedRolesActionHandler} from '../actions/findAssignedRolesAction'

var assignedParent = [
  {
    value: 'cluster',    label: 'cluster'
  },
  {
    value: 'chapter',    label: 'chapter'
  },
  {
    value: 'community',    label: 'community'
  }
];
var unAssignedParent = [
  {
    value: 'cluster',    label: 'cluster'
  },
  {
    value: 'chapter',    label: 'chapter'
  },
  {
    value: 'community',    label: 'community'
  },
  {
    value: 'unassign',    label: 'unassign'
  }
];

export default class MlAssignHierarchy extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      department:null,
      subDepartment:null,
      finalApprovalRole:null,
      assignedRoles:[],
      unAssignedRoles:[{id:"",roleName:"",displayName:"",roleType:"",teamStructureAssignment:{isAssigned:"",assignedLevel:"",reportingRole:""}}]
    }
    return this;
  }
  componentWillUpdate(){
    const resp=this.findDeptRoles();
    return resp;
  }
  async findDeptRoles(){
    let departmentInfo=this.props.departmentInfo
    if(departmentInfo!=undefined){
      let departmentId=departmentInfo.departmentId
      const response = await findDeptRolesActionHandler(departmentId);
      if(response){
        let roleDetails=[]
        for(let i=0;i<response.length;i++){
          let teamAssignment=response[i].teamStructureAssignment

          if(teamAssignment!=undefined&&teamAssignment.isAssigned==false) {
            let json = {
              id: response[i]._id,
              roleName: response[i].roleName,
              displayName: response[i].displayName,
              roleType: "Internal User",
              teamStructureAssignment:{
                isAssigned:false,
                assignedLevel:"",
                reportingRole:""
              }
            }
            roleDetails.push(json);
          }
        }
        this.setState({unAssignedRoles:roleDetails})
      }
    }

  }
  optionsBySelectDepartment(val){
      this.setState({department:val})
  }
  optionsBySelectSubDepartment(val){
    this.setState({subDepartment:val});
  }
  optionsBySelectParentNode(index, selectedIndex){
    let roles=this.state.unAssignedRoles
    roles[index]['assignedLevel'] = selectedIndex
    this.setState({unAssignedRoles:roles})
  }
  optionsBySelectReportingRole(index, selectedIndex){
      let roles=this.state.unAssignedRoles
      roles[index]['assignedLevel'] = selectedIndex
      this.setState({unAssignedRoles:roles})
  }
  optionsBySelectfinalApprovalRole(val){
    this.setState({finalApprovalRole:val});
  }

  async findRoles(type) {
    //get deptId
    let departmnetId = '';
    const response = await findAssignedRolesActionHandler(departmnetId,type);
    console.log(response);
    let roles=[];
    if(response){
      roles = response||[];
    }
    return roles;
  }

  getAssignedRoles(type){
    console.log("context : "+type);
    const roles=this.findRoles(type);
    this.setState({assignedRoles:roles||[]})
    console.log(this.state.assignedRoles);
  }

  render() {
    let departmentInfo=this.props.departmentInfo
    let isMoolya=departmentInfo.isMoolya
    let departmentqueryOptions = {options: {variables: {isMoolya:isMoolya }}};
    let departmentQuery = gql` query($isMoolya:Boolean){
            data:fetchMoolyaBasedDepartment(isMoolya:$isMoolya){label:departmentName,value:_id}
          }
          `;
    let subDepartmentOptions = {options: { variables: {id:this.state.department}}};
    let subDepartmentquery=gql`query($id:String){
      data:fetchSubDepartments(id:$id) {
        value:_id
        label:subDepartmentName
      }
    }`
    let reportingRoleOptions = {options: { variables: {departmentId:this.state.department,clusterId:this.props.clusterId}}};
    let reportingRolequery=gql`query($id:String){
      data:fetchRolesByDepSubDep(id:$id) {
        value:_id
        label:roleName
      }
    }`
    let finalApprovalOptions = {options: { variables: {departmentId:this.state.department}}};
    let finalApprovalQuery=gql`query($id:String){
      data:fetchRolesForFinalApprovalHierarchy(id:$id) {
        value:_id
        label:roleName
      }
    }`



    return (
      <div>
        <div className="row table_row_class">
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Final Approval</div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-4">
                <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Department"  selectedValue={this.state.department} queryType={"graphql"} query={departmentQuery} queryOptions={departmentqueryOptions} isDynamic={true}  onSelect={this.optionsBySelectDepartment.bind(this)} />
              </div>
              <div className="col-md-4">
                <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Sub-Department" selectedValue={this.state.subDepartment} queryType={"graphql"} query={subDepartmentquery} reExecuteQuery={true} queryOptions={subDepartmentOptions} isDynamic={true}  onSelect={this.optionsBySelectSubDepartment.bind(this)} />
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Sub-Department" selectedValue={this.state.subDepartment} queryType={"graphql"} query={finalApprovalQuery} reExecuteQuery={true} queryOptions={finalApprovalOptions} isDynamic={true}  onSelect={this.optionsBySelectfinalApprovalRole.bind(this)} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Un Assigned Role</div>
          <div className="panel-body">
            {this.state.unAssignedRoles.map(function (roles,id) {
              return(
            <div className="row" key={roles.id}>
              <div className="col-md-4">
                <div className="form-group">
                  <input type="text"  placeholder="Role Name" value={roles.roleName} className="form-control float-label" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input type="text"  placeholder="Display Name" value={roles.displayName}className="form-control float-label" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <input type="text"  placeholder="Role Type" value={roles.roleType} className="form-control float-label"/>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Select name="form-field-name" value="select"  selectedValue={roles.assignedLevel}  options={assignedParent} onSelect={this.optionsBySelectParentNode.bind(this,id)} placeholder="Parent Node" className="float-label" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Reporting role" selectedValue={roles.reportingRole} queryType={"graphql"} query={reportingRolequery} reExecuteQuery={true} queryOptions={reportingRoleOptions} isDynamic={true}  onSelect={this.optionsBySelectReportingRole.bind(this,id)} />
                </div>
              </div>

            </div>
              )
            })

            }
          </div>
        </div>
        <div className="panel-group" id="accordion">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" onClick={this.getAssignedRoles.bind(this,'cluster')}>
                  Cluster
                </a>
              </h4>
            </div>
            <div id="collapseOne" className="panel-collapse collapse">
              <div className="panel-body">            <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={unAssignedParent}  className="float-label" />
                  </div>
                </div>

              </div>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" onClick={this.getAssignedRoles.bind(this,'chapter')}>
                  Chapter
                </a>
              </h4>
            </div>
            <div id="collapseTwo" className="panel-collapse collapse">
              <div className="panel-body">            <div className="row">

                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={unAssignedParent}  className="float-label" />
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseThree"  onClick={this.getAssignedRoles.bind(this,'community')}>
                  Community
                </a>
              </h4>
            </div>
            <div id="collapseThree" className="panel-collapse collapse">
              <div className="panel-body">            <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <Select name="form-field-name" value="select"  options={unAssignedParent}  className="float-label" />
                  </div>
                </div>

              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
