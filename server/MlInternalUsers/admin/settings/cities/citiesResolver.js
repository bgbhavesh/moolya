

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
  }
  return city?city:null;
}

MlResolver.MlMutationResolver['updateCity'] = (obj, args, context, info) => {

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
                MlResolver.MlMutationResolver['updateChapter'] (obj, {chapterId:chapter._id, chapter:{isActive:city.isActive}}, context, info)
            }
            else {
                let cluster = MlClusters.findOne({"countryId":city.countryId});
                chapter = {
                    clusterId:cluster._id,
                    clusterName:cluster.clusterName,
                    chapterCode:"ML_"+(cluster.clusterCode?cluster.clusterCode+"_":"")+city.name.replace(/ +/g,"").trim(),
                    chapterName:city.name,
                    displayName:city.name,
                    about:"ssw",
                    chapterImage:"image",
                    stateName:state.name,
                    stateId:state._id,
                    cityId:args.cityId,
                    cityName:city.name,
                    email:"moolya@moolya.com",
                    showOnMap:false,
                    isActive:city.isActive
                }
                MlResolver.MlMutationResolver['createChapter'](obj, {chapter:chapter}, context, info)
            }

            let code = 200;
            let result = {city: resp}
            let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
            return response
        }
    }
}
