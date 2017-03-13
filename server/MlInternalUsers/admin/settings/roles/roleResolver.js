
import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import MlAdminUserContext from '../../../../mlAuthorization/mlAdminUserContext'

var _ = require('lodash');

MlResolver.MlQueryResolver['fetchRole'] = (obj, args, context, info) =>{
    return MlRoles.findOne({name});
}

MlResolver.MlMutationResolver['createRole'] = (obj, args, context, info) =>
{
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
        if(role){
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
}

MlResolver.MlQueryResolver['fetchRolesByDepSubDep'] = (obj, args, context, info) =>{
    let roles = [],
      userhierarchy,
      hierarchy,
      clusterId,
      chapterId,
      subChapterId,
      communityId,
      levelCode = "",
      doRead = false;
    let userProfile = new MlAdminUserContext().userProfileDetails(context.userId);
    if(!userProfile||!userProfile.hierarchyLevel){
       return roles;
    }

    userhierarchy = MlHierarchy.findOne({level:Number(userProfile.hierarchyLevel)});
    if(!userhierarchy){
        return roles;
    }

    clusterId     = args.clusterId && ((args.clusterId == userProfile.defaultProfileHierarchyRefId) || userhierarchy.isParent) ? args.clusterId : "";
    chapterId     = args.chapterId && ((_.find(userProfile.defaultChapters, args.chapterId)) || userhierarchy.isParent) ? args.chapterId: "";
    subChapterId  = args.subChapterId && ((_.find(userProfile.defaultSubChapters, args.subChapterId)) || userhierarchy.isParent) ? args.subChapterId: ""
    communityId   = args.communityId && ((_.find(userProfile.defaultCommunities, args.communityId)) || userhierarchy.isParent) ? args.communityId: ""

    if(clusterId != ""){
        levelCode = "CLUSTER"
    }else{
        return roles;
    }

    let department = MlDepartments.findOne({"_id":args.departmentId})
    if(department && department.isActive){
        roles = MlRoles.find({"$or":[{"assignRoles.department":{"$in":["all", args.departmentId]}}, {"assignRoles.cluster":{"$in":["all", args.clusterId]}}]}).fetch()
    }

    _.remove(roles, {roleName:'platformadmin'})
    if(levelCode == 'CLUSTER' && !userhierarchy.isParent){
        _.remove(roles, {roleName:'clusteradmin'})
    }
    _.remove(roles, {roleName:'chapteradmin'})
    _.remove(roles, {roleName:'subchapteradmin'})
    return roles;
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

MlResolver.MlQueryResolver['fetchAllAssignedRoles'] = (obj, args, context, info) =>{
    let roleNames = [];
    let roleIds = args.roleIds;
    roleIds.map(function(roleId){
        let roleName = MlRoles.findOne({_id:roleId}).displayName;
        roleNames.push(roleName);
    })
    return roleNames;
}

