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
          default_User_Profile.email = user.profile.email;
          default_User_Profile.mobileNumber = user.profile.mobileNumber;
          default_User_Profile.firstName = user.profile.firstName;
          default_User_Profile.lastName = user.profile.lastName;
        }
        return default_User_Profile;
    }

    getDefaultMenu(userId){
        check(userId,String);
        var  menu = ''
        let userProfile = this.userProfileDetails(userId)||{};
        if(userProfile && userProfile.communityDefCode){
          menu =   MlAppMenuConfig.findOne({"$and":[{isProfileMenu: false}, {communityCode: userProfile.communityDefCode}, {isActive:true}]});
        }
        else{
          // commmunity type browser will not have any profile
          menu =   MlAppMenuConfig.findOne({"$and":[{isProfileMenu: false}, {communityCode: 'BRW'}, {isActive:true}]});
        }
        if(menu)
          return menu.menuName;
        return menu;
    }

    getDefaultProfileMenu(userId){
        var  menu = ''
        let userProfile = this.userProfileDetails(userId)||{};
        if(userProfile && userProfile.communityDefCode){
          menu =   MlAppMenuConfig.findOne({"$and":[{isProfileMenu: true}, {communityCode: userProfile.communityDefCode}, {isActive:true}]});
        }
        else{
          // commmunity type browser will not have any profile
          menu =   MlAppMenuConfig.findOne({"$and":[{isProfileMenu: true}, {communityCode: 'BRW'}, {isActive:true}]});
        }
        if(menu)
          return menu.menuName;
        return menu;
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
