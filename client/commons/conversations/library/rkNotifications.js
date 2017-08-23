/**
 * Created by venkatsrinag on 7/8/17.
 */
class Notifications{
    constructor(){
    }

    getNotifications(rkConversation, callback){
        rkConversation.socketUtils.emitMessage(rkConversation.socket, 'get_notification', {}, callback);
    }

    listenForNotifications(rkConversation, callback){
        rkConversation.socketUtils.listenMessage(rkConversation.socket, 'get_notification', callback);
    }

    updateNotification(rkConversation, data, callback){
      rkConversation.socketUtils.emitMessage(rkConversation.socket, 'ack_notification', data, callback);
    }
}

var rkNotifications = new Notifications()
Object.freeze(rkNotifications)
export default rkNotifications
