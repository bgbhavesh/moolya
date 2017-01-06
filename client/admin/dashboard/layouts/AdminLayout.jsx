import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

export default class AdminLayout extends Component {
  render(){
    return (
      <div>
        <div className="moolya_admin">
          {this.props.adminHeader}
          {this.props.adminLeftNav}
          {this.props.adminView}
        </div>
      </div>
    )
  }
}
