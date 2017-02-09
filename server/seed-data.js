/**
 * Created by venkatasrinag on 19/12/16.
 */

/*********************************** Default Moolya Admin Creation <Start> ********************************************/
var _ = require('lodash');
var adminPassword = "Admin@123";
var platformAdminId;
let mlModules = MlModules.find().fetch();
let actions = MlActions.find().fetch();
let permissions = [{actionId:"*", isActive:true}]

var options = {
    profile:{
        isInternaluser : "yes",
        isExternaluser : "no",
        email: 'platformadmin@moolya.com',
        InternalUprofile:{
            moolyaProfile:{
                email:"platformadmin@moolya.com",
                phoneNumber:"9999999999",
                userProfiles:[]
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
if(!role){
      let assignRoles = [{cluster:"all", chapter:"all", subChapter:"all", department:"all", subDepartment:"all", isActive:true}]
    let modules = [{moduleId:"*", permissions:permissions}]
    role = {
        roleName:"platformadmin",
        displayName:"Platform Admin",
        assignRoles: assignRoles,
        modules:modules,
        isActive:true
    }
    var roleId = MlRoles.insert(role);
    var userRoles = [{roleId:roleId, chapterId:"*", subchapterId:"*", communityId:"*", hiearchy:10}]
    var userProfiles = [{
        clusterId:"*",
        userRoles:userRoles,
    }]
    Meteor.users.update({_id:platformAdminId}, {$set:{"profile.InternalUprofile.moolyaProfile.userProfiles":userProfiles}})
}

/*********************************** Default Moolya Admin Creation <End> **********************************************/

/*********************************** Default Moolya Roles Creation <Start> **********************************************/

var clusterAdmin = MlRoles.findOne({roleName:"clusteradmin"})
if(!clusterAdmin){
    let assignRoles = [{cluster:"all", chapter:"all", subChapter:"all", department:"all", subDepartment:"all", isActive:true}]
    let clusterPer = [{actionId:(_.find(actions, {code:"READ"}))._id, isActive:true}]
    // let ccc = chapterModule1._id
    let modules = [
                    {moduleId:(_.find(mlModules, {code:"CLUSTER"}))._id, permissions:clusterPer},
                    {moduleId:(_.find(mlModules, {code:"CHAPTER"}))._id, permissions:permissions},
                    {moduleId:(_.find(mlModules, {code:"SUBCHAPTER"}))._id, permissions:permissions},
                    {moduleId:(_.find(mlModules, {code:"COMMUNITY"}))._id, permissions:permissions}
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
    {moduleId:(_.find(mlModules, {code:"CHAPTER"}))._id, permissions:chapterPer},
    {moduleId:(_.find(mlModules, {code:"COMMUNITY"}))._id, permissions:permissions}
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
    {moduleId:(_.find(mlModules, {code:"SUBCHAPTER"}))._id, permissions:chapterPer},
    {moduleId:(_.find(mlModules, {code:"COMMUNITY"}))._id, permissions:permissions}
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
    {moduleId:(_.find(mlModules, {code:"COMMUNITY"}))._id, permissions:permissions}
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
