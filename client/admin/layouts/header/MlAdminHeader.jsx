import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MlTabView from  './MlAdminTabView'
import MlAdminSearch from  './MlAdminSearch'
import {logout} from "../header/actions/logoutAction";
export default class MlAdminHeader extends Component {
  constructor(props,context){
    super(props,context);
    this.state={
      tabOptions:props.tabOptions,
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

  render(){
    let subMenu = this.context.menu.menu||[];
    let tabsubMenu;
     //let subMenu=localStorage.getItem("leftNavSubMenu")
    if(subMenu){
    //tabsubMenu=JSON.parse(subMenu)
      tabsubMenu=subMenu;
    }

    return (
      <div className="admin_header">
        <div className="header_top"> <img className="pull-left home" src="/images/home_icon.png"/> <img className="logo" src="/images/logo.png" />
       {/* <MlAdminSearch/>*/}
          <div className="ml_profile" role="navigation">
            <h1 id="NavLbl" className=""></h1>
            <ol>
              <li><a href="#"><img className="profile-img" src="/images/1.png" /></a></li>
              <li><a href="#"><img className="profile-img" src="/images/2.png" /></a></li>
              <li><a href="#"><img className="profile-img" src="/images/3.png" /></a></li>
              <li><a href="#"><img className="profile-img" src="/images/4.png" /></a></li>
              <li><a onClick={this.logoutUser.bind(this)}><img className="profile-img" src="/images/5.png" /></a></li>
            </ol>
          </div>
        </div>
        <div className="header_bottom">
          <MlTabView tabOptions={tabsubMenu}  linkField="link" nameField="name"/>
        </div>
      </div>

    )
  }
}

MlAdminHeader.contextTypes = {
  menu: React.PropTypes.object
};
