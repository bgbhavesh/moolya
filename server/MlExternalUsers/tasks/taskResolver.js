/**
 * Created by Mukhil on 14/6/17.
 */

import MlResolver from '../../commons/mlResolverDef';
import MlRespPayload from '../../commons/mlPayload';
const _ = require('lodash')

MlResolver.MlQueryResolver.fetchTasks = (obj, args, context, info) => {
  const query = {
    userId: context.userId,
    isCurrentVersion: true
  };
  if (args.profileId !== 'all') {
    query.profileId = args.profileId;
  }
  const result = mlDBController.find('MlTask', query, context).fetch()
  return result;
}

MlResolver.MlQueryResolver.fetchTask = (obj, args, context, info) => {
  const result = mlDBController.findOne('MlTask', { _id: args.taskId }, context);
  if (result) {
    const query = {
      transactionId: result.transactionId,
      isCurrentVersion: true
    };
    const task = mlDBController.findOne('MlTask', query, context);
    return task;
  }
  const code = 404;
  const response = new MlRespPayload().successPayload('Task not found', code);
  return response;
}

MlResolver.MlMutationResolver.createTask = (obj, args, context, info) => {
  if (args.taskDetails) {
    const name = args.taskDetails.name;
    const displayName = args.taskDetails.displayName;
    const profileId = args.taskDetails.profileId;
    const taskInfo = mlDBController.findOne('MlTask', { profileId, isCurrentVersion: true, $or: [{ name }, { displayName }] }, context);
    if (taskInfo) {
      const code = 400;
      let response;
      if (taskInfo.name == name) {
        // response = new MlRespPayload().errorPayload('Activity already exists', code)
        response = new MlRespPayload().errorPayload('Task name already exists', code)
      } else {
        response = new MlRespPayload().errorPayload('Task display name already exists', code)
      }
      return response
    }

    orderNumberGenService.createTaskId(args.taskDetails);
    args.taskDetails.userId = context.userId;
    args.taskDetails.createdAt = new Date();
    args.taskDetails.versions = 0.001;
    args.taskDetails.isCurrentVersion = true;
    const res = mlDBController.insert('MlTask', args.taskDetails, context)
    if (res) {
      const code = 200;
      const result = res;
      const response = new MlRespPayload().successPayload(result, code);
      return response
    }
  } else {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Data required', code);
    return response
  }
}

