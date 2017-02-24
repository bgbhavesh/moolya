import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['CreateSpecification'] = (obj, args, context, info) => {
  // TODO : Authorization
  let id = MlSpecifications.insert({...args});
  if (id) {
    let code = 200;
    let result = {specificationId: id}
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
MlResolver.MlMutationResolver['UpdateSpecification'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let updatedResponse= MlSpecifications.update(id, {$set: args});
    return updatedResponse
  }

}
MlResolver.MlQueryResolver['FindSpecification'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response= MlSpecifications.findOne({"_id":id});
    return response;
  }

}


