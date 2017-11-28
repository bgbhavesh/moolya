import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver.CreateTransaction = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  if (!args.transactionName) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Transaction Name is Required', code);
    return response;
  }
  const id = MlTransactionTypes.insert({ ...args });
  if (id) {
    const code = 200;
    const result = { transactionId: id }
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
};

MlResolver.MlMutationResolver.UpdateTransaction = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  if (!args.transactionName) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Transaction Name is Required', code);
    return response;
  }
  if (args._id) {
    const id = args._id;
    args = _.omit(args, '_id');
    const result = MlTransactionTypes.update(id, { $set: args });
    const code = 200;
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
};

MlResolver.MlQueryResolver.FindTransaction = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    const response = MlTransactionTypes.findOne({ _id: id });
    return response;
  }
}

// This is being used in Request Types
MlResolver.MlQueryResolver.fetchTransaction = (obj, args, context, info) => {
  // TODO : Authorization

  const response = MlTransactionTypes.find({ isActive: true }).fetch();
  return response;
}

