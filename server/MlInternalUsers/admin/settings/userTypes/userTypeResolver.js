import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';
import _underscore from 'underscore'

MlResolver.MlMutationResolver.UpdateUserType = (obj, args, context, info) => {
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
  if (args._id) {
    const id = args._id;
    args = _.omit(args, '_id');
    const result = mlDBController.update('MlUserTypes', id, args, { $set: true }, context)
    // let result= MlUserTypes.update(id, {$set: args});
    const code = 200;
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
MlResolver.MlMutationResolver.createUserType = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }
  if (args.userType.communityCode) {
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
    args.userType.createdBy = createdBy;
    args.userType.createdDate = new Date();
    // let result= MlUserTypes.insert({...args.userType})
    const result = mlDBController.insert('MlUserTypes', args.userType, context)
    if (result) {
      const code = 200;
      // let result = {userTypeId: result}
      return new MlRespPayload().successPayload({ userTypeId: result }, code);
      // return response
    }
  } else {
    const response = new MlRespPayload().errorPayload('Please select atleast one community');
    return response;
  }
}


MlResolver.MlQueryResolver.FindUserType = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    const id = args._id;
    const response = mlDBController.findOne('MlUserTypes', { _id: id }, context)
    // let response= MlUserTypes.findOne({"_id":id});
    return response;
  }
}


MlResolver.MlQueryResolver.FetchUserTypeSelect = (obj, args, context, info) => {
  // let result=MlUserTypes.find({isActive:true}).fetch()||[];
  const result = mlDBController.find('MlUserTypes', { isActive: true, communityCode: args.communityCode }, context).fetch() || [];
  // if(result.length > 0){
  //   result.push({"userTypeName" : "All","_id" : "all"});

  return result;
}
MlResolver.MlQueryResolver.FetchUserTypeForMultiSelect = (obj, args, context, info) => {
  // let result=MlUserTypes.find({isActive:true}).fetch()||[];
  const community = args.communityId;
  if (community != undefined) {
    const result = [];
    const allValueExist = _underscore.contains(community, 'all');
    if (allValueExist) {
      const userResult = mlDBController.find('MlUserTypes', { isActive: true }, context).fetch() || [];
      if (userResult != undefined) {
        for (let j = 0; j < userResult.length; j++) {
          result.push(userResult[j]);
        }
      }
    } else {
      for (let i = 0; i < community.length; i++) {
        const userResult = mlDBController.find('MlUserTypes', { isActive: true, communityCode: community[i] }, context).fetch() || [];

        if (userResult != undefined) {
          for (let j = 0; j < userResult.length; j++) {
            result.push(userResult[j]);
          }
        }
      }
    }


    if (result.length > 0) {
      result.push({ userTypeName: 'All', _id: 'all' });
    }
    return result;
  }
}


MlResolver.MlQueryResolver.FetchUserType = (obj, args, context, info) => {
  let communityCode = args.communityCode;
  if (args.communityCode === 'all') {
    communityCode = { $regex: '.*', $options: 'i' };
  }
  const result = mlDBController.find('MlUserTypes', { isActive: true, communityCode }, context).fetch() || [];

  if (args && args.displayAllOption && args.communityCode && args.communityCode.trim() !== '') {
    result.push({ userTypeName: 'All', _id: 'all' });
  }

  return result;
}


/*
MlResolver.MlQueryResolver['FetchUserTypeInProcessMapping'] = (obj, args, context, info) => {

  let communityCode = args.community;
  let usertypes = [];
  if(communityCode && communityCode.length > 0){
    if(communityCode.length==1){
      usertypes= MlUserTypes.find({"$and": [{communityCode: communityCode[0], isActive: true}]}).fetch()||[];
      usertypes.push({"professionName" : "All","_id" : "all"});
    }else {
      communityCode.map(function (communityCode) {
        activeUserType = MlUserTypes.find({"$and": [{communityCode: communityCode, isActive: true}]}).fetch();
        if (activeUserType && activeUserType.length > 0) {
          usertypes = usertypes.concat(activeUserType)

        }
      })
    }
  }
  return usertypes;
}
*/
