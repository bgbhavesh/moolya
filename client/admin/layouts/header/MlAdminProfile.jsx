import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {logout} from "../header/actions/logoutAction";
import {getAdminUserContext} from "../../../commons/getAdminUserContext";
import {findBackendUserActionHandler} from "../../settings/backendUsers/actions/findBackendUserAction";
import { createContainer } from 'meteor/react-meteor-data';
var FontAwesome = require('react-fontawesome');


class  MlAdminProfileApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: " ",
      profilePic:" "
    }
    this.getValue = this.getValue.bind(this);
    // console.log(this.props.user);
    return this;
  }
  componentWillMount(){
    const resp=this.getValue();
      return resp;
  }
  componentDidMount(){
    $('.ml_profile h1').click(function(){
      $(this).parent('.ml_profile').toggleClass('profile_open');
      $('.overlay').toggle();
    });
    $('.overlay').click(function(){
      $('.ml_profile').removeClass('profile_open');
      $(this).hide();
    });

    $(".ml_profile").hover(function(){
      $('.profile-name').toggleClass('display_none');
    });

    setTimeout(function(){
      $('.ml_profile [data-toggle="tooltip"]').tooltip({
        container:'body',
        trigger:"hover"
      });
      $('.ml_profile [data-toggle="tooltip').on('click', function () {
        $(this).tooltip('hide');
      });
    },1000);
  }

  componentWillReceiveProps(){
   this.getValue();
  }

  logoutUser(){
    logout();


  }
  handleClick(){
    const userDefaultObj = getAdminUserContext();
    if (userDefaultObj.hierarchyCode == 'PLATFORM')
      FlowRouter.go('/admin/dashboard/clusters');
    else
      FlowRouter.go('/admin/dashboard/chapters');
  }


  async getValue() {
    // let Details = {
    //   profilePic: this.refs.upload.value};
    let user = Meteor.user();
    this.setState({firstName : user.profile.InternalUprofile.moolyaProfile.firstName + user.profile.InternalUprofile.moolyaProfile.lastName,
      profilePic: user.profile.profileImage?user.profile.profileImage:" "//response.profile.profileImage
    });
  }

  componentWillUpdate(){
    // console.log(this.props.user);
     let temp =this.state.profilePic;
     console.log(temp);
  }



  render() {
    var loggedInUser = getAdminUserContext();
    return (
      <div className="header_top">
        <a onClick={this.handleClick} style={{cursor: 'pointer'}}>
         <FontAwesome name='home' className="pull-left"/>
          {/*<img className="pull-left home" src="/images/home_icon.png"/>*/}
        </a>
        <a onClick={this.handleClick} style={{cursor: 'pointer'}}>
          <img className="logo" src="/images/logo.png" />
        </a>
        <div className="ml_profile" role="navigation">
          <h1 id="NavLbl" className="" style={{'background':`url(${this.state.profilePic}) center center`}}
          ></h1>
          <ol>
            <li data-toggle="tooltip" title="My Profile" data-placement="right"><a href="/admin/myprofile/personalInfo"><img className="profile-img" src="/images/1.png" /></a></li>
            <li data-toggle="tooltip" title="Log As" data-placement="right"><a href="/admin/logas"><img className="profile-img" src="/images/2.png" /></a></li>
            {loggedInUser&&loggedInUser.hierarchyLevel<4?<li data-toggle="tooltip" title="Switch Profile" data-placement="right"><a href="/admin/switchprofile"><img className="profile-img" src="/images/3.png" /></a></li>:""}
            <li data-toggle="tooltip" title="Themes" data-placement="right"><a href="#"><img className="profile-img" src="/images/4.png" /></a></li>
            <li data-toggle="tooltip" title="Logout" data-placement="left"><a onClick={this.logoutUser.bind(this)}><img className="profile-img" src="/images/5.png" /></a></li>
          </ol>
        </div>
        <div className="profile-name display_none">Welcome {this.state.firstName} </div>
      </div>


    )
  }

}


export default MlAdminProfile = createContainer(props => {
  return {
    user: Meteor.user(),
  };
}, MlAdminProfileApp);
