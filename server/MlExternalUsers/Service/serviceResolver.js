/**
 * Created by Mukhil on 20/6/17.
 */

import MlResolver from '../../commons/mlResolverDef';
import MlRespPayload from '../../commons/mlPayload';
import MlUserContext from '../../MlExternalUsers/mlUserContext';
import MlSubChapterAccessControl from './../../mlAuthorization/mlSubChapterAccessControl';
import mlServiceCardRepo from '../servicecards/servicecardRepo'

const extendify = require('extendify');
const _ = require('lodash');

MlResolver.MlQueryResolver.fetchUserServices = (obj, args, context, info) => {
  const portfolio = mlDBController.findOne('MlPortfolioDetails', { _id: args.profileId }, context);
  const userId = context.userId;
  if (portfolio) {
    const profile = new MlUserContext().userProfileDetails(userId);
    console.log(profile);
    var query = {
      userId: portfolio.userId,
      profileId: portfolio.profileId,
      isCurrentVersion: true,
      isBeSpoke: false,
      status: 'Gone Live',
      'community.id': { $in: ['all', profile.communityDefCode] },
      // "cluster.id": { "$in" : [ 'all', profile.clusterId ] },
      // "state.id": { "$in" : [ 'all', profile.chapterId ] },
      validTill: { $gte: new Date() }
    };
    const result = mlDBController.find('MlServiceCardDefinition', query, context).fetch();
    return result;
  }
  if (args.profileId === 'all') {
    var query = { userId: context.userId, isCurrentVersion: true, isBeSpoke: false };
  } else {
    var query = {
      userId: context.userId, profileId: args.profileId, isCurrentVersion: true, isBeSpoke: false
    };
  }
  const result = mlDBController.find('MlServiceCardDefinition', query, context).fetch()
  return result;
}

MlResolver.MlQueryResolver.fetchServicesForAppointments = (obj, args, context, info) => {
  const profileId = args.profileId;
  const query = {
    userId: context.userId,
    isLive: true,
    isBeSpoke: false,
    profileId
  };
  const result = mlDBController.find('MlServiceCardDefinition', query, context).fetch();
  return result;
}


MlResolver.MlQueryResolver.fetchBeSpokeServices = (obj, args, context, info) => {
  const portfolio = mlDBController.findOne('MlPortfolioDetails', { _id: args.portfolioId }, context)
  if (portfolio && (context.userId !== portfolio.userId)) {
    if (portfolio) {
      const query = {
        userId: portfolio.userId,
        profileId: portfolio.profileId,
        isCurrentVersion: true,
        isBeSpoke: true,
        beSpokeCreatorUserId: context.userId,
        beSpokeCreatorProfileId: new MlUserContext().userProfileDetails(context.userId).profileId
      };
      const result = mlDBController.find('MlServiceCardDefinition', query, context).fetch()
      return result;
    }
  } else {
    const query = {
      userId: context.userId,
      profileId: new MlUserContext().userProfileDetails(context.userId).profileId,
      isCurrentVersion: true,
      isBeSpoke: true
    };
    const result = mlDBController.find('MlServiceCardDefinition', query, context).fetch()
    return result;
  }
}

MlResolver.MlQueryResolver.findService = (obj, args, context, info) => {
  const result = mlDBController.findOne('MlServiceCardDefinition', { _id: args.serviceId }, context);
  if (result) {
    const query = {
      transactionId: result.transactionId,
      isCurrentVersion: true
    };
    const service = mlDBController.findOne('MlServiceCardDefinition', query, context);
    return service;
  }

  const code = 404;
  const response = new MlRespPayload().errorPayload('Service not found', code);
  return response;
}

MlResolver.MlMutationResolver.createBeSpokeService = (obj, args, context, info) => {
  const portfolioId = args.portfolioId;
  const portfolioDetails = mlDBController.findOne('MlPortfolioDetails', { _id: portfolioId }, context);
  const subChapterId = portfolioDetails && portfolioDetails.subChapterId ? portfolioDetails.subChapterId : '';
  const mlSubChapterAccessControl = MlSubChapterAccessControl.getAccessControl('TRANSACT', context, subChapterId);
  if (!mlSubChapterAccessControl.hasAccess) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('You do not have access to transact', code);
    return response;
  }
  return mlServiceCardRepo.createBespokeServiceCardDefinition(args.Services, portfolioId, context);
};

