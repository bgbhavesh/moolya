/**
 * Created by Mukhil on 14/6/17.
 */

import MlResolver from '../../commons/mlResolverDef'
import MlRespPayload from '../../commons/mlPayload'
import MlUserContext from '../../MlExternalUsers/mlUserContext'
var extendify = require('extendify');
var _ = require('lodash')

MlResolver.MlQueryResolver['fetchServices'] = (obj, args, context, info) => {
  let query = {
    userId:context.userId
  };
  let result = mlDBController.find('MlService', query , context).fetch()
  return result;
}

MlResolver.MlQueryResolver['fetchService'] = (obj, args, context, info) => {
  let result = mlDBController.findOne('MlService', {_id:args.serviceId} , context)
}

MlResolver.MlMutationResolver['createService'] = (obj, args, context, info) => {
  result = mlDBController.insert('MlService' ,args.service, context).fetch()
  if(result){
    let code = 200;
    let result = {userId: userId}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }

}

MlResolver.MlMutationResolver['updateService'] = (obj, args, context, info) => {
  result = mlDBController.update('MlService', {_id:args.serviceId} ,args, context).fetch()
  if(result){
    let code = 200;
    let result = {userId: userId}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

