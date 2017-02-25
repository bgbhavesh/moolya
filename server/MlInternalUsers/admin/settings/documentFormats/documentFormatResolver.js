import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver['updateDocumentFormat'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    args=_.omit(args,'_id');
    let updatedResponse= MlDocumentFormats.update(id, {$set: args});
    return updatedResponse
  }

}
MlResolver.MlQueryResolver['findDocumentFormat'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response= MlDocumentFormats.findOne({"_id":id});
    return response;
  }

}
MlResolver.MlMutationResolver['createDocumentFormat'] = (obj, args, context, info) =>{
  if(MlDocumentFormats.find({docFormatName:args.documentFormat.docFormatName}).count() > 0){
    let code = 409;
    return new MlRespPayload().errorPayload("Already Exist", code);
  }
  let id = MlDocumentFormats.insert({...args.documentFormat});
  if(id){
    let code = 200;
    let result = {documentFormatId: id}
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
MlResolver.MlQueryResolver['fetchDocumentsFormat'] = (obj, args, context, info) => {
  let result=MlDocumentFormats.find({isActive:true}).fetch()||[];
  return result;
}


