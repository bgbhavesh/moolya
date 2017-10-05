import React, {Component, PropTypes} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import _ from 'lodash';

import {render} from 'react-dom';

export default class MlAppMapMarker extends Component {
  constructor(props) {
    super(props);
  }

  markerClickActionHandler(){
    this.props.markerClickActionHandler(this.props.data)
  }

  render() {
    let status = "";
    if(this.props.text == "IDE"){
      status = "id"
    }
    if(this.props.text == "FUN"){
      status = "fu"
    }
    if(this.props.text == "CMP"){
      status = "co"
    }
    if(this.props.text == "STU"){
      status = "st"
    }
    if(this.props.text == "SPS"){
      status = "pr"
    }
    if(this.props.text == "INS"){
      status = "in"
    }
    return (
      <div>
        <div className="map_profiles" onClick={this.markerClickActionHandler.bind(this, this.props)} id={this.props.markerId}>
          <span className={`ml ${status}`}></span>
          <img src={`${this.props.status&&this.props.status.profileImage?this.props.status.profileImage:"/images/def_profile.png"}`}/>
        </div>
      </div>
    );
  }
}
MlAppMapMarker.propTypes = {
  text: PropTypes.string
}
MlAppMapMarker.defaultProps = {};
MlAppMapMarker.shouldComponentUpdate = shouldPureComponentUpdate;

