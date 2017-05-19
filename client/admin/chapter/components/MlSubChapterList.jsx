import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import chapterRoutes from "../actions/chapterRoutes";
export default class MlSubChapterList extends Component {

  render(){
    const data=this.props.data||[]
    const subChapter =  [{'href':'/admin/myroute'}];
    const addSubChapter = subChapter.map(function (item,idx) {
      return (
        <div className="col-lg-2 col-md-4 col-sm-4" key={idx}>
          <div className="list_block">
            <div className="cluster_status"></div>
            <a href={chapterRoutes.createSubChapterDetails(data[0].clusterId, data[0].chapterId)}>
              <div className={"hex_outer"}><span className="ml ml-plus"></span></div>
            </a>
            <h3>Add Sub Chapter</h3>
          </div>
        </div>
      )
    });
    const list=  data.map((prop) =>
      <div className="col-lg-2 col-md-4 col-sm-4" key={prop._id}>
        <div className="list_block">
          <div className={`cluster_status ${prop.statusField|| ""}_cl `}></div>
          <a href={chapterRoutes.subChapterDetails(prop.clusterId, prop.chapterId, prop._id, prop.subChapterName)}>
            <div className={"hex_outer"}><span className="ml ml-moolya-symbol"></span></div>
          </a>
          <h3>{prop.subChapterName} hhk </h3>
        </div>
      </div>
  );

    return (<div className="row">{addSubChapter}{list}</div>);

  }

}

