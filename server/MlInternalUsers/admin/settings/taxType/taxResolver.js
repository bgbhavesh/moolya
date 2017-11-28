import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver.CreateTax = (obj, args, context, info) => {
  // TODO : Authorization
  const id = MlGlobalSettings.insert({ ...args });
  if (id) {
    const code = 200;
    const result = { taxId: id }
    const response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
MlResolver.MlMutationResolver.UpdateTax = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    args = _.omit(args, '_id');
    const updatedResponse = MlGlobalSettings.update(id, { $set: args });
    return updatedResponse
  }
}
MlResolver.MlQueryResolver.FindTax = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    const response = MlGlobalSettings.findOne({ _id: id });
    return response;
  }
}
MlResolver.MlQueryResolver.FetchTax = (obj, args, context, info) => {
  const result = MlGlobalSettings.find({ isActive: true }).fetch() || [];
  return result;
}
MlResolver.MlQueryResolver.FetchActiveTax = (obj, args, context, info) => {
  const resp = MlGlobalSettings.find({ isActive: true }).fetch();
  return resp;
}

