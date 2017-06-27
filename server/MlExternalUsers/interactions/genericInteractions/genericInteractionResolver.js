/**
 * Created by  mohammed.mohasin on 19/6/17.
 */
import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import _ from 'lodash';
import mlInteractionService from '../mlInteractionRepoService'


var generateConnectionCode=function(u1,u2){
  var connectionCode=u1+u2;
  if(u1>u2)connectionCode=u2+u1;
  if(u1===u2)connectionCode=null;
  return connectionCode;
}
MlResolver.MlQueryResolver['fetchInteractionsCount'] = (obj, args, context, info) => {
  var counterList = [];
  var actionsList=args.actionNames||[];
  var resourceId=args.resourceId;
  var resourceType=args.resourceType;
  var resourceDetails = mlInteractionService.fetchResourceBasedUserDetails(resourceType,resourceId, context);
  if (context && context.userId) {
    _.each(actionsList, function (action) {
      switch(action){
        case 'like':
             let likesCount=MlLikes.find({resourceType:resourceType,resourceId:resourceId,isActive:true}).count();
             counterList.push({'actionName':'like',count:likesCount});
              break;
        case 'connect':
             let connectionCount=MlConnections.find({'isAccepted':true,'users.userId':resourceDetails.resourceOwnerId}).count();
             counterList.push({'actionName':'connect',count:connectionCount});
             break;
        case 'collaborate':
              counterList.push({'actionName':'collaborate',count:0});
              break;
        case 'favourite':
              let favouriteCount=MlConnections.find({'isAccepted':true,'users.userId':resourceDetails.resourceOwnerId,'users':{'$elemMatch':{'userId':{$ne:resourceDetails.resourceOwnerId},'isFavourite':true}}}).count();
              counterList.push({'actionName':'favourite',count:favouriteCount});
              break;
        case 'view':
              let viewCount=MlViews.find({resourceType:resourceType,resourceId:resourceId}).count();
              counterList.push({'actionName':'view',count:viewCount});
              break;
        case 'partner':
              counterList.push({'actionName':'partner',count:0});
              break;
        case 'enquire':
          let enquireCount=MlInquiries.find({resourceType:resourceType,resourceId:resourceId}).count();
          counterList.push({'actionName':'enquire',count:enquireCount});
          break
      }
    });
  }
  return counterList;
}

MlResolver.MlQueryResolver['fetchInteractionActionAttributes'] = (obj, args, context, info) => {
  var actionsList = [];
  var actionNames=args.actionNames||[];
  var resourceId=args.resourceId;
  var resourceType=args.resourceType;
  var resourceDetails = mlInteractionService.fetchResourceBasedUserDetails(resourceType,resourceId, context);
  if (context && context.userId) {
    var connectionCode=generateConnectionCode(context.userId,resourceDetails.resourceOwnerId);
    _.each(actionNames, function (action) {
      switch(action){
        case 'like':
          let likesCount=MlLikes.find({resourceType:resourceType,resourceId:resourceId,isActive:true,userId:context.userId}).count();
          actionsList.push({'actionName':'like',isDisabled:likesCount==1?true:false,isHidden:false});
          break;
        case 'connect':
          let connectionCount=MlConnections.find({'isAccepted':true,'connectionCode':connectionCode}).count();
          actionsList.push({'actionName':'connect',isDisabled:connectionCount==1?true:false,isHidden:false});
          break;
        case 'favourite':
          let favouriteCount=MlConnections.find({'isAccepted':true,'connectionCode':connectionCode,'users':{'$elemMatch':{'userId':context.userId,'isFavourite':true}}}).count();
          actionsList.push({'actionName':'favourite',isDisabled:favouriteCount==1?true:false,isHidden:false});
          break;
        case 'follow':
          let followCount=MlFollowings.find({'isActive':true,'followerId':resourceDetails.resourceOwnerId,'followedBy':context.userId}).count();
          actionsList.push({'actionName':'follow',isDisabled:followCount==1?true:false,isHidden:false});
          break;
      }
    });
  }
  return actionsList;
}