MlResolver.MlMutationResolver.updateBeSpokeService = (obj, args, context, info) => mlServiceCardRepo.updateBespokeServiceCardDefinition(args.Services, context);

MlResolver.MlMutationResolver.cloneServiceCard = (obj, args, context, info) => mlServiceCardRepo.cloneServiceCard(args.serviceId, context);


MlResolver.MlMutationResolver.createService = (obj, args, context, info) => mlServiceCardRepo.createServiceCardDefinition(args.Services, context);

MlResolver.MlMutationResolver.updateService = (obj, args, context, info) => mlServiceCardRepo.updateServiceCardDefinition(args.Services, args.serviceId, context);

MlResolver.MlMutationResolver.createServiceCardOrder = (obj, args, context, info) => mlServiceCardRepo.createServiceCardOrder(args, context);

MlResolver.MlMutationResolver.checkServiceSubChapterAccessControl = (obj, args, context, info) => {
  const serviceId = args.serviceId;
  const serviceDetails = mlDBController.findOne('MlServiceCardDefinition', serviceId, context);
  if (serviceDetails.userId == context.userId) {
    const code = 400;
    response = new MlRespPayload().errorPayload('You can not book your own service', code);
    return response;
  }
  const subChapterId = serviceDetails && serviceDetails.subChapterId ? serviceDetails.subChapterId : '';
  const mlSubChapterAccessControl = MlSubChapterAccessControl.getAccessControl('TRANSACT', context, subChapterId);
  let response;
  if (!mlSubChapterAccessControl.hasAccess) {
    const code = 400;
    response = new MlRespPayload().errorPayload('You do not have access to transact', code);
  } else {
    const code = 200;
    response = new MlRespPayload().successPayload('You have access to transact', code);
  }
  return response;
};

MlResolver.MlMutationResolver.updateServiceCardOrder = (obj, args, context, info) => {
  let ret = mlServiceCardRepo.updateServiceCardOrder(args, context)
  if (!ret.success) {
    return ret;
  }

  const serviceOrder = mlDBController.findOne('MlScOrder', { orderId: args.userServiceCardPaymentInfo.orderId }, context);
  if (!serviceOrder || (serviceOrder && !serviceOrder.serviceId)) { return new MlRespPayload().errorPayload('Error In Fetching Service Order', 400); }

  ret = mlServiceCardRepo.createServiceCard(serviceOrder.serviceId, serviceOrder.orderId, context)
  if (!ret.success) { return ret; }

  ret = mlServiceCardRepo.createServiceLedger(serviceOrder.serviceId, context)
  if (ret.success) { return ret; }
};

// This Resolver need to move to internal users as it should undergo to authorization
MlResolver.MlMutationResolver.updateServiceAdmin = (obj, args, context, info) => {
  if (!_.isEmpty(args.Services)) {
    const service = mlDBController.findOne('MlServiceCardDefinition', { _id: args.serviceId }, context);
    if (service) {
      const isSave = typeof args.Services.isApproved === 'undefined';
      args.Services.userId = service.userId;
      args.Services.updatedAt = new Date();
      args.Services.transactionId = service.transactionId;
      args.Services.versions = args.Services.isApproved ? Math.ceil(service.versions) : (service.versions + 0.001);
      for (key in service) {
        if ((typeof args.Services[key] === 'undefined' || args.Services[key] === null || !args.Services[key]) && key !== 'createdAt' && key !== '_id') {
          args.Services[key] = service[key];
        }
      }
      if (!isSave) {
        if (args.Services.isApproved) {
          args.Services.status = 'Admin Approved';
        } else {
          args.Services.status = 'Rejected';
        }
        args.Services.isCurrentVersion = false;
      }

      console.log(' args.Services', args.Services);
      const result = mlDBController.update('MlServiceCardDefinition', { _id: service._id }, args.Services, { $set: 1 }, context);
      if (result) {
        const serviceInfo = args.Services;
        serviceInfo.userId = service.userId;
        serviceInfo.updatedAt = new Date();
        serviceInfo.transactionId = service.transactionId;
        serviceInfo.versions = args.Services.versions + 0.001;
        serviceInfo.status = args.Services.status;
        serviceInfo.isReview = false;
        serviceInfo.isCurrentVersion = true;
        delete serviceInfo._id;
        if (!isSave) {
          const newScVersion = mlDBController.insert('MlServiceCardDefinition', serviceInfo, context);
        }
        const code = 200;
        const response = new MlRespPayload().successPayload(result, code);
        return response
      }
    } else {
      const code = 404;
      const response = new MlRespPayload().successPayload('Service not found', code);
      return response
    }
  } else {
    const code = 400;
    const response = new MlRespPayload().successPayload('Data are required', code);
    return response
  }
};

