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
import {findBackendUserActionHandler} from '../actions/findBackendUserAction'
import {updateBackendUserActionHandler} from '../actions/updateBackendUserAction'
import {resetPasswordActionHandler} from '../actions/resetPasswordAction'
import {OnToggleSwitch,initalizeFloatLabel,passwordVisibilityHandler} from '../../../utils/formElemUtil';
let FontAwesome = require('react-fontawesome');
let Select = require('react-select');


class MlEditBackendUser extends React.Component{
  constructor(props){
    super(props);
    this.state={
      loading:true,
      data:{},
      //userProfiles:[{isDefault:null,clusterId:'',userRoles:[{roleId:'',clusterId:'',chapterId:'',validFrom:'',validTo:'',subChapterId:'',communityId:'',isActive:'',hierarchyLevel:'',hierarchyCode:''}]}],
      userProfiles:[],
      mlAssignDepartmentDetails:[],
      mlAssignContactDetails:[],
      password:'',
      confirmPassword:'',
      selectedBackendUserType:'',
      selectedBackendUser:'',
      clusterId:'',
      chapterId:'',
      communityId:'',
      subChapterId:'',
      roleId:'',
      isDefault:null,
      deActive:false,
      isActive:null,
      globalStatus:null,
      selectedSubChapter:'',
    }
    this.addEventHandler.bind(this);
    this.updateBackendUser.bind(this);
    this.onBackendUserTypeSelect.bind(this);
    this.onBackendUserSelect.bind(this);
    this.onGlobalStatusChanged = this.onGlobalStatusChanged.bind(this);
    this.onisActiveChanged= this.onisActiveChanged.bind(this);
    this.onMakeDefultChange=this.onMakeDefultChange.bind(this)
    return this;
  }
  componentDidMount()
  {
  }

