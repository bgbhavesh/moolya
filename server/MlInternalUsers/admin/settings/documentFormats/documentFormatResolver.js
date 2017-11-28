import MlResolver from '../../../../commons/mlResolverDef';
import MlRespPayload from '../../../../commons/mlPayload';
import _ from 'lodash';

MlResolver.MlMutationResolver.updateDocumentFormat = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }
  // let department = MlDepartments.findOne({_id: args.departmentId});
  const department = mlDBController.findOne('MlDepartments', { _id: args.departmentId }, context)
  // let deactivate = args.department.isActive;
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
  args.updatedBy = createdBy;
  args.updatedDate = new Date();

  if (!args.docFormatName) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Document Format Name is Required', code);
    return response;
  }
  if (args._id) {
    // check for exists condition
    const existingDocFormat = mlDBController.findOne('MlDocumentFormats', { _id: { $ne: args._id }, docFormatName: args.docFormatName }, context)
    if (existingDocFormat) {
      const code = 409;
      const response = new MlRespPayload().errorPayload("'Document Format' already exists!", code);
      return response;
    }


    const id = args._id;
    args = _.omit(args, '_id');
    const result = MlDocumentFormats.update(id, { $set: args });
    const code = 200;
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
};

MlResolver.MlQueryResolver.findDocumentFormat = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    const response = MlDocumentFormats.findOne({ _id: id });
    return response;
  }
}

MlResolver.MlMutationResolver.createDocumentFormat = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  if (!args.documentFormat.docFormatName) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Document Format Name is Required', code);
    return response;
  }
  if (MlDocumentFormats.find({ docFormatName: args.documentFormat.docFormatName }).count() > 0) {
    const code = 409;
    const response = new MlRespPayload().errorPayload("'Document Format' already exists!", code);
    return response;
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
  args.documentFormat.createdBy = createdBy;
  args.documentFormat.createdDate = new Date();
  // args.documentFormat.createdDateTime=new Date();
  const id = MlDocumentFormats.insert({ ...args.documentFormat });
  if (id) {
    const code = 200;
    const result = { documentFormatId: id }
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlQueryResolver.fetchDocumentsFormat = (obj, args, context, info) => {
  const result = MlDocumentFormats.find({ isActive: true }).fetch() || [];
  return result;
}

