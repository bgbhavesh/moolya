/**
 * Created by Mukhil on 14/6/17.
 */

import MlResolver from "../../commons/mlResolverDef";
import MlRespPayload from "../../commons/mlPayload";
import MlUserContext from "../../MlExternalUsers/mlUserContext";
var _ = require('lodash')

MlResolver.MlQueryResolver['fetchTasks'] = (obj, args, context, info) => {
  let query = {
    userId: context.userId
  };
  let result = mlDBController.find('MlTask', query, context).fetch()
  return result;

}

MlResolver.MlQueryResolver['fetchTask'] = (obj, args, context, info) => {
  let result = mlDBController.findOne('MlTask', {_id: args.taskId}, context).fetch()

}

MlResolver.MlMutationResolver['createTask'] = (obj, args, context, info) => {
  if (args.taskDetails) {
    let userId = context.userId
    let obj = args.taskDetails
    let profile = new MlUserContext(userId).userProfileDetails(userId)
    obj['userId'] = userId
    if (!_.isEmpty(profile)) {
      obj['profileId'] = profile.profileId || ''
    }
    let result = mlDBController.insert('MlTask', args.taskDetails, context)
    if (result) {
      let code = 200;
      let result = {taskId: result}
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
  let result = mlDBController.update('MlTask', {_id: args.taskId}, args.task, {'$set': 1}, context).fetch()
  if (result) {
    let code = 200;
    let result = {userId: userId}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }

}
