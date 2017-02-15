import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['UpdateUserType'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let updatedResponse= MlUserTypes.update(id, {$set: args});
    console.log(updatedResponse)
    return updatedResponse
  }

}
MlResolver.MlQueryResolver['FindUserType'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response= MlUserTypes.findOne({"_id":id});
    console.log(response)
    return response;
  }

}


