import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import {logout} from "../../../../client/admin/layouts/header/actions/logoutAction";
var FontAwesome = require('react-fontawesome');


export default class MlAppHeader extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {}
    return this;
  }
  componentDidUpdate(){
    var WinWidth = $(window).width();
    if(WinWidth > 768){
    $(".app_menu,.app_main_wrap").mCustomScrollbar({theme:"minimal-dark"});
  }
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

  logoutUser() {
    logout();
  }

  render() {
    return (
      <div>
        <div className="overlay"></div>
        <div className="app_header">
          <a href="/app/dashboard" className="pull-left"><FontAwesome name='home'/></a>
          <a href="/app/dashboard"> <img className="moolya_app_logo" src="/images/logo.png"/></a>
          <a id="notification" data-placement="top" data-class="large_popover" href="#"
             className="pull-right notification ripple">
            <div className="noti_count">1</div>
            <FontAwesome name='bell-o'/></a>
          <a href="#" className="pull-right header_search"><FontAwesome name='search'/></a>
          <div style={{'display': 'none'}} className="ml_app_notification">
            <ul className="unstyled">
              <li>
                <a href="#">Thanks for the registration</a>
              </li>
              {/*<li>*/}
                {/*<a href="#">Messaggio di notifica 2 un po più lungo del normale</a>*/}
              {/*</li>*/}
              {/*<li>*/}
                {/*<a href="#">Messaggio di notifica un po più lungo del normale</a>*/}
              {/*</li>*/}
            </ul>
          </div>
          <div className="ml_app_profile" role="navigation">
            <h1 id="NavLbl" className="" style={{'backgroundImage':'url(/images/img2.png)'}}></h1>
            <ol>

              <li data-toggle="tooltip" title="My Profile" data-placement="right">
                <a href="/app/myprofile"><img className="profile-img" src="/images/1.png"/></a>
              </li>
              <li data-toggle="tooltip" title="Log as" data-placement="right">
                <a href="#"><img className="profile-img" src="/images/2.png"/></a>
              </li>
              <li data-toggle="tooltip" title="Switch Profile" data-placement="right">
                <a href="/app/appSwitchProfile"><img className="profile-img" src="/images/3.png"/></a>
              </li>
              <li data-toggle="tooltip" title="Register As" data-placement="right">
                <a href="/app/myProfile/registerAs"><img className="profile-img" src="/images/2.png"/></a>
              </li>
              {/*<li data-toggle="tooltip" title="Themes" data-placement="top">*/}
              {/*<a href="#"><img className="profile-img" src="/images/4.png"/></a>*/}
              {/*</li>*/}
              <li data-toggle="tooltip" title="Calander" data-placement="top">
                <a href="/app/calendar"><img className="profile-img" src="/images/6.png" /></a>
              </li>
              <li data-toggle="tooltip" title="My Tasks" data-placement="top">
                <a href=""><img className="profile-img" src="/images/7.png" /></a>
              </li>
              <li data-toggle="tooltip" title="Logout" data-placement="top">
                <a onClick={this.logoutUser.bind(this)}><img className="profile-img" src="/images/5.png"/></a>
              </li>
            </ol>
          </div>
        </div>

      </div>
    )
  }
}


MlAppHeader.contextTypes = {
  menu: React.PropTypes.object
};
