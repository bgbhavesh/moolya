import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['CreateDepartment'] = (obj, args, context, info) =>{
        // TODO : Authorization
        let id = MlDepartments.insert(args);
        if(id){
            let code = 200;
            let result = {departmentId: id}
            let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
            return response
        }
}
