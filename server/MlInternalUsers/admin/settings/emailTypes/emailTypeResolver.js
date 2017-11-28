import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'

MlResolver.MlMutationResolver.createEmailType = (obj, args, context, info) => {
  if (MlGlobalSettings.find({ _id: args.emailType._id }).count() > 0) {
    const code = 409;
    return new MlRespPayload().errorPayload('Already Exist', code);
  }
  const id = MlGlobalSettings.insert({ ...args.emailType });
  if (id) {
    const code = 200;
    const result = { addressTypeId: id }
    const response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}

MlResolver.MlMutationResolver.updateEmailType = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    const updatedResponse = MlGlobalSettings.update(id, { $set: args.emailType });
    return updatedResponse
  }
}
MlResolver.MlQueryResolver.findEmailType = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    const response = MlGlobalSettings.findOne({ _id: id });
    return response;
  }
}
