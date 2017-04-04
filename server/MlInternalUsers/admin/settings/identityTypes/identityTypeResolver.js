import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlQueryResolver['FetchIdentityTypes'] = (obj, args, context, info) => {
  let result=MlIdentityTypes.find({isActive:true}).fetch()||[];
  return result;
}
