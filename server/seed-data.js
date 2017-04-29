/**
 * Created by venkatasrinag on 19/12/16.
 */


let _ = require('lodash'),
  adminPassword = "MoolyaAdmin@123",
  platformAdminId,
  mlModules = MlModules.find().fetch(),
  actions = MlActions.find().fetch(),
  permissions = [{actionId:"all", isActive:true}]

/*********************************** Default Department/SubDepartment Creation <Start> ********************************************/
let department = MlDepartments.findOne({departmentName:"operations"})
if(!department) {
    let departmentAvailiable = [{cluster: "all", chapter: "all", subChapter: "all"}]
  department = {
    departmentName: "operations",
    displayName: "Operations",
    departmentDesc: "Operations Department",
    isActive: true,
    isMoolya: false,
    depatmentAvailable: departmentAvailiable,
    isSystemDefined: true
  };

  MlDepartments.insert(department);
}

let subDepartment = MlSubDepartments.findOne({subDepartmentName:"systemadmin"})
if(!subDepartment) {
  let dep = MlDepartments.findOne({"departmentName":"operations"});
  let subDepatmentAvailable = [{cluster: "all", chapter: "all", subChapter: "all"}]
  subDepartment = {
    subDepartmentName: "systemadmin",
    displayName: "System Admin",
    aboutSubDepartment: "System Adminstration",
    isActive: true,
    isMoolya: false,
    departmentId: dep._id,
    subDepatmentAvailable: subDepatmentAvailable,
    isSystemDefined: true
  };
  MlSubDepartments.insert(subDepartment);
}
/*********************************** Default Department/SubDepartment Creation <END> *****************************https://raksanconsulting.atlassian.net/browse/MOOLYA-1023*****************/

/*********************************** Default Moolya Roles Creation <Start> **********************************************/
let dep = MlDepartments.findOne({"departmentName":"operations"});
let subDep = MlSubDepartments.findOne({"subDepartmentName":"systemadmin"});

var platformrole = MlRoles.findOne({roleName:"platformadmin"})
if(!platformrole){
  let assignRoles = [{cluster:"all", chapter:"all", subChapter:"all", department:dep._id, subDepartment:subDep._id, isActive:true}]
  let modules = [{moduleId:"all", actions:permissions}]
  platformrole = {
    roleName:"platformadmin",
    displayName:"Platform Admin",
    assignRoles: assignRoles,
    modules:modules,
    isActive:true,
    isSystemDefined: true
  }
  MlRoles.insert(platformrole);
}

var clusterAdmin = MlRoles.findOne({roleName:"clusteradmin"})
if(!clusterAdmin){
    let assignRoles = [{cluster:"all", chapter:"all", subChapter:"all", department:dep._id, subDepartment:subDep._id, isActive:true}]
    let clusterPer = [{actionId:(_.find(actions, {code:"READ"}))._id, isActive:true}]
    let modules = [
                    {moduleId:(_.find(mlModules, {code:"CLUSTER"}))._id, actions:clusterPer},
                    {moduleId:(_.find(mlModules, {code:"CHAPTER"}))._id, actions:permissions},
                    {moduleId:(_.find(mlModules, {code:"SUBCHAPTER"}))._id, actions:permissions},
                    {moduleId:(_.find(mlModules, {code:"COMMUNITY"}))._id, actions:permissions},
                    {moduleId:(_.find(mlModules, {code:"REGISTRATION"}))._id, actions:permissions}
                  ]
    let role = {
      roleName:"clusteradmin",
      displayName:"Cluster Admin",
      assignRoles: assignRoles,
      modules:modules,
      isActive:true,
      isSystemDefined: true
    }
    MlRoles.insert(role);
}

var chapterAdmin = MlRoles.findOne({roleName:"chapteradmin"})
if(!chapterAdmin){
  let assignRoles = [{cluster:"all", chapter:"all", subChapter:"all", department:dep._id, subDepartment:subDep._id, isActive:true}]
  let chapterPer = [{actionId:(_.find(actions, {code:"READ"}))._id, isActive:true}]
  let modules = [
    {moduleId:(_.find(mlModules, {code:"CHAPTER"}))._id, actions:chapterPer},
    {moduleId:(_.find(mlModules, {code:"SUBCHAPTER"}))._id, actions:permissions},
    {moduleId:(_.find(mlModules, {code:"COMMUNITY"}))._id, actions:permissions},
    {moduleId:(_.find(mlModules, {code:"REGISTRATION"}))._id, actions:permissions}
  ]
  let role = {
    roleName:"chapteradmin",
    displayName:"Chapter Admin",
    assignRoles: assignRoles,
    modules:modules,
    isActive:true,
    isSystemDefined: true
  }
  MlRoles.insert(role);
}


