import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import clusterRoutes from '../actions/clustersRoutes';
var FontAwesome = require('react-fontawesome');

export default class MlClusterCommunitiesList extends Component
{
  constructor(props){
    super(props)
    this.state={
      data:[]
    }
    return this;
  }

  render(){
    const data=this.props.data||[];
    const list=  data.map((prop) =>
      <div className="col-md-2" key={prop.code}>
        <div className="list_block">
          <div className={`cluster_status ${prop.isActive?"active":"inactive"}_cl `}><FontAwesome name={prop.isActive?"check":"times"}/></div>
          <a href> <div className={"hex_outer"}><span className={prop.communityImageLink}></span></div></a>
          <h3>{prop.name}</h3>
        </div>
      </div>
    );

    return (<div className="row communities_list">{list}</div>);

  }
}
