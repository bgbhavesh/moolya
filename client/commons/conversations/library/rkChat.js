/**
 * Created by venkatsrinag on 14/8/17.
 */

class Chat{
    constructor(){
    }

    createDirectRoom(rkConversation, payload, callback){
        rkConversation.socketUtils.emitMessage(rkConversation.socket, 'createroom', payload, callback);
    }

    getJoinedRooms(rkConversation, callback){
        rkConversation.socketUtils.emitMessage(rkConversation.socket, 'getjoinedrooms', {}, callback);
    }

    sendMessage(rkConversation, payload, callback){
        // payload.ts = rkConversation.socketUtils.getServerTime();
        rkConversation.socketUtils.emitMessage(rkConversation.socket, 'message', payload, callback);
    }

    listen(rkConversation, callback){
        rkConversation.socketUtils.listenMessage(rkConversation.socket, 'typing', callback);
        rkConversation.socketUtils.listenMessage(rkConversation.socket, 'message', callback);
    }

    getmessageHistory(rkConversation, payload, callback){
        payload.skip = parseInt(rkConversation.utils.getToken('skip')) || 0
        rkConversation.socketUtils.emitMessage(rkConversation.socket, 'getmessage_history', payload || {}, function (response) {
            if(response.skip)
                rkConversation.utils.setToken('skip', response.skip)
            callback(response);
        });
    }
}


var rkChat = new Chat()
Object.freeze(rkChat)
export default rkChat
