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
      return ( <li key={m.key}> <img src="/images/hover_image.png" /><div className="hex_btn2 hex_btn_in2">{m.count}</div></li>)
    });

    return (<div>
      <div className="chapter_map_hover">
        <div className="chapter_map_hover_content">
          {/*<h2>{this.props.allData.text}</h2>*/}
          <ul>
            {mapDataList}
          </ul>
        </div>
      </div>
      </div>);
  }
}
