import MlResolver from '../../../../commons/mlResolverDef'
import { createcluster } from '../../clusters/clusterResolver'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash'
MlResolver.MlQueryResolver.fetchCurrency = (obj, args, context, info) => {
  let currency;
  currency = MlCurrencyType.find({ isActive: true }).fetch();
  currenctUniq = _.uniqBy(currency, e => e.currencyName);
  currencySort = _.sortBy(currenctUniq, 'currencyName');
  return currencySort;
}
