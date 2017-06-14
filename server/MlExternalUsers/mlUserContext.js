/**
 * Created by venkatsrinag on 27/4/17.
 */
var _ = require('lodash');

class MlUserContext{
    constructor(userId){
        this.userId=userId;
    }

    userProfileDetails(userId){
        let default_User_Profile = {};
        check(userId, String)
        var user = Meteor.users.findOne({_id:userId});
        if(user && user.profile && user.profile.isExternaluser == true){
            let user_profiles = user.profile.externalUserProfiles;
            default_User_Profile = _.find(user_profiles, {'isDefault': true });
            if(!default_User_Profile ){
                default_User_Profile = user_profiles[0];
            }
        }
        return default_User_Profile;
    }

    getDefaultMenu(userId){
        check(userId,String);
        let userProfile = this.userProfileDetails(userId)||{};
        if(userProfile){
            var menu = MlAppMenuConfig.findOne({"$and":[{communityCode: userProfile.communityDefCode, isProfileMenu:false, isExploreMenu:false}]})
            if(menu)
                return menu.menuName;
        }

        return '';
    }

    getDefaultProfileMenu(userId){
        check(userId,String);
        let userProfile = this.userProfileDetails(userId)||{};
        if(userProfile){
        }
        return 'mlDefaultProfileMenu';
    }

    getDefaultProfileMenu(userId){
        check(userId,String);
        let userProfile = this.userProfileDetails(userId)||{};
        if(userProfile){
        }
        return 'mlDefaultProfileMenu';
    }
}


module.exports = MlUserContext