var subchapterAdmin = MlRoles.findOne({roleName:"subchapteradmin"})
if(!subchapterAdmin){
  let assignRoles = [{cluster:"all", chapter:"all", subChapter:"all", department:dep._id, subDepartment:subDep._id, isActive:true}]
  let chapterPer = [{actionId:(_.find(actions, {code:"READ"}))._id, isActive:true}]
  let modules = [
    {moduleId:(_.find(mlModules, {code:"SUBCHAPTER"}))._id, actions:chapterPer},
    {moduleId:(_.find(mlModules, {code:"COMMUNITY"}))._id, actions:permissions},
    {moduleId:(_.find(mlModules, {code:"REGISTRATION"}))._id, actions:permissions}
  ]
  let role = {
    roleName:"subchapteradmin",
    displayName:"Sub-Chapter Admin",
    assignRoles: assignRoles,
    modules:modules,
    isActive:true,
    isSystemDefined: true
  }
  MlRoles.insert(role);
}

var communityAdmin = MlRoles.findOne({roleName:"communityadmin"})
if(!communityAdmin){
  let assignRoles = [{cluster:"all", chapter:"all", subChapter:"all", department:dep._id, subDepartment:subDep._id, isActive:true}]
  let communityPer = [{actionId:(_.find(actions, {code:"READ"}))._id, isActive:true}]
  let modules = [
    {moduleId:(_.find(mlModules, {code:"COMMUNITY"}))._id, actions:permissions}
  ]
  let role = {
    roleName:"communityadmin",
    displayName:"Community Admin",
    assignRoles: assignRoles,
    modules:modules,
    isActive:true,
    isSystemDefined: true
  }
  MlRoles.insert(role);
}
/*********************************** Default Moolya Roles Creation <End> **********************************************/


/*********************************** Default Moolya Admin Creation <Start> ********************************************/

var options = {
  profile:{

    isInternaluser : true,
    isExternaluser : false,
    email: 'platformadmin@moolya.com',
    isActive:true,
    InternalUprofile:{
      moolyaProfile:{
        assignedDepartment:[{department:dep._id, subDepartment:subDep._id}],
        email:"platformadmin@moolya.com",
        phoneNumber:"9999999999",
        userProfiles:[],
        isActive:true,
        firstName:'Platform',
        lastName:'Admin',
        displayName: 'Platform Admin'
      }
    },
    isSystemDefined: true
  },
  username: 'platformadmin@moolya.com',
  password: adminPassword

};

var userObj = Meteor.users.findOne({username: "platformadmin@moolya.com"});
if(!userObj){
  console.log("No Admin found, hence inserting a default Moolya Admin: ",options);
  platformAdminId = Accounts.createUser(options);
}else{
  Accounts.setPassword(userObj._id, adminPassword);
  console.log("Admin password set from settings file");
}

var role = MlRoles.findOne({roleName:"platformadmin"})
if(role){
  var userRoles = [{roleId:role._id, clusterId:"all", chapterId:"all", subChapterId:"all", communityId:"all", hierarchyLevel:4, hierarchyCode:"PLATFORM", isActive:true, roleName:"platformadmin", departmentId:dep._id, departmentName:dep.departmentName, subDepartmentId:subDep._id, subDepartmentName:subDep.subDepartmentName}]
  var userProfiles = [{
    clusterId:"all",
    userRoles:userRoles,
    isDefault:true
  }]
  Meteor.users.update({_id:platformAdminId}, {$set:{"profile.InternalUprofile.moolyaProfile.userProfiles":userProfiles}})
}
/*********************************** Default Moolya Admin Creation <End> **********************************************/
/*********************************** Default Moolya System Admin Creation <Start> ********************************************/

var systemAdminProfile = {
  profile:{
    isInternaluser : true,
    isExternaluser : false,
    email: 'systemadmin@moolya.com',
    isActive:true,
    InternalUprofile:{
      moolyaProfile:{
        assignedDepartment:[{department:dep._id, subDepartment:subDep._id}],
        email:"systemadmin@moolya.com",
        phoneNumber:"9999999999",
        userProfiles:[],
        isActive:true,
        firstName:'System',
        lastName:'Admin',
        displayName: 'System Admin'
      }
    },
    isSystemDefined: true
  },
  username: 'systemadmin@moolya.com',
  password: adminPassword
};

var systemAdminUser = Meteor.users.findOne({username: "systemadmin@moolya.com"});
if(!systemAdminUser){
  console.log("No Admin found, hence inserting a default Moolya System Admin: ",systemAdminProfile);
  Accounts.createUser(systemAdminProfile);
}else{
  Accounts.setPassword(systemAdminUser._id, adminPassword);
  console.log("System Admin password set from settings file");
}

