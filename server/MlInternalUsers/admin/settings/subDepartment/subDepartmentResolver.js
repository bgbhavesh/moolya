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
MlResolver.MlMutationResolver['updateSubDepartment'] = (obj, args, context, info) =>{
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let resp = MlSubDepartments.update(id, {$set: args});
    return resp;
  }

}
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
    let id = MlSubDepartments.insert({...args.subDepartment});
    if(id){
        let code = 200;
        let result = {subDepartmentId: id}
        let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
        return response
    }
}

MlResolver.MlMutationResolver['updateSubDepartment'] = (obj, args, context, info) =>{
  let subDepartment = MlSubDepartments.findOne({_id: args.subDepartmentId});
  if(subDepartment)
  {
    /* for(key in args.department){
     cluster[key] = args.department[key]
     }*/
    let resp = MlSubDepartments.update({_id:args.subDepartmentId}, {$set:args.subDepartment}, {upsert:true})
    if(resp){
      let code = 200;
      let result = {cluster: resp}
      let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
      return response
    }
  }

}

MlResolver.MlQueryResolver['findSubDepartment'] = (obj, args, context, info) =>{
    return MlSubDepartments.findOne({"_id":args._id});
}

MlResolver.MlQueryResolver['findSubDepartments'] = (obj, args, context, info) =>{

}

MlResolver.MlQueryResolver['fetchActiveSubDepartments'] = (obj, args, context, info) =>{
    let department = MlDepartments.findOne({"_id":args.departmentId})
    if(department && department.departmentName) {
      let response = MlSubDepartments.find({"$and": [{"departmentId": department.departmentName}, {"isActive": true}]}).fetch()
      return response;
    }

}


MlResolver.MlQueryResolver['fetchSubDepartments'] = (obj, args, context, info) => {
  if (args.id) {
    var id= args.id;
    let response= MlSubDepartments.find({"departmentId":id}).fetch()||[];
    return response;
  }
}
