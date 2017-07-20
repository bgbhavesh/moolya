import MlResolver from "../../../../commons/mlResolverDef";
import MlRespPayload from "../../../../commons/mlPayload";
import _ from "lodash";


MlResolver.MlQueryResolver['fetchMoolyaBasedDepartmentAndSubDepartment'] = (obj, args, context, info) => {
  let list = [];
  let resp = mlDBController.find('MlDepartments', {
    $and: [
      {isMoolya:true},
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

MlResolver.MlQueryResolver['fetchNonMoolyaBasedDepartmentAndSubDepartments'] = (obj, args, context, info) => {
  console.log("fetchNonMoolyaBasedDepartmentAndSubDepartment")
  let list = [];
  let resp = mlDBController.find('MlDepartments', {
    $and: [
      {isMoolya:false},
      {"depatmentAvailable.cluster": {$in: ["all", args.clusterId]}},
      {"depatmentAvailable.subChapter": {$in: ["all", args.subChapterId]}}
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
        let result = mlDBController.update('MlRoles', {_id:role.id}, {"isHierarchyAssigned" : role.isHierarchyAssigned}, {$set:true, multi:true}, context)
        let code = 200;
        response = new MlRespPayload().successPayload(result, code);
       // responses.push(response)
      }
    })
    return response
  }
};

/**fetching roles for department in hirarchy*/
MlResolver.MlQueryResolver['fetchRolesForDepartment'] = (obj, args, context, info) => {
  let roles = [];
  var activeDepartments = mlDBController.findOne("MlDepartments", {"_id": args.departmentId, isActive: true}, context)
  var subChapterDetails = mlDBController.findOne("MlSubChapters", {"_id": args.subChapterId}, context) || {}

  var hirarchyQuery = {}
  if (subChapterDetails.isDefaultSubChapter) {
    hirarchyQuery = {
      clusterId: args.clusterId,
      parentDepartment: args.departmentId,
      parentSubDepartment: args.subDepartmentId
    }
  } else if (!subChapterDetails.isDefaultSubChapter) {
    hirarchyQuery = {
      clusterId: args.clusterId,
      parentDepartment: args.departmentId,
      parentSubDepartment: args.subDepartmentId,
      subChapterId: args.subChapterId,
      isDefaultSubChapter: subChapterDetails.isDefaultSubChapter
    }
  }

  let hierarchy = mlDBController.findOne("MlHierarchyAssignments", hirarchyQuery, context)
  var roleIds = [];
  if (hierarchy) {
    var teamStructure = _.filter(hierarchy.teamStructureAssignment, {isAssigned: true});
    roleIds = _.map(teamStructure, "roleId");
  }
  if (activeDepartments) {

    var rolesQuery = {}
    if (subChapterDetails.isDefaultSubChapter) {
      rolesQuery = {
        "$and": [{'_id': {"$nin": roleIds}}, {
          "assignRoles": {
            $elemMatch: {
              cluster: {"$in": ["all", args.clusterId]},
              department: args.departmentId,
              subDepartment: args.subDepartmentId,
            }
          }
        }, {"isActive": true}]
      }
    } else if (!subChapterDetails.isDefaultSubChapter) {
      rolesQuery = {
        "$and": [{'_id': {"$nin": roleIds}}, {
          "assignRoles": {
            $elemMatch: {
              cluster: {"$in": ["all", args.clusterId]},
              department: args.departmentId,
              subDepartment: args.subDepartmentId,
              subChapter: {"$in": ['all', args.subChapterId]}
            }
          }
        }, {"isActive": true}]
      }
    }

    let valueGet = mlDBController.find('MlRoles', rolesQuery, context).fetch()
    _.each(valueGet, function (item, say) {
      let ary = []
      _.each(item.assignRoles, function (value, key) {
        if (value.cluster == 'all' || value.cluster == args.clusterId) {
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
    _.remove(roles, {roleName: 'platformadmin'})
    _.remove(roles, {roleName: 'clusteradmin'})
    _.remove(roles, {roleName: 'chapteradmin'})
    _.remove(roles, {roleName: 'subchapteradmin'})
    _.remove(roles, {roleName: 'communityadmin'})
  }
  return roles;
}




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
      if (role.id!=''&&role.id!=null) {
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
  var isChapterRole = false;
  let levelCode = args.levelCode
  let department = mlDBController.findOne("MlDepartments", {"_id": args.departmentId}, context)
  var subChapterDetails = mlDBController.findOne("MlSubChapters", {"_id": args.subChapterId}, context) || {};

  var filteredRole = [];

  if (subChapterDetails.isDefaultSubChapter) {
    if (department && department.isActive) {
      let valueGet = mlDBController.find('MlRoles', {"$and": [{"assignRoles.department": {"$in": [args.departmentId]}}, {"assignRoles.subDepartment": {"$in": [args.subDepartmentId]}}, {"assignRoles.cluster": {"$in": ["all", args.clusterId]}}, {"isActive": true}]}, context).fetch()
      if (department.isSystemDefined) {
        _.each(valueGet, function (item, say) {
          filteredRole.push(item)
        })
      }
      else {

        //validate chapter or subchapter role
        _.each(valueGet, function (item, say) {
          _.each(item.assignRoles, function (value, key) {
            if (value.chapter != "all" && value.subChapter == 'all' && value.community == "all") {
              if (item._id==args.currentRoleId && value.isActive) {
                isChapterRole = true;
              }
            }
          })
        })


        if (levelCode == 'cluster') {
          _.each(valueGet, function (item, say) {
            _.each(item.assignRoles, function (value, key) {
              if ((value.cluster == args.clusterId || value.cluster == 'all') && (value.chapter == "all") && (value.subChapter == "all") && (value.community == "all")) {
                if (item._id!=args.currentRoleId && value.isActive) {
                  filteredRole.push(item)
                }
              }
            })
          })
        } else if (levelCode == 'chapter' && isChapterRole === true) {
          _.each(valueGet, function (item, say) {
            _.each(item.assignRoles, function (value, key) {
              if (value.chapter != "all" && value.subChapter == 'all' && value.community == "all") {
                if (item._id!=args.currentRoleId &&value.isActive) {
                  filteredRole.push(item)
                }
              }
              if ((value.cluster == args.clusterId || value.cluster == 'all') && (value.chapter == "all") && (value.subChapter == "all") && (value.community == "all")) {
                if (item._id!=args.currentRoleId && value.isActive) {
                  filteredRole.push(item)
                }
              }
            })
          })
        }else if (levelCode == 'chapter' && isChapterRole === false) {
          _.each(valueGet, function (item, say) {
            _.each(item.assignRoles, function (value, key) {
              if( value.subChapter != 'all' && value.community == "all"){
                if (item._id!=args.currentRoleId &&value.isActive) {
                  filteredRole.push(item)
                }
              }
              if (value.chapter != "all" && value.subChapter == 'all' && value.community == "all") {
                isChapterRole = true;
                if (item._id!=args.currentRoleId &&value.isActive) {
                  filteredRole.push(item)
                }
              }
              if ((value.cluster == args.clusterId || value.cluster == 'all') && (value.chapter == "all") && (value.subChapter == "all") && (value.community == "all")) {
                if (item._id!=args.currentRoleId && value.isActive) {
                  filteredRole.push(item)
                }
              }
            })

          })
        } else if (levelCode == 'community') {
          _.each(valueGet, function (item, say) {
            _.each(item.assignRoles, function (value, key) {
              if ( value.community != "all") {
                if (item._id!=args.currentRoleId &&value.isActive) {
                  filteredRole.push(item)
                }
              }
              if ((value.cluster == args.clusterId || value.cluster == 'all') && (value.chapter == "all") && (value.subChapter == "all") && (value.community == "all")) {
                if (item._id!=args.currentRoleId && value.isActive) {
                  filteredRole.push(item)
                }
              }
              if (value.chapter != "all" && value.subChapter == 'all' && value.community == "all") {
                if (item._id!=args.currentRoleId &&value.isActive) {
                  filteredRole.push(item)
                }
              }
              if(value.subChapter != 'all' && value.community == "all"){
                if (item._id!=args.currentRoleId &&value.isActive) {
                  filteredRole.push(item)
                }
              }
            })

          })
        }

      }

    }
    //removing roles whose reporting role is selected for current role
    let teamStructureAssignment = args.roles
    /*teamStructure.map(function (selectedRole) {
     if(selectedRole.reportingRole==args.currentRoleId){
     filteredRole = _.reject(filteredRole, {_id: selectedRole.roleId});
     }
     })*/

    let currentRole = args.currentRoleId;
    for (i = 0; i < teamStructureAssignment.length; i++) {
      for (j = 0; j < teamStructureAssignment.length; j++) {
        let role = teamStructureAssignment[j];
        if (role.reportingRole == currentRole && role.isAssigned === true) {
          filteredRole = _.reject(filteredRole, {_id: role.roleId});
          currentRole = role.roleId
          break;
        }
      }
    }
  }else{

    if (levelCode == 'subchapter'){
      var valueGet = mlDBController.find('MlRoles', {"$and": [{"assignRoles.department": {"$in": [args.departmentId]}}, {"assignRoles.subDepartment": {"$in": [args.subDepartmentId]}}, {"assignRoles.cluster": {"$in": ["all", args.clusterId]}}, {"assignRoles.subChapter": {"$in": ["all", args.subChapterId]}}, {"isActive": true}]}, context).fetch()
      if (department.isSystemDefined) {
        _.each(valueGet, function (item, say) {
          filteredRole.push(item)
        })
      }
      else {

        //validate chapter or subchapter role
        _.each(valueGet, function (item, say) {
          _.each(item.assignRoles, function (value, key) {
            if (value.chapter != "all" && value.subChapter == 'all' && value.community == "all") {
              if (item._id == args.currentRoleId && value.isActive) {
                isChapterRole = true;
              }
            }
          })
        })
      }
    }else if(levelCode == 'community'){
      var valueGet = mlDBController.find('MlRoles', {"$and": [{"assignRoles.department": {"$in": [args.departmentId]}}, {"assignRoles.subDepartment": {"$in": [args.subDepartmentId]}}, {"assignRoles.cluster": {"$in": ["all", args.clusterId]}}, {"assignRoles.chapter": {$exists:true}}, {"assignRoles.subChapter": {"$in": ["all", args.subChapterId]}}, {"assignRoles.community": {$exists:true}}, {"isActive": true}]}, context).fetch()
      if (department.isSystemDefined) {
        _.each(valueGet, function (item, say) {
          filteredRole.push(item)
        })
      }
      else {

        //validate chapter or subchapter role
        _.each(valueGet, function (item, say) {
          _.each(item.assignRoles, function (value, key) {
            if (value.chapter != "all" && value.subChapter == 'all' && value.community == "all") {
              if (item._id == args.currentRoleId && value.isActive) {
                isChapterRole = true;
              }
            }
          })
        })
      }
    }
  }


  return filteredRole;
}

/*MlResolver.MlQueryResolver['fetchRolesForFinalApprovalHierarchy'] = (obj, args, context, info) => { //
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
}*/

MlResolver.MlQueryResolver['fetchRolesForFinalApprovalHierarchy'] = (obj, args, context, info) => {
  let response;
  let department = mlDBController.findOne("MlDepartments", {"_id": args.departmentId}, context)
  if (department && department.isActive && department.isSystemDefined===false) {
      response = mlDBController.findOne('MlHierarchyAssignments', {
        parentDepartment: args.departmentId,
        parentSubDepartment: args.subDepartmentId,
        clusterId:department.isSystemDefined?"All":args.clusterId
      }, context)

  if(response){
    let teamStructureAssignment = response.teamStructureAssignment;
    let filteredSteps = [];
     teamStructureAssignment.map(function (step, key){
     if(step.isAssigned===true){
     filteredSteps.push(step)
     }
     })
     //response.teamStructureAssignment = filteredSteps;
    return filteredSteps;
   }
  }else if (department && department.isActive && department.isSystemDefined===true){
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
    response = valueGet;
    response.map(function (role) {
      role.roleId = role._id
    })
  }
  return response;
}

