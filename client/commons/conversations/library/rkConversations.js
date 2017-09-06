/**
 * Created by venkatsrinag on 5/8/17.
 */

import io from 'socket.io-client'
import kinda_ntp from 'socket-kinda-ntp/client/socket-kinda-ntp'

class Conversations{
    constructor(){
        this.socket       = null;
        this.utils 		    = null;
        this.socketUtils  = null;
    }

    init(){
        this.utils 		 = new __Utils();
        this.socketUtils = new __SocketUtils();
    }

    connect(url){
        var token = this.utils.getAuthToken();
        if(token && !this.socket){
          this.socket = this.socketUtils.connect(url, token)
        }
    }

    disconnect(){
      this.utils.removeToken();
      this.socket = this.socketUtils.disconnect(this.socket);
    }

    getUserDetails(cb){
      var token = this.utils.getAuthToken();
      if(token){
        this.socketUtils.emitMessage(this.socket, 'user_details', {}, function (response) {
          if(cb)
            cb(response)
        })
      }
    }
}

class __Utils{
    constructor(){
    }

    setAuthToken(token){
        localStorage.setItem('auth_token', token)
    }

    setToken(key, token){
      localStorage.setItem(key, token)
    }

    getAuthToken(){
        return localStorage.getItem('auth_token')
    }

    getToken(key){
      return localStorage.getItem(key)
    }


    removeToken(){
      localStorage.clear();
    }
}

class __SocketUtils{
    constructor(){
    }

    connect(url, token){
        var socket = io(url, {query:{'x-access-token':token}}, {'forceNew': true}, {'sync disconnect on unload' : true}, {'secure': true}, {'reconnection':true})
        // kinda_ntp.init(socket);
        return socket;
    }

    emitMessage(socket, eventName, payload, ackCallback){
      if(socket) {
        socket.emit(eventName, payload, function (response) {
          if (ackCallback)
            ackCallback(response)
        });
      }
    }

    listenMessage(socket, eventName, respCallback){
      if(socket){
        socket.on(eventName, function (response) {
          if(respCallback)
            respCallback(eventName, response)
        })
      }
    }

    disconnect(socket){
      if(socket) {
        socket.disconnect();
        socket = null;
      }

      return null
    }

    // getServerTime(){
    //     return Math.round(kinda_ntp.time())
    // }
}

var rkConversations = new Conversations();
export default rkConversations;
