/**
 * Created by venkatsrinag on 6/5/17.
 */
import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import _ from 'lodash'
import mlInteractionService from '../mlInteractionRepoService';

/*STATUS
 0 - Pending
 1 - Accepted
 2 - Declined
 3 - Blocked*/
var generateConnectionCode=function(u1,u2){
  var connectionCode=u1+u2;
  if(u1>u2)connectionCode=u2+u1;
  if(u1===u2)connectionCode=null;
  return connectionCode;
}

MlResolver.MlQueryResolver['fetchConnections'] = (obj, args, context, info) => {
  let userConnections = [];
  if (context && context.userId) {
    //todo: pagination based result
    let connections = mlDBController.find('MlConnections',{"users.userId": {"$in": [context.userId]},isAccepted:true}).fetch();
    _.each(connections, function (connection) {
      _.remove(connection.users, {userId: context.userId});
      let toUser = connection.users[0];
      let conn = {
        _id: connection._id,
        toUser: connection.users[0],
        requestedFrom: connection.requestedFrom,
        createdBy: connection.createdBy,
        updatedBy: connection.updatedBy,
        isAccepted: connection.isAccepted,
        isDenied: connection.isDenied,
        resendCount: connection.resendCount
      }

      userConnections.push(conn);
    })
  }

  return userConnections
}

MlResolver.MlQueryResolver['fetchConnection'] = (obj, args, context, info) => {

}

MlResolver.MlMutationResolver['updateConnection'] = (obj, args, context, info) => {
  if (args && args.connection && args.connectionId) {
    let connection = MlConnections.findOne({"_id": args.connectionId})
    if (!connection) {
      let code = 400;
      let response = new MlRespPayload().errorPayload("Invalid Connection", code);
      return response;
    }
    let updateFor = args.connection;
    let fromIndex = _.findIndex(connection.users, {userid: context.userId})
    let toIndex = _.findIndex(connection.users, {userid: updateFor.toUser.userid})

    if (fromIndex > -1 && connection.users[toIndex].userid == updateFor.toUser.userid && connection.users[toIndex].userName == updateFor.toUser.userName) {
      _.mergeWith(connection.users[toIndex], updateFor['toUser'])
      connection.updatedBy = args.connection.updatedBy;
      connection.isAccepted = args.connection.isAccepted;
      connection.isDenied = args.connection.isDenied;
      connection.resendCount = args.connection.resendCount;

      let ret = MlConnections.update({"_id": args.connectionId}, {$set: connection})
      if (ret) {
        let code = 200;
        let response = new MlRespPayload().successPayload("Connection Updated Successfully", code);
        return response;
      }
    }
    let code = 400;
    let response = new MlRespPayload().errorPayload("Invalid Connection", code);
    return response;

  }
}

MlResolver.MlMutationResolver['connectionRequest'] = (obj, args, context, info) => {
  try {
    var users = [];
    var connection = {};
    var resp=null;
    var resourceDetails = mlInteractionService.fetchResourceBasedUserDetails(args.resourceType, args.resourceId, context);
    var fromuser = resourceDetails.contextUser;
    var toUser = resourceDetails.resourceOwner;
    if (!toUser._id || !fromuser._id) {
      let code = 400;
      let response = new MlRespPayload().errorPayload('Invalid User', code);
      return response;
    }
    let isValidFromUser = mlInteractionService.validateExternalUser(fromuser);
    let isValidToUser = mlInteractionService.validateExternalUser(toUser);
    if (!isValidToUser || !isValidFromUser) {
      let code = 400;
      let response = new MlRespPayload().errorPayload('Invalid User', code);
      return response;
    }
    var connectionCode=generateConnectionCode(fromuser._id,toUser._id);
    //todo: index the connectionCode
    let isAlreadyExist = mlDBController.findOne('MlConnections',{'connectionCode':connectionCode},context);
    //if connection request does not exist
    if (!isAlreadyExist) {
      users.push({userId: fromuser._id,userName: fromuser.username,isFavourite: false});
      users.push({userId:toUser._id,userName: toUser.username,isFavourite: false});
      connection = {
        users: users,
        requestedFrom: context.userId,
        connectionCode:connectionCode,
        actionUserId:context.userId,
        createdBy:fromuser.username,createdAt:new Date(),
        isAccepted: false,isDenied: false,
        isBlocked:false,resendCount: 0,status:0};

      resp = mlDBController.insert('MlConnections',connection,context);

      return  new MlRespPayload().successPayload(resp,200);
    }
    /*other conditions for connection request

    /*connection request is re-send only if
     1- user rejects the connection request.same user can only send the request.
     2- Note: if connection is blocked. then requestedFrom should be reset(or connection object should be deleted)
     3-$0r condition 1)isDenied:false only if the connection is reset
                     2)isDenied:true and requestFrom is not current user*/
    resp=mlDBController.update('MlConnections',{connectionCode:connectionCode,isBlocked:false,isAccepted:false,$or:[{isDenied:false},{isDenied:true,requestedFrom:{$ne:fromuser._id}}]},
                                         {updatedBy:fromuser.username,updatedAt:new Date(),actionUserId:fromuser._id,isDenied:false,requestedFrom:fromuser._id,status:0},
                                         {$set:true},context);
    if(resp===1){ return new MlRespPayload().successPayload(resp,200) };

  } catch (e) {
    let code = 400;
    let response = new MlRespPayload().errorPayload(e.message, code);
    return response;
  }
  let code = 200;
  let response = new MlRespPayload().errorPayload('connection request failed', code);
  return response;
}

