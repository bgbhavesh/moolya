import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

LoginLayout = React.createClass({
  render(){
    return <main>{this.props.content}</main>
  }
})
