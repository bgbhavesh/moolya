import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver.CreateAward = (obj, args, context, info) => {
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
  // let id = MlAwards.insert({...args});
  const id = mlDBController.insert('MlAwards', args, context)
  if (id) {
    const code = 200;
    const result = { awardId: id }
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
};
MlResolver.MlMutationResolver.UpdateAward = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  if (args._id) {
    const id = args._id;
    args = _.omit(args, '_id');
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
    // let result= MlAwards.update(id, {$set: args});
    const result = mlDBController.update('MlAwards', id, args, { $set: true }, context)
    const code = 200;
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
};

MlResolver.MlQueryResolver.FindAward = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    // MlAwards.findOne({"_id":id});
    const response = mlDBController.findOne('MlAwards', { _id: id }, context);
    return response;
  }
}

MlResolver.MlQueryResolver.fetchActiveAwards = (obj, args, context, info) => {
  // let result=MlAwards.find({isActive:true}).fetch()||[];
  const result = mlDBController.find('MlAwards', { isActive: true }, context).fetch() || [];
  return result;
}

