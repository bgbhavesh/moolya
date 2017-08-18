/**
 * Created by pankaj on 17/6/17.
 */
import MlResolver from '../../commons/mlResolverDef'
import MlRespPayload from '../../commons/mlPayload'
import MlUserContext from '../../MlExternalUsers/mlUserContext'
var extendify = require('extendify');
import mlOnBoard from '../onBoard/mlOnBoardRepo'
var _ = require('lodash')

MlResolver.MlQueryResolver['fetchStage'] = (obj, args, context, info) => {
  let query = {
    userId:context.userId
  };
  let result = mlDBController.find('MlStage', query , context).fetch()
  return result;
}

MlResolver.MlQueryResolver['fetchStage'] = (obj, args, context, info) => {
  let result = mlDBController.findOne('MlStage', {_id:args.StageId} , context)
}

MlResolver.MlMutationResolver['createStage'] = (obj, args, context, info) => {
  let userId = context.userId;
  let profile = new MlUserContext(userId).userProfileDetails(userId);
  let stage = args.stage;
  stage.userId = userId;
  stage.profileId = profile.profileId;
  stage.createdAt = new Date();
  result = mlDBController.insert('MlStage' ,stage, context);
  if(args.stage.resourceStage=== 'onboard') {
    let user = mlDBController.findOne('MlPortfolioDetails', {_id:args.stage.resourceId} ,context);
    new mlOnBoard.createTransactionRequest(user.userId, 'investments', args.stage.resourceId, result, context.userId, 'user', context)
  }
  //if onboard create trancaation record;
  if(true || result) {
    let code = 200;
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlMutationResolver['updateStage'] = (obj, args, context, info) => {
  let stageDetails = mlDBController.findOne('MlStage', {_id:args.stageId} , context);
  if(stageDetails) {
    if(args.stage.resourceStage === 'onboard') {
      if (stageDetails && stageDetails.hasInvested) {
        args.stage.onBoardRequest = true;
        result = mlDBController.update('MlStage', {_id:args.stageId} , {onBoardRequest: true}, {$set:true}, context);
      let user = mlDBController.findOne('MlPortfolioDetails', {_id: args.stage.resourceId}, context);
      new mlOnBoard.createTransactionRequest(user.userId, 'investments', args.stage.resourceId, args.stageId, context.userId, 'user', context)
      } else {
        let response = new MlRespPayload().errorPayload('Investment to be done prior to On-Boarding', 200);
        return response
      }
    } else {
      result = mlDBController.update('MlStage', {_id:args.stageId} ,args.stage, {$set:true}, context);
    }
    if(result){
      let code = 200;
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  } else {
    if (result) {
      let code = 400;
      let response = new MlRespPayload().errorPayload(result, code);
      return response
    }
  }
}

MlResolver.MlMutationResolver['updateOnBoardStage'] = (obj, args, context, info) => {
  let transactionLogDetails = mlDBController.findOne('MlTransactionsLog', {_id: args.transactionLogId}, context);
  let stageDetails = mlDBController.findOne('MlStage', {_id: transactionLogDetails.activityDocId} , context);
  if(stageDetails) {
      if (stageDetails && stageDetails.hasInvested &&  stageDetails.onBoardRequest) {
        stageDetails.onBoardStatus = args.status ;
        result = mlDBController.update('MlStage', {_id:transactionLogDetails.activityDocId} , stageDetails, {$set:true}, context);
        // let user = mlDBController.findOne('MlPortfolioDetails', {_id: transactionLogDetails.docId}, context);
        // new mlOnBoard.createTransactionRequest(user.userId, 'investments', args.stage.resourceId, args.stageId, context.userId, 'user', context)
      } else {
        let response = new MlRespPayload().errorPayload('Investment to be done prior to On-Boarding', 200);
        return response
      }

    if(result){
      let code = 200;
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  } else {
    if (result) {
      let code = 400;
      let response = new MlRespPayload().errorPayload(result, code);
      return response
    }
  }
}

