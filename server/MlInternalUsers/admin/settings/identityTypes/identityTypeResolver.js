import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlQueryResolver.FetchIdentityTypes = (obj, args, context, info) => {
  const result = MlIdentityTypes.find({ isActive: true }).fetch() || [];
  return result;
}

MlResolver.MlQueryResolver.FetchCommunityBasedIdentity = (obj, args, context, info) => {
  const result = MlIdentityTypes.find({ $and: [{ communities: args.communityId, isActive: true }] }).fetch() || [];
  return result;
}

MlResolver.MlQueryResolver.FetchCommunityIdentity = (obj, args, context, info) => {
  const communities = args.communities
  const identity = [];
  if (communities && communities.length > 0) {
    if (communities.length == 1 && communities[0] == 'all') {
      const result = MlIdentityTypes.find({ isActive: true }).fetch() || [];
      return result;
    }
    const identityDetails = []
    communities.map((communityId) => {
      const result = MlIdentityTypes.find({ $and: [{ communities: communityId, isActive: true }] }).fetch() || [];
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          identityDetails.push(result[i]);
        }
      }
    });
    if (identityDetails.length > 0) {
      response = _.uniqBy(identityDetails, e => e._id);
      return response
    }
  }
}
