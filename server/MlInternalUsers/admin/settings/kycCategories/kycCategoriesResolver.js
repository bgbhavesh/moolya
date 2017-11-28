import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver.updateKycCategory = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  if (!args.docCategoryName) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Category Name is Required', code);
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
          docCategoryName: {
            $regex: new RegExp(`^${args.docCategoryName}$`, 'i')
          }
        },
        {
          docCategoryDisplayName: { $regex: new RegExp(`^${args.docCategoryDisplayName}$`, 'i') }
        }
      ]
    };

    const isFind = mlDBController.find('MlDocumentCategories', query, context).fetch();
    if (isFind.length) {
      const code = 409;
      const response = new MlRespPayload().errorPayload("'KYC category' already exists!", code);
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

    args = _.omit(args, '_id');
    // let result= MlDocumentCategories.update(id, {$set: args});
    const result = mlDBController.update('MlDocumentCategories', id, args, { $set: true }, context)
    const code = 200;
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
};

MlResolver.MlQueryResolver.findKycCategory = (obj, args, context, info) => {
  if (args._id) {
    const id = args._id;
    // let response= MlDocumentCategories.findOne({"_id":id});
    const response = mlDBController.findOne('MlDocumentCategories', { _id: id }, context)
    return response;
  }
};

MlResolver.MlMutationResolver.createKycCategory = (obj, args, context, info) => {
  const isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Not Authorized', code);
    return response;
  }

  if (!args.kycCategory.docCategoryName) {
    const code = 401;
    const response = new MlRespPayload().errorPayload('Category Name is Required', code);
    return response;
  }
  // if(MlDocumentCategories.find({docCategoryName:args.kycCategory.docCategoryName}).count() > 0){

  const query = {
    $or: [
      {
        docCategoryName: {
          $regex: new RegExp(`^${args.kycCategory.docCategoryName}$`, 'i')
        }
      },
      {
        docCategoryDisplayName: { $regex: new RegExp(`^${args.kycCategory.docCategoryDisplayName}$`, 'i') }
      }
    ]
  };
  const isFind = mlDBController.find('MlDocumentCategories', query, context).fetch();
  if (isFind.length) {
    const code = 409;
    const response = new MlRespPayload().errorPayload("'KYC category' already exists!", code);
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
  args.kycCategory.createdBy = createdBy;
  args.kycCategory.createdDate = new Date();
  // if(mlDBController.find('MlDocumentCategories', {docCategoryName:args.kycCategory.docCategoryName}, context).count() > 0){
  //   let code = 409;
  //   let response = new MlRespPayload().errorPayload("Already Exist", code);
  //   return response;
  // }

  // let id = MlDocumentCategories.insert({...args.kycCategory});
  const id = mlDBController.insert('MlDocumentCategories', args.kycCategory, context)
  if (id) {
    const code = 200;
    const result = { kycCategoryId: id };
    const response = new MlRespPayload().successPayload(result, code);
    return response
  }
};


MlResolver.MlQueryResolver.fetchKYCCategories = (obj, args, context, info) => {
  // let result=MlDocumentCategories.find({isActive:true}).fetch()||[];
  const result = mlDBController.find('MlDocumentCategories', { isActive: true }, context).fetch() || [];
  return result;
};

MlResolver.MlQueryResolver.findCategoryProcessDocuments = (obj, args, context, info) => {
  if (args && args._id) {
    const kycCategoryExist = MlProcessMapping.find({ processDocuments: { $elemMatch: { kycCategoryId: args._id, isActive: true } } }).fetch()
    return kycCategoryExist
  }
};