MlResolver.MlMutationResolver.updateTask = (obj, args, context, info) => {
  if (!_.isEmpty(args.taskDetails)) {
    const oldTask = mlDBController.findOne('MlTask', { _id: args.taskId }, context);
    let task;
    if (oldTask) {
      const name = args.taskDetails.name;
      const displayName = args.taskDetails.displayName;
      const profileId = args.taskDetails.profileId;
      const taskInfo = mlDBController.findOne('MlTask', {
        transactionId: { $ne: oldTask.transactionId }, profileId, isCurrentVersion: true, $or: [{ name }, { displayName }]
      }, context);
      if (taskInfo) {
        const code = 400;
        let response;
        if (taskInfo.name == name) {
          // response = new MlRespPayload().errorPayload('Activity already exists', code)
          response = new MlRespPayload().errorPayload('Activity name already exists', code)
        } else {
          response = new MlRespPayload().errorPayload('Activity display name already exists', code)
        }
        return response
      }

      const query = {
        transactionId: oldTask.transactionId,
        isCurrentVersion: true
      };
      task = mlDBController.findOne('MlTask', query, context);
    }
    if (task) {
      if (!_.isEmpty(args.taskDetails.session)) {
        const countSessionAry = []
        _.each(args.taskDetails.session, (item, say) => { // attaching sessionId in session array
          if (!item.sessionId) { orderNumberGenService.createSessionId(item); }
          countSessionAry.push(item)
        })
        args.taskDetails.session = countSessionAry;
        const activity = _.map(args.taskDetails.session, 'activities')
        const act = []
        _.each(activity, (item, say) => { // removing the empty array
          if (!_.isEmpty(item)) { act.push(item) }
        })

        const costAry = [];
        const activitiesAmount = [];
        const activitiesDerivedAmount = [];
        _.each(act, (item, say) => { // amount calculation based on activity
          const details = mlDBController.find('MlActivity', { _id: { $in: item } }, context).fetch()
          const amount = _.map(details, 'payment.amount');
          _.each(amount, (i, s) => {
            activitiesAmount.push(i || 0);
          });
          const derivedAmount = _.map(details, 'payment.derivedAmount');
          _.each(derivedAmount, (i, s) => {
            activitiesDerivedAmount.push(i || 0);
          });
        });
        const finalActivitiesAmount = _.sum(activitiesAmount);
        const finalActivitiesDerivedAmount = _.sum(activitiesDerivedAmount);
        let pick;
        if (args.taskDetails.payment) // picking up the last details without amount
        { pick = _.pick(args.taskDetails.payment, ['activitiesDerived', 'activitiesDiscount', 'activitiesAmount', 'isDiscount', 'discountType', 'discountValue', 'derivedAmount', 'currencyType']) } else { pick = _.pick(task.payment, ['isDiscount', 'discountType', 'discountValue', 'derivedAmount']) }
        let paymentAmount = {
          activitiesAmount: finalActivitiesAmount,
          activitiesDiscount: parseFloat(finalActivitiesAmount - finalActivitiesDerivedAmount).round(2),
          activitiesDerived: finalActivitiesDerivedAmount,
          amount: finalActivitiesDerivedAmount,
          currencyType: args.taskDetails && args.taskDetails.payment && args.taskDetails.payment.currencyType ? args.taskDetails.payment.currencyType : ''
        };
        let newFinalAmount = finalActivitiesDerivedAmount;
        if (args.taskDetails.payment && args.taskDetails.payment.isDiscount && args.taskDetails.payment.discountValue > 0) {
          if (args.taskDetails.payment.discountType === 'amount') {
            newFinalAmount = parseFloat(finalActivitiesDerivedAmount).round(2) - parseFloat(args.taskDetails.payment.discountValue).round(2);
          } else {
            var newAmount = (parseFloat(finalActivitiesDerivedAmount).round(2) * parseFloat(args.taskDetails.payment.discountValue) / 100).round(2);
            newFinalAmount = parseFloat(finalActivitiesDerivedAmount).round(2) - parseFloat(newAmount).round(2);
          }
        } else if (task.payment && task.payment.isDiscount && task.payment.discountValue > 0) {
          if (task.payment.discountType === 'amount') {
            newFinalAmount = parseFloat(finalActivitiesDerivedAmount).round(2) - parseFloat(task.payment.discountValue).round(2);
          } else {
            var newAmount = (parseFloat(finalActivitiesDerivedAmount).round(2) * parseFloat(task.payment.discountValue) / 100).round(2);
            newFinalAmount = parseFloat(finalActivitiesDerivedAmount).round(2) - parseFloat(newAmount).round(2);
          }
        }
        paymentAmount = _.extend(paymentAmount, pick);
        paymentAmount.derivedAmount = newFinalAmount;
        args.taskDetails = _.extend(args.taskDetails, { payment: paymentAmount })
      }
      task.isCurrentVersion = false;
      const updatedOldVersionTask = mlDBController.update('MlTask', { _id: task._id }, task, { $set: 1 }, context);
      args.taskDetails.isCurrentVersion = true;
      args.taskDetails.userId = task.userId;
      // args.taskDetails.transactionId = task.transactionId;
      args.taskDetails.updatedAt = new Date();
      args.taskDetails.versions = task.versions + 0.001;
      args.taskDetails.attachments = (args.taskDetails.attachments && args.taskDetails.attachments.length > 0) ?
        args.taskDetails.attachments : task.attachments;
      for (key in task) {
        if ((typeof args.taskDetails[key] === 'undefined' || args.taskDetails[key] === null) && key !== 'createdAt' && key !== '_id') {
          args.taskDetails[key] = task[key];
        }
      }
      const newVersionActivity = mlDBController.insert('MlTask', args.taskDetails, context);
      if (newVersionActivity) {
        const code = 200;
        const response = new MlRespPayload().successPayload('Successfully Updated', code);
        return response
      }
    } else {
      const code = 400;
      const response = new MlRespPayload().errorPayload('Require a valid Task', code);
      return response
    }
  } else {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Cannot save empty task', code);
    return response
  }
}

MlResolver.MlQueryResolver.fetchTaskDetails = (obj, args, context, info) => {
  const result = mlDBController.findOne('MlTask', { _id: args.name }, context)
  return result;
};


MlResolver.MlQueryResolver.fetchTasksInBooking = (obj, args, context, info) => {
  const result = mlDBController.find('MlTask', { _id: { $in: args.id } }, context).fetch()
  return result;
};


