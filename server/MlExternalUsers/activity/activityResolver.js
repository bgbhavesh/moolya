/**
 * Created by Mukhil on 14/6/17.
 */

import MlResolver from '../../commons/mlResolverDef'
import MlRespPayload from '../../commons/mlPayload'
import MlUserContext from '../../MlExternalUsers/mlUserContext'
var extendify = require('extendify');
var _ = require('lodash')

MlResolver.MlQueryResolver['fetchActivities'] = (obj, args, context, info) => {
  let query = {
    userId:context.userId,
    profileId: args.profileId
  };
  let result = mlDBController.find('MlActivity', query , context).fetch()

  return result;
}

MlResolver.MlQueryResolver['getTeamMembers'] = (obj, args, context, info) => {
let temp = [];
let temp1 = [];
  let result = mlDBController.find('MlOffice', {userId:context.userId} , context).fetch()

  result.map(function(communities){
    communities.availableCommunities.id = communities._id
    temp.push(communities.availableCommunities)
  })
  temp.map(function(community){
    community.map(function(attributes){
      attributes.id = community.id
      temp1.push(attributes)
    })
  })

  return temp1
}

MlResolver.MlQueryResolver['getTeamUsers'] = (obj, args, context, info) => {

  let result = mlDBController.find('MlOfficeMembers', {userId:context.userId, officeId:args.Attributes.officeId, communityType:args.Attributes.communityType} , context).fetch()
  return result;
}

MlResolver.MlQueryResolver['getBranchDetails'] = (obj, args, context, info) => {

  let result = mlDBController.find('MlOffice', {userId:context.userId} , context).fetch()
  return result;
}

MlResolver.MlQueryResolver['fetchActivity'] = (obj, args, context, info) => {
  let result = mlDBController.findOne('MlActivity', {_id:args.activityId} , context);
  console.log("fetching",result);
  return result;
}


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
  args.Details.updatedAt = new Date();
  let result1 = mlDBController.update('MlActivity', {_id:args.activityId}, args.Details, {'$set':1}, context);
  if(result1){
    console.log(result1);
    let code = 200;
    let result = result1
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

