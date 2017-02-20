import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['CreateLookingFor'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (MlCommunityDefinition.findOne({code:args.communityCode})){
    args.communityName=MlCommunityDefinition.findOne({code:args.communityCode}).name;
  }
  let id = MlLookingFor.insert(args);
  if (id) {
    let code = 200;
    let result = {lookingForId: id}
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
MlResolver.MlMutationResolver['UpdateLookingFor'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let updatedResponse = MlLookingFor.update(id, {$set: args});
    return updatedResponse
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


