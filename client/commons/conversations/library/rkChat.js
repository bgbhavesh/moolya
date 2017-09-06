/**
 * Created by venkatsrinag on 14/8/17.
 */

class Chat{
    constructor(){
    }

    createDirectRoom(rkConversation, payload, callback){
        rkConversation.socketUtils.emitMessage(rkConversation.socket, 'createroom', payload, callback);
    }

    createPrivateRoom(rkConversation, payload, callback){
        payload['type'] = 'P'
        rkConversation.socketUtils.emitMessage(rkConversation.socket, 'createroom', payload, callback);
    }

    addMemberstoRoom(rkConversation, payload, callback){
        rkConversation.socketUtils.emitMessage(rkConversation.socket, 'addtoroom', payload, callback)
    }

    joinMemberstoRoom(rkConversation, payload, callback){
        rkConversation.socketUtils.emitMessage(rkConversation.socket, 'jointoroom', payload, callback)
    }

    getJoinedRooms(rkConversation, callback){
        rkConversation.socketUtils.emitMessage(rkConversation.socket, 'getjoinedrooms', {}, callback);
    }

    sendMessage(rkConversation, payload, callback){
        payload.ts = rkConversation.socketUtils.getServerTime();
        rkConversation.socketUtils.emitMessage(rkConversation.socket, 'message', payload, callback);
    }

    listen(rkConversation, callback){
        rkConversation.socketUtils.listenMessage(rkConversation.socket, 'typing', callback);
        rkConversation.socketUtils.listenMessage(rkConversation.socket, 'message', callback);
    }

    getmessageHistory(rkConversation, payload, callback){
        rkConversation.socketUtils.emitMessage(rkConversation.socket, 'getmessage_history', payload || {}, function (response) {
            callback(response);
        });
    }
}


var rkChat = new Chat()
Object.freeze(rkChat)
export default rkChat
