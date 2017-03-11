import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import chapterRoutes from '../actions/chapterRoutes';
import MlActionComponent from '../../../commons/components/actions/ActionComponent'
export default class MlChapterList extends Component {

  render(){
    const data=this.props.data||[];
    const list=  data.map((prop) => {
      let image=prop.chapterImage&&prop.chapterImage.trim()!==""?<img src={`${prop.chapterImage}`}/>:<span className="ml ml-chapter"></span>;
      return (
      <div className="col-md-2" key={prop._id}>
        <div className="list_block">
          <div className={`cluster_status ${prop.statusField || ""}_cl `}></div>
          <a href={chapterRoutes.subChapterListRoute(prop.clusterId, prop._id)}>
            <div className={"hex_outer"}>
              {/*<img src={prop.subChapterImageLink}/>*/}
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

