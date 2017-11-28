/**
 * Created by mohammed.mohasin on 2/02/17.
 */

import _underscore from 'underscore';
import MlSubChapterAccessControl from './mlSubChapterAccessControl'
const _ = require('lodash');

class MlAdminUserContext {
  constructor(userId) {
    this.userId = userId;
  }

  _userDefaultProfileDetails(userId) {
    check(userId, String)
    let hierarchyLevel = null;
    let hierarchyCode = null;
    let defaultCluster = null;
    let isMoolya = null
    const defaultChapters = [];
    const defaultSubChapters = [];
    const defaultCommunities = [];
    let defaultCommunityHierarchyLevel;
    let roleName = null;
    let roleId = null;
    let isAnchor = false
    let isInternaluser = false;
    const user = Meteor.users.findOne({ _id: userId });
    if (user && user.profile && user.profile.isInternaluser == true) {
      isInternaluser = true;
      const user_profiles = user.profile.InternalUprofile.moolyaProfile.userProfiles;
      isMoolya = user.profile.isMoolya
      let user_roles;
      // Selecting Default Profile
      const default_User_Profiles = _.find(user_profiles, { isDefault: true });
      // if default Profile is available then,
      if (default_User_Profiles) {
        for (let i = 0; i < user_profiles.length; i++) {
          if (user_profiles[i].isDefault == true) {
            user_roles = user_profiles[i].userRoles;
            defaultCluster = user_profiles[i].clusterId;
            break;
          }
        }
      } else { // else pick the first profile
        user_roles = user_profiles && user_profiles[0] && user_profiles[0].userRoles ? user_profiles[0].userRoles : [];
        defaultCluster = user_profiles && user_profiles[0] ? user_profiles[0].clusterId : null;
      }

      if (user_roles && user_roles.length > 0) {
        user_roles.map((userRole) => {
          if (userRole.isActive) {
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
            if (defaultChapters.indexOf(userRole.chapterId < 0)) { defaultChapters.push(userRole.chapterId) }
            if (defaultSubChapters.indexOf(userRole.subChapterId < 0)) { defaultSubChapters.push(userRole.subChapterId) }
            if (defaultCommunities.indexOf(userRole.communityId < 0)) { defaultCommunities.push({ communityId: userRole.communityId, communityCode: userRole.communityCode }) }
            // defaultCommunities.push(userRole.communityId)
            roleName = userRole.roleName
            roleId = userRole.roleId
            isAnchor = userRole.isAnchor
          }
        })
      }
    }
    return {
      hierarchyLevel,
      hierarchyCode,
      defaultProfileHierarchyCode: 'CLUSTER',
      defaultProfileHierarchyRefId: defaultCluster,
      defaultCluster,
      defaultChapters,
      defaultSubChapters,
      defaultCommunities,
      defaultCommunityHierarchyLevel,
      isMoolya,
      isInternaluser,
      roleName,
      roleId,
      isAnchor
    };
  }

  /**
   * conditions added for non-moolya access control
   * @params [on condition on 'userProfile.isMoolya': false]
   * */
  userProfileDetails(userId) {
    const userDetails = this._userDefaultProfileDetails(userId);
    if (userDetails && !userDetails.isMoolya) {
      userDetails.orgSubChapters = userDetails.defaultSubChapters
      userDetails.orgChapters = userDetails.defaultChapters
      var dataContext = MlSubChapterAccessControl.getAccessControl('SEARCH', { userId })
      if (dataContext && dataContext.hasAccess && dataContext.subChapters && dataContext.subChapters.length > 0) {
        userDetails.defaultSubChapters = dataContext.subChapters;
        userDetails.defaultChapters = dataContext.chapters;
      }
      // Sub Chapter can access transactions based on 'TRANSACT' perms (Jira-2956)
      var dataContext = MlSubChapterAccessControl.getAccessControl('TRANSACT', { userId });
      if (dataContext && dataContext.hasAccess && dataContext.subChapters && dataContext.subChapters.length > 0) {
        userDetails.transactionSubChapters = dataContext.subChapters;
        userDetails.transactionChapters = dataContext.chapters;
      }
    }
    return userDetails;
  }

  getDefaultMenu(userId) {
    check(userId, String);
    const userProfile = this.userProfileDetails(userId) || {};
    let hierarchy = null;
    if (userProfile && (userProfile.hierarchyLevel || userProfile.hierarchyLevel == 0)) {
      hierarchy = MlHierarchy.findOne({ level: Number(userProfile.hierarchyLevel) });
      if (hierarchy && hierarchy.menuName) {
        const menuSelect = _.find(hierarchy.menuName, { isMoolya: userProfile.isMoolya })
        return menuSelect && menuSelect.menuName ? menuSelect.menuName : null;
      }
      // return hierarchy && hierarchy.menuName ? hierarchy.menuName : null;
    }
    return null; // return default menu
  }

  getDefaultCountry(userId) {
    check(userId, String);
    const userProfile = this.userProfileDetails(userId) || {};
    if (userProfile && userProfile.defaultProfileHierarchyCode && userProfile.defaultProfileHierarchyCode === 'CLUSTER') {
      const defaultProfileHierarchyRefId = userProfile.defaultProfileHierarchyRefId;
      const clusterDetails = MlClusters.findOne(defaultProfileHierarchyRefId);
      if (clusterDetails && clusterDetails.countryId) {
        const countryDetails = MlCountries.findOne(clusterDetails.countryId);
        return { countryId: countryDetails._id, countryCode: countryDetails.countryCode, countryName: countryDetails.country };
      }
    }
    return {};
  }

