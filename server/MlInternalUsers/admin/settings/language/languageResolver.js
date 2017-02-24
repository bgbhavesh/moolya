import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['updateLanguage'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let updatedResponse= MlGlobalSettings.update(id, {$set: args.language});
    return updatedResponse
  }

}
MlResolver.MlQueryResolver['findLanguage'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response= MlGlobalSettings.findOne({"_id":id});
    return response;
  }

}
MlResolver.MlMutationResolver['createLanguage'] = (obj, args, context, info) =>{
  if(MlGlobalSettings.find({languageName:args.language.languageName}).count() > 0){
    let code = 409;
    return new MlRespPayload().errorPayload("Already Exist", code);
  }
  let id = MlGlobalSettings.insert({...args.language});
  if(id){
    let code = 200;
    let result = {languageId: id}
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
MlResolver.MlQueryResolver['fetchDocumentsType'] = (obj, args, context, info) => {
  let result=MlDocumentTypes.find({isActive:true}).fetch()||[];
  return result;
}


