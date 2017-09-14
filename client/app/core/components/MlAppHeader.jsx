import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import {logout} from "../../../../client/admin/layouts/header/actions/logoutAction";
import {fetchUserDetailsHandler} from "../../commons/actions/fetchUserDetails";
import BugReportWrapper from '../../commons/components/MlAppBugReportWrapper';
import MlAppNotificationsConfig from '../../commons/components/notifications/MlAppNotificationsConfig'
var FontAwesome = require('react-fontawesome');
import { createContainer } from 'meteor/react-meteor-data';
import VerticalBreadCrum from "../../breadcrum/component/VerticalBreadCrum";


class MlAppProfileHeader extends Component {
  constructor(props, context) {
    super(props, context);
    this.state={profilePic:""}
    this.regStatus = false;
    this.state = {loading: false,data: {}, notifications:[], isAllowRegisterAs:true}

    return this;
  }

  componentDidMount() {
      var WinHeight = $(window).height();
      var WinWidth = $(window).width();
      $('.app_main_wrap ').height(WinHeight - $('.app_header').outerHeight(true));


      $('.ml_app_profile h1').click(function () {
          $(this).parent('.ml_app_profile').toggleClass('profile_open');
        $('.overlay').toggle();
      });


    $('.overlay').click(function(){
      $('.ml_app_profile').removeClass('profile_open');
      $(this).hide();
    });
    $('.ml_app_profile ol a').click(function(){
      $('.ml_app_profile ol a').removeClass('active');
      $(this).addClass('active');
    });

    $('body').tooltip({
      selector: '[data-toggle="tooltip"], [title]:not([data-toggle="popover"])',
      trigger: 'hover',
      container: 'body'
    }).on('click mousedown mouseup', '[data-toggle="tooltip"], [title]:not([data-toggle="popover"])', function () {
      $('[data-toggle="tooltip"], [title]:not([data-toggle="popover"])').tooltip('destroy');
    });

  }

  /**fetching user details from registration*/
  componentWillMount(){
    let user = Meteor.user();
    let gImg = user && user.profile && user.profile.genderType==='female'?"/images/female.jpg":"/images/def_profile.png";
    if( user && user.profile && user.profile.profileImage) {
      console.log(user);
      this.setState({
        profilePic:user.profile.profileImage == " "?gImg:user.profile.profileImage
      });
    }
    else {
      this.setState({profilePic:gImg});
    }
    const resp = this.fetchUserDetails();
    return resp
  }

  /**this is having issues*/
  async fetchUserDetails() {
    let response = await fetchUserDetailsHandler()
    if (response){
      if(response && response.registrationInfo && response.registrationInfo.registrationType == 'OFB'){
        this.setState({isAllowRegisterAs:false})
      }
      this.setState({data: response, loading:false})
    }
  }

  /**user logout function*/
  logoutUser() {
    logout();
  }

  componentWillReceiveProps(user){
    let gImg = user && user.user && user.user.profile && user.profile.genderType==='female'?"/images/female.jpg":"/images/def_profile.png";
    if( user && user.user && user.user.profile &&  user.user.profile.profileImage) {
      this.setState({
        profilePic:user.user.profile.profileImage == " "?gImg:user.user.profile.profileImage
      });
    }
    else {
      this.setState({profilePic:gImg});
    }
  }

  /**
   * redirect to registration page
   * */
  registrationRedirect() {
    if (this.state.data && !this.state.data.isAllowRegisterAs)
      FlowRouter.go("/app/register/");
  }


  breadcrumbClicked(){
    this.props.breadcrumbClicked();
  }

  render() {
    const {data} = this.state
    let isDisabled = (!this.state.data || (this.state.data && this.state.data.isAllowRegisterAs))?true:false;

    return (
      <div>
        <BugReportWrapper />

        <div className="overlay"></div>
        <div className="filter_overlay"></div>

        <VerticalBreadCrum breadcrumbClicked={this.breadcrumbClicked.bind(this)} />

        {/*{showLoader===true?(<MlLoader/>):(*/}

        <div className="app_header">
          <a href="/app/dashboard" className="pull-left"><FontAwesome name='home'/></a>
          <a href="/app/dashboard"> <img className="moolya_app_logo" src="/images/logo.png"/></a>


          <MlAppNotificationsConfig />


          <div className="ml_app_profile" role="navigation">
          <h1 id="NavLbl"  data-toggle="tooltip" title={`Welcome ${data && data.firstName?data.firstName:"User"}`} data-placement="left" className="" style={{'backgroundImage':`url(${this.state.profilePic})`, 'backgroundPosition': 'center center'}}>{/*<span className="profile_context ml ml-ideator"></span>*/}</h1>
            <ol>
              <li data-toggle="tooltip" title="My Profile" data-placement="right">
                <a href="/app/myprofile">
                  <span className="ml my-ml-blank_Profile_3"></span>
                </a>
              </li>
                <li data-toggle={isDisabled?"":"tooltip"} title={isDisabled?"":"Pending Registration"} data-placement="right">
                  <a href="" className={isDisabled?"disable":""} onClick={this.registrationRedirect.bind(this)}><span className="ml my-ml-pending_registrations">
                  </span></a>
                </li>
              <li data-toggle="tooltip" title="Switch Profile" data-placement="right">
                <a href="/app/appSwitchProfile">
                  <span className="ml my-ml-switch_profile"></span>
                </a>
              </li>
              <li data-toggle="tooltip" title="Register As" data-placement="right">
                <a href={this.state.isAllowRegisterAs?"/app/myProfile/registerAs":""}><span className="ml my-ml-register_as"></span></a>
              </li>
              {/*<li data-toggle="tooltip" title="Themes" data-placement="top">*/}
              {/*<a href="#"><span className="ml my-ml-themes_10-01"></span></a>*/}
              {/*</li>*/}
              <li data-toggle="tooltip" title="Calendar" data-placement="top">
                <a href="/app/calendar"><span className="ml my-ml-calendar"></span></a>
              </li>
              <li data-toggle="tooltip" title="My Tasks" data-placement="top">
                <a href="/app/task"><img className="profile-img" src="/images/7.png" /></a>
              </li>
              <li data-toggle="tooltip" title="Logout" data-placement="top">
                <a onClick={this.logoutUser.bind(this)}><span className="ml my-ml-exit_or_logoff"></span></a>
              </li>
            </ol>
          </div>
          <div className="clearfix"></div>
          <span className="pull-right context_name">
          {data && data.headerCommunityDisplay?data.headerCommunityDisplay:''}
          </span>
        </div>
          {/*)}*/}
      </div>
    )
  }
}

export default MlAppHeader = createContainer(props => {
  return {
    user: Meteor.user(),
    breadcrumbClicked : props.breadcrumbClicked
  };
}, MlAppProfileHeader);


