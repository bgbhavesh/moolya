import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['updateKycCategory'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let updatedResponse= MlDocumentFormats.update(id, {$set: args});
    return updatedResponse
  }

}
MlResolver.MlQueryResolver['findKycCategory'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response= MlDocumentFormats.findOne({"_id":id});
    return response;
  }

}
MlResolver.MlMutationResolver['createKycCategory'] = (obj, args, context, info) =>{
  if(MlDocumentCategories.find({docCategoryName:args.kycCategory.docCategoryName}).count() > 0){
    let code = 409;
    return new MlRespPayload().errorPayload("Already Exist", code);
  }
  let id = MlDocumentCategories.insert(args.kycCategory);
  if(id){
    let code = 200;
    let result = {kycCategoryId: id}
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}


MlResolver.MlQueryResolver['fetchKYCCategories'] = (obj, args, context, info) => {
  let result=MlDocumentCategories.find({isActive:true}).fetch()||[];
  return result;
}


