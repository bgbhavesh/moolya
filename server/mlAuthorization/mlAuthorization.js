/**
 * Created by venkatasrinag on 30/1/17.
 */

var _ = require('lodash');

class MlAuthorizationLayer
{
    constructor(){

    }

    validteAuthorization(userId, moduleName, action, reqId)
    {
        check(userId, String)
        check(moduleName, String)
        check(action, String)

        var user = Meteor.users.get({_id:userId});
        if(user)
        {

            if(moduleName == 'cluster'){
                _.forEach(user.profile.userProfiles.userRoles, function (obj) {

                })
            }

        }

        return false;
    }

    validateAction(){

    }

    validateModule(){

    }
}


module.exports = MlAuthorizationLayer
