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


        // let action = MlActions.findOne({code:actionName})
      let action = mlDBController.findOne('MlActions', {code:actionName})
      if(!action){
            return false;
        }

        // let module = MlModules.findOne({code:moduleName})
      let module = mlDBController.findOne('MlModules', {code:moduleName})
        if(!module){
          return false;
        }

        // var user = Meteor.users.findOne({_id:userId})
      var user = mlDBController.findOne('users', {_id: userId}, context)
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
                user_roles.map(function (role) {
                  ret = self.validateRole(role.roleId, module, action)
                  if(ret)
                    return ret;
                })
            }
        }
        else if(user && user.profile && user.profile.isExternaluser == true){
          return true
      }
        return ret;
    }

    validateRole(roleId, accessModule, accessAction){
        let ret = false;
        // let role = MlRoles.findOne({_id:roleId})
      let role = mlDBController.findOne('MlRoles', {_id: roleId})
      if(role)
        {
          role.modules.map(function (module) {
            if(module.moduleId == "all" || module.moduleId == accessModule._id){
              let actions = module.actions;
              actions.map(function (action) {
                if(action.actionId == "all" || action.actionId == accessAction._id){
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
