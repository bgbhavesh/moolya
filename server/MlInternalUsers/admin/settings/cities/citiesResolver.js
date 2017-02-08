

import MlResolver from '../../mlAdminResolverDef'


MlResolver.MlQueryResolver['FetchCities'] = (_,{countryId,stateId},context) =>{
  return MlCities.find({"stateId":stateId}).fetch();
}
