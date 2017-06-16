/**
 * Created by  mohammed.mohasin on 6/5/17.
 */
import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import _ from 'lodash';
import mlInteractionService from '../mlInteractionRepoService'
MlResolver.MlMutationResolver['followUser'] = (obj, args, context, info) =>{
    if(args && context && context.userId){
      var resp=null;
      //follow flag checks for true/false. if its true:
      var follow=args.follow===true?args.follow:(args.follow===false?false:true);
        try {
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

          let followUser={isActive:follow,followerId:toUser._id,followerEmail:toUser.username,followedBy:fromuser._id,
            followedByEmail:fromuser.username,updatedOn:new Date(),updatedBy:fromuser.username};

          resp = mlDBController.update('MlFollowings',{followedBy:fromuser._id,followerId:toUser._id},followUser,{$set: true,upsert: true},context);

          if(resp===0){
            //todo: create a repo for like
            //transaction Log
            return new MlRespPayload().errorPayload(resp, 400);
          }

        }catch (e){
            let code = 400;
            let response = new MlRespPayload().errorPayload(e.message, code);
            return response;
        }
        let code = 200;
        let response = new MlRespPayload().successPayload(resp, code);
        return response;
    }
}

MlResolver.MlQueryResolver['followersList'] = (obj, args, context, info) => {
  var followersList = [];
  if (context && context.userId) {
    //todo: pagination based result
     followersList = mlDBController.find('MlConnections',{"followerId":context.userId,isActive:true}).fetch();
  }
  return followersList;
}

MlResolver.MlQueryResolver['followingsList'] = (obj, args, context, info) => {
  var followingsList = [];
  if (context && context.userId) {
    //todo: pagination based result
     followingsList = mlDBController.find('MlConnections',{"followedBy":context.userId,isActive:true}).fetch();
  }
  return followingsList;
}
