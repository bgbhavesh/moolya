/**
 * Created by vishwadeep on 23/8/17.
 */
import React, {Component} from "react";
import {render} from "react-dom";
var FontAwesome = require('react-fontawesome');
import  PopOverAction from '../../../../commons/components/popover/PopOverAction';
import MlAppNotifications from './MlAppNotifications'

export default class MlAppNotificationsConfig extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {loading: false, data: {}, notifications: []}
    this.notificationHandler.bind(this);
    return this;
  }

  notificationHandler(actionConfig, handlerCallback) {
    if (handlerCallback) {
      handlerCallback({data: {'msg': 'yippe its working man'}});
    }
  }

  render() {
    let notificationPopOverConfig = {
      popOverTitle: 'Notifications',
      popOverFooter: 'test',
      placement: 'bottom',
      popoverClassName:'notifications_list',
      target: 'appNotification',
      popOverComponent: <MlAppNotifications />,
      actionComponent: function (props) {
        return <a onClick={props.onClickHandler} id="appNotification" className="pull-right notification ripple">
          <div className="noti_count">{1}</div>
          {/*<FontAwesome name='bell-o'/>*/}
          < i className="ml my-ml-notifications"></i>
        </a>;
      },
      handler: this.notificationHandler.bind(this),
    };

    return <PopOverAction {...notificationPopOverConfig}/>;
  }
}
