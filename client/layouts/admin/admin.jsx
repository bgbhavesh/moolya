import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

AdminLayout = React.createClass({
  render(){
    return <main>{this.props.content}</main>
  }
})


AdminContent = React.createClass({
  render(){
    return (
      <div>
        <AdminHeaderContent/>
        <AdminLeftNavContent/>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
})
