import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['createDepartment'] = (obj, args, context, info) =>
{
    let isValidAuth = new MlAuthorization().validteAuthorization(context.userId, args.moduleName, args.actionName);
    if(!isValidAuth)
      return "Not Authorized"

  if (args._id) {
    var id= args._id;
    //delete args._id;
    MlDepartments.update(id, {$set: args});
    //{"_id":id}, {$unset: args});
  }
  else {
    let id = MlDepartments.insert(args);
    if (id) {
      let code = 200;
      let result = {departmentId: id}
      let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
      return response
    }
  }
}
