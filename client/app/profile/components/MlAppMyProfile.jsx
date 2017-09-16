import React, {Component, PropTypes} from "react";
import ScrollArea from 'react-scrollbar'
var FontAwesome = require('react-fontawesome');
import {multipartASyncFormHandler} from '../../../../client/commons/MlMultipartFormAction'
import MlLoader from '../../../commons/components/loader/loader'
import passwordSAS_validate from '../../../../lib/common/validations/passwordSASValidator';
import {resetPasswordActionHandler} from "../../../admin/settings/backendUsers/actions/resetPasswordAction";
import {passwordVerification} from '../../../admin/profile/actions/addProfilePicAction'
import {updateDataEntry} from '../actions/updateProfile';
import {mlFieldValidations} from '../../../commons/validations/mlfieldValidation';
import {fetchUserDetails} from '../actions/findAddressBookAction'
import MlAppActionComponent from "../../commons/components/MlAppActionComponent";
import moment from "moment";
import Datetime from "react-datetime";
import formHandler from "../../../commons/containers/MlFormHandler";
import MlAccordion from "../../commons/components/MlAccordion";
import CropperModal from '../../../commons/components/cropperModal';
import {appClient} from '../../core/appConnection';
import {smsUserOtpHandler, verifyUserMobileNumberHandler, resendUserSmsOtpHandler} from '../../../commons/verificationActionHandler';
import _ from "lodash";

class MlAppMyProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {loading: true,
      data: {},
      password: '',
      confirmPassword: '',
      showPasswordFields: true,
      passwordState: " ",
      passwordValidation: false,
      PasswordReset:false,
      showChangePassword:true,
      showProfileModal: false,
      uploadingAvatar: false,
      getOTPClicked:false,
      mobileNumber : ""
    };
    this.checkExistingPassword.bind(this);
    this.passwordCheck.bind(this);
    this.findUserDetails.bind(this);
    this.onfoundationDateSelection.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
    this.onImageFileUpload = this.onImageFileUpload.bind(this);
    this.verifyMobileNumber.bind(this);
    this.resendSmsOtp.bind(this);
    this.sendSmsOtp.bind(this);
  }
  componentDidMount() {
  setTimeout(function(){
  $('.float-label').jvFloat();
  },1000);
}
  componentDidUpdate() {
    /*$(function () {
      $('.float-label').jvFloat();
    });*/
    // this.initializeSwiper();
  }
  // componentDidUpdate(){
  genderSelect(){
    if (this.state.gender === "others") {
      this.setState({genderStateMale: false, genderStateFemale: false, genderStateOthers: "checked"})
    }
    else if (this.state.gender=== "female") {
      this.setState({genderStateFemale: "checked", genderStateMale: false, genderStateOthers: false})
    }
    else if( this.state.gender=== "male"){
      this.setState({genderStateOthers: false, genderStateFemale: false, genderStateMale: "checked"})
    }
  }
  componentWillMount(){
    const resp = this.findUserDetails();
    return resp
  }

  async findUserDetails() {
    const response = await fetchUserDetails();
    if (response) {
      if(response.profile && response.profile.externalUserProfiles && response.profile.externalUserProfiles.length>0){
        var externalProfile = _.find(response.profile.externalUserProfiles, {isDefault:true});
        if(!externalProfile){
          externalProfile = response.profile.externalUserProfiles[0]
        }
      }
      this.setState({
        loading: false,
        userDetails: response,
        firstName:response.profile.firstName,
        lastName:response.profile.lastName,
        displayName:response.profile.email,
        dateOfBirth:response.profile.dateOfBirth?moment(response.profile.dateOfBirth).format(Meteor.settings.public.dateFormat):"",
        profileImage:response.profile.profileImage,
        gender:response.profile.genderType,
        userId:response._id,
        mobileNumber:externalProfile&&externalProfile.mobileNumber?externalProfile.mobileNumber:""
      });
      this.genderSelect()
    }else {
      this.setState({loading:false});
    }
  }


  async checkExistingPassword() {
    let pwd = this.refs.existingPassword.value;
    var digest = CryptoJS.SHA256(pwd).toString()
    console.log(digest);
    this.passwordCheck(digest);
  }

  async saveTaskDetails() {
    let Details = {
      profileImage: this.state.profileImage,
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      userName: this.state.displayName,
      genderType: this.state.gender,
      dateOfBirth: this.state.dateOfBirth?this.state.dateOfBirth : null
    }
    const dataresponse = await updateDataEntry(Details);
    console.log('--dataresponse--',dataresponse);
    if(dataresponse){
      toastr.success("Update Successful")
    }
  }

  async handleError(response) {
    console.log('error')
    console.log(response)
  };

  async handleSuccess(response) {
    console.log(response)
    if (response && response.success) {
      if (this.state.saveType == 'taskCreate')
        FlowRouter.setQueryParams({id: response.result})
      toastr.success("Saved Successfully move to next step");
    } else if (response && !response.success) {
      toastr.error(response.result);
    }
  }

  async resetPassword() {
    let ret = mlFieldValidations(this.refs)
    if (ret) {
      toastr.error(ret);
    } else {
      if (this.state.showPasswordFields) {
        let userDetails = {
          userId:this.state.userId,
          password: this.refs.confirmPassword.value
        }
        if(this.state.passwordState === 'Passwords match!') {
          this.onCheckPassword();
          if (this.state.pwdErrorMsg)
            toastr.error("Confirm Password does not match with Password");
          else {
            const response = await resetPasswordActionHandler(userDetails);
            // this.refs.id.value='';
            this.refs.confirmPassword.value = '';
            this.refs.password.value = '';
            this.setState({"pwdErrorMsg": 'Password reset complete'})
            toastr.success(response.result);
            $('#password').val("");
            this.setState({PasswordReset: false, showChangePassword: true})
          }
        }else {
          toastr.error("Enter proper Existing Password")
        }
      } else {
        this.setState({
          showPasswordFields: true
        })
      }
      const resp = this.onFileUpload();
      return resp;
    }
  }

  onfoundationDateSelection(event) {
    var ageDifMs = Date.now() - event._d.getTime();
    var ageDate = new Date(ageDifMs);
    if (event._d) {
      let value = moment(event._d).format(Meteor.settings.public.dateFormat);
      this.setState({loading: false, dateOfBirth: value});
    }
    if((Math.abs(ageDate.getUTCFullYear() - 1970)>=18)){
    }
    else{
      toastr.error("age limit exceeded")
    }
  }

  openDatePickerDateOfBirth() {
    $('#date-of-birth').toggleClass('rdtOpen')
  }

  onCheckPassword() {
    let password = this.refs.password.value;
    let confirmPassword = this.refs.confirmPassword.value;
    if (confirmPassword != password) {
      this.setState({"pwdErrorMsg": 'Confirm Password does not match with Password'})
    } else {
      this.setState({"pwdErrorMsg": ''})
    }
  }

  async passwordCheck(digest){
    const resp = await passwordVerification(digest)
    console.log(resp);
    if(resp.success){
      this.setState({passwordState: 'Passwords match!'})
      /**comment of one state*/// this.setState({passwordState: 'Passwords match!'})
    }else{
      this.setState({passwordState: 'Passwords do not match'})
    }
    return resp;
  }

  passwordValidation() {
    let password = this.refs.password.value;
    if (!password) {
      this.setState({"pwdValidationMsg": ''})
    } else {
      let validate = passwordSAS_validate(password)
      if (validate.isValid) {
        this.setState({"pwdValidationMsg": '', passwordValidation: true})
      }else if (typeof (validate) == 'object') {
        this.setState({"pwdValidationMsg": validate.errorMsg})
      }
    }
  }

  async onImageFileUpload(file){
    // if(e.target.files[0].length ==  0)
    //   return;
    // let file = e.target.files[0];
    let user = {profile: {profileImage:" "}}
    if(file) {
      let data = {moduleName: "PROFILE", actionName: "UPDATE", userId:this.state.userId, user: user}
      let response = await multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this));
      return response;
    }else{
      this.setState({
        uploadingAvatar: false,
      });
    }
  }

  onFileUploadCallBack(resp){
    this.setState({
      uploadingAvatar: false,
      showProfileModal: false
    });
    if(resp){
      let result = JSON.parse(resp)
      if(result.success){
        this.setState({profileImage : result.result})
        toastr.success("Photo Updated Successfully");
      }
    }
  }

  OnChangePassword(){
    this.setState({PasswordReset:true,showChangePassword:false})
  }
  cancelResetPassword(){
    $('#password').val("");
    this.setState({PasswordReset:false,showChangePassword:true})
  }
  toggleModal() {
    const that = this;
    this.setState({
      showProfileModal: !that.state.showProfileModal
    });
  }
  handleUploadAvatar(image) {
    this.setState({
      uploadingAvatar: true,
    });
    this.onImageFileUpload(image);
  }
  async resendSmsOtp(){
    this.setState({getOTPClicked:true});
    if(this.state.canResend){
      const resp = await resendUserSmsOtpHandler(appClient);
      if(resp.success){
        toastr.success("OTP sent successfully");
      }
      return resp
    }
  }

  async sendSmsOtp(){
    this.setState({getOTPClicked:true});
    setTimeout(function(){
      this.setState({canResend:true})
    }.bind(this),30000)
    let mobileNumber=this.state.mobileNumber;
    const response=await smsUserOtpHandler(appClient);
    if(response.success){
      toastr.success("OTP sent successfully");
    }
    return response;
  }

  async verifyMobileNumber(){
    let mobileNumber=this.state.mobileNumber;
    let otp=this.refs.enteredOTP.value;
      const response=await verifyUserMobileNumberHandler(mobileNumber,otp,appClient);
      let resp=null;
      if(response.success){
        resp = JSON.parse(response.result);
        this.setState({mobileNumberVerified:resp.mobileNumberVerified});
        toastr.success("Mobile Number Verified");
        this.setState({getOTPClicked:false});
      }else{
        this.setState({mobileNumberVerified:false});
      }
      return response;
  }
  cancelOtpRequest(){
    this.setState({getOTPClicked:false});
  }

  render(){
    const _this = this;
  const showLoader=this.state.loading;
  var yesterday = Datetime.moment().subtract(0,'day');
  var valid = function( current ){
    return current.isBefore( yesterday );
  };
  let appActionConfig = [
    {
      showAction: true,
      actionName: 'save',
      handler: async(event) => _this.props.handler(this.saveTaskDetails.bind(this), this.handleSuccess.bind(this), this.handleError.bind(this))
    },
    {
      showAction: true,
      actionName: 'cancel',
      handler: async(event) => {
        FlowRouter.go('/app/dashboard')
      }
    }
  ];
  export const genericPortfolioAccordionConfig = {
    id: 'portfolioAccordion',
    panelItems: [
      {
        'title': 'Actions',
        isText: false,
        style: {'background': '#ef4647'},
        contentComponent: <MlAppActionComponent
          resourceDetails={{resourceId: 'sacsdvdsv', resourceType: 'task'}}   //resource id need to be given
          actionOptions={appActionConfig}/>
      }]
  };
    let gImg = this.state.gender==='female'?"/images/female.jpg":"/images/def_profile.png";
    let genderImage = (!this.state.profileImage || this.state.profileImage==" ")?gImg:this.state.profileImage;

    let isMobileVerified = false;
    if(this.state.userDetails&&this.state.userDetails.mobileNumbers){
      obj = _.find(this.state.userDetails.mobileNumbers, {mobileNumber:this.state.mobileNumber, verified:true});
      if(obj)
        isMobileVerified = obj.verified;
    }

    return (
    <div className="admin_main_wrap">
      {showLoader === true ? (<MlLoader/>) : (
        <div className="admin_padding_wrap">
          <h2>My Profile Info</h2>
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <div className="col-md-6 nopadding-left">
                <div className="form_bg">
                  <form>
                    <div className="form-group">
                      <input type="text" id="first_name" placeholder="First Name" className="form-control float-label" readOnly="readOnly"
                             defaultValue={this.state.firstName}/>
                    </div>
                    {/*<div className="form-group">*/}
                      {/*<input type="text" placeholder="Middle Name" className="form-control float-label"*/}
                             {/*defaultValue={this.state.middleName}/>*/}
                    {/*</div>*/}
                    <div className="form-group">
                      <input type="text" placeholder="Last Name" className="form-control float-label" readOnly="readOnly"
                             defaultValue={this.state.lastName}/>
                    </div>

                    <div className="form-group">
                      <input type="text" placeholder="User Name / Registered Email Id" className="form-control float-label" readOnly="readOnly"
                             defaultValue={this.state.displayName}/>
                    </div>
                    <div className="form-group">
                      <div className="input_types">
                        <label>Gender : </label>
                      </div>
                      <div className="input_types">
                        <input id="radio1" type="radio" name="radio" value="male" checked={this.state.genderStateMale}/><label
                        htmlFor="radio1"><span><span></span></span>Male</label>
                      </div>
                      <div className="input_types">
                        <input id="radio2" type="radio" name="radio" value="female"
                               checked={this.state.genderStateFemale}/><label
                        htmlFor="radio2"><span><span></span></span>Female</label>
                      </div>
                      <div className="input_types">
                        <input id="radio3" type="radio" name="radio" value="others"
                               checked={this.state.genderStateOthers}/><label
                        htmlFor="radio3"><span><span></span></span>Others</label>
                      </div>
                    </div>
                    <br className="brclear" /><br/>
                    <div className="form-group">
                      <input type="text" placeholder="Mobile Number" className="form-control float-label" readOnly="readOnly"
                             defaultValue={this.state.mobileNumber}/>

                      {isMobileVerified?

                        <div className="email_notify">
                          <div className="input_types">
                            <input ref="isEmailNotified" type="checkbox" name="checkbox" checked={true}/>
                            <label htmlFor="checkbox1"><span> </span>Verified</label>
                          </div>
                        </div>
                        :<div></div>}

                    </div>
                    {
                      isMobileVerified||(this.state.mobileNumber=="")?<div></div>:
                        <div className="form-group">
                          <a href="" className="mlUpload_btn" onClick={this.sendSmsOtp.bind(this)}>Get OTP</a>
                        </div>
                    }
                    {
                      this.state.getOTPClicked?
                        <div>
                          <div className="form-group">
                            <input type="text" placeholder="Enter OTP" ref="enteredOTP" className="form-control float-label" />
                          </div>
                          <div className="ml_btn">
                            <a href="" className="cancel_btn" onClick={this.verifyMobileNumber.bind(this)}>Submit</a>
                            <a href="" className="cancel_btn" onClick={this.resendSmsOtp.bind(this)}>Resend</a>
                            <a href="" className="save_btn" onClick={this.cancelOtpRequest.bind(this)}>Cancel</a>

                        </div>

                        </div>
                        :
                        <div></div>
                    }

                  </form>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form_bg">
                  <form>

                    <div className="form-group">
                      <div className="fileUpload mlUpload_btn">

                        <span onClick={this.toggleModal.bind(this)}>Profile Pic</span>
                        {/*<input type="file" className="upload" id="profilePic" name="profileImage" accept="image/*" onChange={this.onImageFileUpload.bind(this)}/>*/}
                      </div>
                      <div className="previewImg ProfileImg">
                        <img src={genderImage}/>
                      </div>
                    </div>
                    <br className="brclear"/>
                    {/*<div className="form-group">*/}
                      {/*<input type="text" ref="dob" placeholder="Date Of Birth" className="form-control float-label"*/}
                             {/*defaultValue={this.state.dateOfBirth}/>*/}
                      {/*<FontAwesome name='calendar' className="password_icon"/>*/}

                    {/*</div>*/}

                    <div className="form-group" id="date-of-birth">
                      <Datetime dateFormat="DD-MM-YYYY" timeFormat={false}  inputProps={{placeholder: "Date Of Birth",className:"form-control float-label"}}  closeOnSelect={true} value={this.state.dateOfBirth?moment(this.state.dateOfBirth, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY'): null} onChange={this.onfoundationDateSelection.bind(this)} isValidDate={ valid } />
                      <FontAwesome name="calendar" className="password_icon" onClick={this.openDatePickerDateOfBirth.bind(this)}/>
                    </div>


                    {this.state.showPasswordFields ?
                      <div className="form-group">
                        <text style={{float:'right',color:'#ef1012',"fontSize":'12px',"marginTop":'-12px',"fontWeight":'bold'}}>{this.state.passwordState}</text>
                        <input type="Password" ref="existingPassword"  placeholder="Password" className="form-control float-label" onBlur={this.checkExistingPassword.bind(this)}id="password" data-required={true} data-errMsg="Existing password is required"/>

                      </div> : <div></div>}
                    {this.state.showChangePassword?(<div className="form-group"> <a href="" className="mlUpload_btn" onClick={this.OnChangePassword.bind(this)}>Change Password</a></div>):""}
                    {this.state.PasswordReset?(
                      <div>
                      <div className="form-group">
                        <text style={{float:'right',color:'#ef1012',"fontSize":'12px',"marginTop":'-12px',"fontWeight":'bold'}}>{this.state.pwdValidationMsg}</text>
                        <input type="Password" ref="password" defaultValue={this.state.password} onBlur={this.passwordValidation.bind(this)} placeholder="New Password" className="form-control float-label" id="password" data-required={true} data-errMsg="New Password is required"/>

                      </div>
                      <div className="form-group">
                        <text style={{float:'right',color:'#ef1012',"fontSize":'12px',"marginTop":'-12px',"fontWeight":'bold'}}>{this.state.pwdErrorMsg}</text>
                        <input type="Password" ref="confirmPassword" defaultValue={this.state.confirmPassword} placeholder="Confirm New Password" className="form-control float-label" onBlur={this.onCheckPassword.bind(this)} id="confirmPassword" data-errMsg="Confirm Password is required"/>

                      </div>
                        <div className="form-group"> <a href="" className="mlUpload_btn" onClick={this.resetPassword.bind(this)}>Save</a> <a href="" className="mlUpload_btn" onClick={this.cancelResetPassword.bind(this)}>Cancel</a> </div></div>):""}
                  </form>
                </div>
              </div>
              <CropperModal
                uploadingImage={this.state.uploadingAvatar}
                handleImageUpload={this.handleUploadAvatar}
                cropperStyle="square"
                show={this.state.showProfileModal}
                toggleShow={this.toggleModal}
              />
            </ScrollArea>
          </div>
          <MlAccordion accordionOptions={genericPortfolioAccordionConfig} {...this.props} />
        </div>)}
    </div>
  )
}
}

export default MlAppMyProfile = formHandler()(MlAppMyProfile);
