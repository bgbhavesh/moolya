
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

    if(!role.roleName){
      let code = 409;
      let response = new MlRespPayload().errorPayload("Role Name is required", code);
      return response;
    }
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

    if(!args.role.roleName){
      let code = 409;
      let response = new MlRespPayload().errorPayload("Role Name is required", code);
      return response;
    }

    if(args.id){
      let role = MlRoles.findOne({_id: args.id});
      if(role)
      {
        if(role.isSystemDefined){
          let code = 409;
          let response = new MlRespPayload().errorPayload("Cannot edit system defined Role", code);
          return response;
        }else{
            var id= args.id;
            let result= MlRoles.update(id, {$set: args.role});
            let code = 200;
            let response = new MlRespPayload().successPayload(result, code);
            return response
        }
      }
    }
  };

/*MlResolver.MlQueryResolver['fetchRolesByDepSubDep'] = (obj, args, context, info) =>
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

}*/

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

// Input is Array type.
MlResolver.MlQueryResolver['fetchAllAssignedRoles'] = (obj, args, context, info) =>{
  let roleNames = [];
  let roleIds = args.roleIds;
  roleIds.map(function(roleId){
    let roleName = MlRoles.findOne({_id:roleId}).displayName;
    roleNames.push(roleName);
  })
  return roleNames;
}

MlResolver.MlQueryResolver['fetchRolesByDepSubDepTest'] = (obj, args, context, info) =>
{
  let roles = [];
  let hierarchyLevel=args.hierarchyLevel;
  let users = null;
  if(hierarchyLevel==3){
    users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.hierarchyLevel":{"$in":[0, 3]}},{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.isActive":true}]},{fields:{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.roleId":1}}).fetch();
    _.remove(roles, function (role) {
      return role.roleName == 'clusteradmin'
    })
  }else if(hierarchyLevel==2){
    users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.hierarchyLevel":{"$in":[2,1]}},{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.isActive":true}]},{fields:{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.roleId":1}}).fetch();
    _.remove(roles, function (role) {
      return role.roleName == 'chapteradmin'
    })
  }else if(hierarchyLevel==1){
    users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.hierarchyLevel":{"$in":[1]}},{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.isActive":true}]},{fields:{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.roleId":1}}).fetch();
    _.remove(roles, function (role) {
      return role.roleName == 'subchapteradmin'
    })
  }else if(hierarchyLevel==0){
    users = Meteor.users.find({"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.hierarchyLevel":{"$in":[0]}},{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.isActive":true}]},{fields:{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.roleId":1}}).fetch();
    _.remove(roles, function (role) {
      return role.roleName == 'communityadmin'
    })
  }else{
    /*if(args.departmentId && args.clusterId){
      roles = MlRoles.find({"$or":[{"assignRoles.department":{"$in":["all", args.departmentId]}}, {"assignRoles.cluster":{"$in":["all", args.clusterId]}}]}).fetch()
    }*/

   /* if(args.clusterId != "" && args.chapterId != "" && args.subChapterId != "" && args.communityId != ""){

    }
    else if(args.clusterId != "" && args.chapterId != "" && args.subChapterId != "" && args.subChapterName !="Moolya"){

    }
    else if(args.clusterId != "" && args.chapterId != "" && args.subChapterName=="Moolya"){

    }
    else*/
      if(args.clusterId != "" ){
      roles = MlRoles.find({"$or":[{"assignRoles.department":{"$in":["all", args.departmentId]}}, {"assignRoles.cluster":{"$in":["all", args.clusterId]}}]}).fetch()
    }
    _.remove(roles, function (role) {
      return role.roleName == 'platformadmin'
    })
    return roles;
  }
  let filteredUsers=[];
  users.map(function (user) {
    let userProfiles = user.profile.InternalUprofile.moolyaProfile.userProfiles[0].userRoles[0].roleId;
    if(userProfiles){
      filteredUsers.push(userProfiles)
    }
  })
  var uniqueRoleId = filteredUsers.filter(function(elem, index, self) {
    return index == self.indexOf(elem);
  })
  if(args.departmentId && args.clusterId){
    roles = MlRoles.find( {"$and":[{"_id":{"$in":[uniqueRoleId.toString()]}},{"$or":[{"assignRoles.department":{"$in":["all", args.departmentId]}}, {"assignRoles.cluster":{"$in":["all", args.clusterId]}}]}]}).fetch()
  }

  return roles;
  // let roles = MlRoles.find({"assignRoles":{"$elemMatch":{"department":args.departmentId}, "$elemMatch":{"subDepartment":args.subDepartmentId}}}).fetch();

}


