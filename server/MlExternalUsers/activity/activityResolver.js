/**
 * Created by Mukhil on 14/6/17.
 */

import MlResolver from '../../commons/mlResolverDef'
import MlRespPayload from '../../commons/mlPayload'
import MlUserContext from '../../MlExternalUsers/mlUserContext'
const _ = require('lodash')

MlResolver.MlQueryResolver.fetchActivities = (obj, args, context, info) => {
  if (args.profileId === 'all') {
    var query = { userId: context.userId, isCurrentVersion: true };
  } else {
    var query = { userId: context.userId, profileId: args.profileId, isCurrentVersion: true };
  }
  if (args.isInternal || args.isExternal) {
    const typeQuery = _.pickBy(args, _.isBoolean)
    query = _.extend(query, typeQuery)
  }
  const result = mlDBController.find('MlActivity', query, context).fetch()

  return result;
};
//
// MlResolver.MlQueryResolver['getTeamMembers'] = (obj, args, context, info) => {
// let temp = [];
// let temp1 = [];
//   let result = mlDBController.find('MlOffice', {userId:context.userId} , context).fetch()
//
//   result.map(function(communities){
//     communities.availableCommunities.id = communities._id
//     temp.push(communities.availableCommunities)
//   })
//   temp.map(function(community){
//     community.map(function(attributes){
//       attributes.id = community.id
//       temp1.push(attributes)
//     })
//   })
//
//   return temp1
// }
//
// MlResolver.MlQueryResolver['getTeamUsers'] = (obj, args, context, info) => {
//
//   let result = mlDBController.find('MlOfficeMembers', {userId:context.userId, officeId:args.Attributes.officeId, communityType:args.Attributes.communityType} , context).fetch()
//   return result;
// }
//
// MlResolver.MlQueryResolver['getBranchDetails'] = (obj, args, context, info) => {
//
//   let result = mlDBController.find('MlOffice', {userId:context.userId} , context).fetch()
//   return result;
// }

MlResolver.MlQueryResolver.fetchActivity = (obj, args, context, info) => {
  const result = mlDBController.findOne('MlActivity', { _id: args.activityId }, context);
  if (result) {
    const query = {
      transactionId: result.transactionId,
      isCurrentVersion: true
    };
    const activity = mlDBController.findOne('MlActivity', query, context);
    return activity;
  }
  const code = 404;
  const response = new MlRespPayload().successPayload('Activity not found', code);
  return response;
};

MlResolver.MlMutationResolver.createActivity = (obj, args, context, info) => {
  if (args.Details) {
    const name = args.Details.name;
    const displayName = args.Details.displayName;
    const profileId = args.Details.profileId;
    const activity = mlDBController.findOne('MlActivity', { profileId, isCurrentVersion: true, $or: [{ name }, { displayName }] }, context);
    if (activity) {
      const code = 400;
      let response;
      if (activity.name == name) {
        // response = new MlRespPayload().errorPayload('Activity already exists', code)
        response = new MlRespPayload().errorPayload('Activity name already exists', code)
      } else {
        response = new MlRespPayload().errorPayload('Activity display name already exists', code)
      }
      return response
    }

    args.Details.userId = context.userId;
    args.Details.isCurrentVersion = true;
    args.Details.createdAt = new Date();
    args.Details.versions = 0.001;
    orderNumberGenService.createActivityId(args.Details);
    const result = mlDBController.insert('MlActivity', args.Details, context)
    if (result) {
      const code = 200;
      const response = new MlRespPayload().successPayload(result, code);
      return response
    }
  } else {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Data required', code);
    return response
  }
}

