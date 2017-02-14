/**
 * Created by muralidhar on 14/02/17.
 */
import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['CreateUser'] = (obj, args, context, info) => {
        // TODO : Authorization
        let id = Ml.insert(args);
        if(id){
            let code = 200;
            let result = {userId: id}
            let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
            return response
        }
}
