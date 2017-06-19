/**
 * Created by  mohammed.mohasin on 19/6/17.
 */
import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import _ from 'lodash';
import mlInteractionService from '../mlInteractionRepoService'


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
              let favouriteCount=MlConnections.find({'isAccepted':true,'users':{'$elemMatch':{'userId':resourceDetails.resourceOwnerId,'isFavourite':true}}}).count();
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
