/*
* Created by Sireesha on 4/5/2017
*
* */


import MlAdminUserContext from '../../../../mlAuthorization/mlAdminUserContext'
import _ from 'underscore'

export default class MlFilterListRepo{
  constructor(userId){
    this.userId=userId;
  };

  getFilterDropDownSettings(requestParams) {
    check(requestParams.moduleName, String);

    //let userProfile = new MlAdminUserContext().userProfileDetails(this.userId);
    let userProfile=new MlAdminUserContext().userProfileDetails(this.userId)||{};
    let user = Meteor.users.findOne({_id:context.userId});
    let roleIds=[];
    let hirarichyLevel=[]
    let userProfiles=user&&user.profile.InternalUprofile.moolyaProfile.userProfiles?user.profile.InternalUprofile.moolyaProfile.userProfiles:[];
    let listData = [];
    let clusterIds = userProfile && userProfile.defaultProfileHierarchyRefId?userProfile.defaultProfileHierarchyRefId:[];
    let chapterIds = userProfile && userProfile.defaultChapters?userProfile.defaultChapters:[];
    let subChapterIds = userProfile && userProfile.defaultSubChapters?userProfile.defaultSubChapters:[];
    // let communityIds = userProfile && userProfile.defaultCommunities?userProfile.defaultCommunities:[];
    let communityCode = userProfile && userProfile.defaultCommunities?userProfile.defaultCommunities:[];
    communityCode = _.pluck(communityCode, 'communityCode')
    userProfiles.map(function (doc,index) {

      let userRoles = doc && doc.userRoles ? doc.userRoles : [];
      for (let i = 0; i < userRoles.length; i++) {
        roleIds.push(userRoles[i].roleId);
        break

      }

    });
    let settingsObj = null;
    let result = null;
    let roleExist = null;
    if(requestParams.list && requestParams.list.length>0){
      let valueArray = []
       _.map(requestParams.list, function (val) {

          if(val.roleId){
            roleExist = _.contains(val.roleId,roleIds.toString());
          }
          if(roleExist){

            valueArray = valueArray.concat(val.listValueId);
          }


        });
      listData = valueArray;
    }
    let  options=[]
    switch (requestParams.moduleName) {
/*      case "Reg_Clusters":

          clusterIds = [clusterIds]

        if(listData.length < 1){
          let allclusterIds = _.contains(clusterIds,"all");
          if(allclusterIds){
            result = MlClusters.find({isActive : true}).fetch();
          }else{
            result= MlClusters.find({ _id: { $in: clusterIds },isActive : true}).fetch();
          }

        }else{

          result= MlClusters.find({ _id: { $in: listData },isActive : true}).fetch();
        }

        let resultResponse=_.each(result,function (option,id) {
          options.push({"label":option.displayName,"value":option._id})
        })

        break;
      case "Reg_Chapters":
        if(listData.length < 1){
          let allchapterIds = _.contains(chapterIds,"all");
          if(allchapterIds){
            result = MlChapters.find({isActive : true}).fetch();
          }else{
            result= MlChapters.find({ _id: { $in: chapterIds },isActive : true}).fetch();
          }

        }else{
          let arrayOfValues = _.pluck(requestParams.filteredListId, 'value') || [];
          result= MlChapters.find({ clusterId: {$in : arrayOfValues},isActive : true}).fetch();
        }



        let chapterResponse=_.each(result,function (option,id) {
          options.push({"label":option.displayName,"value":option._id})
        })

        break;

      case "Reg_SubChapters":

        if(listData.length < 1){
          if(userProfile.hierarchyLevel == 4 || userProfile.hierarchyLevel == 3 || userProfile.hierarchyLevel == 2){
            let arrayOfGenSubChapter = _.pluck(requestParams.filteredListId, 'value') || [];
            result= MlSubChapters.find({clusterId: {$in : arrayOfGenSubChapter}, chapterId: {$in : arrayOfGenSubChapter},isActive : true}).fetch();
          }else{
            let allsubChapterIds = _.contains(subChapterIds, "all");
            if (allsubChapterIds) {
              result = MlSubChapters.find({isActive: true}).fetch();
            } else {
              result = MlSubChapters.find({_id: {$in: subChapterIds}, isActive: true}).fetch();
            }
          }

        }else{
          let arrayOfSubChapter = _.pluck(requestParams.filteredListId, 'value') || [];
          result= MlSubChapters.find({clusterId: {$in : arrayOfSubChapter}, chapterId: {$in : arrayOfSubChapter},isActive : true}).fetch();

        }



        let subchapterResponse=_.each(result,function (option,id) {
          options.push({"label":option.subChapterDisplayName,"value":option._id})
        })

        break;*/

      case "Gen_Community":

        if(listData.length < 1){
          // let allCommuntities = _.contains(communityIds,"all");
          let allCommuntities = _.contains(communityCode,"all");
          if(allCommuntities){
            result = MlCommunityDefinition.find({isActive : true}).fetch();
          }else{
            result= MlCommunityDefinition.find({ _id: { $in: allCommuntities },isActive : true}).fetch();
          }

        }else{

          result= MlCommunityDefinition.find({ _id: { $in: listData },isActive : true}).fetch();
        }

        let communityResponse=_.each(result,function (option,id) {
          options.push({"label":option.displayName,"value":option.name})
        })


        break;

      case "Gen_IdentityType":

        if(listData.length < 1){
          result= MlIdentityTypes.find({isActive : true}).fetch();
        }else{

          result= MlIdentityTypes.find({ _id: { $in: listData },isActive : true}).fetch();
        }

        let identityResponse=_.each(result,function (option,id) {
          options.push({"label":option.identityTypeDisplayName,"value":option.identityTypeName})
        })


        break;

      case "Gen_isActive":


          options.push({"label":"true","value":true},{"label":"false","value":false})



        break;
      case "Gen_Clusters":

        if(listData.length < 1){

            clusterIds = [clusterIds]

          let allclusterIds = _.contains(clusterIds,"all");
          if(allclusterIds){
            result = MlClusters.find({isActive : true}).fetch();
          }else{
            result= MlClusters.find({ _id: { $in: clusterIds },isActive : true}).fetch();
          }

        }else{

          result= MlClusters.find({ _id: { $in: listData },isActive : true}).fetch();
        }

        let genClusterResponse=_.each(result,function (option,id) {
          options.push({"label":option.displayName,"value":option._id})
        })

        break;
      case "Gen_Chapters":

        if(listData.length < 1){
          if(userProfile.hierarchyLevel == 4){
            let arrayOfChapters = _.pluck(requestParams.filteredListId, 'value') || [];
            result= MlChapters.find({ clusterId: {$in : arrayOfChapters},isActive : true}).fetch();
          }else{
            let allchapterIds = _.contains(chapterIds,"all");
            if(allchapterIds){
              result = MlChapters.find({isActive : true}).fetch();
            }else{
              result= MlChapters.find({ _id: { $in: chapterIds },isActive : true}).fetch();
            }
          }


        }else{
          let arrayOfChapters = _.pluck(requestParams.filteredListId, 'value') || [];
          result= MlChapters.find({ clusterId: {$in : arrayOfChapters},isActive : true}).fetch();
        }

        let genChapterResponse=_.each(result,function (option,id) {
          options.push({"label":option.displayName,"value":option._id})
        })

        break;

      case "Gen_SubChapters":


        if(listData.length < 1){

          if(userProfile.hierarchyLevel == 4 || userProfile.hierarchyLevel == 3 || userProfile.hierarchyLevel == 2){
            let arrayOfGenSubChapter = _.pluck(requestParams.filteredListId, 'value') || [];
            result= MlSubChapters.find({clusterId: {$in : arrayOfGenSubChapter}, chapterId: {$in : arrayOfGenSubChapter},isActive : true}).fetch();
          }else{
            let allsubChapterIds = _.contains(subChapterIds,"all");
            if(allsubChapterIds){
              result = MlSubChapters.find({isActive : true}).fetch();
            }else{
              result= MlSubChapters.find({ _id: { $in: subChapterIds },isActive : true}).fetch();
            }
          }
        }else{
          let arrayOfGenSubChapter = _.pluck(requestParams.filteredListId, 'value') || [];
          result= MlSubChapters.find({clusterId: {$in : arrayOfGenSubChapter}, chapterId: {$in : arrayOfGenSubChapter},isActive : true}).fetch();

        }





        let genSubChapterResponse=_.each(result,function (option,id) {
          options.push({"label":option.subChapterDisplayName,"value":option._id})
        })

        break;

    }


    return options;
  }


}
