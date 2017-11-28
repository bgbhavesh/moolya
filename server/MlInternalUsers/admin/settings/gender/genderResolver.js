import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver.updateGender = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    const updatedResponse = MlGlobalSettings.update({ _id: id }, { $set: args.gender });
    return updatedResponse
  }
}
MlResolver.MlQueryResolver.findGender = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    const response = MlGlobalSettings.findOne({ _id: id });
    return response;
  }
}
MlResolver.MlMutationResolver.createGender = (obj, args, context, info) => {
  if (MlGlobalSettings.find({ _id: args.gender._id }).count() > 0) {
    const code = 409;
    return new MlRespPayload().errorPayload('Already Exist', code);
  }
  const id = MlGlobalSettings.insert({ ...args.gender });
  if (id) {
    const code = 200;
    const result = { genderId: id }
    const response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
// MlResolver.MlQueryResolver['findAddressTypes'] = (obj, args, context, info) => {
//   let result=MlDocumentTypes.find({isActive:true}).fetch()||[];
//   return result;
// }

