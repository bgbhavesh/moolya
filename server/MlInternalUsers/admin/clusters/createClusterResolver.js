import MlResolver from '../mlAdminResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import MlAuthorization from '../../../mlAuthorization/mlAuthorization'
import geocoder from 'geocoder'


MlResolver.MlMutationResolver['createCluster'] = (obj, args, context, info) =>
{
    let isValidAuth = new MlAuthorization().validteAuthorization(context.userId, args.moduleName, args.actionName);
    if(!isValidAuth)
        return "Not Authorized"

    if(MlClusters.find({countryId:args.countryId}).count() > 0){
        let code = 409;
        return new MlRespPayload().errorPayload("Already Exist", code);
    }else{

        geocoder.geocode(args.displayName, function ( err, data ) {
            // do something with data
            args.latitude = data.results[0].geometry.location.lat;
            args.longitude = data.results[0].geometry.location.lng;
            let id = MlClusters.insert(args);
            if(id){
                let code = 200;
                let result = {clusterid: id}
                let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
                return response
            }
        });


    }
}
