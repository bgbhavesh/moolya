import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver.UpdateRoleType = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  if (args._id) {
    const id = args._id;
    args = _.omit(args, '_id');
    const result = MlRoleTypes.update(id, { $set: args });
    const code = 200;
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
};

MlResolver.MlQueryResolver.FindRoleType = (obj, args, context, info) => {
  if (args._id) {
    const id = args._id;
    const response = MlRoleTypes.findOne({ _id: id });
    return response;
  }
}

