/**
 * Created by  mohammed.mohasin on 6/5/17.
 */
import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import _ from 'lodash';
import mlInteractionService from '../mlInteractionRepoService';

/**
* View resolver should be called when external user views a portfolio
 * Note : [checking pre-conditions] do not create request if any admins or owner access the resource
* */

MlResolver.MlMutationResolver.createView = (obj, args, context, info) => {
  if (args && context && context.userId) {
    let resp = null;
    try {
      const contextDetails = mlInteractionService.fetchContextUserDetails(context);
      const resourceDetails = mlInteractionService.fetchResourceBasedUserDetails(args.resourceType, args.resourceId, context);
      const fromuser = resourceDetails.contextUser;
      const toUser = resourceDetails.resourceOwner;
      const viewRequest = {
        resourceId: args.resourceId,
        resourceType: args.resourceType,
        userId: contextDetails.contextUserId,
        userEmail: contextDetails.username,
        updatedOn: new Date()
      };
      const isCreateRequest = mlInteractionService.interactionPreConditions(args.resourceType, args.resourceId, context);
      if (isCreateRequest) {
        resp = mlDBController.update('MlViews', { resourceId: args.resourceId, resourceType: args.resourceType, userId: contextDetails.contextUserId }, viewRequest, { $set: true, upsert: true }, context);
      }

      if (resp) {
        // transaction Log
        const fromUserType = 'user';
        mlInteractionService.createTransactionRequest(toUser._id, 'view', args.resourceId, resp, fromuser._id, fromUserType, context);
        MlEmailNotification.reviewRecieved(fromuser, toUser)
      }
    } catch (e) {
      const code = 400;
      const response = new MlRespPayload().errorPayload(e.message, code);
      return response;
    }
    const code = 200;
    const response = new MlRespPayload().successPayload(resp, code);
    return response;
  }
}
