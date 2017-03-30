

import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'

let _ = require('lodash');

MlResolver.MlQueryResolver['fetchCities'] = (obj, args, context, info) =>
{
    // let allCities = [];
    // let states = MlStates.find({"isActive": true}).fetch()
    // if(states && states.length > 0){
    //     for(var i = 0; i < states.length; i++){
    //         let cities = MlCities.find({"stateId":states[i]._id}).fetch();
    //         if(cities && cities.length > 0){
    //             allCities = allCities.concat(cities)
    //         }
    //     }
    // }
    // return {data:allCities,totalRecords:allCities&&allCities.length?allCities.length:0};
}

MlResolver.MlQueryResolver['fetchCity'] = (obj, args, context, info) =>{
  let city=null;
  if(args.cityId){
    city =  MlCities.findOne({"_id":args.cityId});
    city.countryCode=MlCountries.findOne({_id : city.countryId}).country;
    city.stateId=MlStates.findOne({_id : city.stateId}).name;
  }
  return city?city:null;
}

MlResolver.MlMutationResolver['updateCity'] = (obj, args, context, info) => {
    let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
    if (!isValidAuth) {
      let code = 401;
      let response = new MlRespPayload().errorPayload("Not Authorized", code);
      return response;
    }

  let city = MlCities.findOne({_id: args.cityId});
    if(city){
        let state = MlStates.findOne({_id:city.stateId})
        for(key in args.city){
            city[key] = args.city[key]
        }
        let resp = MlCities.update({_id:args.cityId}, {$set:city}, {upsert:true})
        if(resp)
        {
            let chapter = MlChapters.findOne({"cityId":args.cityId});
            if(chapter){
                let status = {};
                if(city.isActive){
                  status= {
                    code: 101,
                    description :"Work In Progress"
                  }
                }else{
                  status= {
                    code: 110,
                    description :"Inactive"
                  }
                }
                MlResolver.MlMutationResolver['updateChapter'] (obj, {chapterId:chapter._id, chapter:{isActive:city.isActive,status}}, context, info)
            }
            else {
                let cluster = MlClusters.findOne({"countryId":city.countryId});
                chapter = {
                    clusterId:cluster._id,
                    clusterName:cluster.clusterName,
                    chapterCode:"ML_"+(cluster.clusterCode?cluster.clusterCode+"_":"")+city.name.replace(/ +/g,"").trim(),
                    chapterName:city.name,
                    displayName:city.name,
                    about:"",
                    chapterImage:"",
                    stateName:state.name,
                    stateId:state._id,
                    cityId:args.cityId,
                    cityName:city.name,
                    email:"moolya@moolya.com",
                    showOnMap:false,
                    isActive:false,
                    status:{
                      code:100,
                      description:"To Be Assigned"
                    },
                }
                MlResolver.MlMutationResolver['createChapter'](obj, {chapter:chapter}, context, info)
            }

            let code = 200;
            let result = {city: resp}
            let response = new MlRespPayload().successPayload(result, code);
            return response
        }
    }
}
MlResolver.MlQueryResolver['fetchCities'] = (obj, args, context, info) => {
  let result=MlCities.find().fetch()||[];
  return result;
}

MlResolver.MlQueryResolver['fetchCitiesPerState'] = (obj, args, context, info) => {

  if(args.stateId){
    let resp = MlCities.find({"stateId":args.stateId,"isActive":true}).fetch()
    return resp;
  }
};

MlResolver.MlQueryResolver['fetchCitiesPerCountry'] = (obj, args, context, info) => {

  if(args.countryId){
    let resp = MlCities.find({"countryId":args.countryId,"isActive":true}).fetch()
    return resp;
  }
};

