/**
 * Created by Mukhil on 14/6/17.
 */

import MlResolver from '../../commons/mlResolverDef'
import MlRespPayload from '../../commons/mlPayload'
import MlUserContext from '../../MlExternalUsers/mlUserContext'
var extendify = require('extendify');
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
  let result = mlDBController.findOne('MlTask', {_id:args.taskId} , context).fetch()

}

MlResolver.MlMutationResolver['createTask'] = (obj, args, context, info) => {
  let result = mlDBController.insert('MlTask', args.task, context).fetch()
  if(result){
    let code = 200;
    let result = {userId: userId}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }

}

MlResolver.MlMutationResolver['updateTask'] = (obj, args, context, info) => {
  let result = mlDBController.update('MlTask', { _id: args.taskId }, args.task, {'$set':1}, context).fetch()
  if(result){
    let code = 200;
    let result = {userId: userId}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }

}
