import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import formHandler from '../../../../commons/containers/MlFormHandler'
import MlActionComponent from '../../../../commons/components/actions/ActionComponent'
import Moolyaselect from  '../../../../commons/components/select/MoolyaSelect'
import MlAssignDepartmentComponent from './MlAssignDepartmentComponent'
import MlContactFormComponent from './MlContactFormComponent'
import {addBackendUserActionHandler} from '../actions/addBackendUserAction'
let FontAwesome = require('react-fontawesome');
let Select = require('react-select');


class MlAddBackendUser extends React.Component{
  constructor(props){
    super(props);
    this.state={
      mlAssignDepartmentDetails:[],
      mlAssignContactDetails:[],
      password:'',
      confirmPassword:'',
      selectedBackendUserType:'',
      selectedBackendUser:'Internal User',
      selectedSubChapter:'',
      pwdErrorMsg:''
     /* selectedCluster:'',
      selectedChapter:'',
      selectedDepartment:'',
      selectedSubDepartment:'',
      selectedRole:''*/
    }
    this.addEventHandler.bind(this);
    this.createBackendUser.bind(this);
    this.onBackendUserTypeSelect.bind(this);
    this.onBackendUserSelect.bind(this)
   /* this.onClusterSelect.bind(this);
    this.onChapterSelect.bind(this);
    this.onDepartmentSelect.bind(this);
    this.onSubDepartmentSelect.bind(this);
    this.onROleSelect.bind(this);*/
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
    $('.ConfirmPassword').click(function() {
      let pwd = document.getElementById("confirmPassword")
      if(pwd.getAttribute("type")=="password"){
        pwd.setAttribute("type","text");
      } else {
        pwd.setAttribute("type","password");
      }
    });
    $('.Password').click(function() {
      let pwd = document.getElementById("password");
      if(pwd.getAttribute("type")=="password"){
        pwd.setAttribute("type","text");
      } else {
        pwd.setAttribute("type","password");
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
    if (response){
      if(response.success)
        FlowRouter.go("/admin/settings/backendUserList");
      else
        toastr.error(response.result);
    }
  };

  async  createBackendUser() {
    let password=this.refs.password.value;
    let confirmPassword=this.refs.confirmPassword.value;
    if(confirmPassword!=password){
      alert("ur confirm pwd not match with pwd")
    }
   /* let userroles=[{
      roleId:this.refs.role.value,
      clusterId:this.refs.cluster.value,
      chapterId:this.refs.chapter.value,
      subChapterId:'',
      communityId:'',
      isActive: this.refs.isActive.checked,
      hierarchyLevel:''

    }]
    let userprofiles=[{
      isDefault: this.refs.isDefault.checked,
      clusterId: this.refs.cluster.value,
      userRoles:userroles
    }]*/

    let moolyaProfile = {
      firstName: this.refs.firstName.value,
      middleName: this.refs.middleName.value,
      lastName: this.refs.lastName.value,
      userType:this.state.selectedBackendUserType,
      subChapter:this.state.selectedSubChapter,
      roleType:this.state.selectedBackendUser,
      assignedDepartment:this.state.mlAssignDepartmentDetails,
      displayName:this.refs.displayName.value,
      email:this.refs.email.value,
      contact:this.state.mlAssignContactDetails,
      globalAssignment:this.refs.globalAssignment.checked,
      isActive:this.refs.isActive.checked,
      userProfiles:[]
    }
    let InternalUprofile={
      moolyaProfile: moolyaProfile
    }
    let profile={
      isInternaluser: true,
        isExternaluser: false,
        email: this.refs.email.value,
        InternalUprofile: InternalUprofile
    }
    let userObject={
      username: moolyaProfile.email,
      password: this.refs.password.value,
      profile:profile
    }

    console.log(userObject)
    const response = await addBackendUserActionHandler(userObject)
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
    this.setState({selectedBackendUser:val.value})
  }
  optionsBySelectSubChapter(val){
    this.setState({selectedSubChapter:val})
  }
  onCheckPassword(){
    let password=this.refs.password.value;
    let confirmPassword=this.refs.confirmPassword.value;
    if(confirmPassword!=password){
      this.setState({"pwdErrorMsg":'Confirm Password does not match with Password'})
      //alert("ur confirm pwd not match with pwd")
    }else{
      this.setState({"pwdErrorMsg":''})
    }
  }
  /*onClusterSelect(val){
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
  }*/

  render(){
    let MlActionConfig = [
      // {
      //   actionName: 'edit',
      //   showAction: true,
      //   handler: null
      // },
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
    let UserTypeOptions = [
      {value: 'moolya', label: 'moolya' , clearableValue: true},
      {value: 'non-moolya', label: 'non-moolya',clearableValue: true}
    ];
    let BackendUserOptions=[
      {value: 'Internal User', label: 'Internal User'},
      {value: 'External User', label: 'External User'}
    ]
    let query=gql` query{
  data:fetchCountriesSearch{label:country,value:countryCode}
}
`;
  /*  let rolequery=gql` query{
    data:fetchActiveRoles{label:roleName,value:_id}
    }
`;*/
    let subChapterQuery=gql` query{
  data:fetchActiveSubChapters{label:subChapterName,value:_id}
}
`;

    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Create Backend User</h2>
          <div className="col-md-6 nopadding-left">
            <div className="left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
                smoothScrolling={true}
              >
                <div className="form_bg">
                    <div className="form-group">
                      <input type="text" ref="firstName" placeholder="First Name" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" ref="middleName" placeholder="Middle Name" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" ref="lastName" placeholder="Last Name" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <Select name="form-field-name" placeholder="Backend User Type"  className="float-label"  options={UserTypeOptions}  value={this.state.selectedBackendUserType}  onChange={this.onBackendUserTypeSelect.bind(this)}
                      />
                    </div>

                    {this.state.selectedBackendUserType=='non-moolya'&&(<div className="form-group">
                   <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Select Subchapter"  selectedValue={this.state.selectedSubChapter} queryType={"graphql"} query={subChapterQuery} isDynamic={true}  onSelect={this.optionsBySelectSubChapter.bind(this)} />
                   </div>)}
                    <div className="form-group">
                    {/*  <Select name="form-field-name" value="select" options={options1} className="float-label"/>*/}
                      <Select name="form-field-name" placeholder="Select Role"  className="float-label"  options={BackendUserOptions}  value={this.state.selectedBackendUser}  onChange={this.onBackendUserSelect.bind(this)} disabled={true}
                      />
                   {/* <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedBackendUser} placeholder="Select Role" queryType={"graphql"} query={rolequery}  isDynamic={true}  onSelect={this.onBackendUserSelect.bind(this)} />*/}
                    </div>
                    <div className="form-group">
                      <input type="Password" ref="password" defaultValue={this.state.password} placeholder="Create Password" className="form-control float-label" id="password"/>
                      <FontAwesome name='eye' className="password_icon Password"/>
                    </div>
                    <div className="form-group">
                      <text style={{float:'right',color:'#ef4647',"font-size":'12px',"margin-top":'-12px',"font-weight":'bold'}}>{this.state.pwdErrorMsg}</text>
                      <input type="Password" ref="confirmPassword" defaultValue={this.state.confirmPassword} placeholder="Confirm Password" className="form-control float-label" onBlur={this.onCheckPassword.bind(this)} id="confirmPassword"/>
                      <FontAwesome name='eye' className="password_icon ConfirmPassword"/>
                    </div>
                  {/*  <div className="form-group"> <a href="" className="mlUpload_btn">Reset Password</a> <a href="#" className="mlUpload_btn">Send Notification</a> </div>*/}

                    <MlAssignDepartmentComponent getAssignedDepartments={this.getAssignedDepartments.bind(this)} selectedBackendUserType={this.state.selectedBackendUserType} selectedSubChapter={this.state.selectedSubChapter} />
                </div>
              </ScrollArea>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <div className="left_wrap">
                <ScrollArea
                  speed={0.8}
                  className="left_wrap"
                  smoothScrolling={true}
                >
                    <div className="form-group">
                      <input type="text" ref="displayName" placeholder="Display Name" className="form-control float-label" id=""/>
                    </div>
                    <div className="form-group">
                      <input type="text" ref="email" placeholder="Email id" className="form-control float-label" id=""/>
                    </div>
                    <MlContactFormComponent getAssignedContacts={this.getAssignedContacts.bind(this)}/>

                    <div className="form-group switch_wrap inline_switch">
                      <label>Global Assignment Availability</label>
                      <label className="switch">
                        <input type="checkbox" ref="globalAssignment"/>
                        <div className="slider"></div>
                      </label>
                    </div>
                    <br className="brclear"/>
                    <div className="form-group switch_wrap inline_switch">
                      <label>Status</label>
                      <label className="switch">
                        <input type="checkbox" ref="isActive"/>
                        <div className="slider"></div>
                      </label>
                    </div>
                    <br className="brclear"/>
                    {/*<div className="panel panel-default">
                      <div className="panel-heading">Assigned Cluster Details</div>
                      <div className="panel-body">

                        <div className="form-group">
                          <input type="text" ref="cluster" placeholder="Cluster" className="form-control float-label" id="" disabled="true"/>
                          /!*<Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedCluster} queryType={"graphql"} query={query}  isDynamic={true}  onSelect={this.onClusterSelect.bind(this)} />*!/
                         </div>
                        <div className="form-group">
                          <input type="text" ref="chapter" placeholder="Chapter" className="form-control float-label" id="" disabled="true"/>
                          /!*<Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedChapter} queryType={"graphql"} query={query}  isDynamic={true}  onSelect={this.onChapterSelect.bind(this)} />*!/
                        </div>
                        <div className="form-group">
                          <input type="text" ref="department" placeholder="Department" className="form-control float-label" id="" disabled="true"/>
                         /!* <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedDepartment} queryType={"graphql"} query={query}  isDynamic={true}  onSelect={this.onDepartmentSelect.bind(this)} />*!/
                         </div>
                        <div className="form-group">
                          <input type="text" ref="subDepartment" placeholder="Sub Department" className="form-control float-label" id="" disabled="true"/>
                          /!*<Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedSubDepartment} queryType={"graphql"} query={query}  isDynamic={true}  onSelect={this.onSubDepartmentSelect.bind(this)} />*!/
                         </div>
                        <div className="form-group">
                         <input type="text" ref="role" placeholder="Role" className="form-control float-label" id="" disabled="true"/>
                          /!*<Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedRole} queryType={"graphql"} query={query}  isDynamic={true}  onSelect={this.onROleSelect.bind(this)} />*!/
                        </div>
                        <div className="form-group">
                          <div className="input_types"><input  ref="isDefault" id="checkbox1" type="checkbox" name="checkbox" value="1" /><label htmlFor="checkbox1"><span></span>Make Default</label></div>
                        </div>
                      </div>
                    </div>*/}
                </ScrollArea>
              </div>
            </div>
          </div>

        </div>
        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"
        />
      </div>

    )
  }
};
export default MlAddBackendUser = formHandler()(MlAddBackendUser);
