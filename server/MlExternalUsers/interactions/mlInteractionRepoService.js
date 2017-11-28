/**
 * Created by mohammed.mohasin on 13/06/17.
 */
import _ from 'lodash';
import MlTransactionsHandler from '../../commons/mlTransactionsLog';
class MlInteractionService {
  constructor() {
    if (!MlInteractionService.instance) {
      MlInteractionService.instance = this;
    }
    return MlInteractionService.instance;
  }

  getUserDetails(userId) {
    const user = mlDBController.findOne('users', { _id: userId }, {}) || {};
    return user;
  }

  fetchContextUserDetails(context) {
    const contextUserId = context ? context.userId : null;
    const contextUser = this.getUserDetails(contextUserId) || {};
    return { contextUserId: contextUser._id, contextUserName: contextUser.username, contextUser };
  }

  validateExternalUser(user) {
    const userExternal = user.profile.isExternaluser;
    // check if email is verified.
    const emails = user && user.emails ? user.emails : [];
    const email = _.find(emails || [], e => (e.verified && e.address === user.username));
    if (!email) { return false; }
    return userExternal;
  }

  // fetch the resourceOwnerId,resourceOwnerUserName,contextUserId,contextUserName based on resourceType and resourceId
  fetchResourceBasedUserDetails(resourceType, resourceId, context) {
    let resourceOwnerId = null;
    const contextUserId = context ? context.userId : null;
    switch (resourceType) {
      case 'portfolio':
        var resourceData = mlDBController.findOne('MlPortfolioDetails', { _id: resourceId }, context) || null;
        resourceOwnerId = resourceData ? resourceData.userId : null;
        break;
    }
    const resourceOwnerUser = this.getUserDetails(resourceOwnerId) || {};
    const contextUser = this.getUserDetails(contextUserId) || {};

    return {
      resourceId,
      resourceType,
      resourceOwner: resourceOwnerUser,
      resourceOwnerId: resourceOwnerUser._id,
      resourceOwnerUserName: resourceOwnerUser.username,
      contextUserId: contextUser._id,
      contextUserName: contextUser.username,
      contextUser
    };
  }

  interactionPreConditions(resourceType, resourceId, context) {
    const curUserId = context ? context.userId : null;
    let response = true
    switch (resourceType) {
      case 'portfolio':
        var userDetails = this.getUserDetails(curUserId) || {};
        var isInternalUser = userDetails && userDetails.profile ? userDetails.profile.isInternaluser : false
        if (isInternalUser) { response = false } else {
          const resourceData = mlDBController.findOne('MlPortfolioDetails', { _id: resourceId }, context) || {}
          const isOwner = _.isMatch(resourceData, { userId: curUserId })
          if (isOwner) { response = false }
        }
        break;
    }
    return response
  }

  buildAggregationQuery(resourceType, userId) {
    switch (resourceType) {
      case 'portfolio':
        return [
          {
            $lookup: {
              from: 'mlPortfolioDetails',
              localField: 'resourceId',
              foreignField: '_id',
              as: 'portfolio'
            }
          },
          { $unwind: '$portfolio' },
          {
            $lookup: {
              from: 'users',
              localField: 'portfolio.userId',
              foreignField: '_id',
              as: 'user'
            }
          },
          { $unwind: '$user' },
          {
            $lookup: {
              from: 'mlStage',
              localField: 'resourceId',
              foreignField: 'resourceId',
              as: 'stage'
            }
          },
          {
            $project: {
              user: {
                name: '$user.profile.displayName'
              },
              profileImage: '$user.profile.profileImage',
              stage: {
                $filter: {
                  input: '$stage',
                  as: 'data',
                  cond: { $eq: ['$$data.userId', userId] }
                }
              },
              portfolio: 1,
              resourceId: 1
            }
          },
          // { $lookup:
          //   {
          //     from: "mlIdeatorPortfolio",
          //     localField: "resourceId",
          //     foreignField: "portfolioDetailsId",
          //     as: "ideator"
          //   }
          // },
          {
            $lookup:
                {
                	from: 'mlIdeas',
                	localField: 'resourceId',
                	foreignField: 'portfolioId',
                	as: 'idea'
                }
          },
          {
            $lookup:
              {
              	from: 'mlStartupPortfolio',
              	localField: 'resourceId',
              	foreignField: 'portfolioDetailsId',
              	as: 'startup'
              }
          },
          {
            $lookup:
              {
              	from: 'mlFunderPortfolio',
              	localField: 'resourceId',
              	foreignField: 'portfolioDetailsId',
              	as: 'funder'
              }
          }
        ]
        // To do : When all the communality portfolio done,  Will add remaining portfolio here.
      default:
        return [];
    }
  }

