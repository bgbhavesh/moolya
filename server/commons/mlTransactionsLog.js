import async from 'async';
import each from 'async/each';
import moment from'moment'
import _ from 'underscore';
import MlAdminContextQueryConstructor from "../MlInternalUsers/admin/core/repository/mlAdminContextQueryConstructor";
import MlAppUserContext from '../mlAuthorization/mlAppUserContext';
import MlAdminUserContext from '../mlAuthorization/mlAdminUserContext'
class MlTransactionsHandler {
  constructor() {
    this.contextData.bind(this);
    this.contextRefNames.bind(this);
  }

  /*
   * This method returns the context field Names.
   * @param contextData containing context keys
   * returns result Object containing context values({clusterName,chapterName,subChapterName,communityName})
   */
  contextRefNames(contextData){
    var contextData=contextData||{};
    if(contextData.clusterId && contextData.clusterId=== "all")contextData['clusterName'] ='all';
    if(contextData.clusterId && contextData.clusterId!== "all"){
      let clusterDetails = MlClusters.findOne({_id: contextData.clusterId}) || {};
      contextData['clusterName'] = clusterDetails.clusterName||null;
    }
    if(contextData.chapterId && contextData.chapterId && contextData.chapterId === "all")contextData['chapterName'] ='all';
    if(contextData.chapterId && contextData.chapterId !== "all"){
      let chapterDetails = MlChapters.findOne({_id: contextData.chapterId}) || {};
      contextData['chapterName'] = chapterDetails.chapterName||null;
    }
    if(contextData.subChapterId && contextData.subChapterId === "all")contextData['subChapterName']='all';
    if(contextData.subChapterId && contextData.subChapterId !== "all"){
      let subchapterDetails = MlSubChapters.findOne({_id: contextData.subChapterId}) || {};
      contextData['subChapterName'] = subchapterDetails.subChapterName||null;
    }
    if(contextData.communityId && contextData.communityId === "all")contextData['communityName']='all';
    if(contextData.communityId && contextData.communityId !== "all"){
      let communityDetails = MlCommunity.findOne({_id: contextData.communityId}) || {};
      contextData['communityName'] = communityDetails.communityName||null;
    }
    return contextData;

  }

  /*
   * This method returns the context fields for transaction lof.
   * @param userId of logged In User
   * returns result Object containing context values({clusterId,chapterId,subChapterId,communityId,clusterName,chapterName,subChapterName,communityName})
   */
  contextData(userId){
    var contextData={};
    var user = Meteor.users.findOne({_id:userId});
    try{
      if(user&&user.profile&&user.profile.isInternaluser) { //resolve internal user context based on default profile
        let details = new MlAdminUserContext().userProfileDetails(userId)||{};
        //let details = new MlAdminContextQueryConstructor(userId).contextQuery();
          contextData = { clusterId: details.defaultProfileHierarchyRefId?details.defaultProfileHierarchyRefId:null,chapterId: details.defaultChapters&&details.defaultChapters[0]?details.defaultChapters[0]:null,
          subChapterId: details.defaultSubChapters&&details.defaultSubChapters[0]?details.defaultSubChapters[0]:null,communityId: details.defaultCommunities&&details.defaultCommunities[0]?details.defaultCommunities[0]:null};

      }else if(user&&user.profile&&user.profile.isExternaluser){ //resolve external user context based on default profile
        let externalUProfile=new MlAppUserContext(userId).userProfileDetails();
          contextData={clusterId:externalUProfile.defaultCluster,chapterId:externalUProfile.defaultChapter,subChapterId:externalUProfile.defaultSubChapter,
          communityId:externalUProfile.defaultCommunity};
      }else{
        contextData={};
      }
      //resolve reference names for context fields
      this.contextRefNames(contextData);
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

    //resolve the context of User
    var contextData=this.contextData(transactionsParams.user._id);

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
        createdAt: new Date(),
        transactionDetails: `User ${transactionsParams.user.profile.InternalUprofile.moolyaProfile.firstName} performed ${transactionsParams.methodName? transactionsParams.methodName : actions} action at ${new Date()} `
      }

      toInsert=_.extend(toInsert,contextData);

    const resp = MlTransactionsLog.insert(toInsert);
    return resp
  }
}

  module.exports = MlTransactionsHandler
