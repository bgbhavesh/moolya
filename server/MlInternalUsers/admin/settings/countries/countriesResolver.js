

import MlResolver from '../../mlAdminResolverDef'


MlResolver.MlQueryResolver['fetchCountries'] = (obj, args, context, info) =>{
    return MlCountries.find().fetch();
}
MlResolver.MlQueryResolver['fetchCountry'] = (obj, args, context, info) =>{
    let country=null;
    if(countryCode){
        country =  MlCountries.findOne({"countryCode":args.countryCode});
    }
    return country?country:null;
}
MlResolver.MlQueryResolver['fetchCountriesSearch'] = (obj, args, context, info) =>{
    return MlCountries.find({"country":{ $regex:"^"+args.searchQuery, $options: "si" }}).fetch();
}
