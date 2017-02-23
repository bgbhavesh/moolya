import {render} from 'react-dom';
import React, {Component, PropTypes} from 'react';
import {findMapDetailsTypeActionHandler} from './findMapDetailsTypeAction'

export default class MapDetails extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {loading:true,data:{}};
    this.findModuleDetails.bind(this);
  }

  componentWillMount() {
    const resp = this.findModuleDetails();
    return resp;
  }

  async findModuleDetails() {
    let json = {
      moduleName: this.props.allData.module,
      id: this.props.allData.markerId
    }
    const response = await findMapDetailsTypeActionHandler(json);
    this.setState({loading:false,data:response});
    // console.log(this.state);
  }

  render() {
    const mapData=this.state.data&&this.state.data.length>0?this.state.data:[];

    const mapDataList=mapData.map(function(m) {
      return ( <li key={m.key}> <img src="/images/hover_image.png" /><div className="hex_btn2 hex_btn_in2">{m.count}</div></li>)
    });

    return (<div>
      <div className="chapter_map_hover">
        <div className="chapter_map_hover_content">
          <h2>{this.props.allData.text}</h2>
          <ul>
            {mapDataList}
          </ul>
        </div>
      </div>
      </div>);
  }
}
