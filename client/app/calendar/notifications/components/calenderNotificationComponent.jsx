import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar'
const FontAwesome = require('react-fontawesome');
import { getNotifications } from '../../../commons/actions/fetchUserDetails';
import mlConversationUtils from '../../../../commons/conversations/utils/mlconversationUtils'

// import CalenderHead from './../calenderHead';
export default class AppMyProfileMyoffice extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { loading: false, notifications: [] };
    this.appNotifications.bind(this);
    this.getsubNotificationIcon = this.getsubNotificationIcon.bind(this);

    return this;
  }
  componentWillMount() {
    getNotifications(this.appNotifications.bind(this))
  }
  componentDidUpdate() {
    const className = this.props.isAdmin ? 'admin_header' : 'app_header'

    const WinWidth = $(window).width();
    const WinHeight = $(window).height();
    $('.main_wrap_scroll').height(WinHeight - ($('.app_header').outerHeight(true) + 70));
    if (WinWidth > 768) {
      $('.main_wrap_scroll').mCustomScrollbar({ theme: 'minimal-dark' });
    }
  }

  getsubNotificationIcon(subNotificationType) {
    // define the notificationTypes and their corresponding classes in their respective arrays, ensure the order
    const notificationTypeArray = ['connectionRequestReceived', 'connectionRequestSent', 'enquiryRequestRecieved', 'reviewRecieved', 'newUserCreation', 'kycApprove', 'kycDecline', 'portfolioUpdate', 'goLiveRequest', 'goLiveRequestApproval', 'goLiveRequestDecline', 'userApproval'];
    const classNames = ['ml my-ml-connection_request_recvd', 'ml my-ml-connection_request_sent', 'ml my-ml-enquiry_request', 'ml my-ml-review_recvd', 'ml my-ml-add_user', 'ml my-ml-kyc_approve', 'ml my-ml-kyc_decline', 'ml my-ml-portfolio_update', 'ml my-ml-go_live_request', 'ml my-ml-go_live_request_approved', 'ml my-ml-go_live_request_declined', 'ml my-ml-approve_user'];
    const index = notificationTypeArray.indexOf(subNotificationType);
    if (index === -1 || !classNames[index]) {
      return 'ml ml-moolya-symbol';
    }
    return classNames[index];
  }
  appNotifications(response) {
    const that = this;
    if (response && response.success) {
      that.setState({ notifications: response.result });
    }
  }
  async onChangeStatus(data, key) {
    const _this = this
    if (!data.isRead) {
      const payload = { _id: data._id, isRead: true };
      mlConversationUtils.ackNotification(payload, function (resp) {
        const context = this;
        if (resp.success) {
          getNotifications(_this.appNotifications.bind(_this))
        }
      });
    }
  }

  render() {
    const { notifications } = this.state;
    const vm = this;
    const that = this;
    function timeConverter(UNIX_timestamp) {
      const a = new Date(UNIX_timestamp * 1000);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const year = a.getFullYear();
      const month = months[a.getMonth()];
      const date = a.getDate();
      const hour = a.getHours();
      const min = a.getMinutes();
      const sec = a.getSeconds();
      const time = `${date} ${month} ${year} ${hour}:${min}:${sec}`;
      return time;
    }
    const notificationAry = notifications && notifications.length ? notifications : [];
    const notificationsList = notificationAry.map((options, key) => (
      <li key={key} onClick={that.onChangeStatus.bind(that, options, key)} className={options.isRead ? 'read' : 'unread'}>
        <div className="left_icon"><span className={vm.getsubNotificationIcon(options.subNotificationType)}></span></div>
        <div className="right_text">
          <p>
            <span>{(options.createdTS) ? timeConverter(options.createdTS) : '7 Sep 2017 21:57:40' }</span>
            <br className="brclear"/>
            {options.message} </p>
          {/* <span className="read_more" title="Read more"><a href="">...</a></span> */}
        </div>
      </li>));
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <h2>Notifications</h2>
          <div className="main_wrap_scroll">

            <ul className="notification_view">
              {notificationsList}
            </ul>

          </div>
        </div>
      </div>
    )
  }
}
