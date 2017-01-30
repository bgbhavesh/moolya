import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MoolyaTabView from  '../header/Tabview'
import MoolyaSearch from  './MoolyaSearch'
import MoolyaloginContainer from '../../../login/container/loginContainer'
export default class MoolyaHeader extends Component {
  constructor(props){
    super(props);
    this.state={
      tabOptions:props.tabOptions,
    }
    return this;
  }
  componentDidMount(){
    $('.ml_profile h1').click(function(){
      $(this).parent('.ml_profile').toggleClass('profile_open');
    });
   /* $(function() {
      $('.float-label').jvFloat();
    });*/

  }
  logoutUser(){
   this.props.onlogout(true);
  }

  render(){
 //   let data = this.props.data && this.props.data.data? this.props.data.data: {}
   // console.log(data)
    //let subMenu = data.menu||[];
    let tabsubMenu;
     let subMenu=localStorage.getItem("leftNavSubMenu")
    if(subMenu){
    tabsubMenu=JSON.parse(subMenu)
    }

    return (
      <div className="admin_header">
        <div className="header_top"> <img className="pull-left home" src="/images/home_icon.png"/> <img className="logo" src="/images/logo.png" />
        <MoolyaSearch/>
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
          <MoolyaTabView tabOptions={tabsubMenu}  linkField="link" nameField="name"/>
        </div>
      </div>

    )
  }
}
