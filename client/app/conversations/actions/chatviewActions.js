/**
 * Created by venkatsrinag on 8/31/17.
 */
import mlConversationUtils from '../../../commons/conversations/utils/mlconversationUtils'

export function getJoinedRooms(cb)
{
  mlConversationUtils.getJoinedRooms(function (response) {
    if(cb)
      cb(response)
  })
}

export function getUserDetails(cb)
{
  mlConversationUtils.getUserDetails(function (response) {
    if(cb)
      cb(response)
  })
}

export function emitMessage(message, cb)
{
  mlConversationUtils.emitMessage(message, function (response) {
    if(cb)
      cb(response)
  })
}



export function listenMessage(cb)
{
  mlConversationUtils.listenEvents(function (eventName, response) {
    if(cb)
      cb(response)
  })
}


export function getMessageHistory(roomId, cb)
{
  mlConversationUtils.getMessageHistory({rid:roomId}, function (response) {
    if(cb)
      cb(response)
  })
}


