
import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'

var _ = require('lodash');

MlResolver.MlQueryResolver['fetchRole'] = (obj, args, context, info) =>{
  return MlRoles.findOne({name});
}

MlResolver.MlMutationResolver['createRole'] = (obj, args, context, info) =>{
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

    let role = args.role;
    if(MlClusters.find({roleName:role.roleName}).count() > 0){
        let code = 409;
        let response = new MlRespPayload().errorPayload("Already Exist", code);
        return response;
    }

    let id = MlRoles.insert({...args.role});
    if(id){
        let code = 200;
        let result = {roleId: id}
        let response = new MlRespPayload().successPayload(result, code);
        return response
    }
};

MlResolver.MlQueryResolver['findRole'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args.id) {
    var id = args.id;
    let response = MlRoles.findOne({"_id": id});
    return response;
  }
}

  MlResolver.MlMutationResolver['updateRole'] = (obj, args, context, info) => {
    let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
    if (!isValidAuth) {
      let code = 401;
      let response = new MlRespPayload().errorPayload("Not Authorized", code);
      return response;
    }

    if (args.id) {
      var id= args.id;
      let result= MlRoles.update(id, {$set: args.role});
      let code = 200;
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  };

MlResolver.MlQueryResolver['fetchRolesByDepSubDep'] = (obj, args, context, info) =>
{
  let roles = [];

  if(args.departmentId && args.clusterId){
      roles = MlRoles.find({"$or":[{"assignRoles.department":{"$in":["all", args.departmentId]}}, {"assignRoles.cluster":{"$in":["all", args.clusterId]}}]}).fetch()
  }

  _.remove(roles, function (role) {
      return role.roleName == 'platformadmin'
  })

  return roles;
    // let roles = MlRoles.find({"assignRoles":{"$elemMatch":{"department":args.departmentId}, "$elemMatch":{"subDepartment":args.subDepartmentId}}}).fetch();

}

MlResolver.MlQueryResolver['findRole'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args.id) {
    var id = args.id;
    let response = MlRoles.findOne({"_id": id});
    return response;
  }
};

MlResolver.MlQueryResolver['fetchActiveRoles'] = (obj, args, context, info) =>{
  return MlRoles.find({isActive:true}).fetch();
}


