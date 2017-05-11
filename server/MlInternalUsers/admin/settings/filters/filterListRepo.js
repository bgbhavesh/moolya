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
    let settingsObj = null;
    let result = null;
    let listData = []
    if(requestParams.list && requestParams.list.length>0){
      listData = requestParams.list
    }
    let  options=[]
    switch (requestParams.moduleName) {
      case "Reg_Clusters":
        if(listData.length < 1){
          result= MlClusters.find({isActive : true}).fetch();
        }else{

          result= MlClusters.find({ _id: { $in: listData },isActive : true}).fetch();
        }

        let resultResponse=_.each(result,function (option,id) {
          options.push({"label":option.displayName,"value":option._id})
        })

        break;
      case "Gen_Chapters":
        let arrayOfValues = _.pluck(requestParams.filteredListId, 'value') || [];
        result= MlChapters.find({ clusterId: {$in : arrayOfValues},isActive : true}).fetch();


        let chapterResponse=_.each(result,function (option,id) {
          options.push({"label":option.displayName,"value":option._id})
        })

        break;

      case "Gen_SubChapters":

        let arrayOfSubChapter = _.pluck(requestParams.filteredListId, 'value') || [];
        result= MlSubChapters.find({clusterId: {$in : arrayOfSubChapter}, chapterId: {$in : arrayOfSubChapter},isActive : true}).fetch();


        let subchapterResponse=_.each(result,function (option,id) {
          options.push({"label":option.subChapterDisplayName,"value":option._id})
        })

        break;

      case "Reg_Community":

        if(listData.length < 1){
          result= MlCommunityDefinition.find({isActive : true}).fetch();
        }else{

          result= MlCommunityDefinition.find({ _id: { $in: listData },isActive : true}).fetch();
        }

        let communityResponse=_.each(result,function (option,id) {
          options.push({"label":option.displayName,"value":option._id})
        })


        break;
    }


    return options;
  }


}
