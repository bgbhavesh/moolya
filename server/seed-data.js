/**
 * Created by venkatasrinag on 19/12/16.
 */

import MlNotificationController from './mlNotifications/mlAppNotifications/mlNotificationsController'
import mlResourceConfigRepo from './MlExternalUsers/ResourceConfiguration/mlResourceConigRepo'

let _ = require('lodash'),
  adminPassword = 'MoolyaAdmin@123',
  platformAdminId,
  mlModules = MlModules.find().fetch(),
  actions = MlActions.find().fetch(),
  permissions = [{ actionId: 'all', actionCode: 'ALL', isActive: true }],
  readPermissions = [{ actionId: (_.find(actions, { code: 'READ' }))._id, actionCode: 'READ', isActive: true }]

/** ********************************* Default Department/SubDepartment Creation <Start> ******************************************* */
let department = MlDepartments.findOne({ departmentName: 'operations' })
if (!department) {
  const departmentAvailiable = [{
    cluster: 'all', chapter: 'all', subChapter: 'all', isActive: true
  }]
  department = {
    departmentName: 'operations',
    displayName: 'Operations',
    departmentDesc: 'Operations Department',
    isActive: true,
    isMoolya: true,
    depatmentAvailable: departmentAvailiable,
    isSystemDefined: true
  };

  MlDepartments.insert(department);
}

let subDepartment = MlSubDepartments.findOne({ subDepartmentName: 'systemadmin' })
if (!subDepartment) {
  const dep = MlDepartments.findOne({ departmentName: 'operations' });
  const subDepatmentAvailable = [{
    cluster: 'all', chapter: 'all', subChapter: 'all', isActive: true
  }]
  subDepartment = {
    subDepartmentName: 'systemadmin',
    displayName: 'System Admin',
    aboutSubDepartment: 'System Adminstration',
    isActive: true,
    isMoolya: false,
    departmentId: dep._id,
    subDepatmentAvailable,
    isSystemDefined: true
  };
  MlSubDepartments.insert(subDepartment);
}
/** ********************************* Default Department/SubDepartment Creation <END> *****************************https://raksanconsulting.atlassian.net/browse/MOOLYA-1023**************** */

/** ********************************* Default Moolya Roles Creation <Start> ********************************************* */
const dep = MlDepartments.findOne({ departmentName: 'operations' });
const subDep = MlSubDepartments.findOne({ subDepartmentName: 'systemadmin' });

let platformrole = MlRoles.findOne({ roleName: 'platformadmin' })
if (!platformrole) {
  const assignRoles = [{
    cluster: 'all', chapter: 'all', subChapter: 'all', community: 'all', department: dep._id, subDepartment: subDep._id, isActive: true
  }]
  const modules = [{ moduleId: 'all', actions: permissions }]
  platformrole = {
    roleName: 'platformadmin',
    displayName: 'Platform Admin',
    assignRoles,
    modules,
    isActive: true,
    isSystemDefined: true
  }
  MlRoles.insert(platformrole);
}

