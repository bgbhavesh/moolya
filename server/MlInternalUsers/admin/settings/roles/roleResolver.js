
import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'

MlResolver.MlQueryResolver['fetchRole'] = (obj, args, context, info) =>{
  return MlRoles.findOne({name});
}

MlResolver.MlMutationResolver['createRole'] = (obj, args, context, info) =>{

    let role = args.role;

    if(MlClusters.find({roleName:role.roleName}).count() > 0){
        let code = 409;
        return new MlRespPayload().errorPayload("Already Exist", code);
    }
    let id = MlRoles.insert(args.role);
    if(id){
        let code = 200;
        let result = {roleId: id}
        let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
        return response
    }
    return "true";
}
