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
    const subChapter =  [{'href':'/admin/myroute'}];
    const addSubChapter = subChapter.map(function (item,idx) {
      return (
        <div className="col-lg-2 col-md-4 col-sm-4" key={idx}>
          <div className="list_block">
            <div className="cluster_status"></div>
            <a href={clusterRoutes.createSubChapterDetails(data[0].clusterId, data[0].chapterId)}>
              <div className={"hex_outer"}><span className="ml ml-plus"></span></div>
            </a>
            <h3>Add Sub Chapter</h3>
          </div>
        </div>
      )
    });
    if(data.length>0){
      list=  data.map((prop, idx) =>
        <div className="col-lg-2 col-md-4 col-sm-4" key={idx}>
          <div className="list_block">
            <div className={`cluster_status ${prop.isActive|| ""}_cl `}></div>
            <a href={clusterRoutes.subChapterDetails(prop.clusterId,prop.chapterId,prop._id,prop.subChapterName)}> <div className={"hex_outer"}><span className="ml ml-moolya-symbol"></span></div></a>
            <h3>{prop.subChapterDisplayName}</h3>
          </div>
        </div>
      );
    } else {
      list=  <div><h3>No Sub Chapters Available</h3></div>
    }


    return (<div className="row">{addSubChapter} {list}</div>);

  }
}
