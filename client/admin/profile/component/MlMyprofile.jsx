import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar'
import {findBackendUserActionHandler} from "../../settings/backendUsers/actions/findBackendUserAction";
import {updateBackendUserActionHandler} from '../../settings/backendUsers/actions/findBackendUserAction';
import {initalizeFloatLabel} from '../../utils/formElemUtil';
//import {addProfilePicAction} from "../actions/addProfilePicAction"
import {multipartASyncFormHandler} from '../../../commons/MlMultipartFormAction'
import {RegistrationWizard} from '../../../admin/transaction/requested/component/RegistrationWizard';
import {findRegistrationActionHandler} from '../../../admin/transaction/requested/actions/findRegistration'
import MlActionComponent from "../../../commons/components/actions/ActionComponent";




export default class MlMyProfile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      firstName: " ",
      middleName: " ",
      lastName:" ",
      userName: " ",
      uploadedProfilePic : "/images/ideator_01.png",
      registrationDetails: {},
      selectedBackendUser: " ",
      data:{}
    };
    this.getValue = this.getValue.bind(this);
   // this.getRegistrationSocialLinks.bind(this);
    this.findRegistration.bind(this);
    this.onFileUpload.bind(this);
    this.onFileUploadCallBack.bind(this);
    return this;
  }
  async findRegistration() {
    const response = await findRegistrationActionHandler(this.props.config);
    this.setState({loading: false, registrationDetails: response});
    return response;
  }

  //
  // sendDataToParent(){
  //   let data = this.state.data;
  //   for (var propName in data) {
  //     if (data[propName] === null || data[propName] === undefined) {
  //       delete data[propName];
  //     }
  //   }
  //   this.props.getIdeatorDetails(data)
  // }
  //
  //
  // onClick(field,e){
  //   let details = this.state.data||{};
  //   let key = e.target.id;
  //   details=_.omit(details,[key]);
  //   let className = e.target.className;
  //   if(className.indexOf("fa-lock") != -1){
  //     details=_.extend(details,{[key]:true});
  //   }else{
  //     details=_.extend(details,{[key]:false});
  //   }
  //   this.setState({data:details}, function () {
  //     this.sendDataToParent()
  //   })
  //
  // }


   async getValue() {
  // let Details = {
  //   profilePic: this.refs.upload.value};
    let userType = Meteor.userId();
     let response = await findBackendUserActionHandler(userType);
     // let profilePicResponse = await addProfilePicAction(Details);
     console.log(response);
     this.setState({selectedBackendUser: userType,loading:false ,firstName : response.profile.InternalUprofile.moolyaProfile.firstName,
                    middleName:response.profile.InternalUprofile.moolyaProfile.middleName,
                    lastName: response.profile.InternalUprofile.moolyaProfile.lastName,
                    userName: response.profile.InternalUprofile.moolyaProfile.displayName
     });
  }



  componentWillMount(){
    initalizeFloatLabel();
    const resp=this.getValue();
    return resp;
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
    $("#informationb").click(function(){
      $(".hide_div").hide();
      $("#information_div").show();
    });
    $("#contactb").click(function(){
      $(".hide_div").hide();
      $("#contact_div").show();
    });
    $("#locationb").click(function(){
      $(".hide_div").hide();
      $("#location_div").show();
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

  async handleSuccess() {
    this.resetBackendUers();
  }

  handleError(response) {
    console.log('error handle');
    console.log(response);
  }
  updateProfile(){
    const resp=this.onFileUpload();
    toastr.success("Update Successful");
    return resp;
  }

  onFileUpload(e){
    let user = {
      profile: {
        InternalUprofile: {moolyaProfile: {profileImage:" "}}
      }
    }
    let fileName= e.target.files[0].name;
    let userId = Meteor.userId();
    let data = {moduleName: "PORTFOLIO", actionName: "UPDATE", userId:userId, user: user}
    let response = multipartASyncFormHandler(data, fileName, "registration", this.onFileUploadCallBack.bind(this));
  }

  onFileUploadCallBack(resp){
    if(resp){
       this.setState({"uploadedProfilePic" : resp.result})
      // this.props.getRegistrationSocialLinks();
      console.log(resp.result)
    }
  }



  render(){
    // let MlActionConfig = [
    //   {
    //     showAction: true,
    //     actionName: 'save',
    //     handler: this.updateProfile.bind(this)
    //   },
    //   {
    //     showAction: true,
    //     actionName: 'cancel',
    //     handler: null
    //   }
    // ];
    const showLoader=this.state.loading;

    return (
      <div className="admin_main_wrap">
        {showLoader===true?( <div className="loader_wrap"></div>):(
          <div className="admin_padding_wrap">
          <h2>My Profile</h2>
          <div className="col-md-10 nopadding">
            <div id="information_div" className="hide_div">
              <div className="col-md-6 nopadding-left">
                <div className="form_bg">
                  <form>
                    <div className="form-group">
                      <input type="text" placeholder="First Name" className="form-control float-label" id="" defaultValue={this.state.firstName}/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Middle Name" className="form-control float-label" id="" defaultValue={this.state.middleName}/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="Last Name" className="form-control float-label" defaultValue={this.state.lastName}/>
                    </div>
                    <div className="form-group steps_pic_upload">
                      <div className="previewImg ProfileImg">
                        <img src=" "/>
                      </div>
                      <div className="fileUpload mlUpload_btn">
                        <span>Profile Pic</span>
                        <input type="file" className="upload" id="profilePic" onChange={this.onFileUpload.bind(this)}/>
                      </div>

                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form_bg">
                  <form>
                    <div className="form-group">
                      <input type="text" placeholder="User Name" className="form-control float-label" id="" defaultValue={this.state.userName}/>
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
                      <input type="text" placeholder="Date Picker" className="form-control float-label" id=""/>
                      <FontAwesome name='calendar' className="password_icon"/>
                    </div>
                    <div className="form-group">
                      <div className="input_types">
                        <label>Gender : </label>
                      </div>
                      <div className="input_types">
                        <input id="radio1" type="radio" name="radio" value="1"/><label htmlFor="radio1"><span><span></span></span>Male</label>
                      </div>
                      <div className="input_types">
                        <input id="radio2" type="radio" name="radio" value="2"/><label htmlFor="radio2"><span><span></span></span>Female</label>
                      </div>
                      <div className="input_types">
                        <input id="radio3" type="radio" name="radio" value="2"/><label htmlFor="radio3"><span><span></span></span>Others</label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div id="location_div" className="hide_div">

              <div className="swiper-container profile_container">
                <div className="swiper-wrapper">
                  <div className="swiper-slide profile_accounts">

                    <img src="../images/india.png" /><br />Hyderabad
                    <h2>Finance / Accounts</h2>
                    <h3>Manager</h3>

                  </div>
                  <div className="swiper-slide profile_accounts">

                    <img src="../images/india.png" /><br />Hyderabad
                    <h2>Finance / Accounts</h2>
                    <h3>Manager</h3>

                  </div>
                  <div className="swiper-slide profile_accounts">

                    <img src="../images/india.png" /><br />Hyderabad
                    <h2>Finance / Accounts</h2>
                    <h3>Manager</h3>

                  </div>
                  <div className="swiper-slide profile_accounts">

                    <img src="../images/india.png" /><br />Hyderabad
                    <h2>Finance / Accounts</h2>
                    <h3>Manager</h3>

                  </div>
                  <div className="swiper-slide profile_accounts">

                    <img src="../images/india.png" /><br />Hyderabad
                    <h2>Finance / Accounts</h2>
                    <h3>Manager</h3>

                  </div>

                </div>
                <div className="swiper-pagination"></div>
              </div>
              <div className="col-md-5">
                <div className="form-group">
                  <input type="text" placeholder="Cluster" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Wing" className="form-control float-label" id="" />
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-group">
                  <input type="text" placeholder="Chapter" className="form-control float-label" id="" />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Sub Wing" className="form-control float-label" id="" />
                </div>
              </div>
              <div className="col-md-2"></div>
              <div className="col-md-12">
                <div className="form-group">
                  <input type="text" placeholder="Role" className="form-control float-label" id="" />
                </div>
              </div>
            </div>
            <div id="contact_div" className="hide_div">


              <div className="col-md-6 nopadding-left">

                <div className="panel panel-default profile_tabs">
                  <div className="panel-heading">
                    <h3 className="panel-title">Contact Number</h3>
                  </div>
                  <div className="panel-body">

                    <div className="form_emails_left">
                      <ul>
                        <li><a href="#">Work</a></li>
                        <li><a href="#">Office</a></li>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">New</a></li>
                      </ul>
                    </div>
                    <div className="form_emails_right">
                      <div className="form-group">
                        <select className="form-control float-label">
                          <option>Number Type</option>
                          <option>test</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Country Code" className="form-control float-label" id="" />
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Enter Number" className="form-control float-label" id="" />
                      </div>
                    </div>

                  </div>
                </div>

                <div className="col-md-12 nopadding">
                  <div className="panel panel-default profile_tabs">
                    <div className="panel-heading">
                      <h3 className="panel-title">Email Id</h3>
                    </div>
                    <div className="panel-body">

                      <div className="form_emails_left">
                        <ul>
                          <li><a href="#">Work</a></li>
                          <li><a href="#">Office</a></li>
                          <li><a href="#">Home</a></li>
                          <li><a href="#">New</a></li>
                        </ul>
                      </div>
                      <div className="form_emails_right">
                        <div className="form-group">
                          <select className="form-control float-label">
                            <option>Email Id Type</option>
                            <option>test</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Email Id" className="form-control float-label" id="" />
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
              <div className="col-md-6">
                <div className="panel panel-default profile_tabs">
                  <div className="panel-heading">
                    <h3 className="panel-title">Address</h3>
                  </div>
                  <div className="panel-body">
                    <div className="form_emails_left">
                      <ul>
                        <li><a href="#">Work</a></li>
                        <li><a href="#">Office</a></li>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">New</a></li>
                      </ul>
                    </div>
                    <div className="form_emails_right">
                      <ScrollArea
                        speed={0.8}
                        className="form_emails_right_scroll"
                        smoothScrolling={true}
                      >
                        <div className="form-group">
                          <select className="form-control float-label">
                            <option>Address Type</option>
                            <option>test</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Name" className="form-control float-label" id="" />
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Phone Number" className="form-control float-label" id="" />
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Flat/House/Floor/Bulding No" className="form-control float-label" id="" />
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Colony/Street/Locality" className="form-control float-label" id="" />
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Landmark" className="form-control float-label" id="" />
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Area" className="form-control float-label" id="" />
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="Town/City" className="form-control float-label" id="" />
                        </div>
                        <div className="form-group">
                          <input type="text" placeholder="State" className="form-control float-label" id="" />
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </div>



              </div>
            </div>
          </div>
          <div className="col-md-2 nopadding">
            <div className="myprofile_left">
              <a href="" className="hex_btn hex_btn_in" id="informationb">
                <FontAwesome name='info'/>
              </a>
              <a href="" className="hex_btn hex_btn_in" id="contactb">
                <FontAwesome name='sort-desc' className=""/>
              </a>
              <a href="" className="hex_btn hex_btn_in" id="locationb">
                <FontAwesome name='eye'/>
              </a>
            </div>
          </div>
          <span></span>
        {/*  <div className="bottom_actions_block">
            <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/edit_icon.png"/> </a></div>
            <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_add_icon.png"/> </a></div>
            <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_logout_icon.png"/> </a></div>
            <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_progress_icon.png"/> </a></div>
            <div className="hex_btn"><a href="#" className="hex_btn hex_btn_in"> <img src="/images/act_select_icon.png"/> </a></div>
          </div>*/}
                    </div>)}
      </div>
    )
  }
};
