import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import Moolyaselect from "../../../../commons/components/select/MoolyaSelect";
import {
  assignUserForTransactionAction,
  selfAssignUserForTransactionAction,
  unAssignUserForTransactionAction
} from "../actions/assignUserforTransactionAction";

export default class MlAssignComponent extends Component {

  constructor(props){
    super(props);
    this.state={
                  show:true,
                  selectedValue:false,
                  selectedCluster:null,
                  selectedChapter:null,
                  selectedSubChapter:null,
                  selectedCommunity:null,
                  selectedDepartment:null,
                  selectedSubDepartment:null,
                  selectedRole:null,
                  selectedUser:null
                };
    return this;
  }

  componentDidMount() {
  }

  optionsBySelectCluster(value){

    this.setState({selectedCluster:value})
  }
  optionsBySelectChapter(value){

    this.setState({selectedChapter:value})
  }
  optionsBySelectCommunity(value){

    this.setState({selectedCommunity:value})
  }
  optionsBySelectSubChapter(value){

    this.setState({selectedSubChapter:value})
  }

  optionsBySelectAllUser(value) {
    this.setState({selectedUser: value})
  }
  optionsBySelectDepartment(value){

    this.setState({selectedDepartment:value})
  }
  optionsBySelectSubDepartment(value){

    this.setState({selectedSubDepartment:value})
  }
  optionsByRole(value){

    this.setState({selectedRole:value})
  }
  optionsBySelectUser(value){

    this.setState({selectedUser:value})
  }
  cancel(){
    this.setState({show:false})
   // FlowRouter.go("/");/*/transactions/registrationRequested");*/
  }
  async assignUser(){
    let params={
      "cluster": this.state.selectedCluster,
      "chapter": this.state.selectedChapter,
      "subChapter": this.state.selectedSubChapter,
      "community": this.state.selectedCommunity,
      "department": this.state.selectedDepartment,
      "subDepartment": this.state.selectedSubDepartment,
      "role": this.state.selectedRole,
      "user": this.state.selectedUser
    }
    let transactionType=this.props.transactionType
    const response = await assignUserForTransactionAction("Registration",params,this.props.transactionId,"Registration","assignTransaction");
    if(response.success){
      this.setState({show:false,selectedCluster:null,selectedChapter:null,selectedSubChapter:null,selectedCommunity:null,selectedDepartment:null,selectedSubDepartment:null,selectedRole:null,selectedUser:null})
      toastr.success("Transaction assigned to user successfully");
      FlowRouter.go("/admin/transactions/registrationRequested");
    }else{
      toastr.error("Wrong Hierarchy");
      this.setState({show:false})
      FlowRouter.go("/admin/transactions/registrationRequested");
    }
  }

  async selfAssignTransaction(){
    let transactionType=this.props.transactionType
    const response = await selfAssignUserForTransactionAction("Registration",this.props.transactionId,"Registration","selfAssignTransaction");
    if(response.success){
      toastr.success("Self Assignment successfull");
      FlowRouter.go("/admin/transactions/registrationRequested");
    }else{
      toastr.error("Wrong Hierarchy");
      this.setState({show:false})
      FlowRouter.go("/admin/transactions/registrationRequested");
    }
  }

  async unAssignTransaction(){
    let transactionType=this.props.transactionType
    const response = await unAssignUserForTransactionAction("Registration",this.props.transactionId,"Registration","unAssignTransaction");
    if(response.success){
      toastr.success("UnAssignment successfull");
      FlowRouter.go("/admin/transactions/registrationRequested");
    }else{
      toastr.error("Wrong Hierarchy");
      this.setState({show:false})
      FlowRouter.go("/admin/transactions/registrationRequested");
    }
  }

