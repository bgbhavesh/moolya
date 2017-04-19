import MlResolver from '../../mlAdminResolverDef'
import {createcluster} from '../../clusters/clusterResolver'
import MlRespPayload from '../../../../commons/mlPayload'

MlResolver.MlQueryResolver['fetchCurrency'] = (obj, args, context, info) =>{
  let currency;
    currency =  MlCurrencyType.find({isActive: true}).fetch();
  return currency;
}
