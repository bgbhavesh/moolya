/**
 * Created by Mukhil on 14/6/17.
 */

import MlResolver from '../../commons/mlResolverDef'
import MlRespPayload from '../../commons/mlPayload'
import MlUserContext from '../../MlExternalUsers/mlUserContext'
var _ = require('lodash')

MlResolver.MlQueryResolver['fetchActivities'] = (obj, args, context, info) => {
  let query = {
    userId:context.userId,
    profileId: args.profileId
  };
  if(args.isInternal || args.isExternal){
    let typeQuery = _.pickBy(args, _.isBoolean)
    query = _.extend(query, typeQuery)
  }
  let result = mlDBController.find('MlActivity', query , context).fetch()

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

MlResolver.MlQueryResolver['fetchActivity'] = (obj, args, context, info) => {
  let result = mlDBController.findOne('MlActivity', {_id:args.activityId} , context);
  return result;
};


MlResolver.MlMutationResolver['createActivity'] = (obj, args, context, info) => {
  args.Details.userId = context.userId
  args.Details.createdAt = new Date()
  let result1 = mlDBController.insert('MlActivity', args.Details , context)
  if(result1){
    let code = 200;
    let result = result1;
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlMutationResolver['updateActivity'] = (obj, args, context, info) => {
  args.Details.userId = context.userId
  args.Details.updatedAt = new Date();
  let result1 = mlDBController.update('MlActivity', {_id:args.activityId}, args.Details, {'$set':1}, context);
  if(result1){
    let code = 200;
    let result = result1
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlQueryResolver['fetchActivitiesForTask'] = (obj, args, context, info) => {
  if(!args.taskId){
    let code = 400;
    let response = new MlRespPayload().errorPayload("Task id is required", code);
    return response;
  }

  let task = mlDBController.findOne('MlTask', args.taskId , context)

  let query = {
    userId:context.userId,
    profileId: task.profileId,
    isActive: true
  };

  if(task.isInternal && task.isExternal){
      query["$or"] = [
        {isInternal: true},
        {isExternal: true}
      ];
  } else if (task.isExternal && task.isServiceCardEligible) {
    query.isExternal = true;
    query.isServiceCardEligible = true;
  } else {
    query.isExternal = task.isExternal;
    query.isInternal = task.isInternal;
    query.isServiceCardEligible = task.isServiceCardEligible;
  }

  let result = mlDBController.find('MlActivity', query , context).fetch()

  return result;
}
