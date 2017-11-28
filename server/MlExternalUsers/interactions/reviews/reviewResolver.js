/**
 * Created by  mohammed.mohasin on 6/5/17.
 */
import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import _ from 'lodash';
import mlInteractionService from '../mlInteractionRepoService';
import MlEmailNotification from '../../../mlNotifications/mlEmailNotifications/mlEMailNotification'
import MlSubChapterAccessControl from './../../../mlAuthorization/mlSubChapterAccessControl';
import MlNotificationController from '../../../mlNotifications/mlAppNotifications/mlNotificationsController'
import mlSmsController from '../../../mlNotifications/mlSmsNotifications/mlSmsController'
import MlUserContext from '../../../MlExternalUsers/mlUserContext';
import MlSMSNotification from '../../../mlNotifications/mlSmsNotifications/mlSMSNotification'
MlResolver.MlMutationResolver.createReview = (obj, args, context, info) => {
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
      if (!toUser._id || !fromuser._id || fromuser._id === toUser._id) {
        const code = 400;
        const response = new MlRespPayload().errorPayload('Invalid User', code);
        return response;
      }

      // fix for Issue: MOOLYA-2508
      const updateCount = mlDBController.update('MlReviews', { resourceId: args.resourceId, resourceType: args.resourceType, userId: fromuser._id }, { resourceId: args.resourceId }, { $set: true, upsert: false }, context);
      if (updateCount == 1) {
        const response = new MlRespPayload().errorPayload('Limit exceeded for adding review', 401);
        return response;
      }

      // todo:set Active through admin

      const review = {
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
        // create transaction and transaction Log
        const fromUserType = 'user';
        mlInteractionService.createTransactionRequest(toUser._id, 'review', args.resourceId, resp, fromuser._id, fromUserType, context);
        MlEmailNotification.reviewRecieved(fromuser, toUser)
        MlNotificationController.onReviewReceived(fromuser, toUser);
        MlSMSNotification.sendSMSForReviewRecvd(fromuser, args.resourceId, context)
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


MlResolver.MlQueryResolver.fetchReviews = (obj, args, context, info) => {
  try {
    if (!context.userId) {
      return null;
    }
    // todo: pagination based result
    const pipeline = [{ $match: { resourceId: args.resourceId, resourceType: args.resourceType, isActive: true } },
      {
        $lookup: {
          from: 'users', localField: 'userId', foreignField: '_id', as: 'userDetails'
        }
      }, // join with user
      { $unwind: '$userDetails' },
      {
        $project: {
          reviewId: '$_id',
          resourceId: '$resourceId',
          resourceType: '$resourceType',
          rating: '$rating',
          message: '$message',
          userId: '$userId',
          userEmail: '$userEmail',
          createdOn: '$createdOn',
          userName: '$userDetails.profile.displayName',
          userProfileImage: '$userDetails.profile.profileImage'
        }
      }
    ];
    const reviews = mlDBController.aggregate('MlReviews', pipeline, context);

    return reviews;
  } catch (e) {
    console.log(e);
    return null;
  }
}

