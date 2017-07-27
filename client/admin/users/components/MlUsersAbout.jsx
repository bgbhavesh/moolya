/**
 * Created by vishwadeep on 26/7/17.
 */
import React, {Component} from "react";
import ScrollArea from "react-scrollbar";
import MlLoader from "../../../commons/components/loader/loader";
import {initalizeFloatLabel} from "../../utils/formElemUtil";
import {findUserRegistrationActionHandler} from "../actions/findUserRegistrationHandler";
export default class MlUsersAbout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,swiper:null, data: {}
    }
    this.findRegistration.bind(this)
    this.initializeSwiper.bind(this);
    return this;
  }

  componentWillMount() {
    const resp = this.findRegistration();
    return resp
  }

  async findRegistration() {
    let registrationId = this.props.registrationId;
    const response = await findUserRegistrationActionHandler(registrationId);
    console.log(response);
    this.setState({loading: false, data: response});
  }

  componentDidMount() {
    initalizeFloatLabel();
    // var mySwiper = new Swiper('.blocks_in_form', {
    //   speed: 400,
    //   spaceBetween: 25,
    //   slidesPerView: 2,
    //   pagination: '.swiper-pagination',
    //   paginationClickable: true
    // });
    this.initializeSwiper();
  }

  initializeSwiper(){
    if(!this.swiper){
      this.swiper = new Swiper('.blocks_in_form', {
        speed: 400,
        spaceBetween: 25,
        slidesPerView: 2,
        pagination: '.swiper-pagination',
        paginationClickable: true
      });
    }
  }

  //todo:// initialize is not working need to fix
  componentDidUpdate() {
    initalizeFloatLabel();
    var WinHeight = $(window).height();
    $('.left_wrap').height(WinHeight - (90 + $('.admin_header').outerHeight(true)));
    this.initializeSwiper();
  }

  render() {
    let regInfo = this.state.data && this.state.data.registrationInfo ? this.state.data.registrationInfo : {}
    let regDetail = this.state.data && this.state.data.registrationDetails ? this.state.data.registrationDetails : {}
    let alsoRegisterAs = this.state.data && this.state.data.externalUserProfiles && this.state.data.externalUserProfiles.length > 0 ? this.state.data.externalUserProfiles : []
    const alsoRegisterAsList = alsoRegisterAs.map(function (userProfile, id) {
      return (
        <div className="form_inner_block swiper-slide" key={id}>
          <div className="form-group">
            <input type="text" placeholder="Community" defaultValue={userProfile.communityName}
                   className="form-control float-label" disabled="disabled"/>
          </div>
          <div className="form-group left_al">
            <input type="text" placeholder="Identity" defaultValue={userProfile.identityType}
                   className="form-control float-label" disabled="disabled"/>
          </div>
          <div className="form-group right_al">
            <input type="text" placeholder="Type" className="form-control float-label" disabled="disabled"/>
          </div>
          <div className="form-group left_al">
            <input type="text" placeholder="Cluster" className="form-control float-label"
                   defaultValue={userProfile.clusterName} disabled="disabled"/>
          </div>
          <div className="form-group right_al">
            <input type="text" placeholder="Chapter" className="form-control float-label"
                   defaultValue={userProfile.chapterName} disabled="disabled"/>
          </div>
          <div className="form-group left_al">
            <input type="text" placeholder="Sub-Chapter" className="form-control float-label"
                   defaultValue={userProfile.subChapterName} disabled="disabled"/>
          </div>
          <div className="form-group right_al">
            <input type="text" placeholder="Subscription Type" className="form-control float-label"
                   defaultValue={userProfile.accountType}
                   disabled="disabled"/>
          </div>
          <div className="form-group switch_wrap">
            <label>Status : </label>
            <label className="switch">
              <input type="checkbox"/>
              <div className="slider"></div>
            </label>
          </div>

          <br className="brclear"/>
        </div>
      )
    });
    const showLoader = this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader === true ? ( <MlLoader/>) : (
          <div className="admin_padding_wrap">
            <h2>About</h2>
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
                        <input type="text" placeholder="Moolya Id" name="moolyaId"
                               className="form-control float-label" defaultValue={regInfo.registrationId}
                               disabled="disabled"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Title" name="Title"
                               className="form-control float-label" disabled="disabled"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="First Name" name="firstName" defaultValue={regInfo.firstName}
                               className="form-control float-label" disabled="disabled"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Last Name" name="lastName" defaultValue={regInfo.lastName}
                               className="form-control float-label"
                               disabled="disabled"/>
                      </div>

                      {/*<div className="form-group">*/}
                      {/*<input type="text" placeholder="Display Name" name="displayName"*/}
                      {/*className="form-control float-label"*/}
                      {/*disabled="disabled"/>*/}
                      {/*</div>*/}

                      <div className="form-group">
                        <input type="text" placeholder="Username" name="username" defaultValue={regInfo.userName}
                               className="form-control float-label"
                               disabled="disabled"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Password" name="password" defaultValue={regInfo.password}
                               className="form-control float-label"
                               disabled="disabled"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Date of Birth" name="dob" defaultValue={regDetail.dateOfBirth}
                               className="form-control float-label"
                               disabled="disabled"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Gender" name="gender" defaultValue={regDetail.gender}
                               className="form-control float-label"
                               disabled="disabled"/>
                      </div>


                      <div className="form-group">
                        <input type="text" placeholder="Profession" defaultValue={regInfo.profession}
                               className="form-control float-label"
                               disabled="disabled"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Employer Status" defaultValue={regDetail.employmentStatus}
                               className="form-control float-label"
                               disabled="disabled"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Employer Name" defaultValue={regDetail.employerName}
                               className="form-control float-label"
                               disabled="disabled"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Employer URL" defaultValue={regDetail.employerWebsite}
                               className="form-control float-label"
                               disabled="disabled"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Employment Date" defaultValue={regDetail.employmentDate}
                               className="form-control float-label"
                               disabled="disabled"/>
                      </div>
                      {/*<div className="form-group">*/}
                      {/*<input type="text" placeholder="Years of Experience" name="gender"*/}
                      {/*className="form-control float-label"*/}
                      {/*disabled="disabled"/>*/}
                      {/*</div>*/}
                      <div className="form-group">
                        <input type="text" placeholder="Profession Tag" defaultValue={regDetail.professionalTag}
                               className="form-control float-label"
                               disabled="disabled"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="Identity" defaultValue={regInfo.identityType}
                               className="form-control float-label"
                               disabled="disabled"/>
                      </div>
                      <div className="form-group">
                        <input type="text" placeholder="User Type" defaultValue={regInfo.userType}
                               className="form-control float-label"
                               disabled="disabled"/>
                      </div>
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
                  default={true}
                >
                  <div className="form_bg">
                    <form>

                      <div className="form-group steps_pic_upload">
                        <div className="previewImg ProfileImg">
                          <img src={regInfo.profileImage ? regInfo.profileImage : "/images/ideator_01.png"}/>
                        </div>
                      </div>
                      <br className="brclear"/>

                      <div className="form-group">
                        <input type="text" placeholder="Your Country" defaultValue={regInfo.countryId}
                               className="form-control float-label" disabled="disabled"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Your City" className="form-control float-label"
                               defaultValue={regInfo.cityId}
                               disabled="disabled"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Email Id" defaultValue={regInfo.email}
                               className="form-control float-label"
                               disabled="disabled"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Phone Number" defaultValue={regInfo.contactNumber}
                               className="form-control float-label"
                               disabled="disabled"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Subscription Type" defaultValue={regInfo.accountType}
                               className="form-control float-label"
                               disabled="disabled"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Do you want to associate"
                               defaultValue={regInfo.institutionAssociation}
                               className="form-control float-label" disabled="disabled"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Citizenship" defaultValue={regDetail.citizenships}
                               className="form-control float-label" disabled="disabled"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Qualification" defaultValue={regDetail.qualification}
                               className="form-control float-label" disabled="disabled"/>
                      </div>

                      <div className="form-group">
                        <label>Operation Area</label>
                        <input type="text" placeholder="Cluster" defaultValue={regInfo.clusterId}
                               className="form-control float-label" disabled="disabled"/>
                      </div>

                      <div className="form-group">
                        <input type="text" placeholder="Chapter" defaultValue={regInfo.chapterId}
                               className="form-control float-label" disabled="disabled"/>
                      </div>

                      <div className="swiper-container blocks_in_form">
                        <label>Also Register As : </label>
                        <div className="swiper-wrapper">
                          {alsoRegisterAsList}
                          {/*<div className="form_inner_block swiper-slide">*/}
                          {/*<div className="form-group">*/}
                          {/*<input type="text" placeholder="Community"*/}
                          {/*className="form-control float-label" disabled="disabled"/>*/}
                          {/*</div>*/}
                          {/*<div className="form-group left_al">*/}
                          {/*<input type="text" placeholder="Identity" className="form-control float-label"/>*/}
                          {/*</div>*/}
                          {/*<div className="form-group right_al">*/}
                          {/*<input type="text" placeholder="Type" className="form-control float-label"/>*/}
                          {/*</div>*/}
                          {/*<div className="form-group left_al">*/}
                          {/*<input type="text" placeholder="Cluster" className="form-control float-label"/>*/}
                          {/*</div>*/}
                          {/*<div className="form-group right_al">*/}
                          {/*<input type="text" placeholder="Chapter" className="form-control float-label"/>*/}
                          {/*</div>*/}
                          {/*<div className="form-group left_al">*/}
                          {/*<input type="text" placeholder="Sub-Chapter" className="form-control float-label"/>*/}
                          {/*</div>*/}
                          {/*<div className="form-group right_al">*/}
                          {/*<input type="text" placeholder="Subscription Type" className="form-control float-label"/>*/}
                          {/*</div>*/}
                          {/*<div className="form-group switch_wrap">*/}
                          {/*<label>Status : </label>*/}
                          {/*<label className="switch">*/}
                          {/*<input type="checkbox"/>*/}
                          {/*<div className="slider"></div>*/}
                          {/*</label>*/}
                          {/*</div>*/}

                          {/*<br className="brclear"/>*/}
                          {/*</div>*/}
                        </div>
                        <br className="brclear"/>
                        <div className="swiper-pagination"></div>
                      </div>
                      <div className="form-group switch_wrap inline_switch">
                        <label className="">Overall Deactivate User</label>
                        <label className="switch">
                          <input type="checkbox" ref="isActive"/>
                          <div className="slider"></div>
                        </label>
                      </div>
                      <div className="form-group switch_wrap">
                        <label>Show On Map</label>
                        <label className="switch">
                          <input type="checkbox"/>
                          <div className="slider"></div>
                        </label>
                      </div>
                    </form>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>)}
      </div>
    )
  }
}
