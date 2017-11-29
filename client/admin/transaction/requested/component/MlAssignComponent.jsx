import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import Select from 'react-select';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Moolyaselect from '../../../commons/components/MlAdminSelectWrapper'
import { assignUserForTransactionAction, selfAssignUserForTransactionAction, unAssignUserForTransactionAction, validateAssignmentsDataContext } from '../actions/assignUserforTransactionAction'
import hierarchyValidations from '../../../../commons/containers/hierarchy/mlHierarchyValidations'

export default class MlAssignComponent extends React.Component {
  constructor(props) {
    super(props);
    const list = this.props.data
    if (!list || list.length == 0) {
      toastr.error('Please Select a record');
      this.props.closePopOver(false)
    }
    this.state = {
      selectedValue: false,
      selectedCluster: null,
      selectedChapter: null,
      selectedSubChapter: null,
      selectedCommunity: null,
      selectedDepartment: null,
      selectedSubDepartment: null,
      selectedRole: null,
      selectedUser: null
    };
    return this;
  }

  componentDidMount() {
  }

  optionsBySelectCluster(value) {
    this.setState({ selectedCluster: value })
  }
  optionsBySelectChapter(value) {
    this.setState({ selectedChapter: value })
  }
  optionsBySelectCommunity(value) {
    this.setState({ selectedCommunity: value })
  }
  optionsBySelectSubChapter(value) {
    this.setState({ selectedSubChapter: value })
  }

  optionsBySelectAllUser(value) {
    this.setState({ selectedUser: value })
  }
  optionsBySelectDepartment(value) {
    this.setState({ selectedDepartment: value })
  }
  optionsBySelectSubDepartment(value) {
    this.setState({ selectedSubDepartment: value })
  }
  optionsByRole(value) {
    this.setState({ selectedRole: value })
  }
  optionsBySelectUser(value) {
    this.setState({ selectedUser: value })
    this.validateAssignmentsDataContext(value)
  }

  cancel() {
    this.props.refreshList();
  }

  async validateAssignmentsDataContext(user) {
    const data = this.props.data
    const selectedData = []
    data.map((transaction) => {
      const json = {
        clusterId: transaction.clusterId,
        chapterId: transaction.chapterId,
        subChapterId: transaction.subChapterId,
        communityId: transaction.communityId,
        transactionId: transaction.registrationId
      }
      selectedData.push(json)
    })
    const userId = user
    const response = await validateAssignmentsDataContext(selectedData, userId);
    if (response && !response.success) {
      toastr.error('Selected transactions not available in user context');
      this.props.closePopOver(false)
      // FlowRouter.reload();
    }
  }

  async assignUser() {
    if (this.state && !this.state.selectedUser) {
      toastr.error('please select a user to assign');
    } else {
      const params = {
        cluster: this.state.selectedCluster,
        chapter: this.state.selectedChapter,
        subChapter: this.state.selectedSubChapter,
        community: this.state.selectedCommunity,
        department: this.state.selectedDepartment,
        subDepartment: this.state.selectedSubDepartment,
        role: this.state.selectedRole,
        user: this.state.selectedUser
      }
      // if(hierarchyValidations.validateAssignAction(this.props.data.clusterId,this.state.selectedCluster)){
      const data = this.props.data
      const transactionIds = []
      data.map((transaction) => {
        transactionIds.push(transaction.registrationId)
      })

      const response = await assignUserForTransactionAction('Registration', params, transactionIds, 'Registration', 'assignTransaction');
      if (response.success) {
        this.setState({
          selectedCluster: null,
          selectedChapter: null,
          selectedSubChapter: null,
          selectedCommunity: null,
          selectedDepartment: null,
          selectedSubDepartment: null,
          selectedRole: null,
          selectedUser: null
        })
        toastr.success('Registration request assigned to admin successfully');
        this.props.closePopOver(false)
        FlowRouter.reload();
      } else {
        toastr.error('Cannot assign due to wrong hierarchy');
        this.props.closePopOver(false)
        FlowRouter.reload();
      }
    }
  }


