

import MlResolver from '../../mlAdminResolverDef'


MlResolver.MlQueryResolver['FetchStates'] = (_,{countryId},context) =>{
  return MlStates.find({"countryId":countryId}).fetch();
}
