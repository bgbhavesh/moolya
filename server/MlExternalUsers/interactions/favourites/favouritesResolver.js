/**
 * Created by mohammed.mohasin on 16/06/17.
 */
import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import _ from 'lodash'
import mlInteractionService from '../mlInteractionRepoService';
import MlSubChapterAccessControl from './../../../mlAuthorization/mlSubChapterAccessControl';
import MlAlertNotification from '../../../mlNotifications/mlAlertNotifications/mlAlertNotification'
const generateConnectionCode = function (u1, u2) {
  let connectionCode = u1 + u2;
  if (u1 > u2)connectionCode = u2 + u1;
  if (u1 === u2)connectionCode = null;
  return connectionCode;
}
MlResolver.MlQueryResolver.fetchFavourites = (obj, args, context, info) => {
  let userFavourites = [];
  if (context && context.userId) {
    // todo: pagination based result
    const pipeline = [{ $match: { isAccepted: true, users: { $elemMatch: { userId: context.userId, isFavourite: true } } } },
      { $unwind: '$users' },
      { $match: { 'users.userId': { $ne: context.userId } } },
      {
        $lookup: {
          from: 'users', localField: 'users.userId', foreignField: '_id', as: 'userDetails'
        }
      }, // join with user
      { $unwind: '$userDetails' }, { $unwind: '$userDetails.profile.externalUserProfiles' },
      // match the default profile of user //'userDetails.profile.externalUserProfiles.isDefault':true
      // todo:check with business to display multiple profiles for multiple users
      { $match: { 'userDetails.profile.isActive': true, 'userDetails.profile.externalUserProfiles.isActive': true } },
      {
        $group: {
          _id: '$connectionCode', // display first profile of user
          id: { $first: '$_id' }, // connection Object Id
          userId: { $first: '$users.userId' },
          userName: { $first: '$users.userName' },
          firstName: { $first: '$userDetails.profile.firstName' },
          lastName: { $first: '$userDetails.profile.lastName' },
          displayName: { $first: '$userDetails.profile.displayName' },
          profileImage: { $first: '$userDetails.profile.profileImage' },
          profileId: { $first: '$userDetails.profile.profileId' },
          countryName: { $first: '$userDetails.profile.externalUserProfiles.countryName' },
          communityName: { $first: '$userDetails.profile.externalUserProfiles.communityName' },
          communityCode: { $first: '$userDetails.profile.externalUserProfiles.communityDefCode' }
        }
      }];
    userFavourites = mlDBController.aggregate('MlConnections', pipeline, context);
  }

  return userFavourites;
}

/*
* This method sets the user as favourite.
* Note: if a user marks another user as favourite,the isFavourite=true flag will be stored in his own user Object
* @param resourceType and resourceId containing resource details
* returns result if user is marked as favourite
*/
MlResolver.MlMutationResolver.markFavourite = (obj, args, context, info) => {
  let favouriteRequest;
  if (args && context && context.userId) {
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

    let resp = null;
    // follow flag checks for true/false. if its true:
    const isFavourite = args.isFavourite === true ? args.isFavourite : (args.isFavourite !== false);
    try {
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
      const connectionCode = generateConnectionCode(fromuser._id, toUser._id);
      // $ operator in mongo updates the specific array object provided positional operator matches the query
      resp = mlDBController.update(
        'MlConnections',
        {
          connectionCode, 'users.userId': fromuser._id, isBlocked: false, isDenied: false, isAccepted: true
        },
        {
          updatedBy: fromuser.username, updatedAt: new Date(), actionUserId: fromuser._id, 'users.$.isFavourite': isFavourite
        },
        { $set: true }, context
      );
      if (resp === 1) {
        const fromUserType = 'user';
        const connectionData = mlDBController.findOne('MlConnections', {
          connectionCode, 'users.userId': fromuser._id, isBlocked: false, isDenied: false, isAccepted: true
        }, context);
        mlInteractionService.createTransactionRequest(toUser._id, 'favorite', args.resourceId, connectionData._id, fromuser._id, fromUserType, context);
        favouriteRequest = MlAlertNotification.onFavouriteRequestMsg(toUser && toUser._id ? toUser._id : '');
        return new MlRespPayload().successPayload(favouriteRequest, 200);
      }

      // todo: if user is not in his connection, return valud error message
    } catch (e) {
      const code = 400;
      const response = new MlRespPayload().errorPayload(e.message, code);
      return response;
    }
    return new MlRespPayload().errorPayload('Failed to mark the user as favourite', 400);
  }
}

/**
 * @module ['users']
 * @params [registrationId, communityCode]
 * fetching users for Favourites
 * */
MlResolver.MlQueryResolver.fetchFavouritesByReg = (obj, args, context, info) => {
  let userFavourites = [];
  const registration = mlDBController.findOne('MlRegistration', { _id: args.registrationId }, context) || {}
  const userId = registration && registration.registrationInfo && registration.registrationInfo.userId ? registration.registrationInfo.userId : ''
  if (registration && userId && args.communityCode) {
    const pipeline = [{ $match: { isAccepted: true, users: { $elemMatch: { userId } } } },
      { $unwind: '$users' },
      { $match: { 'users.userId': { $ne: userId }, 'users.isFavourite': true } },
      {
        $lookup: {
          from: 'users', localField: 'users.userId', foreignField: '_id', as: 'userDetails'
        }
      },
      { $unwind: '$userDetails' }, { $unwind: '$userDetails.profile.externalUserProfiles' },
      {
        $match: {
          'userDetails.profile.isActive': true,
          'userDetails.profile.externalUserProfiles.isActive': true,
          'userDetails.profile.externalUserProfiles.communityDefCode': args.communityCode
        }
      },
      {
        $group: {
          _id: '$connectionCode', // display first profile of user
          id: { $first: '$_id' }, // connection Object Id
          userId: { $first: '$users.userId' },
          userName: { $first: '$users.userName' },
          firstName: { $first: '$userDetails.profile.firstName' },
          lastName: { $first: '$userDetails.profile.lastName' },
          displayName: { $first: '$userDetails.profile.displayName' },
          profileImage: { $first: '$userDetails.profile.profileImage' },
          chapterName: { $first: '$userDetails.profile.externalUserProfiles.chapterName' }
        }
      }];
    userFavourites = mlDBController.aggregate('MlConnections', pipeline, context);
  }
  return userFavourites;
}
