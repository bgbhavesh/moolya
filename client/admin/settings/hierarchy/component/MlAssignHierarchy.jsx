import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var Select = require('react-select');
var FontAwesome = require('react-fontawesome');
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import Moolyaselect from "../../../../commons/components/select/MoolyaSelect";
import {findDeptRolesActionHandler} from '../actions/findDepartmentRolesAction'
import {findAssignedRolesActionHandler} from '../actions/findAssignedRolesAction'
import {updateFinalApprovalActionHandler} from '../actions/updateFinalApprovalAction'
import {findFinalApprovalRoleActionHandler} from '../actions/findFinalApprovalRoleAction'
import _ from 'lodash'
var assignedParent = [
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
var unAssignedParent = [
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

export default class MlAssignHierarchy extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      loading:true,
      finalApproval:{isChecked:false,id:null,parentDepartment:null,parentSubDepartment:null,department:null,subDepartment:null,role:null},
      unAssignedRoles:{id:"",teamStructureAssignment:[{roleId:"",roleName:"",displayName:"",roleType:"",isAssigned:false,assignedLevel:"",reportingRole:""}]},
      assignedRoles:{id:"",teamStructureAssignment:[{roleId:"",roleName:"",displayName:"",roleType:"",isAssigned:false,assignedLevel:"",reportingRole:""}]},
      hierarchyId : ''
    }
    return this;
  }

  componentWillMount(){
    const resp=this.findUnAssignedDeptRoles();
    const hierarchyDetails=this.findHierarchyDetails();
    return resp;
  }

  async findHierarchyDetails(){
    let parentDepartmentInfo = this.props.departmentInfo;
    let departmnetId = parentDepartmentInfo.departmentId;
    let subDepartmentId = parentDepartmentInfo.subDepartmentId;
    let clusterId = this.props.clusterId;
    const response = await findFinalApprovalRoleActionHandler(departmnetId,subDepartmentId,clusterId);
    if(response){
      this.props.getFinalApprovalDetails(response.finalApproval);
      let unassignedRoles = this.state.unAssignedRoles
      this.setState({unAssignedRoles:{id:response._id,teamStructureAssignment:unassignedRoles.teamStructureAssignment}})
      this.setState({loading:false,finalApproval:response.finalApproval})
    }
    return response
  }
  async findUnAssignedDeptRoles(){
    let departmentInfo=this.props.departmentInfo
    let clusterId = this.props.clusterId
    if(departmentInfo!=undefined){
      let departmentId=departmentInfo.departmentId
      let subDepartmentId = departmentInfo.subDepartmentId;
      const response = await findDeptRolesActionHandler(departmentId,subDepartmentId,clusterId);
      if(response){
        let roleDetails=[]
        for(let i=0;i<response.length;i++){
          let role=response[i]
          if((role.isHierarchyAssigned==false||role.isHierarchyAssigned==null)) {
            let json = {
              roleId: role._id,
              roleName: role.roleName,
              displayName: role.displayName,
              roleType: "Internal User",
              isAssigned:false,
              assignedLevel:"",
              reportingRole:""
            }
            roleDetails.push(json);
          }
        }
        this.setState({loading:false,unAssignedRoles:{teamStructureAssignment:roleDetails}})
      }
      return response
    }
  }
  optionsBySelectDepartment(val){
    let finalApproval = this.state.finalApproval
    finalApproval.department = val;
    this.setState({finalApproval:finalApproval})
    this.props.getFinalApprovalDetails(finalApproval);

  }
  optionsBySelectSubDepartment(val){
    let finalApproval = this.state.finalApproval
    finalApproval.subDepartment = val;
    this.setState({finalApproval:finalApproval})
    this.props.getFinalApprovalDetails(finalApproval);
  }
  optionsBySelectFinalApprovalRole(val){
    let finalApproval = this.state.finalApproval
    finalApproval.role = val;
    this.setState({finalApproval:finalApproval})
    this.props.getFinalApprovalDetails(finalApproval);
  }
  optionsBySelectParentNode(index, value){

    let roles = this.state.unAssignedRoles
    if(value === null){
      setTimeout(function () {
        roles.assignedLevel = value
        roles.teamStructureAssignment[index].assignedLevel = value;
        this.setState({unAssignedRoles: roles});
      }.bind(this));
    }else {
      roles.teamStructureAssignment[index].assignedLevel = value.value
      if (value.value == "cluster") {
        roles.teamStructureAssignment[index].isAssigned = true
      }
      this.setState({unAssignedRoles: roles})
      this.props.getUnAssignRoleDetails(roles)
    }
  }
  optionsBySelectReportingRole(index, selectedIndex){
    let roles=this.state.unAssignedRoles
    roles.teamStructureAssignment[index].reportingRole = selectedIndex
    roles.teamStructureAssignment[index].isAssigned = true
    this.setState({unAssignedRoles:roles})
    this.props.getUnAssignRoleDetails(roles)
  }
  optionsBySelectAssignedParentNode(index, value){
    let roles = _.cloneDeep(this.state.assignedRoles);
    //  let roles=this.state.assignedRoles
    roles.teamStructureAssignment[index].assignedLevel = value.value
    if( value.value=="unassign"){
      roles.teamStructureAssignment[index].isAssigned = false
    }
    this.setState({assignedRoles:roles})
    this.props.getAssignRoleDetails(roles)
  }
  optionsBySelectAssignedReportingRole(index, selectedIndex){
    let roles=this.state.assignedRoles
    roles.teamStructureAssignment[index].reportingRole = selectedIndex
    this.setState({assignedRoles:roles})
    this.props.getAssignRoleDetails(roles)
  }
  updateFinalApproval(){
    const resp=this.updateFinalApprovalRoles();
    toastr.success("Update Successful");
    return resp;
  }

  async  updateFinalApprovalRoles() {
    let parentDepartmentInfo = this.props.departmentInfo;
    let departmnetId = parentDepartmentInfo.departmentId;
    let subDepartmentId = parentDepartmentInfo.subDepartmentId
    let roles = {
      id                    : this.state.finalApproval.id,
      parentDepartment      : departmnetId,
      parentSubDepartment   : subDepartmentId,
      department            : this.state.finalApproval.department,
      subDepartment         : this.state.finalApproval.subDepartment,
      role                  : this.state.finalApproval.role,
      clusterId             : this.props.clusterId
    }
    const response = await updateFinalApprovalActionHandler(roles);
    return response;
  }
  async findRoles(type) {
    //get deptId

    let parentDepartment = this.props.departmentInfo;
    let departmnetId = parentDepartment.departmentId;
    let subDepartmentId = parentDepartment.subDepartmentId
    const response = await findAssignedRolesActionHandler(departmnetId,subDepartmentId,type);
    if(response){
      console.log(response._id)
      let teamAssignment=response.teamStructureAssignment
      this.setState({loading:false,assignedRoles:{id : response._id,teamStructureAssignment:teamAssignment}})
    }else{
      this.setState({loading:false,assignedRoles:{id : '',teamStructureAssignment:{}}})
    }
    return response;
  }
  roleChecked(event) {
    let finalRole = this.state.finalApproval
    if(event.target.checked) {
      finalRole.isChecked = true
      let parentDepartmentInfo = this.props.departmentInfo;
      let departmnetId = parentDepartmentInfo.departmentId;
      let subDepartmentId = parentDepartmentInfo.subDepartmentId
      finalRole.parentDepartment=departmnetId;
      finalRole.parentSubDepartment=subDepartmentId;
    }else{department
      finalRole.isChecked = false
    }
    this.setState({finalApproval: finalRole})
    this.props.getFinalApprovalRole(this.state.finalApproval)
  }


  getAssignedRoles(type){
    console.log("context : "+type);
    const roles=this.findRoles(type);
    return roles;
  }

  render() {

    let that = this;
    let departmentInfo=this.props.departmentInfo
    let isMoolya=departmentInfo.isMoolya
    let departmentqueryOptions = {options: {variables: {isMoolya:isMoolya }}};
    let departmentQuery = gql` query($isMoolya:Boolean){
            data:fetchMoolyaBasedDepartment(isMoolya:$isMoolya){label:departmentName,value:_id}
          }
          `;
    let subDepartmentOptions = {options: { variables: {id:this.state.finalApproval.department}}};
    let subDepartmentquery=gql`query($id:String){
      data:fetchSubDepartments(id:$id) {
        value:_id
        label:subDepartmentName
      }
    }`
    let reportingRolequery=gql`query($departmentId:String,$subDepartmentId:String,$clusterId:String, $chapterId:String, $subChapterId:String, $communityId:String,$levelCode:String,$currentRoleId:String){
      data:fetchRolesForHierarchy(departmentId:$departmentId,subDepartmentId:$subDepartmentId,clusterId:$clusterId, chapterId:$chapterId, subChapterId:$subChapterId, communityId:$communityId,levelCode:$levelCode,currentRoleId:$currentRoleId) {
        value:_id
        label:roleName
      }
    }`
    let finalApprovalOptions = {options: { variables: {departmentId:this.state.finalApproval.department}}};
    let finalApprovalQuery=gql`query($departmentId:String){
      data:fetchRolesForFinalApprovalHierarchy(departmentId:$departmentId) {
        value:_id
        label:roleName
      }
    }`


    return (
      <div>
        <div className="row table_row_class">
        </div>
        <div className="panel panel-default">
          <div className="panel-heading" style={{'height':'40px'}}><div className="input_types" style={{'marginTop':'-4px'}}><input id="chapter_admin_check" type="checkbox" name="checkbox" checked={this.state.finalApproval.isChecked} onChange={that.roleChecked.bind(that)}/><label htmlFor="chapter_admin_check"><span></span>Final Approval</label></div></div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-4">
                <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Department"  selectedValue={this.state.finalApproval.department} queryType={"graphql"} query={departmentQuery} queryOptions={departmentqueryOptions} isDynamic={true}  onSelect={this.optionsBySelectDepartment.bind(this)} />
              </div>
              <div className="col-md-4">
                <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Sub-Department" selectedValue={this.state.finalApproval.subDepartment} queryType={"graphql"} query={subDepartmentquery} reExecuteQuery={true} queryOptions={subDepartmentOptions} isDynamic={true}  onSelect={this.optionsBySelectSubDepartment.bind(this)} />
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Final Approval Role" selectedValue={this.state.finalApproval.role} queryType={"graphql"} query={finalApprovalQuery} reExecuteQuery={true} queryOptions={finalApprovalOptions} isDynamic={true}  onSelect={this.optionsBySelectFinalApprovalRole.bind(this)} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Un Assigned Role</div>
          <div className="panel-body">
            {that.state.unAssignedRoles.teamStructureAssignment.map(function (roles,id) {
              let parentDepartment = that.props.departmentInfo;
              let reportingRoleOptions = {options: { variables: {departmentId:parentDepartment.departmentId,subDepartmentId:parentDepartment.subDepartmentId,clusterId:that.props.clusterId,chapterId:'', subChapterId:'', communityId:'',levelCode:roles.assignedLevel,currentRoleId:roles.roleId}}};

              return(
                <div className="row" key={roles.roleId}>
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
                    <div className="form-group" id="select-parent-node">
                      <Select name="form-field-name"   options={unAssignedParent} value={roles.assignedLevel} onChange={that.optionsBySelectParentNode.bind(that,id)} placeholder="Parent Node"  />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <Moolyaselect multiSelect={false} className="form-control float-label" selectedValue={roles.reportingRole} valueKey={'value'} labelKey={'label'} placeholder="Reporting role"  queryType={"graphql"} query={reportingRolequery} reExecuteQuery={true} queryOptions={reportingRoleOptions} isDynamic={true}  onSelect={that.optionsBySelectReportingRole.bind(that,id)} />
                    </div>
                  </div>
                  <br className="brclear" />
                  <hr />
                </div>

              )
            })

            }
          </div>
        </div>
        <h4 className="panel-title"> Role Structure </h4>
        <br className="clearfix"/>
        <div className="panel-group" id="accordion">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" onClick={that.getAssignedRoles.bind(that,'cluster')}>
                  Cluster
                </a>
              </h4>
            </div>
            <div id="collapseOne" className="panel-collapse collapse">
              {this.state.assignedRoles.id!=''?
                (<div className="panel-body">
                  {that.state.assignedRoles.teamStructureAssignment.map(function (roles,id) {
                    let parentDepartment = that.props.departmentInfo;
                    let reportingRoleOptions = {options: { variables: {departmentId:parentDepartment.departmentId,subDepartmentId:parentDepartment.subDepartmentId,clusterId:that.props.clusterId,chapterId:'', subChapterId:'', communityId:'',levelCode:roles.assignedLevel}}};
                    //let reportingRoleOptions = {options: { variables: {departmentId:parentDepartment.departmentId,clusterId:that.props.clusterId,chapterId:'', subChapterId:'', communityId:'',levelCode:roles.assignedLevel}}};

                    return(
                      <div className="row" key={roles.roleId}>
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
                            <Select name="form-field-name"   options={assignedParent} value={roles.assignedLevel} onChange={that.optionsBySelectAssignedParentNode.bind(that,id)} placeholder="Parent Node" className="float-label" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <Moolyaselect multiSelect={false} className="form-control float-label" selectedValue={roles.reportingRole} valueKey={'value'} labelKey={'label'} placeholder="Reporting role"  queryType={"graphql"} query={reportingRolequery} reExecuteQuery={true} queryOptions={reportingRoleOptions} isDynamic={true}  onSelect={that.optionsBySelectAssignedReportingRole.bind(that,id)} />
                          </div>
                        </div>
                        <br className="brclear" />
                        <br />
                      </div>
                    )
                  })

                  }
                </div>):(<div className="panel-body">No Assignments</div>)}
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
              {this.state.assignedRoles.id!=''?
                <div className="panel-body">
                  {this.state.assignedRoles.teamStructureAssignment.map(function (roles,id) {
                    let parentDepartment = that.props.departmentInfo;
                    let reportingRoleOptions = {options: { variables: {departmentId:parentDepartment.departmentId,subDepartmentId:parentDepartment.subDepartmentId,clusterId:that.props.clusterId,chapterId:'', subChapterId:'', communityId:'',levelCode:roles.assignedLevel}}};
                    //let reportingRoleOptions = {options: { variables: {departmentId:parentDepartment.departmentId,clusterId:that.props.clusterId,chapterId:'', subChapterId:'', communityId:'',levelCode:roles.assignedLevel}}};

                    return(

                      <div className="row" key={roles.roleId}>
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
                            <Select name="form-field-name"   options={assignedParent} value={roles.assignedLevel} onChange={that.optionsBySelectAssignedParentNode.bind(that,id)} placeholder="Parent Node" className="float-label" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <Moolyaselect multiSelect={false} className="form-control float-label" selectedValue={roles.reportingRole} valueKey={'value'} labelKey={'label'} placeholder="Reporting role"  queryType={"graphql"} query={reportingRolequery} reExecuteQuery={true} queryOptions={reportingRoleOptions} isDynamic={true}  onSelect={that.optionsBySelectAssignedReportingRole.bind(that,id)} />
                          </div>
                        </div>
                        <hr />
                      </div>
                    )
                  })

                  }
                </div>:<div className="panel-body">No Assignments</div>}
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
              {this.state.assignedRoles.id!=''?
                (<div className="panel-body">
                  {this.state.assignedRoles.teamStructureAssignment.map(function (roles,id) {
                    let parentDepartment = that.props.departmentInfo;
                    let reportingRoleOptions = {options: { variables: {departmentId:parentDepartment.departmentId,subDepartmentId:parentDepartment.subDepartmentId,clusterId:that.props.clusterId,chapterId:'', subChapterId:'', communityId:'',levelCode:roles.assignedLevel}}};
                    //let reportingRoleOptions = {options: { variables: {departmentId:parentDepartment.departmentId,clusterId:that.props.clusterId,chapterId:'', subChapterId:'', communityId:'',levelCode:roles.assignedLevel}}};

                    return(
                      <div className="row" key={roles.roleId}>
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
                            <Select name="form-field-name"   options={assignedParent} value={roles.assignedLevel} onChange={that.optionsBySelectAssignedParentNode.bind(that,id)} placeholder="Parent Node" className="float-label" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <Moolyaselect multiSelect={false} className="form-control float-label" selectedValue={roles.reportingRole} valueKey={'value'} labelKey={'label'} placeholder="Reporting role"  queryType={"graphql"} query={reportingRolequery} reExecuteQuery={true} queryOptions={reportingRoleOptions} isDynamic={true}  onSelect={that.optionsBySelectAssignedReportingRole.bind(that,id)} />
                          </div>
                        </div>
                        <hr />
                      </div>
                    )
                  })
                  }
                </div>):(<div className="panel-body">No Assignments</div>)}
            </div>
          </div>
        </div>
      </div>

    );
  }
}
