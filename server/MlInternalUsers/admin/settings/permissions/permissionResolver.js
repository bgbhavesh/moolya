import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['CreatePermission'] = (obj, args, context, info) => {
  // TODO : Authorization
    let id = MlPermissions.insert(args);
    if (id) {
      let code = 200;
      let result = {permissionId: id}
      let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
      return response
    }
}
MlResolver.MlMutationResolver['UpdatePermission'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let updatedResponse= MlPermissions.update(id, {$set: args});
    console.log(updatedResponse)
    return updatedResponse
  }

}
MlResolver.MlQueryResolver['FindPermission'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response= MlPermissions.findOne({"_id":id});
    console.log(response)
    return response;
  }

}


