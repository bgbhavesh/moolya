import MlResolver from '../mlAdminResolverDef'
import MlRespPayload from '../../../commons/mlPayload'


MlResolver.MlMutationResolver['createCluster'] = (obj, args, context, info) =>{
    check(args, Object)
    check(args.countryId, String)
    check(args.displayName, String)
    check(args.about, String)
    check(args.email, String)
    check(args.showOnMap, String)
    check(args.isActive, String)
    if(MlClusters.find({countryId:args.countryId})){
        let code = 409;
        return new MlRespPayload.errorPayload("Already Exist", code);
    }else{
        // TODO : Authorization
        let id = MlClusters.insert(args);
        if(id){
            let code = 200;
            let result = {clusterid: id}
            return new MlRespPayload.successPayload(result, code);
        }
    }
}