  getUserLatLng(profile) {
    let latitude = null;
    let longitude = null;
    if (profile && profile.addressInfo && profile.addressInfo.length > 0) { /* profile of the user should be there */
      let address = _.find(profile.addressInfo, { isDefaultAddress: true });
      if (!address) {
        address = profile.addressInfo[0]
      }
      latitude = address.latitude;
      longitude = address.longitude;
    }
    return { lat: latitude || 0, lng: longitude || 0 }
  }
  getCommunityBasedExternalUser(userProfiles, user, userType, locationName) {
    const users = [];
    _.each(userProfiles, (profile) => {
      const portfolio = MlPortfolioDetails.findOne({ profileId: profile.profileId, status: 'PORT_LIVE_NOW' });
      if (portfolio) {
        const userObj = {};
        if (profile.communityId && profile.communityId != '') {
          if (profile.communityDefName == userType) {
            userObj.profile = user.profile;
            userObj.portfolioId = portfolio._id;
            userObj.name = `${user.profile.firstName ? user.profile.firstName : ''} ${user.profile.lastName ? user.profile.lastName : ''}`;
            userObj.communityCode = profile.communityDefCode;
            if (locationName) {
              userObj.clusterName = profile[locationName];
            }
            const externalProfile = _.find(user.profile.externalUserAdditionalInfo, { profileId: profile.profileId });
            const resp = new MlAdminUserContext().getUserLatLng(externalProfile);
            userObj.latitude = resp.lat;
            userObj.longitude = resp.lng;

            users.push(userObj);
          }
        }
      }
    })
    return users;
  }
  getUserRolesName(userProfile, filteredRoles) {
    const roles = [];
    let hierarchyLevel = [];
    var userProfile = userProfile;
    const userRoles = filteredRoles;
    // if(findDefaultProfile) {
    //   userProfile = _.find(userProfiles, {isDefault:true});
    //   userRoles = userProfile && userProfile.userRoles ? userProfile.userRoles : [];
    // }
    if (userRoles && userRoles.length > 0) {
      hierarchyLevel = _underscore.pluck(userRoles, 'hierarchyLevel') || [];
      hierarchyLevel.sort((a, b) => b - a);
      _.each(userProfile.userRoles, (role) => {
        if (role.hierarchyLevel == hierarchyLevel[0]) {
          roles.push(role.roleName);
        }
      })
    }
    return roles;
  }
  getAllExternalUser(userProfiles, user, locationName) {
    const users = [];
    _.each(userProfiles, (profile) => {
      const portfolio = MlPortfolioDetails.findOne({ profileId: profile.profileId, status: 'PORT_LIVE_NOW' });
      if (portfolio) {
        const userObj = {};
        userObj.portfolioId = portfolio._id;
        userObj.profile = user.profile;
        userObj.name = `${user.profile.firstName ? user.profile.firstName : ''} ${user.profile.lastName ? user.profile.lastName : ''}`;
        userObj.communityCode = profile.communityDefCode ? profile.communityDefCode : ' ';
        if (locationName) {
          userObj.clusterName = profile[locationName];
        }
        if (user.profile.externalUserAdditionalInfo && user.profile.externalUserAdditionalInfo.length > 0) {
          const externalProfile = _.find(user.profile.externalUserAdditionalInfo, { profileId: profile.profileId });
          const resp = new MlAdminUserContext().getUserLatLng(externalProfile);
          userObj.latitude = resp.lat;
          userObj.longitude = resp.lng;
          users.push(userObj);
        }
      }
    })
    return users;
  }

  getRelatedSubChaptersForNonMoolya(userId) {
    const userProfile = new MlAdminUserContext()._userDefaultProfileDetails(userId);

    // Default Profile. Expecting user default profile changes on profile change.
    const userSubChapterId = userProfile.defaultSubChapters[0];
    if (userSubChapterId == 'all') {
      return {}
    }
    const userSubChapter = mlDBController.findOne('MlSubChapters', { _id: userSubChapterId });
    const clusterId = userSubChapter.clusterId
    const isDefaultSubChapter = userSubChapter.isDefaultSubChapter;
    let relatedSubChapterIds = [];
    var relatedChapterIds = [];
    if (!isDefaultSubChapter) {
      const relatedSubChapters = mlDBController.find('MlRelatedSubChapters', { subChapters: { $elemMatch: { subChapterId: userSubChapterId } } }).fetch()
      if (relatedSubChapters && relatedSubChapters.length > 0) {
        _.each(relatedSubChapters, (obj) => {
          const ids = _.map(obj.subChapters, 'subChapterId');
          relatedSubChapterIds = _.concat(relatedSubChapterIds, ids)
        })
        relatedSubChapterIds = _.uniq(relatedSubChapterIds);

        const relatedSC = mlDBController.find('MlSubChapters', { _id: { $in: relatedSubChapterIds }, clusterId, isActive: true }).fetch()
        relatedSubChapterIds = _.map(relatedSC, '_id');
        var relatedChapterIds = _.map(relatedSC, 'chapterId');
        const relatedC = mlDBController.find('MlChapters', { _id: { $in: relatedChapterIds }, isActive: true }).fetch()
        relatedChapterIds = _.map(relatedC, '_id');
      }
    } else {
      relatedSubChapterIds = [userSubChapterId];
      relatedChapterIds = [userSubChapter.chapterId];
    }
    return {
      userSubChapter,
      isDefaultSubChapter,
      relatedSubChapterIds,
      relatedChapterIds,
      clusterId
    }
  }
}

module.exports = MlAdminUserContext
