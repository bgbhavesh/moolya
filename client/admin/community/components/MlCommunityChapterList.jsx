import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import communityRoutes from '../actions/communityRouteHandler';
export default class MlCommunityChapterList extends Component {

  render(){
    const data=this.props.data||[];
    const list=  data.map((prop) => {
        let image=prop.chapterImage&&prop.chapterImage.trim()!==""?<img src={`${prop.chapterImage}`}/>:<span className="ml ml-chapter"></span>;
        return (
          <div className="col-md-2" key={prop._id}>
            <div className="list_block">
              <div className={`cluster_status ${prop.statusField || ""}_cl `}></div>
              <a href={communityRoutes.subChapterListRoute(prop.clusterId, prop._id)}>
                <div className={"hex_outer"}>
                  {image}
                </div>
              </a>
              <h3>{prop.chapterName} </h3>
            </div>
          </div>)
      }
    );

    return (
      <div className="row">
        {list}
      </div>
    );
  }
}

