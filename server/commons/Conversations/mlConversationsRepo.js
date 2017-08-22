/**
 * Created by venkatsrinag on 8/21/17.
 */

import request from 'request'

class ConversationsRepo{
  constructor(){
  }

  async login(context, cb)
  {
    var authRequest = {userId:context.userId}
    var ret = await this.sendRequest('/login', authRequest, 'post');
    cb(ret);
  }
  // subscribe to conversations
  async createApplication(){
    var doc = MlConversations.find().fetch();
    if(doc.length > 0)
      return;

    var body = {appName:"moolya"}
    var ret = await this.sendRequest('/createApplication', body, 'post', true);
    console.log(ret)
    if(ret.success){
      MlConversations.insert(ret.result.apiKey)
    }
    return ret;
  }

  async createUser(moolyaUser){
    var user = {
      _id:moolyaUser.userId,
      username:moolyaUser.userName,
      email:moolyaUser.userName,
    }
    var ret = await this.sendRequest('/createUser', user, 'post');
    return ret;
  }

  // save api key into mlconversations collection
  setApiKey(apiKey){
    MlConversations.insert({apiKey:apiKey, isActive:true})
  }

  // reterieve api key from mlConversations collection
  getApiKey(){
    var apiKey = null;
    var result = MlConversations.find().fetch();
    if(result.length > 0)
      apiKey = result[0].apiKey;

    return apiKey;
  }

  sendNotifications(){
    // Push Notifications to conversations server Notification types are email, sms, push
  }

  async sendRequest(endPoint, payload, method, isApplication){
    var options = {
      url: Meteor.settings.private.conversationsBaseURL+endPoint,
      body:payload,
      method: method,
      json: true
    }

    if(!isApplication){
      var apiKey = this.getApiKey();
      if(!apiKey)
        return {success:false}
      options['headers'] = {
        'x-api-key': apiKey
      }
    }

    const result = await new Promise(function (resolve, reject) {
      request(options, function (err, res, body) {
        if(err){
          reject(err)
        }
        else{
          resolve(body)
        }
      })
    })

    return result;
  }
}

const mlConversationsRepo = new ConversationsRepo();
export default mlConversationsRepo;
