/**
 * Created by muralidhar on 14/02/17.
 */
import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['CreateFilter'] = (obj, args, context, info) => {
        // TODO : Authorization
        let id = MlFilters.insert({...args.filterObject});
        if(id){
            let code = 200;
            let result = {roleId: id}
            let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
            return response
        }
}
