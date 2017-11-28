import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver.CreateLookingFor = (obj, args, context, info) => {
  // TODO : Authorization
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }
  const query = {
    $or: [
      {
        lookingForName: {
          $regex: new RegExp(`^${args.lookingForName}$`, 'i')
        }
      },
      {
        lookingForDisplayName: { $regex: new RegExp(`^${args.lookingForDisplayName}$`, 'i') }
      }
    ]
  };
  const isFind = MlLookingFor.find(query).fetch();
  if (isFind.length) {
    const code = 409;
    const response = new MlRespPayload().errorPayload("'Looking for' already exists!", code);
    return response;
  }

  if (MlCommunityDefinition.findOne({ code: args.communityCode })) {
    args.communityName = MlCommunityDefinition.findOne({ code: args.communityCode }).name;
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

  const id = MlLookingFor.insert({ ...args });
  if (id) {
    const code = 200;
    const result = { lookingForId: id }
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
MlResolver.MlMutationResolver.UpdateLookingFor = (obj, args, context, info) => {
  // TODO : Authorization
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  if (MlCommunityDefinition.findOne({ code: args.communityCode })) {
    args.communityName = MlCommunityDefinition.findOne({ code: args.communityCode }).name;
  }
  if (args._id) {
    const id = args._id;
    const query = {
      _id: {
        $ne: id
      },
      $or: [
        {
          lookingForName: {
            $regex: new RegExp(`^${args.lookingForName}$`, 'i')
          }
        },
        {
          lookingForDisplayName: { $regex: new RegExp(`^${args.lookingForDisplayName}$`, 'i') }
        }
      ]
    };
    const isFind = MlLookingFor.find(query).fetch();
    if (isFind.length) {
      const code = 409;
      const response = new MlRespPayload().errorPayload("'Looking for' already exists!", code);
      return response;
    }
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

    const result = MlLookingFor.update(id, { $set: args });
    const code = 200;
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
MlResolver.MlQueryResolver.FindLookingFor = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    const response = MlLookingFor.findOne({ _id: id });
    return response;
  }
}

MlResolver.MlQueryResolver.fetchLookingFor = (obj, args, context, info) => {
  const result = MlLookingFor.find({ isActive: true, communityCode: args.communityCode }).fetch() || [];
  return result;
}

