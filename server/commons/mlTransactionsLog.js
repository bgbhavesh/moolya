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
   * This method returns the context fields for transaction log.
   * @param userId of logged In User
   * returns result Object containing context values({userName,emailId,userId,clusterId,chapterId,subChapterId,communityId,clusterName,chapterName,subChapterName,communityName})
   */
  contextData(userId){
    var contextData={};
    var user = Meteor.users.findOne({_id:userId});
    var firstName='';var lastName='';
    try{
      if(user&&user.profile&&user.profile.isInternaluser&&user.profile.InternalUprofile) { //resolve internal user context based on default profile
        let details = new MlAdminUserContext().userProfileDetails(userId)||{};
          contextData = { clusterId: details.defaultProfileHierarchyRefId?details.defaultProfileHierarchyRefId:null,chapterId: details.defaultChapters&&details.defaultChapters[0]?details.defaultChapters[0]:null,
          subChapterId: details.defaultSubChapters&&details.defaultSubChapters[0]?details.defaultSubChapters[0]:null,communityId: details.defaultCommunities&&details.defaultCommunities[0]?details.defaultCommunities[0]:null};

           firstName=(user.profile.InternalUprofile.moolyaProfile || {}).firstName||'';
           lastName=(user.profile.InternalUprofile.moolyaProfile || {}).lastName||'';

      }else if(user&&user.profile&&user.profile.isExternaluser){ //resolve external user context based on default profile
        let externalUProfile=new MlAppUserContext(userId).userProfileDetails();
          contextData={clusterId:externalUProfile.defaultCluster,chapterId:externalUProfile.defaultChapter,subChapterId:externalUProfile.defaultSubChapter,
          communityId:externalUProfile.defaultCommunity};
           firstName=(user.profile || {}).firstName||'';
           lastName =(user.profile || {}).lastName||'';
      }else{
        contextData={};
      }

      if(user&&user.username){
        contextData['emailId']=user.username;
        contextData['userId']=user._id;
      }
      contextData['userName']=`${firstName} ${lastName}`;
      //resolve reference names for context fields
      this.contextRefNames(contextData);
    }catch(e){
      //log error for transaction context
    }
    return contextData;
  }

  recordTransaction(transactionsParams) {

    var context=transactionsParams.context?transactionsParams.context:{};
    let userAgent = {
      OS: context.os?context.os:" ",
      ipAddress: context.ip?context.ip:" ",
      browser:context.browser?context.browser:" ",
      userId:transactionsParams.userId?transactionsParams.userId:" ",
      deviceModel:context.deviceModel?context.deviceModel:"-",
      deviceType: context.deviceType?context.deviceType:"-",
      deviceVendor: context.deviceVendor?context.deviceVendor:"-"
    };

    //resolve the context of User
    var contextData=this.contextData(transactionsParams.userId);

    let transactionRecord =
      { docId: transactionsParams.docId,
        transactionTypeId:transactionsParams.transactionTypeId||null,
        transactionTypeName:transactionsParams.transactionType||null,
        activity: transactionsParams.activity,
        moduleName:transactionsParams.moduleName,
        userAgent: userAgent,
        createdAt: new Date(),
        transactionDetails: transactionsParams.transactionDetails
      }
    orderNumberGenService.assignTransationRequest(transactionRecord),
      transactionRecord=_.extend(transactionRecord,contextData);

    const resp = MlTransactionsLog.insert(transactionRecord);
    return resp;
  }
}

  module.exports = MlTransactionsHandler