  componentDidUpdate(){
    OnToggleSwitch(true,true);
    initalizeFloatLabel();
    passwordVisibilityHandler();
    var WinHeight = $(window).height();
    $('.left_wrap').height(WinHeight-(90+$('.admin_header').outerHeight(true)));
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

  componentWillMount() {
    const resp=this.findBackendUser();
    return resp;
  }

  async findBackendUser(){
    let userTypeId=this.props.config;
    //console.log(userTypeId)
    const response = await findBackendUserActionHandler(userTypeId);
    this.setState({loading:false,data:response});
   if(response){
     this.setState({selectedBackendUserType:this.state.data.profile.InternalUprofile.moolyaProfile.userType})
     this.setState({selectedSubChapter:this.state.data.profile.InternalUprofile.moolyaProfile.subChapter})
     this.setState({selectedBackendUser:this.state.data.profile.InternalUprofile.moolyaProfile.roleType})
     this.setState({deActive:this.state.data.profile.isActive})
     this.setState({isActive:this.state.data.profile.InternalUprofile.moolyaProfile.isActive})
     this.setState({globalStatus:this.state.data.profile.InternalUprofile.moolyaProfile.globalAssignment})
     let clusterId="",chapterId='',subChapterId='',communityId=''
     let dataDetails=this.state.data
       if(dataDetails["profile"]["InternalUprofile"]["moolyaProfile"]["userProfiles"][0]){
       let userProfiles=dataDetails["profile"]["InternalUprofile"]["moolyaProfile"]["userProfiles"]
         let userProfilesDetails=[]

         for(let i=0;i<userProfiles.length;i++){
           let userRolesDetails=[]
           let userRole=userProfiles[i].userRoles
           for(let j=0;j<userRole.length;j++){
             let json={
               roleId:userRole[j].roleId,
               roleName:userRole[j].roleName,
               clusterId:userRole[j].clusterId,
               chapterId:userRole[j].chapterId,
               validFrom:userRole[j].validFrom,
               validTo:userRole[j].validTo,
               subChapterId:userRole[j].subChapterId,
               communityId:userRole[j].communityId,
               isActive:userRole[j].isActive,
               hierarchyLevel:userRole[j].hierarchyLevel,
               hierarchyCode:userRole[j].hierarchyCode
             }
             userRolesDetails.push(json)
           }
         let json={
           isDefault:userProfiles[i].isDefault,
           clusterId:userProfiles[i].clusterId,
           clusterName:userProfiles[i].clusterName,
           userRoles:userRolesDetails
         }
           userProfilesDetails.push(json)
         }
       this.setState({'userProfiles':userProfilesDetails});

       }else{

       }
    }
  }



  onGlobalStatusChanged(e){
    if(e.currentTarget.checked){
      this.setState({"globalStatus":true})
    }else{
      this.setState({"globalStatus":false})
    }
  }

  onisActiveChanged(event){

    let dataDetails=this.state.data;
    if(event.currentTarget.checked){
      this.setState({"deActive":true})
    }else{
      this.setState({"deActive":false})
    }
  }
  onMakeDefultChange(id,event){
      let userProfilesDetails=this.state.userProfiles
    if(event.currentTarget.checked){
        let decision = false;
        for(let i=0;i<userProfilesDetails.length;i++) {
          if (userProfilesDetails[i].isDefault == true) {
            decision = true;
            break;
          }
          else {
            decision = false;
          }
        }
      if(decision){
        userProfilesDetails[id]['isDefault']=false
        toastr.error("Please select one default profile");
      }else{
        userProfilesDetails[id]['isDefault']=true
        this.setState({userProfiles:userProfilesDetails})
      }
      }else {
        userProfilesDetails[id]['isDefault']=false
        this.setState({userProfiles: userProfilesDetails})
      }
  }

  async  updateBackendUser() {
    let dataDetails=this.state.data
    let userprofiles=[]
    if(dataDetails["profile"]["InternalUprofile"]["moolyaProfile"]["userProfiles"][0]){
      let userProfilesDetails=this.state.userProfiles;
      for(let i=0;i<userProfilesDetails.length;i++){
        let userRolesDetails=[]
        let userRole=userProfilesDetails[i].userRoles
        for(let j=0;j<userRole.length;j++){
          let json={
            roleId:userRole[j].roleId,
            clusterId:userRole[j].clusterId,
            chapterId:userRole[j].chapterId,
            validFrom:userRole[j].validFrom,
            validTo:userRole[j].validTo,
            subChapterId:userRole[j].subChapterId,
            communityId:userRole[j].communityId,
            isActive:userRole[j].isActive,
            hierarchyLevel:userRole[j].hierarchyLevel,
            hierarchyCode:userRole[j].hierarchyCode
          }
          userRolesDetails.push(json)
        }
        let json={
          isDefault:userProfilesDetails[i].isDefault,
          clusterId:userProfilesDetails[i].clusterId,
          userRoles:userRolesDetails
        }
        userprofiles.push(json)
      }
    }


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
      isActive:true,
      userProfiles:userprofiles
    }
    let InternalUprofile={
      moolyaProfile: moolyaProfile
    }
    let profile={
      isInternaluser: true,
      isExternaluser: false,
      email: this.refs.email.value,
      isActive:this.refs.deActive.checked,
      InternalUprofile: InternalUprofile
    }
    let userObject={
      username: moolyaProfile.email,
      // password:this.refs.password.value,
      profile:profile
    }

    console.log(userObject)
    let updateUserObject={
      userId:this.refs.id.value,
      userObject:userObject

    }
    const response = await updateBackendUserActionHandler(updateUserObject)
    return response;
  }

