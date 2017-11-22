import {render} from 'react-dom';
import React, {Component, PropTypes} from 'react';
import _ from 'lodash'

export default class MapDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const mapData = this.props.data && this.props.data.length > 0 ? this.props.data : [];
    let mapDataArr = _.cloneDeep(mapData);
    let totalUsers = _.find(mapDataArr, {key:"totalUsers"});
    _.remove(mapDataArr, {key: "totalUsers"});
    let subchapter = _.find(mapDataArr, {key:"subChapter"});
    if(subchapter){
      _.remove(mapDataArr, {key: "subChapter"});
    }

    const mapDataList = mapDataArr.map(function (m) {
      let title = ""
      if(m.key == "backendUsers"){
        title = "Backend Users"
      }else if (m.key == "ideators"){
        title = "Ideators"
      }else if (m.key == "funders"){
        title = "Investors"
      }else if (m.key == "companies"){
        title = "Companies"
      }else if (m.key == "startups"){
        title = "Start Ups"
      }else if (m.key == "institutions"){
        title = "Institutions"
      }else if (m.key == "serviceproviders"){
        title = "Service Providers"
      }else {

        switch(m.key){
          case "cluster":
            title = "Chapters"
            break;
          case "chapter":
            title = "Sub Chapters"
            break;
        }
      }

      return (
        <li key={m.key}>
          <span className="title">{title}</span>
            <span className={m.icon}></span>
           <span className="count">{m.count}</span>
        </li>
      )
    });

    return (
      <div className="chapter_map_hover">
        <h2><b>{totalUsers && totalUsers.context ? totalUsers.context:""}</b> - {totalUsers&&totalUsers.count?totalUsers.count:0} Users</h2>
        <div className="chapter_map_hover_content">

          <ul>
            {mapDataList}
          </ul>
        </div>
      </div>);
  }
}
