import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver.updateNumericalFormat = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    const updatedResponse = MlGlobalSettings.update(id, { $set: args.numericalFormat });
    return updatedResponse
  }
}
MlResolver.MlQueryResolver.findNumericalFormat = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    const response = MlGlobalSettings.findOne({ _id: id });
    return response;
  }
}
MlResolver.MlMutationResolver.createNumericalFormat = (obj, args, context, info) => {
  if (MlGlobalSettings.find({ _id: args.numericalFormat._id }).count() > 0) {
    const code = 409;
    return new MlRespPayload().errorPayload("'Numerical format' already exists!", code);
  }
  const id = MlGlobalSettings.insert({ ...args.numericalFormat });
  if (id) {
    const code = 200;
    const result = { languageId: id }
    const response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
// MlResolver.MlQueryResolver['fetchDocumentsType'] = (obj, args, context, info) => {
//   let result=MlDocumentTypes.find({isActive:true}).fetch()||[];
//   return result;
// }

