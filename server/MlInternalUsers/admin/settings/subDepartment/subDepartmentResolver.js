import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


// MlResolver.MlMutationResolver['CreateSubDepartment'] = (obj, args, context, info) =>{
//         // TODO : Authorization
//
//  if (args._id) {
//     var id= args._id;
//     MlSubDepartments.update(id, {$set: args});
//   }
//   else {
//     let id = MlSubDepartments.insert(args);
//     if (id) {
//       let code = 200;
//       let result = {subDepartmentId: id}
//       let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
//       return response
//     }
//   }
// }
//
// MlResolver.MlMutationResolver['UpdateSubDepartment'] = (obj, args, context, info) =>{
//   // TODO : Authorization
//
//   if (args._id) {
//     var id= args._id;
//     let resp = MlSubDepartments.update(id, {$set: args});
//     return resp;
//   }
//
// }
//
// MlResolver.MlQueryResolver['FindSubDepartment'] = (obj, args, context, info) =>{
//   // TODO : Authorization
//
//   if (args._id) {
//     var id= args._id;
//     let response = MlSubDepartments.findOne({'_id':id});
//     return response;
//   }
//
// }

MlResolver.MlMutationResolver['createSubDepartment'] = (obj, args, context, info) =>{
    if(MlSubDepartments.find({subDepartmentName:args.subDepartment.subDepartmentName}).count() > 0){
        let code = 409;
        return new MlRespPayload().errorPayload("Already Exist", code);
    }
    let id = MlSubDepartments.insert(args.subDepartment);
    if(id){
        let code = 200;
        let result = {subDepartmentId: id}
        let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
        return response
    }
}

MlResolver.MlMutationResolver['updateSubDepartment'] = (obj, args, context, info) =>{

}

MlResolver.MlQueryResolver['findSubDepartment'] = (obj, args, context, info) =>{
    return MlSubDepartments.findOne({"_id":args._id});
}

MlResolver.MlQueryResolver['findSubDepartments'] = (obj, args, context, info) =>{

}
