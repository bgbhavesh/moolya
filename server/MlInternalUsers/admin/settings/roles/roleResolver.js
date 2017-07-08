import MlResolver from "../../../../commons/mlResolverDef";
import MlRespPayload from "../../../../commons/mlPayload";
import MlAdminUserContext from "../../../../mlAuthorization/mlAdminUserContext";

var _ = require('lodash');

var defaultModules = [
  {moduleName:"CHAPTER", actions:[{actionId:"READ", actionCode:"READ"}]},
  {moduleName:"SUBCHAPTER", actions:[{actionId:"READ", actionCode:"READ"}]},
  {moduleName:"COMMUNITY", actions:[{actionId:"READ", actionCode:"READ"}]},
  {moduleName:"INTERNALREQUESTS", actions:[{actionId:"CREATE", actionCode:"CREATE"}, {actionId:"READ", actionCode:"READ"}, {actionId:"UPDATE", actionCode:"UPDATE"}]}];

MlResolver.MlQueryResolver['fetchRole'] = (obj, args, context, info) => {
  // return MlRoles.findOne({name});
  return mlDBController.findOne('MlRoles', {name}, context)
}

MlResolver.MlMutationResolver['createRole'] = (obj, args, context, info) => {
  var dModules = _.cloneDeep(defaultModules)
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }

  let role = args.role;
  if (!role.roleName) {
    let code = 409;
    let response = new MlRespPayload().errorPayload("Role Name is required", code);
    return response;
  }

  // if(MlClusters.find({roleName:role.roleName}).count() > 0){
  if (mlDBController.find('MlClusters', {roleName: role.roleName}, context).count() > 0) {
    let code = 409;
    let response = new MlRespPayload().errorPayload("Already Exist", code);
    return response;
  }

  if (role && role.modules && role.modules.length == 0) {
    let code = 409;
    let response = new MlRespPayload().errorPayload("Please Select One Module", code);
    return response;
  }

  role.createdDateTime = new Date();
  role.updatedDateTime= new Date();
  role.updatedBy=  mlDBController.findOne("users", {_id: context.userId}, context).username;
  role.createdBy = mlDBController.findOne("users", {_id: context.userId}, context).username;

  let uniqModule = _.uniqBy(role.modules, 'moduleId');
  if (role.modules && uniqModule && uniqModule.length !== role.modules.length) {
    let code = 409;
    let response = new MlRespPayload().errorPayload("Please select different module", code);
    return response;
  }

  _.each(role.modules, function (module)
  {
      for(var i = 0; i < module.actions.length; i++){
        var dbAction = mlDBController.findOne("MlActions", {code: module.actions[i].actionId}, context);
        if(!dbAction){
          let code = 409;
          let response = new MlRespPayload().errorPayload("Invalid Action", code);
          return response;
        }
        module.actions[i].actionId = dbAction._id;
        module.actions[i].actionCode = dbAction.code;
      }
  })

  // Adding Default Modules
  _.each(dModules, function (module) {
    var moduleDef = mlDBController.findOne("MlModules", {code: module.moduleName}, context);
    var isModAvailable = _.findIndex(role.modules, {moduleId: moduleDef._id})
    if ((isModAvailable < 0) && module) {
      for (var i = 0; i < module.actions.length; i++) {
        var dbAction = mlDBController.findOne("MlActions", {code: module.actions[i].actionId}, context);
        module.actions[i].actionId = dbAction._id;
        module.actions[i].actionCode = dbAction.code;
      }
      module["moduleId"] = moduleDef._id
      module["moduleName"] = moduleDef.name
      module["isActive"] = true
      role.modules.push(module)
    }
  })
  let id = mlDBController.insert('MlRoles', role, context)
  if (id) {
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
    // let response = MlRoles.findOne({"_id": id});
    let response = mlDBController.findOne('MlRoles', {"_id": id}, context);
    return response;
  }
}

