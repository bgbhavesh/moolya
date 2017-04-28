import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver['CreateAward'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  // let id = MlAwards.insert({...args});
  let id = mlDBController.insert('MlAwards', args, context)
  if (id) {
    let code = 200;
    let result = {awardId: id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
};
MlResolver.MlMutationResolver['UpdateAward'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if (args._id) {
    var id= args._id;
    args=_.omit(args,'_id');
    // let result= MlAwards.update(id, {$set: args});
    let result = mlDBController.update('MlAwards', id, args, {$set:true}, context)
    let code = 200;
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
};

MlResolver.MlQueryResolver['FindAward'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    // MlAwards.findOne({"_id":id});
    let response= mlDBController.findOne("MlAwards", {"_id":id}, context);
    return response;
  }
}

MlResolver.MlQueryResolver['fetchActiveAwards'] = (obj, args, context, info) => {
  // let result=MlAwards.find({isActive:true}).fetch()||[];
  let result = mlDBController.find('MlAwards', {isActive:true}, context).fetch()||[];
  return result;
}


