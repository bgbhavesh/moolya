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
import {updateFinalApprovalActionHandler} from '../actions/updateFinalApprovalAction'

var assignedParent = [
  {
    value: 'cluster',    label: 'cluster'
  },
  {
    value: 'chapter',    label: 'chapter'
  },
  {
    value: 'community',    label: 'community'
  },{
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
      finalApproval:{id:null,parentDepartment:null,parentSubDepartment:null,department:null,subDepartment:null,role:null},
      unAssignedRoles:[{id:"",roleName:"",displayName:"",roleType:"",teamStructureAssignment:{isAssigned:"",assignedLevel:"",reportingRole:""}}],
      assignedRoles:[{id:"",roleName:"",displayName:"",roleType:"",teamStructureAssignment:{isAssigned:"",assignedLevel:"",reportingRole:""}}]
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
        this.setState({loading:false,unAssignedRoles:roleDetails})
      }
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
    let roles=this.state.unAssignedRoles
    roles[index].teamStructureAssignment.assignedLevel = value.value
    this.setState({unAssignedRoles:roles})
    this.props.getUnAssignRoleDetails(roles)
  }
  optionsBySelectReportingRole(index, selectedIndex){
      let roles=this.state.unAssignedRoles
      roles[index].teamStructureAssignment.reportingRole = selectedIndex
      this.setState({unAssignedRoles:roles})
      this.props.getUnAssignRoleDetails(roles)
  }
  optionsBySelectAssignedParentNode(index, value){
    let roles=this.state.assignedRoles
    roles[index].teamStructureAssignment.assignedLevel = value
    this.setState({assignedRoles:roles})
    this.props.getAssignRoleDetails(roles)
  }
  optionsBySelectAssignedReportingRole(index, selectedIndex){
    let roles=this.state.assignedRoles
    roles[index].teamStructureAssignment.reportingRole = selectedIndex
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
      role                  : this.state.finalApproval.role
    }
    const response = await updateFinalApprovalActionHandler(roles);
    return response;
  }
  async findRoles(type) {
    //get deptId
    let parentDepartment = this.props.departmentInfo;
    let departmnetId = parentDepartment.departmentId;
    const response = await findAssignedRolesActionHandler(departmnetId,type);
    if(response){
      let roleDetails=[]
      for(let i=0;i<response.length;i++){
        let teamAssignment=response[i].teamStructureAssignment
        if(teamAssignment.isAssigned==true) {
          let json = {
            id: response[i]._id,
            roleName: response[i].roleName,
            displayName: response[i].displayName,
            roleType: "Internal User",
            teamStructureAssignment:{
              isAssigned:response[i].teamStructureAssignment.isAssigned,
              assignedLevel:response[i].teamStructureAssignment.assignedLevel,
              reportingRole:response[i].teamStructureAssignment.reportingRole
            }
          }
          roleDetails.push(json);
        }
      }
      this.setState({loading:false,assignedRoles:roleDetails})
    }
    return response;
  }

  getAssignedRoles(type){
    console.log("context : "+type);
    const roles=this.findRoles(type);
    return roles;
    //this.setState({assignedRoles:roles||[]})
    //console.log(this.state.assignedRoles);
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
    let subDepartmentOptions = {options: { variables: {id:this.state.department}}};
    let subDepartmentquery=gql`query($id:String){
      data:fetchSubDepartments(id:$id) {
        value:_id
        label:subDepartmentName
      }
    }`
    let parentDepartment = this.props.departmentInfo;
    let reportingRoleOptions = {options: { variables: {departmentId:parentDepartment.departmentId,clusterId:this.props.clusterId,chapterId:'', subChapterId:'', communityId:'CLUSTER'}}};
    let reportingRolequery=gql`query($departmentId:String,$clusterId:String, $chapterId:String, $subChapterId:String, $communityId:String,$levelCode:String){
      data:fetchRolesForHierarchy(departmentId:$departmentId, clusterId:$clusterId, chapterId:$chapterId, subChapterId:$subChapterId, communityId:$communityId,levelCode:$levelCode) {
        value:_id
        label:roleName
      }
    }`
    let finalApprovalOptions = {options: { variables: {departmentId:this.state.department}}};
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
          <div className="panel-heading">Final Approval</div>
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
                  <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Sub-Department" selectedValue={this.state.finalApproval.role} queryType={"graphql"} query={finalApprovalQuery} reExecuteQuery={true} queryOptions={finalApprovalOptions} isDynamic={true}  onSelect={this.optionsBySelectFinalApprovalRole.bind(this)} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Un Assigned Role</div>
          <div className="panel-body">
            {that.state.unAssignedRoles.map(function (roles,id) {
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
                  <Select name="form-field-name"   options={unAssignedParent} value={roles.teamStructureAssignment.assignedLevel} onChange={that.optionsBySelectParentNode.bind(that,id)} placeholder="Parent Node" className="float-label" />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Moolyaselect multiSelect={false} className="form-control float-label" selectedValue={roles.teamStructureAssignment.reportingRole} valueKey={'value'} labelKey={'label'} placeholder="Reporting role"  queryType={"graphql"} query={reportingRolequery} reExecuteQuery={true} queryOptions={reportingRoleOptions} isDynamic={true}  onSelect={that.optionsBySelectReportingRole.bind(that,id)} />
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
                <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" onClick={that.getAssignedRoles.bind(that,'cluster')}>
                  Cluster
                </a>
              </h4>
            </div>
            <div id="collapseOne" className="panel-collapse collapse">
              {that.state.assignedRoles.id!=''?
                (<div className="panel-body">
                {that.state.assignedRoles.map(function (roles,id) {
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
                    </div>
                  )
                })

                }
              </div>):(<div></div>)}
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
                  {this.state.assignedRoles.map(function (roles,id) {
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
                        {/* <div className="col-md-4">
                         <div className="form-group">
                         <Select name="form-field-name" value="select"   options={assignedParent} selectedValue={roles.teamStructureAssignment.assignedLevel} onSelect={that.optionsBySelectAssignedParentNode().bind(that,id)} placeholder="Parent Node" className="float-label" />
                         </div>
                         </div>
                         <div className="col-md-4">
                         <div className="form-group">
                         <Moolyaselect multiSelect={false} className="form-control float-label" selectedValue={roles.teamStructureAssignment.reportingRole} valueKey={'value'} labelKey={'label'} placeholder="Reporting role"  queryType={"graphql"} query={reportingRolequery} reExecuteQuery={true} queryOptions={reportingRoleOptions} isDynamic={true}  onSelect={that.optionsBySelectAssignedReportingRole.bind(that,id)} />
                         </div>
                         </div>*/}
                      </div>
                    )
                  })

                  }
                </div>:<div></div>}
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
                <div className="panel-body">
                  {this.state.assignedRoles.map(function (roles,id) {
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
                        {/* <div className="col-md-4">
                         <div className="form-group">
                         <Select name="form-field-name" value="select"   options={assignedParent} selectedValue={roles.teamStructureAssignment.assignedLevel} onSelect={that.optionsBySelectAssignedParentNode().bind(that,id)} placeholder="Parent Node" className="float-label" />
                         </div>
                         </div>
                         <div className="col-md-4">
                         <div className="form-group">
                         <Moolyaselect multiSelect={false} className="form-control float-label" selectedValue={roles.teamStructureAssignment.reportingRole} valueKey={'value'} labelKey={'label'} placeholder="Reporting role"  queryType={"graphql"} query={reportingRolequery} reExecuteQuery={true} queryOptions={reportingRoleOptions} isDynamic={true}  onSelect={that.optionsBySelectAssignedReportingRole.bind(that,id)} />
                         </div>
                         </div>*/}
                      </div>
                    )
                  })

                  }
                </div>:<div></div>}
            </div>
          </div>
        </div>
      </div>

    );
  }
}
