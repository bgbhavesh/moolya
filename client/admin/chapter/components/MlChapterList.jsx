import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import chapterRoutes from '../actions/chapterRoutes';
import MlActionComponent from '../../../commons/components/actions/ActionComponent'
export default class MlChapterList extends Component {

  render(){
    const data=this.props.data||[];
    const list=  data.map((prop, idx) => {
      let image=prop.chapterImage&&prop.chapterImage.trim()!==""?<img src={`${prop.chapterImage}`}/>:<span className="ml ml-chapter"></span>;
      return (
      <div className="col-lg-2 col-md-4 col-sm-4" key={idx}>
        <div className="list_block">
          <div className={`cluster_status ${prop.statusField || ""}_cl `}></div>
          <a href={chapterRoutes.subChapterListRoute(prop.clusterId, prop._id)}>
            <div className={"hex_outer"}>
              {image}
            </div>
          </a>
          <h3>{prop.displayName} </h3>
        </div>
      </div>)
    }
  );

    return (
      <div className="row">
        <h2> Chapter </h2>
          {list}
      </div>
    );
  }
}

