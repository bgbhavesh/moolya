import {render} from 'react-dom';
import React, {Component, PropTypes} from 'react';

export default class MapDetails extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const mapData = this.props.data && this.props.data.length > 0 ? this.props.data : [];

    const mapDataList = mapData.map(function (m) {
      return (
        <li key={m.key}>
            <span className={m.icon}></span>
           <span className="count">{m.count}</span>
        </li>
      )
    });

    return (
      <div className="chapter_map_hover">
        <div className="chapter_map_hover_content">
          {/*<h2>{this.props.allData.text}</h2>*/}
          <ul>
            {mapDataList}
          </ul>
        </div>
      </div>);
  }
}