  async selfAssignTransaction() {
    const data = this.props.data
    const transactionIds = []
    data.map((transaction) => {
      transactionIds.push(transaction.registrationId)
    })

    const transactionType = this.props.data.transactionType
    const response = await selfAssignUserForTransactionAction('Registration', transactionIds, 'Registration', 'selfAssignTransaction');
    if (response.success) {
      toastr.success('Self-assignment successful');
      this.props.closePopOver(false)
      FlowRouter.reload();
      // FlowRouter.go("/admin/transactions/registrationRequested");
    } else {
      toastr.error('Cannot assign due to wrong hierarchy');
      this.props.closePopOver(false)
      FlowRouter.reload();
      // FlowRouter.go("/admin/transactions/registrationRequested");
    }
  }

  async unAssignTransaction() {
    const data = this.props.data
    const transactionIds = []
    data.map((transaction) => {
      transactionIds.push(transaction.registrationId)
    })
    const response = await unAssignUserForTransactionAction('Registration', transactionIds, 'Registration', 'unAssignTransaction');
    if (response.success) {
      toastr.success('Un-assignment successful');
      this.props.closePopOver(false)
      FlowRouter.reload();
      // FlowRouter.go("/admin/transactions/registrationRequested");
    } else {
      toastr.error('Selected record is not assigned to you');
      this.props.closePopOver(false)
      FlowRouter.reload();
      // FlowRouter.go("/admin/transactions/registrationRequested");
    }
  }

