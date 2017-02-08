import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['CreateSubDepartment'] = (obj, args, context, info) =>{
        // TODO : Authorization
        let id = MlSubDepartments.insert(args);
        if(id){
            let code = 200;
            let result = {subDepartmentId: id}
            let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
            return response
        }
}
