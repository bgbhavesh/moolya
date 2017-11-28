import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver.updateLanguage = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    // let updatedResponse= MlGlobalSettings.update(id, {$set: args.language});
    const updatedResponse = mlDBController.update('MlGlobalSettings', id, args.language, { $set: true }, context)
    return updatedResponse
  }
}
MlResolver.MlQueryResolver.findLanguage = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    // let response= MlGlobalSettings.findOne({"_id":id});
    const response = mlDBController.findOne('MlGlobalSettings', { _id: id }, context)
    return response;
  }
}
MlResolver.MlMutationResolver.createLanguage = (obj, args, context, info) => {
  // if(MlGlobalSettings.find({languageName:args.language.languageName}).count() > 0){
  if (mlDBController.find('MlGlobalSettings', { languageName: args.language.languageName }, context).count() > 0) {
    const code = 409;
    return new MlRespPayload().errorPayload("'Language' already exists!", code);
  }
  // let id = MlGlobalSettings.insert({...args.language});
  const id = mlDBController.insert('MlGlobalSettings', args.language, context)
  if (id) {
    const code = 200;
    const result = { languageId: id }
    const response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
MlResolver.MlQueryResolver.fetchDocumentsType = (obj, args, context, info) => {
  // let result=MlDocumentTypes.find({isActive:true}).fetch()||[];
  const result = mlDBController.find('MlDocumentTypes', { isActive: true }, context).fetch() || [];
  return result;
}

