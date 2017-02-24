import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['CreateIndustry'] = (obj, args, context, info) => {
  // TODO : Authorization
  let id = MlIndustries.insert({...args});
  if (id) {
    let code = 200;
    let result = {industryId: id}
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
MlResolver.MlMutationResolver['UpdateIndustry'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let updatedResponse= MlIndustries.update(id, {$set: args});
    return updatedResponse
  }

}
MlResolver.MlQueryResolver['FindIndustry'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response= MlIndustries.findOne({"_id":id});
    return response;
  }
}

MlResolver.MlQueryResolver['fetchIndustries'] = (obj, args, context, info) => {
  let result=MlIndustries.find({isActive:true}).fetch()||[];
  return result;
}


