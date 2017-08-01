/**
 * Created by Mukhil on 20/6/17.
 */

import MlResolver from '../../commons/mlResolverDef';
import MlRespPayload from '../../commons/mlPayload';
import MlUserContext from '../../MlExternalUsers/mlUserContext';

import mlServiceCardRepo from '../servicecards/servicecardRepo'

var extendify = require('extendify');
var _ = require('lodash');

MlResolver.MlQueryResolver['fetchUserServices'] = (obj, args, context, info) => {
  let portfolio = mlDBController.findOne('MlPortfolioDetails', {_id: args.profileId}, context)
  if(portfolio){
    let query = {
      userId: portfolio.userId,
      profileId:portfolio.profileId,
      isCurrentVersion: true,
      isBeSpoke: false,
      isLive: true
    };
    let result = mlDBController.find('MlServiceCardDefinition', query , context).fetch();
    return result;
  }else {
    let query = {
      userId: context.userId,
      profileId: args.profileId,
      isCurrentVersion: true,
      isBeSpoke: false
    };
    let result = mlDBController.find('MlServiceCardDefinition', query, context).fetch()
    return result;
  }
}

MlResolver.MlQueryResolver['fetchBeSpokeServices'] = (obj, args, context, info) => {
    let portfolio = mlDBController.findOne('MlPortfolioDetails', {_id: args.portfolioId}, context)
  if( portfolio && (context.userId !== portfolio.userId)){
    if(portfolio) {
      let query = {
        userId: portfolio.userId,
        profileId: portfolio.profileId,
        isCurrentVersion: true,
        isBeSpoke: true,
        beSpokeCreatorUserId: context.userId,
        beSpokeCreatorProfileId: new MlUserContext().userProfileDetails(context.userId).profileId
      };
      let result = mlDBController.find('MlServiceCardDefinition', query, context).fetch()
      return result;
    }
  }
    else{
    let query = {
      userId: context.userId,
      profileId: new MlUserContext().userProfileDetails(context.userId).profileId,
      isCurrentVersion: true,
      isBeSpoke: true
    };
    let result = mlDBController.find('MlServiceCardDefinition', query, context).fetch()
    return result;
  }
}

MlResolver.MlQueryResolver['findService'] = (obj, args, context, info) => {
  let result = mlDBController.findOne('MlServiceCardDefinition', {_id: args.serviceId} , context);
  if (result) {
    let query = {
      transactionId: result.transactionId,
      isCurrentVersion: true
    };
    let service = mlDBController.findOne('MlServiceCardDefinition', query, context);
    return service;
  }
  else  {
    let code = 404;
    let response = new MlRespPayload().errorPayload('Service not found', code);
    return response;
  }
}

MlResolver.MlMutationResolver['createBeSpokeService'] = (obj, args, context, info) => {
  let portfolioId =  args.portfolioId;
  return mlServiceCardRepo.createBespokeServiceCardDefinition(args.Services, portfolioId, context);
};

MlResolver.MlMutationResolver['updateBeSpokeService'] = (obj, args, context, info) => {
  return mlServiceCardRepo.updateBespokeServiceCardDefinition(args.Services, context);
};


MlResolver.MlMutationResolver['createService'] = (obj, args, context, info) => {
  return mlServiceCardRepo.createServiceCardDefinition(args.Services, context);
};

MlResolver.MlMutationResolver['updateService'] = (obj, args, context, info) => {
  return mlServiceCardRepo.updateServiceCardDefinition(args.Services, args.serviceId, context)
};

MlResolver.MlMutationResolver['createServiceCardOrder'] = (obj, args, context, info) => {
  return mlServiceCardRepo.createServiceCardOrder(args, context)
};

MlResolver.MlMutationResolver['updateServiceCardOrder'] = (obj, args, context, info) => {
    var ret = mlServiceCardRepo.updateServiceCardOrder(args, context)
    if(!ret.success){
      return ret;
    }

    let serviceOrder = mlDBController.findOne('MlScOrder', {orderId: args.userServiceCardPaymentInfo.orderId}, context);
    if(!serviceOrder || (serviceOrder && !serviceOrder.serviceId))
      return new MlRespPayload().errorPayload("Error In Fetching Service Order", 400);

    ret = mlServiceCardRepo.createServiceCard(serviceOrder.serviceId, serviceOrder.orderId, context)
    if(!ret.success)
      return ret;

    ret = mlServiceCardRepo.createServiceLedger(serviceOrder.serviceId, context)
    if(ret.success)
      return ret;
};

