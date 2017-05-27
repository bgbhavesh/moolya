import MlResolver from "../../../../commons/mlResolverDef";
import MlRespPayload from "../../../../commons/mlPayload";
import mlAssignHierarchy from "../../../admin/../admin/genericTransactions/impl/MlHierarchyAssignment";

MlResolver.MlQueryResolver['fetchAssignedRolesHierarchy'] = (obj, args, context, info) => {
  let response;
  let levelCode = "";
  let department = mlDBController.findOne("MlDepartments", {"_id": args.departmentId}, context)
  if (department && department.isActive) {
    response= mlDBController.findOne('MlHierarchyAssignments', {
      $and: [
        {parentDepartment:args.departmentId},
        {parentSubDepartment:args.subDepartmentId},
        {"teamStructureAssignment.assignedLevel": {$in: [args.type]}}
      ]},context)
     }
     if(response){
       let teamStructureAssignment = response.teamStructureAssignment;
       let filteredSteps = [];
       teamStructureAssignment.map(function (step, key){
         if(step.assignedLevel==args.type){
           filteredSteps.push(step)
         }
       })
       response.teamStructureAssignment = filteredSteps;
       return response;
     }

}

MlResolver.MlQueryResolver['fetchFinalApprovalRole'] = (obj, args, context, info) => {
  let response;
  if (args.departmentId && args.subDepartmentId) {
    let department = mlDBController.findOne("MlDepartments", {"_id": args.departmentId}, context)
    if(department.isSystemDefined){
      response = mlDBController.findOne("MlHierarchyAssignments", {
        "parentDepartment": args.departmentId,
        "parentSubDepartment": args.subDepartmentId,
        "clusterId":"All"
      }, context)
    }else{
      response = mlDBController.findOne("MlHierarchyAssignments", {
        "parentDepartment": args.departmentId,
        "parentSubDepartment": args.subDepartmentId,
        "clusterId":args.clusterId
      }, context)
    }
  }
  return response;
}


MlResolver.MlMutationResolver['updateHierarchyAssignment'] = (obj, args, context, info) => {
  let response ;
  let hierarchy = args.hierarchy;
  if (hierarchy.id!=''&&hierarchy.id!=null) {
    let hierarchyAssignment = mlDBController.findOne("MlHierarchyAssignments", {"_id": hierarchy.id}, context)
    let assignedRoles = hierarchyAssignment.teamStructureAssignment;
    let id = hierarchy.id
    let hierarchyRoles = hierarchy.teamStructureAssignment;
    if(hierarchyRoles.length>=1){
      hierarchyRoles.map(function (role) {
        MlHierarchyAssignments.update({_id:id}, {$push: {teamStructureAssignment:role}},{$set:{finalApproval:hierarchy.finalApproval}});
      })
    }else{
       MlHierarchyAssignments.update({_id:id}, {$set:{finalApproval:hierarchy.finalApproval}});
    }
    let code = 200;
    response = new MlRespPayload().successPayload('Updated Successfully', code);
    return response
  } else {
    let id = MlHierarchyAssignments.insert({...hierarchy});
    if (id) {
      let code = 200;
      let result = {appovalId: id}
      let response = new MlRespPayload().successPayload('Created Successfully', code);
      return response
    }
  }
};

MlResolver.MlQueryResolver['fetchHierarchyRoles'] = (obj, args, context, info) => {
  let response;
  let levelCode = "";
  let finalRoles = []
  let department = mlDBController.findOne("MlDepartments", {"_id": args.departmentId}, context)
  if (department && department.isActive) {
    response= mlDBController.findOne('MlHierarchyAssignments', {
      $and: [
        {parentDepartment:args.departmentId},
        {parentSubDepartment:args.subDepartmentId},
        {clusterId:args.clusterId}
      ]},context)
  }
  if(response){
    let teamStructureAssignment = response.teamStructureAssignment;
    let userRole = mlAssignHierarchy.getUserRoles(context.userId)
    if(userRole.roleName ==  "platformadmin" || userRole.roleName == "clusteradmin"){
      return teamStructureAssignment;
    }else{
      let currentRole = null;
      let isParentRole = false;
      teamStructureAssignment.map(function (role, key){
        if(role.roleId==userRole.roleId){
          //self role for same level hierarchy
          finalRoles.push(role);
          currentRole = role
          if (role.assignedLevel=='cluster' && role.reportingRole=='') {
            teamStructureAssignment.splice(key,1)
            finalRoles = teamStructureAssignment;
            isParentRole = true;
          }
        }
      })
      if(isParentRole === false){
        let reportingRole = userRole.roleId
        //recursively follow reporting hierarchy
        teamStructureAssignment.map(function (role, key){
          if(role.reportingRole==reportingRole){
            reportingRole = role.roleId
            finalRoles.push(role)
          }
        })
      }
    }
    return finalRoles;
  }
}


MlResolver.MlQueryResolver['fetchHierarchyUsers'] = (obj, args, context, info) => {
  let hierarchy;
  let levelCode = "";
  let department = mlDBController.findOne("MlDepartments", {"_id": args.departmentId}, context)
  if (department && department.isActive) {
    hierarchy= mlDBController.findOne('MlHierarchyAssignments', {
      $and: [
        {parentDepartment:args.departmentId},
        {parentSubDepartment:args.subDepartmentId},
        {clusterId:args.clusterId}
      ]},context)
  }
  if(hierarchy){
    //get all users associated with the hierarchy
    let usersList = []
    if(args.clusterId && args.departmentId && args.subDepartmentId && args.roleId){
        usersList = mlDBController.find('users', {"$and":[{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.clusterId":args.clusterId} ,{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.departmentId":args.departmentId},{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.subDepartmentId":args.subDepartmentId},{"profile.InternalUprofile.moolyaProfile.userProfiles.userRoles.roleId":args.roleId},{"profile.isActive":true}]}, context).fetch()
     }
    if(usersList){
      usersList.map(function (user,key) {
        //remove self user
        user.username = user.profile.InternalUprofile.moolyaProfile.firstName+" "+user.profile.InternalUprofile.moolyaProfile.lastName;
        if(context.userId == user._id){
          usersList.splice(key,1)
        }
      })
    }

    return usersList;
  }
}

