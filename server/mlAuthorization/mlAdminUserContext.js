/**
 * Created by mohammed.mohasin on 2/02/17.
 */

import _underscore from "underscore";
var _ = require('lodash');

class MlAdminUserContext
{
  constructor(userId){
    this.userId=userId;
  }

  userProfileDetails(userId)
  {
   check(userId, String)
    let hierarchyLevel =null;
    let hierarchyCode=null;
    let defaultCluster=null;
    var isMoolya = null
    let defaultChapters = [];
    let defaultSubChapters = [];
    let defaultCommunities = [];
    let defaultCommunityHierarchyLevel;
    let roleName = null;
    let roleId = null
    var user = Meteor.users.findOne({_id:userId});
    if(user && user.profile && user.profile.isInternaluser == true)
    {
      let user_profiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
      isMoolya = user.profile.isMoolya
      let user_roles;
      // Selecting Default Profile
      let default_User_Profiles=_.find(user_profiles, {'isDefault': true });
      //if default Profile is available then,
      if(default_User_Profiles){
         for(var i = 0; i < user_profiles.length; i++){
             if(user_profiles[i].isDefault == true){
                  user_roles = user_profiles[i].userRoles;
                  defaultCluster=user_profiles[i].clusterId;
                  break;
             }
          }
      }else{ //else pick the first profile
        user_roles=user_profiles&&user_profiles[0]&&user_profiles[0].userRoles?user_profiles[0].userRoles:[];
        defaultCluster=user_profiles&&user_profiles[0]?user_profiles[0]["clusterId"]:null;
      }

      if(user_roles && user_roles.length > 0)
      {
          user_roles.map(function (userRole)
          {
              if(userRole.isActive) {
                if (!hierarchyLevel) {
                  hierarchyLevel = userRole.hierarchyLevel;
                  hierarchyCode = userRole.hierarchyCode;
                } else if (hierarchyLevel && hierarchyLevel < userRole.hierarchyLevel) {
                  hierarchyLevel = userRole.hierarchyLevel;
                  hierarchyCode = userRole.hierarchyCode;
                }
                if (userRole.communityHierarchyLevel) {
                  defaultCommunityHierarchyLevel = userRole.communityHierarchyLevel
                }
                if (defaultChapters.indexOf(userRole.chapterId < 0))
                  defaultChapters.push(userRole.chapterId)
                if (defaultSubChapters.indexOf(userRole.subChapterId < 0))
                  defaultSubChapters.push(userRole.subChapterId)
                if (defaultCommunities.indexOf(userRole.communityId < 0))
                  defaultCommunities.push({communityId: userRole.communityId, communityCode: userRole.communityCode})
                // defaultCommunities.push(userRole.communityId)
                roleName = userRole.roleName
                roleId = userRole.roleId
              }
          })

      }
    }
        return {hierarchyLevel:hierarchyLevel,hierarchyCode:hierarchyCode,
                defaultProfileHierarchyCode:"CLUSTER",
                defaultProfileHierarchyRefId:defaultCluster,
                defaultCluster: defaultCluster,
                defaultChapters:defaultChapters,
                defaultSubChapters:defaultSubChapters,
                defaultCommunities:defaultCommunities,
                defaultCommunityHierarchyLevel:defaultCommunityHierarchyLevel,
                isMoolya:isMoolya,
                roleName:roleName,
                roleId: roleId
        };
  }

  getDefaultMenu(userId) {
    check(userId, String);
    let userProfile = this.userProfileDetails(userId) || {};
    let hierarchy = null;
    if (userProfile && (userProfile.hierarchyLevel || userProfile.hierarchyLevel == 0)) {
      hierarchy = MlHierarchy.findOne({level: Number(userProfile.hierarchyLevel)});
      if(hierarchy && hierarchy.menuName){
        var menuSelect = _.find(hierarchy.menuName, {isMoolya:userProfile.isMoolya})
        return menuSelect && menuSelect.menuName ? menuSelect.menuName : null;
      }
      // return hierarchy && hierarchy.menuName ? hierarchy.menuName : null;
    }
    return null;  //return default menu
  }

  getDefaultCountry(userId){
    check(userId,String);
    let userProfile=this.userProfileDetails(userId)||{};
    if(userProfile&&userProfile.defaultProfileHierarchyCode&&userProfile.defaultProfileHierarchyCode==="CLUSTER"){
      let defaultProfileHierarchyRefId=userProfile.defaultProfileHierarchyRefId;
      let clusterDetails=MlClusters.findOne(defaultProfileHierarchyRefId);
      if(clusterDetails&&clusterDetails.countryId){
         let countryDetails=MlCountries.findOne(clusterDetails.countryId);
        return {countryId:countryDetails._id,countryCode:countryDetails.countryCode,countryName:countryDetails.country};
      }

    }
    return {};
  }

