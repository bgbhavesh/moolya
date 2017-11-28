import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver.CreateIndustry = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  // let id = MlIndustries.insert({...args});
  const query = {
    $or: [
      {
        industryName: {
          $regex: new RegExp(`^${args.industryName}$`, 'i')
        }
      },
      {
        industryDisplayName: { $regex: new RegExp(`^${args.industryDisplayName}$`, 'i') }
      }
    ]
  };
  const isFind = mlDBController.find('MlIndustries', query, context).fetch();
  if (isFind.length) {
    const code = 409;
    const response = new MlRespPayload().errorPayload("'Industry type' already exists!", code);
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

  const id = mlDBController.insert('MlIndustries', args, context)
  if (id) {
    const code = 200;
    const result = { industryId: id }
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
};
MlResolver.MlMutationResolver.UpdateIndustry = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  if (args._id) {
    const id = args._id;
    // MlProfessions.update({industryId:id},{$set:{industryName : args.industryName}},{multi:true});
    const query = {
      _id: {
        $ne: id
      },
      $or: [
        {
          industryName: {
            $regex: new RegExp(`^${args.industryName}$`, 'i')
          }
        },
        {
          industryDisplayName: { $regex: new RegExp(`^${args.industryDisplayName}$`, 'i') }
        }
      ]
    };
    const isFind = mlDBController.find('MlIndustries', query, context).fetch();
    if (isFind.length) {
      const code = 409;
      const response = new MlRespPayload().errorPayload("'Industry type' already exists!", code);
      return response;
    }
    mlDBController.update('MlProfessions', { industryId: id }, { industryName: args.industryName }, { $set: true, multi: true }, context)

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

    // let result= MlIndustries.update(id, {$set: args});
    const result = mlDBController.update('MlIndustries', id, args, { $set: true }, context)
    const code = 200;
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
};

MlResolver.MlQueryResolver.FindIndustry = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    // MlIndustries.findOne({"_id":id});
    const response = mlDBController.findOne('MlIndustries', { _id: id }, context);
    return response;
  }
}

MlResolver.MlQueryResolver.fetchIndustries = (obj, args, context, info) => {
  // let result=MlIndustries.find({isActive:true}).fetch()||[];
  const result = mlDBController.find('MlIndustries', { isActive: true }, context).fetch() || [];
  return result;
}

