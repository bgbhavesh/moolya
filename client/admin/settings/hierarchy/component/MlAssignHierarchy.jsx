import React from 'react';
import { render } from 'react-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Moolyaselect from '../../../commons/components/MlAdminSelectWrapper';
import { findDeptRolesActionHandler } from '../actions/findDepartmentRolesAction';
import { findAssignedRolesActionHandler } from '../actions/findAssignedRolesAction';
import {
  updateFinalApprovalActionHandler,
  updateHierarchyAssignmentsActionHandler
} from '../actions/updateFinalApprovalAction';
import { findFinalApprovalRoleActionHandler } from '../actions/findFinalApprovalRoleAction';
import _ from 'lodash';
const Select = require('react-select');
const FontAwesome = require('react-fontawesome');
const assignedParent = [
  {
    value: 'cluster', label: 'cluster'
  },
  {
    value: 'chapter', label: 'chapter'
  },
  {
    value: 'subChapter', label: 'subchapter'
  },
  {
    value: 'community', label: 'community'
  },
  {
    value: 'unassign', label: 'unassign'
  }
];
const assignedParentNonMoolya = [

  {
    value: 'subChapter', label: 'subchapter'
  },
  {
    value: 'community', label: 'community'
  },
  {
    value: 'unassign', label: 'unassign'
  }
];
const unAssignedParent = [
  {
    value: 'cluster', label: 'cluster'
  },
  {
    value: 'chapter', label: 'chapter'
  },
  {
    value: 'subChapter', label: 'subchapter'
  },
  {
    value: 'community', label: 'community'
  }

];
const unAssignedParentNonMoolya = [
  {
    value: 'subChapter', label: 'subchapter'
  },
  {
    value: 'community', label: 'community'
  }

];

