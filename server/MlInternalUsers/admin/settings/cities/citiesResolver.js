import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'

let _ = require('lodash');

MlResolver.MlQueryResolver['fetchCity'] = (obj, args, context, info) =>{
  let city=null;
  if(args.cityId){
    // city =  MlCities.findOne({"_id":args.cityId});
    city = mlDBController.findOne('MlCities', {"_id":args.cityId}, context)
    // city.countryCode=MlCountries.findOne({_id : city.countryId}).country;
    city.countryCode = mlDBController.findOne('MlCountries', {_id: city.countryId}, context).country;
    // city.stateId=MlStates.findOne({_id : city.stateId}).name;
    city.stateId= mlDBController.findOne('MlStates', {_id: city.stateId}, context).name;
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

  // let city = MlCities.findOne({_id: args.cityId});
  let city = mlDBController.findOne('MlCities', {_id: args.cityId}, context)
    if(city){
        // let state = MlStates.findOne({_id:city.stateId})
      let state = mlDBController.findOne('MlStates', {_id: city.stateId}, context)
        for(key in args.city){
            city[key] = args.city[key]
        }
        // let resp = MlCities.update({_id:args.cityId}, {$set:city}, {upsert:true})
      let resp = mlDBController.update('MlCities', args.cityId, city, {$set:true}, context)
      if(resp)
        {
            // let chapter = MlChapters.findOne({"cityId":args.cityId});
          let chapter = mlDBController.findOne('MlChapters', {"cityId":args.cityId}, context)
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
                // let cluster = MlClusters.findOne({"countryId":city.countryId});
              let cluster = mlDBController.findOne('MlClusters', {"countryId":city.countryId}, context)
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
  // let result=MlCities.find().fetch()||[];
  let result = mlDBController.find('MlCities', {}, context).fetch()||[];
  return result;
}

MlResolver.MlQueryResolver['fetchCitiesPerState'] = (obj, args, context, info) => {

  if(args.stateId){
    // let resp = MlCities.find({"stateId":args.stateId,"isActive":true}).fetch()
    let resp = mlDBController.find('MlCities', {"stateId":args.stateId,"isActive":true}, context).fetch()
    return resp;
  }
};

MlResolver.MlQueryResolver['fetchCitiesPerCountry'] = (obj, args, context, info) => {

  if(args.countryId){
    let countryId = args.countryId;
    if(args.countryId.length>5){
      let resp = mlDBController.findOne('MlClusters', {"_id":countryId}, context);
      countryId = resp.countryId;
    }
    // let resp = MlCities.find({"countryId":args.countryId,"isActive":true},{sort: {name:1}}).fetch()
    let resp = mlDBController.find('MlCities', {"countryId":countryId,"isActive":true}, context, {sort: {name:1}}).fetch()
    return resp;
  }
};

MlResolver.MlQueryResolver['searchCities'] = (obj, args, context, info) => {
  let result=[];
  let query={};
  if(args.searchQuery&&args.searchQuery.trim()!==""){
     query={name:{$regex:'.*'+args.searchQuery+'.*',$options:"i"}};
     result = mlDBController.find('MlCities',query, context,{limit:100}).fetch()||[];
  }
  return result;
}

MlResolver.MlQueryResolver['fetchCitiesPerCountryAPI'] = (obj, args, context, info) => {

  if(args.countryId){
    let countryId = args.countryId;
    let cityName=args.cityName;
    let limit=args.limit;
    if(args.countryId.length>5){
      let resp = mlDBController.findOne('MlClusters', {"_id":countryId}, context);
      countryId = resp.countryId;
    }
    var query={"countryId":countryId};

    if(cityName){
      query= {
        "name": { $regex: '.*' + cityName + '.*',$options: "si"},
        "countryId":countryId
      };
    }
    if(!limit){
      limit=100;
    }
    // let resp = MlCities.find({"countryId":args.countryId,"isActive":true},{sort: {name:1}}).fetch()
    let resp = mlDBController.find('MlCities',query, context, {"limit": limit,"fields": {"_id": 1,"name": 1},sort: {name:1}}).fetch();
    var totalCount=MlCities.find(query).count();
    return {
      results: resp,totalCount:totalCount
    };
    // return resp;
  }
};
