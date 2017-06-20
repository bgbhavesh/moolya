import React, {Component, PropTypes} from "react";
import ScrollArea from 'react-scrollbar'
var FontAwesome = require('react-fontawesome');
import {multipartASyncFormHandler} from '../../../../client/commons/MlMultipartFormAction'
import MlLoader from '../../../commons/components/loader/loader'
import passwordSAS_validate from '../../../../lib/common/validations/passwordSASValidator';
import {resetPasswordActionHandler} from "../../../admin/settings/backendUsers/actions/resetPasswordAction";
import {passwordVerification} from '../../../admin/profile/actions/addProfilePicAction'



export default class MlAppMyProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {loading: true,
      data: {},
      password: '',
      confirmPassword: '',
      showPasswordFields: true,
      passwordState: " ",
      passwordValidation: false
    };
    this.checkExistingPassword.bind(this);
    this.passwordCheck.bind(this);
  }
  componentDidMount() {
    $(function () {
      $('.float-label').jvFloat();
    });
    // this.initializeSwiper();
  }
  componentWillMount(){
    let userDetails = Meteor.user();
    console.log(userDetails)
    let firstName = userDetails.profile.firstName
    let lastName = userDetails.profile.lastName
    let displayName = userDetails.emails[0].address
    let profileImage = userDetails.profile.profileImage;
    this.setState({userId:Meteor.userId(),firstName: firstName, lastName:lastName, displayName:displayName,profileImage : profileImage, loading:false})
  }


  async checkExistingPassword() {
    let pwd = this.refs.existingPassword.value;
    var digest = CryptoJS.SHA256(pwd).toString()
    console.log(digest);
    this.passwordCheck(digest);
  }

  async resetPassword() {
    if (this.state.showPasswordFields) {
      let userDetails = {
        userId: Meteor.userId(),
        password: this.refs.confirmPassword.value
      }
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
      }
    } else {
      this.setState({
        showPasswordFields: true
      })
    }
    const resp = this.onFileUpload();
    return resp;
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

  async passwordCheck(digest)
  {
    const resp = await passwordVerification(digest)
    console.log(resp);
    if(resp.success){
      this.setState({passwordState: 'Passwords match!'})
      this.setState({passwordState: 'Passwords match!'})
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
        this.setState({"pwdValidationMsg": ''})
        this.setState({passwordValidation: true})
      }
      else if (typeof (validate) == 'object') {
        this.setState({"pwdValidationMsg": validate.errorMsg})
      }

    }
  }

  async onImageFileUpload(e){
    if(e.target.files[0].length ==  0)
      return;
    let file = e.target.files[0];
    let name = e.target.name;
    let fileName = e.target.files[0].name;
    let user = {profile: {InternalUprofile: {moolyaProfile: {profileImage:" "}}}}
    if(file) {
      let data = {moduleName: "PROFILE", actionName: "UPDATE", userId:this.state.userId, user: user}
      let response = await multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this));
      return response;
    }
  }

  onFileUploadCallBack(resp){
    if(resp){
      let result = JSON.parse(resp)
      if(result.success){
        this.setState({loading:true})
        let userDetails= Meteor.user();
        let profileImage = userDetails.profile.profileImage;
        this.setState({profileImage : profileImage, loading:false})
      }
    }
  }

  render(){
  const showLoader=this.state.loading;
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
                      <div className="fileUpload mlUpload_btn">
                        <span>Profile Pic</span>
                          <input type="file" className="upload" id="profilePic" onChange={this.onImageFileUpload.bind(this)}/>
                      </div>
                      <div className="previewImg ProfileImg">
                        <img src={this.state.profileImage}/>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form_bg">
                  <form>
                    <div className="form-group">
                      <input type="text" placeholder="User Name" className="form-control float-label"
                             defaultValue={this.state.displayName}/>
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
                    <div className="form-group">
                      <input type="text" ref="dob" placeholder="Date Of Birth" className="form-control float-label"
                             defaultValue={this.state.dateOfBirth} disabled="true"/>
                      <FontAwesome name='calendar' className="password_icon"/>

                    </div>
                    <div className="form-group">
                      <div className="input_types">
                        <label>Gender : </label>
                      </div>
                      <div className="input_types">
                        <input id="radio1" type="radio" name="radio" value="Male" checked={this.state.genderStateMale}/><label
                        htmlFor="radio1"><span><span></span></span>Male</label>
                      </div>
                      <div className="input_types">
                        <input id="radio2" type="radio" name="radio" value="Female"
                               checked={this.state.genderStateFemale}/><label
                        htmlFor="radio2"><span><span></span></span>Female</label>
                      </div>
                      <div className="input_types">
                        <input id="radio3" type="radio" name="radio" value="Others"
                               checked={this.state.genderStateOthers}/><label
                        htmlFor="radio3"><span><span></span></span>Others</label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

            </ScrollArea>
          </div>
        </div>)}
    </div>
  )
}
}
