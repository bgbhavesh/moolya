/**
 * Created by vishwadeep on 23/8/17.
 */
import React, { Component } from 'react';
import { getNotifications } from '../../actions/fetchUserDetails';
import { getNotificationsCounter } from '../../actions/fetchUserDetails';

const FontAwesome = require('react-fontawesome');
import PopOverAction from '../../../../commons/components/popover/PopOverAction';
import MlAppNotifications from './MlAppNotifications'

export default class MlAppNotificationsConfig extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: false, data: {}, notifications: [], UnreadCount: 0
    };
    this.appNotifications.bind(this);
    this.appNotificationsCounter.bind(this);

    this.UpdateNotifications.bind(this);
    this.notificationHandler.bind(this);
    this.utilityfunction.bind(this);

    return this;
  }

  notificationHandler(actionConfig, handlerCallback) {
    const that = this;
    if (handlerCallback) {
      // mlConversationUtils.ackNotification(this.UpdateNotifications.bind(this));
      handlerCallback({ data: { msg: 'yippe its working man' } });
    }
  }

  componentWillMount() {
    getNotifications(this.appNotifications.bind(this))
    getNotificationsCounter(this.appNotificationsCounter.bind(this))
  }

  UpdateNotifications(response) {
    console.log('------Ack data is----------', response);
    const that = this;
    if (response && response.success) {
      that.setState({ notifications: response.result });
    }
  }

  appNotificationsCounter(response, counterValue) {
    this.setState({ UnreadCount: counterValue });
  }

  appNotifications(response) {
    const that = this;
    if (response && response.success) {
      that.setState({ notifications: response.result });
      const unreadNotificationss = response.result.filter(that.utilityfunction);
      that.setState({ UnreadCount: unreadNotificationss.length });
    }
    // console.log('-------notifications data is---------',response);
  }

  utilityfunction(notify) {
    return notify.isRead == false;
  }
  render() {
    const vm = this;
    const { notifications } = this.state;
    const notificationAry = notifications && notifications.length ? notifications : [];
    function returnUnread(notify) {
      return notify.isRead == false;
    }
    const unreadNotifications = notificationAry.filter(returnUnread);
    const UnreadCount = unreadNotifications.length;
    const notificationPopOverConfig = {
      popOverTitle: 'Notifications',
      popOverFooter: 'test',
      placement: 'bottom',
      popoverClassName: 'notifications_list',
      target: 'appNotification',
      popOverComponent: <MlAppNotifications />,
      actionComponent(props) {
        return <a onClick={props.onClickHandler} id="appNotification" className="pull-right notification ripple">
          <div className="noti_count">{vm.state.UnreadCount}</div>
          {/* <FontAwesome name='bell-o'/> */}
          < i className="ml my-ml-notifications"></i>
        </a>;
      },
      handler: this.notificationHandler.bind(this)
    };

    return <PopOverAction {...notificationPopOverConfig}/>;
  }
}
