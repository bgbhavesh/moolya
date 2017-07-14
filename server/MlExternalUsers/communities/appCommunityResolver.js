/**
 * Created by venkatsrinag on 1/5/17.
 */
import MlResolver from '../../commons/mlResolverDef'
import _ from 'lodash'

MlResolver.MlQueryResolver['fetchCommunitiesFromDef'] = (obj, args, context, info) =>{
    let appCommunities = mlDBController.find('MlCommunityDefinition', {isActive:true}, context).fetch();
    return appCommunities;
}

MlResolver.MlQueryResolver['fetchAllCommunitiesFromDef'] = (obj, args, context, info) =>{
  let appCommunities = mlDBController.find('MlCommunityDefinition', {}, context).fetch();
  return appCommunities;
}
