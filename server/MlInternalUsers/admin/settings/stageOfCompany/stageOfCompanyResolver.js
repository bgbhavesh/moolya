import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['CreateStageOfCompany'] = (obj, args, context, info) => {
  // TODO : Authorization
  let id = MlStageOfCompany.insert({...args});
  if (id) {
    let code = 200;
    let result = {stageOfCompanyId: id}
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
MlResolver.MlMutationResolver['UpdateStageOfCompany'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let updatedResponse = MlStageOfCompany.update(id, {$set: args});
    return updatedResponse
  }
}
MlResolver.MlQueryResolver['FindStageOfCompany'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response = MlStageOfCompany.findOne({"_id":id});
    return response;
  }
}


