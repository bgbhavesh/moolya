import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['UpdateRoleType'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let updatedResponse= MlRoleTypes.update(id, {$set: args});
    return updatedResponse
  }

}
MlResolver.MlQueryResolver['FindRoleType'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response= MlRoleTypes.findOne({"_id":id});
    return response;
  }

}


