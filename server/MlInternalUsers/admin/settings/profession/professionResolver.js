import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver['CreateProfession'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if (MlIndustries.findOne({_id:args.industryId})){
    args.industryName=MlIndustries.findOne({_id:args.industryId}).industryName;
  }
  let id = MlProfessions.insert({...args});
  if (id) {
    let code = 200;
    let result = {professionId: id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
MlResolver.MlMutationResolver['UpdateProfession'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if (MlIndustries.findOne({_id:args.industryId})){
    args.industryName=MlIndustries.findOne({_id:args.industryId}).industryName;
  }
  if (args._id) {
    var id= args._id;
    args=_.omit(args,'_id');
    let result= MlProfessions.update(id, {$set: args});
    let code = 200;
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }

}
MlResolver.MlQueryResolver['FindProfession'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response= MlProfessions.findOne({"_id":id});
    return response;
  }

}

MlResolver.MlQueryResolver['fetchProfessions'] = (obj, args, context, info) => {
  let result=MlProfessions.find({isActive:true}).fetch()||[];
  return result;
}

