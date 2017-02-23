import React, {Component, PropTypes} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import controllable from 'react-controllables';
import MapDetails from './mapDetails'
import {render} from 'react-dom';

const K_SIZE = 80;

const mapMarkerStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates

  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  border: '5px solid #f44336',
  borderRadius: K_SIZE,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer'
};

const mapMarkerStyleHover = {
  ...mapMarkerStyle,
  border: '5px solid #3f51b5',
  color: '#f44336'
};

export default class MapMarkers extends Component {
  constructor(props) {
    super(props);
    this.state = {data: {}, isClick: false};
    this.markerClickHandler.bind(this);
  }

  info() {
    $(".isDisplay").show();
    $(".hoverContent").hide();
  }

  onMouseEnterContent() {
    this.setState({isHover: true});
    // if(!$(".isDisplay").is(':visible')){
    //   $(".hoverContent").show();
    // }
  }

  onMouseLeaveContent() {
    this.setState({isHover: false});
    // $(".isDisplay").hide();
  }

  markerClickHandler(data) {
    alert(data.text);
    console.log(data);
    // this.setState({isHover: true});
    //this.actionHandler(data);
    //Action Handler Gives the data.
    //Use session to show and hide the Tab
  }

  render() {
    const style = this.props.hover ? mapMarkerStyleHover : mapMarkerStyle;
    return (

      <div style={{'width': '200px'}} className="cluster_map inactive" id={this.props.markerId}
           onMouseEnter={this.onMouseEnterContent.bind(this)} onMouseLeave={this.onMouseLeaveContent.bind(this)}
           onClick={this.markerClickHandler.bind(this, this.props)}>
        <div className="hex_btn hex_btn_in">
          <span><img src="/images/hover_image.png"/><b>{this.props.text}</b></span>
          <div className="indec"></div>
        </div>
        {this.state.isHover ? (<div><MapDetails allData={this.props}/></div>) : ""}

      </div>
    );
  }
}
MapMarkers.propTypes = {
  text: PropTypes.string
}
MapMarkers.defaultProps = {};
MapMarkers.shouldComponentUpdate = shouldPureComponentUpdate;