  async resetPassword() {
    let userDetails={
      userId:this.refs.id.value,
      password:this.refs.confirmPassword.value
    }
    this.onCheckPassword();
    if(this.state.pwdErrorMsg)
      toastr.error("Confirm Password does not match with Password");
    else{
      const response = await resetPasswordActionHandler(userDetails);
      this.refs.id.value='';
      this.refs.confirmPassword.value = '';
      this.refs.password.value = '';
      this.setState({"pwdErrorMsg":'Password reset complete'})
      toastr.error(response.result);
    }
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
    }else{
      this.setState({"pwdErrorMsg":''})
    }
  }

  render(){
    let MlActionConfig = [
      {
        actionName: 'save',
        showAction: true,
        handler: async(event) => this.props.handler(this.updateBackendUser.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: null
      }
    ];

    let UserTypeOptions = [
      {value: 'moolya', label: 'moolya'},
      {value: 'non-moolya', label: 'non-moolya'}
    ];

    let BackendUserOptions=[
      {value: 'Internal User', label: 'Internal User'},
      {value: 'External User', label: 'External User'}
    ];

    let query=gql` query{
  data:fetchCountriesSearch{label:country,value:countryCode}
}
`;
    let rolequery=gql` query{
    data:fetchActiveRoles{label:roleName,value:_id}
    }
`;
    let subChapterQuery=gql` query{
  data:fetchActiveSubChapters{label:subChapterName,value:_id}
}
`;
    const showLoader=this.state.loading;
    let that=this;
    return (
      <div className="admin_main_wrap">
        {showLoader===true?( <div className="loader_container"><div className="loader_wrap"></div></div>):(

        <div className="admin_padding_wrap">
          <h2>Edit Backend User</h2>
          <div className="col-md-6 nopadding-left">
            <div className="left_wrap">
              <ScrollArea
                speed={0.8}
                className="left_wrap"
                smoothScrolling={true}
              >
                <div className="form_bg">
                  <form>
                  <div className="form-group">
                    <input type="text" ref="id" value={that.state.data&&that.state.data._id} hidden="true"/>
                    <input type="text" ref="firstName" placeholder="First Name" defaultValue={that.state.data&&that.state.data.profile.InternalUprofile.moolyaProfile.firstName} className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref="middleName" placeholder="Middle Name" defaultValue={that.state.data&&that.state.data.profile.InternalUprofile.moolyaProfile.middleName} className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref="lastName" placeholder="Last Name" defaultValue={that.state.data&&that.state.data.profile.InternalUprofile.moolyaProfile.lastName} className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <Select name="form-field-name" placeholder="Backend User Type"   className="float-label"  options={UserTypeOptions}  value={that.state.selectedBackendUserType}  onChange={that.onBackendUserTypeSelect.bind(that)}
                    />
                  </div>
                  {that.state.selectedBackendUserType=='non-moolya'&&(
                    <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} placeholder="Select Subchapter"  selectedValue={that.state.selectedSubChapter} queryType={"graphql"} query={subChapterQuery} isDynamic={true}  onSelect={that.optionsBySelectSubChapter.bind(that)} />
                  )}
                    {/*  <Select name="form-field-name" value="select" options={options1} className="float-label"/>*/}
                    <div className="form-group">
                    <Select name="form-field-name" placeholder="Select Role"  className="float-label"  options={BackendUserOptions}  value={that.state.selectedBackendUser}  onChange={that.onBackendUserSelect.bind(that)}
                    />
                      </div>
                   {/* <Moolyaselect multiSelect={false} className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedBackendUser} queryType={"graphql"} query={rolequery}  isDynamic={true}  onSelect={this.onBackendUserSelect.bind(this)} />*/}
                 {/* <div className="form-group">
                    <input type="Password" hidden="true" ref="password" placeholder="Create Password" defaultValue={this.state.data&&this.state.data.profile.InternalUprofile.moolyaProfile.password} className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <input type="Password" hidden="true"  ref="confirmPassword"  placeholder="Confirm Password" defaultValue={this.state.data&&this.state.data.profile.InternalUprofile.moolyaProfile.password} className="form-control float-label" id=""/>
                  </div>
                </div>*/}
                <div className="form-group">
                  <input type="Password" ref="password" defaultValue={that.state.password} placeholder="Create Password" className="form-control float-label" id="password"/>
                  <FontAwesome name='eye-slash' className="password_icon Password hide_p"/>
                </div>
                <div className="form-group">
                  <text style={{float:'right',color:'#ef1012',"font-size":'12px',"margin-top":'-12px',"font-weight":'bold'}}>{that.state.pwdErrorMsg}</text>
                  <input type="Password" ref="confirmPassword" defaultValue={that.state.confirmPassword} placeholder="Confirm Password" className="form-control float-label" onBlur={that.onCheckPassword.bind(that)} id="confirmPassword"/>
                  <FontAwesome name='eye-slash' className="password_icon ConfirmPassword hide_p"/>
                </div>
                  <div className="form-group"> <a href="" className="mlUpload_btn" onClick={this.resetPassword.bind(this)}>Reset Password</a> <a href="#" className="mlUpload_btn">Send Notification</a> </div>

                  <MlAssignDepartmentComponent getAssignedDepartments={that.getAssignedDepartments.bind(that)} selectedBackendUserType={that.state.selectedBackendUserType} selectedSubChapter={that.state.selectedSubChapter} departments={that.state.data&&that.state.data.profile.InternalUprofile.moolyaProfile.assignedDepartment} />
                  </form>
                </div>
              </ScrollArea>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">

              <div className="left_wrap">
                <ScrollArea
                  speed={0.8}
                  className="left_wrap"
                  smoothScrolling={true}
                >
                  <div className="form_bg">
                  <form>
                  <div className="form-group">
                    <input type="text" ref="displayName" placeholder="Display Name" defaultValue={that.state.data&&that.state.data.profile.InternalUprofile.moolyaProfile.displayName} className="form-control float-label" id=""/>
                  </div>
                  <div className="form-group">
                    <input type="text" ref="email" placeholder="Email id" defaultValue={that.state.data&&that.state.data.profile.InternalUprofile.moolyaProfile.email} className="form-control float-label" id="" disabled="disabled"/>
                  </div>

                  <MlContactFormComponent getAssignedContacts={that.getAssignedContacts.bind(that)} contacts={that.state.data && that.state.data.profile.InternalUprofile.moolyaProfile.contact}/>

                  <div className="form-group switch_wrap inline_switch">
                    <label>Global Assignment Availability</label>
                    <label className="switch">
                      <input type="checkbox" ref="globalAssignment" checked={that.state.globalStatus}  onChange={that.onGlobalStatusChanged.bind(that)} />
                      <div className="slider"></div>
                    </label>
                  </div>
                  <br className="brclear"/>
                  <div className="form-group switch_wrap inline_switch">
                    <label>Status</label>
                    <label className="switch">
                      <input type="checkbox" ref="deActive" checked={that.state.deActive}  onChange={that.onisActiveChanged.bind(that)} />
                      <div className="slider"></div>
                    </label>
                  </div>
                  <br className="brclear"/>
                  {that.state.userProfiles.map(function (userProfiles, idx) {
                    return(
                    <div key={idx} className="panel panel-default">
                    <div className="panel-heading">Assigned Cluster Details</div>
                    <div className="panel-body">

                      <div className="form-group">
                      <input type="text" ref="cluster"  placeholder="Cluster" value={userProfiles.clusterName}  className="form-control float-label" id="" disabled="true"/>
                      </div>
                      {userProfiles.userRoles.map(function (userRoles, RId) {
                        return (
                          <div key={RId}>
                            <div className="form-group">
                              <input type="text" ref="chapter" value={userRoles.chapterId} placeholder="Chapter"
                                     className="form-control float-label" id="" disabled="true"/>
                            </div>
                            <div className="form-group">
                              <input type="text" ref="Department" value={userRoles.subChapterId}  placeholder="Sub Chapter" className="form-control float-label" id="" disabled="true"/>
                            </div>
                            <div className="form-group">
                              <input type="text" ref="subDepartment" value={userRoles.communityId}  placeholder="Community" className="form-control float-label" id="" disabled="true"/>
                            </div>
                            <div className="form-group">
                              <input type="text" ref="role" value={userRoles.roleName}   placeholder="Role" className="form-control float-label" id="" disabled="true"/>
                            </div>
                          </div>
                        )
                      })
                      }
                      <div className="form-group">
                        <div className="input_types"><input  ref="isDefault" checked={userProfiles.isDefault} onChange={that.onMakeDefultChange.bind(that,idx)}  id="checkbox1" type="checkbox" name="isDefault" value="1" /><label htmlFor="checkbox1"><span></span>Make Default</label></div>
                      </div>
                    </div>
                    </div>

                    )
                  })
                  }
                  </form>
                  </div>
                </ScrollArea>
              </div>
            </div>

        <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"
        />
      </div>
        )}
      </div>

    )
  }
};
export default MlEditBackendUser = formHandler()(MlEditBackendUser);
