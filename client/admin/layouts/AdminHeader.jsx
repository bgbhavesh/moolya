import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import {loginContainer} from '../../common/containers/login'
import {logout} from '../../common/containers/logout'


AdminHeaderContent = React.createClass({
  render(){
    return (
      <header className="moolya-header">
        <div className="container-fluid">
          <div className="row offset10">
            <div className="col-lg-6 col-md-6 col-sm-6 offset0">
              <a href="">
                <img src="/assets/images/moolya_logo.png" alt="moolya" className="moolya-logo img-responsive"/>
              </a>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 text-right">
              <span className="fa fa-search search-icon"></span>
              <div className="expSearchBox">
                <div className="close">
                  <span className="front"></span>
                  <span className="back"></span>
                </div>
              </div>
              <span className="fa fa-bell-o alerts-icon"><span className="fa fa-circle alert-note"></span></span>
              <a href="" className="dropdown" data-toggle="dropdown" aria-expanded="true">
                <span className="profile-pic"><img src="/assets/images/profile-pic.png" alt="" /></span>
              </a>
              <ul className="dropdown-menu">
                <li><a id="userProfile" className="menu_links">User Profile</a></li>
                <li><a href="" id="logout" className="menu_links" data-content="" rel="popover" onClick={loginContainer.logout}>Logout </a></li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    )
  }
})
