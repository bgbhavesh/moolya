import MlResolver from "../../commons/mlResolverDef";
import MlRespPayload from "../../commons/mlPayload";
import MlUserContext from '../../MlExternalUsers/mlUserContext'
var _ = require('lodash')
import MlAppointment from '../../MlExternalUsers/calendarSettings/appointment';
import mlInteractionService from '../interactions/mlInteractionRepoService';
import MlTransactionsHandler from '../../../server/commons/mlTransactionsLog';


MlResolver.MlQueryResolver['getMySharedCalendarConnections'] = (obj, args, context, info) => {
  let userId = context.userId;
  let pipeline = [
    {"$match": { "user.userId": userId } },
    {"$group": { _id: "$owner.userId" } },
    {"$lookup": { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
    {"$unwind": "$user"},
    {"$replaceRoot": {newRoot:"$user"} },
    {"$project": {
      userId: "$_id",
      profilePic: "$profile.profileImage",
      displayName: "$profile.displayName"
    } }
  ];
  let data = mlDBController.aggregate('MlSharedCalendar', pipeline);
  return data;
}

MlResolver.MlMutationResolver['createSharedCalendar'] = (obj, args, context, info) => {
  let userId =  context.userId;
  let profileId = new MlUserContext().userProfileDetails(userId).profileId;
  let profile = new MlUserContext().userProfileDetails(userId);
  let ownerInfo={
    userId: userId,
    profileId: profileId,
    clusterId: profile ? profile.clusterId : '',
    chapterId: profile ? profile.chapterId : '',
    subChapterId: profile ? profile.subChapterId : '',
    communityId: profile ? profile.communityId : '',
    communityCode: profile ? profile.communityCode : ''
  }
  args.detailsInput.createdBy =  userId;
  args.detailsInput.owner= ownerInfo;
  args.detailsInput.createdAt =  new Date();
  let usersData = args.detailsInput.users;
  let response;
  usersData.map(function(data){
    args.detailsInput.user = data
    response = mlDBController.insert('MlSharedCalendar', args.detailsInput, context);
  })
  if(response){
    let transactionEntry = new MlTransactionsHandler().recordTransaction({
      'fromUserId': context.userId,
      'moduleName': 'share',
      'activity': 'sharing',
      'transactionType': 'sharing',
      'userId': context.userId,
      // 'activityDocId': resourceId,
      // 'docId': portfolioId,
      'transactionDetails': 'sharing',
      'context': context || {},
      'transactionTypeId': "share",
      'fromUserType': 'user'
    })
    console.log('transactionEntry', transactionEntry)
    let code = 200;
    let resp = new MlRespPayload().successPayload("Shared successfully", code);
    return resp;
  } else {
    let code = 400;
    let resp = new MlRespPayload().errorPayload("Error in sharing", code);
    return resp;
  }
}

MlResolver.MlQueryResolver['getSharedCalendar'] = (obj, args, context, info) => {
  let userId = args.userId ? args.userId : context.userId;
  let user = mlDBController.findOne('users', userId);
  if( user && user.profile && user.profile.externalUserProfiles && user.profile.externalUserProfiles.length ){
    let profiles = user.profile.externalUserProfiles;
    let response = profiles.reduce(function (data ,profile) {
      let profileId = profile.profileId;
      let userCalendar = MlAppointment.getUserCalendar(userId,profileId, args.month, args.year, args.date);
      if(data && data.days && data.days.length) {
        let dataDays = data && data.days ? data.days : [];
        let days = userCalendar && userCalendar.days ? userCalendar.days : [];
        return days.map( (day) => {
          let isFind = dataDays.find( (dataday) => {
            dataday.date.setHours(0,0,0,0);
            day.date.setHours(0,0,0,0);
            return dataday.date.getTime() == day.date.getTime()
          } );
          if(isFind) {
            day = day.status > isFind.staus ? day : isFind;
          }
        })
      } else {
        data = userCalendar;
      }
      return data;
    },[])

    return response;
  }
  // let profileId = new MlUserContext().userProfileDetails(userId).profileId;
  // return MlAppointment.getUserCalendar(userId,profileId, args.month, args.year, args.date)
}
