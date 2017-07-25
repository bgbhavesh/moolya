/**
 * Created by Mukhil on 14/6/17.
 */

import MlResolver from "../../commons/mlResolverDef";
import MlRespPayload from "../../commons/mlPayload";
var _ = require('lodash')

MlResolver.MlQueryResolver['fetchTasks'] = (obj, args, context, info) => {
  let query = {
    userId: context.userId,
    isCurrentVersion: true
  };
  if(args.profileId){
    query.profileId = args.profileId;
  };
  let result = mlDBController.find('MlTask', query, context).fetch()
  return result;
}

MlResolver.MlQueryResolver['fetchTask'] = (obj, args, context, info) => {
  let result = mlDBController.findOne('MlTask', {_id: args.taskId} , context);
  if (result) {
    let query = {
      transactionId: result.transactionId,
      isCurrentVersion: true
    };
    let task = mlDBController.findOne('MlTask', query, context);
    return task;
  } else  {
    let code = 404;
    let response = new MlRespPayload().successPayload('Task not found', code);
    return response;
  }
}

MlResolver.MlMutationResolver['createTask'] = (obj, args, context, info) => {
  if (args.taskDetails) {
    orderNumberGenService.createTaskId(args.taskDetails);
    args.taskDetails.userId = context.userId;
    args.taskDetails.createdAt = new Date ();
    args.taskDetails.versions = 0.001;
    args.taskDetails.isCurrentVersion = true;
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
    let oldTask = mlDBController.findOne('MlTask', {_id: args.taskId}, context);
    let task;
    if (oldTask) {
      let query = {
        transactionId: oldTask.transactionId,
        isCurrentVersion: true
      };
      task = mlDBController.findOne('MlTask', query, context);
    }
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
            activitiesAmount.push(i ? i : 0);
          });
          let derivedAmount = _.map(details, 'payment.derivedAmount');
          _.each(derivedAmount, function (i,s) {
            activitiesDerivedAmount.push(i ? i : 0);
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
          activitiesDiscount: finalActivitiesAmount - finalActivitiesDerivedAmount,
          activitiesDerived: finalActivitiesDerivedAmount,
          amount: finalActivitiesDerivedAmount
        };
        paymentAmount = _.extend(paymentAmount, pick)
        args.taskDetails = _.extend(args.taskDetails, {payment:paymentAmount})
      }
      task.isCurrentVersion = false;
      let updatedOldVersionTask = mlDBController.update('MlTask', {_id: task._id}, task, {'$set':1}, context);
      args.taskDetails.isCurrentVersion = true;
      args.taskDetails.userId = task.userId;
      // args.taskDetails.transactionId = task.transactionId;
      args.taskDetails.updatedAt = new Date();
      args.taskDetails.versions = task.versions + 0.001;
      args.taskDetails.attachments = (args.taskDetails.attachments && args.taskDetails.attachments.length > 0) ?
        args.taskDetails.attachments : task.attachments;
      for(key in task){
        if ((typeof args.taskDetails[key] === 'undefined' || args.taskDetails[key] === null) && key !== 'createdAt' && key !== '_id') {
          args.taskDetails[key] = task[key];
        }
      }
      let newVersionActivity = mlDBController.insert('MlTask', args.taskDetails , context);
      if (newVersionActivity) {
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
};


MlResolver.MlQueryResolver['fetchTasksInBooking'] = (obj, args, context, info) => {
  let result = mlDBController.find('MlTask', {_id:{$in:args.id}}, context).fetch()
  return result;
};


MlResolver.MlQueryResolver['fetchTaskDetailsForServiceCard'] = (obj, args, context, info) => {
  let query = {
    userId: context.userId,
    isExternal: true,
    isActive: true,
    isServiceCardEligible: true
  };
  if (args.serviceId) {
    let service = mlDBController.findOne('MlServiceCardDefinition', args.serviceId , context);
    let taskQuery = [];
    if (service.tasks && service.tasks.length > 0) {
      taskQuery = service.tasks.reduce(function(result, task) {
        return result.concat(task.id);
      }, []);
      taskQuery = _.uniq(taskQuery);
    }
    query["$or"] = [
      {_id: {'$in': taskQuery}},
      {isCurrentVersion: true}
    ];
  }
  if(args.profileId){
    query.profileId = args.profileId;
  };
  let result = mlDBController.find('MlTask', query, context).fetch();
  if (result && result.length > 0) {
    result.map((task, taskIndex) => {
      if (task.session && task.session.length > 0) {
        task.session.map((taskSession, sessionIndex) => {
          if (taskSession.activities && taskSession.activities.length > 0) {
            taskSession.activities.map((activityId, index) => {
              if (activityId) {
                let activity = mlDBController.findOne('MlActivity', activityId , context);
                result[taskIndex]['session'][sessionIndex]['activities'][index] = activity;
              }
            })
          }
        });
      }
    });
  }
  return result;
};

MlResolver.MlQueryResolver['fetchTaskDetailsForAdminServiceCard'] = (obj, args, context, info) => {
  let query = {
    // userId: context.userId,
    isExternal: true,
    isActive: true,
    isServiceCardEligible: true
  };
  if (args.serviceId) {
    let service = mlDBController.findOne('MlServiceCardDefinition', args.serviceId , context);
    let taskQuery = [];
    if (service.tasks && service.tasks.length > 0) {
      taskQuery = service.tasks.reduce(function(result, task) {
        return result.concat(task.id);
      }, []);
      taskQuery = _.uniq(taskQuery);
    }
    query["$or"] = [
      {_id: {'$in': taskQuery}},
      {isCurrentVersion: true}
    ];
  }
  if(args.profileId){
    query.profileId = args.profileId;
  };
  let result = mlDBController.find('MlTask', query, context).fetch()
  return result;
};

MlResolver.MlQueryResolver['fetchTaskForApointment'] = (obj, args, context, info) => {
  if (args.taskId) {
    let result = mlDBController.findOne('MlTask', args.taskId, context);
    if (result) {
      if (result.session && result.session.length > 0) {
        result.session.map((taskSession, sessionIndex) => {
          if (taskSession.activities && taskSession.activities.length > 0) {
            taskSession.activities.map((activityId, index) => {
              if (activityId) {
                let activity = mlDBController.findOne('MlActivity', activityId, context);
                result['session'][sessionIndex]['activities'][index] = activity;
              }
            })
          }
        });
      }
    }
    return result;
  }
};
