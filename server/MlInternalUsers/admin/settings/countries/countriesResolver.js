

import MlResolver from '../../mlAdminResolverDef'


MlResolver.MlQueryResolver['FetchCountries'] = (_,{name},context) =>{
  return MlCountries.find().fetch();
}
MlResolver.MlQueryResolver['FetchCountry'] = (_,{countryCode},context) =>{
  let country=null;
  if(countryCode){
    country =  MlCountries.findOne({"countryCode":countryCode});
  }
  return country?country:null;
}
MlResolver.MlQueryResolver['FetchCountriesSearch'] = (_,{searchQuery},context) =>{
  return MlCountries.find({"country":{ $regex:"^"+searchQuery, $options: "si" }}).fetch();
}
