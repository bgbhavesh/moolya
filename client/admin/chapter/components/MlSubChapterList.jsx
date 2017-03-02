import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import chapterRoutes from '../actions/chapterRoutes';
export default class MlSubChapterList extends Component {

  render(){
    const data=this.props.data||[];
    const list=  data.map((prop) =>
      <div className="col-md-2" key={prop._id}>
        <div className="list_block">
          <div className={`cluster_status ${prop.statusField|| ""}_cl `}></div>
          <a href={chapterRoutes.subChapterDetails(prop._id)}> <div className={"hex_outer"}><img src={prop.subChapterImageLink}/></div></a>
          <h3>{prop.subChapterName} </h3>
        </div>
      </div>
  );

    return (<div>{list}</div>);

  }

}

