import MlResolver from '../../commons/mlResolverDef';
import MlRespPayload from '../../commons/mlPayload';
import MlUserContext from '../../MlExternalUsers/mlUserContext'
const _ = require('lodash')
import mlInteractionService from '../interactions/mlInteractionRepoService';

MlResolver.MlMutationResolver.createSharedLibrary = (obj, args, context, info) => {
  const libraryInput = args.detailsInput;

  if (!libraryInput) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Share data required', code);
    return response;
  }

  if (!libraryInput.files || !libraryInput.files.length) {
    const code = 404;
    const response = new MlRespPayload().errorPayload('Share files data required', code);
    return response;
  }

  if (!libraryInput.users || !libraryInput.users.length) {
    const code = 400;
    const response = new MlRespPayload().errorPayload('Share user data required', code);
    return response;
  }

  const files = libraryInput.files;
  const users = libraryInput.users;

  try {
    const userId = context.userId;
    const profile = new MlUserContext(userId).userProfileDetails(userId);
    const dataToInsert = {
      owner: {
        userId,
        profileId: profile ? profile.profileId : '',
        clusterId: profile ? profile.clusterId : '',
        chapterId: profile ? profile.chapterId : '',
        subChapterId: profile ? profile.subChapterId : '',
        communityId: profile ? profile.communityId : '',
        communityCode: profile ? profile.communityDefCode : ''
      },
      isSignedUrl: false,
      isActive: true,
      isDownloadable: libraryInput.isDownloadable ? libraryInput.isDownloadable : false,
      createdAt: new Date(),
      createdBy: userId
    };

    orderNumberGenService.createShareId(dataToInsert);

    if (libraryInput.sharedStartDate) {
      dataToInsert.sharedStartDate = libraryInput.sharedStartDate;
    }
    if (libraryInput.sharedEndDate) {
      dataToInsert.sharedEndDate = libraryInput.sharedEndDate;
    }

    let isSharedFailed = false;
    users.forEach((user) => {
      dataToInsert.user = user;
      files.forEach((file) => {
        dataToInsert.file = file;
        const result = mlDBController.insert('MlSharedLibrary', dataToInsert, context);
        if (typeof result !== 'string') {
          isSharedFailed = true;
        }
      });
    });

    // mlInteractionService.createTransactionRequest(toUser._id,'share', args.resourceId, connectionData._id, context.userId, 'user', context );

    if (isSharedFailed) {
      const code = 400;
      const response = new MlRespPayload().errorPayload('Error occur while sharing', code);
      return response;
    }

    const code = 200;
    const response = new MlRespPayload().successPayload('Share document successfully', code);
    return response;
  } catch (error) {
    const code = 400;
    const response = new MlRespPayload().errorPayload(error, code);
    return response;
  }

  console.log(libraryInput);
}

MlResolver.MlQueryResolver.fetchSharedLibraryDetails = (obj, args, context, info) => {
  const sharedId = args.sharedId;

  const pipeline = [
    { $match: { sharedId } },
    {
      $group: {
        _id: '$sharedId',
        users: { $addToSet: '$user' },
        files: { $addToSet: '$file' },
        userId: { $first: '$owner.userId' },
        profileId: { $first: '$owner.profileId' },
        shareStartDate: { $first: '$sharedStartDate' },
        shareEndDate: { $first: '$sharedEndDate' },
        isDownloadable: { $first: '$isDownloadable' },
        createdAt: { $first: '$createdAt' }
      }
    },
    { $unwind: '$users' },
    {
      $lookup: {
        from: 'users', localField: 'users.userId', foreignField: '_id', as: 'usersInfo'
      }
    },
    { $unwind: '$usersInfo' },
    {
      $project: {
        _id: 1,
        files: 1,
        userId: 1,
        profileId: 1,
        shareStartDate: 1,
        shareEndDate: 1,
        isDownloadable: 1,
        createdAt: 1,
        users: {
          userId: 1,
          profileId: 1,
          displayName: '$usersInfo.profile.firstName',
          profilePic: '$usersInfo.profile.profileImage'
        }
      }
    },
    {
      $group: {
        _id: '$_id',
        users: { $addToSet: '$users' },
        files: { $first: '$files' },
        userId: { $first: '$userId' },
        profileId: { $first: '$profileId' },
        sharedStartDate: { $first: '$shareStartDate' },
        sharedEndDate: { $first: '$shareEndDate' },
        isDownloadable: { $first: '$isDownloadable' },
        createdAt: { $first: '$createdAt' }
      }
    },
    {
      $lookup: {
        from: 'users', localField: 'userId', foreignField: '_id', as: 'contactInfo'
      }
    },
    { $unwind: '$contactInfo' },
    { $addFields: { userProfiles: { $cond: [{ $isArray: '$contactInfo.profile.externalUserProfiles' }, '$contactInfo.profile.externalUserProfiles', [{}]] } } },
    {
      $addFields: {
        userProfiles: {
          $filter: {
            input: '$userProfiles',
            as: 'userProfile',
            cond: { $eq: ['$$userProfile.profileId', '$profileId'] }
          }
        }
      }
    },
    { $unwind: '$userProfiles' },
    {
      $project: {
        _id: 1,
        users: 1,
        files: 1,
        sharedStartDate: 1,
        sharedEndDate: 1,
        isDownloadable: 1,
        createdAt: 1,
        ownerInfo: {
          userId: '$userId',
          profileId: '$profileId',
          email: '$contactInfo.profile.email',
          name: '$contactInfo.profile.firstName',
          mobileNumber: '$contactInfo.profile.mobileNumber',
          cluster: '$userProfiles.clusterName',
          chapter: '$userProfiles.chapterName',
          subChapter: '$userProfiles.subChapterName',
          community: '$userProfiles.communityName'
        }
      }
    }
  ];

  const data = mlDBController.aggregate('MlSharedLibrary', pipeline);

  return data && data[0] ? data[0] : {};
}

