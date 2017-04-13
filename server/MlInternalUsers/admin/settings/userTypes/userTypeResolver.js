import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';

MlResolver.MlMutationResolver['UpdateUserType'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  if (args._id) {
    var id= args._id;
      args=_.omit(args,'_id');
    let result=  mlDBController.update('MlUserTypes', id, args, {$set:true}, context)
    // let result= MlUserTypes.update(id, {$set: args});
    let code = 200;
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }

}
MlResolver.MlMutationResolver['createUserType'] = (obj, args, context, info) => {
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  // let result= MlUserTypes.insert({...args.userType})
  let result= mlDBController.insert('MlUserTypes', args.userType, context)
  if (result) {
    let code = 200;
    let result = {userTypeId: result}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }

}
MlResolver.MlQueryResolver['FindUserType'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args._id) {
    var id= args._id;
    let response = mlDBController.findOne('MlUserTypes', {_id: id}, context)
    // let response= MlUserTypes.findOne({"_id":id});
    return response;
  }

}


MlResolver.MlQueryResolver['FetchUserTypeSelect'] = (obj, args, context, info) => {
  // let result=MlUserTypes.find({isActive:true}).fetch()||[];
  let result = mlDBController.find('MlUserTypes', {isActive:true}, context).fetch()||[];
  if(result.length > 0){
    result.push({"userTypeName" : "All","_id" : "all"});
  }
  return result;
}
MlResolver.MlQueryResolver['FetchUserTypeForMultiSelect'] = (obj, args, context, info) => {
  // let result=MlUserTypes.find({isActive:true}).fetch()||[];
  let community=args.communityId;
  if(community!=undefined){
    let result=[];
    for(let i=0;i<community.length;i++){
     let userResult = mlDBController.find('MlUserTypes', {isActive:true,communityCode:community[i]}, context).fetch()||[];

          if(userResult!=undefined){
            for(let j=0;j<userResult.length;j++){
              result.push(userResult[j]);
            }
          }

    }

    if(result.length > 0){
      result.push({"userTypeName" : "All","_id" : "all"});
    }
    return result;
  }


}


MlResolver.MlQueryResolver['FetchUserType'] = (obj, args, context, info) => {
  let result = mlDBController.find('MlUserTypes', {isActive:true,communityCode:args.communityCode}, context).fetch()||[];
  return result;
}


