import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'

MlResolver.MlMutationResolver.createContactType = (obj, args, context, info) => {
  if (MlGlobalSettings.find({ _id: args.contactType._id }).count() > 0) {
    const code = 409;
    return new MlRespPayload().errorPayload('Already Exist', code);
  }
  const id = MlGlobalSettings.insert({ ...args.contactType });
  if (id) {
    const code = 200;
    const result = { addressTypeId: id }
    const response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}

MlResolver.MlMutationResolver.updateContactType = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    const updatedResponse = MlGlobalSettings.update(id, { $set: args.contactType });
    return updatedResponse
  }
}
MlResolver.MlQueryResolver.findContactType = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    const response = MlGlobalSettings.findOne({ _id: id });
    return response;
  }
}
MlResolver.MlQueryResolver.fetchContactTypes = (obj, args, context, info) => {
  // TODO : Authorization

  const response = MlGlobalSettings.find({ isActive: true }).fetch();
  return response;
}