MlResolver.MlMutationResolver['updateRole'] = (obj, args, context, info) => {
  // let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  // if (!isValidAuth) {
  //   let code = 401;
  //   let response = new MlRespPayload().errorPayload("Not Authorized", code);
  //   return response;
  // }

  var dModules = _.cloneDeep(defaultModules)

  if (!args.role.roleName) {
    let code = 409;
    let response = new MlRespPayload().errorPayload("Role Name is required", code);
    return response;
  }

  if (args.roleId) {
    // let role = MlRoles.findOne({_id: args.id});
    let role = mlDBController.findOne('MlRoles', {_id: args.roleId}, context)
    if (role) {
      if (role.isSystemDefined) {
        let code = 409;
        let response = new MlRespPayload().errorPayload("Cannot edit system defined Role", code);
        return response;
      } else {
        var id = args.roleId;
        var assignRoles = args.role.assignRoles;

        let uniqModule = _.uniqBy(args.role.modules, 'moduleId');
        if (_.isEmpty(args.role) || (args.role.modules && uniqModule && uniqModule.length !== args.role.modules.length)) {
          let code = 409;
          let response = new MlRespPayload().errorPayload("Please select different module", code);
          return response;
        }

        var isDefaultAvailiable = true
        _.each(dModules, function (module) {
            var moduleDef = mlDBController.findOne("MlModules", {code: module.moduleName}, context);
            var isModAvailable = _.findIndex(args.role.modules, {moduleId: moduleDef._id})
            if(isModAvailable < 0){
                isDefaultAvailiable = false;
                return isDefaultAvailiable
            }
        })

        if(!isDefaultAvailiable){
          let code = 409;
          let response = new MlRespPayload().errorPayload("Default Modules Are Required", code);
          return response;
        }


        if(assignRoles){
          var hierarchyFound = false
          var response = null
            assignRoles.map(function (assignRole) {
              if(assignRole.isActive===false){
                let departmentId = assignRole.department
                let subDepartmentId = assignRole.subDepartment
                let clusterId = assignRole.cluster
                let hierarchy = mlDBController.findOne('MlHierarchyAssignments', {
                  parentDepartment: departmentId,
                  parentSubDepartment: subDepartmentId,
                  clusterId: clusterId
                }, context)
                if(hierarchy){
                  let teamStructure = hierarchy.teamStructureAssignment
                  teamStructure.map(function (assignRole) {
                    if((hierarchy.finalApproval.role==id)||(assignRole.roleId == id && assignRole.isAssigned === true)){
                      let code = 401;
                      response = new MlRespPayload().errorPayload("Hierarchy associated for this role");
                      hierarchyFound = true
                    }
                  })
                }
              }
            })
          if(hierarchyFound === true){
            return response;
          }
        }
        if(args.role.isActive===false){
          //check hierarchy exist for this role.
          let resp = mlDBController.findOne('MlHierarchyAssignments', {
            $or: [{"finalApproval.role":id},
              {
                "teamStructureAssignment": {
                  $elemMatch: {
                    roleId: id,
                    isAssigned:true
                  }
                }
              },
            ]
          }, context)
          if(resp){
            let code = 401;
            let response = new MlRespPayload().errorPayload("Hierarchy associated for this role");
            return response;
          }
        }
        role.updatedDateTime = new Date();
        role.updatedBy = mlDBController.findOne("users", {_id: context.userId}, context).username;

        var updatedRole = args.role;

        _.each(updatedRole.modules, function (module)
        {
          for(var i = 0; i < module.actions.length; i++){
            var dbAction = mlDBController.findOne("MlActions", {code: module.actions[i].actionId}, context);
            if(dbAction){
              module.actions[i].actionId = dbAction._id;
              module.actions[i].actionCode = dbAction.code;
            }
          }
        })

        // let result= MlRoles.update(id, {$set: args.role});
        let result = mlDBController.update('MlRoles', id, updatedRole, {$set: true}, context);
        let code = 200;
        let response = new MlRespPayload().successPayload(result, code);
        return response
      }
    }
  }
}

