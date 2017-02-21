import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['createDocument'] = (obj, args, context, info) => {
  // TODO : Authorization
  let id = MlDocumentMapping.insert(args.document);
  if (id) {
    let code = 200;
    let result = {documentId: id}
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
// MlResolver.MlMutationResolver['UpdateRequestType'] = (obj, args, context, info) => {
//   // TODO : Authorization
//
//   if (args._id) {
//     var id= args._id;
//     let updatedResponse= MlRequestType.update(id, {$set: args});
//     return updatedResponse
//   }
//
// }
// MlResolver.MlQueryResolver['FindRequestType'] = (obj, args, context, info) => {
//   // TODO : Authorization
//
//   if (args._id) {
//     var id= args._id;
//     let response= MlRequestType.findOne({"_id":id});
//     return response;
//   }
//
// }


