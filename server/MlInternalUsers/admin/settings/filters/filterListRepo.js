/*
* Created by Sireesha on 4/5/2017
*
* */


import MlAdminUserContext from '../../../../mlAuthorization/mlAdminUserContext'
import _ from 'underscore'

export default class MlFilterListRepo {
  constructor(userId) {
    this.userId = userId;
  }

  getFilterDropDownSettings(requestParams) {
    check(requestParams.moduleName, String);

    // let userProfile = new MlAdminUserContext().userProfileDetails(this.userId);
    const userProfile = new MlAdminUserContext().userProfileDetails(this.userId) || {};
    const user = Meteor.users.findOne({ _id: this.userId });
    const roleIds = [];
    const hirarichyLevel = []
    const userProfiles = user && user.profile.InternalUprofile.moolyaProfile.userProfiles ? user.profile.InternalUprofile.moolyaProfile.userProfiles : [];
    let listData = [];
    let clusterIds = userProfile && userProfile.defaultProfileHierarchyRefId ? userProfile.defaultProfileHierarchyRefId : [];
    const chapterIds = userProfile && userProfile.defaultChapters ? userProfile.defaultChapters : [];
    const subChapterIds = userProfile && userProfile.defaultSubChapters ? userProfile.defaultSubChapters : [];
    // let communityIds = userProfile && userProfile.defaultCommunities?userProfile.defaultCommunities:[];
    let communityCode = userProfile && userProfile.defaultCommunities ? userProfile.defaultCommunities : [];
    communityCode = _.pluck(communityCode, 'communityCode')
    userProfiles.map((doc, index) => {
      const userRoles = doc && doc.userRoles ? doc.userRoles : [];
      for (let i = 0; i < userRoles.length; i++) {
        roleIds.push(userRoles[i].roleId);
        break
      }
    });
    const settingsObj = null;
    let result = null;
    let roleExist = null;
    if (requestParams.list && requestParams.list.length > 0) {
      let valueArray = []
      _.map(requestParams.list, (val) => {
        if (val.roleId) {
          roleExist = _.contains(val.roleId, roleIds.toString());
        }
        if (roleExist) {
          valueArray = valueArray.concat(val.listValueId);
        }
      });
      listData = valueArray;
    }
    const options = []
    switch (requestParams.moduleName) {
      case 'Gen_Community':

        if (listData.length < 1) { // if isCustom false
          // let allCommuntities = _.contains(communityIds,"all");
          const allCommuntities = _.contains(communityCode, 'all') || null;
          if (allCommuntities) {
            result = MlCommunityDefinition.find({ isActive: true }).fetch();
          } else {
            result = MlCommunityDefinition.find({ code: { $in: communityCode }, isActive: true }).fetch();
          }
        } else { // if isCustom true
          result = MlCommunityDefinition.find({ _id: { $in: listData }, isActive: true }).fetch();
        }

        const communityResponse = _.each(result, (option, id) => {
          options.push({ label: option.displayName, value: option.code })
        })


        break;

      case 'Gen_IdentityType':

        if (listData.length < 1) {
          result = MlIdentityTypes.find({ isActive: true }).fetch();
        } else {
          result = MlIdentityTypes.find({ _id: { $in: listData }, isActive: true }).fetch();
        }

        const identityResponse = _.each(result, (option, id) => {
          options.push({ label: option.identityTypeDisplayName, value: option.identityTypeName })
        })


        break;

      case 'Gen_isActive':


        options.push({ label: 'true', value: true }, { label: 'false', value: false })


        break;
      case 'Gen_Clusters':
        if (requestParams.fieldActive == 'Cluster') {
          if (listData.length < 1) { // if isCustom false
            clusterIds = [clusterIds]

            const allclusterIds = _.contains(clusterIds, 'all') || null;
            if (allclusterIds) {
              result = MlClusters.find({ isActive: true }).fetch();
            } else {
              result = MlClusters.find({ _id: { $in: clusterIds }, isActive: true }).fetch();
            }
          } else { // if isCustom true
            result = MlClusters.find({ _id: { $in: listData }, isActive: true }).fetch();
          }
        }


        const genClusterResponse = _.each(result, (option, id) => {
          options.push({ label: option.displayName, value: option._id })
        })


        break;
      case 'Gen_Chapters':
        if (requestParams.fieldActive == 'Cluster') {
          if (listData.length < 1) { // if isCustom false
            if (userProfile.hierarchyLevel == 4 || userProfile.hierarchyLevel == 3 || userProfile.hierarchyLevel == 0) {
              const arrayOfChapters = _.pluck(requestParams.filteredListId, 'value') || [];
              result = MlChapters.find({ clusterId: { $in: arrayOfChapters }, isActive: true }).fetch();
            } else {
              const allchapterIds = _.contains(chapterIds, 'all') || null;
              if (allchapterIds) {
                result = MlChapters.find({ isActive: true }).fetch();
              } else {
                result = MlChapters.find({ _id: { $in: chapterIds }, isActive: true }).fetch();
              }
            }
          } else { // if isCustom true
            const arrayOfChapters = _.pluck(requestParams.filteredListId, 'value') || [];
            result = MlChapters.find({ clusterId: { $in: arrayOfChapters }, isActive: true }).fetch();
          }
        } else if (requestParams.fieldActive == 'Chapter') { // display as per usercontext
          if (listData.length < 1) { // if isCustom false
            if (userProfile.hierarchyLevel == 4 || userProfile.hierarchyLevel == 3 || userProfile.hierarchyLevel == 0) {
              result = MlChapters.find({ clusterId: { $in: [clusterIds] }, isActive: true }).fetch();
            } else {
              const allchapterIds = _.contains(chapterIds, 'all') || null;
              if (allchapterIds) {
                result = MlChapters.find({ isActive: true }).fetch();
              } else {
                result = MlChapters.find({ _id: { $in: chapterIds }, isActive: true }).fetch();
              }
            }
          } else { // if isCustom true
            const arrayOfChapters = _.pluck(requestParams.filteredListId, 'value') || [];
            result = MlChapters.find({ clusterId: { $in: arrayOfChapters }, isActive: true }).fetch();
          }
        }
        const genChapterResponse = _.each(result, (option, id) => {
          options.push({ label: option.displayName, value: option._id })
        })

        break;

      case 'Gen_SubChapters':

        if (requestParams.fieldActive == 'Cluster' || requestParams.fieldActive == 'Chapter') { // display subchapter as per selected chapter(if chapter or cluster is active)
          if (listData.length < 1) {
            if (userProfile.hierarchyLevel == 4 || userProfile.hierarchyLevel == 3 || userProfile.hierarchyLevel == 2 || userProfile.hierarchyLevel == 0) {
              const arrayOfGenSubChapter = _.pluck(requestParams.filteredListId, 'value') || [];
              if (requestParams.fieldActive == 'Cluster') {
                result = MlSubChapters.find({ clusterId: { $in: arrayOfGenSubChapter }, chapterId: { $in: arrayOfGenSubChapter }, isActive: true }).fetch();
              } else if (requestParams.fieldActive == 'Chapter') {
                result = MlSubChapters.find({ chapterId: { $in: arrayOfGenSubChapter }, isActive: true }).fetch();
              } else {
                result = MlSubChapters.find({ clusterId: { $in: arrayOfGenSubChapter }, chapterId: { $in: arrayOfGenSubChapter }, isActive: true }).fetch();
              }
            } else {
              const allsubChapterIds = _.contains(subChapterIds, 'all') || null;
              if (allsubChapterIds) {
                result = MlSubChapters.find({ isActive: true }).fetch();
              } else {
                result = MlSubChapters.find({ _id: { $in: subChapterIds }, isActive: true }).fetch();
              }
            }
          } else {
            const arrayOfGenSubChapter = _.pluck(requestParams.filteredListId, 'value') || [];
            result = MlSubChapters.find({ clusterId: { $in: arrayOfGenSubChapter }, chapterId: { $in: arrayOfGenSubChapter }, isActive: true }).fetch();
          }
        } else if (requestParams.fieldActive == 'SubChapter') {
          if (listData.length < 1) { // display as per usercontext
            const allsubChapterIds = _.contains(subChapterIds, 'all') || null;
            if (allsubChapterIds) {
              result = MlSubChapters.find({ isActive: true }).fetch();
            } else {
              result = MlSubChapters.find({ _id: { $in: subChapterIds }, isActive: true }).fetch();
            }
          } else {
            const arrayOfGenSubChapter = _.pluck(requestParams.filteredListId, 'value') || [];
            result = MlSubChapters.find({ clusterId: { $in: arrayOfGenSubChapter }, chapterId: { $in: arrayOfGenSubChapter }, isActive: true }).fetch();
          }
        }


        const genSubChapterResponse = _.each(result, (option, id) => {
          options.push({ label: option.subChapterName, value: option._id })
        })

        break;

      case 'Gen_Users':

        result = Meteor.users.find().fetch();

        const genUsersResponse = _.each(result, (option, id) => {
          if (option.profile.isInternaluser) {
            options.push({ label: option.profile.InternalUprofile.moolyaProfile.displayName, value: option.profile.InternalUprofile.moolyaProfile.displayName })
          }
        })
        options.push({ label: 'Un Assigned', value: 'Un Assigned' })

        break;

      case 'Gen_TransactionType':

        result = MlTransactionTypes.find({ isActive: true }).fetch()

        const genTransactionResponse = _.each(result, (option, id) => {
          options.push({ label: option.transactionDisplayName, value: option._id })
        })

        break;

      case 'Gen_UserType':

        result = MlUserTypes.find({ isActive: true }).fetch()

        const genUserTypeResponse = _.each(result, (option, id) => {
          options.push({ label: option.displayName, value: option._id })
        })

        break;

      case 'Gen_Industries':

        result = MlIndustries.find({ isActive: true }).fetch()

        const genIndustriesResponse = _.each(result, (option, id) => {
          options.push({ label: option.industryDisplayName, value: option._id })
        })

        break;

      case 'Gen_IdentityTypes':

        result = MlIdentityTypes.find({ isActive: true }).fetch()

        const genIdentityTypeResponse = _.each(result, (option, id) => {
          options.push({ label: option.identityTypeDisplayName, value: option._id })
        })

        break;
      case 'Gen_Modules':

        result = MlModules.find({ isActive: true }).fetch()

        const genModulesResponse = _.each(result, (option, id) => {
          options.push({ label: option.code, value: option.code })
        })

        break;
      case 'Gen_Status':
        const moduleType = requestParams && requestParams.moduleType ? requestParams.moduleType : ''
        result = MlStatus.find({ module: { $in: [moduleType] }, isActive: true }).fetch()
        const genStatusResponse = _.each(result, (option, id) => {
          options.push({ label: option.code, value: option.code })
        })

        break;
    }


    return options;
  }
}