MlResolver.MlMutationResolver.updateActivity = (obj, args, context, info) => {
  const oldVersionActivity = mlDBController.findOne('MlActivity', { _id: args.activityId }, context);
  let oldActiveActivity;
  if (oldVersionActivity) {
    const query = {
      transactionId: oldVersionActivity.transactionId,
      isCurrentVersion: true
    };
    oldActiveActivity = mlDBController.findOne('MlActivity', query, context);
  }
  if (oldActiveActivity) {
    /* let activity = _.omit(oldActiveActivity, 'payment');
    if (!args.Details.teams) {
      args.Details.teams = _.cloneDeep(oldActiveActivity.teams)
    } else if (args.Details.teams) {
      //activity = _.omit(oldActiveActivity, 'teams');
      activity.teams = args.Details.teams;
      //args.Details = _.cloneDeep(activity);
    }
    if (!args.Details.payment) {
      args.Details.payment = _.cloneDeep(oldActiveActivity.payment)
    } else if (args.Details.payment) {
      //activity = _.omit(oldActiveActivity, 'payment');
      activity.payment = args.Details.payment;
      //args.Details = _.cloneDeep(activity);
    }
    args.Details = _.cloneDeep(activity); */

    const name = args.Details.name;
    const displayName = args.Details.displayName;
    const profileId = args.Details.profileId;
    const activity = mlDBController.findOne('MlActivity', {
      transactionId: { $ne: oldActiveActivity.transactionId }, profileId, isCurrentVersion: true, $or: [{ name }, { displayName }]
    }, context);
    if (activity) {
      const code = 400;
      let response;
      if (activity.name == name) {
        // response = new MlRespPayload().errorPayload('Activity already exists', code)
        response = new MlRespPayload().errorPayload('Activity name already exists', code)
      } else {
        response = new MlRespPayload().errorPayload('Activity display name already exists', code)
      }
      return response
    }

    oldActiveActivity.isCurrentVersion = false;
    const updatedOldVersionActivity = mlDBController.update('MlActivity', { _id: oldActiveActivity._id }, oldActiveActivity, { $set: 1 }, context);
    args.Details.isCurrentVersion = true;
    args.Details.userId = oldActiveActivity.userId
    args.Details.updatedAt = new Date();
    args.Details.transactionId = oldActiveActivity.transactionId;
    args.Details.versions = oldActiveActivity.versions + 0.001;
    for (key in oldActiveActivity) {
      if ((typeof args.Details[key] === 'undefined' || args.Details[key] === null) && key !== 'createdAt' && key !== '_id') {
        args.Details[key] = oldActiveActivity[key];
      }
    }
    const newVersionActivity = mlDBController.insert('MlActivity', args.Details, context);
    if (newVersionActivity) {
      const code = 200;
      const result = newVersionActivity
      const response = new MlRespPayload().successPayload(result, code);
      return response
    }
  } else {
    const code = 404;
    const response = new MlRespPayload().errorPayload('Activity not found', code);
    return response
  }
}

MlResolver.MlQueryResolver.fetchActivitiesForTask = (obj, args, context, info) => {
  if (!args.taskId) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Task id is required', code);
    return response;
  }

  const oldVersionTask = mlDBController.findOne('MlTask', { _id: args.taskId }, context);

  const taskQuery = {
    transactionId: oldVersionTask.transactionId,
    isCurrentVersion: true
  };
  const task = mlDBController.findOne('MlTask', taskQuery, context);

  let sessionQuery = [];
  if (task.session && task.session.length > 0) {
    sessionQuery = task.session.reduce((result, session) => result.concat(session.activities), []);
  }
  sessionQuery = _.uniq(sessionQuery);

  const query = {
    userId: context.userId,
    profileId: task.profileId,
    isActive: true,
    $and: [{
      $or: [
        { _id: { $in: sessionQuery } },
        { isCurrentVersion: true }
      ]
    }]
  }

  if (task.isInternal && !task.isExternal && !task.isServiceCardEligible) {
    query.isInternal = true;
    query.isServiceCardEligible = false;
  } else if (!task.isInternal && task.isExternal && !task.isServiceCardEligible) {
    query.isExternal = true;
    query.isServiceCardEligible = false;
  } else if (task.isInternal && task.isExternal && !task.isServiceCardEligible) {
    query.$and.push({
      $or: [
        { isInternal: true },
        { isExternal: true }
      ]
    });
    query.isServiceCardEligible = false;
  } else if (!task.isInternal && task.isExternal && task.isServiceCardEligible) {
    query.isExternal = true;
    query.isServiceCardEligible = true;
  } else if (task.isInternal && task.isExternal && task.isServiceCardEligible) {
    query.$and.push({
      $or: [
        { isInternal: true },
        { isExternal: true }
      ]
    });
    query.isServiceCardEligible = true;
  }

  const result = mlDBController.find('MlActivity', query, context).fetch()

  return result;
}
