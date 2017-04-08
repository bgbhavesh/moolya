import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'
import _ from 'lodash';


MlResolver.MlQueryResolver['fetchMoolyaBasedDepartmentAndSubDepartment'] = (obj, args, context, info) => {
  let list = [];
  let resp = mlDBController.find('MlDepartments', {
    $and: [
      {"depatmentAvailable.cluster": {$in: ["all", args.clusterId]}}
    ]
  }, context).fetch()
  resp.map(function (department) {
    let subDepartments = MlSubDepartments.find({"departmentId": department._id}).fetch();
    subDepartments.map(function (subDepartment) {
      let deptAndSubDepartment = null
      deptAndSubDepartment ={departmentId:department._id,departmentName:department.departmentName,subDepartmentId:subDepartment._id,subDepartmentName:subDepartment.subDepartmentName,isMoolya:department.isMoolya,isActive:department.isActive}
      list.push(deptAndSubDepartment)
    })
  })

  return list;
}


MlResolver.MlMutationResolver['updateHierarchyRoles'] = (obj, args, context, info) => {
 /* let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }
*/
  let response ;
  let roles = args.roles;
  if (roles) {
      roles.map(function (role) {
      if (role.id) {
        let result = mlDBController.update('MlRoles', {_id:role.id}, {"teamStructureAssignment" : role.teamStructureAssignment}, {$set:true, multi:true}, context)
        let code = 200;
        response = new MlRespPayload().successPayload(result, code);
       // responses.push(response)
      }
    })
    return response
  }
};

MlResolver.MlMutationResolver['updateFinalApprovalRoles'] = (obj, args, context, info) => {
  /* let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
   if (!isValidAuth) {
   let code = 401;
   let response = new MlRespPayload().errorPayload("Not Authorized", code);
   return response;
   }
   */
  let response ;
  let role = args.finalRole;
  if (role) {
      if (role.id!='') {
        let result =  mlDBController.update('MlHierarchyFinalApproval',role.id, role, {$set:true}, context)
        let code = 200;
        response = new MlRespPayload().successPayload(result, code);
      }else{
        let id = MlHierarchyFinalApproval.insert({...args.finalRole});
        if (id) {
          let code = 200;
          let result = {appovalId: id}
          let response = new MlRespPayload().successPayload(result, code);
          return response
        }
      }
    return response
  }
};

MlResolver.MlQueryResolver['fetchRolesForHierarchy'] = (obj, args, context, info) => { // reporting role
  let roles = [];
  let levelCode = ""
  let department = mlDBController.findOne("MlDepartments", {"_id": args.departmentId}, context)
  if (department && department.isActive) {
    let valueGet = mlDBController.find('MlRoles', {"$and": [{"assignRoles.department": {"$in": [args.departmentId]}}, {"assignRoles.cluster": {"$in": ["all", args.clusterId]}}, {"isActive": true}]}, context).fetch()
    _.each(valueGet, function (item, say) {
      let ary = []
      _.each(item.assignRoles, function (value, key) {
        if (value.cluster == args.clusterId || value.cluster == 'all') {
          if (value.isActive) {
            ary.push(value);
          }
        }
      })
      item.assignRoles = ary
    })
    _.each(valueGet, function (item, key) {
      if (item) {
        if (item.assignRoles.length < 1) {
          valueGet.splice(key, 1)
        }
      }
    })
    roles = valueGet;
  }
  _.remove(roles, {roleName: 'platformadmin'})
  if (levelCode == 'CLUSTER') {
    _.remove(roles, {roleName: 'chapteradmin'})
    _.remove(roles, {roleName: 'subchapteradmin'})
    _.remove(roles, {roleName: 'communityadmin'})
  }

  else if (levelCode == 'CHAPTER') {
    _.remove(roles, {roleName: 'communityadmin'})
  }

  else if (levelCode == 'CLUSTER_COMMUNITY' || levelCode == 'COMMUNITY') {
    _.remove(roles, {roleName: 'clusteradmin'})
    _.remove(roles, {roleName: 'chapteradmin'})
    _.remove(roles, {roleName: 'subchapteradmin'})
    _.remove(roles, {roleName: 'communityadmin'})
  }
  return roles;
}

