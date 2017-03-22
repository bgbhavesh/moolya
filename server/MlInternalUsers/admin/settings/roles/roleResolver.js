
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
    role.createdDateTime = new Date();
    role.createdBy = Meteor.users.findOne({_id:context.userId}).username;
    let id = MlRoles.insert({...role});
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
    if(!userProfile|| (!userProfile.hierarchyLevel && userProfile.hierarchyLevel != 0)){
       return roles;
    }

    userhierarchy = MlHierarchy.findOne({level:Number(userProfile.hierarchyLevel)});
    if(!userhierarchy){
        return roles;
    }

    clusterId     = args.clusterId && ((args.clusterId == userProfile.defaultProfileHierarchyRefId) || userhierarchy.isParent) ? args.clusterId : "";
    chapterId     = args.chapterId && ((userProfile.defaultChapters.indexOf(args.chapterId) > -1) || userhierarchy.isParent) ? args.chapterId: "";
    subChapterId  = args.subChapterId && ((userProfile.defaultSubChapters.indexOf(args.subChapterId) > -1) || userhierarchy.isParent) ? args.subChapterId: ""
    communityId   = args.communityId && ((userProfile.defaultCommunities.indexOf(args.communityId) > -1) || userhierarchy.isParent) ? args.communityId: ""

    if(clusterId != "" && chapterId != "" && subChapterId != "" && communityId != ""){
      levelCode = "COMMUNITY"
    }
    else if(clusterId != "" && chapterId != "" && subChapterId != ""){
        levelCode = "SUBCHAPTER"
    }
    else if(clusterId != "" && chapterId != ""){
        levelCode = "CHAPTER"
    }
    else if(clusterId != "" && communityId != ""){
        levelCode = "CLUSTER_COMMUNITY"
    }
    else if(clusterId != ""){
      levelCode = "CLUSTER"
    }
    else{
        return roles;
    }

    let department = MlDepartments.findOne({"_id":args.departmentId})
    if(department && department.isActive){
        roles = MlRoles.find({"$and":[{"assignRoles.department":{"$in":[args.departmentId]}}, {"assignRoles.cluster":{"$in":["all", args.clusterId]}}]}).fetch()
    }

    _.remove(roles, {roleName:'platformadmin'})
    if(levelCode == 'CLUSTER') {
        if(!userhierarchy.isParent)
          _.remove(roles, {roleName: 'clusteradmin'})
      _.remove(roles, {roleName:'chapteradmin'})
      _.remove(roles, {roleName:'subchapteradmin'})
      _.remove(roles, {roleName:'communityadmin'})
    }

    else if(levelCode == 'SUBCHAPTER') {
        _.remove(roles, {roleName: 'clusteradmin'})
        _.remove(roles, {roleName:'chapteradmin'})
        _.remove(roles, {roleName:'communityadmin'})
        if(!userhierarchy.isParent){
            _.remove(roles, {roleName:'subchapteradmin'})
        }
    }

    else if(levelCode == 'CLUSTER_COMMUNITY'){
      _.remove(roles, {roleName: 'clusteradmin'})
      _.remove(roles, {roleName:'chapteradmin'})
      _.remove(roles, {roleName:'subchapteradmin'})
    }
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

MlResolver.MlQueryResolver['fetchAllAssignedRoles'] = (obj, args, context, info) =>
{
    let roleNames = [];
    let roleIds = args.roleIds;
    roleIds.map(function(roleId){
        let roleName = MlRoles.findOne({_id:roleId}).displayName;
        roleNames.push(roleName);
    })
    return roleNames;
}

MlResolver.MlQueryResolver['fetchRolesForRegistration'] = (obj, args, context, info) => {
  let resp = [];
  let clusterId = args.cluster || "";
  let chapterId = args.chapter || "";
  let subChapterId = args.subChapter || "";
  let departmentId = args.department || "";
  let subDepartmentId = args.subDepartment || "";
  if(clusterId || chapterId || subChapterId || departmentId || subDepartmentId){
   /* resp = MlRoles.find( {
      $and : [{  },
        {"assignRoles.cluster" : args.cluster},
        { "depatmentAvailable":{
          $elemMatch: {
            chapter: args.chapter,
            subChapter:args.subChapter,
          }} },
      ]
    } ).fetch()*/
    resp = MlRoles.find({"$or": [{"$and": [{"assignRoles.cluster": clusterId}, {"assignRoles.chapter": chapterId}, {"assignRoles.subChapter": subChapterId},
                                    {"assignRoles.department": departmentId},{"assignRoles.subDepartment": subDepartmentId}]},
                                    {"assignRoles.cluster": clusterId},
                                    {"assignRoles.chapter": chapterId},
                                    {"assignRoles.department": departmentId},
                                    {"assignRoles.subDepartment": subDepartmentId}]}).fetch();
  }/*else if(args.cluster){
    resp = MlDepartments.find( {"depatmentAvailable.cluster" :  {$in : ["all",args.cluster]}}).fetch()
  }else if(args.cluster  && args.chapter ){
    resp = MlDepartments.find( {
      $and : [{  },
        {"depatmentAvailable.cluster" :  {$in : ["all",args.cluster]}},
        { "depatmentAvailable":{
          $elemMatch: {
            chapter: args.chapter
          }} },
      ]
    } ).fetch()
  }*/

  return resp;
}