  render() {
    let that=this;

    let moolyaUserQuery = gql` query{
      data:fetchMoolyaInternalUsers{label:username,value:_id}
    }
    `;
    let clusterQuery=gql` query{
      data:fetchActiveClusters{label:countryName,value:_id}
    }
    `;
    let chapterQuery=gql`query($id:String){  
    data:fetchChapters(id:$id) {
      value:_id
      label:chapterName
      }  
    }`;
    let subChapterquery=gql`query($id:String){  
      data:fetchSubChaptersForRegistration(id:$id) {
        value:_id
        label:subChapterName
      }  
    }`;
    let fetchcommunities = gql` query{
      data:fetchCommunityDefinition{label:name,value:code}
    }
    `;
   /* let departmentQuery=gql`query($cluster:String,$chapter:String,$subChapter:String){
      data:fetchDepartmentsForRegistration(cluster:$cluster,chapter:$chapter,subChapter:$subChapter) {
        value:_id
        label:departmentName
      }
    }`;*/
    let departmentQuery=gql`query($isMoolya:Boolean,$clusterId:String){  
      data:fetchHierarchyMoolyaDepartment(isMoolya:$isMoolya,clusterId:$clusterId) {
        value:_id
        label:departmentName
      }  
    }`;

    let subDepartmentQuery=gql`query($id:String){  
      data:fetchSubDepartmentsForRegistration(id:$id) {
        value:_id
        label:subDepartmentName
      }  
    }`;
    let roleQuery=gql`query($clusterId:String,$departmentId:String,$subDepartmentId:String){  
      data:fetchHierarchyRoles(clusterId:$clusterId,departmentId:$departmentId,subDepartmentId:$subDepartmentId) {
        value:roleId
        label:roleName
      }  
    }`;
    let usersQuery=gql`query($clusterId:String,$departmentId:String,$subDepartmentId:String,$roleId:String){  
      data:fetchHierarchyUsers(clusterId:$clusterId,departmentId:$departmentId,subDepartmentId:$subDepartmentId,roleId:$roleId) {
        value:_id
        label:username
      }  
    }`;

    let chapterOption={options: { variables: {id:this.state.selectedCluster}}};
    let subChapterOption={options: { variables: {id:this.state.selectedChapter}}}
   /* let departmentOption={options: { variables: {cluster:this.state.selectedCluster,chapter:this.state.selectedChapter,subChapter:this.state.selectedSubChapter}}}*/
    let departmentOption={options: { variables: {isMoolya:true,clusterId:this.state.selectedCluster}}}
    let subDepartmentOption={options: { variables: {id:this.state.selectedDepartment}}};
    let roleOption={
                    options: {
                      variables: {
                        clusterId:this.state.selectedCluster,
                        departmentId:this.state.selectedDepartment,
                        subDepartmentId:this.state.selectedSubDepartment
                    }}};
    let usersOption = {
                  options: {
                    variables: {
                      clusterId:this.state.selectedCluster,
                      departmentId:this.state.selectedDepartment,
                      subDepartmentId:this.state.selectedSubDepartment,
                      roleId:this.state.selectedRole
                    }}};

    return (
      <div>
      {this.state.show==true?

    /*  <div className="ml_assignrequest" style={{'display':'none'}}>*/
      <div className="panel panel-default-bottom col-md-12">
        <div className="mrgn-btm">
          {/*<input type="text" placeholder="Search User" className="search-form-control" />*/}
          <Moolyaselect multiSelect={false} placeholder="Select User" className="search-form-control"
                        valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedUser}
                        queryType={"graphql"} query={moolyaUserQuery} onSelect={that.optionsBySelectAllUser.bind(this)}
                        isDynamic={true}/>
        </div>
        <div className="col-md-6 nopadding-left">
          <div className="form-group">
            <Moolyaselect multiSelect={false} placeholder="Select Cluster" className="form-control float-label" valueKey={'value'} labelKey={'label'}  selectedValue={this.state.selectedCluster} queryType={"graphql"} query={clusterQuery} onSelect={that.optionsBySelectCluster.bind(this)} isDynamic={true}/>
          </div>
          <div className="form-group">
            <Moolyaselect multiSelect={false} placeholder="Select Subchapter" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedSubChapter} queryType={"graphql"} query={subChapterquery} reExecuteQuery={true} queryOptions={subChapterOption} isDynamic={true} onSelect={this.optionsBySelectSubChapter.bind(this)} />
          </div>
          <div className="form-group">
            <Moolyaselect multiSelect={false} placeholder="Select Department" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedDepartment} queryType={"graphql"} query={departmentQuery} reExecuteQuery={true} queryOptions={departmentOption} isDynamic={true} onSelect={this.optionsBySelectDepartment.bind(this)} />
          </div>
          <div className="form-group">
            <Moolyaselect multiSelect={false} placeholder="Select Role" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedRole} queryType={"graphql"} query={roleQuery} reExecuteQuery={true} queryOptions={roleOption} isDynamic={true} onSelect={this.optionsByRole.bind(this)} />
          </div>
        </div>

        <div className="col-md-6 nopadding-right">
          <div className="form-group">
            <Moolyaselect multiSelect={false} placeholder="Select Chapter" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedChapter} queryType={"graphql"} query={chapterQuery} reExecuteQuery={true} queryOptions={chapterOption} isDynamic={true} onSelect={this.optionsBySelectChapter.bind(this)} />
          </div>
          <div className="form-group">
            <Moolyaselect multiSelect={false} placeholder="Select Community" className="form-control float-label"  queryType={"graphql"} query={fetchcommunities}  reExecuteQuery={true} isDynamic={true} selectedValue={this.state.selectedCommunity}  onSelect={this.optionsBySelectCommunity.bind(this)} />
          </div>
          <div className="form-group">
            <Moolyaselect multiSelect={false} placeholder="Select Sub Department" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedSubDepartment} queryType={"graphql"} query={subDepartmentQuery} reExecuteQuery={true} queryOptions={subDepartmentOption} isDynamic={true} onSelect={this.optionsBySelectSubDepartment.bind(this)} />
          </div>
          <div className="form-group">
            <Moolyaselect multiSelect={false} placeholder="Select User" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedUser} queryType={"graphql"} query={usersQuery} reExecuteQuery={true} queryOptions={usersOption} isDynamic={true} onSelect={this.optionsBySelectUser.bind(this)} />
          </div>
        </div>

        <div className="assign-popup">
          <a data-toggle="tooltip" title="Save" data-placement="top" onClick={this.assignUser.bind(this)} className="hex_btn hex_btn_in">
            <span className="ml ml-save"></span>
          </a>
          <a data-toggle="tooltip" title="Cancel" data-placement="top" href="" className="hex_btn hex_btn_in" onClick={this.cancel.bind(this)}>
            <span className="ml ml-delete"></span>
          </a>
        </div>

       {/* {this.props.canAssign?*/}
        <div className="assign-popup">
          <a data-toggle="tooltip" title="Self assign" data-placement="top" onClick={this.selfAssignTransaction.bind(this)} className="hex_btn hex_btn_in">
            <span className="ml flaticon-ml-assign-user"></span>
          </a>
        </div>
          {/*:<div></div>}*/}

        {/*{this.props.canUnAssign?*/}
        <div className="assign-popup">
          <a data-toggle="tooltip" title=" Unassign" data-placement="top" onClick={this.unAssignTransaction.bind(this)} className="hex_btn hex_btn_in">
            <span className="ml flaticon-ml-unassign-user"></span>
          </a>
        </div>
          {/*:<div></div>}*/}


      </div>
        :<div></div>}
      </div>

    )
  }
}
