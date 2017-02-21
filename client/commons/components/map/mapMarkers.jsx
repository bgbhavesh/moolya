import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import controllable from 'react-controllables';

const K_SIZE = 40;

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

  constructor(props){
    super(props);
    console.log(this.props);
    this.markerClickHandler.bind(this);
  }

  info(){
    $(".isDisplay").show();
    $(".hoverContent").hide();
  }

  onMouseEnterContent(){
    if(!$(".isDisplay").is(':visible')){
      $(".hoverContent").show();
    }

  }

  onMouseLeaveContent(){
    $(".isDisplay").hide();
  }

  markerClickHandler(data){
    alert(data.text);
    //this.actionHandler(data);
    //Action Handler Gives the data.
    //Use session to show and hide the Tab
  }

  render() {
    const style = this.props.hover ? mapMarkerStyleHover : mapMarkerStyle;
    return (
      <div className="map_view_block" id={this.props.markerId} onClick={this.markerClickHandler.bind(this,this.props)}>
        <div className="cluster_map inactive" style={{'top': '30%', 'left': '35%'}}>
          <div className="hex_btn hex_btn_in">
            <span><img src="/images/hover_image.png" /><b>{this.props.text}</b></span>
            <div className="indec"></div>
          </div>
        </div>

        <div className="chapter_map_hover" style={{'top': '40%', 'left': '30%','display':'none'}}>
          <div className="chapter_map_hover_content">
            <h2>USA</h2>
            <ul>
              <li>
                <img src="/images/hover_image.png" />
                <div className="hex_btn2 hex_btn_in2">123</div>
              </li>
              <li>
                <img src="/images/hover_image.png" />
                <div className="hex_btn2 hex_btn_in2">123</div>
              </li>
              <li>
                <img src="/images/hover_image.png" />
                <div className="hex_btn2 hex_btn_in2">123</div>
              </li>
              <li>
                <img src="/images/hover_image.png" />
                <div className="hex_btn2 hex_btn_in2">123</div>
              </li>
              <li>
                <img src="/images/hover_image.png" />
                <div className="hex_btn2 hex_btn_in2">123</div>
              </li>
              <li>
                <img src="/images/hover_image.png" />
                <div className="hex_btn2 hex_btn_in2">123</div>
              </li>
              <li>
                <img src="/images/hover_image.png" />
                <div className="hex_btn2 hex_btn_in2">123</div>
              </li>
              <li>
                <img src="/images/hover_image.png" />
                <div className="hex_btn2 hex_btn_in2">123</div>
              </li>
            </ul>
          </div>
        </div>


      </div>

      // <div className="hint hint--html hint--info hint--top" style={style} onClick={this.info} onMouseEnter={this.onMouseEnterContent}
      //      onMouseLeave={this.onMouseLeaveContent}>
      //   <div>{this.props.text}</div>
      //   <div style={{width: 80}} className="hoverContent hint__content">{this.props.text}</div>
      //
      //   <div className="isDisplay hint__content">
      //     {this.props.desc}
      //   </div>
      // </div>
    );
  }
}
MapMarkers.propTypes = {
  text: PropTypes.string
}
MapMarkers.defaultProps = {};
MapMarkers.shouldComponentUpdate = shouldPureComponentUpdate;
