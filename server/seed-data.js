/**
 * Created by venkatasrinag on 19/12/16.
 */


let _ = require('lodash'),
  adminPassword = "Admin@123",
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
    isActive:true
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
      isActive:true
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
    isActive:true
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
    isActive:true
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
    isActive:true
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
        isActive:true
      }
    }
  },
  username: 'platformadmin@moolya.com',
  password: adminPassword,
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


/******************************************* User Login <Start> *******************************************************/

Accounts.validateLoginAttempt(function (user) {

    let isValid=false;
    if( user && user.user )
    {
        isValid=true;
    }


    return user;
})

/******************************************* User Login <End> *********************************************************/
