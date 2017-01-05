import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import MoolyaTabView from  '../header/Tabview'
import MoolyaSearch from  '../header/Search'
export default class MoolyaHeader extends Component {
  constructor(props){
    super(props);
    this.state={
      tabOptions:props.tabOptions
    }
  }

  render(){
    return (
      <div className="admin_header">
        <div className="header_top"> <img className="pull-left home" src="/images/home_icon.png"/> <img className="logo" src="/images/logo.png" /> <img className="pull-right user" src="/images/user.png"/>
        <MoolyaSearch/>
        </div>
        <div className="header_bottom">
          <MoolyaTabView tabOptions={this.props.tabOptions}  linkField="link" nameField="name"/>
        </div>
      </div>

    )
  }
}
