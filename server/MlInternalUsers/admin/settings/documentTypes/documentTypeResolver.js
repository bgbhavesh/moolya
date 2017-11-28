import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash'

MlResolver.MlMutationResolver.updateDocumentType = (obj, args, context, info) => {
  // TODO : Authorization
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  if (!args.docTypeName) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Document Name is Required', code);
    return response;
  }
  if (args._id) {
    const id = args._id;
    args = _.omit(args, '_id');
    const result = MlDocumentTypes.update(id, { $set: args });
    const code = 200;
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
};

MlResolver.MlQueryResolver.findDocumentType = (obj, args, context, info) => {
  // TODO : Authorization
  if (args._id) {
    const id = args._id;
    const response = MlDocumentTypes.findOne({ _id: id });
    return response;
  }
};

MlResolver.MlMutationResolver.createDocumentType = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  if (!args.documentType.docTypeName) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Document Name is Required', code);
    return response;
  }
  if (MlDocumentTypes.find({ docTypeName: args.documentType.docTypeName }).count() > 0) {
    const code = 409;
    const response = new MlRespPayload().errorPayload("'Document type' already exists", code);
    return response;
  }
  const id = MlDocumentTypes.insert({ ...args.documentType });
  if (id) {
    const code = 200;
    const result = { documentTypeId: id }
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
MlResolver.MlQueryResolver.fetchDocumentsType = (obj, args, context, info) => {
  const result = MlDocumentTypes.find({ isActive: true }).fetch() || [];
  return result;
}

