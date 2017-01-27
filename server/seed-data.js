/**
 * Created by venkatasrinag on 17/1/17.
 */
/**
 * Created by venkatasrinag on 19/12/16.
 */

/*********************************** Default Moolya Admin Creation <Start> ********************************************/

var adminPassword = "Admin@123";
var module = ["*"]
var options = {
    profile:{
        isInternaluser : "yes",
        isExternaluser : "no",
        email: 'systemadmin@moolya.com',
        InternalUprofile:{
            moolyaProfile:{
                email:"systemadmin@moolya.com",
                phoneNumber:"9999999999",
                hiearchy:10
            },
            accessprofile:[{module}]
        }
    },
    username: 'systemadmin@moolya.com',
    password: adminPassword,
};

var userObj = Meteor.users.findOne({username: "systemadmin@moolya.com"});
if(!userObj){
    console.log("No Admin found, hence inserting a default Moolya Admin: ",options);
    Accounts.createUser(options);
}else{
    Accounts.setPassword(userObj._id, adminPassword);
    console.log("Admin password set from settings file");
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
