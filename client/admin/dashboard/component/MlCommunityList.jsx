import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import dashboardRoutes from '../actions/routesActionHandler';
var FontAwesome = require('react-fontawesome');
export default class MlCommunityList extends Component {

  render(){
    const data=this.props.data||[];
    const list=  data.map((prop) =>
      <div className="col-md-2" key={prop.name}>
        <div className="list_block">
          <div className={`cluster_status ${prop.isActive?"active":"inactive"}_cl `}><FontAwesome name={prop.isActive?"check":"times"}/></div>
          <div className={`cluster_status ${prop.statusField|| ""}_cl `}></div>
          <a href={dashboardRoutes.communityListRoute(prop.clusterId,prop.chapterId,prop.subChapterId)}> <div className={"hex_outer"}><img src={prop.countryFlag}/></div></a>
          <h3>{prop.name}</h3>
        </div>
      </div>
  );

    return (<div className="row">{list}</div>);

  }

}

