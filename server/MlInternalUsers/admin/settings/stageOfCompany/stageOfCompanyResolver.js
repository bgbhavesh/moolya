import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver['CreateStageOfCompany'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  let id = MlStageOfCompany.insert({...args});
  if (id) {
    let code = 200;
    let result = {stageOfCompanyId: id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
};

MlResolver.MlMutationResolver['UpdateStageOfCompany'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if (args._id) {
    var id= args._id;
    args=_.omit(args,'_id');
    let result = MlStageOfCompany.update(id, {$set: args});
    let code = 200;
    let response = new MlRespPayload().successPayload(result, code);
    return response;
  }
}
MlResolver.MlQueryResolver['FindStageOfCompany'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response = MlStageOfCompany.findOne({"_id":id});
    return response;
  }
}
MlResolver.MlQueryResolver['fetchStageOfCompany'] = (obj, args, context, info) => {
  let result=MlStageOfCompany.find({isActive:true}).fetch()||[];
  return result;
}

