import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver['updateKycCategory'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if (args._id) {
    var id= args._id;
    args=_.omit(args,'_id');
    let result= MlDocumentCategories.update(id, {$set: args});
    let code = 200;
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
};

MlResolver.MlQueryResolver['findKycCategory'] = (obj, args, context, info) => {
  if (args._id) {
    var id= args._id;
    let response= MlDocumentCategories.findOne({"_id":id});
    return response;
  }
};

MlResolver.MlMutationResolver['createKycCategory'] = (obj, args, context, info) =>{
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if(MlDocumentCategories.find({docCategoryName:args.kycCategory.docCategoryName}).count() > 0){
    let code = 409;
    let response = new MlRespPayload().errorPayload("Already Exist", code);
    return response;
  }

  let id = MlDocumentCategories.insert({...args.kycCategory});
  if(id){
    let code = 200;
    let result = {kycCategoryId: id};
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
};


MlResolver.MlQueryResolver['fetchKYCCategories'] = (obj, args, context, info) => {
  let result=MlDocumentCategories.find({isActive:true}).fetch()||[];
  return result;
};


