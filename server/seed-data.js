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
/*********************************** Default Department/SubDepartment Creation <END> **********************************************/

/*********************************** Default Moolya Roles Creation <Start> **********************************************/

var platformrole = MlRoles.findOne({roleName:"platformadmin"})
if(!platformrole){
  let assignRoles = [{cluster:"all", chapter:"all", subChapter:"all", department:"all", subDepartment:"all", isActive:true}]
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
    let assignRoles = [{cluster:"all", chapter:"all", subChapter:"all", department:"all", subDepartment:"all", isActive:true}]
    let clusterPer = [{actionId:(_.find(actions, {code:"READ"}))._id, isActive:true}]
    let modules = [
                    {moduleId:(_.find(mlModules, {code:"CLUSTER"}))._id, actions:clusterPer},
                    {moduleId:(_.find(mlModules, {code:"CHAPTER"}))._id, actions:permissions},
                    {moduleId:(_.find(mlModules, {code:"SUBCHAPTER"}))._id, actions:permissions},
                    {moduleId:(_.find(mlModules, {code:"COMMUNITY"}))._id, actions:permissions}
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
  let assignRoles = [{cluster:"all", chapter:"all", subChapter:"all", department:"all", subDepartment:"all", isActive:true}]
  let chapterPer = [{actionId:(_.find(actions, {code:"READ"}))._id, isActive:true}]
  let modules = [
    {moduleId:(_.find(mlModules, {code:"CHAPTER"}))._id, actions:chapterPer},
    {moduleId:(_.find(mlModules, {code:"COMMUNITY"}))._id, actions:permissions}
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
  let assignRoles = [{cluster:"all", chapter:"all", subChapter:"all", department:"all", subDepartment:"all", isActive:true}]
  let chapterPer = [{actionId:(_.find(actions, {code:"READ"}))._id, isActive:true}]
  let modules = [
    {moduleId:(_.find(mlModules, {code:"SUBCHAPTER"}))._id, actions:chapterPer},
    {moduleId:(_.find(mlModules, {code:"COMMUNITY"}))._id, actions:permissions}
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
if(!chapterAdmin){
  let assignRoles = [{cluster:"all", chapter:"all", subChapter:"all", department:"all", subDepartment:"all", isActive:true}]
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
let dep = MlDepartments.findOne({"departmentName":"operations"});
let subDep = MlSubDepartments.findOne({"subDepartmentName":"systemadmin"});
var options = {
  profile:{

    isInternaluser : true,
    isExternaluser : false,
    email: 'platformadmin@moolya.com',
    InternalUprofile:{
      moolyaProfile:{
        assignedDepartment:[{department:dep._id, subDepartment:subDep._id}],
        email:"platformadmin@moolya.com",
        phoneNumber:"9999999999",
        userProfiles:[],
        isActive:true,
        firstName:'Platform',
        lastName:'Admin'
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
  var userRoles = [{roleId:role._id, chapterId:"all", subChapterId:"all", communityId:"all", hierarchyLevel:4, hierarchyCode:"PLATFORM"}]
  var userProfiles = [{
    clusterId:"all",
    userRoles:userRoles,
    isDefault:true
  }]
  Meteor.users.update({_id:platformAdminId}, {$set:{"profile.InternalUprofile.moolyaProfile.userProfiles":userProfiles}})
}

/*********************************** Default Moolya Admin Creation <End> **********************************************/


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
    if(user && user.user && user.user.profile && user.user.profile.deActive){
        user.allowed = false
        throw new Meteor.Error(403, "User account is inactive!");
    }


    return true;
})

/******************************************* User Login <End> *********************************************************/
