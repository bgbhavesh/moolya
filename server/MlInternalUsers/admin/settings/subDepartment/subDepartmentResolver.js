import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';
import MlEmailNotification from '../../../../mlNotifications/mlEmailNotifications/mlEMailNotification'

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
MlResolver.MlMutationResolver.updateSubDepartment = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    // let resp = MlSubDepartments.update(id, {$set: args});
    const resp = mlDBController.update('MlSubDepartments', id, args, { $set: true }, context)
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

MlResolver.MlMutationResolver.createSubDepartment = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }
  // if(MlSubDepartments.find({subDepartmentName:args.subDepartment.subDepartmentName}).count() > 0){
  if (mlDBController.find('MlSubDepartments', { subDepartmentName: args.subDepartment.subDepartmentName }, context).count() > 0) {
    const code = 409;
    return new MlRespPayload().errorPayload('Sub-department already exists!', code);
  }
  let firstName = ''; let lastName = '';
  // let id = MlDepartments.insert({...args.department});
  if (Meteor.users.findOne({ _id: context.userId })) {
    const user = Meteor.users.findOne({ _id: context.userId }) || {}
    if (user && user.profile && user.profile.isInternaluser && user.profile.InternalUprofile) {
      firstName = (user.profile.InternalUprofile.moolyaProfile || {}).firstName || '';
      lastName = (user.profile.InternalUprofile.moolyaProfile || {}).lastName || '';
    } else if (user && user.profile && user.profile.isExternaluser) { // resolve external user context based on default profile
      firstName = (user.profile || {}).firstName || '';
      lastName = (user.profile || {}).lastName || '';
    }
  }
  const createdBy = `${firstName} ${lastName}`
  args.subDepartment.createdBy = createdBy;
  args.subDepartment.createdDate = new Date();
  // let id = MlSubDepartments.insert({...args.subDepartment});
  const id = mlDBController.insert('MlSubDepartments', args.subDepartment, context)
  if (id) {
    const departmentId = null;
    MlEmailNotification.subDepartmentVerficationEmail(id, departmentId, context);
  }
  if (id) {
    const code = 200;
    const result = { subDepartmentId: id }
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlMutationResolver.updateSubDepartment = (obj, args, context, info) => {
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
  } */
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  if (args.subDepartmentId) {
    let firstName = ''; let lastName = '';
    // let id = MlDepartments.insert({...args.department});
    if (Meteor.users.findOne({ _id: context.userId })) {
      const user = Meteor.users.findOne({ _id: context.userId }) || {}
      if (user && user.profile && user.profile.isInternaluser && user.profile.InternalUprofile) {
        firstName = (user.profile.InternalUprofile.moolyaProfile || {}).firstName || '';
        lastName = (user.profile.InternalUprofile.moolyaProfile || {}).lastName || '';
      } else if (user && user.profile && user.profile.isExternaluser) { // resolve external user context based on default profile
        firstName = (user.profile || {}).firstName || '';
        lastName = (user.profile || {}).lastName || '';
      }
    }
    const createdBy = `${firstName} ${lastName}`
    args.subDepartment.updatedBy = createdBy;
    args.subDepartment.updatedDate = new Date();
    // let subDepartment = MlSubDepartments.findOne({_id: args.subDepartmentId});
    const subDepartment = mlDBController.findOne('MlSubDepartments', { _id: args.subDepartmentId }, context)
    if (subDepartment) {
      if (subDepartment.isSystemDefined) {
        const code = 409;
        const response = new MlRespPayload().errorPayload('System defined sub-department cannot be edited', code);
        return response;
      }
      // let resp = MlSubDepartments.update({_id: args.subDepartmentId}, {$set: args.subDepartment}, {upsert: true})
      const resp = mlDBController.update('MlSubDepartments', args.subDepartmentId, args.subDepartment, { $set: true }, context)
      if (resp) {
        const departmentId = null;
        MlEmailNotification.subDepartmentVerficationEmail(args.subDepartmentId, departmentId, context);
      }
      if (resp) {
        const code = 200;
        const result = { cluster: resp }
        const response = new MlRespPayload().successPayload(result, code);
        return response
      }
    }
  }
  if (args.departmentId) {
    // let subDepartment = MlSubDepartments.findOne({departmentId: args.departmentId});
    const subDepartment = mlDBController.findOne('MlSubDepartments', { departmentId: args.departmentId }, context)
    if (subDepartment) {
      subDepartment.subDepatmentAvailable = args.depatmentAvailable;
      // let resp = MlSubDepartments.update({departmentId: args.departmentId}, {$set: subDepartment}, {upsert: true})
      const resp = mlDBController.update('MlSubDepartments', { departmentId: args.departmentId }, subDepartment, { $set: true }, context)
      if (resp) {
        const subDepartmentId = null;
        MlEmailNotification.subDepartmentVerficationEmail(subDepartmentId, args.departmentId, context);
      }
      if (resp) {
        const code = 200;
        const result = { cluster: resp }
        const response = new MlRespPayload().successPayload(result, code);
        return response
      }
    }
  }
}

MlResolver.MlQueryResolver.findSubDepartment = (obj, args, context, info) =>
  // return MlSubDepartments.findOne({"_id":args._id});
  mlDBController.findOne('MlSubDepartments', { _id: args._id }, context)


MlResolver.MlQueryResolver.findSubDepartments = (obj, args, context, info) => {

}

MlResolver.MlQueryResolver.fetchActiveSubDepartments = (obj, args, context, info) => {
  // let department = MlDepartments.findOne({"_id":args.departmentId})
  const department = mlDBController.findOne('MlDepartments', { _id: args.departmentId }, context)
  if (department && department.departmentName) {
    // let response = MlSubDepartments.find({"$and": [{"departmentId": department.departmentName}, {"isActive": true}]}).fetch()
    const response = mlDBController.find('MlSubDepartments', { $and: [{ departmentId: department.departmentName }, { isActive: true }] }, context).fetch()
    return response;
  }
}


MlResolver.MlQueryResolver.fetchSubDepartments = (obj, args, context, info) => {
  if (args.id) {
    const id = args.id;
    // let response= MlSubDepartments.find({"departmentId":id,"isActive":true}).fetch()||[];
    const response = mlDBController.find('MlSubDepartments', { departmentId: id, isActive: true }, context).fetch() || [];
    return response;
  }
}

MlResolver.MlQueryResolver.fetchSubDepartmentsForRegistration = (obj, args, context, info) => {
  if (args.id) {
    const id = args.id;
    // let response= MlSubDepartments.find({"departmentId":id}).fetch()||[];
    const response = mlDBController.find('MlSubDepartments', { departmentId: id }, context).fetch() || [];
    return response;
  }
}

MlResolver.MlQueryResolver.fetchSubDepartmentsHierarchy = (obj, args, context, info) => {
  let result = []
  if (args.id) {
    const id = args.id;
    // let response= MlSubDepartments.find({"departmentId":id,"isActive":true}).fetch()||[];
    const response = mlDBController.find('MlSubDepartments', { departmentId: id, isActive: true }, context).fetch() || [];
    if (response) {
      result = _.reject(response, { _id: args.subDepartmentId, isSystemDefined: false });
      return result;
    }
    return response;
  }
}
