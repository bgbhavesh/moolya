import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'



MlResolver.MlMutationResolver['CreateDepartment'] = (obj, args, context, info) => {
  // TODO : Authorization

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
