import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

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
    let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
    if (!isValidAuth) {
      let code = 401;
      let response = new MlRespPayload().errorPayload("Not Authorized", code);
      return response;
    }
    if(MlSubDepartments.find({subDepartmentName:args.subDepartment.subDepartmentName}).count() > 0){
        let code = 409;
        return new MlRespPayload().errorPayload("Already Exist", code);
    }
    let id = MlSubDepartments.insert({...args.subDepartment});
    if(id){
        let code = 200;
        let result = {subDepartmentId: id}
        let response = new MlRespPayload().successPayload(result, code);
        return response
    }
}

MlResolver.MlMutationResolver['updateSubDepartment'] = (obj, args, context, info) =>{
/*  let subDepartment = MlSubDepartments.findOne({_id: args.subDepartmentId});
  if(subDepartment)
  {
    if(subDepartment.isSystemDefined){
      let code = 409;
      let response = new MlRespPayload().errorPayload("Cannot edit system defined sub-department", code);
      return response;
    }else {
      let resp = MlSubDepartments.update({_id: args.subDepartmentId}, {$set: args.subDepartment}, {upsert: true})
      if (resp) {
        let code = 200;
        let result = {cluster: resp}
        let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
        return response
      }
    }
  }*/
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if (args.subDepartmentId) {
    let subDepartment = MlSubDepartments.findOne({_id: args.subDepartmentId});
    if(subDepartment)
    {
      if(subDepartment.isSystemDefined){
        let code = 409;
        let response = new MlRespPayload().errorPayload("Cannot edit system defined sub-department", code);
        return response;
      }else {
        let resp = MlSubDepartments.update({_id: args.subDepartmentId}, {$set: args.subDepartment}, {upsert: true})
        if (resp) {
          let code = 200;
          let result = {cluster: resp}
          let response = new MlRespPayload().successPayload(result, code);
          return response
        }
      }
    }

  }
  if (args.departmentId) {
    let subDepartment = MlSubDepartments.findOne({departmentId: args.departmentId});
    subDepartment.subDepatmentAvailable = args.depatmentAvailable;
    if(subDepartment) {
      let resp = MlSubDepartments.update({departmentId: args.departmentId}, {$set: subDepartment}, {upsert: true})
      if (resp) {
        let code = 200;
        let result = {cluster: resp}
        let response = new MlRespPayload().successPayload(result, code);
        return response
      }
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
    let response= MlSubDepartments.find({"departmentId":id,"isActive":true}).fetch()||[];
    return response;
  }
}

MlResolver.MlQueryResolver['fetchSubDepartmentsForRegistration'] = (obj, args, context, info) => {
  if (args.id) {
    var id= args.id;
    let response= MlSubDepartments.find({"departmentId":id}).fetch()||[];
    return response;
  }
}
