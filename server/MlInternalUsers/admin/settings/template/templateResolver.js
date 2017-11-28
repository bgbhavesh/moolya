import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver.CreateAccount = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
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
  args.createdBy = createdBy;
  args.createdDate = new Date();
  if (!args.accountName) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Account Name is Required', code);
    return response;
  } if (MlAccountTypes.find({ accountName: args.accountName }).count() > 0) {
    const code = 409;
    return new MlRespPayload().errorPayload("'Account type' already exists", code);
  }

  const id = MlAccountTypes.insert({ ...args });
  if (id) {
    const code = 200;
    const result = { templateId: id }
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
};

MlResolver.MlMutationResolver.UpdateAccount = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
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
  args.updatedBy = createdBy;
  args.updatedDate = new Date();

  if (!args.accountName) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Account Name is Required', code);
    return response;
  }
  if (args._id) {
    const id = args._id;
    args = _.omit(args, '_id');
    const result = MlAccountTypes.update({ _id: id }, { $set: args });
    const code = 200;
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
};

MlResolver.MlQueryResolver.FetchAccount = (obj, args, context, info) => {
  // if (args._id) {
  //   var id= args._id;
  const result = mlDBController.find('MlAccountTypes', { isActive: true }, context).fetch() || [];
  // let response= MlAccountTypes.findOne({"_id":id});
  return result;
  // }
}


MlResolver.MlQueryResolver.FindAccount = (obj, args, context, info) => {
  // if (args._id) {
  //   var id= args._id;
  const result = mlDBController.findOne('MlAccountTypes', { _id: args._id }, context) || [];
  // let response= MlAccountTypes.findOne({"_id":id});
  return result;
  // }
}

