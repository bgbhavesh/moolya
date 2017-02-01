import MlResolver from '../mlAdminResolverDef'
import MlRespPayload from '../../../commons/mlPayload'


MlResolver.MlMutationResolver['createCommunity'] = (obj, args, context, info) =>{
    check(args, Object)
    check(args.name, String)
    check(args.displayName, String)
    check(args.cluster, String)
    check(args.chapter, String)
    check(args.link, String)
    check(args.showOnMap, Boolean)
    check(args.about, String)
    check(args.isActive, Boolean)
        //TODO : Duplicate Community Identification
        // TODO : Authorization
        let id = MlCommunity.insert(args);
        if(id){
            let code = 200;
            let result = {communityId: id}
            var response= JSON.stringify(new MlRespPayload().successPayload(result, code));
            return response;
        }

}
