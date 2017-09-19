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
    console.log('login attempt server')
    // var checkData = await this.testApi()
    // console.log('............', checkData)
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
      this.setApiKey(ret.result.apiKey)
    }
    return ret;
  }

  async createUser(moolyaUser, cb){
    var user = {
      _id:moolyaUser.userId,
      username:moolyaUser.userName,
      email:moolyaUser.userName,
    }
    var ret = await this.sendRequest('/createUser', user, 'post');
    if(ret.success){
      cb(ret)
    }
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

  // Push Notifications to conversations server Notification types are email, sms, push
  async sendNotifications(notification){
    var ret = await this.sendRequest('/createNotification', notification, 'post');
    return ret;
  }

  async createNotifications(notification){
    var ret = await this.sendRequest('/createNotification', notification, 'post');
    return ret;
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
    console.log('final result', result)
    return result;
  }

/*  async testApi(){
    var options = {
      url: "https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJKxSwWSZgAUgR0tWM0zAkZBc&key=AIzaSyC53qhhXAmPOsxc34WManoorp7SVN_Qezo"
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
  }*/
}

const mlConversationsRepo = new ConversationsRepo();
export default mlConversationsRepo;
