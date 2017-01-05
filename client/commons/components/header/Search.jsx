import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

export default class MoolyaSearch extends Component {
  render(){
    return (
      <div>
        <input type="text" className="form-control pull-right"   />

      </div>
    )
  }
}