export default class MlAssignHierarchy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      finalApproval: {
        isChecked: false, id: null, parentDepartment: null, parentSubDepartment: null, department: null, subDepartment: null, role: null
      },
      unAssignedRoles: {
        id: '',
        teamStructureAssignment: [{
          roleId: '', roleName: '', displayName: '', roleType: '', isAssigned: false, assignedLevel: '', reportingRole: ''
        }]
      },
      assignedRoles: {
        id: '',
        teamStructureAssignment: [{
          roleId: '', roleName: '', displayName: '', roleType: '', isAssigned: false, assignedLevel: '', reportingRole: ''
        }]
      },
      allAssignedRoles: {},
      hierarchyId: '',
      dataAvailable: false
    }
    return this;
  }

  componentWillMount() {
    const resp = this.findUnAssignedDeptRoles();
    const hierarchyDetails = this.findHierarchyDetails();
    return resp;
  }

  async findHierarchyDetails() {
    const parentDepartmentInfo = this.props.data;
    const departmnetId = parentDepartmentInfo.departmentId;
    const subDepartmentId = parentDepartmentInfo.subDepartmentId;
    const subChapterId = this.props.data.subChapterId;
    const isDefaultSubChapter = this.props.data.isDefaultSubChapter
    const clusterId = this.props.data.clusterId;
    const response = await findFinalApprovalRoleActionHandler(departmnetId, subDepartmentId, clusterId, subChapterId, isDefaultSubChapter);
    if (response) {
      // this.props.getFinalApprovalDetails(response.finalApproval);
      const unassignedRoles = this.state.unAssignedRoles
      this.setState({
        loading: false,
        unAssignedRoles: { id: response._id, teamStructureAssignment: unassignedRoles.teamStructureAssignment },
        finalApproval: response.finalApproval,
        hierarchyId: response._id
      })
    }
    return response
  }

  // getParentNode(clusterId, chapterId, subChapterId, communityId){
  //   var parentNode = "";
  //   if(chapterId == "all" && subChapterId == "all" && communityId == "all"){
  //     parentNode = "cluster";
  //   } else if(subChapterId == "all" && communityId == "all"){
  //     parentNode = "chapter";
  //   } else if(communityId == "all"){
  //     parentNode = "subchapter";
  //   } else {
  //     parentNode = "community";
  //   }
  //   return parentNode;
  // }

  async findUnAssignedDeptRoles() {
    const departmentInfo = this.props.data
    const clusterId = this.props.data.clusterId
    const subChapterId = this.props.data.subChapterId;
    const isDefaultSubChapter = this.props.data.isDefaultSubChapter
    if (departmentInfo) {
      const departmentId = departmentInfo.departmentId
      const subDepartmentId = departmentInfo.subDepartmentId;
      const response = await findDeptRolesActionHandler(departmentId, subDepartmentId, clusterId, subChapterId, isDefaultSubChapter);
      if (response) {
        const roleDetails = [];
        const allAssignRoles = [];
        for (let i = 0; i < response.length; i++) {
          const role = response[i]
          if ((role.isHierarchyAssigned == false || role.isHierarchyAssigned == null)) {
            let assignedRole = _.find(role.assignRoles, { cluster: clusterId, department: departmentId, subDepartment: subDepartmentId })
            if (!assignedRole) { assignedRole = _.find(role.assignRoles, { cluster: 'all', department: departmentId, subDepartment: subDepartmentId }) }

            allAssignRoles.push(assignedRole);

            const json = {
              roleId: role._id,
              roleName: role.roleName,
              displayName: role.displayName,
              roleType: 'Internal User',
              isAssigned: false,
              assignedLevel: '',
              reportingRole: ''
              // assignRoles:assignedRole?assignedRole:{},
            }
            roleDetails.push(json);
          }
        }
        this.setState({ loading: false, unAssignedRoles: { teamStructureAssignment: roleDetails }, allAssignRoles })
      }
      return response
    }
  }

  /**
   * on save click
   * */
  async updatehierarchyAssignments() {
    let finalApproval = null,
      hierarchyInfo = null;
    const unassignRoles = this.state.unAssignedRoles.teamStructureAssignment
    const assignRoles = this.state.assignedRoles.teamStructureAssignment
    let allRoles = []
    if (assignRoles && assignRoles.length > 0) {
      allRoles = assignRoles
    }
    if (this.state.finalApproval && this.state.finalApproval.isChecked && this.state.finalApproval.role) {
      if (unassignRoles && unassignRoles.length > 0) {
        Array.prototype.push.apply(allRoles, unassignRoles)
      }
      const assignments = _.map(allRoles, row => _.omit(row, ['__typename']));
      _.remove(assignments, { assignedLevel: '' })

      finalApproval = {
        department: this.state.finalApproval.department,
        subDepartment: this.state.finalApproval.subDepartment,
        role: this.state.finalApproval.role,
        isChecked: this.state.finalApproval.isChecked
      };
      hierarchyInfo = {
        id: this.state.hierarchyId, // unassignedRoles.id?this.state.unassignedRoles.id:this.state.assignedRoles.id,
        parentDepartment: this.props.data.departmentId,
        parentSubDepartment: this.props.data.subDepartmentId,
        clusterId: this.props.data.clusterId,
        subChapterId: this.props.data.subChapterId,
        isDefaultSubChapter: this.props.data.isDefaultSubChapter,
        teamStructureAssignment: assignments,
        finalApproval
      }
      console.log(hierarchyInfo);
      const response = await updateHierarchyAssignmentsActionHandler(hierarchyInfo);
      if (response && response.result) {
        FlowRouter.reload();
        toastr.success(response.result);
      }
      return response;
    } else if (this.state.finalApproval && !this.state.finalApproval.isChecked) {
      toastr.error("Please select 'Final Approval'");
    } else if (!this.state.finalApproval.role) {
      toastr.error("'Final Approval' role is mandatory")
    }
  }

  optionsBySelectDepartment(val) {
    const finalApproval = this.state.finalApproval
    finalApproval.department = val;
    this.setState({ finalApproval })
    // this.props.getFinalApprovalDetails(finalApproval);
  }
  optionsBySelectSubDepartment(val) {
    const finalApproval = this.state.finalApproval
    finalApproval.subDepartment = val;
    this.setState({ finalApproval })
    // this.props.getFinalApprovalDetails(finalApproval);
  }
  optionsBySelectFinalApprovalRole(val) {
    const finalApproval = this.state.finalApproval
    finalApproval.role = val;
    this.setState({ finalApproval })
    // this.props.getFinalApprovalDetails(finalApproval);
  }
  optionsBySelectParentNode(index, value) {
    const roles = this.state.unAssignedRoles
    if (value === null) {
      setTimeout(() => {
        roles.assignedLevel = value
        roles.teamStructureAssignment[index].assignedLevel = value;
        roles.teamStructureAssignment[index].reportingRole = ''
        roles.teamStructureAssignment[index].isAssigned = false
        this.setState({ unAssignedRoles: roles });
      });
    } else {
      roles.teamStructureAssignment[index].assignedLevel = value.value
      if (value.value == 'cluster') {
        roles.teamStructureAssignment[index].isAssigned = true
      }
      if (value.value == 'subChapter' && !this.props.data.isDefaultSubChapter) {
        roles.teamStructureAssignment[index].isAssigned = true
      }
      this.setState({ unAssignedRoles: roles })
      // this.props.getUnAssignRoleDetails(roles)
    }
  }
  optionsBySelectReportingRole(index, selectedIndex) {
    const roles = this.state.unAssignedRoles
    roles.teamStructureAssignment[index].reportingRole = selectedIndex
    roles.teamStructureAssignment[index].isAssigned = true
    this.setState({ unAssignedRoles: roles })
    // this.props.getUnAssignRoleDetails(roles)
  }

  optionsBySelectAssignedParentNode(index, value) {
    const roles = _.cloneDeep(this.state.assignedRoles);
    //  let roles=this.state.assignedRoles
    if (value.value == 'unassign') {
      const allRoles = _.cloneDeep(this.state.allAssignedRoles);
      const currentRole = roles.teamStructureAssignment[index]
      const reportingRoleAvailableCurrentLayer = _.find(roles, { reportingRole: currentRole.roleId, isAssigned: true })
      const reportingRoleAvailableAllLayer = _.find(allRoles, { reportingRole: currentRole.roleId, isAssigned: true })
      if (reportingRoleAvailableCurrentLayer) {
        toastr.error('Cannot unassign as reporting role has hierarchy');
      } else if (reportingRoleAvailableAllLayer) {
        toastr.error('Cannot unassign as reporting role has hierarchy');
      } else {
        roles.teamStructureAssignment[index].assignedLevel = value.value
        roles.teamStructureAssignment[index].isAssigned = false
      }
      this.setState({ assignedRoles: roles })
    } else { toastr.error('Cannot change parent node. Please unassign the role first, to make changes'); }

    // else{
    //   roles.teamStructureAssignment[index].assignedLevel = value.value
    // }
    // this.setState({assignedRoles:roles})
    // this.props.getAssignRoleDetails(roles)
  }

  optionsBySelectAssignedReportingRole(index, selectedIndex) {
    const roles = this.state.assignedRoles
    roles.teamStructureAssignment[index].reportingRole = selectedIndex
    this.setState({ assignedRoles: roles })
    // this.props.getAssignRoleDetails(roles)
  }
  updateFinalApproval() {
    const resp = this.updateFinalApprovalRoles();
    toastr.success('Update successful');
    return resp;
  }

  async updateFinalApprovalRoles() {
    const parentDepartmentInfo = this.props.data;
    const departmnetId = parentDepartmentInfo.departmentId;
    const subDepartmentId = parentDepartmentInfo.subDepartmentId
    const roles = {
      id: this.state.finalApproval.id,
      parentDepartment: departmnetId,
      parentSubDepartment: subDepartmentId,
      department: this.state.finalApproval.department,
      subDepartment: this.state.finalApproval.subDepartment,
      role: this.state.finalApproval.role,
      clusterId: this.props.data.clusterId
    }
    const response = await updateFinalApprovalActionHandler(roles);
    return response;
  }
  async findRoles(type) {
    const parentDepartment = this.props.data;
    const departmnetId = parentDepartment.departmentId;
    const subDepartmentId = parentDepartment.subDepartmentId;
    const subChapterId = this.props.data.subChapterId;
    const clusterId = parentDepartment.clusterId
    const response = await findAssignedRolesActionHandler(clusterId, departmnetId, subDepartmentId, subChapterId, type);
    if (response) {
      const allAssignedRoles = response.teamStructureAssignment;
      const filteredRoles = []
      allAssignedRoles.map((step, key) => {
        if (step.assignedLevel == type) {
          filteredRoles.push(step)
        }
      })
      this.setState({
        loading: false, dataAvailable: true, allAssignedRoles, assignedRoles: { id: response._id, teamStructureAssignment: filteredRoles }
      })
    } else {
      this.setState({ loading: false, dataAvailable: false })
    }
    return response;
  }
  roleChecked(event) {
    const finalRole = this.state.finalApproval
    if (event.target.checked) {
      finalRole.isChecked = true
      const parentDepartmentInfo = this.props.data;
      const departmentId = parentDepartmentInfo.departmentId;
      const subDepartmentId = parentDepartmentInfo.subDepartmentId
      finalRole.parentDepartment = departmentId;
      finalRole.parentSubDepartment = subDepartmentId;
    } else {
      finalRole.isChecked = false
    }
    this.setState({ finalApproval: finalRole })
    // this.props.getFinalApprovalRole(this.state.finalApproval)
  }

  componentDidMount() {
    $('.accordion-toggle').click((e) => {
      $('.panel-collapse').removeClass('in')
    });
  }

  getAssignedRoles(type) {
    console.log(`context : ${type}`);
    this.contextType = type
    const roles = this.findRoles(type);
    return roles;
  }

  render() {
    const that = this;
    const departmentInfo = this.props.data
    const isMoolya = departmentInfo.isMoolya
    const departmentqueryOptions = { options: { variables: { isMoolya, clusterId: this.props.data.clusterId } } };
    const departmentQuery = gql` query($isMoolya:Boolean, $clusterId:String){
            data:fetchMoolyaBasedDepartment(isMoolya:$isMoolya, clusterId:$clusterId){label:departmentName,value:_id}
          }
          `;
    const subDepartmentOptions = { options: { variables: { id: this.state.finalApproval.department, subDepartmentId: departmentInfo.subDepartmentId } } };
    const subDepartmentquery = gql`query($id:String,$subDepartmentId:String){
      data:fetchSubDepartmentsHierarchy(id:$id,subDepartmentId:$subDepartmentId) {
        value:_id
        label:subDepartmentName
      }
    }`
    const reportingRolequery = gql`query($departmentId:String,$subDepartmentId:String,$clusterId:String, $chapterId:String, $subChapterId:String, $communityId:String,$levelCode:String,$currentRoleId:String,$roles:[teamStructureAssignmentInput]){
      data:fetchRolesForHierarchy(departmentId:$departmentId,subDepartmentId:$subDepartmentId,clusterId:$clusterId, chapterId:$chapterId, subChapterId:$subChapterId, communityId:$communityId,levelCode:$levelCode,currentRoleId:$currentRoleId,roles:$roles) {
        value:_id
        label:roleName
      }
    }`
    /* let reportingRolequery=gql`query($departmentId:String,$subDepartmentId:String,$clusterId:String, $chapterId:String, $subChapterId:String, $communityId:String,$levelCode:String,$currentRoleId:String,$roles:teamStructureAssignmentInput){
     data:fetchRolesForHierarchy(departmentId:$departmentId,subDepartmentId:$subDepartmentId,clusterId:$clusterId, chapterId:$chapterId, subChapterId:$subChapterId, communityId:$communityId,levelCode:$levelCode,currentRoleId:$currentRoleId,roles:$roles) {
     value:_id
     label:roleName
     }
     }` */
    const finalApprovalOptions = {
      options: {
        variables: {
          departmentId: this.state.finalApproval.department, subDepartmentId: this.state.finalApproval.subDepartment, clusterId: this.props.data.clusterId, subChapterId: this.props.data.subChapterId
        }
      }
    };
    const finalApprovalQuery = gql`query($departmentId:String,$subDepartmentId:String,$clusterId:String, $subChapterId: String){
      data:fetchRolesForFinalApprovalHierarchy(departmentId:$departmentId,subDepartmentId:$subDepartmentId,clusterId:$clusterId, subChapterId: $subChapterId) {
        value:roleId
        label:roleName
      }
    }`


    return (
      <div>
        <div className="row table_row_class">
        </div>
        <div className="panel panel-default">
          <div className="panel-heading" style={{ height: '40px' }}><div className="input_types" style={{ marginTop: '-4px' }}><input id="chapter_admin_check" type="checkbox" name="checkbox" checked={this.state.finalApproval.isChecked} onChange={that.roleChecked.bind(that)}/><label htmlFor="chapter_admin_check"><span></span>Final Approval</label></div></div>
          <div className="panel-body">
            <div className="row">
              <div className="col-md-4">
                <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Department" selectedValue={this.state.finalApproval.department} queryType={'graphql'} query={departmentQuery} queryOptions={departmentqueryOptions} isDynamic={true} onSelect={this.optionsBySelectDepartment.bind(this)} />
              </div>
              <div className="col-md-4">
                <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Sub-Department" selectedValue={this.state.finalApproval.subDepartment} queryType={'graphql'} query={subDepartmentquery} reExecuteQuery={true} queryOptions={subDepartmentOptions} isDynamic={true} onSelect={this.optionsBySelectSubDepartment.bind(this)} />
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Final Approval Role" selectedValue={this.state.finalApproval.role} queryType={'graphql'} query={finalApprovalQuery} reExecuteQuery={true} queryOptions={finalApprovalOptions} isDynamic={true} onSelect={this.optionsBySelectFinalApprovalRole.bind(this)} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">Un Assigned Role</div>
          <div className="panel-body">
            {that.state.unAssignedRoles.teamStructureAssignment.map((roles, id) => {
              const parentDepartment = that.props.data;

              const reportingRoleOptions = {
                options: {
                  variables: {
                    departmentId: parentDepartment.departmentId, subDepartmentId: parentDepartment.subDepartmentId, clusterId: that.props.data.clusterId, chapterId: '', subChapterId: that.props.data.subChapterId, communityId: '', levelCode: roles.assignedLevel, currentRoleId: roles.roleId, roles: that.state.unAssignedRoles.teamStructureAssignment
                  }
                }
              };
              let selectNonMoolya = [];
              let selectMoolya = [];
              const allAssignRoles = that.state.allAssignRoles
              if (allAssignRoles && allAssignRoles.length > 0 && !that.props.data.isDefaultSubChapter) {
                if (allAssignRoles[id] && allAssignRoles[id].chapter == 'all' && allAssignRoles[id].subChapter == 'all' && allAssignRoles[id].community == 'all') {
                  selectNonMoolya = [{ value: 'subChapter', label: 'subchapter' }]
                } else if (allAssignRoles[id] && allAssignRoles[id].subChapter == 'all' && allAssignRoles[id].community == 'all') {
                  selectNonMoolya = [{ value: 'subChapter', label: 'subchapter' }]
                } else if (allAssignRoles[id] && allAssignRoles[id].community == 'all') {
                  selectNonMoolya = [{ value: 'subChapter', label: 'subchapter' }]
                } else if (allAssignRoles[id] && allAssignRoles[id].community != 'all') {
                  selectNonMoolya = [{ value: 'community', label: 'community' }]
                }
              } else if (allAssignRoles && allAssignRoles.length > 0 && that.props.data.isDefaultSubChapter) {
                if (allAssignRoles[id] && allAssignRoles[id].chapter == 'all' && allAssignRoles[id].subChapter == 'all' && allAssignRoles[id].community == 'all') {
                  selectMoolya = [{ value: 'cluster', label: 'cluster' }]
                } else if (allAssignRoles[id] && allAssignRoles[id].subChapter == 'all' && allAssignRoles[id].community == 'all') {
                  selectMoolya = [{ value: 'chapter', label: 'chapter' }]
                } else if (allAssignRoles[id] && allAssignRoles[id].community == 'all') {
                  selectMoolya = [{ value: 'subChapter', label: 'subchapter' }]
                } else if (allAssignRoles[id] && allAssignRoles[id].community != 'all') {
                  selectMoolya = [{ value: 'community', label: 'community' }]
                }
              }
              return (
                <div className="row" key={id}>
                  <div className="col-md-4">
                    <div className="form-group">
                      <input type="text" placeholder="Role Name" value={roles.roleName} className="form-control float-label" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <input type="text" placeholder="Display Name" value={roles.displayName} className="form-control float-label" />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <input type="text" placeholder="Role Type" value={roles.roleType} className="form-control float-label"/>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group" id="select-parent-node">
                      {that.props.data && that.props.data.isDefaultSubChapter ?
                        <Select
                          name="form-field-name" options={selectMoolya} value={roles.assignedLevel}
                          onChange={that.optionsBySelectParentNode.bind(that, id)} placeholder="Parent Node"/>
                        :
                        <Select
                          name="form-field-name" options={selectNonMoolya} value={roles.assignedLevel}
                          onChange={that.optionsBySelectParentNode.bind(that, id)} placeholder="Parent Node"/>
                      }
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <Moolyaselect multiSelect={false} className="form-control float-label" selectedValue={roles.reportingRole} valueKey={'value'} labelKey={'label'} placeholder="Reporting role" queryType={'graphql'} query={reportingRolequery} reExecuteQuery={true} queryOptions={reportingRoleOptions} isDynamic={true} onSelect={that.optionsBySelectReportingRole.bind(that, id)} />
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
          {that.props.data && that.props.data.isDefaultSubChapter ?
            <div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <a
                      className="accordion-toggle" data-toggle="collapse" data-parent="#accordion"
                      href={`#collapseOne${departmentInfo.subDepartmentId}`}
                      onClick={that.getAssignedRoles.bind(that, 'cluster')}>
                      Cluster
                    </a>
                  </h4>
                </div>
                <div id={`collapseOne${departmentInfo.subDepartmentId}`} className="panel-collapse collapse">
                  {this.state.dataAvailable === true ?
                    (<div className="panel-body">
                      {that.state.assignedRoles.teamStructureAssignment.map((roles, id) => {
                        let assignments = null;
                        const team = that.state.assignedRoles.teamStructureAssignment
                        if (team) {
                          assignments = _.map(that.state.assignedRoles.teamStructureAssignment, row => _.omit(row, ['__typename']));
                        }
                        const parentDepartment = that.props.data;
                        const reportingRoleOptions = {
                          options: {
                            variables: {
                              departmentId: parentDepartment.departmentId,
                              subDepartmentId: parentDepartment.subDepartmentId,
                              clusterId: that.props.data.clusterId,
                              chapterId: '',
                              subChapterId: that.props.data.subChapterId,
                              communityId: '',
                              levelCode: roles.assignedLevel,
                              currentRoleId: roles.roleId,
                              roles: assignments
                            }
                          }
                        };
                        // let reportingRoleOptions = {options: { variables: {departmentId:parentDepartment.departmentId,clusterId:that.props.clusterId,chapterId:'', subChapterId:'', communityId:'',levelCode:roles.assignedLevel}}};

                        return (
                          <div className="row" key={id}>
                            <div className="col-md-4">
                              <div className="form-group">
                                <input
                                  type="text" placeholder="Role Name" value={roles.roleName}
                                  className="form-control float-label"/>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <input
                                  type="text" placeholder="Display Name" value={roles.displayName}
                                  className="form-control float-label"/>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <input
                                  type="text" placeholder="Role Type" value={roles.roleType}
                                  className="form-control float-label"/>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <Select
                                  name="form-field-name" options={assignedParent} value={roles.assignedLevel}
                                  onChange={that.optionsBySelectAssignedParentNode.bind(that, id)}
                                  placeholder="Parent Node" className="float-label"/>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <Moolyaselect
                                  multiSelect={false} disabled={true} className="form-control float-label"
                                  selectedValue={roles.reportingRole} valueKey={'value'} labelKey={'label'}
                                  placeholder="Reporting role" queryType={'graphql'}
                                  query={reportingRolequery} reExecuteQuery={true}
                                  queryOptions={reportingRoleOptions} isDynamic={true}
                                  onSelect={that.optionsBySelectAssignedReportingRole.bind(that, id)}/>
                              </div>
                            </div>
                            <br className="brclear"/>
                            <br />
                          </div>
                        )
                      })

                      }
                    </div>) : (<div className="panel-body">No Assignments</div>)}
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <a
                      className="accordion-toggle" data-toggle="collapse" data-parent="#accordion"
                      href={`#collapseTwo${departmentInfo.subDepartmentId}`}
                      onClick={this.getAssignedRoles.bind(this, 'chapter')}>
                      Chapter
                    </a>
                  </h4>
                </div>
                <div id={`collapseTwo${departmentInfo.subDepartmentId}`} className="panel-collapse collapse">
                  {this.state.dataAvailable === true ?
                    <div className="panel-body">
                      {that.state.assignedRoles.teamStructureAssignment.map((roles, id) => {
                        let assignments = null;
                        const team = that.state.assignedRoles.teamStructureAssignment
                        if (team) {
                          assignments = _.map(that.state.assignedRoles.teamStructureAssignment, row => _.omit(row, ['__typename']));
                        }
                        const parentDepartment = that.props.data;
                        const reportingRoleOptions = {
                          options: {
                            variables: {
                              departmentId: parentDepartment.departmentId,
                              subDepartmentId: parentDepartment.subDepartmentId,
                              clusterId: that.props.data.clusterId,
                              chapterId: '',
                              subChapterId: that.props.data.subChapterId,
                              communityId: '',
                              levelCode: roles.assignedLevel,
                              currentRoleId: roles.roleId,
                              roles: assignments
                            }
                          }
                        };
                        // let reportingRoleOptions = {options: { variables: {departmentId:parentDepartment.departmentId,clusterId:that.props.clusterId,chapterId:'', subChapterId:'', communityId:'',levelCode:roles.assignedLevel}}};

                        return (

                          <div className="row" key={id}>
                            <div className="col-md-4">
                              <div className="form-group">
                                <input
                                  type="text" placeholder="Role Name" value={roles.roleName}
                                  className="form-control float-label"/>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <input
                                  type="text" placeholder="Display Name" value={roles.displayName}
                                  className="form-control float-label"/>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <input
                                  type="text" placeholder="Role Type" value={roles.roleType}
                                  className="form-control float-label"/>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <Select
                                  name="form-field-name" options={assignedParent} value={roles.assignedLevel}
                                  onChange={that.optionsBySelectAssignedParentNode.bind(that, id)}
                                  placeholder="Parent Node" className="float-label"/>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <Moolyaselect
                                  multiSelect={false} disabled={true} className="form-control float-label"
                                  selectedValue={roles.reportingRole} valueKey={'value'} labelKey={'label'}
                                  placeholder="Reporting role" queryType={'graphql'}
                                  query={reportingRolequery} reExecuteQuery={true}
                                  queryOptions={reportingRoleOptions} isDynamic={true}
                                  onSelect={that.optionsBySelectAssignedReportingRole.bind(that, id)}/>
                              </div>
                            </div>
                            <hr />
                          </div>
                        )
                      })

                      }
                    </div> : <div className="panel-body">No Assignments</div>}
                </div>
              </div>
            </div> : <div></div>
          }
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href={`#collapseFour${departmentInfo.subDepartmentId}`} onClick={this.getAssignedRoles.bind(this, 'subChapter')}>
                      Sub Chapter
                </a>
              </h4>
            </div>
            <div id={`collapseFour${departmentInfo.subDepartmentId}`} className="panel-collapse collapse">
              {this.state.dataAvailable === true ?
                <div className="panel-body">
                  {that.state.assignedRoles.teamStructureAssignment.map((roles, id) => {
                    let assignments = null;
                    const team = that.state.assignedRoles.teamStructureAssignment
                    if (team) {
                      assignments = _.map(that.state.assignedRoles.teamStructureAssignment, row => _.omit(row, ['__typename']));
                    }
                    const parentDepartment = that.props.data;
                    const reportingRoleOptions = {
                      options: {
                        variables: {
                          departmentId: parentDepartment.departmentId, subDepartmentId: parentDepartment.subDepartmentId, clusterId: that.props.data.clusterId, chapterId: '', subChapterId: that.props.data.subChapterId, communityId: '', levelCode: roles.assignedLevel, currentRoleId: roles.roleId, roles: assignments
                        }
                      }
                    };
                    // let reportingRoleOptions = {options: { variables: {departmentId:parentDepartment.departmentId,clusterId:that.props.clusterId,chapterId:'', subChapterId:'', communityId:'',levelCode:roles.assignedLevel}}};
                    const options = that.props.data && that.props.data.isDefaultSubChapter ? assignedParent : assignedParentNonMoolya;
                    return (

                      <div className="row" key={id}>
                        <div className="col-md-4">
                          <div className="form-group">
                            <input type="text" placeholder="Role Name" value={roles.roleName} className="form-control float-label" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <input type="text" placeholder="Display Name" value={roles.displayName} className="form-control float-label" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <input type="text" placeholder="Role Type" value={roles.roleType} className="form-control float-label"/>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <Select name="form-field-name" options={options} value={roles.assignedLevel} onChange={that.optionsBySelectAssignedParentNode.bind(that, id)} placeholder="Parent Node" className="float-label" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <Moolyaselect multiSelect={false} disabled={true} className="form-control float-label" selectedValue={roles.reportingRole} valueKey={'value'} labelKey={'label'} placeholder="Reporting role" queryType={'graphql'} query={reportingRolequery} reExecuteQuery={true} queryOptions={reportingRoleOptions} isDynamic={true} onSelect={that.optionsBySelectAssignedReportingRole.bind(that, id)} />
                          </div>
                        </div>
                        <hr />
                      </div>
                    )
                  })

                  }
                </div> : <div className="panel-body">No Assignments</div>}
            </div>
          </div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a className="accordion-toggle" data-toggle="collapse" data-parent="#accordion" href={`#collapseThree${departmentInfo.subDepartmentId}`} onClick={this.getAssignedRoles.bind(this, 'community')}>
                  Community
                </a>
              </h4>
            </div>
            <div id={`collapseThree${departmentInfo.subDepartmentId}`} className="panel-collapse collapse">
              {this.state.dataAvailable === true ?
                (<div className="panel-body">
                  {this.state.assignedRoles.teamStructureAssignment.map((roles, id) => {
                    let assignments = null;
                    const team = that.state.assignedRoles.teamStructureAssignment
                    if (team) {
                      assignments = _.map(that.state.assignedRoles.teamStructureAssignment, row => _.omit(row, ['__typename']));
                    }

                    const parentDepartment = that.props.data;
                    const reportingRoleOptions = {
                      options: {
                        variables: {
                          departmentId: parentDepartment.departmentId, subDepartmentId: parentDepartment.subDepartmentId, clusterId: that.props.data.clusterId, chapterId: '', subChapterId: that.props.data.subChapterId, communityId: '', levelCode: roles.assignedLevel, currentRoleId: roles.roleId, roles: assignments
                        }
                      }
                    };
                    // let reportingRoleOptions = {options: { variables: {departmentId:parentDepartment.departmentId,clusterId:that.props.clusterId,chapterId:'', subChapterId:'', communityId:'',levelCode:roles.assignedLevel}}};
                    const options = that.props.data && that.props.data.isDefaultSubChapter ? assignedParent : assignedParentNonMoolya;
                    return (
                      <div className="row" key={id}>
                        <div className="col-md-4">
                          <div className="form-group">
                            <input type="text" placeholder="Role Name" value={roles.roleName} className="form-control float-label" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <input type="text" placeholder="Display Name" value={roles.displayName}className="form-control float-label" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <input type="text" placeholder="Role Type" value={roles.roleType} className="form-control float-label"/>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <Select name="form-field-name" options={options} value={roles.assignedLevel} onChange={that.optionsBySelectAssignedParentNode.bind(that, id)} placeholder="Parent Node" className="float-label" />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <Moolyaselect multiSelect={false} disabled={true} className="form-control float-label" selectedValue={roles.reportingRole} valueKey={'value'} labelKey={'label'} placeholder="Reporting role" queryType={'graphql'} query={reportingRolequery} reExecuteQuery={true} queryOptions={reportingRoleOptions} isDynamic={true} onSelect={that.optionsBySelectAssignedReportingRole.bind(that, id)} />
                          </div>
                        </div>
                        <hr />
                      </div>
                    )
                  })
                  }
                </div>) : (<div className="panel-body">No Assignments</div>)}
            </div>
          </div>
        </div>
        <div className="ml_icon_btn" style={{ textAlign: 'center' }}>
          <a href="#" onClick={that.updatehierarchyAssignments.bind(that)} className="save_btn"><span
            className="ml ml-save"></span></a>
        </div>
      </div>

    );
  }
}
