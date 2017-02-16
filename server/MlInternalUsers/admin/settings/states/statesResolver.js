

import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'

let _ = require('lodash');
MlResolver.MlQueryResolver['fetchStates'] = (obj, args, context, info) =>
{
    let allStates = [];
    let countries = MlCountries.find({"$and":[{"countryId":args.countryId}, {"isActive": true}]}).fetch()
    if(countries && countries.length > 0){
        for(var i = 0; i < countries.length; i++){
            let states = MlStates.find({"stateId":states[i]._id}).fetch();
            if(MlStates && MlStates.length > 0){
                _.merge(allStates, states)
            }
        }
    }
    return allStates;
}

MlResolver.MlMutationResolver['updateState'] = (obj, args, context, info) => {
    console.log(args)
    let state = MlStates.findOne({_id: args.stateId});
    if(state){
        for(key in args.state){
          state[key] = args.state[key]
        }
        let resp = MlStates.update({_id:args.stateId}, {$set:state}, {upsert:true})
        if(resp){
            let code = 200;
            let result = {state: resp}
            let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
            return response
        }
    }
}
