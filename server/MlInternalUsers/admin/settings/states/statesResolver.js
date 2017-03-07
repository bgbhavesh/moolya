

import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import MlAdminUserContext from '../../../../mlAuthorization/mlAdminUserContext'

let _ = require('lodash');
MlResolver.MlQueryResolver['fetchStates'] = (obj, args, context, info) =>
{
    // var allStates = [], s = [];
    // var countries = MlCountries.find({"isActive": true}).fetch()
    // if(countries && countries.length > 0){
    //     for(var i = 0; i < countries.length; i++){
    //         let states = MlStates.find({"countryId":countries[i]._id}).fetch();
    //         if(states && states.length > 0){
    //             allStates = allStates.concat(states)
    //         }
    //     }
    // }
    // return {data:allStates,totalRecords:allStates&&allStates.length?allStates.length:0};
}
MlResolver.MlQueryResolver['fetchState'] = (obj, args, context, info) =>{
  let state=null;
  if(args.stateId){
    state =  MlStates.findOne({"_id":args.stateId});
  }
  return state?state:null;
}

MlResolver.MlMutationResolver['updateState'] = (obj, args, context, info) => {
    let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
    if (!isValidAuth) {
      let code = 401;
      let response = new MlRespPayload().errorPayload("Not Authorized", code);
      return response;
    }
    let state = MlStates.findOne({_id: args.stateId});
    if(state){
        for(key in args.state){
          state[key] = args.state[key]
        }
        let resp = MlStates.update({_id:args.stateId}, {$set:state}, {upsert:true})
        if(resp){
            let code = 200;
            let result = {state: resp}
            let response = new MlRespPayload().successPayload(result, code);
            return response
        }
    }
}
MlResolver.MlQueryResolver['FetchActiveStates'] = (obj, args, context, info) => {
  let userProfile = new MlAdminUserContext().getDefaultCountry(context.userId);
  console.log(userProfile)
  if(userProfile.countryId){
    let resp = MlStates.find({"countryId":userProfile.countryId,"isActive":true}).fetch()
    return resp;
  }
};

