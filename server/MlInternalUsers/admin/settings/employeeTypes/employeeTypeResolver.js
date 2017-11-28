import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver.CreateEmployeeType = (obj, args, context, info) => {
  // TODO : Authorization
  const id = MlGlobalSettings.insert(args);
  if (id) {
    const code = 200;
    const result = { transactionId: id }
    const response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}

MlResolver.MlMutationResolver.UpdateEmployeeType = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    const updatedResponse = MlGlobalSettings.update(id, { $set: args });

    return updatedResponse
  }
}
MlResolver.MlQueryResolver.FindEmployeeType = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    const response = MlGlobalSettings.findOne({ _id: id });
    return response;
  }
}
