import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import clusterRoutes from '../actions/clustersRoutes';
export default class MlClusterSubChaptersList extends Component
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
      <div className="col-md-2" key={prop.subChapterCode}>
        <div className="list_block">
          <div className={`cluster_status ${prop.isActive|| ""}_cl `}></div>
          <a href={clusterRoutes.communityListRoute(prop.clusterId,prop.chapterId,prop._id)}> <div className={"hex_outer"}><img src={prop.countryFlag}/></div></a>
          <h3>{prop.subChapterName}</h3>
        </div>
      </div>
    );

    return (<div>{list}</div>);

  }
}
