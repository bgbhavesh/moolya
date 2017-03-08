/**
 * Created by venkatasrinag on 30/1/17.
 */

var _ = require('lodash');

class MlAuthorization
{
    constructor(){

    }

    validteAuthorization(userId, moduleName, actionName, req)
    {
        check(userId, String)
        check(moduleName, String)
        check(actionName, String)
        check(req, Object)

        let ret = false;

        let self = this;
        let isAuthorized=false;


        let action = MlActions.findOne({code:actionName})
        if(!action){
            return false;
        }

        let module = MlModules.findOne({code:moduleName})
        if(!module){
          return false;
        }

        var user = Meteor.users.findOne({_id:userId});
        if(user && user.profile && user.profile.isInternaluser == true)
        {
            let user_profiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
            let user_roles;

            // Selecting Default Profile
            for(var i = 0; i < user_profiles.length; i++){
                if(user_profiles[i].isDefault == true){
                    user_roles = user_profiles[i].userRoles
                    break;
                }
            }

            if(user_roles && user_roles.length > 0)
            {
                let role;
                if(moduleName == "COMMUNITY" && req.chapterId != "" && req.subChapterId != "" && req.communityId != ""){
                    let userRole = _.find(user_roles, {chapterId:"all" || req.chapterId, subChapterId:"all" || req.subChapterId, communityId:"all" || req.communityId})
                    return self.validateRole(userRole.roleId, module, action)
                  // isAuthorized= self.validateRole(userRole.roleId, module, action)
                }

                else if(moduleName == "SUBCHAPTER" && req.chapterId != "" && req.subChapterId != ""){
                    let userRole = _.find(user_roles, {chapterId:"all" || req.chapterId, subChapterId:"all" || req.subChapterId})
                    return self.validateRole(userRole.roleId, module, action)
                  // isAuthorized= self.validateRole(userRole.roleId, module, action)
                }

                else if(moduleName == "CHAPTER" && req.chapterId != ""){
                    let userRole = _.find(user_roles, {chapterId:req.chapterId || "all"})
                    return self.validateRole(userRole.roleId, module, action)
                  // isAuthorized= self.validateRole(userRole.roleId, module, action)
                }

                else {
                    user_roles.map(function (userRole) {
                      // isAuthorized = self.validateRole(userRole.roleId, module, action)
                      //   if(isAuthorized)
                      ret = self.validateRole(userRole.roleId, module, action)
                      if(ret)
                            return;
                    })
                }
            }
            // if(isAuthorized){
            //      try{
            //       isAuthorized= this.hasAccessBasedOnContext({userId:userId},moduleName,actionName,req)
            //      }catch(e){
            //        isAuthorized=false;
            //      }
            // }
        }
        return ret;
        // return isAuthorized;
    }

    validateRole(roleId, module, action){
        let ret = false;
        let role = MlRoles.findOne({_id:roleId})
        if(role)
        {
          role.modules.map(function (module) {
            if(module.moduleId == "all" || module.moduleId == module._id){
              let actions = module.actions;
              actions.map(function (action) {
                if(action.actionId == "all" || action.actionId == action._id){
                  ret = true;
                  return;
                }
              })
            }
          })
        }

        return ret;
    }

  // hasAccessBasedOnContext(context,moduleName,actionName,req){
  //   let hasAccessBasedOnContext=true;
  //   switch(moduleName){
  //     case "MASTER_SETTINGS":
  //       hasAccessBasedOnContext=new MlAdminMasterSettingsAuthorization(context).authorize(actionName,context,req);
  //   }
  //   return hasAccessBasedOnContext;
  // }

}

module.exports = MlAuthorization
