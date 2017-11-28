/**
 * Created by  mohammed.mohasin on 19/6/17.
 */
import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import _ from 'lodash';
import mlInteractionService from '../mlInteractionRepoService'
import MlSubChapterAccessControl from './../../../mlAuthorization/mlSubChapterAccessControl';
import mlInteractionAccessControlRepo from './mlInteractionAccessControlRepo';

const generateConnectionCode = function (u1, u2) {
  let connectionCode = u1 + u2;
  if (u1 > u2)connectionCode = u2 + u1;
  if (u1 === u2)connectionCode = null;
  return connectionCode;
}
MlResolver.MlQueryResolver.fetchInteractionsCount = (obj, args, context, info) => {
  const counterList = [];
  const actionsList = args.actionNames || [];
  const resourceId = args.resourceId;
  const resourceType = args.resourceType;
  const resourceDetails = mlInteractionService.fetchResourceBasedUserDetails(resourceType, resourceId, context);
  if (context && context.userId) {
    _.each(actionsList, (action) => {
      switch (action) {
        case 'like':
          const likesCount = MlLikes.find({ resourceType, resourceId, isActive: true }).count();
          counterList.push({ actionName: 'like', count: likesCount });
          break;
        case 'connect':
          const connectionCount = MlConnections.find({ isAccepted: true, 'users.userId': resourceDetails.resourceOwnerId }).count();
          counterList.push({ actionName: 'connect', count: connectionCount });
          break;
        case 'collaborate':
          counterList.push({ actionName: 'collaborate', count: 0 });
          break;
        case 'favourite':
          const favouriteCount = MlConnections.find({ isAccepted: true, 'users.userId': resourceDetails.resourceOwnerId, users: { $elemMatch: { userId: { $ne: resourceDetails.resourceOwnerId }, isFavourite: true } } }).count();
          counterList.push({ actionName: 'favourite', count: favouriteCount });
          break;
        case 'view':
          const viewCount = MlViews.find({ resourceType, resourceId }).count();
          // let viewCount = mlDBController.find('MlViews', {resourceType: resourceType, resourceId: resourceId}).count();
          counterList.push({ actionName: 'view', count: viewCount });
          break;
        case 'partner':
          counterList.push({ actionName: 'partner', count: 0 });
          break;
        case 'enquire':
          const enquireCount = MlInquiries.find({ resourceType, resourceId }).count();
          counterList.push({ actionName: 'enquire', count: enquireCount });
          break
        case 'follow':
          const followCount = MlFollowings.find({ followerId: resourceDetails.resourceOwnerId, isActive: true }).count();
          counterList.push({ actionName: 'follow', count: followCount });
          break
      }
    });
  }
  return counterList;
}

MlResolver.MlQueryResolver.fetchInteractionActionAttributes = (obj, args, context, info) => {
  let actionsList = [];
  const actionNames = args.actionNames || [];
  const resourceId = args.resourceId;
  const resourceType = args.resourceType;
  const resourceDetails = mlInteractionService.fetchResourceBasedUserDetails(resourceType, resourceId, context);

  /**
   * Sub chapter access control
   */
  const portfolioDetails = mlDBController.findOne('MlPortfolioDetails', { _id: resourceId }, context);
  const subChapterId = portfolioDetails && portfolioDetails.subChapterId ? portfolioDetails.subChapterId : '';
  const mlSubChapterAccessControl = MlSubChapterAccessControl.getAccessControl('TRANSACT', context, subChapterId);
  const hasAccess = mlSubChapterAccessControl && mlSubChapterAccessControl.hasAccess ? mlSubChapterAccessControl.hasAccess : false;

  // check for Access Control for Interaction
  const canPerformInteraction = mlInteractionAccessControlRepo.canPerformInteraction(resourceDetails);

  if (context && context.userId && canPerformInteraction) {
    const connectionCode = generateConnectionCode(context.userId, resourceDetails.resourceOwnerId);
    _.each(actionNames, (action) => {
      switch (action) {
        case 'like':
          const likesCount = MlLikes.find({
            resourceType, resourceId, isActive: true, userId: context.userId
          }).count();
          actionsList.push({ actionName: 'like', isDisabled: !hasAccess || (likesCount == 1), isHidden: false });
          break;
        case 'connect':
          const connectionCount = MlConnections.find({ isAccepted: true, connectionCode }).count();
          actionsList.push({ actionName: 'connect', isDisabled: !hasAccess || (connectionCount == 1), isHidden: false });
          break;
        case 'favourite':
          const favouriteCount = MlConnections.find({ isAccepted: true, connectionCode, users: { $elemMatch: { userId: context.userId, isFavourite: true } } }).count();
          actionsList.push({ actionName: 'favourite', isDisabled: !hasAccess || (favouriteCount == 1), isHidden: false });
          break;
        case 'follow':
          const followCount = MlFollowings.find({ isActive: true, followerId: resourceDetails.resourceOwnerId, followedBy: context.userId }).count();
          actionsList.push({ actionName: 'follow', isDisabled: !hasAccess || (followCount == 1), isHidden: false });
          break;
        case 'enquire':
          actionsList.push({ actionName: 'enquire', isDisabled: !hasAccess, isHidden: false });
          break;
        case 'review':
          actionsList.push({ actionName: 'review', isDisabled: !hasAccess, isHidden: false });
          break;
        case 'comment':
          actionsList.push({ actionName: 'comment', isDisabled: !hasAccess, isHidden: false });
          break;
        case 'partner':
          actionsList.push({ actionName: 'partner', isDisabled: !hasAccess, isHidden: false });
          break;
        case 'collaborate':
          actionsList.push({ actionName: 'collaborate', isDisabled: !hasAccess, isHidden: false });
          break;
      }
    });
  } else { // if resource Owner is viewing his own resource
    actionsList = [{ actionName: 'collaborate', isDisabled: true, isHidden: false }, { actionName: 'partner', isDisabled: true, isHidden: false }, { actionName: 'comment', isDisabled: true, isHidden: false }, { actionName: 'review', isDisabled: true, isHidden: false },
      { actionName: 'enquire', isDisabled: true, isHidden: false }, { actionName: 'follow', isDisabled: true, isHidden: false }, { actionName: 'favourite', isDisabled: true, isHidden: false }, { actionName: 'connect', isDisabled: true, isHidden: false }, { actionName: 'like', isDisabled: true, isHidden: false }];
  }
  return actionsList;
}
