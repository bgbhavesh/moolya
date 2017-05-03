/**
 * Created by venkatasrinag on 9/1/17.
 */
import MoolyaloginContainer from '../containers/loginContainer'
export let loginActionHandler = {
    onLoginFormSubmit(details,callback){
        let logincontainer=MoolyaloginContainer.loginContainer
        logincontainer.login("platformadmin@moolya.com","MoolyaAdmin@123", function (result) {
            if(result && result.error){
                console.log(result.reason)
                callback(result.reason)
            }
            else if(result && result.profile && result.profile.isInternaluser == true){
                FlowRouter.redirect("/admin");
            }

            else if(result && result.profile && result.profile.isExternaluser == true){
                FlowRouter.redirect("/app");
            }
           /* else if(result && result.profile && result.profile.isInternaluser == true&&result.profile.InternalUprofile.moolyaProfile.isActive==true&&result.profile.InternalUprofile.moolyaProfile.assignedDepartment!=undefined&&result.profile.InternalUprofile.moolyaProfile.assignedDepartment[0].department!=null&&result.profile.InternalUprofile.moolyaProfile.userProfiles[0]!=undefined&&result.profile.InternalUprofile.moolyaProfile.userProfiles[0].userRoles!=undefined&&result.profile.InternalUprofile.moolyaProfile.userProfiles[0].userRoles[0].roleId!=null) {
              FlowRouter.redirect("/admin");
            }
            else{
              callback('login failed')
            }*/
        });
    },
    onLogout(callback){
      let logoutcontainer=MoolyaloginContainer.loginContainer;
      logoutcontainer.logout(callback);
    }
}
