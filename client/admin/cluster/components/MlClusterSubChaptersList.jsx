import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import clusterRoutes from '../actions/clustersRoutes';
import {getAdminUserContext} from "../../../commons/getAdminUserContext";
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
    var loggedInUser = getAdminUserContext();
    const subChapter =  (loggedInUser && loggedInUser.hierarchyLevel > 1) ? [{'href': '/admin/myroute'}] : []
    const addSubChapter = subChapter.map(function (item,idx) {
      return (
        <div className="col-lg-2 col-md-4 col-sm-4" key={idx}>
          <div className="list_block">
            <div className="cluster_status"></div>
            <a href={clusterRoutes.createSubChapterDetails(FlowRouter.current().params.clusterId, FlowRouter.current().params.chapterId)}>
              <div className={"hex_outer"}><span className="ml ml-plus"></span></div>
            </a>
            <h3>Add Sub Chapter</h3>
          </div>
        </div>
      )
    });
    if(data.length>0){
      list=  data.map( function(prop, idx) {
        let icon, status;

        if(prop.isActive && prop.showOnMap){
          status = "active";
          // icon = "active-User"
        } else if(prop.isActive && !prop.showOnMap){
          status = "add";
          // icon ="add";
        } else if(!prop.isActive && prop.showOnMap){
          status = "inactive";
          // icon = "inactive-user"
        } else {
          status = "assign";
          // icon = "assign";
        }
        return (
          <div className="col-lg-2 col-md-4 col-sm-4" key={idx}>
            <div className="list_block">
              <div className={`cluster_status ${status}_cl`}><span className={`ml ml-${icon}`}></span></div>
              {prop.isDefaultSubChapter?<div className="list-moolya-icon"><span className="ml ml-moolya-symbol"></span></div>:<span></span>}
              <a href={clusterRoutes.subChapterDetails(prop.clusterId, prop.chapterId, prop._id, prop.subChapterName)}>
                  <div className={"hex_outer"}>{prop.subChapterImageLink ? <img src={prop.subChapterImageLink}/> : <span
                    className="ml ml-moolya-symbol"></span>}</div>
              </a>
              <h3>{prop.subChapterDisplayName}</h3>
            </div>
          </div>
        )
      });
    } else {
      list=  <div><h3>No Sub Chapters Available</h3></div>
    }


    return (<div className="row">{addSubChapter} {list}</div>);

  }
}
/*<div className={"hex_outer"}><span className="ml ml-moolya-symbol"></span></div>*/
