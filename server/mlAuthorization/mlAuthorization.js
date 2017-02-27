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

        let self = this


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
                    user_roles = user_profiles[i].userroles
                    break;
                }
            }

            if(user_roles && user_roles.length > 0)
            {
                let role;
                if(moduleName == "COMMUNITY" && req.chapterId != "" && req.subChapterId != "" && req.communityId != ""){
                    let userRole = _.find(user_roles, {chapterId:req.chapterId || "all", subChapterId:req.subChapterId || "all", communityId:req.communityId || "all"})
                    return validateRole(userRole.roleId, module, action)
                }

                else if(moduleName == "SUBCHAPTER" && req.chapterId != "" && req.subChapterId != ""){
                    let userRole = _.find(user_roles, {chapterId:req.chapterId || "all", subChapterId:req.subChapterId || "all"})
                    return validateRole(userRole.roleId, module, action)
                }

                else if(moduleName == "CHAPTER" && req.chapterId != ""){
                    let userRole = _.find(user_roles, {chapterId:req.chapterId || "all"})
                    return validateRole(userRole.roleId, module, action)
                }

                else {
                    user_roles.map(function (userRole) {
                        ret = self.validateRole(userRole.roleId, module, action)
                        if(ret)
                            return;
                    })
                }
            }
        }

        return ret;
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


}


module.exports = MlAuthorization