/*********************************** Default Moolya System Admin Creation <End> **********************************************/


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


/******************************************* User Login <Start> *******************************************************/

Accounts.validateLoginAttempt(function (user)
{

    let isValid=false;

    // if(user && user.user && user.user.profile && !user.user.profile.isActive){
    //     user.allowed = false
    //     throw new Meteor.Error(403, "User account is inactive!");
    // }

    if(user && user.user && user.user.profile && user.user.profile.isExternaluser){
      return validateExternalUserLoginAttempt(user)
    }
    else if(user && user.user && user.user.profile && user.user.profile.isInternaluser){
        if(user && user.user && user.user.profile && !user.user.profile.isActive){               //temporary moving here for external user
          user.allowed = false
          throw new Meteor.Error(403, "User account is inactive!");
        }
        return validateinternalUserLoginAttempt(user)
    }


    return true;
})

validateExternalUserLoginAttempt=(user)=>{
  let userExternal = user.user.profile.isExternaluser
  return userExternal
}


validateinternalUserLoginAttempt=(user)=>{
    let userProfiles = user.user.profile.InternalUprofile && user.user.profile.InternalUprofile.moolyaProfile && user.user.profile.InternalUprofile.moolyaProfile.userProfiles;
    let roleActive = false, chapterActive = false, subChapterActive = false, communityActive = false, hierarchyLevel, hierarchyCode;
    if(!userProfiles){
        user.allowed = false
        throw new Meteor.Error(403, "No Active Profile");
    }

    let defaultProfile = _.find(userProfiles, {isDefault:true});
    if(!defaultProfile){
        user.allowed = false
        throw new Meteor.Error(403, "Default Profile is not active");
    }

    let defaultRoles = defaultProfile.userRoles;
    let defaultCluster = MlClusters.findOne({"$and":[{_id:defaultProfile.clusterId}, {isActive:true}]})
    if(!defaultCluster && defaultProfile.clusterId != 'all'){
        user.allowed = false
        throw new Meteor.Error(403, "Default Cluster is not active");
    }

    defaultRoles.map(function (userRole) {
        if(!hierarchyLevel){
            hierarchyLevel=userRole.hierarchyLevel;
            hierarchyCode=userRole.hierarchyCode;
        }else if(hierarchyLevel&&hierarchyLevel<userRole.hierarchyLevel){
            hierarchyLevel=userRole.hierarchyLevel;
            hierarchyCode=userRole.hierarchyCode;
        }
    })

    if(hierarchyCode != 'CLUSTER' || hierarchyCode != 'PLATFORM'){
        defaultRoles.map(function (role) {
            let assignedRoleActive = false;
            let defaultRole = MlRoles.findOne({_id:role.roleId});
            defaultRole.assignRoles.map(function (assignedRole) {
                if(assignedRole.isActive)
                    assignedRoleActive = true
            })

            if(role.isActive && defaultRole && defaultRole.isActive && assignedRoleActive){
                roleActive = true;
            }

            let defaultChapter = MlChapters.findOne({"$and":[{_id:role.chapterId}, {isActive:true}]})
            if(defaultChapter || role.chapterId == "all"){
              chapterActive = true
            }

            let defaultSubChapter = MlSubChapters.findOne({"$and":[{_id:role.subChapterId}, {isActive:true}]})
            if(defaultSubChapter || role.subChapterId == "all"){
              subChapterActive = true
            }

            let defaultCommunity = MlCommunityAccess.findOne({"$and":[{communityDefCode:role.communityId}, {isActive:true}]})
            if(defaultCommunity || role.communityId == "all"){
              communityActive = true
            }
        })
    }

    if(!roleActive){
        user.allowed = false
        throw new Meteor.Error(403, "None of the roles are active");
    }

    if(!chapterActive){
        user.allowed = false
        throw new Meteor.Error(403, "None of the Chapters are active");
    }

    if(!subChapterActive){
        user.allowed = false
        throw new Meteor.Error(403, "None of the Sub Chapters are active");
    }

    if(!communityActive){
      user.allowed = false
      throw new Meteor.Error(403, "None of the Communities are active");
    }

    return true;
}

/******************************************* User Login <End> *********************************************************/
/******************************************* Teplates <Start> *******************************************************/
/*let process = MlprocessTypes.findOne({processName:"Registration"})
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
}*/
/*let proc = MlprocessTypes.findOne({processName:"Registration"})
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
}*/


/******************************************* Templates <Start> *******************************************************/
