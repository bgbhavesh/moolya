import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import dashboardRoutes from '../actions/routesActionHandler';
export default class MlAppSubChapterList extends Component {

  constructor(props){
    super(props);
    this.state={
      v : false,
    }
    return this;
  }

  render(){
    const data=this.props.data||[];
    const v = this.state.v;
    const list=  data.map((prop) =>
      <div className="col-lg-2 col-md-4 col-sm-4" key={prop._id}>
        <div className="list_block">
          <div className={`cluster_status ${prop.statusField|| ""}_cl `}></div>
          <a href={dashboardRoutes.subChapterAnchorRoute(prop.clusterId,prop.chapterId,prop._id, v)}>
            <div className={"hex_outer"}>{prop.subChapterImageLink ? <img src={prop.subChapterImageLink}/> : <span
              className="ml ml-moolya-symbol"></span>}</div>
          </a>
          <h3>{prop.subChapterDisplayName} </h3>
        </div>
      </div>
  );

    return (
      <div className="col-md-12">
        <h2> Sub Chapter </h2>
        {list}
      </div>
    );
  }
}

// <a href={dashboardRoutes.communityListRoute(prop.clusterId,prop.chapterId,prop._id, v)}>
