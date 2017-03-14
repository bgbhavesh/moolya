import MlResolver from "../../mlAdminResolverDef";
import MlRespPayload from "../../../../commons/mlPayload";


MlResolver.MlMutationResolver['CreateRequestType'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if (!args.requestName) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Request Name is Required", code);
    return response;
  } else {
    let id = MlRequestType.insert({...args});
    if (id) {
      let code = 200;
      let result = {permissionId: id}
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
};

MlResolver.MlMutationResolver['UpdateRequestType'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if (!args.requestName) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Request Name is Required", code);
    return response;
  } else {
    if (args._id) {
      var id= args._id;
      args=_.omit(args,'_id');
      let result= MlRequestType.update(id, {$set: args});
      let code = 200;
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }

};

MlResolver.MlQueryResolver['FindRequestType'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response= MlRequestType.findOne({"_id":id});
    return response;
  }

}


