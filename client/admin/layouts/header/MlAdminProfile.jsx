import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {logout} from "../header/actions/logoutAction";
export default class  MlAdminProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    return this;
  }
  componentDidMount(){
    $('.ml_profile h1').click(function(){
      $(this).parent('.ml_profile').toggleClass('profile_open');
    });
  }
  logoutUser(){
    logout();
  }

  render() {
    return (
      <div className="header_top"> <img className="pull-left home" src="/images/home_icon.png"/> <img className="logo" src="/images/logo.png" />
        <div className="ml_profile" role="navigation">
          <h1 id="NavLbl" className=""></h1>
          <ol>
            <li><a href="/admin/myprofile"><img className="profile-img" src="/images/1.png" /></a></li>
            <li><a href="/admin/logas"><img className="profile-img" src="/images/2.png" /></a></li>
            <li><a href="#"><img className="profile-img" src="/images/3.png" /></a></li>
            <li><a href="/admin/switchprofile"><img className="profile-img" src="/images/4.png" /></a></li>
            <li><a onClick={this.logoutUser.bind(this)}><img className="profile-img" src="/images/5.png" /></a></li>
          </ol>
        </div>
        {/*<div className="profile-name">Welcome Mohasin</div>*/}
      </div>


    )
  }

}