  createTransactionRequest(userId, transType, portfolioId, resourceId, fromUserId, fromUserType, context) {
    try {
      const transactionType = transType;
      switch (transactionType) {
        case 'connectionRequest':
          new MlTransactionsHandler().recordTransaction({
            fromUserId,
            moduleName: 'interaction',
            activity: 'connection',
            transactionType: 'connectionRequest',
            userId,
            activityDocId: resourceId,
            docId: portfolioId,
            transactionDetails: 'connection request',
            context: context || {},
            transactionTypeId: 'connectionRequest',
            fromUserType
          });
          break;
        case 'like':
          new MlTransactionsHandler().recordTransaction({
            fromUserId,
            moduleName: 'interaction',
            activity: 'like',
            transactionType: 'interaction',
            userId,
            activityDocId: resourceId,
            docId: portfolioId,
            transactionDetails: 'like portfolio',
            context: context || {},
            transactionTypeId: 'interaction',
            fromUserType
          });
          break;
        case 'favorite':
          new MlTransactionsHandler().recordTransaction({
            fromUserId,
            moduleName: 'interaction',
            activity: 'favorite',
            transactionType: 'interaction',
            userId,
            activityDocId: resourceId,
            docId: portfolioId,
            transactionDetails: 'favorite portfolio',
            context: context || {},
            transactionTypeId: 'interaction',
            fromUserType
          });
          break;
        case 'follow':
          new MlTransactionsHandler().recordTransaction({
            fromUserId,
            moduleName: 'interaction',
            activity: 'follow',
            transactionType: 'interaction',
            userId,
            activityDocId: resourceId,
            docId: portfolioId,
            transactionDetails: 'follow portfolio',
            context: context || {},
            transactionTypeId: 'interaction',
            fromUserType
          });
          break;
        case 'inquire':
          new MlTransactionsHandler().recordTransaction({
            fromUserId,
            moduleName: 'interaction',
            activity: 'inquire',
            transactionType: 'interaction',
            userId,
            activityDocId: resourceId,
            docId: portfolioId,
            transactionDetails: 'inquire portfolio',
            context: context || {},
            transactionTypeId: 'interaction',
            fromUserType
          });
          break;
        case 'review':
          new MlTransactionsHandler().recordTransaction({
            fromUserId,
            moduleName: 'interaction',
            activity: 'review',
            transactionType: 'interaction',
            userId,
            activityDocId: resourceId,
            docId: portfolioId,
            transactionDetails: 'review portfolio',
            context: context || {},
            transactionTypeId: 'interaction',
            fromUserType
          });
          break;
        case 'view':
          new MlTransactionsHandler().recordTransaction({
            fromUserId,
            moduleName: 'interaction',
            activity: 'view',
            transactionType: 'interaction',
            userId,
            activityDocId: resourceId,
            docId: portfolioId,
            transactionDetails: 'view portfolio',
            context: context || {},
            transactionTypeId: 'interaction',
            fromUserType
          });
          break;
        case 'share':
          new MlTransactionsHandler().recordTransaction({
            fromUserId,
            moduleName: 'interaction',
            activity: 'share',
            transactionType: 'interaction',
            userId,
            activityDocId: resourceId,
            docId: portfolioId,
            transactionDetails: 'share data',
            context: context || {},
            transactionTypeId: 'interaction',
            fromUserType
          });
          break;
      }
    } catch (e) {
      // console
      console.log(e);
    }
  }

  fetchConnectionByTransaction(transactionId, transactionType) {
    try {
      switch (transactionType) {
        case 'connectionRequest':
          const transactionRec = new MlTransactionsHandler().readTransaction(transactionId);
          return transactionRec.activityDocId;
          break;
      }
    } catch (e) {
      // console
      console.log(e);
    }
  }
}
const mlInteractionService = new MlInteractionService();
Object.freeze(mlInteractionService);

export default mlInteractionService;

