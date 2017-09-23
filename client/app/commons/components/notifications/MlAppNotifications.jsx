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
    this.getsubNotificationIcon = this.getsubNotificationIcon.bind(this);

  }

  componentWillMount() {
    getNotifications(this.appNotifications.bind(this))
  }

  appNotifications(response) {
    var that = this
    if (response && response.success) {
      that.setState({notifications: response.result})
    }
    // console.log('-------notifications data is---------',response)
  }


  getsubNotificationIcon(subNotificationType) {

    //define the notificationTypes and their corresponding classes in their respective arrays, ensure the order

    const notificationTypeArray = ['connectionRequestReceived','connectionRequestSent','enquiryRequestRecieved','reviewRecieved','newUserCreation','kycApprove','kycDecline','portfolioUpdate','goLiveRequest','goLiveRequestApproval','goLiveRequestDecline','userApproval'];
    const classNames = ['ml flaticon-ml-handshake','ml flaticon-ml-handshake','ml flaticon-ml-support','ml flaticon-ml-note'];
    const index = notificationTypeArray.indexOf(subNotificationType);
    if(index === -1 || !classNames[index]){
      return 'ml ml-moolya-symbol';
    }
    return classNames[index];
  }

  render() {
    var vm = this;
    const {notifications} = this.state;
    var notificationAry = notifications && notifications.length ? notifications : []
    var notificationsList = notificationAry.map(function (options, key) {
      return (
        <li key={key}>
          <a href="/app/calendar/notification"><span className={vm.getsubNotificationIcon(options.subNotificationType)}/>{options.message}</a>
        </li>)
    });

    return <div className="ml_app_notification"> <ul className="unstyled">{notificationsList}</ul></div>
  }
}
