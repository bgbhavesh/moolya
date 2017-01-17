import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import dataComposer from './AdminViewContainer'
import MoolyaAdminView from "../../components/adminview/AdminView";
//const AdminViewComposer = dataComposer(MoolyaAdminView);
export default class MoolyaAdminViewComponent extends Component {
constructor(props) {
  super(props);
  this.state = {
    viewMode:true,
    nameField:props.nameField,
    statusField:props.statusField,
    imageLink:props.imageLink,
    clusterListOptions:props.clusterListOptions,
    footerOptions:props.footerOptions,
    routerPath:props.routerPath,
    imagePath:props.imagePath,
    listRouterPath:props.listRouterPath
  }
  this.viewModeChange.bind(this);
}

  viewModeChange(mode){
    this.setState({'viewMode':mode});
  }


render() {
  let config=this.props;
  return (
    <MoolyaAdminView {...config} footerOptions={this.state.footerOptions} routerPath={this.state.routerPath} imagePath={this.state.imagePath} viewMode={this.state.viewMode} nameField={this.state.nameField} statusField={this.state.statusField}  imageLink={this.state.imageLink} clusterListOptions={this.state.clusterListOptions} onViewModeChange={this.viewModeChange.bind(this)} />
  );
}
}



