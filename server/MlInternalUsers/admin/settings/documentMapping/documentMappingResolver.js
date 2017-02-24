import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['createDocument'] = (obj, args, context, info) => {
  // TODO : Authorization
  let id = MlDocumentMapping.insert({...args.document});
  if (id) {
    let code = 200;
    let result = {documentId: id}
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
MlResolver.MlMutationResolver['updateDocument'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args.documentId) {
    let updatedResponse= MlDocumentMapping.update({documentId:args.documentId}, {$set: args.document});
    return updatedResponse
  }

}
MlResolver.MlQueryResolver['findDocument'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args.documentId) {
    var id= args.documentId;
    let response= MlDocumentMapping.findOne({"documentId":id});
    return response;
  }

}
MlResolver.MlQueryResolver['findDocuments'] = (obj, args, context, info) => {
  // TODO : Authorization
  let response=  MlDocumentMapping.find({}).fetch();
  return response;

}