MlResolver.MlMutationResolver['acceptConnection'] = (obj,args, context, info) => {
  try {
    var connectionId = args.connectionId;
    var connection = mlDBController.findOne('MlConnections',{'_id':connectionId,"users.userId": context.userId},context)||{};
    var contextUser =  mlInteractionService.getUserDetails(context.userId);

    var result=mlDBController.update('MlConnections',
      //condition - accept the connection if requestFrom is from another user
      {_id:connection._id,isAccepted:false,isBlocked:false,isDenied:false,requestedFrom:{'$ne':contextUser._id}},
      {isAccepted:true,isBlocked:false,isDenied:false,updatedBy:contextUser.username,updatedAt:new Date(),actionUserId:contextUser._id,status:1},//update doc
      {$set:true},context);

    if(result===0){ return new MlRespPayload().errorPayload('Failed to accept the connection request', 400);}
    return new MlRespPayload().successPayload('Connection Request Accepted', 200);
  } catch (e) {
    let code = 400;
    let response = new MlRespPayload().errorPayload(e.message, code);
    return response;
  }
}

MlResolver.MlMutationResolver['rejectConnection'] = (obj,args, context, info) => {
  try {
    var connectionId = args.connectionId;
    var connection = mlDBController.findOne('MlConnections',{'_id':connectionId,"users.userId": context.userId},context)||{};
    var contextUser =  mlInteractionService.getUserDetails(context.userId);

    var result=mlDBController.update('MlConnections',
      //condition - reject of the connection happens only if requestFrom is from another user
      {_id:connection._id,isAccepted:false,isBlocked:false,isDenied:false,requestedFrom:{'$ne':contextUser._id}},
      {isAccepted:false,isBlocked:false,isDenied:true,updatedBy:contextUser.username,updatedAt:new Date(),actionUserId:contextUser._id,status:2},//update doc
      {$set:true},context);
    if(result===0){ return new MlRespPayload().errorPayload('Failed to reject the connection request', 400);}
    return new MlRespPayload().successPayload('Connection Rejected', 200);
  }catch (e) {
    let code = 400;
    let response = new MlRespPayload().errorPayload(e.message, code);
    return response;
  }
}
/* connection = {
 requestedFrom: context.userId,
 actionUserId:context.userId,
 isAccepted: false,
 isDenied: false,
 isBlocked:false
 };*/
//'actionUserId':{$ne:toUser._id},"isAccepted":false,"isDenied":false,isBlocked:false
// let isAlreadyExist = MlConnections.findOne({"users.userId": {"$all": [toUser,fromuser]}});
// if (!isAlreadyExist) {//connection does not exist

//if connection record exists - 1)  check if its request where all conditions are false(due to unblock)
//                               2) check if is other connection is denied by you
// MlConnections.update('MlConnections',{$or:[{"users.userId": {"$all": [toUser,fromuser]},isBlocked:false,isDenied:false,isAccepted:false},
//                                           {"users.userId": {"$all": [toUser,fromuser]},isDenied:true,requestedFrom:fromuser._id}]},
//    {},
//    {$set:true},context);

