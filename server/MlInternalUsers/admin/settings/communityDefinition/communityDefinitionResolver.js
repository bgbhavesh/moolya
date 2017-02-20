import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'

MlResolver.MlQueryResolver['fetchCommunityDefinition'] = (obj, args, context, info) => {
  let result=MlCommunityDefinition.find({isActive:true}).fetch()||[];
  return result;
}


