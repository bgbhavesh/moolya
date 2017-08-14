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
    let code = 400;
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

MlResolver.MlMutationResolver['updateSharedLibrary'] = (obj, args, context, info) => {
}

MlResolver.MlQueryResolver['fetchSharedLibrary'] = (obj, args, context, info) => {

}

