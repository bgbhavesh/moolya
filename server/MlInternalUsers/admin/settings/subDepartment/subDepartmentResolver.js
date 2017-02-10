import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['CreateSubDepartment'] = (obj, args, context, info) =>{
        // TODO : Authorization

 if (args._id) {
    var id= args._id;
    MlSubDepartments.update(id, {$set: args});
  }
  else {
    let id = MlSubDepartments.insert(args);
    if (id) {
      let code = 200;
      let result = {subDepartmentId: id}
      let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
      return response
    }
  }
}

MlResolver.MlMutationResolver['UpdateSubDepartment'] = (obj, args, context, info) =>{
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let resp = MlSubDepartments.update(id, {$set: args});
    return resp;
  }

}

MlResolver.MlQueryResolver['FindSubDepartment'] = (obj, args, context, info) =>{
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response = MlSubDepartments.findOne({'_id':id});
    return response;
  }

}
