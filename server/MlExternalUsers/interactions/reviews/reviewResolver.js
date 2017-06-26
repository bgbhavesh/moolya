/**
 * Created by  mohammed.mohasin on 6/5/17.
 */
import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import _ from 'lodash';
import mlInteractionService from '../mlInteractionRepoService';

MlResolver.MlMutationResolver['createReview'] = (obj, args, context, info) => {
  if (args && context && context.userId) {
    var resp = null;
    try {
      let user = mlDBController.findOne('users', {_id: context.userId}, context);
      var resourceDetails = mlInteractionService.fetchResourceBasedUserDetails(args.resourceType, args.resourceId, context);
      var fromuser = resourceDetails.contextUser;
      var toUser = resourceDetails.resourceOwner;
      if (!toUser._id || !fromuser._id || fromuser._id === toUser._id) {
        let code = 400;
        let response = new MlRespPayload().errorPayload('Invalid User', code);
        return response;
      }
      //todo:set Active through admin
      let review = {
        resourceId: args.resourceId,
        resourceType: args.resourceType,
        message: args.message,
        userId: fromuser._id,
        userEmail: fromuser.username,
        createdOn: new Date(),
        rating: args.rating || 0,
        isActive: true
      };

      resp = mlDBController.insert('MlReviews', review, context);

      if (resp) {
        //create transaction and transaction Log

      }

    } catch (e) {
      let code = 400;
      let response = new MlRespPayload().errorPayload(e.message, code);
      return response;
    }
    let code = 200;
    let response = new MlRespPayload().successPayload(resp, code);
    return response;
  }

}



  MlResolver.MlQueryResolver['fetchReviews'] = (obj, args, context, info) => {
    try {
      if(!context.userId){
        return null;
      }
      //todo: pagination based result
      var pipeline=[{$match:{'resourceId':args.resourceId,'resourceType':args.resourceType,isActive:true}},
        {$lookup:{from:'users',localField:'userId',foreignField:'_id',as:'userDetails'}},//join with user
        {$unwind:"$userDetails"},
        {$project: {reviewId:'$_id',resourceId: '$resourceId',resourceType: '$resourceType',rating: '$rating',
            message: '$message',userId: '$userId',userEmail: '$userEmail',createdOn: '$createdOn',
            userName: '$userDetails.profile.displayName',
            userProfileImage: '$userDetails.profile.profileImage',
        }
        }
       ];
      var reviews=mlDBController.aggregate('MlReviews',pipeline,context);

      return reviews;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

