import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import MlAdminUserContext from '../../../../mlAuthorization/mlAdminUserContext';
const _ = require('lodash')

// todo:// query are been duplicated check and remove the un-used onces
MlResolver.MlQueryResolver.fetchCommunityDefinition = (obj, args, context, info) => {
  const result = MlCommunityDefinition.find({ isActive: true }).fetch() || [];
  return result;
}
MlResolver.MlQueryResolver.fetchCommunityDefinitionForRegistration = (obj, args, context, info) => {
  const loggedInUser = new MlAdminUserContext().userProfileDetails(context.userId);
  let result = []
  if (loggedInUser.roleName == 'communityadmin') {
    const communities = _.map(loggedInUser.defaultCommunities, 'communityCode');
    result = MlCommunityDefinition.find({ isActive: true, code: { $in: communities } }).fetch() || [];
  } else {
    result = MlCommunityDefinition.find({ isActive: true }).fetch() || [];
  }
  return result;
}

MlResolver.MlQueryResolver.fetchCommunityDefinitionForSelect = (obj, args, context, info) => {
  const result = MlCommunityDefinition.find({ isActive: true }).fetch() || [];
  result.push({ name: 'All', code: 'all' });
  return result;
}

MlResolver.MlQueryResolver.fetchCommunityDefinitionAPI = (obj, args, context, info) => {
  const result = MlCommunityDefinition.find({ isActive: true }).fetch() || [];
  return result;
}

MlResolver.MlQueryResolver.fetchCommunityDefinitionForProcessMapping = (obj, args, context, info) => {
  const result = MlCommunityDefinition.find({ isActive: true }).fetch() || [];
  result.push({ name: 'All', code: 'all' });
  return result;
}
