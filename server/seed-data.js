/**
 * Created by venkatasrinag on 19/12/16.
 */

/*********************************** Default Moolya Admin Creation <Start> ********************************************/

var adminPassword = "Admin@123";
var platformAdminId;
var options = {
    profile:{
        isInternaluser : "yes",
        isExternaluser : "no",
        email: 'platformadmin@moolya.com',
        InternalUprofile:{
            moolyaProfile:{
                email:"platformadmin@moolya.com",
                phoneNumber:"9999999999",
                department:"*",
                subDepartment:"*"
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

// var role = Meteor.
var role = MlRoles.findOne({roleName:"platformadmin"})
if(!role){
    let assignRoles = [{cluster:"all", chapter:"all", subChapter:"all", department:"all", subDepartment:"all", isActive:true}]
    let permissions = [{actionId:"*", isActive:true, }]
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
    userObj.userProfiles = userProfiles
    Meteor.users.upsert({userObj})
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
