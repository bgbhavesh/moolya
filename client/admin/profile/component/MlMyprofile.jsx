import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar'
import {updateBackendUserActionHandler} from '../../settings/backendUsers/actions/findBackendUserAction';
import {initalizeFloatLabel} from '../../utils/formElemUtil';
//import {addProfilePicAction} from "../actions/addProfilePicAction"
import {multipartASyncFormHandler} from '../../../commons/MlMultipartFormAction'
import MlActionComponent from "../../../commons/components/actions/ActionComponent";
import {updateDataEntry} from '../actions/addProfilePicAction'
import {findBackendUserActionHandler} from '../../settings/backendUsers/actions/findBackendUserAction'
import Datetime from "react-datetime";
import moment from "moment";
import {MlAdminProfile} from '../../../admin/layouts/header/MlAdminHeader'


export default class MlMyProfile extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      firstName: " ",
      middleName: " ",
      lastName:" ",
      userName: " ",
      uploadedProfilePic : " ",
      registrationDetails: {},
      selectedBackendUser: " ",
      profilePic: " ",
      foundationDate: null,
      genderStateMale: " ",
      genderStateFemale: " ",
      genderStateOthers: " ",
      dateOfBirth:" ",
      genderSelect:" "
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
   this.firstNameUpdation =  this.firstNameUpdation.bind(this);
    this.middleNameUpdation= this.middleNameUpdation.bind(this);
    this.lastNameUpdation=this.lastNameUpdation.bind(this);
    this.displayNameUpdation.bind(this);
    this.updateProfile.bind(this);
    this.genderSelect = this.genderSelect.bind(this);
    //this.fileUpdation.bind(this);
   // this.firstNameUpdation.bind(this);
    return this;
  }
  onFoundationDateSelection(event) {
    if (event._d) {
      let value = moment(event._d).format('DD-MM-YYYY');
      this.setState({loading: false, foundationDate: value});
    }
  }

  componentDidMount()
  {
    $(function() {
      $('.float-label').jvFloat();
    });

    $('.myprofile_left a').click(function(){
      $('.myprofile_left a').removeClass("active");
      $(this).addClass("active");
    });

    var swiper = new Swiper('.profile_container', {
      pagination: '.swiper-pagination',
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      initialSlide:1,
      slidesPerView: 'auto',
      coverflow: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : true
      }
    });
  }

  onFileUploadCallBack(resp) {
      if (resp) {
          console.log(resp);
          this.setState({"uploadedProfilePic": resp});
          var temp = $.parseJSON(this.state.uploadedProfilePic).result;
          this.setState({"uploadedProfilePic":temp});
          console.log(temp);
          this.storeImage();
          return temp;
      }
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



  async storeImage() {
  let Details = {
      profileImage : this.state.uploadedProfilePic,
      firstName :this.state.firstName,
      middleName : this.state.middleName,
      lastName : this.state.lastName,
      userName: this.state.userName,
      genderType:this.state.genderSelect,
      dateOfBirth:this.refs.dob.value,
      userId : Meteor.userId()
  }

  const dataresponse = await updateDataEntry(Details);
  console.log(dataresponse);
    toastr.success("Update Successful")
    return dataresponse;
  }

  async getValue() {
    let userType = Meteor.userId();
    let user = Meteor.user();
    let isExternal = user.profile.isExternaluser;
    if(isExternal){
      this.setState({
        loading: false, firstName: user.profile.firstName,
        middleName: user.profile.middleName,
        lastName: user.profile.lastName,
        userName: user.profile.displayName,
        // uploadedProfilePic: response.profile.profileImage,
        genderSelect: "Male", //response.profile.genderType
        // dateOfBirth: response.profile.dateOfBirth
      });
    }else{
      let response = await findBackendUserActionHandler(userType);
      console.log(response);
      this.setState({loading:false ,firstName : response.profile.InternalUprofile.moolyaProfile.firstName,
        middleName:response.profile.InternalUprofile.moolyaProfile.middleName,
        lastName: response.profile.InternalUprofile.moolyaProfile.lastName,
        userName: response.profile.InternalUprofile.moolyaProfile.displayName,
        uploadedProfilePic:response.profile.profileImage,
        genderSelect:response.profile.genderType,
        dateOfBirth: response.profile.dateOfBirth
      });
    }
    this.genderSelect();
  }

  componentWillMount(){
    const resp= this.getValue();
    return resp;
  }
  componentDidUpdate(){
    initalizeFloatLabel();
  }


  async genderSelect(){
    //this.setState({genderSelect: e.target.value})
    if(this.state.genderSelect === "Male"){
      this.setState({genderStateMale: true,genderStateFemale:false,genderStateOthers:false })
    }
    else if(this.state.genderSelect === "Female"){
      this.setState({genderStateFemale: true, genderStateMale: false, genderStateOthers:false})
    }
    else{
      this.setState({genderStateOthers:
        // true, genderStateFemale: false, genderStateMale: false}) // Changes made for 30th April App Demo
        false, genderStateFemale: false, genderStateMale: true})
    }
  }


  async handleSuccess() {
    this.resetBackendUers();
  }

  handleError(response) {
    console.log('error handle');
    console.log(response);
  }
  async updateProfile(){
    const resp=this.onFileUpload();
    return resp;
  }

  async onFileUpload(){
    // let file=document.getElementById("profilePic").files[0];
    let user = {
      profile: {
        InternalUprofile: {moolyaProfile: {profileImage:" " }}
      }
    }
    let file=document.getElementById("profilePic").files[0];
    if(file) {
      let data = {moduleName: "PROFILE", actionName: "UPDATE", userId: this.state.selectedBackendUser, user: user}
      let response = await multipartASyncFormHandler(data, file, 'registration', this.onFileUploadCallBack.bind(this));
      return response;
    }
    else{
      this.storeImage();
    }

    //this.props.onFileUpload(file,documentId);
  }

  render(){
    let MlActionConfig = [
      {
        showAction: true,
        actionName: 'save',
        handler: this.updateProfile.bind(this)
      },
      {
        showAction: true,
        actionName: 'cancel',
        handler: async(event) => FlowRouter.go('/admin/dashboard/clusters')
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
        {showLoader===true?( <div className="loader_wrap"></div>):(
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
                          <input type="file" className="upload" id="profilePic"/>
                        }
                      </div>
                      <div className="previewImg ProfileImg">
                        <img src={profilePic}/>
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
                    <div className="form-group">
                      <input type="password" placeholder="Password" className="form-control float-label" id=""/>
                      <FontAwesome name='eye' className="password_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="password" placeholder="Confirm Password" className="form-control float-label" id=""/>
                      <FontAwesome name='eye' className="password_icon"/>
                    </div>
                    <div className="form-group">
                      <input type="text" ref="dob" placeholder="Date Of Birth" className="form-control float-label" defaultValue={this.state.dateOfBirth} disabled="true" />
                      <FontAwesome name='calendar' className="password_icon" />

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
