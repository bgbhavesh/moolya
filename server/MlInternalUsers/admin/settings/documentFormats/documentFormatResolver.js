import MlResolver from "../../mlAdminResolverDef";
import MlRespPayload from "../../../../commons/mlPayload";
import _ from "lodash";

MlResolver.MlMutationResolver['updateDocumentFormat'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if (!args.docFormatName) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Document Format Name is Required", code);
    return response;
  } else {
    if (args._id) {
      var id = args._id;
      args = _.omit(args, '_id');
      let result = MlDocumentFormats.update(id, {$set: args});
      let code = 200;
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
};

MlResolver.MlQueryResolver['findDocumentFormat'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id = args._id;
    let response = MlDocumentFormats.findOne({"_id": id});
    return response;
  }
}

MlResolver.MlMutationResolver['createDocumentFormat'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if (!args.documentFormat.docFormatName) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Document Format Name is Required", code);
    return response;
  } else {
    if (MlDocumentFormats.find({docFormatName: args.documentFormat.docFormatName}).count() > 0) {
      let code = 409;
      let response = MlRespPayload().errorPayload("Already Exist", code);
      return response;
    }
    args.documentFormat.createdDateTime=new Date();
    let id = MlDocumentFormats.insert({...args.documentFormat});
    if (id) {
      let code = 200;
      let result = {documentFormatId: id}
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
}

MlResolver.MlQueryResolver['fetchDocumentsFormat'] = (obj, args, context, info) => {
  let result = MlDocumentFormats.find({isActive: true}).fetch() || [];
  return result;
}


