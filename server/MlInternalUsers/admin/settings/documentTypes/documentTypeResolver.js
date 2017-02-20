import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['updateDocumentType'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let updatedResponse= MlDocumentTypes.update(id, {$set: args});
    return updatedResponse
  }

}
MlResolver.MlQueryResolver['findDocumentType'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response= MlDocumentTypes.findOne({"_id":id});
    return response;
  }

}
MlResolver.MlMutationResolver['createDocumentType'] = (obj, args, context, info) =>{
  if(MlDocumentTypes.find({docTypeName:args.documentType.docTypeName}).count() > 0){
    let code = 409;
    return new MlRespPayload().errorPayload("Already Exist", code);
  }
  let id = MlDocumentTypes.insert(args.documentType);
  if(id){
    let code = 200;
    let result = {documentTypeId: id}
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
MlResolver.MlQueryResolver['fetchDocuments'] = (obj, args, context, info) => {
  let result=MlDocumentTypes.find({isActive:true}).fetch()||[];
  return result;
}


