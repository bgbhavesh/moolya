import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlQueryResolver.FetchProcessType = (obj, args, context, info) => {
  const result = MlprocessTypes.find({ isActive: true }).fetch() || [];
  return result;
}

