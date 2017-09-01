/**
 * Created by venkatsrinag on 8/21/17.
 */

import rkChat from  '../library/rkChat'
import rkConversations from '../library/rkConversations'
import rkNotifications from '../library/rkNotifications'
import {loginHandler} from  './mlConversationLoginQuery'

const url = "http://localhost:8081"

class ConversationUtils{
  constructor(){
  }


  async login(){
      var response = await loginHandler('conversationlogin');
      if(response.success){
        rkConversations.init();
        rkConversations.utils.setAuthToken(response.authToken);
      }
  }

  init(){
    rkConversations.init();
    rkConversations.connect(url)
  }

  disconnect(){
    rkConversations.disconnect();
  }

  getUserDetails(cb){
    rkConversations.getUserDetails(cb)
  }

  getUnreadNotifications(callback){
    rkNotifications.getNotifications(rkConversations, callback)
  }

  getNotifications(callback){
    rkNotifications.listenForNotifications(rkConversations, callback)
  }

  updateNotification(data, callback){
    rkNotifications.updateNotification(rkConversations, data, callback)
  }

  getJoinedRooms(callback){
    rkChat.getJoinedRooms(rkConversations, callback)
  }

  listenMessage(callback){
    rkChat.listenMessage(rkConversations, function (payLoad) {
      callback(payLoad)
    })
  }

  emitMessage(message, callback){
    rkChat.sendMessage(rkConversations, message, callback)
  }

  listenEvents(cb){
    rkChat.listen(rkConversations, function (eventName, response) {
      console.log(response)
      cb(eventName, response)
    })
  }

  getMessageHistory(payload, cb){
    rkChat.getmessageHistory(rkConversations, payload, function (response) {
        if(cb)
          cb(response)
    })
  }
}

var mlConversationUtils = new ConversationUtils()
export default mlConversationUtils;