{
  const assignRoles = [{
    cluster: 'all', chapter: 'all', subChapter: 'all', community: 'all', department: dep._id, subDepartment: subDep._id, isActive: true
  }]
  const modules = [
    { moduleId: (_.find(mlModules, { code: 'CLUSTER' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'CHAPTER' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'SUBCHAPTER' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'COMMUNITY' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'USERS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'MASTERSETTINGS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'GLOBALSETTINGS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'REGISTRATION' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'PORTFOLIO' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'TAXATION' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'DOCUMENTS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'TEMPLATEASSIGNMENT' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'REQUESTTYPE' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'INTERNALREQUESTS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'INTERNALAPPROVEDREQUESTS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'FILTERS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'PROCESSMAPPING' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'PROCESSSETUP' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'SHARE' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'OFFICE' }))._id, actions: permissions, isActive: true }, /* adding office module */
    { moduleId: (_.find(mlModules, { code: 'SERVICECARD' }))._id, actions: readPermissions, isActive: true }
  ]
  var role = {
    roleName: 'clusteradmin',
    displayName: 'Cluster Admin',
    assignRoles,
    modules,
    isActive: true,
    isSystemDefined: true
  }
  MlRoles.update({ roleName: 'clusteradmin' }, { $set: role }, { upsert: true })
}

{
  const assignRoles = [{
    cluster: 'all', chapter: 'all', subChapter: 'all', community: 'all', department: dep._id, subDepartment: subDep._id, isActive: true
  }]
  const modules = [
    { moduleId: (_.find(mlModules, { code: 'CHAPTER' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'SUBCHAPTER' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'COMMUNITY' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'USERS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'REGISTRATION' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'PORTFOLIO' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'MASTERSETTINGS' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'GLOBALSETTINGS' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'TAXATION' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'DOCUMENTS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'TEMPLATEASSIGNMENT' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'REQUESTTYPE' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'INTERNALREQUESTS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'INTERNALAPPROVEDREQUESTS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'FILTERS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'PROCESSMAPPING' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'PROCESSSETUP' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'SHARE' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'OFFICE' }))._id, actions: permissions, isActive: true }, /* adding office module */
    { moduleId: (_.find(mlModules, { code: 'SERVICECARD' }))._id, actions: readPermissions, isActive: true }
  ]
  const role = {
    roleName: 'chapteradmin',
    displayName: 'Chapter Admin',
    assignRoles,
    modules,
    isActive: true,
    isSystemDefined: true
  }
  MlRoles.update({ roleName: 'chapteradmin' }, { $set: role }, { upsert: true })
}


// var subchapterAdmin = MlRoles.findOne({roleName:"subchapteradmin"})
// if(!subchapterAdmin)
{
  const assignRoles = [{
    cluster: 'all', chapter: 'all', subChapter: 'all', community: 'all', department: dep._id, subDepartment: subDep._id, isActive: true
  }]
  const modules = [
    { moduleId: (_.find(mlModules, { code: 'CHAPTER' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'SUBCHAPTER' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'COMMUNITY' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'USERS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'REGISTRATION' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'PORTFOLIO' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'MASTERSETTINGS' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'GLOBALSETTINGS' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'TAXATION' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'DOCUMENTS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'TEMPLATEASSIGNMENT' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'REQUESTTYPE' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'INTERNALREQUESTS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'INTERNALAPPROVEDREQUESTS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'FILTERS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'PROCESSMAPPING' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'DEPARTMENT' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'SUBDEPARTMENT' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'TEMPLATE' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'ROLES' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'HIERARCHY' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'CLUSTER' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'PROCESSSETUP' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'OFFICE' }))._id, actions: permissions, isActive: true }, /* adding office module */
    { moduleId: (_.find(mlModules, { code: 'SERVICECARD' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'SHARE' }))._id, actions: readPermissions, isActive: true }
  ]
  const role = {
    roleName: 'subchapteradmin',
    displayName: 'Sub-Chapter Admin',
    assignRoles,
    modules,
    isActive: true,
    isNonMoolyaAvailable: true,
    isSystemDefined: true
  }
  MlRoles.update({ roleName: 'subchapteradmin' }, { $set: role }, { upsert: true })
}

// var communityAdmin = MlRoles.findOne({roleName:"communityadmin"})
// if(!communityAdmin)
{
  const assignRoles = [{
    cluster: 'all', chapter: 'all', subChapter: 'all', community: 'all', department: dep._id, subDepartment: subDep._id, isActive: true
  }]
  const communityPer = [{ actionId: (_.find(actions, { code: 'READ' }))._id, actionCode: 'READ', isActive: true }]
  const modules = [
    { moduleId: (_.find(mlModules, { code: 'CHAPTER' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'SUBCHAPTER' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'COMMUNITY' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'USERS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'MASTERSETTINGS' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'GLOBALSETTINGS' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'TAXATION' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'REGISTRATION' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'PORTFOLIO' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'DOCUMENTS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'TEMPLATEASSIGNMENT' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'REQUESTTYPE' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'INTERNALREQUESTS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'INTERNALAPPROVEDREQUESTS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'FILTERS' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'PROCESSMAPPING' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'PROCESSSETUP' }))._id, actions: permissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'SHARE' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'SERVICECARD' }))._id, actions: readPermissions, isActive: true },
    { moduleId: (_.find(mlModules, { code: 'OFFICE' }))._id, actions: permissions, isActive: true } /* adding office module */
  ]
  const role = {
    roleName: 'communityadmin',
    displayName: 'Community Admin',
    assignRoles,
    modules,
    isActive: true,
    isNonMoolyaAvailable: true,
    isSystemDefined: true
  }
  MlRoles.update({ roleName: 'communityadmin' }, { $set: role }, { upsert: true })
}


/** ************************************** anchor default roles <START>************************************************ */

const assignRolesAnchor = [{
  cluster: 'all',
  chapter: 'all',
  subChapter: 'all',
  community: 'all',
  department: dep._id,
  subDepartment: subDep._id,
  isActive: true
}]
// todo:// identify the transaction related module and remove permission from all anchor roles ["Registration and portfolio"]
/** clusterAnchor */
const modulesclusteranchor = [
  { moduleId: (_.find(mlModules, { code: 'CLUSTER' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'CHAPTER' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'SUBCHAPTER' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'COMMUNITY' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'USERS' }))._id, actions: permissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'MASTERSETTINGS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'GLOBALSETTINGS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'REGISTRATION' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'PORTFOLIO' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'TAXATION' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'DOCUMENTS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'TEMPLATEASSIGNMENT' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'REQUESTTYPE' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'INTERNALREQUESTS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'INTERNALAPPROVEDREQUESTS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'FILTERS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'PROCESSMAPPING' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'PROCESSSETUP' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'SHARE' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'OFFICE' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'SERVICECARD' }))._id, actions: readPermissions, isActive: true }
]
const roleclusteranchor = {
  roleName: 'clusteranchor',
  displayName: 'Cluster Anchor',
  assignRoles: assignRolesAnchor,
  modules: modulesclusteranchor,
  isActive: true,
  isAnchor: true,
  isSystemDefined: true
}
MlRoles.update({ roleName: 'clusteranchor' }, { $set: roleclusteranchor }, { upsert: true })

/** chapterAnchor */
const moduleschapteranchor = [
  { moduleId: (_.find(mlModules, { code: 'CHAPTER' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'SUBCHAPTER' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'COMMUNITY' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'USERS' }))._id, actions: permissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'REGISTRATION' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'PORTFOLIO' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'MASTERSETTINGS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'GLOBALSETTINGS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'TAXATION' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'DOCUMENTS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'TEMPLATEASSIGNMENT' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'REQUESTTYPE' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'INTERNALREQUESTS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'INTERNALAPPROVEDREQUESTS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'FILTERS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'PROCESSMAPPING' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'PROCESSSETUP' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'SHARE' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'OFFICE' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'SERVICECARD' }))._id, actions: readPermissions, isActive: true }
]
const rolechapteranchor = {
  roleName: 'chapteranchor',
  displayName: 'Chapter Anchor',
  assignRoles: assignRolesAnchor,
  modules: moduleschapteranchor,
  isActive: true,
  isAnchor: true,
  isSystemDefined: true
}
MlRoles.update({ roleName: 'chapteranchor' }, { $set: rolechapteranchor }, { upsert: true })

/** subChapterAnchor */
const modulessubchapteranchor = [
  { moduleId: (_.find(mlModules, { code: 'CHAPTER' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'SUBCHAPTER' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'COMMUNITY' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'USERS' }))._id, actions: permissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'REGISTRATION' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'PORTFOLIO' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'MASTERSETTINGS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'GLOBALSETTINGS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'TAXATION' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'DOCUMENTS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'TEMPLATEASSIGNMENT' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'REQUESTTYPE' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'INTERNALREQUESTS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'INTERNALAPPROVEDREQUESTS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'FILTERS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'PROCESSMAPPING' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'DEPARTMENT' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'SUBDEPARTMENT' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'TEMPLATE' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'ROLES' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'HIERARCHY' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'CLUSTER' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'PROCESSSETUP' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'OFFICE' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'SERVICECARD' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'SHARE' }))._id, actions: readPermissions, isActive: true }
]
const rolesubchapteranchor = {
  roleName: 'subchapteranchor',
  displayName: 'Sub-Chapter Anchor',
  assignRoles: assignRolesAnchor,
  modules: modulessubchapteranchor,
  isActive: true,
  isAnchor: true,
  isNonMoolyaAvailable: true,
  isSystemDefined: true
}
MlRoles.update({ roleName: 'subchapteranchor' }, { $set: rolesubchapteranchor }, { upsert: true })

