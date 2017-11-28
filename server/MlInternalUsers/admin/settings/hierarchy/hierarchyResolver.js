import MlResolver from '../../../../commons/mlResolverDef';
import MlRespPayload from '../../../../commons/mlPayload';
import _ from 'lodash';


MlResolver.MlQueryResolver.fetchMoolyaBasedDepartmentAndSubDepartment = (obj, args, context, info) => {
  const list = [];
  const resp = mlDBController.find('MlDepartments', {
    $and: [
      { isMoolya: true },
      { 'depatmentAvailable.cluster': { $in: ['all', args.clusterId] } }
    ]
  }, context).fetch()
  resp.map((department) => {
    const subDepartments = MlSubDepartments.find({ departmentId: department._id }).fetch();
    subDepartments.map((subDepartment) => {
      let deptAndSubDepartment = null
      deptAndSubDepartment = {
        departmentId: department._id, departmentName: department.departmentName, subDepartmentId: subDepartment._id, subDepartmentName: subDepartment.subDepartmentName, isMoolya: department.isMoolya, isActive: department.isActive
      }
      list.push(deptAndSubDepartment)
    })
  })

  return list;
}

MlResolver.MlQueryResolver.fetchNonMoolyaBasedDepartmentAndSubDepartments = (obj, args, context, info) => {
  console.log('fetchNonMoolyaBasedDepartmentAndSubDepartment')
  const list = [];
  const resp = mlDBController.find('MlDepartments', {
    $and: [
      { isMoolya: false },
      { 'depatmentAvailable.cluster': { $in: ['all', args.clusterId] } },
      { 'depatmentAvailable.subChapter': { $in: ['all', args.subChapterId] } }
    ]
  }, context).fetch()
  resp.map((department) => {
    const subDepartments = MlSubDepartments.find({ departmentId: department._id }).fetch();
    subDepartments.map((subDepartment) => {
      let deptAndSubDepartment = null
      deptAndSubDepartment = {
        departmentId: department._id, departmentName: department.departmentName, subDepartmentId: subDepartment._id, subDepartmentName: subDepartment.subDepartmentName, isMoolya: department.isMoolya, isActive: department.isActive
      }
      list.push(deptAndSubDepartment)
    })
  })

  return list;
}


MlResolver.MlMutationResolver.updateHierarchyRoles = (obj, args, context, info) => {
  /* let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }
*/
  let response;
  const roles = args.roles;
  if (roles) {
    roles.map((role) => {
      if (role.id) {
        const result = mlDBController.update('MlRoles', { _id: role.id }, { isHierarchyAssigned: role.isHierarchyAssigned }, { $set: true, multi: true }, context)
        const code = 200;
        response = new MlRespPayload().successPayload(result, code);
        // responses.push(response)
      }
    })
    return response
  }
};

