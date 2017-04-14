import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import chapterRoutes from '../actions/chapterRoutes';
export default class MlSubChapterList extends Component {

  render(){
    const data=this.props.data||[];
    const list=  data.map((prop) =>
      <div className="col-lg-2 col-md-4 col-sm-4" key={prop._id}>
        <div className="list_block">
          <div className={`cluster_status ${prop.statusField|| ""}_cl `}></div>
          <a href={chapterRoutes.subChapterDetails(prop.clusterId,prop.chapterId,prop._id,prop.subChapterName)}> <div className={"hex_outer"}><span className="ml ml-moolya-symbol"></span></div></a>
          <h3>{prop.subChapterName} </h3>
        </div>
      </div>
  );

    return (<div className="row">{list}</div>);

  }

}

