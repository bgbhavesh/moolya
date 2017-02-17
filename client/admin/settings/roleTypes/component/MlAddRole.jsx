
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import formHandler from '../../../../commons/containers/MlFormHandler'
import {addBackendUserActionHandler} from '../actions/addRoleAction'
import MlAssignClustersToRoles from './MlAssignClustersToRoles'
import MlAssignModulesToRoles from './MlAssignModulesToRoles'

let Select = require('react-select');


var options = [
  {value: 'select', label: 'Backend User Role Type'},
  {value: 'option one', label: 'Option One'},
  {value: 'option two', label: 'Option Two'}
];
var options1 = [
  {value: 'select', label: 'Role Type'},
  {value: 'option one', label: 'Option One'},
  {value: 'Option two', label: 'Option Two'}
];
var options2 = [
  {value: 'select', label: 'Cluster'},
  {value: 'option one', label: 'Option One'},
  {value: 'Option two', label: 'Option Two'}
];
var options3 = [
  {value: 'select', label: 'Chapter'},
  {value: 'option one', label: 'Option One'},
  {value: 'Option two', label: 'Option Two'}
];
var options4 = [
  {value: 'select', label: 'Sub Chapter'},
  {value: 'option one', label: 'Option One'},
  {value: 'Option two', label: 'Option Two'}
];
var options5 = [
  {value: 'select', label: 'Department'},
  {value: 'option one', label: 'Option One'},
  {value: 'Option two', label: 'Option Two'}
];
var options6 = [
  {value: 'select', label: 'Sub Department'},
  {value: 'option one', label: 'Option One'},
  {value: 'Option two', label: 'Option Two'}
];


class MlAddRole extends React.Component{
  constructor(props){
    super(props);
    this.state={
      roleName:'',
      displayName:'',
      roleType:'',
      userType:'',
      aboutRole:'',
      assignRoleToClusters:[],
      roleStatus:'',
      moduleInfo:''
    }
    this.addEventHandler.bind(this);
    this.createBackendUser.bind(this);
    this.onBackendUserTypeSelect.bind(this);
    this.onBackendUserSelect.bind(this)
    this.onClusterSelect.bind(this);
    this.onChapterSelect.bind(this);
    this.onDepartmentSelect.bind(this);
    this.onSubDepartmentSelect.bind(this);
    this.onROleSelect.bind(this);
    return this;
  }
  componentDidMount()
  {
    $(function() {
      $('.float-label').jvFloat();
    });

    $('.switch input').change(function() {
      if ($(this).is(':checked')) {
        $(this).parent('.switch').addClass('on');
      }else{
        $(this).parent('.switch').removeClass('on');
      }
    });
  }
  async addEventHandler() {
    const resp=await this.createBackendUser();
    return resp;
  }

  async handleError(response) {
    alert(response)
  };

  async handleSuccess(response) {

    FlowRouter.go("/admin/settings/addBackendUser");
  };

  getassignRoleToClusters(details){
    console.log("details->"+details);
    this.setState({'assignRoleToClusters':details})
  }

  getmodulesToRole(details){
    console.log("details->"+details);
    this.setState({'assignModulesToRoles':details})
  }
  onSubmit(){
    console.log(this.state.assignRoleToClusters)
  }

  async  createBackendUser() {
    let backendUserDetails = {
      transactionName: this.refs.firstName.value,
      transactionDisplayName: this.refs.middleName.value,
      transactionDescription: this.refs.lastName.value,
      userType:this.state.selectedBackendUserType,
      roleType:this.state.selectedBackendUser,
      assignedDepartment:this.state.mlAssignDepartmentDetails,
      displayName:this.refs.displayName.value,
      email:this.refs.email.value,
      contact:this.state.mlAssignContactDetails,
      globalAssignment:this.refs.globalAssignment.checked,
      isActive: this.refs.isActive.checked,
      clusterId:this.state.selectedCluster,
      chapterId:this.state.selectedChapter,
      departmentId:this.state.selectedDepartment,
      subDepartmentId:this.state.selectedSubDepartment,
      role:this.state.selectedRole,
      isDefault:this.refs.isDefault.checked
    }

    console.log(backendUserDetails)
    const response = await addRoleActionHandler(backendUserDetails)
    return response;

  }
  getAssignedDepartments(departments){
    this.setState({'mlAssignDepartmentDetails':departments})
  }
  getAssignedContacts(contacts){
    this.setState({'mlAssignContactDetails':contacts})
  }

  onBackendUserTypeSelect(val){
    this.setState({selectedBackendUserType:val.value})
  }
  onBackendUserSelect(val){
    this.setState({selectedBackendUser:val})
  }
  onClusterSelect(val){
    this.setState({selectedCluster:val})
  }
  onChapterSelect(val){
    this.setState({selectedChapter:val})
  }
  onDepartmentSelect(val){
    this.setState({selectedDepartment:val})
  }
  onSubDepartmentSelect(val){
    this.setState({selectedSubDepartment:val})
  }
  onROleSelect(val){
    this.setState({selectedRole:val})
  }

  render(){
    let MlActionConfig = [
      {
        actionName: 'edit',
        showAction: true,
        handler: null
      },
      {
        showAction: true,
        actionName: 'add',
        handler: async(event) => this.props.handler(this.createBackendUser.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'logout',
        handler: null
      }
    ]
    let query=gql` query{
  data:fetchCountriesSearch{label:country,value:countryCode}
}
`;

   return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Role</h2>
          <div className="col-md-6 nopadding-left">
            <div className="left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
                smoothScrolling={true}
                default={true}
              >
                <div className="form_bg">
                  <form>
                    <div className="form-group">
                      <input type="text" placeholder="Role Name" className="form-control float-label" id=""/>

                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Display Name" className="form-control float-label" id=""/>

                    </div>
                    <div className="form-group">

                      <Select
                        name="form-field-name"
                        value="select"
                        options={options}
                        //onChange={logChange}
                        className="float-label"
                      />

                    </div>
                    <div className="form-group">
                      <Select
                        name="form-field-name"
                        value="select"
                        options={options1}
                        //onChange={logChange}
                        className="float-label"
                      />

                    </div>
                    <div className="form-group">
                      <textarea placeholder="About" className="form-control float-label"></textarea>
                    </div>

                    <MlAssignClustersToRoles getassignRoleToClusters={this.getassignRoleToClusters.bind(this)}/>

                    <div className="form-group switch_wrap inline_switch">
                      <label className="">Overall Role Status</label>
                      <label className="switch">
                        <input type="checkbox" />
                        <div className="slider"></div>
                      </label>
                    </div>
                    <br className="brclear"/>


                  </form>
                </div>
              </ScrollArea>
            </div>
          </div>

          {/*<MlAssignModulesToRoles getassignModulesToRoles={this.getmodulesToRole.bind(this)}/>*/}

          <span className="actions_switch show_act"></span>
          <div className="bottom_actions_block show_block">
            <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/edit_icon.png"/> </a></div>
            <div className="hex_btn"><a href="/admin/createSubDepartment" className="hex_btn hex_btn_in"> <img src="/images/act_add_icon.png"/> </a></div>
            <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_logout_icon.png"/> </a></div>
            <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_progress_icon.png"/> </a></div>
            <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_select_icon.png"/> </a></div>
          </div>
        </div>


      </div>
    )
  }
};
export default MlAddRole = formHandler()(MlAddRole);