  render() {
    const that = this;

    const moolyaUserQuery = gql` query{
      data:fetchMoolyaInternalUsers{label:username,value:_id}
    }
    `;

    const clusterQuery = gql`query{
     data:fetchContextClusters {
        value:_id
        label:countryName
      }
    }
    `;
    const chapterQuery = gql`query($id:String){  
      data:fetchContextChapters(id:$id) {
        value:_id
        label:chapterName
      }  
    }`;

    const subChapterQuery = gql`query($id:String){  
      data:fetchContextSubChapters(id:$id) {
        value:_id
        label:subChapterName
      }  
    }`;

    const fetchcommunities = gql` query{
      data:fetchCommunityDefinition{label:name,value:code}
    }
    `;

    const departmentQuery = gql`query($isMoolya:Boolean,$clusterId:String, $subChapterId:String){  
      data:fetchHierarchyMoolyaDepartment(isMoolya:$isMoolya,clusterId:$clusterId, subChapterId:$subChapterId) {
        value:_id
        label:departmentName
      }  
    }`;

    const subDepartmentQuery = gql`query($id:String){  
      data:fetchSubDepartmentsForRegistration(id:$id) {
        value:_id
        label:subDepartmentName
      }  
    }`;
    const roleQuery = gql`query($clusterId:String,$departmentId:String,$subDepartmentId:String, $subChapterId:String){  
      data:fetchHierarchyRoles(clusterId:$clusterId,departmentId:$departmentId,subDepartmentId:$subDepartmentId, subChapterId:$subChapterId) {
        value:roleId
        label:roleName
      }  
    }`;
    const usersQuery = gql`query($clusterId:String,$departmentId:String,$subDepartmentId:String,$roleId:String, $subChapterId:String){  
      data:fetchHierarchyUsers(clusterId:$clusterId,departmentId:$departmentId,subDepartmentId:$subDepartmentId,roleId:$roleId, subChapterId:$subChapterId) {
        value:_id
        label:username
      }  
    }`;

    const chapterOption = { options: { variables: { id: this.state.selectedCluster } } };
    const subChapterOption = { options: { variables: { id: this.state.selectedChapter } } }
    const departmentOption = { options: { variables: { isMoolya: true, clusterId: this.state.selectedCluster, subChapterId: this.state.selectedSubChapter } } }
    const subDepartmentOption = { options: { variables: { id: this.state.selectedDepartment } } };
    const roleOption = {
      options: {
        variables: {
          clusterId: this.state.selectedCluster,
          departmentId: this.state.selectedDepartment,
          subDepartmentId: this.state.selectedSubDepartment,
          subChapterId: this.state.selectedSubChapter ? this.state.selectedSubChapter : null

        }
      }
    };
    const usersOption = {
      options: {
        variables: {
          clusterId: this.state.selectedCluster,
          departmentId: this.state.selectedDepartment,
          subDepartmentId: this.state.selectedSubDepartment,
          roleId: this.state.selectedRole,
          subChapterId: this.state.selectedSubChapter ? this.state.selectedSubChapter : null
        }
      }
    };

    return (


      <div className="" style={{ width: '400px' }}>
        <div className="mrgn-btm">
          <Moolyaselect
            multiSelect={false} placeholder="Select User" className="search-form-control"
            valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedUser}
            queryType={'graphql'} query={moolyaUserQuery} onSelect={that.optionsBySelectAllUser.bind(this)}
            isDynamic={true}/>
        </div>
        <div className="col-md-6 nopadding-left">
          <div className="form-group">
            <Moolyaselect multiSelect={false} placeholder="Select Cluster" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedCluster} queryType={'graphql'} query={clusterQuery} onSelect={that.optionsBySelectCluster.bind(this)} isDynamic={true}/>
          </div>
          <div className="form-group">
            <Moolyaselect multiSelect={false} placeholder="Select Subchapter" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedSubChapter} queryType={'graphql'} query={subChapterQuery} reExecuteQuery={true} queryOptions={subChapterOption} isDynamic={true} onSelect={this.optionsBySelectSubChapter.bind(this)} />
          </div>
          <div className="form-group">
            <Moolyaselect multiSelect={false} placeholder="Select Department" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedDepartment} queryType={'graphql'} query={departmentQuery} reExecuteQuery={true} queryOptions={departmentOption} isDynamic={true} onSelect={this.optionsBySelectDepartment.bind(this)} />
          </div>
          <div className="form-group">
            <Moolyaselect multiSelect={false} placeholder="Select Role" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedRole} queryType={'graphql'} query={roleQuery} reExecuteQuery={true} queryOptions={roleOption} isDynamic={true} onSelect={this.optionsByRole.bind(this)} />
          </div>
        </div>

        <div className="col-md-6 nopadding-right">
          <div className="form-group">
            <Moolyaselect multiSelect={false} placeholder="Select Chapter" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedChapter} queryType={'graphql'} query={chapterQuery} reExecuteQuery={true} queryOptions={chapterOption} isDynamic={true} onSelect={this.optionsBySelectChapter.bind(this)} />
          </div>
          <div className="form-group">
            <Moolyaselect multiSelect={false} placeholder="Select Community" className="form-control float-label" queryType={'graphql'} query={fetchcommunities} reExecuteQuery={true} isDynamic={true} selectedValue={this.state.selectedCommunity} onSelect={this.optionsBySelectCommunity.bind(this)} />
          </div>
          <div className="form-group">
            <Moolyaselect multiSelect={false} placeholder="Select Sub Department" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedSubDepartment} queryType={'graphql'} query={subDepartmentQuery} reExecuteQuery={true} queryOptions={subDepartmentOption} isDynamic={true} onSelect={this.optionsBySelectSubDepartment.bind(this)} />
          </div>
          <div className="form-group">
            <Moolyaselect multiSelect={false} placeholder="Select User" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedUser} queryType={'graphql'} query={usersQuery} reExecuteQuery={true} queryOptions={usersOption} isDynamic={true} onSelect={this.optionsBySelectUser.bind(this)} />
          </div>
        </div>
        <br className="brclear"/>
        <div className="assign-popup">
          <a data-toggle="tooltip" title="Save" data-placement="top" onClick={this.assignUser.bind(this)} className="hex_btn hex_btn_in">
            <span className="ml ml-save"></span>
          </a>
          <a data-toggle="tooltip" title="Cancel" data-placement="top" href="" className="hex_btn hex_btn_in" onClick={this.props.closePopOver}>
            <span className="ml ml-delete"></span>
          </a>
          <a data-toggle="tooltip" title="Self assign" data-placement="top" onClick={this.selfAssignTransaction.bind(this)} className="hex_btn hex_btn_in">
            <span className="ml flaticon-ml-assign-user"></span>
          </a>
          <a data-toggle="tooltip" title=" Unassign" data-placement="top" onClick={this.unAssignTransaction.bind(this)} className="hex_btn hex_btn_in">
            <span className="ml flaticon-ml-unassign-user"></span>
          </a>
        </div>
      </div>
    )
  }
}
