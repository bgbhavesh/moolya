import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver['CreateSpecification'] = (obj, args, context, info) => {
  // TODO : Authorization
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  // let id = MlSpecifications.insert({...args});

  let isFind = mlDBController.find('MlSpecifications', { $or:[{specificationName: args.specificationName},{specificationDisplayName: args.specificationDisplayName}]}, context).fetch();
  if(isFind.length){
    let code = 409;
    let response = new MlRespPayload().errorPayload("Already Exists!!!!", code);
    return response;
  }

  let id = mlDBController.insert('MlSpecifications', args, context)
  if (id) {
    let code = 200;
    let result = {specificationId: id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
MlResolver.MlMutationResolver['UpdateSpecification'] = (obj, args, context, info) => {
  // TODO : Authorization

  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if (args._id) {
    var id= args._id;
    let isFind = mlDBController.find('MlSpecifications', {_id:{ $ne: id }, $or:[{specificationName: args.specificationName},{specificationDisplayName: args.specificationDisplayName}]}, context).fetch();
    if(isFind.length) {
      let code = 409;
      let response = new MlRespPayload().errorPayload("Already Exists!!!!", code);
      return response;
    }
    args=_.omit(args,'_id');
    // let result= MlSpecifications.update(id, {$set: args});
    let result = mlDBController.update('MlSpecifications', id, args, {$set:true}, context)
    let code = 200;
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }

}
MlResolver.MlQueryResolver['FindSpecification'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    // let response= MlSpecifications.findOne({"_id":id});
    let response = mlDBController.findOne('MlSpecifications', {_id: id}, context)
    return response;
  }

}


