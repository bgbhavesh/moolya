/**
 * Created by Mukhil on 14/6/17.
 */

import MlResolver from "../../commons/mlResolverDef";
import MlRespPayload from "../../commons/mlPayload";
var _ = require('lodash')

MlResolver.MlQueryResolver['fetchTasks'] = (obj, args, context, info) => {
  let query = {
    userId:context.userId,
    profileId:args.profileId
  };
  let result = mlDBController.find('MlTask', query, context).fetch()
  return result;

}

MlResolver.MlQueryResolver['fetchTask'] = (obj, args, context, info) => {
  let result = mlDBController.findOne('MlTask', {_id: args.taskId}, context) || []
  return result
}

MlResolver.MlMutationResolver['createTask'] = (obj, args, context, info) => {
  if (args.taskDetails) {
    let userId = context.userId
    orderNumberGenService.createTaskId(args.taskDetails);
    let obj = args.taskDetails
    obj['userId'] = userId
    obj['createdAt'] = new Date ()
    let res = mlDBController.insert('MlTask', args.taskDetails, context)
    if (res) {
      let code = 200;
      let result = res
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  } else {
    let code = 400;
    let response = new MlRespPayload().errorPayload('Data required', code);
    return response
  }
}

MlResolver.MlMutationResolver['updateTask'] = (obj, args, context, info) => {
  if(!_.isEmpty(args.taskDetails)){
    let task = mlDBController.findOne('MlTask', {_id: args.taskId}, context)
    if(task){
      if(!_.isEmpty(args.taskDetails.session)){
        let countSessionAry = []
        _.each(args.taskDetails.session,function (item,say) {   //attaching sessionId in session array
          if(!item.sessionId)
            orderNumberGenService.createSessionId(item);
          countSessionAry.push(item)
        })
        args.taskDetails.session = countSessionAry;
        let activity = _.map(args.taskDetails.session, 'activities')
        let act= []
        _.each(activity, function (item,say) {   //removing the empty array
          if(!_.isEmpty(item))
            act.push(item)
        })

        let costAry = [];
        let activitiesAmount = [];
        let activitiesDerivedAmount = [];
        _.each(act,function (item,say) {    //amount calculation based on activity
          let details = mlDBController.find('MlActivity',{_id:{$in:item}}, context).fetch()
          let amount = _.map(details, 'payment.amount');
          _.each(amount, function (i,s) {
            activitiesAmount.push(i)
          });
          let derivedAmount = _.map(details, 'payment.derivedAmount');
          _.each(derivedAmount, function (i,s) {
            activitiesDerivedAmount.push(i)
          });
        });
        let finalActivitiesAmount = _.sum(activitiesAmount);
        let finalActivitiesDerivedAmount = _.sum(activitiesDerivedAmount);
        let pick;
        if(args.taskDetails.payment)   //picking up the last details without amount
          pick = _.pick(args.taskDetails.payment, ['activitiesDerived', 'activitiesDiscount', 'activitiesAmount', 'isDiscount','discountType','discountValue', 'derivedAmount'])
        else
          pick = _.pick(task.payment, ['activitiesDerived', 'activitiesDiscount', 'activitiesAmount', 'isDiscount','discountType','discountValue', 'derivedAmount'])
        let paymentAmount = {
          activitiesAmount: finalActivitiesAmount,
          activitiesDiscount: finalActivitiesDerivedAmount - finalActivitiesAmount,
          activitiesDerived: finalActivitiesDerivedAmount,
          amount: finalActivitiesDerivedAmount
        };
        paymentAmount = _.extend(paymentAmount, pick)
        args.taskDetails = _.extend(args.taskDetails, {payment:paymentAmount})
      }

      for(key in args.taskDetails){
        task[key] = args.taskDetails[key]
      }

      args.taskDetails['updatedAt'] = new Date()
      // let result = mlDBController.update('MlTask', {_id: args.taskId}, args.taskDetails, {'$set': 1}, context)
      let result = mlDBController.update('MlTask', {_id: args.taskId}, task, {'$set': 1}, context)
      if (result) {
        let code = 200;
        let response = new MlRespPayload().successPayload('Successfully Updated', code);
        return response
      }
    }else {
      let code = 400;
      let response = new MlRespPayload().errorPayload('Require a valid Task', code);
      return response
    }
  }else{
    let code = 400;
    let response = new MlRespPayload().errorPayload('Cannot save empty task', code);
    return response
  }


}

MlResolver.MlQueryResolver['fetchTaskDetails'] = (obj, args, context, info) => {
  let result = mlDBController.findOne('MlTask', {_id:args.name}, context)
  return result;

}


