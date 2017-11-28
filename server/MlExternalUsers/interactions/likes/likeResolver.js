/**
 * Created by  mohammed.mohasin on 6/5/17.
 */
import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import _ from 'lodash';
import MlEmailNotification from '../../../mlNotifications/mlEmailNotifications/mlEMailNotification'
import mlInteractionService from '../mlInteractionRepoService';
import MlAlertNotification from '../../../mlNotifications/mlAlertNotifications/mlAlertNotification';
import MlSubChapterAccessControl from './../../../mlAuthorization/mlSubChapterAccessControl';

MlResolver.MlMutationResolver.likeRequest = (obj, args, context, info) => {
  if (args && context && context.userId) {
    let resp = null;
    try {
      /**
           * Sub chapter access control
           */
      const portfolioDetails = mlDBController.findOne('MlPortfolioDetails', { _id: args.resourceId }, context);
      const subChapterId = portfolioDetails && portfolioDetails.subChapterId ? portfolioDetails.subChapterId : '';
      const mlSubChapterAccessControl = MlSubChapterAccessControl.getAccessControl('TRANSACT', context, subChapterId);
      if (!mlSubChapterAccessControl.hasAccess) {
        const code = 400;
        const response = new MlRespPayload().errorPayload('You do not have access to transact', code);
        return response;
      }

      const user = mlDBController.findOne('users', { _id: context.userId }, context);
      const resourceDetails = mlInteractionService.fetchResourceBasedUserDetails(args.resourceType, args.resourceId, context);
      const fromuser = resourceDetails.contextUser;
      const toUser = resourceDetails.resourceOwner;
      // let isValid = validateExternalUser(fromuser)
      /* if(!isValid){let code = 400;let response = new MlRespPayload().errorPayload('Invalid User', code);
             return response;} */
      const likeRequest = {
        resourceId: args.resourceId,
        resourceType: args.resourceType,
        isActive: true,
        userId: user._id,
        userEmail: user.username,
        createdOn: new Date()
      };

      resp = mlDBController.update('MlLikes', { resourceId: args.resourceId, userId: user._id }, likeRequest, { $set: true, upsert: true }, context);

      if (resp) {
        const fromUserType = 'user';
        mlInteractionService.createTransactionRequest(toUser._id, 'like', args.resourceId, resp, fromuser._id, fromUserType, context);
        // todo: create a repo for like
        // transaction Log
      }
    } catch (e) {
      const code = 400;
      const response = new MlRespPayload().errorPayload(e.message, code);
      return response;
    }
    const code = 200;
    const likeRequest = MlAlertNotification.onLikeRequest()
    const response = new MlRespPayload().successPayload(likeRequest, code);
    return response;
  }
}

MlResolver.MlQueryResolver.fetchLikes = (obj, args, context, info) => {
  if (args && args.resourceType && context && context.userId) {
    const resp = null;
    try {
      let pileLine = [
        {
          $match: {
            userId: context.userId,
            resourceType: args.resourceType
          }
        }
      ]
      const pipeRes = mlInteractionService.buildAggregationQuery(args.resourceType, context.userId);
      if (pipeRes.length) {
        pileLine = pileLine.concat(pipeRes);
      }
      const resp = mlDBController.aggregate('MlLikes', pileLine, context);
      const code = 200;
      const response = new MlRespPayload().successPayload(resp, code);
      return response;
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

validateExternalUser = (user) => {
  const userExternal = user.profile.isExternaluser;
  // check if email is verified.
  const emails = user && user.emails ? user.emails : [];
  const email = _.find(emails || [], e => (e.verified && e.address === user.username));
  if (!email) { return false; }
  return userExternal
}
