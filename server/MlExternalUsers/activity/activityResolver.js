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
    userId:context.userId  // to do for query
  };
  let result = mlDBController.find('MlActivity', query , context).fetch()

}

MlResolver.MlQueryResolver['fetchActivity'] = (obj, args, context, info) => {
  let result = mlDBController.findOne('MlActivity', {_id:args.activityId} , context);
}


MlResolver.MlMutationResolver['createActivity'] = (obj, args, context, info) => {
  let result = mlDBController.insert('MlActivity', args.activity , context).fetch()
  if(result){
    let code = 200;
    let result = {userId: userId}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlMutationResolver['updateActivity'] = (obj, args, context, info) => {
  let result = mlDBController.update('MlActivity', {_id:args.activityId}, args.activity, {'$set':1}, context).fetch();
  if(result){
    let code = 200;
    let result = {userId: userId}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
