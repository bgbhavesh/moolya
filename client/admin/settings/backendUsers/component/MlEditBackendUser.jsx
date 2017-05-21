import React from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import {graphql} from "react-apollo";
import gql from "graphql-tag";
import formHandler from "../../../../commons/containers/MlFormHandler";
import MlActionComponent from "../../../../commons/components/actions/ActionComponent";
import Moolyaselect from "../../../../commons/components/select/MoolyaSelect";
import MlAssignDepartmentComponent from "./MlAssignDepartmentComponent";
import MlContactFormComponent from "./MlContactFormComponent";
import {findBackendUserActionHandler} from "../actions/findBackendUserAction";
import {updateBackendUserActionHandler} from "../actions/updateBackendUserAction";
import {resetPasswordActionHandler} from "../actions/resetPasswordAction";
import {OnToggleSwitch, initalizeFloatLabel, passwordVisibilityHandler} from "../../../utils/formElemUtil";
let FontAwesome = require('react-fontawesome');
let Select = require('react-select');
import Datetime from "react-datetime";
import moment from "moment";
import {MlMyProfile} from '../../../profile/component/MlMyprofile'
import {updateDataEntry} from '../../../profile/actions/addProfilePicAction'



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
      showPasswordFields:false,
      pageLable:"Edit Backend User",
      foundationDate:" ",
      genderSelect:" ",
      dateOfBirth: " ",
      genderStateMale: " ",
      genderStateFemale: " ",
      genderStateOthers: " ",
      profilePic:" "
    }
    this.addEventHandler.bind(this);
    this.updateBackendUser.bind(this);
    this.onBackendUserTypeSelect.bind(this);
    this.onBackendUserSelect.bind(this);
    this.onGlobalStatusChanged = this.onGlobalStatusChanged.bind(this);
    this.onisActiveChanged= this.onisActiveChanged.bind(this);
    this.onMakeDefultChange=this.onMakeDefultChange.bind(this);
  //  this.ondateOfBirthSelection.bind(this);
    this.genderSelect = this.genderSelect.bind(this);
    this.getGender.bind(this);
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
    $('.main_wrap_scroll ').height(WinHeight-(68+$('.admin_header').outerHeight(true)));
    let url = window.location.href;
    if(url.indexOf("dashboard") != -1){
      $('input').attr('disabled', 'disabled');
    }
  }

    genderSelect(e){
    this.setState({genderSelect: e.target.value})
  }

 //  async updateBackend(){
 //    let Details = {
 //      userId: ,
 //      gender:this.state.genderSelect,
 //      dateofbirth: this.state.dateofbirth
 //    }
 //    const response = await updateDataEntry(Details);
 //    return response;
 // }


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
    let url = window.location.href;
    if(url.indexOf("dashboard") != -1){
      this.setState({pageLable:"Backend User Details"})
    }
    const resp=this.findBackendUser();
    return resp;
  }

  async getGender() {
    if(this.state.genderSelect === "Others"){
      this.setState({genderStateMale: false, genderStateFemale: false, genderStateOthers:true})
    }
    else if(this.state.genderSelect === "Female"){
      this.setState({genderStateFemale: true, genderStateMale: false, genderStateOthers:false})
    }
    else{
      this.setState({genderStateOthers: false, genderStateFemale: false, genderStateMale: true})
    }
  }


  async  findBackendUser() {
    let userTypeId = this.props.config;
    const response = await findBackendUserActionHandler(userTypeId);
    this.setState({loading: false, data: response});
    if (response) {
      this.setState({
        selectedBackendUserType: this.state.data.profile.InternalUprofile.moolyaProfile.userType,
        selectedSubChapter: this.state.data.profile.InternalUprofile.moolyaProfile.subChapter,
        selectedBackendUser: this.state.data.profile.InternalUprofile.moolyaProfile.roleType,
        deActive: this.state.data.profile.isActive,
        isActive: this.state.data.profile.InternalUprofile.moolyaProfile.isActive,
        globalStatus: this.state.data.profile.InternalUprofile.moolyaProfile.globalAssignment,
        genderSelect: response.profile.genderType, dateOfBirth: response.profile.dateOfBirth,
        profilePic: response.profile.profileImage
      })
      let clusterId = "", chapterId = '', subChapterId = '', communityId = ''
      let dataDetails = this.state.data
      if (dataDetails["profile"]["InternalUprofile"]["moolyaProfile"]["userProfiles"][0]) {
        let userProfiles = dataDetails["profile"]["InternalUprofile"]["moolyaProfile"]["userProfiles"]
        let userProfilesDetails = []
          ;
        for (let i = 0; i < userProfiles.length; i++) {
          let userRolesDetails = []
          let userRole = userProfiles[i].userRoles
          for (let j = 0; j < userRole.length; j++) {
            let json = {
              roleId: userRole[j].roleId,
              roleName: userRole[j].roleName,
              clusterId: userRole[j].clusterId,
              chapterId: userRole[j].chapterId,
              validFrom: userRole[j].validFrom,
              validTo: userRole[j].validTo,
              subChapterId: userRole[j].subChapterId,
              communityId: userRole[j].communityId,
              isActive: userRole[j].isActive,
              hierarchyLevel: userRole[j].hierarchyLevel,
              hierarchyCode: userRole[j].hierarchyCode,
              departmentId: userRole[j].departmentId,
              departmentName: userRole[j].departmentName,
              subDepartmentId: userRole[j].subDepartmentId,
              subDepartmentName: userRole[j].subDepartmentName,
              chapterName: userRole[j].chapterName,
              subChapterName: userRole[j].subChapterName,
              communityName: userRole[j].communityName
            }
            userRolesDetails.push(json)
          }
          let json = {
            isDefault: userProfiles[i].isDefault,
            clusterId: userProfiles[i].clusterId,
            clusterName: userProfiles[i].clusterName,
            userRoles: userRolesDetails
          }
          userProfilesDetails.push(json)
        }
        this.setState({'userProfiles': userProfilesDetails});
      }
      this.getGender();
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
            hierarchyCode:userRole[j].hierarchyCode,
            roleName:userRole[j].roleName,
            departmentId:userRole[j].departmentId,
            departmentName:userRole[j].departmentName,
            subDepartmentId:userRole[j].subDepartmentId,
            subDepartmentName:userRole[j].subDepartmentName
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
      userType: this.state.selectedBackendUserType,
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
      isMoolya: moolyaProfile.userType && moolyaProfile.userType == 'moolya' ? true : false,
      isActive:this.refs.deActive.checked,
      InternalUprofile: InternalUprofile,
      genderType:this.state.genderSelect,
      dateOfBirth: this.state.dateOfBirth,
      profileImage: this.state.profilePic
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
    if(this.state.showPasswordFields){
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
        toastr.success(response.result);
      }
    } else {
      this.setState({
        showPasswordFields:true
      })
    }
  }

  // ondateOfBirthSelection(event) {
  //   if (event._d) {
  //     let value = moment(event._d).format('DD-MM-YYYY');
  //     this.setState({loading: false, dateofbirth: value});
  //   }
  // }

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
        handler: async(event) => {
          FlowRouter.go("/admin/settings/backendUserList")
        }
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
          <h2>{that.state.pageLable}</h2>
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
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
                    <input type="text" ref="id" defaultValue={that.state.data&&that.state.data._id} hidden="true"/>
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
                {that.state.showPasswordFields ?
                  <div className="form-group">
                    <input type="Password" ref="password" defaultValue={that.state.password} placeholder="Create Password" className="form-control float-label" id="password"/>
                    <FontAwesome name='eye-slash' className="password_icon Password hide_p"/>
                  </div> : <div></div>}
                {that.state.showPasswordFields ?
                  <div className="form-group">
                    <text style={{float:'right',color:'#ef1012',"fontSize":'12px',"marginTop":'-12px',"fontWeight":'bold'}}>{that.state.pwdErrorMsg}</text>
                    <input type="Password" ref="confirmPassword" defaultValue={that.state.confirmPassword} placeholder="Confirm Password" className="form-control float-label" onBlur={that.onCheckPassword.bind(that)} id="confirmPassword"/>
                    <FontAwesome name='eye-slash' className="password_icon ConfirmPassword hide_p"/>
                  </div> : <div></div>}

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

                    <div className="form-group">
                      {/*<Datetime dateFormat="DD-MM-YYYY" placeholder="Date Of Birth" timeFormat={false}  inputProps={{placeholder: "Date Of Birth"}}   closeOnSelect={true} defaultValue={this.state.dateofbirth} onChange={this.ondateOfBirthSelection.bind(this)}/>*/}
                      <input type="text" ref="dob"  placeholder="Date Of Birth" className="form-control float-label" defaultValue={that.state.data&&that.state.data.profile.dateOfBirth} disabled="disabled" />
                      <FontAwesome name="calendar" className="password_icon"/>

                    </div>
                    <div className="form-group">
                      <div className="input_types">
                        <label>Gender : </label>
                      </div>
                      <div className="input_types">
                        <input id="radio1" type="radio" name="radio" value="Male" onChange={this.genderSelect.bind(this)} checked={this.state.genderStateMale} /><label htmlFor="radio1" ><span><span></span></span>Male</label>
                      </div>
                      <div className="input_types">
                          <input id="radio2" type="radio" name="radio" value="Female" onChange={this.genderSelect.bind(this)} checked={this.state.genderStateFemale} /><label htmlFor="radio2" ><span><span></span></span>Female</label>
                      </div>
                      <div className="input_types">
                        <input id="radio3" type="radio" name="radio" value="Others" onChange={this.genderSelect.bind(this)} checked={this.state.genderStateOthers} /><label htmlFor="radio3" ><span><span></span></span>Others</label>
                      </div>
                    </div>
                    <div className="clearfix"></div>
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
                    <div>
                      {userProfiles.userRoles.map(function (userRoles, RId) {
                        return (
                          <div key={RId} className="panel panel-default">
                            <div className="panel-heading">Assigned Cluster Details</div>
                            <div className="panel-body">

                              <div className="form-group">
                                <input type="text" ref="cluster"  placeholder="Cluster" defaultValue={userProfiles.clusterName}  className="form-control float-label" id="" disabled="true"/>
                              </div>
                            <div className="form-group">
                              <input type="text" ref="chapter" defaultValue={(userRoles.chapterId=='all')?userRoles.chapterId:userRoles.chapterName} placeholder="Chapter"
                                     className="form-control float-label" id="" disabled="true"/>
                            </div>
                            <div className="form-group">
                              <input type="text" ref="Department" defaultValue={(userRoles.subChapterId=='all')?userRoles.subChapterId:userRoles.subChapterName}  placeholder="Sub Chapter" className="form-control float-label" id="" disabled="true"/>
                            </div>
                            <div className="form-group">
                              <input type="text" ref="subDepartment" defaultValue={(userRoles.communityId=='all')?userRoles.communityId:userRoles.communityName}  placeholder="Community" className="form-control float-label" id="" disabled="true"/>
                            </div>
                            <div className="form-group">
                              <input type="text" ref="role" defaultValue={userRoles.roleName}   placeholder="Role" className="form-control float-label" id="" disabled="true"/>
                            </div>
                              <div className="form-group">
                                <div className="input_types"><input  ref="isDefault" checked={userProfiles.isDefault} onChange={that.onMakeDefultChange.bind(that,idx)}  id="checkbox1" type="checkbox" name="isDefault" value="1" /><label htmlFor="checkbox1"><span></span>Make Default</label></div>
                              </div>
                            </div>
                          </div>

                        )
                      })
                      }
                    </div>

                    )
                  })
                  }
                  </form>
                  </div>
                </ScrollArea>
              </div>
            </div>
            </ScrollArea>
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
