import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import communityRoutes from '../actions/routesActionHandler';
export default class MlCommunityList extends Component {

  render(){
    const data=this.props.data||[];
    const list=  data.map((prop) =>
      <div className="col-lg-2 col-md-3 col-sm-3" key={prop.displayName}>
        <div className="list_block">
          <div className={`cluster_status ${prop.isActive?"active":"inactive"}_cl `}><FontAwesome name={prop.isActive?"check":"times"}/></div>
          <a href={communityRoutes.communityListRoute(prop._id)}>
            <div className={"hex_outer"}>
              <img src={prop.communityImageLink}/>
            </div>
          </a>
          <h3>{prop.displayName}</h3>
        </div>
      </div>
  );

    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Communities</h2>
          <div className="list_view_block communities_list" >
            <div className="col-md-12">
              <div className="row">
                 {list}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  }

}

