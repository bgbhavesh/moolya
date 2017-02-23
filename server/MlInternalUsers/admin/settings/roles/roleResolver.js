
import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'

var _ = require('lodash');

MlResolver.MlQueryResolver['fetchRole'] = (obj, args, context, info) =>{
  return MlRoles.findOne({name});
}

MlResolver.MlMutationResolver['createRole'] = (obj, args, context, info) =>{

    let role = args.role;

    if(MlClusters.find({roleName:role.roleName}).count() > 0){
        let code = 409;
        return new MlRespPayload().errorPayload("Already Exist", code);
    }
    let id = MlRoles.insert({...args.role});
    if(id){
        let code = 200;
        let result = {roleId: id}
        let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
        return response
    }
    return "true";
}

MlResolver.MlQueryResolver['findRole'] = (obj, args, context, info) => {
  // TODO : Authorization

  if (args.id) {
    var id = args.id;
    let response = MlRoles.findOne({"_id": id});
    return response;
  }
}

  MlResolver.MlMutationResolver['updateRole'] = (obj, args, context, info) => {
    // TODO : Authorization

    if (args.id) {
      var id= args.id;
      let updatedResponse= MlRoles.update(id, {$set: args.role});
      return updatedResponse
    }

  }



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
}

  MlResolver.MlMutationResolver['updateRole'] = (obj, args, context, info) => {
    // TODO : Authorization

    if (args.id) {
      var id= args.id;
      let updatedResponse= MlRoles.update(id, {$set: args.role});
      return updatedResponse
    }

  }

MlResolver.MlQueryResolver['fetchActiveRoles'] = (obj, args, context, info) =>{
  return MlRoles.find({isActive:true}).fetch();
}


