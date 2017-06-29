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
    userId:context.userId,
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
  // args.Services.createdAt = new Date();
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

