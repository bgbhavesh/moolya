import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver.CreateStageOfCompany = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  const query = {
    $or: [
      {
        stageOfCompanyName: {
          $regex: new RegExp(`^${args.stageOfCompanyName}$`, 'i')
        }
      },
      {
        stageOfCompanyDisplayName: { $regex: new RegExp(`^${args.stageOfCompanyDisplayName}$`, 'i') }
      }
    ]
  };

  const isFind = MlStageOfCompany.find(query).fetch();
  if (isFind.length) {
    const code = 409;
    const response = new MlRespPayload().errorPayload("'Stage of company type' already exists!", code);
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

  const id = MlStageOfCompany.insert({ ...args });
  if (id) {
    const code = 200;
    const result = { stageOfCompanyId: id }
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
};

MlResolver.MlMutationResolver.UpdateStageOfCompany = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
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
          stageOfCompanyName: {
            $regex: new RegExp(`^${args.stageOfCompanyName}$`, 'i')
          }
        },
        {
          stageOfCompanyDisplayName: { $regex: new RegExp(`^${args.stageOfCompanyDisplayName}$`, 'i') }
        }
      ]
    };
    const isFind = MlStageOfCompany.find(query).fetch();
    if (isFind.length) {
      const code = 409;
      const response = new MlRespPayload().errorPayload("'Stage of company type' already exists!", code);
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

    const result = MlStageOfCompany.update(id, { $set: args });
    const code = 200;
    const response = new MlRespPayload().successPayload(result, code);
    return response;
  }
}
MlResolver.MlQueryResolver.FindStageOfCompany = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    const response = MlStageOfCompany.findOne({ _id: id });
    return response;
  }
}
MlResolver.MlQueryResolver.fetchStageOfCompany = (obj, args, context, info) => {
  const result = MlStageOfCompany.find({ isActive: true }).fetch() || [];
  return result;
}

