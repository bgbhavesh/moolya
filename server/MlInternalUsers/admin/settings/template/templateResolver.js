import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['CreateTemplate'] = (obj, args, context, info) => {
  // TODO : Authorization
  let id = MlTemplates.insert({...args});
  if (id) {
    let code = 200;
    let result = {templateId: id}
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
MlResolver.MlMutationResolver['UpdateTemplate'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let updatedResponse= MlTemplates.update(id, {$set: args});
    return updatedResponse
  }

}
MlResolver.MlQueryResolver['FindTemplate'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response= MlTemplates.findOne({"_id":id});
    return response;
  }

}


