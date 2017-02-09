import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['createDepartment'] = (obj, args, context, info) =>
{
    let isValidAuth = new MlAuthorization().validteAuthorization(context.userId, args.moduleName, args.actionName);
    if(!isValidAuth)
      return "Not Authorized"

    let id = MlDepartments.insert(args);
    if(id){
        let code = 200;
        let result = {departmentId: id}
        let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
        return response
    }
}
