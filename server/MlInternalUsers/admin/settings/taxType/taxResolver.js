import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['CreateTax'] = (obj, args, context, info) => {
  // TODO : Authorization
  let id = MlGlobalSettings.insert({...args});
  if (id) {
    let code = 200;
    let result = {taxId: id}
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
MlResolver.MlMutationResolver['UpdateTax'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let updatedResponse= MlGlobalSettings.update(id, {$set: args});
    return updatedResponse
  }

}
MlResolver.MlQueryResolver['FindTax'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response= MlGlobalSettings.findOne({"_id":id});
    return response;
  }

}
MlResolver.MlQueryResolver['FetchTax'] = (obj, args, context, info) => {
  let result=MlGlobalSettings.find({isActive:true}).fetch()||[];
  return result;
}


