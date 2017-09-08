/**
 * Created by vishwadeep on 23/8/17.
 */
import React, {Component} from "react";
import {render} from "react-dom";
import {getNotifications} from "../../actions/fetchUserDetails";

export default class MlAppNotifications extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {loading: false, notifications: []};
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
    console.log('-------notifications data is---------',response)
  }

  render() {
    const {notifications} = this.state;
    var notificationAry = notifications && notifications.length ? notifications : []
    var notificationsList = notificationAry.map(function (options, key) {
      return (
        <li key={key}>
          <a href="/app/calendar/notification"><span className="ml ml-moolya-symbol"/>{options.message}</a>
        </li>)
    });

    return <div className="ml_app_notification"> <ul className="unstyled">{notificationsList}</ul></div>
  }
}
