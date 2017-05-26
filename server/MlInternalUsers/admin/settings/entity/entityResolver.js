import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver['CreateEntity'] = (obj, args, context, info) => {
  // TODO : Authorization
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  let isFind = MlEntity.find({ $or:[{entityName: args.entityName},{entityDisplayName: args.entityDisplayName}]}).fetch();
  if(isFind.length){
    let code = 409;
    let response = new MlRespPayload().errorPayload("Already Exists!!!!", code);
    return response;
  }

  let id = MlEntity.insert({...args});
  if (id) {
    let code = 200;
    let result = {entityId: id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
MlResolver.MlMutationResolver['UpdateEntity'] = (obj, args, context, info) => {
  // TODO : Authorization

  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if (args._id) {
    var id= args._id;

    let isFind = MlEntity.find({_id:{ $ne: id }, $or:[{entityName: args.entityName},{entityDisplayName: args.entityDisplayName}]}).fetch();
    if(isFind.length) {
      let code = 409;
      let response = new MlRespPayload().errorPayload("Already Exists!!!!", code);
      return response;
    }

    args=_.omit(args,'_id');
    let result= MlEntity.update(id, {$set: args});
    let code = 200;
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
MlResolver.MlQueryResolver['FindEntity'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response= MlEntity.findOne({"_id":id});
    return response;
  }
}
MlResolver.MlQueryResolver['fetchEntities'] = (obj, args, context, info) => {
  let result=MlEntity.find({isActive:true}).fetch()||[];
  return result;
}


