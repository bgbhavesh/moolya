import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {logout} from "../header/actions/logoutAction";
import {getAdminUserContext} from "../../../commons/getAdminUserContext";
import {findBackendUserActionHandler} from "../../settings/backendUsers/actions/findBackendUserAction";

export default class  MlAdminProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: " ",
      profilePic:" "
    }
    this.getValue = this.getValue.bind(this);

    return this;
  }
  componentWillMount(){
    const resp=this.getValue();
    return resp;
  }
  componentDidMount(){
    $('.ml_profile h1').click(function(){
      $(this).parent('.ml_profile').toggleClass('profile_open');
    });
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
    let userType = Meteor.userId();
    let response = await findBackendUserActionHandler(userType);
    // let profilePicResponse = await addProfilePicAction(Details);
    this.setState({firstName : response.profile.InternalUprofile.moolyaProfile.displayName,
      profilePic:response.profile.profileImage
    });
  }

  componentWillUpdate(){
     let temp =this.state.profilePic;
     console.log(temp);
  }



  render() {
    return (
      <div className="header_top">
        <a onClick={this.handleClick} style={{cursor: 'pointer'}}>
          <img className="pull-left home" src="/images/home_icon.png"/>
        </a>
        <a onClick={this.handleClick} style={{cursor: 'pointer'}}>
          <img className="logo" src="/images/logo.png" />
        </a>
        <div className="ml_profile" role="navigation">
          <h1 id="NavLbl" className="" style={{'background':`url(${this.state.profilePic}) center -5px`}}
          ></h1>
          <ol>
            <li><a href="/admin/myprofile/personalInfo"><img className="profile-img" src="/images/1.png" /></a></li>
            <li><a href="/admin/logas"><img className="profile-img" src="/images/2.png" /></a></li>
            <li><a href="#"><img className="profile-img" src="/images/3.png" /></a></li>
            <li><a href="/admin/switchprofile"><img className="profile-img" src="/images/4.png" /></a></li>
            <li><a onClick={this.logoutUser.bind(this)}><img className="profile-img" src="/images/5.png" /></a></li>
          </ol>
        </div>
        <div className="profile-name">Welcome {this.state.firstName} </div>
      </div>


    )
  }

}