MlResolver.MlQueryResolver.getMySharedConnections = (obj, args, context, info) => {
  const userId = context.userId;
  const pipeline = [
    { $match: { 'user.userId': userId, sharedEndDate: { $gte: new Date() } } },
    { $group: { _id: '$owner.userId' } },
    {
      $lookup: {
        from: 'users', localField: '_id', foreignField: '_id', as: 'user'
      }
    },
    { $unwind: '$user' },
    { $replaceRoot: { newRoot: '$user' } },
    {
      $project: {
        userId: '$_id',
        profilePic: '$profile.profileImage',
        displayName: '$profile.firstName'
      }
    }
  ];
  const data = mlDBController.aggregate('MlSharedLibrary', pipeline);
  return data;
}

MlResolver.MlMutationResolver.updateSharedLibrary = (obj, args, context, info) => {
}

MlResolver.MlQueryResolver.fetchSharedLibrary = (obj, args, context, info) => {
  const userId = args.userId ? args.userId : context.userId;
  const libraryData = [];
  const data = mlDBController.find('MlSharedLibrary', { 'owner.userId': userId, 'user.userId': context.userId }, context).fetch();
  data.map((info) => {
    // new Date(info.sharedStartDate) - new Date(info.sharedEndDate);
    const expiryDate = Math.floor((Date.UTC(info.sharedEndDate.getFullYear(), info.sharedEndDate.getMonth(), info.sharedEndDate.getDate()) - Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) / (1000 * 60 * 60 * 24));
    info.daysToExpire = expiryDate;
    if (expiryDate < 0 || expiryDate === 0) {
      info.isExpired = true;
      const updatedValue = mlDBController.update('MlSharedLibrary', { _id: info._id }, info, { $set: 1 }, context);
    }
    const status = ((!info.isExpired) || new Date(info.sharedStartDate) === new Date())
    const yetToBeShared = new Date(info.sharedStartDate).setHours(0, 0, 0, 0) > new Date()
    if (!info.isExpired && status && (!yetToBeShared)) { // && (info && info.sharedStartDate ? new Date(info.sharedStartDate) === new Date() : true )) { // && (info && info.sharedStartDate ? info.sharedStartDate === new Date() : true )
      libraryData.push(info)
    }
  })
  return libraryData;
}

MlResolver.MlQueryResolver.fetchShareMembersInfo = (obj, args, context, info) => {
  const userId = context.userId;
  const data = mlDBController.find('MlSharedLibrary', { 'owner.userId': userId }, context).fetch();
  const responseData = []
  data.map((info) => {
    const expiryDate = Math.floor((Date.UTC(info.sharedEndDate.getFullYear(), info.sharedEndDate.getMonth(), info.sharedEndDate.getDate()) - Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) / (1000 * 60 * 60 * 24));
    const otherUserId = info.user.userId;
    const userInfo = mlDBController.findOne('users', { _id: otherUserId }, context);
    const userName = userInfo.profile.firstName;
    const userObject = {
      userName,
      profileImage: userInfo.profile.profileImage,
      daysRemaining: expiryDate,
      fileUrl: info.file.url,
      fileType: info.file.fileType
    }
    responseData.push(userObject)
  })

  return responseData;
}