MlResolver.MlQueryResolver.fetchTaskDetailsForServiceCard = (obj, args, context, info) => {
  let query;
  const orderId = args.orderId;
  if (args.profileId) {
    query = {
      userId: context.userId,
      profileId: args.profileId,
      isExternal: true,
      isActive: true,
      isServiceCardEligible: true
    };
  } else {
    query = {};
  }

  if (args.serviceId) {
    const service = mlDBController.findOne('MlServiceCardDefinition', args.serviceId, context);
    // console.log(service.tasks);
    let taskQuery = [];
    if (service.tasks && service.tasks.length > 0) {
      taskQuery = service.tasks.reduce((result, task) => result.concat(task.id), []);
      taskQuery = _.uniq(taskQuery);
    }
    query.$or = [
      { _id: { $in: taskQuery } }
    ];
    if (!orderId) {
      query.$or.push({ isCurrentVersion: true });
    }
  }
  const result = mlDBController.find('MlTask', query, context).fetch();
  // console.log('result',result);
  if (result && result.length > 0) {
    result.map((task, taskIndex) => {
      if (task.session && task.session.length > 0) {
        task.session.map((taskSession, sessionIndex) => {
          if (orderId) {
            const appointmentQuery = {
              isCancelled: false,
              'appointmentInfo.sessionId': taskSession.sessionId,
              'appointmentInfo.serviceOrderId': orderId
            };
            const appointment = mlDBController.findOne('MlAppointments', appointmentQuery);
            if (appointment) {
              result[taskIndex].session[sessionIndex].startDate = appointment.startDate;
              result[taskIndex].session[sessionIndex].status = appointment.status;
              result[taskIndex].session[sessionIndex].isRescheduled = appointment.isRescheduled;
            }
          }
          console.log('sessionId', taskSession.sessionId);
          if (taskSession.activities && taskSession.activities.length > 0) {
            taskSession.activities.map((activityId, index) => {
              if (activityId) {
                const activity = mlDBController.findOne('MlActivity', activityId, context);
                result[taskIndex].session[sessionIndex].activities[index] = activity;
              }
            })
          }
        });
      }
    });
  }
  return result;
};

MlResolver.MlQueryResolver.fetchTaskDetailsForAdminServiceCard = (obj, args, context, info) => {
  const query = {
    // userId: context.userId,
    isExternal: true,
    isActive: true,
    isServiceCardEligible: true
  };
  if (args.serviceId) {
    const service = mlDBController.findOne('MlServiceCardDefinition', args.serviceId, context);
    let taskQuery = [];
    if (service.tasks && service.tasks.length > 0) {
      taskQuery = service.tasks.reduce((result, task) => result.concat(task.id), []);
      taskQuery = _.uniq(taskQuery);
    }
    query.$or = [
      { _id: { $in: taskQuery } },
      { isCurrentVersion: true }
    ];
  }
  if (args.profileId) {
    query.profileId = args.profileId;
  }
  const result = mlDBController.find('MlTask', query, context).fetch()
  if (result && result.length > 0) {
    result.map((task, taskIndex) => {
      if (task.session && task.session.length > 0) {
        task.session.map((taskSession, sessionIndex) => {
          if (taskSession.activities && taskSession.activities.length > 0) {
            taskSession.activities.map((activityId, index) => {
              if (activityId) {
                const activity = mlDBController.findOne('MlActivity', activityId, context);
                result[taskIndex].session[sessionIndex].activities[index] = activity;
              }
            })
          }
        });
      }
    });
  }
  return result;
};

MlResolver.MlQueryResolver.fetchTaskForApointment = (obj, args, context, info) => {
  console.log(args);
  if (args.taskId) {
    const result = mlDBController.findOne('MlTask', args.taskId, context);
    if (result) {
      if (result.session && result.session.length > 0) {
        result.session.map((taskSession, sessionIndex) => {
          if (taskSession.activities && taskSession.activities.length > 0) {
            taskSession.activities.map((activityId, index) => {
              if (activityId) {
                const activity = mlDBController.findOne('MlActivity', activityId, context);
                result.session[sessionIndex].activities[index] = activity;
              }
            })
          }
        });
      }
    }
    return result;
  }
};

MlResolver.MlQueryResolver.fetchActivitiesTeams = (obj, args, context, info) => {
  const result = mlDBController.findOne('MlTask', { _id: args.taskId }, context);
  if (result) {
    const session = result.session && result.session.filter(session => session.sessionId === args.sessionId);
    const activityIds = session && session[0].activities;
    const activity = mlDBController.find('MlActivity', { _id: { $in: activityIds } }, context).fetch();
    return activity;
  }
  const code = 404;
  const response = new MlRespPayload().errorPayload('Task not found', code);
  return response;
};
