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
        check(resource, Object)


        let action = MlActions.findOne({code:actionName})
        if(!action){
            return false;
        }

        let module = MlModules.findOne({code:moduleName})
        if(!module){
          return false;
        }

        var user = Meteor.users.findOne({_id:userId});
        if(user && user.profile && user.profile.isInternaluser == "yes")
        {
            let user_profiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
            let user_roles;
            for(var i = 0; i < user_profiles.length; i++){
                if(user_profiles[i].clusterId == "*" || user_profiles.clusterId == req.clusterId){
                    user_roles = user_profiles[i].userRoles
                    break;
                }
            }

            if(user_roles && user_roles.length > 0)
            {
                // if(req.chapterId != "" && req.subChapterId != "" && req.communityId != ""){
                // }
                // if(req.chapterId != "" && req.subChapterId != ""){
                // }
                // if(req.chapterId != ""){
                // }

                user_roles.map(function (userrole) {
                    let role = MlRoles.findOne({_id:userrole.roleId})
                    if(role){
                        role.modules.map(function (module) {
                            if(module.moduleId == "*" || role.module[j].moduleId == module._id){
                                let actions = role.module.actions;
                                actions.map(function (action) {
                                    if(action.actionId == "*" || action.actionId == action._id){
                                        return true
                                    }
                                })
                            }
                        })
                    }
                })
                // for(var i = 0; i < user_roles.length; i++){
                //     let role = MlRoles.findOne({_id:user_roles[i].roleId})
                //     if(role){
                //           for(var j = 0; j < role.modules.length; j++){
                //               if(role.modules[j].moduleId == "*" || role.module[j].moduleId == module._id){
                //                   let permissions = role.modules[j].actions;
                //                   for(var k = 0; k < permissions.length; k++){
                //                       if(permissions[k].actionId == "*" || permissions[k].actionId == action._id){
                //                           return true;
                //                       }
                //                   }
                //               }
                //           }
                //     }
                // }
            }
        }

        return false;
    }
}


module.exports = MlAuthorization
