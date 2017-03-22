import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import communityRoutes from '../actions/communityRouteHandler';
export default class MlCommunityList extends Component {

  render(){
    const data=this.props.data||[];
    const list=  data.map((prop) =>
      <div className="col-lg-2 col-md-3 col-sm-3" key={prop.code}>
        <div className="list_block">
          <div className={`cluster_status ${prop.isActive?"active":"inactive"}_cl `}><FontAwesome name={prop.isActive?"check":"times"}/></div>
            <a href={communityRoutes.communityListRoute(prop.code)}>
            <div className={"hex_outer"}>
              {/*<img src={prop.communityImageLink}/>*/}
              <span className={prop.communityImageLink}></span>
            </div>
          </a>
          <h3>{prop.name}</h3>
        </div>
      </div>
  );

    return (
        <div className="row communities_list">
          <h2>Communities</h2>
          {list}
        </div>

    );

  }

}

