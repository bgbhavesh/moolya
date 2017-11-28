/**
 * Created by  mohammed.mohasin on 6/5/17.
 */
import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import _ from 'lodash';
import mlInteractionService from '../mlInteractionRepoService'
import MlSubChapterAccessControl from './../../../mlAuthorization/mlSubChapterAccessControl';
import MlAlertNotification from '../../../mlNotifications/mlAlertNotifications/mlAlertNotification'
MlResolver.MlMutationResolver.followUser = (obj, args, context, info) => {
  let followRequest;
  if (args && context && context.userId) {
    let resp = null;
    // follow flag checks for true/false. if its true:
    const follow = args.follow === true ? args.follow : (args.follow !== false);
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

      const resourceDetails = mlInteractionService.fetchResourceBasedUserDetails(args.resourceType, args.resourceId, context);
      const fromuser = resourceDetails.contextUser;
      const toUser = resourceDetails.resourceOwner;
      if (!toUser._id || !fromuser._id || fromuser._id === toUser._id) {
        const code = 400;
        const response = new MlRespPayload().errorPayload('Invalid user', code);
        return response;
      }
      const isValidFromUser = mlInteractionService.validateExternalUser(fromuser);
      const isValidToUser = mlInteractionService.validateExternalUser(toUser);
      if (!isValidToUser || !isValidFromUser) {
        const code = 400;
        const response = new MlRespPayload().errorPayload('Invalid user', code);
        return response;
      }

      const followUser = {
        isActive: follow,
        followerId: toUser._id,
        followerEmail: toUser.username,
        followedBy: fromuser._id,
        followedByEmail: fromuser.username,
        updatedOn: new Date(),
        updatedBy: fromuser.username
      };

      resp = mlDBController.update('MlFollowings', { followedBy: fromuser._id, followerId: toUser._id }, followUser, { $set: true, upsert: true }, context);

      if (resp === 0) {
        // todo: create a repo for like
        // transaction Log
        return new MlRespPayload().errorPayload(resp, 400);
      }

      const followData = mlDBController.findOne('MlFollowings', { followedBy: fromuser._id, followerId: toUser._id }, context);
      const fromUserType = 'user';
      mlInteractionService.createTransactionRequest(toUser._id, 'follow', args.resourceId, followData._id, fromuser._id, fromUserType, context);
      followRequest = MlAlertNotification.onFollowRequestMsg(toUser && toUser._id ? toUser._id : '');
    } catch (e) {
      const code = 400;
      const response = new MlRespPayload().errorPayload(e.message, code);
      return response;
    }
    const code = 200;
    const response = new MlRespPayload().successPayload(followRequest, code);
    return response;
  }
}

/*
* followerId-context.userId
* */
MlResolver.MlQueryResolver.followersList = (obj, args, context, info) => {
  let followersList = [];
  if (context && context.userId) {
    // todo: pagination based result
    const pipeline = [
      { $match: { followerId: context.userId, isActive: true } },
      {
        $lookup: {
          from: 'users', localField: 'followedBy', foreignField: '_id', as: 'userDetails'
        }
      },
      { $unwind: '$userDetails' }, { $unwind: '$userDetails.profile.externalUserProfiles' },
      { $match: { 'userDetails.profile.isActive': true, 'userDetails.profile.externalUserProfiles.isActive': true } },
      {
        $group: {
          _id: '$followedBy',
          userId: { $first: '$userDetails._id' },
          userName: { $first: '$userDetails.username' },
          firstName: { $first: '$userDetails.profile.firstName' },
          lastName: { $first: '$userDetails.profile.lastName' },
          displayName: { $first: '$userDetails.profile.displayName' },
          profileImage: { $first: '$userDetails.profile.profileImage' },
          profileId: { $first: '$userDetails.profile.profileId' },
          countryName: { $first: '$userDetails.profile.externalUserProfiles.countryName' },
          communityName: { $first: '$userDetails.profile.externalUserProfiles.communityName' },
          communityCode: { $first: '$userDetails.profile.externalUserProfiles.communityDefCode' }
        }
      }
    ]
    followersList = mlDBController.aggregate('MlFollowings', pipeline, context);
  }
  return followersList;
}
/*
* followedBy-context.userId
* */
MlResolver.MlQueryResolver.followingsList = (obj, args, context, info) => {
  let followingsList = [];
  if (context && context.userId) {
    const pipeline = [
      { $match: { followedBy: context.userId, isActive: true } },
      {
        $lookup: {
          from: 'users', localField: 'followerId', foreignField: '_id', as: 'userDetails'
        }
      },
      { $unwind: '$userDetails' }, { $unwind: '$userDetails.profile.externalUserProfiles' },
      { $match: { 'userDetails.profile.isActive': true, 'userDetails.profile.externalUserProfiles.isActive': true } },
      {
        $group: {
          _id: '$followerId',
          id: { $first: '$_id' }, // follow Object Id
          userId: { $first: '$userDetails._id' },
          userName: { $first: '$userDetails.username' },
          firstName: { $first: '$userDetails.profile.firstName' },
          lastName: { $first: '$userDetails.profile.lastName' },
          displayName: { $first: '$userDetails.profile.displayName' },
          profileImage: { $first: '$userDetails.profile.profileImage' },
          profileId: { $first: '$userDetails.profile.profileId' },
          countryName: { $first: '$userDetails.profile.externalUserProfiles.countryName' },
          communityName: { $first: '$userDetails.profile.externalUserProfiles.communityName' },
          communityCode: { $first: '$userDetails.profile.externalUserProfiles.communityDefCode' }
        }
      }
    ]

    // todo: pagination based result
    followingsList = mlDBController.aggregate('MlFollowings', pipeline, context);
  }
  return followingsList;
}
