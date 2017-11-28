import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver.CreateBusinessType = (obj, args, context, info) => {
  // TODO : Authorization
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  if (!args.businessTypeName) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Business Name is Required', code);
    return response;
  }
  const query = {
    $or: [
      {
        businessTypeName: {
          $regex: new RegExp(`^${args.businessTypeName}$`, 'i')
        }
      },
      {
        businessTypeDisplayName: { $regex: new RegExp(`^${args.businessTypeDisplayName}$`, 'i') }
      }
    ]
  };
  const isFind = MlBusinessType.find(query).fetch();
  if (isFind.length) {
    const code = 409;
    const response = new MlRespPayload().errorPayload('Already Exists!!!!', code);
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

  const id = MlBusinessType.insert({ ...args });
  if (id) {
    const code = 200;
    const result = { businessTypeId: id }
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlMutationResolver.UpdateBusinessType = (obj, args, context, info) => {
  // TODO : Authorization
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  if (!args.businessTypeName) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Business Name is Required', code);
    return response;
  }
  if (args._id) {
    const id = args._id;
    const query = {
      _id: {
        $ne: id
      },
      $or: [
        {
          businessTypeName: {
            $regex: new RegExp(`^${args.businessTypeName}$`, 'i')
          }
        },
        {
          businessTypeDisplayName: { $regex: new RegExp(`^${args.businessTypeDisplayName}$`, 'i') }
        }
      ]
    };
    const isFind = MlBusinessType.find(query).fetch();
    if (isFind.length) {
      const code = 409;
      const response = new MlRespPayload().errorPayload('Already Exists!!!!', code);
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

    const result = MlBusinessType.update(id, { $set: args });
    const code = 200;
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlQueryResolver.FindBusinessType = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    const response = MlBusinessType.findOne({ _id: id });
    return response;
  }
}

MlResolver.MlQueryResolver.fetchBusinessTypes = (obj, args, context, info) => {
  const result = MlBusinessType.find({ isActive: true }).fetch() || [];
  return result;
}

