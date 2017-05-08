import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlQueryResolver['FetchIdentityTypes'] = (obj, args, context, info) => {
  let result=MlIdentityTypes.find({isActive:true}).fetch()||[];
  return result;
}

MlResolver.MlQueryResolver['FetchCommunityBasedIdentity'] = (obj, args, context, info) => {
  let result=MlIdentityTypes.find({"$and": [{communities: args.communityId, isActive: true}]}).fetch()||[];
  return result;
}

