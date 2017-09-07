import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
var FontAwesome = require('react-fontawesome');
import {getNotifications} from "../../../commons/actions/fetchUserDetails";

// import CalenderHead from './../calenderHead';
export default class AppMyProfileMyoffice extends React.Component{

  constructor(props, context) {
    super(props, context);
    this.state = {loading: false, notifications: []}
    this.appNotifications.bind(this);
    return this;
  }
  componentWillMount() {
    getNotifications(this.appNotifications.bind(this))
  }
  appNotifications(response) {
    var that = this
    if (response && response.success) {
      that.setState({notifications: response.result})
    }
    console.log(response+'asdfasddfasdsf')
  }

  render(){
    const {notifications} = this.state;
    var notificationAry = notifications && notifications.length ? notifications : []
    var notificationsList = notificationAry.map(function (options, key) {
      return (
        <li key={key}>
          <div className="left_icon"><span className="ml ml-moolya-symbol"></span></div>
          <div className="right_text">
            <span>27/06/2017 - 08:08:08</span>
            <p>
              {options.message} </p>
            <span className="read_more" title="Read more"><a href="#">...</a></span>
          </div>
        </li>);
    })
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <ul className="notification_view">
            {notificationsList}
          </ul>

        </div>
      </div>
    )
  }
};
