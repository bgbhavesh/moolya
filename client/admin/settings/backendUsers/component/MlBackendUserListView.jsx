import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import backendUserRoute from '../actions/routesBackendUserLIst'
let  FontAwesome = require('react-fontawesome');

export default class MlClusterListView extends Component {

  render() {
    const data = this.props.data || [];
    const list = data.map(function (prop) {
      let StatusActive = '',fontName='';
      if( prop.profile.InternalUprofile){
        let status = prop.profile.InternalUprofile.moolyaProfile.isActive;
        if (status == true) {
          StatusActive = 'active'
          fontName='check'
        }
      }

      return (
        <div className="col-md-2" key={prop._id}>
          <div className="list_block provider_block">
            <div className={`cluster_status ${StatusActive}_cl`}><FontAwesome name={fontName}/></div>
            <a href={backendUserRoute.backendUserDetailRoute(prop._id)}>
              <div className="provider_mask">
                <img src="/images/funder_bg.png"/>
                <img className="user_pic" src="/images/def_profile.png"/>
              </div>
            </a>
            <h3>{prop.username} </h3>
          </div>
        </div>)

    });

    return (<div>{list}</div>);


  }
}
{/*<div className="col-md-2" key={prop.displayName}>
 <div className="list_block">
 <div className={`cluster_status ${prop.statusField|| ""}_cl `}></div>
 <a > <div className={"hex_outer"}><img src={prop.countryFlag}/></div></a>
 <h3>{prop.displayName}</h3>
 </div>
 </div>*/}
