import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar'
import {updateBackendUserActionHandler} from '../../settings/backendUsers/actions/findBackendUserAction';
import {initalizeFloatLabel, passwordVisibilityHandler} from '../../utils/formElemUtil';
import {passwordVerification} from '../actions/addProfilePicAction'
//import {addProfilePicAction} from "../actions/addProfilePicAction"
import {multipartASyncFormHandler} from '../../../commons/MlMultipartFormAction'
import MlActionComponent from "../../../commons/components/actions/ActionComponent";
import {updateDataEntry} from '../actions/addProfilePicAction'
import {findBackendUserActionHandler} from '../../settings/backendUsers/actions/findBackendUserAction'
import Datetime from "react-datetime";
import moment from "moment";
import MlLoader from '../../../commons/components/loader/loader'
import {resetPasswordActionHandler} from "../../settings/backendUsers/actions/resetPasswordAction";
import passwordSAS_validate from '../../../../lib/common/validations/passwordSASValidator';
import {MlAdminProfile} from '../../../admin/layouts/header/MlAdminHeader'
import {getAdminUserContext} from '../../../commons/getAdminUserContext'
import {findMyProfileActionHandler} from '../actions/getProfileDetails'

export default class MlMyProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      firstName: " ",
      middleName: " ",
      lastName: " ",
      userName: " ",
      uploadedProfilePic: " ",
      registrationDetails: {},
      selectedBackendUser: " ",
      profilePic: " ",
      foundationDate: null,
      genderStateMale: " ",
      genderStateFemale: " ",
      genderStateOthers: " ",
      dateOfBirth: null,
      genderSelect: " ",
      responsePic: " ",
      password: '',
      confirmPassword: '',
      showPasswordFields: true,
      passwordState: " ",
      passwordValidation: false

      // Details:{
      //   firstName: " ",
      //   middleName:" ",
      //   lastName: " "
      // }
    };
    this.getValue.bind(this);
    this.onFileUploadCallBack.bind(this);
    this.storeImage.bind(this);
    this.onFoundationDateSelection.bind(this);
    this.firstNameUpdation = this.firstNameUpdation.bind(this);
    this.middleNameUpdation = this.middleNameUpdation.bind(this);
    this.lastNameUpdation = this.lastNameUpdation.bind(this);
    this.displayNameUpdation.bind(this);
    this.updateProfile.bind(this);
    this.genderSelect = this.genderSelect.bind(this);
    this.onfoundationDateSelection.bind(this);
    this.checkExistingPassword.bind(this);
    this.passwordCheck.bind(this);
    // this.showImage.bind(this);
    //this.fileUpdation.bind(this);
    // this.firstNameUpdation.bind(this);
    return this;
  }

  onFoundationDateSelection(event) {
    if (event._d) {
      let value = moment(event._d).format(Meteor.settings.public.dateFormat);
      this.setState({loading: false, foundationDate: value});
    }
  }

  async checkExistingPassword() {
    let pwd = this.refs.existingPassword.value;
    var digest = CryptoJS.SHA256(pwd).toString()
    console.log(digest);
    this.passwordCheck(digest);
  }

    async passwordCheck(digest)
    {
      const resp = await passwordVerification(digest)
      console.log(resp);
      if(resp.success){
        this.setState({passwordState: 'Passwords match!'})
      }else{
        this.setState({passwordState: 'Passwords do not match'})
      }
      return resp;
    }

  componentDidMount() {
    $(function () {
      $('.float-label').jvFloat();
    });

    $('.myprofile_left a').click(function () {
      $('.myprofile_left a').removeClass("active");
      $(this).addClass("active");
    });

    var swiper = new Swiper('.profile_container', {
      pagination: '.swiper-pagination',
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      initialSlide: 1,
      slidesPerView: 'auto',
      coverflow: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      }
    });
  }

  onFileUploadCallBack(resp) {
    if (resp) {
      console.log(resp);
      this.setState({"uploadedProfilePic": resp});
      var temp = $.parseJSON(this.state.uploadedProfilePic).result;
      this.setState({"responsePic": temp});
      this.setState({"uploadedProfilePic": temp});
      console.log(temp);
      this.showImage(temp);
      return temp;
    }
  }

  openDatePickerDateOfBirth() {
    $('#date-of-birth').toggleClass('rdtOpen')
  }

  async firstNameUpdation(e) {
    this.setState({firstName: e.target.value})
  }

  async middleNameUpdation(e) {
    this.setState({middleName: e.target.value})
  }

  async lastNameUpdation(e) {
    this.setState({lastName: e.target.value})
  }

  async displayNameUpdation(e) {
    this.setState({userName: e.target.value})
  }

  async showImage(temp) {
    this.setState({responsePic: temp})
  }


  /**
   * Method :: storeImage
   * Description :: All the data is updated here calling the updateDataEntry()
   * which gets an object as a param containing all the data
   * returns ::  dataresponse
   **/
  async storeImage() {
    let Details = {
      profileImage: this.state.uploadedProfilePic,
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      userName: this.state.userName,
      genderType: this.state.genderSelect,
      dateOfBirth: this.state.dateOfBirth,
    }

    const dataresponse = await updateDataEntry(Details);
    console.log(dataresponse);
    if(dataresponse){
      toastr.success("Update Successful")
    }
    return dataresponse;
  }

  /**
   * Method :: getValue
   * Description :: This function is called when the componentWillMount
   * It gets all the details from the db and auto-populates the respective fields
   * returns ::  dataresponse
   **/

  async getValue() {
    let userType = Meteor.userId();
    let user = Meteor.user();
    let isExternal = user.profile.isExternaluser;
    if (isExternal) {
      this.setState({
        loading: false, firstName: user.profile.firstName,
        middleName: user.profile.middleName,
        lastName: user.profile.lastName,
        userName: user.profile.displayName,
        // uploadedProfilePic: response.profile.profileImage,
        genderSelect: response.profile.genderType,
        dateOfBirth: moment(response.profile.dateOfBirth).format(Meteor.settings.public.dateFormat)
      });
    } else {
      let response = await findMyProfileActionHandler(userType);
      console.log(response);
      this.setState({
        loading: false, firstName: response.profile.InternalUprofile.moolyaProfile.firstName,
        middleName: response.profile.InternalUprofile.moolyaProfile.middleName,
        lastName: response.profile.InternalUprofile.moolyaProfile.lastName,
        userName: response.profile.InternalUprofile.moolyaProfile.email,
        uploadedProfilePic: response.profile.profileImage,
        genderSelect: response.profile.genderType,
        dateOfBirth: moment(response.profile.dateOfBirth).format(Meteor.settings.public.dateFormat)
      });
    }
    this.genderSelect();
  }

  componentWillMount() {
    const resp = this.getValue();
    return resp;
  }

  componentDidUpdate() {
    initalizeFloatLabel();
    passwordVisibilityHandler();
  }


  async genderSelect() {
    //this.setState({genderSelect: e.target.value})
    if (this.state.genderSelect === "Others") {
      this.setState({genderStateMale: false, genderStateFemale: false, genderStateOthers: "checked"})
    }
    else if (this.state.genderSelect === "Female") {
      this.setState({genderStateFemale: "checked", genderStateMale: false, genderStateOthers: false})
    }
    else {
      this.setState({genderStateOthers: false, genderStateFemale: false, genderStateMale: "checked"})
    }
  }

  onfoundationDateSelection(event) {
    if (event._d) {
      let value = moment(event._d).format(Meteor.settings.public.dateFormat);
      this.setState({loading: false, dateOfBirth: value});
    }
  }

  async handleSuccess() {
    this.resetBackendUers();
  }

  /**
   * Method :: resetPassword
   * Description :: Resetting Password
   * @params ::  No params
   * returns ::  Validation of password
   **/

  async resetPassword() {
    if (this.state.showPasswordFields) {
      let userDetails = {
        userId: Meteor.userId(),
        password: this.refs.confirmPassword.value
      }
      if (this.state.passwordState === 'Passwords match!') {
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
          const resp = this.onFileUpload();
          return resp;
        }

      }else {
        toastr.error("Enter proper Existing Password")
      }
    }
  }


  handleError(response) {
    console.log('error handle');
    console.log(response);
  }

  /**
   * Method :: updateProfile
   * Description :: Checking password fields
   * Based on password fields resetPassword() is called
   * otherwise updation of other data is carried on by calling onFileUpload().
   * returns :: void
   * **/

  async updateProfile() {
    let existingPwdField = this.refs.existingPassword.value;
    let password = this.refs.password.value;
    let confirmPassword = this.refs.confirmPassword.value;
    // let passwordValidation =  this.state.passwordValidation
    if (existingPwdField && password && confirmPassword) {
      this.resetPassword();
    } else {
      const resp = this.onFileUpload();
    }
  }

  /**
   * Method :: onCheckPassword
   * Description :: Check the new password entered and the confirmation of the
   * new password matches.
   * returns :: this.state.pwdErrorMsg
   * **/

  onCheckPassword() {
    let password = this.refs.password.value;
    let confirmPassword = this.refs.confirmPassword.value;
    if (confirmPassword != password) {
      this.setState({"pwdErrorMsg": 'Confirm Password does not match with Password'})
    } else {
      this.setState({"pwdErrorMsg": ''})
    }
  }

  /**
   * Method :: passwordValidation
   * Description :: Check the new password for SAS validation
   * returns :: this.state.pwdValidationMsg
   * **/

  passwordValidation() {
    let password = this.refs.password.value;
    if (!password) {
      this.setState({"pwdValidationMsg": ''})
    } else {
    let validate = passwordSAS_validate(password)
    if (validate.isValid) {
      this.setState({"pwdValidationMsg": ''})
      this.setState({passwordValidation: true})
    }
    else if (typeof (validate) == 'object') {
      this.setState({"pwdValidationMsg": validate.errorMsg})
    }

  }
}

  /**
   * Method :: onFileUpload
   * Description :: File uploading action is done here. Once uploaded it hits onFileUploadCallBack()
   * and the return to current function and call storeImage()
   * returns :: Hits storeImage()
   * **/

  async onFileUpload(){
    let user = {
      profile: {
        InternalUprofile: {moolyaProfile: {profileImage:" " }}
      }
    }
    let file=document.getElementById("profilePic").files[0];
    if(file) {
      let data = {moduleName: "PROFILE", actionName: "UPDATE", userId: this.state.selectedBackendUser, user: user}
      let response = await multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this));
      this.storeImage();

      return response;
    }
    else{
      this.storeImage();
    }
  }

  render(){
    let userContext = getAdminUserContext();
    let route;
    if(userContext.hierarchyLevel >3){
      route = "clusters"
    }else {
      route = "chapters"
    }

    let MlActionConfig = [
      {
        showAction: true,
        actionName: 'save',
        handler: this.updateProfile.bind(this)
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => FlowRouter.go('/admin/dashboard/'+route)
      }
    ];
    const showLoader=this.state.loading;
    let isExternaluser = Meteor.user().profile.isExternaluser;
    let profilePic = this.state.uploadedProfilePic;
    if(!profilePic || profilePic == " "){
      profilePic ="/images/img2.png"
    }
    return (
      <div className="admin_main_wrap">
        {showLoader===true?(<MlLoader/>):(
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
                      <input type="text" id="first_name" placeholder="First Name" className="form-control float-label"  defaultValue={this.state.firstName} onBlur={this.firstNameUpdation.bind(this)}/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Middle Name" className="form-control float-label" id="" defaultValue={this.state.middleName} onBlur={this.middleNameUpdation.bind(this)} />
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Last Name" className="form-control float-label" defaultValue={this.state.lastName} onBlur={this.lastNameUpdation.bind(this)} />
                    </div>
                    <div className="form-group">
                      <div className="fileUpload mlUpload_btn">
                        <span>Profile Pic</span>
                        {isExternaluser ? <div></div> :
                          <input type="file" className="upload" id="profilePic" onChange={this.onFileUpload.bind(this)}/>
                        }
                      </div>
                      <div className="previewImg ProfileImg">
                        <img src={this.state.uploadedProfilePic !== " " ?this.state.uploadedProfilePic:profilePic}/>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form_bg">
                  <form>
                    <div className="form-group">
                      <input type="text" placeholder="User Name" className="form-control float-label" id="" defaultValue={this.state.userName} onBlur={this.displayNameUpdation.bind(this)} />
                    </div>
                    {this.state.showPasswordFields ?
                      <div className="form-group">
                        <text style={{float:'right',color:'#ef1012',"fontSize":'12px',"marginTop":'-12px',"fontWeight":'bold'}}>{this.state.passwordState}</text>
                        <input type="Password" ref="existingPassword"  placeholder="Existing Password" className="form-control float-label" onBlur={this.checkExistingPassword.bind(this)}id="password"/>
                        <FontAwesome name='eye-slash' className="password_icon Password hide_p"/>
                      </div> : <div></div>}
                    {this.state.showPasswordFields ?
                      <div className="form-group">
                        <text style={{float:'right',color:'#ef1012',"fontSize":'12px',"marginTop":'-12px',"fontWeight":'bold'}}>{this.state.pwdValidationMsg}</text>
                        <input type="Password" ref="password" defaultValue={this.state.password} onBlur={this.passwordValidation.bind(this)} placeholder="New Password" className="form-control float-label" id="password"/>
                        <FontAwesome name='eye-slash' className="password_icon Password hide_p"/>
                      </div> : <div></div>}
                    {this.state.showPasswordFields ?
                      <div className="form-group">
                        <text style={{float:'right',color:'#ef1012',"fontSize":'12px',"marginTop":'-12px',"fontWeight":'bold'}}>{this.state.pwdErrorMsg}</text>
                        <input type="Password" ref="confirmPassword" defaultValue={this.state.confirmPassword} placeholder="Confirm New Password" className="form-control float-label" onBlur={this.onCheckPassword.bind(this)} id="confirmPassword"/>
                        <FontAwesome name='eye-slash' className="password_icon ConfirmPassword hide_p"/>
                      </div> : <div></div>}
                    {/*<div className="form-group">*/}
                      {/*<input type="text" ref="dob" placeholder="Date Of Birth" className="form-control float-label"  disabled="true" />*/}
                      {/*<FontAwesome name='calendar' className="password_icon" />*/}

                    {/*</div>*/}

                    <div className="form-group" id="date-of-birth">
                      <Datetime dateFormat="DD-MM-YYYY" timeFormat={false}  inputProps={{placeholder: "Date Of Birth"}}  closeOnSelect={true} value={moment(this.state.dateOfBirth).format('DD-MM-YYYY')} onChange={this.onfoundationDateSelection.bind(this)} />
                      <FontAwesome name="calendar" className="password_icon" onClick={this.openDatePickerDateOfBirth.bind(this)}/>
                    </div>


                    <div className="form-group">
                      <div className="input_types">
                        <label>Gender : </label>
                      </div>
                      <div className="input_types">
                        <input id="radio1" type="radio" name="radio" value="Male"   checked={this.state.genderStateMale} /><label htmlFor="radio1"><span><span></span></span>Male</label>
                      </div>
                      <div className="input_types">
                        <input id="radio2" type="radio" name="radio" value="Female"  checked={this.state.genderStateFemale} /><label htmlFor="radio2"><span><span></span></span>Female</label>
                      </div>
                      <div className="input_types">
                        <input id="radio3" type="radio" name="radio" value="Others"  checked={this.state.genderStateOthers} /><label htmlFor="radio3"><span><span></span></span>Others</label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

            </ScrollArea>
          </div>
        </div>)}
        <span className="actions_switch"></span>
        {isExternaluser ? <div></div> :
          <MlActionComponent ActionOptions={MlActionConfig} showAction='showAction' actionName="actionName"/>
        }
      </div>
    )
  }
};
