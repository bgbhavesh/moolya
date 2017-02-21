import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['CreateProfession'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (MlIndustries.findOne({_id:args.industryId})){
    args.industryName=MlIndustries.findOne({_id:args.industryId}).industryName;
  }
  let id = MlProfessions.insert(args);
  if (id) {
    let code = 200;
    let result = {professionId: id}
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
  }
}
MlResolver.MlMutationResolver['UpdateProfession'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (MlIndustries.findOne({_id:args.industryId})){
    args.industryName=MlIndustries.findOne({_id:args.industryId}).industryName;
  }
  if (args._id) {
    var id= args._id;
    let updatedResponse= MlProfessions.update(id, {$set: args});
    return updatedResponse
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

