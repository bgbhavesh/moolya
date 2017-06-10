import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'

MlResolver.MlQueryResolver['fetchCommunityDefinition'] = (obj, args, context, info) => {
  let result=MlCommunityDefinition.find({isActive:true}).fetch()||[];
  return result;
}

MlResolver.MlQueryResolver['fetchCommunityDefinitionForSelect'] = (obj, args, context, info) => {
  let result=MlCommunityDefinition.find({isActive:true}).fetch()||[];
  result.push({"name" : "All","code" : "all"});
  return result;
}

MlResolver.MlQueryResolver['fetchCommunityDefinitionAPI'] = (obj, args, context, info) => {
  let result=MlCommunityDefinition.find({isActive:true}).fetch()||[];
  return result;
}

MlResolver.MlQueryResolver['fetchCommunityDefinitionForProcessMapping'] = (obj, args, context, info) => {
  let result=MlCommunityDefinition.find({isActive:true}).fetch()||[];

  return result;
}
