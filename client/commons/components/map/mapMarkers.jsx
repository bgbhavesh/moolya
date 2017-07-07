import React, {Component, PropTypes} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import controllable from 'react-controllables';
import {getAdminUserContext} from '../../../commons/getAdminUserContext'

import _ from 'lodash';

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
    this.state = {loading: true, data: {}, isHover: false};
    this.markerClickHandler.bind(this);
    this.onMouseEnterHandlerCallback.bind(this);
  }

  onMouseEnterHandlerCallback(data){
   this.setState({loading: false, data: data});
  };

  onMouseEnterContent(customHoverHandler) {
    this.setState({isHover: true});
    let resp=[];
    if(customHoverHandler){
      customHoverHandler(this.props,this.onMouseEnterHandlerCallback.bind(this));
    }
      return resp;
  }

  onMouseLeaveContent() {
    this.setState({isHover: false});
  }

  markerClickHandler(data)
  {
    // console.log(data);
    if(data.module == 'cluster')
      FlowRouter.go('/admin/dashboard/'+data.markerId+'/chapters?viewMode=true');
    if(data.module == 'chapter')
    {
      if(this.props.params)
      {
        if(this.props.params.clusterId)
          FlowRouter.go('/admin/dashboard/'+this.props.params.clusterId+'/'+data.markerId+'/subChapters?viewMode=true');
      }
      else
      {
        let loggedInUser = getAdminUserContext();
        FlowRouter.go('/admin/dashboard/'+loggedInUser.clusterId+'/'+data.markerId+'/subChapters?viewMode=true');
      }
    }

    if(data.module == 'subChapter')
      FlowRouter.go('/admin/dashboard/'+this.props.params.clusterId+'/'+this.props.params.chapterId+'/'+data.markerId+'/communities?viewMode=true');
  }

  /*async findModuleDetails() {
    let json = {
      moduleName: this.props.module,
      id: this.props.markerId
    }
    const response = await findMapDetailsTypeActionHandler(json);
    this.setState({loading: false, data: response});
    return response;
  }*/

  render() {
    const style = this.props.hover ? mapMarkerStyleHover : mapMarkerStyle;

    let actionConfig = this.props.actionConfiguration|| [];
    let hoverInConfig = _.find(actionConfig, {actionName: 'onMouseEnter'});
    let hoverActionHandler=hoverInConfig&&hoverInConfig.handler?hoverInConfig.handler:null;
    let hoverComp = hoverInConfig&&hoverInConfig.hoverComponent?hoverInConfig.hoverComponent:"";
    let data = this.state.data && this.state.data ? this.state.data : [];
    let HoverComponent = React.cloneElement(hoverComp, {data: data});

    let status = "";
    if(this.props.status && (this.props.status.code == 100)){
      status = "tobeassign"
    }
    if(this.props.status && (this.props.status.code == 101)){
      status = "workinprogress"
    }
    if(this.props.status && (this.props.status.code == 110)){
      status = "inactive"
    }
    if(this.props.status && (this.props.status.code == 111)){
      status = "active"
    }
    // console.log(this.props.flag);
    // console.log(this.props.text);
    return (
      <div>{this.props.status?
        <div style={{'width': '200px'}} className={`cluster_map ${status}`} id={this.props.markerId}
                          onMouseOver={this.onMouseEnterContent.bind(this,hoverActionHandler)} onMouseOut={this.onMouseLeaveContent.bind(this)}
                          onClick={this.markerClickHandler.bind(this, this.props)}>
          <div className="hex_btn hex_btn_in">
            <span>
              {this.props.showImage && this.props.showImage===true?<img src={this.props.text}/>:<b>{this.props.text}</b>}</span>
            <div className="indec"></div>
          </div>
          {/*{this.state.isHover ? (<div><MapDetails data={this.state.data}/></div>) : ""}*/}
          {this.state.isHover ? (<div>{HoverComponent}</div>) : ""}
        </div>
        :
        <div style={{'width': '200px'}} className={`cluster_map ${this.props.isActive?"active":"inactive"}`} id={this.props.markerId}
                          onMouseOver={this.onMouseEnterContent.bind(this,hoverActionHandler)} onMouseOut={this.onMouseLeaveContent.bind(this)}
                          onClick={this.markerClickHandler.bind(this, this.props)}>
        <div className="hex_btn hex_btn_in">
          <span>
           {this.props.showImage && this.props.showImage===true?<img src={this.props.text}/>:<b>{this.props.text}</b>}</span>
          <div className="indec"></div>
        </div>
        {/*{this.state.isHover ? (<div><MapDetails data={this.state.data}/></div>) : ""}*/}
        {this.state.isHover ? (<div>{HoverComponent}</div>) : ""}
      </div>
      }</div>
    );
  }
}
MapMarkers.propTypes = {
  text: PropTypes.string
}
MapMarkers.defaultProps = {};
MapMarkers.shouldComponentUpdate = shouldPureComponentUpdate;

