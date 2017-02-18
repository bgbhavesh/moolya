import MlResolver from '../mlAdminResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import MlAuthorization from '../../../mlAuthorization/mlAuthorization'
import geocoder from 'geocoder'


MlResolver.MlMutationResolver['createCluster'] = (obj, args, context, info) => {
    let cluster = args.cluster;
    // let isValidAuth = new MlAuthorization().validteAuthorization(context.userId, args.moduleName, args.actionName);
    // if(!isValidAuth)
    //     return "Not Authorized"

    if(MlClusters.find({countryId:cluster.countryId}).count() > 0){
        let code = 409;
        return new MlRespPayload().errorPayload("Already Exist", code);
    }else{
        geocoder.geocode(cluster.displayName, Meteor.bindEnvironment(function ( err, data ) {
            if(err){
                return "Invalid Country Name";
            }
            cluster.latitude = data.results[0].geometry.location.lat;
            cluster.longitude = data.results[0].geometry.location.lng;
            let id = MlClusters.insert(cluster);
            if(id){
                let code = 200;
                let result = {clusterid: id}
                let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
                return response
            }
        }));
    }
}

MlResolver.MlMutationResolver['upsertCluster'] = (obj, args, context, info) => {
    let cluster = MlClusters.findOne({_id: args.clusterId});
    if(cluster){
        for(key in args.cluster){
            cluster[key] = args.cluster[key]
        }
        let resp = MlClusters.update({_id:args.clusterId}, {$set:cluster}, {upsert:true})
        if(resp){
            let code = 200;
            let result = {cluster: resp}
            let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
            return response
        }
    }
}

MlResolver.MlQueryResolver['fetchCluster'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args._id) {
    var id= args._id;
    let response= MlClusters.findOne({"_id":id});
    return response;
  }
}

MlResolver.MlMutationResolver['updateCluster'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.clusterId) {
    var id= args.clusterId;
    let updatedResponse= MlClusters.update(id, {$set: args.clusterDetails});
    return updatedResponse
  }
}



MlResolver.MlQueryResolver['fetchClustersForMap'] = (obj, args, context, info) => {
      let result=MlClusters.find({isActive:true}).fetch()||[];
      return result;
}

MlResolver.MlQueryResolver['fetchActiveClusters'] = (obj, args, context, info) => {
  let result=MlClusters.find({isActive:true}).fetch()||[];
  return result;
}


 let createcluster = (cluster) =>{
    if(MlClusters.find({countryId:cluster.countryId}).count() > 0){
        let code = 409;
        return new MlRespPayload().errorPayload("Already Exist", code);
    }else{
        let id = MlClusters.insert(cluster);
        if(id){
            let code = 200;
            let result = {clusterid: id}
            let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
            return response
        }
    }
}

module.exports = createcluster
