

import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import MlAdminUserContext from '../../../../mlAuthorization/mlAdminUserContext'

let _ = require('lodash');

MlResolver.MlQueryResolver['fetchState'] = (obj, args, context, info) =>{
  let state=null;
  if(args.stateId){
    state =  MlStates.findOne({"_id":args.stateId});
    state.countryName=MlCountries.findOne({_id : state.countryId}).country;
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
  if(userProfile.countryId){
    let resp = MlStates.find({"countryId":userProfile.countryId,"isActive":true}).fetch()
    return resp;
  }
};
MlResolver.MlQueryResolver['FetchActiveStatesForSelect'] = (obj, args, context, info) => {
    let states = MlStates.find({"isActive":true}).fetch()
    states.push({"name" : "All","_id" : "all"});
    return states;
};


MlResolver.MlQueryResolver['fetchStatesPerCountry'] = (obj, args, context, info) => {

  if(args.countryId){
    let resp = MlStates.find({"countryId":args.countryId,"isActive":true}).fetch()
    return resp;
  }
};