// This Resolver need to move to internal users as it should undergo to authorization
MlResolver.MlMutationResolver['updateServiceAdmin'] = (obj, args, context, info) => {
  if (!_.isEmpty(args.Services)) {
    var service = mlDBController.findOne('MlServiceCardDefinition', {_id: args.serviceId}, context);
    if (service) {
      args.Services.userId = service.userId;
      args.Services.updatedAt = new Date();
      args.Services.transactionId = service.transactionId;
      args.Services.versions = args.Services.isApproved ? Math.ceil(service.versions) : (service.versions + 0.001);
      for(key in service){
        if ((typeof args.Services[key] === 'undefined' || args.Services[key] === null || !args.Services[key]) && key !== 'createdAt' && key !== '_id') {
          args.Services[key] = service[key];
        }
      }
      let result = mlDBController.update('MlServiceCardDefinition', {_id: service._id}, args.Services, {$set: 1}, context);
      if(result){
        let code = 200;
        let response = new MlRespPayload().successPayload(result, code);
        return response
      }
    } else {
      let code = 404;
      let response = new MlRespPayload().successPayload('Service not found', code);
      return response
    }
  } else {
    let code = 400;
    let response = new MlRespPayload().successPayload('Data are required', code);
    return response
  }
};

MlResolver.MlMutationResolver['updateServiceSendReview'] = (obj, args, context, info) => {
  let serviceId = args.serviceId;
  if(!serviceId) {
    let code = 400;
    let response = new MlRespPayload().errorPayload('Data are required', code);
    return response
  }
  let service = mlDBController.findOne('MlServiceCardDefinition', serviceId, context);
  if (!service) {
    let code = 404;
    let response = new MlRespPayload().errorPayload('Service not found', code);
    return response
  }

  let result = mlDBController.update('MlServiceCardDefinition', {_id: service._id}, {isLive: false, isReview: true}, {$set: 1}, context);
  if(result){
    let code = 200;
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
};

MlResolver.MlMutationResolver['updateServiceGoLive'] = (obj, args, context, info) => {
  let serviceId = args.serviceId;
  if(!serviceId) {
    let code = 400;
    let response = new MlRespPayload().errorPayload('Data are required', code);
    return response
  }
  let service = mlDBController.findOne('MlServiceCardDefinition', serviceId, context);
  if (!service) {
    let code = 404;
    let response = new MlRespPayload().errorPayload('Service not found', code);
    return response
  }
  if(!service.isApproved){
    let code = 404;
    let response = new MlRespPayload().errorPayload('Service not activated, Please send for review', code);
    return response
  }
  let result = mlDBController.update('MlServiceCardDefinition', {_id: service._id}, {isLive: true}, {$set: 1}, context);
  if(result){
    let code = 200;
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
};

MlResolver.MlQueryResolver['fetchTasksAmount'] = (obj, args, context, info) => {
  // let profileId = args.profileId
  let temp = [];
  let details = mlDBController.find('MlService', {'userId':context.userId, 'profileId': args.profileId}, context).fetch()
  details.map(function(val){
  if (val.tasks) {
    val.tasks.map(function(data) {
      temp.push(data)
      })
    }
  })
  let amount = mlDBController.find('MlTask', {'_id': {$in: temp}}, context).fetch()
  let totalAmountOfTasks = []
    amount.map(function(data) {
      totalAmountOfTasks.push({
        totalAmount:data.payment.derivedAmount
        })
    });
  return totalAmountOfTasks;
}

MlResolver.MlQueryResolver['getProfileBasedOnPortfolio'] = (obj, args, context, info) => {
  let query = {
    _id: args.portfolioId
  };
  let result = mlDBController.findOne('MlPortfolioDetails', query , context)
  return result;
};

MlResolver.MlQueryResolver['getServiceBasedOnServiceId'] = (obj, args, context, info) => {
  let query = {
    _id: args.serviceId,
    isCurrentVersion: true
  };
  let result = mlDBController.findOne('MlServiceCardDefinition', query , context);
  return result;
};

MlResolver.MlQueryResolver['getTaskFromService'] = (obj, args, context, info) => {
  let query = {
  _id: args.serviceId
  };
  let result = mlDBController.findOne('MlService', query , context)
  return result;
};




