import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import backendUserRoute from '../actions/routesBackendUserLIst'
let  FontAwesome = require('react-fontawesome');

export default class MlClusterListView extends Component {

  render() {
    const data = this.props.data || [];
    const list = data.map(function (prop) {
      let StatusActive = '',userStatus=''; let userRoleList=[]
      let username=''
      if( prop.profile.InternalUprofile){
        let status = prop.profile.isActive;
        if(prop.profile.InternalUprofile.moolyaProfile.displayName){
          username = prop.profile.InternalUprofile.moolyaProfile.displayName;
        } else {
          let firstname=prop.profile.InternalUprofile.moolyaProfile.firstName;
          let lastname=prop.profile.InternalUprofile.moolyaProfile.lastName
          username=firstname+" "+lastname
        }
        /*let userProfile=prop.profile.InternalUprofile.moolyaProfile.userProfiles;
        for(let i=0;i<userProfile.length;i++){
          let userRoles=userProfile[i].userRoles
          if(userRoles!=undefined){
              if(userRoles[0].roleId!=undefined){
                userRoleList.push(userRoles[0].roleId);
              }

          }
        }*/
        if (status == true) {
          StatusActive = 'active-User'
          userStatus='active'
        }else{
          StatusActive = 'inactive-user'
          userStatus='inactive'
        }
      }
      return (

        <div className="col-lg-2 col-md-4 col-sm-4" key={prop._id}>
          <div className="list_block provider_block">
            <div className={`cluster_status ${userStatus}_cl`}><span className={`ml ml-${StatusActive}`}></span></div>
            <a href={backendUserRoute.backendUserDetailRoute(prop._id)}>
              <div className="provider_mask">
                <img src="/images/funder_bg.png"/>
                <img className="user_pic" src="/images/def_profile.png"/>
              </div>
            </a>
            <h3>{username}  <br />
            {prop.roleNames}</h3>
          </div>
        </div>)

    });

    return (<div className="row">{list}</div>);


  }
}
{/*<div className="col-md-2" key={prop.displayName}>
 <div className="list_block">
 <div className={`cluster_status ${prop.statusField|| ""}_cl `}></div>
 <a > <div className={"hex_outer"}><img src={prop.countryFlag}/></div></a>
 <h3>{prop.displayName}</h3>
 </div>
 </div>*/}
