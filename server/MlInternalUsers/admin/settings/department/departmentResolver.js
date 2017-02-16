import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'

MlResolver.MlMutationResolver['createDepartment'] = (obj, args, context, info) => {
    if(MlDepartments.find({name:args.department.name}).count() > 0){
        let code = 409;
        return new MlRespPayload().errorPayload("Already Exist", code);
    }
    let id = MlDepartments.insert(args.department);
    if(id){
        let code = 200;
        let result = {clusterid: id}
        let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
        return response
    }
}

MlResolver.MlMutationResolver['updateDepartment'] = (obj, args, context, info) => {
    console.log(args)
    let department = MlDepartments.findOne({_id: args.departmentId});
    if(department)
    {
        for(key in args.department){
            cluster[key] = args.department[key]
        }
        let resp = MlDepartments.update({_id:args.departmentId}, {$set:department}, {upsert:true})
        if(resp){
            let code = 200;
            let result = {cluster: resp}
            let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
            return response
        }
    }

}

MlResolver.MlQueryResolver['findDepartment'] = (obj, args, context, info) => {

}

MlResolver.MlQueryResolver['findDepartments'] = (obj, args, context, info) => {

}

// MlResolver.MlMutationResolver['CreateDepartment'] = (obj, args, context, info) => {
//    // TODO : Authorization
//
//        if (args._id) {
//        var id= args._id;
//        let updatedResponse= MlDepartments.update(id, {$set: args});
//          console.log(updatedResponse)
//        }
//     else {
//       let id = MlDepartments.insert(args);
//      if (id) {
//          let code = 200;
//        let result = {departmentId: id}
//        let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
//          return response
//        }
//        }
// }
// MlResolver.MlMutationResolver['UpdateDepartment'] = (obj, args, context, info) => {
//   // TODO : Authorization
//
//   if (args._id) {
//     var id= args._id;
//     let updatedResponse= MlDepartments.update(id, {$set: args});
//     console.log(updatedResponse)
//     return updatedResponse
//   }
//
// }
// MlResolver.MlQueryResolver['FindDepartment'] = (obj, args, context, info) => {
//   // TODO : Authorization
//
//   if (args._id) {
//     var id= args._id;
//     let response= MlDepartments.findOne({"_id":id});
//     console.log(response)
//     return response;
//   }
//
// }

