import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver.updateSocialLinksType = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    const updatedResponse = MlGlobalSettings.update({ _id: id }, { $set: args.socialLinksType });
    return updatedResponse
  }
}
MlResolver.MlQueryResolver.findSocialLinksType = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    const response = MlGlobalSettings.findOne({ _id: id });
    return response;
  }
}
MlResolver.MlMutationResolver.createSocialLinksType = (obj, args, context, info) => {
  if (MlGlobalSettings.find({ _id: args.socialLinksType._id }).count() > 0) {
    const code = 409;
    return new MlRespPayload().errorPayload("'Social link type' already exists", code);
  }
  const id = MlGlobalSettings.insert({ ...args.socialLinksType });
  if (id) {
    const code = 200;
    const result = { socialLinksTypeId: id }
    const response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
// MlResolver.MlQueryResolver['findAddressTypes'] = (obj, args, context, info) => {
//   let result=MlDocumentTypes.find({isActive:true}).fetch()||[];
//   return result;
// }

