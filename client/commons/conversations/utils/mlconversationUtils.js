/**
 * Created by venkatsrinag on 8/21/17.
 */

import rkConversations from '../library/rkConversations'
import rkNotifications from '../library/rkNotifications'
import {loginHandler} from  './mlConversationLoginQuery'
const url = "http://localhost:8081/"

class ConversationUtils{
  constructor(){
  }

  async login(){
      var response = await loginHandler('conversationlogin');
      if(response.success){
        rkConversations.init();
        rkConversations.utils.setToken(response.authToken);
      }
  }

  init(){
    rkConversations.init();
    rkConversations.connect(url)
  }

  // connect(){
  //   rkConversations.connect(url)
  // }

  getUnreadNotifications(callback){
    rkNotifications.getNotifications(rkConversations, callback)
  }

  getNotifications(callback){
    rkNotifications.listenForNotifications(rkConversations, callback)
  }
}

var mlConversationUtils = new ConversationUtils()
export default mlConversationUtils;
