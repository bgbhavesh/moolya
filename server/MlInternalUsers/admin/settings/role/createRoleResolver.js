import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['CreateRole'] = (obj, args, context, info) => {
        // TODO : Authorization
        let id = MlRole.insert(args);
        if(id){
            let code = 200;
            let result = {roleId: id}
            let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
            return response
        }
}
