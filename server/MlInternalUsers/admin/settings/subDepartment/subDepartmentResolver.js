import MlResolver from '../../../../commons/mlResolverDef'
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
    // let resp = MlSubDepartments.update(id, {$set: args});
    let resp = mlDBController.update('MlSubDepartments', id, args, {$set:true}, context)
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
    // if(MlSubDepartments.find({subDepartmentName:args.subDepartment.subDepartmentName}).count() > 0){
    if(mlDBController.find('MlSubDepartments', {subDepartmentName:args.subDepartment.subDepartmentName}, context).count() > 0){
        let code = 409;
        return new MlRespPayload().errorPayload("Already Exist", code);
    }
    // let id = MlSubDepartments.insert({...args.subDepartment});
    let id = mlDBController.insert('MlSubDepartments', args.subDepartment, context)
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
    // let subDepartment = MlSubDepartments.findOne({_id: args.subDepartmentId});
    let subDepartment = mlDBController.findOne('MlSubDepartments', {_id: args.subDepartmentId}, context)
    if(subDepartment)
    {
      if(subDepartment.isSystemDefined){
        let code = 409;
        let response = new MlRespPayload().errorPayload("Cannot edit system defined sub-department", code);
        return response;
      }else {
        // let resp = MlSubDepartments.update({_id: args.subDepartmentId}, {$set: args.subDepartment}, {upsert: true})
        let resp = mlDBController.update('MlSubDepartments', args.subDepartmentId, args.subDepartment, {$set:true}, context)
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
    // let subDepartment = MlSubDepartments.findOne({departmentId: args.departmentId});
    let subDepartment = mlDBController.findOne('MlSubDepartments', {departmentId: args.departmentId}, context)
    if(subDepartment) {
      subDepartment.subDepatmentAvailable = args.depatmentAvailable;
      // let resp = MlSubDepartments.update({departmentId: args.departmentId}, {$set: subDepartment}, {upsert: true})
      let resp = mlDBController.update('MlSubDepartments', {departmentId: args.departmentId}, subDepartment, {$set:true}, context)
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
    // return MlSubDepartments.findOne({"_id":args._id});
    return mlDBController.findOne('MlSubDepartments', {"_id": args._id}, context)
}

MlResolver.MlQueryResolver['findSubDepartments'] = (obj, args, context, info) =>{

}

MlResolver.MlQueryResolver['fetchActiveSubDepartments'] = (obj, args, context, info) =>{
    // let department = MlDepartments.findOne({"_id":args.departmentId})
    let department = mlDBController.findOne('MlDepartments', {"_id":args.departmentId}, context)
    if(department && department.departmentName) {
      // let response = MlSubDepartments.find({"$and": [{"departmentId": department.departmentName}, {"isActive": true}]}).fetch()
      let response = mlDBController.find('MlSubDepartments', {"$and": [{"departmentId": department.departmentName}, {"isActive": true}]}, context).fetch()
      return response;
    }

}


MlResolver.MlQueryResolver['fetchSubDepartments'] = (obj, args, context, info) => {
  if (args.id) {
    var id= args.id;
    // let response= MlSubDepartments.find({"departmentId":id,"isActive":true}).fetch()||[];
    let response= mlDBController.find('MlSubDepartments', {"departmentId":id,"isActive":true}, context).fetch()||[];
    return response;
  }
}

MlResolver.MlQueryResolver['fetchSubDepartmentsForRegistration'] = (obj, args, context, info) => {
  if (args.id) {
    var id= args.id;
    // let response= MlSubDepartments.find({"departmentId":id}).fetch()||[];
    let response= mlDBController.find('MlSubDepartments', {"departmentId":id}, context).fetch()||[];
    return response;
  }
}
