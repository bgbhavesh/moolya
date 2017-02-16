

import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'

let _ = require('lodash');

MlResolver.MlQueryResolver['fetchCities'] = (obj, args, context, info) =>
{
    let allCities = [];
    let states = MlStates.find({"$and":[{"countryId":args.countryId}, {"isActive": true}]}).fetch()
    if(states && states.length > 0){
        for(var i = 0; i < states.length; i++){
            let cities = MlCities.find({"stateId":states[i]._id}).fetch();
            if(cities && cities.length > 0){
                _.merge(allCities, cities)
            }
        }
    }
    return allCities;
}


MlResolver.MlMutationResolver['updateCity'] = (obj, args, context, info) => {
    console.log(args)
    let city = MlCities.findOne({_id: args.cityId});
    if(city){
        for(key in args.city){
            city[key] = args.city[key]
        }
        let resp = MlCities.update({_id:args.cityId}, {$set:city}, {upsert:true})
        if(resp){
            let code = 200;
            let result = {city: resp}
            let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
            return response
        }
    }
}
