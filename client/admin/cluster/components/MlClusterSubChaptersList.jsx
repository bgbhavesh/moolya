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
    let list = null;
    if(data.length>0){
      list=  data.map((prop) =>
        <div className="col-md-2" key={prop.subChapterCode}>
          <div className="list_block">
            <div className={`cluster_status ${prop.isActive|| ""}_cl `}></div>
            <a href={clusterRoutes.subChapterDetails(prop.clusterId,prop.chapterId,prop._id,prop.subChapterName)}> <div className={"hex_outer"}><span className="ml ml-moolya-symbol"></span></div></a>
            <h3>{prop.subChapterName}</h3>
          </div>
        </div>
      );
    } else {
      list=  <div><h3>No Sub Chapters Available</h3></div>
    }


    return (<div className="row">{list}</div>);

  }
}
