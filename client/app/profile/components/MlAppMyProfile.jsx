import React, {Component, PropTypes} from "react";
import ScrollArea from 'react-scrollbar'
var FontAwesome = require('react-fontawesome');
import {multipartASyncFormHandler} from '../../../../client/commons/MlMultipartFormAction'

export default class MlAppMyProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {loading: true, data: {}};
  }
  componentWillMount(){
    let userDetails = Meteor.user();
    let firstName = userDetails.profile.firstName
    let lastName = userDetails.profile.lastName
    let displayName = userDetails.profile.displayName
    let profileImage = userDetails.profile.profileImage;
    this.setState({userId:Meteor.userId(),firstName: firstName, lastName:lastName, displayName:displayName,profileImage : profileImage, loading:false})
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
      {showLoader === true ? ( <div className="loader_wrap"></div>) : (
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
                      <input type="text" placeholder="Display Name" className="form-control float-label"
                             defaultValue={this.state.displayName}/>
                    </div>
                    <div className="form-group">
                      <input type="password" placeholder="Password" className="form-control float-label"/>
                      <FontAwesome name='eye' className="password_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="password" placeholder="Confirm Password" className="form-control float-label"/>
                      <FontAwesome name='eye' className="password_icon"/>
                    </div>
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
