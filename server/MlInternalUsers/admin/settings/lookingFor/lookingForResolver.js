import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver['CreateLookingFor'] = (obj, args, context, info) => {
  // TODO : Authorization
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if (MlCommunityDefinition.findOne({code:args.communityCode})){
    args.communityName=MlCommunityDefinition.findOne({code:args.communityCode}).name;
  }
  let id = MlLookingFor.insert({...args});
  if (id) {
    let code = 200;
    let result = {lookingForId: id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
MlResolver.MlMutationResolver['UpdateLookingFor'] = (obj, args, context, info) => {
  // TODO : Authorization
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if (MlCommunityDefinition.findOne({code:args.communityCode})){
    args.communityName=MlCommunityDefinition.findOne({code:args.communityCode}).name;
  }
  if (args._id) {
    var id= args._id;
    args=_.omit(args,'_id');
    let result = MlLookingFor.update(id, {$set: args});
    let code = 200;
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }

}
MlResolver.MlQueryResolver['FindLookingFor'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response= MlLookingFor.findOne({"_id":id});
    return response;
  }

}

MlResolver.MlQueryResolver['fetchLookingFor'] = (obj, args, context, info) => {
  let result=MlLookingFor.find({isActive:true, communityCode:args.communityCode}).fetch()||[];
  return result;
}


