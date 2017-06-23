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
    let obj = args.taskDetails
    obj['userId'] = userId
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
      for(key in args.taskDetails){
        task[key] = args.taskDetails[key]
      }
      let result = mlDBController.update('MlTask', {_id: args.taskId}, args.taskDetails, {'$set': 1}, context)
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
  // let query = {
  //   userId:context.userId,
  //   profileId:args.profileId
  // };
  let result = mlDBController.findOne('MlTask', {name:args.name}, context)
  return result;

}