/** fetching roles for department in hirarchy */
MlResolver.MlQueryResolver.fetchRolesForDepartment = (obj, args, context, info) => {
  let roles = [];
  const activeDepartments = mlDBController.findOne('MlDepartments', { _id: args.departmentId, isActive: true }, context)
  const subChapterDetails = mlDBController.findOne('MlSubChapters', { _id: args.subChapterId }, context) || {}
  const chapterId = subChapterDetails.chapterId;
  let hirarchyQuery = {}
  if (subChapterDetails.isDefaultSubChapter) {
    hirarchyQuery = {
      clusterId: args.clusterId,
      parentDepartment: args.departmentId,
      parentSubDepartment: args.subDepartmentId,
      isDefaultSubChapter: subChapterDetails.isDefaultSubChapter
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

  const hierarchy = mlDBController.findOne('MlHierarchyAssignments', hirarchyQuery, context)
  let roleIds = [];
  if (hierarchy) {
    const teamStructure = _.filter(hierarchy.teamStructureAssignment, { isAssigned: true });
    roleIds = _.map(teamStructure, 'roleId');
  }
  if (activeDepartments) {
    let rolesQuery = {}
    if (subChapterDetails.isDefaultSubChapter) {
      rolesQuery = {
        $and: [{ _id: { $nin: roleIds } }, {
          assignRoles: {
            $elemMatch: {
              cluster: { $in: ['all', args.clusterId] },
              department: args.departmentId,
              subDepartment: args.subDepartmentId
            }
          }
        }, { isActive: true }, { roleType: 'moolya' }]
      }
    } else if (!subChapterDetails.isDefaultSubChapter) {
      rolesQuery = {
        $or: [
          {
            $and: [{ _id: { $nin: roleIds } }, {
              assignRoles: {
                $elemMatch: {
                  cluster: { $in: ['all', args.clusterId] },
                  department: args.departmentId,
                  subDepartment: args.subDepartmentId,
                  subChapter: { $in: [args.subChapterId] }
                }
              }
            }, { isActive: true }]
          },
          {
            $and: [{ _id: { $nin: roleIds } }, {
              assignRoles: {
                $elemMatch: {
                  cluster: { $in: ['all', args.clusterId] },
                  department: args.departmentId,
                  subDepartment: args.subDepartmentId,
                  chapter: chapterId,
                  subChapter: { $in: ['all'] }
                }
              }
            }, { isNonMoolyaAvailable: true }, { isActive: true }]
          },
          {
            $and: [{ _id: { $nin: roleIds } }, {
              assignRoles: {
                $elemMatch: {
                  cluster: { $in: ['all', args.clusterId] },
                  department: args.departmentId,
                  subDepartment: args.subDepartmentId,
                  chapter: { $in: ['all'] }
                }
              }
            }, { isNonMoolyaAvailable: true }, { isActive: true }]
          }
        ]

      }
    }

    const valueGet = mlDBController.find('MlRoles', rolesQuery, context).fetch()
    _.each(valueGet, (item, say) => {
      const ary = []
      _.each(item.assignRoles, (value, key) => {
        if (value.cluster == 'all' || value.cluster == args.clusterId) {
          if (value.isActive) {
            ary.push(value);
          }
        }
      })
      item.assignRoles = ary
    })
    _.each(valueGet, (item, key) => {
      if (item) {
        if (item.assignRoles.length < 1) {
          valueGet.splice(key, 1)
        }
      }
    })
    roles = valueGet;
    _.remove(roles, { roleName: 'platformadmin' })
    _.remove(roles, { roleName: 'clusteradmin' })
    _.remove(roles, { roleName: 'chapteradmin' })
    _.remove(roles, { roleName: 'subchapteradmin' })
    _.remove(roles, { roleName: 'communityadmin' })
  }
  return roles;
}


MlResolver.MlMutationResolver.updateFinalApprovalRoles = (obj, args, context, info) => {
  /* let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
   if (!isValidAuth) {
   let code = 401;
   let response = new MlRespPayload().errorPayload("Not Authorized", code);
   return response;
   }
   */
  let response;
  const role = args.finalRole;
  if (role) {
    if (role.id != '' && role.id != null) {
      const result = mlDBController.update('MlHierarchyFinalApproval', role.id, role, { $set: true }, context)
      const code = 200;
      response = new MlRespPayload().successPayload(result, code);
    } else {
      const id = MlHierarchyFinalApproval.insert({ ...args.finalRole });
      if (id) {
        const code = 200;
        const result = { appovalId: id }
        const response = new MlRespPayload().successPayload(result, code);
        return response
      }
    }
    return response
  }
};

MlResolver.MlQueryResolver.fetchRolesForHierarchy = (obj, args, context, info) => { // reporting role
  const roles = [];
  let isChapterRole = false;
  const levelCode = args.levelCode
  const department = mlDBController.findOne('MlDepartments', { _id: args.departmentId }, context)
  const subChapterDetails = mlDBController.findOne('MlSubChapters', { _id: args.subChapterId }, context) || {};
  const chapterId = subChapterDetails.chapterId;
  let filteredRole = [];

  if (subChapterDetails.isDefaultSubChapter) {
    if (department && department.isActive) {
      const valueGet = mlDBController.find('MlRoles', { $and: [{ 'assignRoles.department': { $in: [args.departmentId] } }, { 'assignRoles.subDepartment': { $in: [args.subDepartmentId] } }, { 'assignRoles.cluster': { $in: ['all', args.clusterId] } }, { isActive: true }] }, context).fetch()
      if (department.isSystemDefined) {
        _.each(valueGet, (item, say) => {
          filteredRole.push(item)
        })
      } else {
        // validate chapter or subchapter role
        _.each(valueGet, (item, say) => {
          _.each(item.assignRoles, (value, key) => {
            if (value.chapter != 'all' && value.subChapter == 'all' && value.community == 'all') {
              if (item._id == args.currentRoleId && value.isActive) {
                isChapterRole = true;
              }
            }
          })
        })


        if (levelCode == 'cluster') {
          _.each(valueGet, (item, say) => {
            _.each(item.assignRoles, (value, key) => {
              if ((value.cluster == args.clusterId || value.cluster == 'all') && (value.chapter == 'all') && (value.subChapter == 'all') && (value.community == 'all')) {
                if (item._id != args.currentRoleId && value.isActive) {
                  filteredRole.push(item)
                }
              }
            })
          })
        } else if (levelCode == 'chapter' && isChapterRole === true) {
          _.each(valueGet, (item, say) => {
            _.each(item.assignRoles, (value, key) => {
              if (value.cluster == args.clusterId || value.cluster == 'all') { // Added - Rajat, for filtering Role available in different cluster.
                if (value.chapter != 'all' && value.subChapter == 'all' && value.community == 'all') {
                  if (item._id != args.currentRoleId && value.isActive) {
                    filteredRole.push(item)
                  }
                }
                if ((value.cluster == args.clusterId || value.cluster == 'all') && (value.chapter == 'all') && (value.subChapter == 'all') && (value.community == 'all')) {
                  if (item._id != args.currentRoleId && value.isActive) {
                    filteredRole.push(item)
                  }
                }
              }
            })
          })
        } else if (levelCode == 'chapter' && isChapterRole === false) {
          _.each(valueGet, (item, say) => {
            _.each(item.assignRoles, (value, key) => {
              if (value.cluster == args.clusterId || value.cluster == 'all') { // Added - Rajat
                if (value.subChapter != 'all' && value.community == 'all') {
                  if (item._id != args.currentRoleId && value.isActive) {
                    filteredRole.push(item)
                  }
                }
                if (value.chapter != 'all' && value.subChapter == 'all' && value.community == 'all') {
                  isChapterRole = true;
                  if (item._id != args.currentRoleId && value.isActive) {
                    filteredRole.push(item)
                  }
                }
                if ((value.cluster == args.clusterId || value.cluster == 'all') && (value.chapter == 'all') && (value.subChapter == 'all') && (value.community == 'all')) {
                  if (item._id != args.currentRoleId && value.isActive) {
                    filteredRole.push(item)
                  }
                }
              }
            })
          })
        } else if (levelCode == 'community') {
          _.each(valueGet, (item, say) => {
            _.each(item.assignRoles, (value, key) => {
              if ((value.cluster == args.clusterId || value.cluster == 'all') && (value.subChapter == args.subChapterId || value.subChapter == 'all')) { // Added - Rajat
                if (value.community != 'all') {
                  if (item._id != args.currentRoleId && value.isActive) {
                    filteredRole.push(item)
                  }
                }
                if ((value.cluster == args.clusterId || value.cluster == 'all') && (value.chapter == 'all') && (value.subChapter == 'all') && (value.community == 'all')) {
                  if (item._id != args.currentRoleId && value.isActive) {
                    filteredRole.push(item)
                  }
                }
                if (value.chapter != 'all' && value.subChapter == 'all' && value.community == 'all') {
                  if (item._id != args.currentRoleId && value.isActive) {
                    filteredRole.push(item)
                  }
                }
                if (value.subChapter != 'all' && value.community == 'all') {
                  if (item._id != args.currentRoleId && value.isActive) {
                    filteredRole.push(item)
                  }
                }
              }
            })
          })
        } else if (levelCode == 'subChapter') {
          _.each(valueGet, (item, say) => {
            _.each(item.assignRoles, (value, key) => {
              if ((value.cluster == args.clusterId || value.cluster == 'all') && (value.subChapter == args.subChapterId || value.subChapter == 'all')) { // Added - Rajat
                if (value.subChapter != 'all' && value.community == 'all') {
                  if (item._id != args.currentRoleId && value.isActive) {
                    filteredRole.push(item)
                  }
                }
                if (value.chapter != 'all' && value.subChapter == 'all' && value.community == 'all') {
                  isChapterRole = true;
                  if (item._id != args.currentRoleId && value.isActive) {
                    filteredRole.push(item)
                  }
                }
                if ((value.cluster == args.clusterId || value.cluster == 'all') && (value.chapter == 'all') && (value.subChapter == 'all') && (value.community == 'all')) {
                  if (item._id != args.currentRoleId && value.isActive) {
                    filteredRole.push(item)
                  }
                }
              }
            })
          })
        }
      }
    }
  } else {
    const valueGet = mlDBController.find('MlRoles', { $and: [{ _id: { $nin: [args.currentRoleId] } }, { 'assignRoles.department': { $in: [args.departmentId] } }, { 'assignRoles.subDepartment': { $in: [args.subDepartmentId] } }, { 'assignRoles.cluster': { $in: ['all', args.clusterId] } }, { 'assignRoles.isActive': true }, { isActive: true }, { $or: [{ roleType: 'moolya', isNonMoolyaAvailable: true }, { roleType: 'non-moolya' }] }] }, context).fetch()

    if (levelCode == 'subChapter') {
      _.each(valueGet, (item, say) => {
        _.each(item.assignRoles, (value, key) => {
          if (value.cluster == args.clusterId || value.cluster == 'all') {
            if (value.subChapter != 'all' && value.community == 'all' && value.subChapter == args.subChapterId) {
              if (item._id != args.currentRoleId && value.isActive) {
                filteredRole.push(item)
              }
            }
            if (value.chapter != 'all' && value.subChapter == 'all' && value.community == 'all') {
              if ((value.chapter == chapterId) && item.isNonMoolyaAvailable) {
                if (item._id != args.currentRoleId && value.isActive) {
                  filteredRole.push(item)
                }
              }
            }
            if ((value.cluster == args.clusterId || value.cluster == 'all') && (value.chapter == 'all') && (value.subChapter == 'all') && (value.community == 'all') && item.isNonMoolyaAvailable) {
              if (item._id != args.currentRoleId && value.isActive) {
                filteredRole.push(item)
              }
            }
          }
        })
      })
    } else if (levelCode == 'community') {
      _.each(valueGet, (item, say) => {
        _.each(item.assignRoles, (value, key) => {
          if (value.cluster == args.clusterId || value.cluster == 'all') {
            if (value.community != 'all') {
              if (item._id != args.currentRoleId && value.isActive) {
                filteredRole.push(item)
              }
            }
            if (value.subChapter != 'all' && value.community == 'all' && value.subChapter == args.subChapterId) {
              if (item._id != args.currentRoleId && value.isActive) {
                filteredRole.push(item)
              }
            }
            if (value.chapter != 'all' && value.subChapter == 'all' && value.community == 'all') {
              if ((value.chapter == chapterId) && item.isNonMoolyaAvailable) {
                if (item._id != args.currentRoleId && value.isActive) {
                  filteredRole.push(item)
                }
              }
            }
            if ((value.cluster == args.clusterId || value.cluster == 'all') && (value.chapter == 'all') && (value.subChapter == 'all') && (value.community == 'all') && item.isNonMoolyaAvailable) {
              if (item._id != args.currentRoleId && value.isActive) {
                filteredRole.push(item)
              }
            }
          }
        })
      })
    }
  }

  filteredRole = _.uniq(filteredRole, '_id');

  /*
      Removing roles whose reporting role is selected for current role
      To take care of cyclic reporting role
   */

  const teamStructureAssignment = args.roles;

  let currentRole = args.currentRoleId;
  for (i = 0; i < teamStructureAssignment.length; i++) {
    for (j = 0; j < teamStructureAssignment.length; j++) {
      const role = teamStructureAssignment[j];
      if (role.reportingRole == currentRole && role.isAssigned === true) {
        filteredRole = _.reject(filteredRole, { _id: role.roleId });
        currentRole = role.roleId
        break;
      }
    }
  }

  return filteredRole;
}

/* MlResolver.MlQueryResolver['fetchRolesForFinalApprovalHierarchy'] = (obj, args, context, info) => { //
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
} */

/**
 * fetching final approval hirarchy for departments
 * */
MlResolver.MlQueryResolver.fetchRolesForFinalApprovalHierarchy = (obj, args, context, info) => {
  let response;
  const subChapterDetails = mlDBController.findOne('MlSubChapters', { _id: args.subChapterId }, context) || {}
  const department = mlDBController.findOne('MlDepartments', { _id: args.departmentId, isActive: true }, context)
  if (department && department.isSystemDefined === false) {
    let hirarchyQuery = {}
    if (subChapterDetails.isDefaultSubChapter) { hirarchyQuery = { parentDepartment: args.departmentId, parentSubDepartment: args.subDepartmentId, clusterId: department.isSystemDefined ? 'All' : args.clusterId } } else if (!subChapterDetails.isDefaultSubChapter) {
      hirarchyQuery = {
        parentDepartment: args.departmentId, parentSubDepartment: args.subDepartmentId, clusterId: department.isSystemDefined ? 'All' : args.clusterId, subChapterId: department.isSystemDefined ? 'all' : args.subChapterId
      }
    }

    response = mlDBController.findOne('MlHierarchyAssignments', hirarchyQuery, context)

    if (response) {
      const teamStructureAssignment = response.teamStructureAssignment;
      const filteredSteps = [];
      teamStructureAssignment.map((step, key) => {
        if (step.isAssigned === true) {
          filteredSteps.push(step)
        }
      })
      return filteredSteps;
    }
  } else if (department && department.isSystemDefined === true) {
    const valueGet = mlDBController.find('MlRoles', { $and: [{ 'assignRoles.department': { $in: [args.departmentId] } }, { isActive: true }] }, context).fetch()
    _.each(valueGet, (item, say) => {
      const ary = []
      _.each(item.assignRoles, (value, key) => {
        if (value.cluster == 'all') {
          if (value.isActive) {
            ary.push(value);
          }
        }
      })
      item.assignRoles = ary
    })
    _.each(valueGet, (item, key) => {
      if (item) {
        if (item.assignRoles.length < 1) {
          valueGet.splice(key, 1)
        }
      }
    })
    response = valueGet;
    response.map((role) => {
      role.roleId = role._id
    })
    if (!subChapterDetails.isDefaultSubChapter) {
      _.remove(response, { roleName: 'platformadmin' })
      _.remove(response, { roleName: 'clusteradmin' })
    }
  }
  return response;
}

