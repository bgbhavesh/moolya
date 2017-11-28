import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver.CreateSpecification = (obj, args, context, info) => {
  // TODO : Authorization
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  // let id = MlSpecifications.insert({...args});
  const query = {
    $or: [
      {
        specificationName: {
          $regex: new RegExp(`^${args.specificationName}$`, 'i')
        }
      },
      {
        specificationDisplayName: { $regex: new RegExp(`^${args.specificationDisplayName}$`, 'i') }
      }
    ]
  };
  const isFind = mlDBController.find('MlSpecifications', query, context).fetch();
  if (isFind.length) {
    const code = 409;
    const response = new MlRespPayload().errorPayload("'Specification' already exists!", code);
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

  const id = mlDBController.insert('MlSpecifications', args, context)
  if (id) {
    const code = 200;
    const result = { specificationId: id }
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
MlResolver.MlMutationResolver.UpdateSpecification = (obj, args, context, info) => {
  // TODO : Authorization

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
          specificationName: {
            $regex: new RegExp(`^${args.specificationName}$`, 'i')
          }
        },
        {
          specificationDisplayName: { $regex: new RegExp(`^${args.specificationDisplayName}$`, 'i') }
        }
      ]
    };

    const isFind = mlDBController.find('MlSpecifications', query, context).fetch();
    if (isFind.length) {
      const code = 409;
      const response = new MlRespPayload().errorPayload("'Specification' already exists!", code);
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
    // let result= MlSpecifications.update(id, {$set: args});
    const result = mlDBController.update('MlSpecifications', id, args, { $set: true }, context)
    const code = 200;
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
MlResolver.MlQueryResolver.FindSpecification = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    // let response= MlSpecifications.findOne({"_id":id});
    const response = mlDBController.findOne('MlSpecifications', { _id: id }, context)
    return response;
  }
}