MlResolver.MlMutationResolver.updateServiceSendReview = (obj, args, context, info) => {
  const serviceId = args.serviceId;
  if (!serviceId) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Data are required', code);
    return response
  }
  const service = mlDBController.findOne('MlServiceCardDefinition', serviceId, context);
  if (!service) {
    const code = 404;
    const response = new MlRespPayload().errorPayload('Service not found', code);
    return response
  }
  const result = mlDBController.update('MlServiceCardDefinition', { _id: service._id }, { isLive: false, isReview: true, status: 'Send For Review' }, { $set: 1 }, context);
  if (result) {
    const code = 200;
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
};

MlResolver.MlMutationResolver.updateServiceGoLive = (obj, args, context, info) => {
  const serviceId = args.serviceId;
  if (!serviceId) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Data are required', code);
    return response
  }
  const service = mlDBController.findOne('MlServiceCardDefinition', serviceId, context);
  if (!service) {
    const code = 404;
    const response = new MlRespPayload().errorPayload('Service not found', code);
    return response
  }
  if (!service.isApproved) {
    const code = 404;
    const response = new MlRespPayload().errorPayload('Service not activated, Please send for review', code);
    return response
  }
  const result = mlDBController.update('MlServiceCardDefinition', { _id: service._id }, { isLive: true, status: 'Gone Live' }, { $set: 1 }, context);
  if (result) {
    mlDBController.update('MlServiceCardDefinition', { transactionId: service.transactionId, versions: parseInt(service.versions) }, { isLive: true, status: 'Gone Live' }, { $set: 1 }, context);
    const code = 200;
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
};

MlResolver.MlQueryResolver.fetchTasksAmount = (obj, args, context, info) => {
  // let profileId = args.profileId
  const temp = [];
  const details = mlDBController.find('MlService', { userId: context.userId, profileId: args.profileId }, context).fetch()
  details.map((val) => {
    if (val.tasks) {
      val.tasks.map((data) => {
        temp.push(data)
      })
    }
  })
  const amount = mlDBController.find('MlTask', { _id: { $in: temp } }, context).fetch()
  const totalAmountOfTasks = []
  amount.map((data) => {
    totalAmountOfTasks.push({
      totalAmount: data.payment.derivedAmount
    })
  });
  return totalAmountOfTasks;
}

/**
 * @Note: this is portfolio thing need to move to portfolio Resolver
 * @Duplicate of "findPortfolioDetails"
 * */

MlResolver.MlQueryResolver.getProfileBasedOnPortfolio = (obj, args, context, info) => {
  const query = {
    _id: args.portfolioId
  };
  const result = mlDBController.findOne('MlPortfolioDetails', query, context)
  return result;
};

MlResolver.MlQueryResolver.getBeSpokeForAppointments = (obj, args, context, info) => {
  const query = {
    _id: args.serviceId
  };
  const result = mlDBController.findOne('MlServiceCardDefinition', query, context);
  return result;
};

MlResolver.MlQueryResolver.getServiceBasedOnServiceId = (obj, args, context, info) => {
  const query = {
    _id: args.serviceId
  };
  const result = mlDBController.findOne('MlServiceCardDefinition', query, context);
  return result;
};

MlResolver.MlQueryResolver.getTaskFromService = (obj, args, context, info) => {
  const query = {
    _id: args.serviceId
  };
  const result = mlDBController.findOne('MlService', query, context)
  return result;
};

