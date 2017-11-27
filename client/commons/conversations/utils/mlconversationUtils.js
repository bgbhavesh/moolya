/**
 * Created by venkatsrinag on 8/21/17.
 */

import rkConversations from '../library/rkConversations'
import rkNotifications from '../library/rkNotifications'
import { loginHandler } from './mlConversationLoginQuery'
// const url = "http://localhost:8081/"
// const url = "https://qarkc.moolya.global/";
const url = `${Meteor.settings.public.conversationsBaseURL}/`;


class ConversationUtils {
  constructor() {
  }

  login() {
    loginHandler('conversationlogin', (response) => {
      if (response.success) {
        rkConversations.init();
        rkConversations.utils.setToken(response.authToken);
      }
    });
  }

  init() {
    rkConversations.init();
    rkConversations.connect(url)
  }

  getUnreadNotifications(callback) {
    rkNotifications.getNotifications(rkConversations, callback)
  }

  getNotifications(callback) {
    rkNotifications.listenForNotifications(rkConversations, callback)
  }

  getNotificationsCounter(callback) {
    rkNotifications.listenForNotificationsCounter(rkConversations, callback)
  }

  ackNotification(payload, callback) {
    rkNotifications.updateNotification(rkConversations, payload, callback)
  }
}

const mlConversationUtils = new ConversationUtils();
export default mlConversationUtils;

