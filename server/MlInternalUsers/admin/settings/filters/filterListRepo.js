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

    let userProfile = new MlAdminUserContext().userProfileDetails(this.userId);
    let user = Meteor.users.findOne({_id:context.userId});
    let roleIds=[];
    let hirarichyLevel=[]
    let userProfiles=user&&user.profile.InternalUprofile.moolyaProfile.userProfiles?user.profile.InternalUprofile.moolyaProfile.userProfiles:[];
    let listData = [];
    let clusterIds = [];
    userProfiles.map(function (doc,index) {

      let userRoles = doc && doc.userRoles ? doc.userRoles : [];
      clusterIds = _.pluck(userRoles, 'clusterId') || [];
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
      case "Reg_Clusters":
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
        let arrayOfValues = _.pluck(requestParams.filteredListId, 'value') || [];
        result= MlChapters.find({ clusterId: {$in : arrayOfValues},isActive : true}).fetch();


        let chapterResponse=_.each(result,function (option,id) {
          options.push({"label":option.displayName,"value":option._id})
        })

        break;

      case "Reg_SubChapters":

        let arrayOfSubChapter = _.pluck(requestParams.filteredListId, 'value') || [];
        result= MlSubChapters.find({clusterId: {$in : arrayOfSubChapter}, chapterId: {$in : arrayOfSubChapter},isActive : true}).fetch();


        let subchapterResponse=_.each(result,function (option,id) {
          options.push({"label":option.subChapterDisplayName,"value":option._id})
        })

        break;

      case "Gen_Community":

        if(listData.length < 1){
          result= MlCommunityDefinition.find({isActive : true}).fetch();
        }else{

          result= MlCommunityDefinition.find({ _id: { $in: listData },isActive : true}).fetch();
        }

        let communityResponse=_.each(result,function (option,id) {
          options.push({"label":option.displayName,"value":option._id})
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
          result= MlClusters.find({isActive : true}).fetch();
        }else{

          result= MlClusters.find({ _id: { $in: listData },isActive : true}).fetch();
        }

        let genClusterResponse=_.each(result,function (option,id) {
          options.push({"label":option.displayName,"value":option._id})
        })

        break;
      case "Gen_Chapters":
        let arrayOfChapters = _.pluck(requestParams.filteredListId, 'value') || [];
        result= MlChapters.find({ clusterId: {$in : arrayOfChapters},isActive : true}).fetch();


        let genChapterResponse=_.each(result,function (option,id) {
          options.push({"label":option.displayName,"value":option._id})
        })

        break;

      case "Gen_SubChapters":

        let arrayOfGenSubChapter = _.pluck(requestParams.filteredListId, 'value') || [];
        result= MlSubChapters.find({clusterId: {$in : arrayOfGenSubChapter}, chapterId: {$in : arrayOfGenSubChapter},isActive : true}).fetch();


        let genSubChapterResponse=_.each(result,function (option,id) {
          options.push({"label":option.subChapterDisplayName,"value":option._id})
        })

        break;

    }


    return options;
  }


}
