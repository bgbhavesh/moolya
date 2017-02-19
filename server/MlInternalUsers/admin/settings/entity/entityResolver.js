import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['CreateEntity'] = (obj, args, context, info) => {
  // TODO : Authorization
  let id = MlEntity.insert(args);
  if (id) {
    let code = 200;
    let result = {entityId: id}
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
MlResolver.MlMutationResolver['UpdateEntity'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let updatedResponse= MlEntity.update(id, {$set: args});
    return updatedResponse
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


