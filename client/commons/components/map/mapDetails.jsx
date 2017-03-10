import {render} from 'react-dom';
import React, {Component, PropTypes} from 'react';
// import {findMapDetailsTypeActionHandler} from './findMapDetailsTypeAction'

export default class MapDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const mapData=this.props.data&&this.props.data.length>0?this.props.data:[];

    const mapDataList=mapData.map(function(m) {
      if(m.key == "ideators"){
        return (
          <li key={m.key}>
            <span className="ml ml-ideator"></span>
            <div className="hex_btn2 hex_btn_in2">{m.count}</div>
          </li>
        )
      }
      if(m.key == "funders"){
        return (
          <li key={m.key}>
            <span className="ml ml-funder"></span>
            <div className="hex_btn2 hex_btn_in2">{m.count}</div>
          </li>
        )
      }
      if(m.key == "startups"){
        return (
          <li key={m.key}>
            <span className="ml ml-startup"></span>
            <div className="hex_btn2 hex_btn_in2">{m.count}</div>
          </li>
        )
      }
      if(m.key == "institutions"){
        return (
          <li key={m.key}>
            <span className="ml ml-institutions"></span>
            <div className="hex_btn2 hex_btn_in2">{m.count}</div>
          </li>
        )
      }
      if(m.key == "serviceproviders"){
        return (
          <li key={m.key}>
            <span className="ml ml-users"></span>
            <div className="hex_btn2 hex_btn_in2">{m.count}</div>
          </li>
        )
      }
      if(m.key == "companies"){
        return (
          <li key={m.key}>
            <span className="ml ml-company"></span>
            <div className="hex_btn2 hex_btn_in2">{m.count}</div>
          </li>
        )
      }
      if(m.key == "others"){
        return (
          <li key={m.key}>
            <span className="ml ml-moolya-symbol"></span>
            <div className="hex_btn2 hex_btn_in2">{m.count}</div>
          </li>
        )
      }

    });

    return (
      <div className="chapter_map_hover">
        <div className="chapter_map_hover_content">
          {/*<h2>{this.props.allData.text}</h2>*/}
          <ul>
            {mapDataList}
          </ul>
        </div>
      </div>
      );
  }
}
