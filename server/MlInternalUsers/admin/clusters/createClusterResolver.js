import MlResolver from '../mlAdminResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import MlAuthorizationLayer from '../../../mlAuthorization/mlAuthorization'


MlResolver.MlMutationResolver['createCluster'] = (obj, args, context, info) =>
{

    let authStatus = MlAuthorizationLayer.validteAuthorization(userId, moduleId, context, action)
    check(args, Object)
    check(args.countryId, String)
    check(args.displayName, String)
    check(args.link, String)
    check(args.about, String)
    check(args.email, String)
    check(args.showOnMap, Boolean)
    check(args.isActive, Boolean)
    if(MlClusters.find({countryId:args.countryId}).count()>0){
        let code = 409;
        return new MlRespPayload().errorPayload("Already Exist", code);
    }else{
        // TODO : Authorization
        let id = MlClusters.insert(args);
        if(id){
            let code = 200;
            let result = {clusterid: id}
            let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
            return response
        }
    }
}
