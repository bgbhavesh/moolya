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
            // var menu = MlAppMenuConfig.findOne({communityDefCode: userProfile.communityCode})
          var menu = MlAppMenuConfig.findOne({communityCode: userProfile.communityDefCode})
            if(menu)
                return menu.menuName;
            else
              return 'mlBrowserMenu'   /*quick fix*/
        }

        return '';
        // return 'mlDefaultMenu';
    }

    getDefaultProfileMenu(userId){
        check(userId,String);
        let userProfile = this.userProfileDetails(userId)||{};
        if(userProfile){
          let userDetails = {profile: userProfile, menuName: 'mlDefaultProfileMenu'}
          return userDetails;
        }
        // return 'mlDefaultProfileMenu';
    }

    getExploreMenu(userId){
        check(userId,String);
        let userProfile = this.userProfileDetails(userId)||{};
        if(userProfile){
        }
        return 'mlExploreMenu';
    }

    getCalendarMenu(userId) {
      check(userId, String);
      let userProfile = this.userProfileDetails(userId) || {};
      if (userProfile) {
      }
      return 'mlCalendarMenu';
    }
}


module.exports = MlUserContext
