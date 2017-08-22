import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import {logout} from "../../../../client/admin/layouts/header/actions/logoutAction";
import {fetchUserDetailsHandler} from "../../commons/actions/fetchUserDetails";
import BugReportWrapper from '../../commons/components/MlAppBugReportWrapper';
var FontAwesome = require('react-fontawesome');
import { createContainer } from 'meteor/react-meteor-data';


class MlAppProfileHeader extends Component {
  constructor(props, context) {
    super(props, context);
    this.state={profilePic:""}
    this.regStatus = false;
    // this.fetchUserDetails = this.fetchUserDetails.bind(this);
    this.state = {loading: false,data: {}}
    return this;
  }
  componentDidUpdate(){
   /* var WinWidth = $(window).width();
     if(WinWidth > 768){
    $(".app_menu,.app_main_wrap").mCustomScrollbar({theme:"minimal-dark"});
  }*/
  }
  componentDidMount() {
      var WinHeight = $(window).height();
      var WinWidth = $(window).width();
      $('.app_main_wrap ').height(WinHeight - $('.app_header').outerHeight(true));
      $('.ml_app_profile h1').click(function () {
          $(this).parent('.ml_app_profile').toggleClass('profile_open');
      });
      $("#notification").popover({
          'title': 'Notifications',
          'html': true,
          'placement': 'bottom',
          'content': $(".ml_app_notification").html()
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
    if( user && user.profile && user.profile.profileImage) {
      console.log(user);
      this.setState({profilePic:user.profile.profileImage});
    }
    const resp = this.fetchUserDetails();
    return resp
  }

  /**this is having issues*/
  async fetchUserDetails() {
    let response = await fetchUserDetailsHandler()
    if (response){
      this.setState({data: response, loading:false})
    }
  }

  /**user logout function*/
  logoutUser() {
    logout();
  }

  componentWillReceiveProps(user){
    if( user && user.user && user.user.profile &&  user.user.profile.profileImage) {
      console.log(user);
      this.setState({profilePic:user.user.profile.profileImage});
    }

  }

  /**
   * redirect to registration page
   * */
  registrationRedirect() {
    FlowRouter.go("/app/register/");
  }

  render() {
    const {data} = this.state
    // console.log(this.regStatus)
    // const showLoader=this.state.loading;
    return (
      <div>
        <BugReportWrapper />

        <div className="overlay"></div>
        {/*{showLoader===true?(<MlLoader/>):(*/}
        <div className="app_header">
          <a href="/app/dashboard" className="pull-left"><FontAwesome name='home'/></a>
          <a href="/app/dashboard"> <img className="moolya_app_logo" src="/images/logo.png"/></a>
          <a id="notification" data-placement="top" data-class="large_popover" href="#"
             className="pull-right notification ripple">
            <div className="noti_count">1</div>
            <FontAwesome name='bell-o'/></a>
          <a href="#" className="pull-right header_search"><FontAwesome name='search'/></a>
          <span className="pull-right context_name" style={{'padding':'1px 7px','backgroundColor':'#ef4647','color':'#fff','lineHeight':'18px','borderRadius':'2px','fontSize':'12px','marginTop':'17px'}}>{data && data.registrationInfo && data.registrationInfo.communityName?data.registrationInfo.communityName:''}</span>
          <div style={{'display': 'none'}} className="ml_app_notification">
            <ul className="unstyled">
              <li>
                <a href="#"><span className="ml ml-moolya-symbol"/>Thanks for the registration </a>
              </li>
            </ul>
          </div>
          <div className="ml_app_profile" role="navigation">
          <h1 id="NavLbl"  data-toggle="tooltip" title={`Welcome ${data && data.firstName?data.firstName:"User"}`} data-placement="left" className="" style={{'backgroundImage':`url(${data && data.profileImage?data.profileImage:"/images/ideator_01.png"})`, 'backgroundPosition': 'center center'}}>{/*<span className="profile_context ml ml-ideator"></span>*/}</h1>
            <ol>`
              <li data-toggle="tooltip" title="My Profile" data-placement="right">
                <a href="/app/myprofile"><span className="ml my-ml-blank_Profile_3"></span></a>
              </li>
              {(this.state.data && !this.state.data.isAllowRegisterAs) ?
                <li data-toggle="tooltip" title="Registration" data-placement="right">
                  <a href="" onClick={this.registrationRedirect.bind(this)}><span className="ml my-ml-Switch_Profile_Log_As">
                  </span></a>
                </li> : <div></div>}
              <li data-toggle="tooltip" title="Switch Profile" data-placement="right">
                <a href="/app/appSwitchProfile"><span className="ml my-ml-switch_profile"></span></a>
              </li>
              <li data-toggle="tooltip" title="Register As" data-placement="right">
                <a href="/app/myProfile/registerAs"><span className="ml my-ml-Switch_Profile_Log_As"></span></a>
              </li>
              {/*<li data-toggle="tooltip" title="Themes" data-placement="top">*/}
              {/*<a href="#"><span className="ml my-ml-themes_10-01"></span></a>*/}
              {/*</li>*/}
              <li data-toggle="tooltip" title="Calander" data-placement="top">
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
        </div>
          {/*)}*/}
      </div>
    )
  }
}

export default MlAppHeader = createContainer(props => {
  return {
    user: Meteor.user(),
  };
}, MlAppProfileHeader);