MlResolver.MlQueryResolver['fetchRolesByDepSubDep'] = (obj, args, context, info) => {
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
  if (!userProfile || (!userProfile.hierarchyLevel && userProfile.hierarchyLevel != 0)) {
    return roles;
  }

  // userhierarchy = MlHierarchy.findOne({level:Number(userProfile.hierarchyLevel)});
  userhierarchy = mlDBController.findOne("MlHierarchy", {level: Number(userProfile.hierarchyLevel)}, context)
  if (!userhierarchy) {
    return roles;
  }

  clusterId = args.clusterId && ((args.clusterId == userProfile.defaultProfileHierarchyRefId) || userhierarchy.isParent) ? args.clusterId : "";
  chapterId = args.chapterId && ((userProfile.defaultChapters.indexOf("all") >= 0 || userProfile.defaultChapters.indexOf(args.chapterId) > -1) || userhierarchy.isParent) ? args.chapterId : "";
  subChapterId = args.subChapterId && ((userProfile.defaultSubChapters.indexOf("all") >= 0 || userProfile.defaultSubChapters.indexOf(args.subChapterId) > -1) || userhierarchy.isParent) ? args.subChapterId : ""
  // communityId = args.communityId && ((userProfile.defaultCommunities.indexOf("all") >= 0 || userProfile.defaultCommunities.indexOf(args.communityId) > -1) || userhierarchy.isParent) ? args.communityId : ""
  communityId = args.communityId && ((_.findIndex(userProfile.defaultCommunities, {communityCode:'all'}) >= 0 || _.findIndex(userProfile.defaultCommunities, {communityCode:args.communityId}) > -1) || userhierarchy.isParent) ? args.communityId : ""

  if (clusterId != "" && chapterId != "" && subChapterId != "" && communityId != "") {
    levelCode = "COMMUNITY"
  }
  else if (clusterId != "" && chapterId != "" && subChapterId != "") {
    levelCode = "SUBCHAPTER"
  }
  else if (clusterId != "" && chapterId != "") {
    levelCode = "CHAPTER"
  }
  else if (clusterId != "" && communityId != "") {
    levelCode = "CLUSTER_COMMUNITY"
  }
  else if (clusterId != "") {
    levelCode = "CLUSTER"
  }
  else {
    return roles;
  }

  // let department = MlDepartments.findOne({"_id":args.departmentId})
  let department = mlDBController.findOne("MlDepartments", {"_id": args.departmentId, isActive:true}, context)
  if (department) {


    let query = {};
    query.isActive = true;
    if(args.clusterId){
      query.assignRoles && query.assignRoles['$elemMatch'] ? '' : (query.assignRoles = {}, query.assignRoles['$elemMatch']={});
      query.assignRoles['$elemMatch'].cluster = {$in: ['all', args.clusterId]};
    }
    if(args.chapterId){
      query.assignRoles && query.assignRoles['$elemMatch'] ? '' : (query.assignRoles = {}, query.assignRoles['$elemMatch']={});
      query.assignRoles['$elemMatch'].chapter = {$in: ['all', args.chapterId] };
    }
    if(args.subChapterId){
      query.assignRoles && query.assignRoles['$elemMatch'] ? '' : (query.assignRoles = {}, query.assignRoles['$elemMatch']={});
      query.assignRoles['$elemMatch'].subChapter = {$in: ['all', args.subChapterId] };
    }
    if(args.communityId){
      query.assignRoles && query.assignRoles['$elemMatch'] ? '' : (query.assignRoles = {}, query.assignRoles['$elemMatch']={});
      query.assignRoles['$elemMatch'].community = {$in: ['all', args.communityId] };
    }
    if(args.departmentId){
      query.assignRoles && query.assignRoles['$elemMatch'] ? '' : (query.assignRoles = {}, query.assignRoles['$elemMatch']={});
      query.assignRoles['$elemMatch'].department = {$in: ['all', args.departmentId] };
    }
    if(args.subDepartmentId){
      query.assignRoles && query.assignRoles['$elemMatch'] ? '' : query.assignRoles = {}; query.assignRoles['$elemMatch']={} ;
      query.assignRoles['$elemMatch'].subDepartment = {$in: ['all', args.subDepartmentId] };
    }
    if(query.assignRoles && query.assignRoles['$elemMatch']){
      query.assignRoles['$elemMatch'].isActive = true;
    }
    // let finalQuery = {$or: [query, {isSystemDefined: true, isActive: true}]}
    let finalQuery = {$and: [query, {isActive: true}]}

    /**sepecific showing roles of nonmoolya to non-moolya admin*/
    if(!userProfile.isMoolya)
      finalQuery = {$or:[{isNonMoolyaAvailable : true} ,finalQuery]}
    let valueGet = mlDBController.find('MlRoles', finalQuery, context).fetch()
    // let valueGet = mlDBController.find('MlRoles', {"$and": [{"assignRoles.department": {"$in": [args.departmentId]}}, {"assignRoles.cluster": {"$in": ["all", args.clusterId]}}, {"isActive": true}]}, context).fetch()
    roles = valueGet;
  }

  _.remove(roles, {roleName: 'platformadmin'})
  if (levelCode == 'CLUSTER') {
    if (!userhierarchy.isParent)
      _.remove(roles, {roleName: 'clusteradmin'})
    _.remove(roles, {roleName: 'chapteradmin'})
    _.remove(roles, {roleName: 'subchapteradmin'})
    _.remove(roles, {roleName: 'communityadmin'})
  }

  else if (levelCode == 'SUBCHAPTER') {
    _.remove(roles, {roleName: 'clusteradmin'})
    _.remove(roles, {roleName: 'chapteradmin'})
    _.remove(roles, {roleName: 'communityadmin'})
    if (!userhierarchy.isParent && userhierarchy.code != "CLUSTER" && userhierarchy.code != "CHAPTER") {
      _.remove(roles, {roleName: 'subchapteradmin'})
    }
  }

  else if (levelCode == 'CLUSTER_COMMUNITY' || levelCode == 'COMMUNITY') {
    _.remove(roles, {roleName: 'clusteradmin'})
    _.remove(roles, {roleName: 'chapteradmin'})
    _.remove(roles, {roleName: 'subchapteradmin'})
    if (!userhierarchy.isParent && (userhierarchy.code == "COMMUNITY")) {
      _.remove(roles, {roleName: 'communityadmin'})
    }
  }
  return roles;
}

