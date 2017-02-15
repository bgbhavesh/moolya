import MlResolver from '../mlAdminResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import MlAuthorization from '../../../mlAuthorization/mlAuthorization'
import geocoder from 'geocoder'


MlResolver.MlMutationResolver['createCluster'] = (obj, args, context, info) => {
    let cluster = args.cluster;
    createcluster(cluster)
    // let isValidAuth = new MlAuthorization().validteAuthorization(context.userId, args.moduleName, args.actionName);
    // if(!isValidAuth)
    //     return "Not Authorized"

    // if(MlClusters.find({countryId:cluster.countryId}).count() > 0){
    //     let code = 409;
    //     return new MlRespPayload().errorPayload("Already Exist", code);
    // }else{
    //
    //     let id = MlClusters.insert(cluster);
    //     if(id){
    //         let code = 200;
    //         let result = {clusterid: id}
    //         let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
    //         return response
    //     }

        // geocoder.geocode(cluster.displayName, Meteor.bindEnvironment(function ( err, data ) {
        //     if(err){
        //         return "Invalid Country Name";
        //     }
        //     cluster.latitude = data.results[0].geometry.location.lat;
        //     cluster.longitude = data.results[0].geometry.location.lng;
        // }));
    // }
}

MlResolver.MlMutationResolver['updateCluster'] = (obj, args, context, info) => {
    console.log(args)
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

}

MlResolver.MlQueryResolver['fetchClusters'] = (obj, args, context, info) => {

}


export let createcluster = (cluster) =>{
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
