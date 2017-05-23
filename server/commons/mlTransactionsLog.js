import async from 'async';
import each from 'async/each';
import moment from'moment'
import _ from 'underscore';
import MlAdminContextQueryConstructor from "../MlInternalUsers/admin/core/repository/mlAdminContextQueryConstructor";
//import MlAppUserContext from './mlAuthorization/mlAppUserContext';

class MlTransactionsHandler {
  constructor() {
    this.contextData.bind(this);
  }

//contextRefNames(contextData){
// }

  contextData(userId){
    var contextData={};
    var user = Meteor.users.findOne({_id:userId});
    try{
      if(user&&user.profile&&user.profile.isInternaluser){
        contextData= new MlAdminContextQueryConstructor(userId).contextQuery();
        //clusterId[0],chapterId[0],subChapterId[0],communitId[0] as array
      }else if(user&&user.profile&&user.profile.isExternaluser){
       /* let externalUProfile=new MlAppUserContext(userId).userProfileDetails();
        contextData={clusterId:externalUProfile.defaultCluster,chapterId:externalUProfile.defaultChapter,subChapterId:externalUProfile.defaultSubChapter,
          communityId:externalUProfile.defaultCommunity};*/
        //resolve external user context based on default profile
      }else{
        contextData={};
      }
    }catch(e){
      //log error for transaction context
    }
    return contextData;
  }

  insertTransactions(transactionsParams, context, actions) {
    let userAgent = {
      OS: "-",
      ipAddress: context.ip?context.ip:" ",
      browser:context.browser?context.browser:" ",
      userId:context.userId?context.userId:" ",
      deviceModel: "-",
      deviceType: "-",
      deviceVendor: "-"
    }
    let defaultCluster=null;
    let defaultChapter = null;
    let defaultSubChapter = null;
    let defaultCommunity = null;
    let user_roles;

    var contextData=this.contextData(transactionsParams.user._id);

    let clusterName; let chapterName; let subChapterName;

      if(contextData && contextData.clusterId && contextData.clusterId[0]&&contextData.clusterId[0] != "all"){
        let clusterDetails = MlClusters.findOne({_id: contextData.clusterId[0]}) || {};
        clusterName = clusterDetails.clusterName
      }else if(contextData && contextData.clusterId && contextData.clusterId[0]&&contextData.clusterId[0] == "all"){
        clusterName = "all";
      }
      if(contextData && contextData.chapterId && contextData.chapterId[0] && contextData.chapterId[0] != "all"){
        let chapterDetails = MlChapters.findOne({_id: contextData.chapterId[0]}) || {};
        chapterName = chapterDetails.chapterName
      }else if(contextData && contextData.chapterId && contextData.chapterId[0] && contextData.chapterId[0] == "all"){
        chapterName = "all"
      }
      if(contextData && contextData.subChapterId && contextData.subChapterId[0] && contextData.subChapterId[0] != "all"){
        let subchapterDetails = MlSubChapters.findOne({_id: contextData.subChapterId[0]}) || {};
        subChapterName = subchapterDetails.subChapterName
      }else if(contextData && contextData.subChapterId && contextData.subChapterId[0] && contextData.subChapterId[0] == "all"){
        subChapterName = "all"
      }


    let toInsert =
      {
        emailId: transactionsParams.user.profile.email,
        userId: transactionsParams.user._id,
        userName: transactionsParams.user.profile.InternalUprofile.moolyaProfile.firstName,
        url: context.url?context.url:" ",
        docId: " ",
        action: transactionsParams.methodName? transactionsParams.methodName : actions,
        moduleName: " ",
        userAgent: userAgent,
        clusterId : contextData&&contextData.clusterId&&contextData.clusterId[0]?contextData.clusterId[0]:"",
        chapterId : contextData&&contextData.chapterId&&contextData.chapterId[0]?contextData.chapterId[0]:"",
        subChapterId : contextData&&contextData.subChapterId&&contextData.subChapterId[0]?contextData.subChapterId[0]:"",
        communityId : contextData&&contextData.communityId&&contextData.communityId[0]?contextData.communityId[0]:"",
        clusterName               : clusterName,
        chapterName               : chapterName,
        subChapterName            : subChapterName,
        createdAt: new Date(),
        transactionDetails: `User ${transactionsParams.user.profile.InternalUprofile.moolyaProfile.firstName} performed ${transactionsParams.methodName? transactionsParams.methodName : actions} action at ${new Date()} `
      }
      //toInsert=_.extend(toInsert,contextData);

    const resp = MlTransactionsLog.insert(toInsert);
    return resp
  }
}

  module.exports = MlTransactionsHandler
