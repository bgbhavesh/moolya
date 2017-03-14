import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver['CreateBusinessType'] = (obj, args, context, info) => {
  // TODO : Authorization
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if(!args.businessTypeName){
    let code = 401;
    let response = new MlRespPayload().errorPayload("Business Name is Required", code);
    return response;
  }else {
    let id = MlBusinessType.insert({...args});
    if (id) {
      let code = 200;
      let result = {businessTypeId: id}
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
}

MlResolver.MlMutationResolver['UpdateBusinessType'] = (obj, args, context, info) => {
  // TODO : Authorization
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if(!args.businessTypeName){
    let code = 401;
    let response = new MlRespPayload().errorPayload("Business Name is Required", code);
    return response;
  }else {
    if (args._id) {
      var id = args._id;
      args = _.omit(args, '_id');
      let result = MlBusinessType.update(id, {$set: args});
      let code = 200;
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
}

MlResolver.MlQueryResolver['FindBusinessType'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id = args._id;
    let response = MlBusinessType.findOne({"_id": id});
    return response;
  }
}


