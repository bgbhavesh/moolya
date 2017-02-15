

import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlQueryResolver['fetchCountries'] = (obj, args, context, info) =>{
    let result=MlCountries.find().fetch();
    let code = 200;
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return response
}
MlResolver.MlQueryResolver['fetchCountry'] = (obj, args, context, info) =>{
    let country=null;
    if(countryCode){
        country =  MlCountries.findOne({"_id":args.countryId});
    }
    return country?country:null;
}
MlResolver.MlQueryResolver['fetchCountriesSearch'] = (obj, args, context, info) =>{
    return MlCountries.find({}).fetch();
}


MlResolver.MlMutationResolver['updateCountry'] = (obj, args, context, info) => {
    console.log(args)
    let country = MlCountries.findOne({_id: args.countryId});
    if(country){
        for( key in args.country){
            country[key] = args.country[key]
        }
        let resp = MlCountries.update({_id:args.countryId}, {$set:country}, {upsert:true})
        if(resp){
            let code = 200;
            let result = {cluster: resp}
            let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
            return response
        }
    }
}
