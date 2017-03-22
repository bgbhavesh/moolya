import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import communityRoutes from "../actions/communityRouteHandler"
export default class MlCommunitySubChapterList extends Component {

  render(){
    const data=this.props.data||[];
    const list=  data.map((prop) =>
      <div className="col-md-2" key={prop._id}>
        <div className="list_block">
          <div className={`cluster_status ${prop.statusField|| ""}_cl `}></div>
          <a href={communityRoutes.subChapterCommunityListRoute(prop.clusterId,prop.chapterId,prop._id)}> <div className={"hex_outer"}><span className="ml ml-moolya-symbol"></span></div></a>
          <h3>{prop.subChapterName} </h3>
        </div>
      </div>
    );

    return (<div className="row">{list}</div>);

  }

}
