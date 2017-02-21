import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['CreateCitizenship'] = (obj, args, context, info) => {
  // TODO : Authorization
  let id = MlCitizenship.insert(args);
  if (id) {
    let code = 200;
    let result = {citizenshipId: id}
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
MlResolver.MlMutationResolver['UpdateCitizenship'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let updatedResponse = MlCitizenship.update(id, {$set: args});
    return updatedResponse
  }
}
MlResolver.MlQueryResolver['FindCitizenship'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response = MlCitizenship.findOne({"_id":id});
    return response;
  }
}


