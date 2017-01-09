import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import dataComposer from './AdminViewContainer'
import MoolyaAdminView from "../../components/adminview/AdminView";
//const AdminViewComposer = dataComposer(MoolyaAdminView);
export default class MoolyaAdminViewContainer extends Component {
constructor(props) {
  super(props);
  this.state = {
    viewMode:true
  }
  this.viewModeChange.bind(this);
}

  viewModeChange(mode){
    this.setState({'viewMode':mode});
  }


render() {
  let config=this.props;
  return (
    <MoolyaAdminView {...config}  viewMode={this.state.viewMode} onViewModeChange={this.viewModeChange.bind(this)}/>
  );
}
}



