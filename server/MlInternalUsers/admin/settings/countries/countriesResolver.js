

import MlResolver from '../../mlAdminResolverDef'


MlResolver.MlQueryResolver['FetchCountries'] = (_,{name},context) =>{
  return MlCountries.find().fetch();
}
