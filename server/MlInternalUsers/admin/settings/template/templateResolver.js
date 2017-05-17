import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver['CreateAccount'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if(!args.accountName){
    let code = 401;
    let response = new MlRespPayload().errorPayload("Account Name is Required", code);
    return response;
  }else {
    let id = MlAccountTypes.insert({...args});
    if (id) {
      let code = 200;
      let result = {templateId: id}
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
};

MlResolver.MlMutationResolver['UpdateAccount'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if(!args.accountName){
    let code = 401;
    let response = new MlRespPayload().errorPayload("Account Name is Required", code);
    return response;
  }else {
    if (args._id) {
      var id= args._id;
      args=_.omit(args,'_id');
      let result= MlAccountTypes.update({_id:id}, {$set: args});
      let code = 200;
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
};

MlResolver.MlQueryResolver['FetchAccount'] = (obj, args, context, info) => {
  // if (args._id) {
  //   var id= args._id;
    let result = mlDBController.find('MlAccountTypes', {isActive: true}, context).fetch()||[];
    // let response= MlAccountTypes.findOne({"_id":id});
    return result;
  // }

}


MlResolver.MlQueryResolver['FindAccount'] = (obj, args, context, info) => {
  // if (args._id) {
  //   var id= args._id;
  let result = mlDBController.findOne('MlAccountTypes', {"_id": args._id}, context)||[];
  // let response= MlAccountTypes.findOne({"_id":id});
  return result;
  // }

}

