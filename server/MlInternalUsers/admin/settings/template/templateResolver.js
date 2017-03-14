import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver['CreateTemplate'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if(!args.templateName){
    let code = 401;
    let response = new MlRespPayload().errorPayload("Template Name is Required", code);
    return response;
  }else {
    let id = MlTemplates.insert({...args});
    if (id) {
      let code = 200;
      let result = {templateId: id}
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
};

MlResolver.MlMutationResolver['UpdateTemplate'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if(!args.templateName){
    let code = 401;
    let response = new MlRespPayload().errorPayload("Template Name is Required", code);
    return response;
  }else {
    if (args._id) {
      var id= args._id;
      args=_.omit(args,'_id');
      let result= MlTemplates.update({_id:id}, {$set: args});
      let code = 200;
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
};

MlResolver.MlQueryResolver['FindTemplate'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response= MlTemplates.findOne({"_id":id});
    return response;
  }

}


