import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver['CreateDepartment'] = (obj, args, context, info) => {
   // TODO : Authorization

       if (args._id) {
       var id= args._id;
       let updatedResponse= MlDepartments.update(id, {$set: args});
         console.log(updatedResponse)
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
MlResolver.MlMutationResolver['UpdateDepartment'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let updatedResponse= MlDepartments.update(id, {$set: args});
    console.log(updatedResponse)
    return updatedResponse
  }

}
MlResolver.MlQueryResolver['FindDepartment'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response= MlDepartments.findOne({"_id":id});
    console.log(response)
    return response;
  }

}

