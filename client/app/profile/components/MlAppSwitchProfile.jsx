import React from 'react';
import { render } from 'react-dom';
import {fetchExternalUserProfilesActionHandler,setDefaultProfileActionHandler,deActivateProfileProfileActionHandler,blockProfileActionHandler} from '../actions/switchUserProfilesActions';
import _ from 'lodash';
import {initalizeFloatLabel} from '../../../admin/utils/formElemUtil';
export default class MlAppSwitchProfile extends React.Component{

  constructor(props, context){
      super(props);
      this.state= {loading: true,swiper:null,userProfiles:[],currentSlideIndex:0};
      this.fetchExternalUserProfiles.bind(this);
      this.setDefaultUserProfile.bind(this);
      this.deactivateUserProfile.bind(this);
      this.blockUserProfile.bind(this);
      this.onSlideIndexChange.bind(this);
      this.initializeSwiper.bind(this);
    return this;
  }

  onSlideIndexChange(swiper){
    if(this.state.currentSlideIndex!==swiper.activeIndex){
      this.setState({'currentSlideIndex':swiper.activeIndex});
    }
  }

  initializeSwiper(){
    if (!this.swiper) {
      this.swiper = new Swiper('.profile_container', {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        initialSlide: this.state.currentSlideIndex,
        slidesPerView: 'auto',
        coverflow: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        onSlideChangeEnd: this.onSlideIndexChange.bind(this),
        onTouchEnd:this.onSlideIndexChange.bind(this),
        onTransitionEnd:this.onSlideIndexChange.bind(this)
      });
    }
  };
  componentDidMount() {
    $(function () {
      $('.float-label').jvFloat();
    });

   // this.initializeSwiper();
  }
componentDidUpdate(){
  initalizeFloatLabel();
}


  async fetchExternalUserProfiles(){
    const response = await fetchExternalUserProfilesActionHandler();
    if(response){
      let index=_.findIndex(response, {'isDefault':true })||0;
      let initialSlideIndex=index>=0?index:0;
      this.setState({loading: false, userProfiles: response,'currentSlideIndex':initialSlideIndex});
    }
  }

  async setDefaultUserProfile(){

    let profileDetails=this.state.userProfiles[this.state.currentSlideIndex]||{};
    const response = await setDefaultProfileActionHandler(profileDetails.registrationId);
    if(response&&response.success){
      var resp=await this.fetchExternalUserProfiles();
      this.initializeSwiper();
      toastr.success("Default Profile set successfully");
    }else{
      //throw error
      toastr.error("Failed to set the default profile");
    }
  }

  async deactivateUserProfile(){
    let profileDetails=this.state.userProfiles[this.state.currentSlideIndex]||{};
    const response = await deActivateProfileProfileActionHandler(profileDetails.registrationId);
    if(response&&response.success){
      var resp=await this.fetchExternalUserProfiles();
      this.initializeSwiper();
      toastr.success("Profile deactivated successfully");
    }else{
      //throw error
      toastr.error("Failed to deactivate the profile");
    }
  }

  async blockUserProfile(){
    let profileDetails=this.state.userProfiles[this.state.currentSlideIndex]||{};
    const response = await blockProfileActionHandler(profileDetails.registrationId);
    if(response&&response.success){
      toastr.success("Profile blocked successfully");
    }else{
      //throw error
      toastr.error("Failed to block the profile");
    }
  }

  async componentWillMount()
  {
    var resp=await this.fetchExternalUserProfiles();
    this.initializeSwiper();
  }

  render(){
    const showLoader=this.state.loading;
    if (showLoader) {
      return <div className="loader_wrap"></div>;
    }

    let profileDetails=this.state.userProfiles[this.state.currentSlideIndex]||{};
    let profileExists=this.state.userProfiles&&this.state.userProfiles.length>0?true:false;

    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap portfolio-main-wrap">
          <h2>Switch Profile</h2>

          { profileExists?
          <div id="location_div">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="swiper-container profile_container">
                <div className="swiper-wrapper">

                  {this.state.userProfiles.map(function (prf, idx) {
                    return(
                      <div className="swiper-slide profile_accounts" key={idx} name={idx}>
                       {/* <img src={prf.countryFlag?prf.countryFlag:""}/>*/}
                       <span className={prf.communityImage}></span>
                       <br />
                        {prf.communityDefName?prf.communityDefName:""}{prf.identityType?(<text>_{prf.identityType}</text>):""}
                        <br />{prf.chapterName?prf.chapterName:""}{prf.clusterName?(<text>_{prf.clusterName}</text>):""}
                        {prf.accountType?(<h2>Subscription: {prf.accountType}</h2>):""}<br />
                      </div>
                    )
                  })}

                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>

            <div className="col-md-12">
              <br />
              <br />
              <div className="clearfix"></div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                  <input type="text" placeholder="Community" className="form-control float-label"  value={profileDetails.communityDefName}  disabled/>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Country" className="form-control float-label"  value={profileDetails.clusterName} disabled/>
              </div>

              <div className="form-group">
                <input type="text" placeholder="Subscription Type" className="form-control float-label"  value={profileDetails.accountType} disabled/>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <input type="text" placeholder="Identity" className="form-control float-label"  value={profileDetails.identityType} disabled/>
              </div>
              <div className="form-group">
                <input type="text" placeholder="City" className="form-control float-label"  value={profileDetails.chapterName} disabled/>
              </div>
              <div className="form-group">
                <input type="text" placeholder="Status" className="form-control float-label"  value={profileDetails.isActive&&"Active"} disabled/>
              </div>
            </div>

            <div className="col-md-12 text-center">
              <div className="col-md-4" onClick={this.setDefaultUserProfile.bind(this)}>
                <a href="#" className="fileUpload mlUpload_btn">Make Default</a>
              </div>
              <div className="col-md-4" onClick={this.deactivateUserProfile.bind(this)}>
                <a href="#" className="fileUpload mlUpload_btn">Deactivate Profile</a>
              </div>
              <div className="col-md-4" onClick={this.blockUserProfile.bind(this)}>
                <a href="#" className="fileUpload mlUpload_btn">Block Profile</a>
              </div>
            </div>

          </div>:<div>No Profiles Available</div>

          }


        </div>

      </div>
    )
  }
};