MlResolver.MlQueryResolver['fetchRolesForFinalApprovalHierarchy'] = (obj, args, context, info) => { //
  let roles = [];
  let levelCode = "";
  let department = mlDBController.findOne("MlDepartments", {"_id": args.departmentId}, context)
  if (department && department.isActive) {
    let valueGet = mlDBController.find('MlRoles', {"$and": [{"assignRoles.department": {"$in": [args.departmentId]}}, {"isActive": true}]}, context).fetch()
    _.each(valueGet, function (item, say) {
      let ary = []
      _.each(item.assignRoles, function (value, key) {
        if ( value.cluster == 'all') {
          if (value.isActive) {
            ary.push(value);
          }
        }
      })
      item.assignRoles = ary
    })
    _.each(valueGet, function (item, key) {
      if (item) {
        if (item.assignRoles.length < 1) {
          valueGet.splice(key, 1)
        }
      }
    })
    roles = valueGet;
  }
  return roles;
}

MlResolver.MlQueryResolver['fetchRolesForDepartment'] = (obj, args, context, info) => {
  let roles = [];
  let levelCode = "";
  let department = mlDBController.findOne("MlDepartments", {"_id": args.departmentId}, context)
  if (department && department.isActive) {
    let valueGet = mlDBController.find('MlRoles', {"$and": [{"assignRoles.department": {"$in": [args.departmentId]}}, {"isActive": true}]}, context).fetch()
    _.each(valueGet, function (item, say) {
      let ary = []
      _.each(item.assignRoles, function (value, key) {
        if ( value.cluster == 'all') {
          if (value.isActive) {
            ary.push(value);
          }
        }
      })
      item.assignRoles = ary
    })
    _.each(valueGet, function (item, key) {
      if (item) {
        if (item.assignRoles.length < 1) {
          valueGet.splice(key, 1)
        }
      }
    })
    if(!department.isSystemDefined){
      _.remove(roles, {roleName: 'platformadmin'})
      _.remove(roles, {roleName: 'clusteradmin'})
      _.remove(roles, {roleName: 'chapteradmin'})
      _.remove(roles, {roleName: 'subchapteradmin'})
      _.remove(roles, {roleName: 'communityadmin'})
    }
    roles = valueGet;
  }
  return roles;
}

MlResolver.MlQueryResolver['fetchAssignedRoles'] = (obj, args, context, info) => {
  let roles = [];
  let levelCode = "";
  let department = mlDBController.findOne("MlDepartments", {"_id": args.departmentId}, context)
  if (department && department.isActive) {
    let valueGet = mlDBController.find('MlRoles', {"$and": [{"assignRoles.department": {"$in": [args.departmentId]}},{'$and':[{"teamStructureAssignment.isAssigned":true},{"teamStructureAssignment.assignedLevel":args.type}]}, {"isActive":true}]}, context).fetch()
    _.each(valueGet, function (item, say) {
      let ary = []
      _.each(item.assignRoles, function (value, key) {
        if ( value.cluster == 'all') {
          if (value.isActive) {
            ary.push(value);
          }
        }
      })
      item.assignRoles = ary
    })
    _.each(valueGet, function (item, key) {
      if (item) {
        if (item.assignRoles.length < 1) {
          valueGet.splice(key, 1)
        }
      }
    })
    if(!department.isSystemDefined){
      _.remove(roles, {roleName: 'platformadmin'})
      _.remove(roles, {roleName: 'clusteradmin'})
      _.remove(roles, {roleName: 'chapteradmin'})
      _.remove(roles, {roleName: 'subchapteradmin'})
      _.remove(roles, {roleName: 'communityadmin'})
    }
    roles = valueGet;
  }
  return roles;
}

