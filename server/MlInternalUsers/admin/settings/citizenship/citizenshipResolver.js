import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver['CreateCitizenship'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if(!args.citizenshipTypeName){
    let code = 401;
    let response = new MlRespPayload().errorPayload("Citizenship Name is Required", code);
    return response;
  }else {
    let isFind = MlCitizenship.find({ $or:[{citizenshipTypeName: args.citizenshipTypeName},{citizenshipTypeDisplayName: args.citizenshipTypeDisplayName}]}).fetch();
    if(isFind.length){
      let code = 409;
      let response = new MlRespPayload().errorPayload("Already Exists!!!!", code);
      return response;
    }
    let id = MlCitizenship.insert({...args});
    if (id) {
      let code = 200;
      let result = {citizenshipId: id}
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
};

MlResolver.MlMutationResolver['UpdateCitizenship'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if(!args.citizenshipTypeName){
    let code = 401;
    let response = new MlRespPayload().errorPayload("Citizenship Name is Required", code);
    return response;
  }else {
    if (args._id) {
      var id= args._id;
      let isFind = MlCitizenship.find({_id:{ $ne: id }, $or:[{citizenshipTypeName: args.citizenshipTypeName},{citizenshipTypeDisplayName: args.citizenshipTypeDisplayName}]}).fetch();
      if(isFind.length){
        let code = 409;
        let response = new MlRespPayload().errorPayload("Already Exists!!!!", code);
        return response;
      }
      args=_.omit(args,'_id');
      let result = MlCitizenship.update(id, {$set: args});
      let code = 200;
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
};

MlResolver.MlQueryResolver['FindCitizenship'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response = MlCitizenship.findOne({"_id":id});
    return response;
  }
}
MlResolver.MlQueryResolver['FetchCitizenship'] = (obj, args, context, info) => {
  // TODO : Authorization

  let result=MlCitizenship.find({isActive:true}).fetch()||[];
  return result;
}