MlResolver.MlQueryResolver['findRole'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.id) {
    var id = args.id;
    let role = mlDBController.findOne("MlRoles", {_id: id}, context)
    return role;
  }
};

MlResolver.MlQueryResolver['fetchActiveRoles'] = (obj, args, context, info) => {
  // return MlRoles.find({isActive:true}).fetch();
  return mlDBController.find('MlRoles', {isActive: true}, context).fetch();
}

MlResolver.MlQueryResolver['fetchAllAssignedRoles'] = (obj, args, context, info) => {
  let roleNames = [];
  let roleIds = args.roleIds;
  roleIds.map(function (roleId) {
    // let roleName = MlRoles.findOne({_id:roleId}).displayName;
    let roleName = mlDBController.findOne("MlRoles", {_id: roleId}, context).displayName;
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
  if (clusterId || chapterId || subChapterId || departmentId || subDepartmentId) {

    resp = mlDBController.find('MlRoles', {
      "$or": [{
        "$and": [{"assignRoles.cluster": clusterId}, {"assignRoles.chapter": chapterId}, {"assignRoles.subChapter": subChapterId},
          {"assignRoles.department": departmentId}, {"assignRoles.subDepartment": subDepartmentId}]
      },
        {"$or":[{"assignRoles.cluster": clusterId},{"assignRoles.cluster":"all"}]},
        {"$or":[{"assignRoles.chapter": chapterId},{"assignRoles.chapter":"all"}]},
        {"assignRoles.department": departmentId},
        {"assignRoles.subDepartment": subDepartmentId}]
    }, context).fetch();
  }

  return resp;
}


