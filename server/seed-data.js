/**
 * Created by venkatasrinag on 19/12/16.
 */

/*********************************** Default Moolya Admin Creation <Start> ********************************************/

var adminPassword = "Admin@123";

var options = {
  profile:{
    email: 'admin@moolya.com',
    isAdmin:true,
    isApproved:true,
    isMoolyaBackend:true
  },
  username: 'admin@moolya.com',
  password: adminPassword
};

var userObj = Meteor.users.findOne({username: "admin@moolya.com"});
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
