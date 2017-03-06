
import MlResolver from '../../mlAdminResolverDef'
import {createcluster} from '../../clusters/clusterResolver'
import MlRespPayload from '../../../../commons/mlPayload'

MlResolver.MlQueryResolver['fetchCountries'] = (obj, args, context, info) =>{
    let result=MlCountries.find().fetch();
    let code = 200;
    let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    return result
}
MlResolver.MlQueryResolver['fetchCountry'] = (obj, args, context, info) =>{
    let country=null;
    if(args.countryId){
        country =  MlCountries.findOne({"_id":args.countryId});
    }
    return country?country:null;
}
MlResolver.MlQueryResolver['fetchCountriesSearch'] = (obj, args, context, info) =>{
    return MlCountries.find({}).fetch();
}


MlResolver.MlMutationResolver['updateCountry'] = (obj, args, context, info) => {
    let cluster = args.cluster;
    let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
    if (!isValidAuth) {
      let code = 401;
      let response = new MlRespPayload().errorPayload("Not Authorized", code);
      return response;
    }

    let country = MlCountries.findOne({_id: args.countryId});
    if(country){
        for( key in args.country){
            country[key] = args.country[key]
        }
        let resp = MlCountries.update({_id:args.countryId}, {$set:country}, {upsert:true})
        if(resp){
          let cluster = MlClusters.findOne({"countryId":args.countryId});
          if(cluster){
            let status = {};
            if(country.isActive){
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
            // let Args = {clusterId:cluster._id, cluster:{isActive:country.isActive}};
            MlResolver.MlMutationResolver['upsertCluster'] (obj, {clusterId:cluster._id, cluster:{isActive:country.isActive, clusterName:country.country, status}, moduleName:"CLUSTER",actionName:"UPDATE"}, context, info)
          }
          else {
            cluster = {
              countryId:args.countryId,
              clusterCode:country.countryCode,
              countryName : country.country,
              clusterName:country.country,
              displayName: country.displayName,
              countryFlag: country.url,
              about:"",
              email:"",
              showOnMap:false,
              isActive:false,
              status:{
                code:100,
                description:"To Be Assigned"
              },
            }
            MlResolver.MlMutationResolver['createCluster'](obj, {cluster:cluster, moduleName:"CLUSTER", actionName:"CREATE"}, context, info)
          }
            let code = 200;
            let result = {country: resp}
            let response = new MlRespPayload().successPayload(result, code);
            return response
        }
    }
}