/** communityAnchor */
const modulesCommunityAnchor = [
  { moduleId: (_.find(mlModules, { code: 'CHAPTER' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'SUBCHAPTER' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'COMMUNITY' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'USERS' }))._id, actions: permissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'MASTERSETTINGS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'GLOBALSETTINGS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'TAXATION' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'REGISTRATION' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'PORTFOLIO' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'DOCUMENTS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'TEMPLATEASSIGNMENT' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'REQUESTTYPE' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'INTERNALREQUESTS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'INTERNALAPPROVEDREQUESTS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'FILTERS' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'PROCESSMAPPING' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'PROCESSSETUP' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'SHARE' }))._id, actions: readPermissions, isActive: true },
  { moduleId: (_.find(mlModules, { code: 'OFFICE' }))._id, actions: readPermissions, isActive: true }
]
const roleCommunityAnchor = {
  roleName: 'communityanchor',
  displayName: 'Community Anchor',
  assignRoles: assignRolesAnchor,
  modules: modulesCommunityAnchor,
  isActive: true,
  isAnchor: true,
  isNonMoolyaAvailable: true,
  isSystemDefined: true
}
MlRoles.update({ roleName: 'communityanchor' }, { $set: roleCommunityAnchor }, { upsert: true })

/** ************************************** anchor default roles <END>************************************************** */

/** ********************************* Default Moolya Roles Creation <End> ********************************************* */


/** ********************************* Default Moolya Admin Creation <Start> ******************************************* */

const options = {
  profile: {
    isInternaluser: true,
    isExternaluser: false,
    email: 'platformadmin@moolya.global',
    isMoolya: true,
    isActive: true,
    firstName: 'Platform',
    lastName: 'Admin',
    InternalUprofile: {
      moolyaProfile: {
        assignedDepartment: [{ department: dep._id, subDepartment: subDep._id }],
        email: 'platformadmin@moolya.global',
        phoneNumber: '9999999999',
        userProfiles: [],
        isActive: true,
        firstName: 'Platform',
        lastName: 'Admin',
        displayName: 'Platform Admin'
      }
    },
    isSystemDefined: true
  },
  username: 'platformadmin@moolya.global',
  password: adminPassword

};

const userObj = Meteor.users.findOne({ username: 'platformadmin@moolya.global' });
if (!userObj) {
  console.log('No Admin found, hence inserting a default Moolya Admin: ', options);
  platformAdminId = Accounts.createUser(options);
} else {
  Accounts.setPassword(userObj._id, adminPassword);
  console.log('Admin password set from settings file');
}

var role = MlRoles.findOne({ roleName: 'platformadmin' })
if (role) {
  const userRoles = [{
    roleId: role._id, clusterId: 'all', chapterId: 'all', subChapterId: 'all', communityId: 'all', communityCode: 'all', hierarchyLevel: 4, hierarchyCode: 'PLATFORM', isActive: true, roleName: 'platformadmin', departmentId: dep._id, departmentName: dep.departmentName, subDepartmentId: subDep._id, subDepartmentName: subDep.subDepartmentName
  }]
  const userProfiles = [{
    clusterId: 'all',
    userRoles,
    isDefault: true
  }]
  Meteor.users.update({ _id: platformAdminId }, { $set: { 'profile.InternalUprofile.moolyaProfile.userProfiles': userProfiles } })
}
/** ********************************* Default Moolya Admin Creation <End> ********************************************* */
/** ********************************* Default Moolya System Admin Creation <Start> ******************************************* */

const systemAdminProfile = {
  profile: {
    isInternaluser: true,
    isExternaluser: false,
    email: 'systemadmin@moolya.global',
    isActive: true,
    firstName: 'System',
    lastName: 'Admin',
    InternalUprofile: {
      moolyaProfile: {
        assignedDepartment: [{ department: dep._id, subDepartment: subDep._id }],
        email: 'systemadmin@moolya.global',
        phoneNumber: '9999999999',
        userProfiles: [],
        isActive: true,
        firstName: 'System',
        lastName: 'Admin',
        displayName: 'System Admin'
      }
    },
    isSystemDefined: true
  },
  username: 'systemadmin@moolya.global',
  password: adminPassword
};

const systemAdminUser = Meteor.users.findOne({ username: 'systemadmin@moolya.global' });
if (!systemAdminUser) {
  console.log('No Admin found, hence inserting a default Moolya System Admin: ', systemAdminProfile);
  Accounts.createUser(systemAdminProfile);
} else {
  Accounts.setPassword(systemAdminUser._id, adminPassword);
  console.log('System Admin password set from settings file');
}

/** ********************************* Default Moolya System Admin Creation <End> ********************************************* */
/** ********************************* Default Hierarchy Assignements <Start> ********************************************* */
const depHierarchy = MlDepartments.findOne({ departmentName: 'operations' });
const subDepHierarchy = MlSubDepartments.findOne({ subDepartmentName: 'systemadmin' });

const platformAdminHierarchy = MlRoles.findOne({ roleName: 'platformadmin' })
const clusterAdminHierarchy = MlRoles.findOne({ roleName: 'clusteradmin' })
const chapterAdminHierarchy = MlRoles.findOne({ roleName: 'chapteradmin' })
const subchapterAdminHierarchy = MlRoles.findOne({ roleName: 'subchapteradmin' })
const communityAdminHierarchy = MlRoles.findOne({ roleName: 'communityadmin' })
const hierarchyAssignmentMoolya = MlHierarchyAssignments.findOne({ clusterId: 'All', isDefaultSubChapter: true })
const hierarchyAssignmentNonMoolya = MlHierarchyAssignments.findOne({ clusterId: 'All', isDefaultSubChapter: false })
if (!hierarchyAssignmentMoolya) {
  /**
   * moolya hirarchy seed-data
   * */
  const hierarchyMoolya = {
    parentDepartment: depHierarchy._id,
    parentSubDepartment: subDepHierarchy._id,
    clusterId: 'All',
    subChapterId: 'all',
    isDefaultSubChapter: true,
    teamStructureAssignment: [{
      roleId: clusterAdminHierarchy._id,
      roleName: clusterAdminHierarchy.roleName,
      displayName: clusterAdminHierarchy.displayName,
      roleType: 'Internal User',
      isAssigned: true,
      assignedLevel: 'cluster',
      reportingRole: ''
    },
    {
      roleId: chapterAdminHierarchy._id,
      roleName: chapterAdminHierarchy.roleName,
      displayName: chapterAdminHierarchy.displayName,
      roleType: 'Internal User',
      isAssigned: true,
      assignedLevel: 'chapter',
      reportingRole: clusterAdminHierarchy._id
    },
    {
      roleId: subchapterAdminHierarchy._id,
      roleName: subchapterAdminHierarchy.roleName,
      displayName: subchapterAdminHierarchy.displayName,
      roleType: 'Internal User',
      isAssigned: true,
      assignedLevel: 'subChapter',
      reportingRole: chapterAdminHierarchy._id
    },
    {
      roleId: communityAdminHierarchy._id,
      roleName: communityAdminHierarchy.roleName,
      displayName: communityAdminHierarchy.displayName,
      roleType: 'Internal User',
      isAssigned: true,
      assignedLevel: 'community',
      reportingRole: subchapterAdminHierarchy._id
    }],
    finalApproval: {
      department: depHierarchy._id,
      subDepartment: subDepHierarchy._id,
      role: platformAdminHierarchy._id,
      isChecked: true
    }
  };
  MlHierarchyAssignments.insert(hierarchyMoolya);
}
/**
   * non-moolya hirarchy seed data
   * */
if (!hierarchyAssignmentNonMoolya) {
  const hierarchyNonMoolya = {
    parentDepartment: depHierarchy._id,
    parentSubDepartment: subDepHierarchy._id,
    clusterId: 'All',
    subChapterId: 'all',
    isDefaultSubChapter: false,
    teamStructureAssignment: [
      {
        roleId: subchapterAdminHierarchy._id,
        roleName: subchapterAdminHierarchy.roleName,
        displayName: subchapterAdminHierarchy.displayName,
        roleType: 'Internal User',
        isAssigned: true,
        assignedLevel: 'subChapter',
        reportingRole: ''
      },
      {
        roleId: communityAdminHierarchy._id,
        roleName: communityAdminHierarchy.roleName,
        displayName: communityAdminHierarchy.displayName,
        roleType: 'Internal User',
        isAssigned: true,
        assignedLevel: 'community',
        reportingRole: subchapterAdminHierarchy._id
      }],
    finalApproval: {
      department: depHierarchy._id,
      subDepartment: subDepHierarchy._id,
      role: chapterAdminHierarchy._id,
      isChecked: true
    }
  };
  MlHierarchyAssignments.insert(hierarchyNonMoolya);
}


/** ********************************* Default Hierarchy Assignements <End> ********************************************* */

// db.users.insert({
//   "_id":1,
//   "username":"rakesh.naik@moolya.in",
//   "password":"Welcome123$%^",
//   "profile":{
//     "isInternaluser":true,
//     "isExternaluser":false,
//     "email":"rakesh.naik@moolya.in",
//     "InternalUprofile":{
//       "moolyaProfile":{
//         "assignedDepartment":[{
//           "department" : "NuKJytcAFPuMGFxha",
//           "subDepartment" : "Rr75SpSMRvN6HgSEt"
//         }],
//         "email":"rakesh.naik@moolya.in",
//         "phoneNumber":"996408213",
//         "userProfiles":[{
//           "clusterId" : "all",
//           "isDefault":true,
//           "userRoles" : [ {
//             "roleId" : "Qk3rfoWwsMqAyKTPb",
//             "chapterId" : "all",
//             "subChapterId" : "all",
//             "communityId" : "all",
//             "hierarchyLevel" : 4,
//             "hierarchyCode" : "PLATFORM"
//           }],
//         }],
//         "isActive" : true,
//         "firstName" : "Rakesh",
//         "lastName" : "Naik"
//       }
//     }
//   }
// })
//
//
// db.users.insert({
//   "_id":2,
//   "username":"suresh.garimella@moolya.in",
//   "password":"Welcome123$%^",
//   "profile":{
//     "isInternaluser":true,
//     "isExternaluser":false,
//     "email":"suresh.garimella@moolya.in",
//     "InternalUprofile":{
//       "moolyaProfile":{
//         "assignedDepartment":[{
//           "department" : "NuKJytcAFPuMGFxha",
//           "subDepartment" : "Rr75SpSMRvN6HgSEt"
//         }],
//         "email":"suresh.garimella@moolya.in",
//         "phoneNumber":"9490167831",
//         "userProfiles":[{
//           "clusterId" : "all",
//           "isDefault":true,
//           "userRoles" : [ {
//             "roleId" : "Qk3rfoWwsMqAyKTPb",
//             "chapterId" : "all",
//             "subChapterId" : "all",
//             "communityId" : "all",
//             "hierarchyLevel" : 4,
//             "hierarchyCode" : "PLATFORM"
//           }],
//         }],
//         "isActive" : true,
//         "firstName" : "Suresh",
//         "lastName" : "Garimella"
//       }
//     }
//   }
// })

Accounts.config({
  loginExpirationInDays: 1
});


/** ***************************************** User Login <Start> ****************************************************** */

Accounts.validateLoginAttempt((user) => {
  const isValid = false;
  /** checking possible condition of login attempt */
  if (user && !user.allowed && (user.error.reason == 'Incorrect password')) { throw new Meteor.Error(403, 'Username or password incorrect'); } else if (user && !user.allowed) {
    /** if user is not present but available in registrations */
    const username = user.methodArguments[0].user ? user.methodArguments[0].user.username : ''
    const regData = MlRegistration.findOne({ 'registrationInfo.email': username })
    if (regData) {
      if (_.find(regData.emails, { verified: false })) { throw new Meteor.Error(403, 'Email verification is pending'); } else { throw new Meteor.Error(403, 'Registration review in process, please contact moolya admin for any Queries '); }
    }
  }

  /** external user login attempt */
  else if (user && user.user && user.user.profile && user.user.profile.isExternaluser) {
    const isAllowed = validateExternalUserLoginAttempt(user);
    if (!isAllowed) throw new Meteor.Error(403, 'User account is inactive!');
    return true;
  }

  /** internal user login attempt */
  else if (user && user.user && user.user.profile && user.user.profile.isInternaluser) {
    if (user && user.user && user.user.profile && !user.user.profile.isActive) {
      user.allowed = false
      throw new Meteor.Error(403, 'User account is inactive!');
    }
    return validateinternalUserLoginAttempt(user)
  }

  return true;
});

validateExternalUserLoginAttempt = (user) => {
  const userExternal = user.user.profile.isExternaluser;
  // check if email is verified.
  const emails = user.user && user.user.emails ? user.user.emails : [];
  const email = _.find(emails || [], e => (e.verified && e.address === user.user.username));
  if (!email) { return false; }
  return userExternal
}


validateinternalUserLoginAttempt = (user) => {
  const userProfiles = user.user.profile.InternalUprofile && user.user.profile.InternalUprofile.moolyaProfile && user.user.profile.InternalUprofile.moolyaProfile.userProfiles;
  let roleActive = false,
    chapterActive = false,
    subChapterActive = false,
    communityActive = false,
    hierarchyLevel,
    hierarchyCode;
  if (!userProfiles) {
    user.allowed = false
    throw new Meteor.Error(403, 'No Active Profile');
  }

  const defaultProfile = _.find(userProfiles, { isDefault: true });
  if (!defaultProfile) {
    user.allowed = false
    throw new Meteor.Error(403, 'Default Profile is not active');
  }

  const defaultRoles = defaultProfile.userRoles;
  const defaultCluster = MlClusters.findOne({ $and: [{ _id: defaultProfile.clusterId }, { isActive: true }] })
  if (!defaultCluster && defaultProfile.clusterId != 'all') {
    user.allowed = false
    throw new Meteor.Error(403, 'Default Cluster is not active');
  }

  defaultRoles.map((userRole) => {
    if (!hierarchyLevel) {
      hierarchyLevel = userRole.hierarchyLevel;
      hierarchyCode = userRole.hierarchyCode;
    } else if (hierarchyLevel && hierarchyLevel < userRole.hierarchyLevel) {
      hierarchyLevel = userRole.hierarchyLevel;
      hierarchyCode = userRole.hierarchyCode;
    }
  })

  if (hierarchyCode != 'CLUSTER' || hierarchyCode != 'PLATFORM') {
    defaultRoles.map((role) => {
      let assignedRoleActive = false;
      const defaultRole = MlRoles.findOne({ _id: role.roleId });
      defaultRole.assignRoles.map((assignedRole) => {
        if (assignedRole.isActive) { assignedRoleActive = true }
      })

      if (role.isActive && defaultRole && defaultRole.isActive && assignedRoleActive) {
        roleActive = true;
      }

      const defaultChapter = MlChapters.findOne({ $and: [{ _id: role.chapterId }, { isActive: true }] })
      if (defaultChapter || role.chapterId == 'all') {
        chapterActive = true
      }

      const defaultSubChapter = MlSubChapters.findOne({ $and: [{ _id: role.subChapterId }, { isActive: true }] })
      if (defaultSubChapter || role.subChapterId == 'all') {
        subChapterActive = true
      }

      // let defaultCommunity = MlCommunityAccess.findOne({"$and":[{communityDefCode:role.communityCode}, {isActive:true}]})
      const defaultCommunity = MlCommunity.findOne({ _id: role.communityId, isActive: true });
      if (defaultCommunity || role.communityId == 'all') {
        communityActive = true
      }
    })
  }

  if (!roleActive) {
    user.allowed = false
    throw new Meteor.Error(403, 'None of the roles are active');
  }

  if (!chapterActive) {
    user.allowed = false
    throw new Meteor.Error(403, 'Default Chapter Is Not Active');
  }

  if (!subChapterActive) {
    user.allowed = false
    throw new Meteor.Error(403, 'None of the Sub Chapters are active');
  }

  if (!communityActive) {
    user.allowed = false
    throw new Meteor.Error(403, 'None of the Communities are active');
  }

  return true;
}

MlNotificationController.createNewApplication()
mlResourceConfigRepo.defaultResourceConfig();
/** ***************************************** User Login <End> ******************************************************** */
/** ***************************************** Teplates <Start> ****************************************************** */
/* let process = MlprocessTypes.findOne({processName:"Registration"})
if(!process) {
process = {
    processName   : "Registration",
    displayName   : "Registration",
    processDesc   : "Registration Details",
    isActive      : true
}
MlprocessTypes.insert(process);
}
let subProces = MlSubProcess.findOne({subProcessName:"Registration"})
if(!subProces) {
  let process = MlprocessTypes.findOne({processName:"Registration"})
  let stepDetails = [{stepId: "1", stepCode: "SOFT", stepName: "Soft",isActive:true},{stepId: "2", stepCode: "HARD", stepName: "Hard",isActive:true},{stepId: "3", stepCode: "PORTFOLIO", stepName: "Portfolio",isActive:true}]
   subProces = {
    processName           : "Registration",
    procesId              : process._id,
    subProcessName        : "Registration",
    subProcessDescription : "Registration Details",
    isActive              : true,
    steps                 : stepDetails,
    createdBy             : "System",
    createdDate           : "01-02-2017"
  };
  MlSubProcess.insert(subProces);
} */
/* let proc = MlprocessTypes.findOne({processName:"Registration"})
let subProc = MlSubProcess.findOne({processName:"Registration"})
let template = MlTemplates.findOne({processName:"Registration"})
if(!template){
let templates = [{stepName:"Soft",stepCode:"SOFT",templateCode:"",templateName:"Soft-Template-1",templateDescription:"",isActive: true,createdDate: "01-02-2017"},
                 {stepName:"Soft",stepCode:"SOFT",templateCode:"",templateName:"Soft-Template-2",templateDescription:"",isActive: true,createdDate: "01-02-2017"},
                 {stepName:"Hard",stepCode:"HARD",templateCode:"",templateName:"Hard-Template-2",templateDescription:"",isActive: true,createdDate: "02-02-2017"},
                 {stepName:"Hard",stepCode:"HARD",templateCode:"",templateName:"Hard-Template-2",templateDescription:"",isActive: true,createdDate: "02-02-2017"},
                 {stepName:"Portfolio",stepCode:"PORTFOLIO",templateCode:"",templateName:"Portfolio-Template-2",templateDescription:"",isActive: true,createdDate: "03-03-2017"},
                 {stepName:"Portfolio",stepCode:"PORTFOLIO",templateCode:"",templateName:"Portfolio-Template-2",templateDescription:"",isActive: true,createdDate: "03-03-2017"}]
  let templateObject = {
    procesId                    : proc._id,
    subProcessId                : subProc._id,
    processName                 : "Registration",
    subProcessName              : "Registration",
    templates                   : templates,
    createdBy                   : "System",
    createdDate                 : "01-02-2017",
    isActive                    : true
  }
  MlTemplates.insert(templateObject);
} */


/** ***************************************** Templates <Start> ****************************************************** */