  nonMoolyaBackedUserAccess(checkUser, userId) {
    check(checkUser, String)
    check(userId, String)
    var curUserProfile = new MlAdminUserContext().userProfileDetails(userId);
    if (!curUserProfile.isMoolya) { //data access by non-moolya users
      if (curUserProfile.defaultSubChapters.indexOf("all") < 0) {
        let subChapterId = curUserProfile.defaultSubChapters ? curUserProfile.defaultSubChapters[0] : ''
        var subChapterInternal = mlDBController.findOne('users', {
          _id: checkUser,
          'profile.isExternaluser': false,
          'profile.InternalUprofile.moolyaProfile.subChapter': subChapterId
        }, context)

        if(subChapterInternal)
          return true

        let isExcess = this.userAccessForOtherUsers(curUserProfile, checkUser, subChapterId)
        if(isExcess)
          return true
        else
          return false
      }
    } else {
      return true
    }
  }

  userAccessForOtherUsers(curUserProfile, checkUser, subChapterId) {
    let subChapterDetails = MlSubChapters.findOne({
      _id: subChapterId
    })
    if (!_.isEmpty(subChapterDetails.internalSubChapterAccess)) {
      let canSearch = subChapterDetails.internalSubChapterAccess.backendUser ? subChapterDetails.internalSubChapterAccess.backendUser.canSearch : false
      let canView = subChapterDetails.internalSubChapterAccess.backendUser ? subChapterDetails.internalSubChapterAccess.backendUser.canView : false
      var associated = subChapterDetails.associatedSubChapters ? subChapterDetails.associatedSubChapters : []
      if (canSearch && canView) {
        curUserProfile.defaultSubChapters = _.concat(curUserProfile.defaultSubChapters, associated)
        let availableUser = Meteor.users.findOne({
          _id: checkUser,
          'profile.isExternaluser': false,
          'profile.InternalUprofile.moolyaProfile.subChapter': {$in: curUserProfile.defaultSubChapters}
        })
        if (!_.isEmpty(availableUser)) {
          return true
        }
      }
    }else
      return false
  }

  getUserLatLng(profile){
    var latitude = null;
    var longitude = null;
    if(profile.addressInfo && profile.addressInfo.length>0){
      var address = _.find(profile.addressInfo, {isDefaultAddress:true});
      if(!address){
        address = profile.addressInfo[0]
      }
      latitude = address.latitude;
      longitude = address.longitude;
    }
    return {lat: latitude, lng: longitude}
  }
  getCommunityBasedExternalUser(userProfiles, user, userType){
    var users = [];
    _.each(userProfiles, function (profile) {
      if (profile && profile.isActive && profile.isApprove) {
        if (profile.communityId && profile.communityId != "") {
          let community = mlDBController.findOne('MlCommunity', {"$and": [{"_id": profile.communityId}]}, context);
          if (community && community.communityName == userType) {

            user.name = (user.profile.firstName?user.profile.firstName:"")+" "+(user.profile.lastName?user.profile.lastName:"");
            user.communityCode = profile.communityDefCode;
            // user.clusterName = "";

            let externalProfile = _.find(user.profile.externalUserAdditionalInfo, {profileId:profile.profileId});
            let resp = new MlAdminUserContext().getUserLatLng(externalProfile);
            user.latitude = resp.lat;
            user.longitude = resp.lng;

            users.push(user);
          }
        }
      }
    })
    return users;
  }
  getUserRolesName(userProfiles){
    var roles = [];
    var hierarchyLevel=[];
    var defaultProfile = _.find(userProfiles, {isDefault:true});
    if(defaultProfile){
      var userRoles = defaultProfile && defaultProfile.userRoles ? defaultProfile.userRoles : [];
      if(userRoles && userRoles.length>0){
        hierarchyLevel = _underscore.pluck(userRoles, 'hierarchyLevel') || [];
        hierarchyLevel.sort(function (a, b) {
          return b - a
        });
        _.each(defaultProfile.userRoles, function (role){
          if (role.hierarchyLevel == hierarchyLevel[0]) {
            roles.push(role.roleName);
          }
        })
      }
    }
    return roles;
  }
  getAllExternalUser(userProfiles, user, cluster){
    var users = [];
    _.each(userProfiles, function (profile) {
      if(profile && profile.isActive && profile.isApprove){
        user.name = (user.profile.firstName ? user.profile.firstName : "") + " " + (user.profile.lastName ? user.profile.lastName : "");
        user.communityCode = profile.communityDefCode ? profile.communityDefCode : " ";
        if(cluster){
          user.clusterName = cluster.clusterName;
        }
        if (user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length > 0) {
          let externalProfile = _.find(user.profile.externalUserAdditionalInfo, {profileId:profile.profileId});
          var resp = new MlAdminUserContext().getUserLatLng(externalProfile);
          user.latitude = resp.lat;
          user.longitude = resp.lng;
          users.push(user);
        }
      }
    })
    return users;
  }
}

module.exports = MlAdminUserContext
