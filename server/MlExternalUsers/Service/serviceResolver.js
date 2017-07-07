/**
 * Created by Mukhil on 20/6/17.
 */

import MlResolver from '../../commons/mlResolverDef'
import MlRespPayload from '../../commons/mlPayload'
import MlUserContext from '../../MlExternalUsers/mlUserContext'
var extendify = require('extendify');
var _ = require('lodash')

MlResolver.MlQueryResolver['fetchUserServices'] = (obj, args, context, info) => {
  let query = {
    userId: context.userId,
    profileId:args.profileId
  };
    let result = mlDBController.find('MlService', query , context).fetch()
  return result;
}

MlResolver.MlQueryResolver['findService'] = (obj, args, context, info) => {
  let result = mlDBController.findOne('MlService', {_id:args.serviceId} , context)
  return result;
}

MlResolver.MlMutationResolver['createService'] = (obj, args, context, info) => {
  args.Services.createdAt = new Date();
  args.Services.userId = context.userId;
  let  result1 = mlDBController.insert('MlService' ,args.Services, context)
  if(result1){
    let code = 200;
    let result = result1;
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }

}

MlResolver.MlMutationResolver['updateService'] = (obj, args, context, info) => {
  args.Services.userId = context.userId;
  if(args.Services.tasks){
    let taskIds = args.Services.tasks.map(function (task) { return task.id; });
    let tasks = mlDBController.find('MlTask', {_id: { $in : taskIds } }, context).fetch();
    let taskAmount = 0;
    let taskDerivedAmount = 0;
    tasks.forEach(function (task) {
      taskAmount += task.payment && task.payment.amount ? task.payment.amount : 0;
      taskDerivedAmount += task.payment && task.payment.derivedAmount ? task.payment.derivedAmount : 0;
    });
    args.Services.payment = args.Services.payment ? args.Services.payment : {};
    args.Services.payment["tasksAmount"] = taskAmount;
    args.Services.payment["tasksDiscount"] = taskAmount - taskDerivedAmount;
    args.Services.payment["tasksDerived"] = taskDerivedAmount;
    args.Services.payment["amount"] = taskDerivedAmount;
  }
  let result1 = mlDBController.update('MlService', {_id:args.serviceId} ,args.Services,{$set: 1}, context)
  if(result1){
    let code = 200;
    let result = result1
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlMutationResolver['updateServiceAdmin'] = (obj, args, context, info) => {
  if(args.Services.tasks){
    let taskIds = args.Services.tasks.map(function (task) { return task.id; });
    let tasks = mlDBController.find('MlTask', {_id: { $in : taskIds } }, context).fetch();
    let taskAmount = 0;
    let taskDerivedAmount = 0;
    tasks.forEach(function (task) {
      taskAmount += task.payment && task.payment.amount ? task.payment.amount : 0;
      taskDerivedAmount += task.payment && task.payment.derivedAmount ? task.payment.derivedAmount : 0;
    });
    args.Services.payment = args.Services.payment ? args.Services.payment : {};
    args.Services.payment["tasksAmount"] = taskAmount;
    args.Services.payment["tasksDiscount"] = taskAmount - taskDerivedAmount;
    args.Services.payment["tasksDerived"] = taskDerivedAmount;
    args.Services.payment["amount"] = taskDerivedAmount;
  }
  let result1 = mlDBController.update('MlService', {_id:args.serviceId} ,args.Services,{$set: 1}, context)
  if(result1){
    let code = 200;
    let result = result1
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

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
    })
  return totalAmountOfTasks;
}

MlResolver.MlQueryResolver['getProfileBasedOnPortfolio'] = (obj, args, context, info) => {
  let query = {
    _id: args.portfolioId
  };
  let result = mlDBController.findOne('MlPortfolioDetails', query , context)
  return result;
}

MlResolver.MlQueryResolver['getServiceBasedOnProfileId'] = (obj, args, context, info) => {
  let query = {
    profileId: args.profileId
  };
  let result = mlDBController.findOne('MlService', query , context)
  return result;
}

MlResolver.MlQueryResolver['getTaskFromService'] = (obj, args, context, info) => {
  let query = {
  _id: args.serviceId
  };
  let result = mlDBController.findOne('MlService', query , context)
  return result;
}




