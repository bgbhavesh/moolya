import MlResolver from "../../commons/mlResolverDef";
import MlRespPayload from "../../commons/mlPayload";
import MlUserContext from '../../MlExternalUsers/mlUserContext'
var _ = require('lodash')

MlResolver.MlMutationResolver['createSharedLibrary'] = (obj, args, context, info) => {

  let libraryInput = args.detailsInput;

  if(!libraryInput) {
    let code = 400;
    let response = new MlRespPayload().errorPayload('Share data required', code);
    return response;
  }

  if(!libraryInput.files || !libraryInput.files.length ){
    let code = 404;
    let response = new MlRespPayload().errorPayload('Share files data required', code);
    return response;
  }

  if(!libraryInput.users || !libraryInput.users.length ){
    let code = 400;
    let response = new MlRespPayload().errorPayload('Share user data required', code);
    return response;
  }

  let files = libraryInput.files;
  let users = libraryInput.users;

  try {

    let userId = context.userId;
    let profile = new MlUserContext(userId).userProfileDetails(userId);
    let dataToInsert = {
      owner:{
        userId: userId,
        profileId: profile ? profile.profileId : ''
      },
      isSignedUrl: false,
      isActive: true,
      isDownloadable: libraryInput.isDownloadable ? libraryInput.isDownloadable : false,
      createdAt: new Date(),
      createdBy: userId
    };

    orderNumberGenService.createShareId(dataToInsert);

    if(libraryInput.sharedStartDate) {
      dataToInsert.sharedStartDate = libraryInput.sharedStartDate;
    }
    if(libraryInput.sharedEndDate) {
      dataToInsert.sharedEndDate = libraryInput.sharedEndDate;
    }

    let isSharedFailed = false;
    users.forEach(function (user) {
      dataToInsert.user = user;
      files.forEach(function (file) {
        dataToInsert.file = file;
        let result = mlDBController.insert('MlSharedLibrary', dataToInsert, context);
        if(typeof result !== "string") {
          isSharedFailed = true;
        }
      });
    });

    if(isSharedFailed){
      let code = 400;
      let response = new MlRespPayload().errorPayload('Error occur while sharing', code);
      return response;
    }

    let code = 200;
    let response = new MlRespPayload().successPayload('Share document successfully', code);
    return response;

  } catch(error){
    let code = 400;
    let response = new MlRespPayload().errorPayload(error, code);
    return response;
  }

  console.log(libraryInput);

}

MlResolver.MlQueryResolver['fetchSharedLibraryDetails'] = (obj, args, context, info) => {

  let sharedId = args.sharedId;

  let pipeline = [
    { "$match": { "sharedId": sharedId } },
    {
      "$group": {
        _id: "$sharedId",
        users: {"$addToSet": "$user"},
        files: {"$addToSet": "$file"},
        userId: { "$first": "$owner.userId" },
        profileId: { "$first": "$owner.profileId" },
        shareStartDate: { "$first": "$sharedStartDate"},
        shareEndDate: { "$first": "$sharedEndDate"},
        isDownloadable: { "$first": "$isDownloadable"},
        createdAt: { "$first": "$createdAt"}
      }
    },
    { "$unwind": "$users" },
    { "$lookup": { from: "users", localField: "users.userId", foreignField: "_id", as: "usersInfo" } },
    { "$unwind": "$usersInfo" },
    { "$project": {
      "_id": 1,
      "files": 1,
      "userId": 1,
      "profileId": 1,
      "shareStartDate": 1,
      "shareEndDate": 1,
      "isDownloadable": 1,
      "createdAt": 1,
      "users": {
        "userId": 1,
        "profileId":1,
        "displayName": "$usersInfo.profile.displayName",
        "profilePic": "$usersInfo.profile.profileImage"
      }
    }
    },
    {
      "$group":{
        _id: "$_id",
        users: {"$addToSet": "$users"},
        files: {"$first": "$files"},
        userId: { "$first": "$userId" },
        profileId: { "$first": "$profileId" },
        shareStartDate: { "$first": "$sharedStartDate"},
        shareEndDate: { "$first": "$sharedEndDate"},
        isDownloadable: { "$first": "$isDownloadable"},
        createdAt: { "$first": "$createdAt"}
      }
    },
    { "$lookup": { from: "users", localField: "userId", foreignField: "_id", as: "contactInfo" } },
    { "$unwind" : "$contactInfo" },
    { "$addFields": { "userProfiles": {"$cond": [{ "$isArray": "$contactInfo.profile.externalUserProfiles" }, "$contactInfo.profile.externalUserProfiles" , [{}] ] } } },
    { "$addFields": {
      "userProfiles": {
        "$filter": {
          input: "$userProfiles",
          as: "userProfile",
          cond: { $eq: [ "$$userProfile.profileId", "$profileId" ] }
        }
      }
    }
    },
    { "$unwind" : "$userProfiles" },
    {
      "$project": {
        _id: 1,
        users: 1,
        files: 1,
        shareStartDate: 1,
        shareEndDate: 1,
        isDownloadable: 1,
        createdAt:1,
        ownerInfo: {
          userId: "$userId",
          profileId: "$profileId",
          email : "$contactInfo.profile.email",
          mobileNumber: "$contactInfo.profile.mobileNumber",
          cluster: "$userProfiles.clusterName",
          chapter: "$userProfiles.chapterName",
          subChapter: "$userProfiles.subChapterName",
          community: "$userProfiles.communityName",
        }
      }
    }
  ];

  let data = mlDBController.aggregate('MlSharedLibrary', pipeline);

  return data && data[0] ? data[0] : {};

}

MlResolver.MlQueryResolver['getMySharedConnections'] = (obj, args, context, info) => {
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
  let data = mlDBController.aggregate('MlSharedLibrary', pipeline);
  return data;
}

MlResolver.MlMutationResolver['updateSharedLibrary'] = (obj, args, context, info) => {
}

MlResolver.MlQueryResolver['fetchSharedLibrary'] = (obj, args, context, info) => {
  let userId =  args.userId;
  let data = mlDBController.find('MlSharedLibrary',{'user.userId':userId}, context).fetch();
  return data;

}

