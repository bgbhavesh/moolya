/**
 * Created by pankaj on 17/6/17.
 */
import MlResolver from '../../commons/mlResolverDef'
import MlRespPayload from '../../commons/mlPayload'
import MlUserContext from '../../MlExternalUsers/mlUserContext'
const extendify = require('extendify');
import mlOnBoard from '../onBoard/mlOnBoardRepo'
const _ = require('lodash')

MlResolver.MlQueryResolver.fetchStage = (obj, args, context, info) => {
  const query = {
    userId: context.userId
  };
  const result = mlDBController.find('MlStage', query, context).fetch()
  return result;
};

MlResolver.MlQueryResolver.fetchStage = (obj, args, context, info) => {
  const result = mlDBController.findOne('MlStage', { _id: args.StageId }, context)
};

MlResolver.MlMutationResolver.createStage = (obj, args, context, info) => {
  const userId = context.userId;
  const profile = new MlUserContext(userId).userProfileDetails(userId);
  const stage = args.stage;
  stage.userId = userId;
  stage.profileId = profile.profileId;
  stage.createdAt = new Date();
  if (args.stage.resourceStage !== 'onboard') {
    result = mlDBController.insert('MlStage', stage, context);
  } else {
    const response = new MlRespPayload().errorPayload('Investment to be done prior to On-Boarding', 400);
    return response;
  }
  // if onboard create trancaation record;
  if (true || result) {
    const code = 200;
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
};

MlResolver.MlMutationResolver.updateStage = (obj, args, context, info) => {
  const stageDetails = mlDBController.findOne('MlStage', { _id: args.stageId }, context);
  let onBoardRequested = false;
  if (stageDetails) {
    if (args.stage.resourceStage === 'onboard') {
      if (stageDetails && stageDetails.hasInvested) {
        if (stageDetails.onBoardRequest) {
          const response = new MlRespPayload().errorPayload('Onboard request is already pending', 400);
          return response
        }
        args.stage.onBoardRequest = true;
        onBoardRequested = true;
        result = mlDBController.update('MlStage', { _id: args.stageId }, { onBoardRequest: true }, { $set: true }, context);
        const user = mlDBController.findOne('MlPortfolioDetails', { _id: args.stage.resourceId }, context);
        new mlOnBoard.createTransactionRequest(user.userId, 'investments', args.stage.resourceId, args.stageId, context.userId, 'user', context)
      } else {
        const response = new MlRespPayload().errorPayload('Investment to be done prior to On-Boarding', 200);
        return response
      }
    } else {
      result = mlDBController.update('MlStage', { _id: args.stageId }, args.stage, { $set: true }, context);
    }
    if (result) {
      const code = 200;
      const response = new MlRespPayload().successPayload(onBoardRequested ? 'Onboard request to sent to user' : result, code);
      return response
    }
  } else if (result) {
    const code = 400;
    const response = new MlRespPayload().errorPayload(result, code);
    return response
  }
};

MlResolver.MlMutationResolver.updateOnBoardStage = (obj, args, context, info) => {
  const transactionLogDetails = mlDBController.findOne('MlTransactionsLog', { _id: args.transactionLogId }, context);
  const stageDetails = mlDBController.findOne('MlStage', { _id: transactionLogDetails.activityDocId }, context);
  if (stageDetails) {
    if (stageDetails && stageDetails.hasInvested && stageDetails.onBoardRequest) {
      stageDetails.onBoardStatus = args.status;
      if (stageDetails.onBoardStatus == 'accept') {
        stageDetails.resourceStage = 'onboard';
      }
      stageDetails.onBoardRequest = false;
      result = mlDBController.update('MlStage', { _id: transactionLogDetails.activityDocId }, stageDetails, { $set: true }, context);
      // let user = mlDBController.findOne('MlPortfolioDetails', {_id: transactionLogDetails.docId}, context);
      // new mlOnBoard.createTransactionRequest(user.userId, 'investments', args.stage.resourceId, args.stageId, context.userId, 'user', context)
    } else {
      const response = new MlRespPayload().errorPayload('Investment to be done prior to On-Boarding', 200);
      return response
    }

    if (result) {
      const code = 200;
      const response = new MlRespPayload().successPayload(result, code);
      return response
    }
  } else if (result) {
    const code = 400;
    const response = new MlRespPayload().errorPayload(result, code);
    return response
  }
};


MlResolver.MlMutationResolver.fetchOnBoardByTransaction = (obj, args, context, info) => {
  const transactionId = args.transactionId;
  const userId = context.userId;
  if (transactionId) {
    const transactionLogDetails = mlDBController.findOne('MlTransactionsLog', { _id: transactionId }, context);
    const stageDetails = mlDBController.findOne('MlStage', { _id: transactionLogDetails.activityDocId }, context);
    const result = {};
    if (stageDetails.resourceStage == 'onboard') {
      result.canAccept = false;
      result.canReject = false;
    } else if (userId == transactionLogDetails.userId) {
      result.canAccept = true;
      result.canReject = true;
    } else {
      result.canAccept = false;
      result.canReject = false;
    }
    const code = 200;
    const response = new MlRespPayload().successPayload(result, code);
    return response;
  }
  const code = 400;
  const response = new MlRespPayload().errorPayload('TransactionId is missing', code);
  return response
};

