/**
 * Created by venkatasrinag on 6/4/17.
 */
import MlResolver from "../../../commons/mlResolverDef";
import MlRespPayload from "../../../commons/mlPayload";
import MlUserContext from "../../../MlExternalUsers/mlUserContext";
import _ from "lodash";
import portfolioValidationRepo from "./portfolioValidation";
import MlEmailNotification from "../../../mlNotifications/mlEmailNotifications/mlEMailNotification";
import MlAlertNotification from '../../../mlNotifications/mlAlertNotifications/mlAlertNotification'
import mlNonMoolyaAccess from "../core/non-moolyaAccessControl/mlNonMoolyaAccess"
import MlSubChapterAccessControl from '../../../mlAuthorization/mlSubChapterAccessControl'
import MlNotificationController from '../../../mlNotifications/mlAppNotifications/mlNotificationsController'
/**
 * @module [externaluser portfolio Landing]
 * @params [context.userId]
 * */
MlResolver.MlQueryResolver['fetchPortfolioDetailsByUserId'] = (obj, args, context, info) => {
  if (context.userId) {
    let defaultProfile = new MlUserContext(context.userId).userProfileDetails(context.userId)
    if (defaultProfile) {
      var defaultCommunity = defaultProfile.communityDefCode || {};
      var portfolio = MlPortfolioDetails.findOne({$and: [{userId: context.userId}, {communityCode: defaultCommunity}, {profileId: defaultProfile.profileId}]})
      if (portfolio)
        return portfolio;
      else
        console.log("portfolio not found")
    }
  } else {
    console.log("NOt a valid user");
  }
}

/**
 * request for portfolio creation
 * */

//todo://changing communitytype to communitycode
MlResolver.MlMutationResolver['createPortfolioRequest'] = (obj, args, context, info) => {
  let user;
  let portfolioDetails = args.portfoliodetails
  let ret;
  try {
      if (portfolioDetails && portfolioDetails.userId && portfolioDetails.communityType) {
        /** introducing profile Id based on registration in portfolio from users and creating portfolio based on profileId*/
        let userDetails = mlDBController.findOne('users', {_id: portfolioDetails.userId}, context)
        if(userDetails && userDetails.profile && userDetails.profile.externalUserProfiles){
          let reqProfile = _.find(userDetails.profile.externalUserProfiles, {registrationId: portfolioDetails.registrationId})
          portfolioDetails['profileId'] = reqProfile.profileId || ''
        }
          user = MlPortfolioDetails.findOne({"$and": [{'userId': portfolioDetails.userId}, {'communityType': portfolioDetails.communityType}, {profileId:portfolioDetails.profileId}]})
          if (!user || portfolioDetails.communityType == 'Ideators') {
              ret = mlDBController.insert('MlPortfolioDetails', portfolioDetails, context)
              if(ret){
                  switch (portfolioDetails.communityType){
                      case "Ideators":{
                          let ideatorInfo = {}
                          let fb = "";
                          let linkedIn="";
                          let twitter="";
                          let googleplus="";
                          if(args.registrationInfo && args.registrationInfo.socialLinksInfo && args.registrationInfo.socialLinksInfo.length>0){
                              _.each(args.registrationInfo.socialLinksInfo,function(link) {
                                  if(link.socialLinkTypeName == "Facebook"){
                                      fb = link.socialLinkUrl
                                  }else if(link.socialLinkTypeName == "Linkedin"){
                                      linkedIn = link.socialLinkUrl
                                  }
                                  else if(link.socialLinkTypeName == "Twitter"){
                                      twitter = link.socialLinkUrl
                                  }
                                  else if(link.socialLinkTypeName == "GooglePlus"){
                                      googleplus = link.socialLinkUrl
                                }
                              })
                          }
                          if(args.registrationInfo){
                              ideatorInfo = {
                                  firstName: args.registrationInfo.firstName ? args.registrationInfo.firstName : "",
                                  lastName: args.registrationInfo.lastName ? args.registrationInfo.lastName : "",
                                  emailId: args.registrationInfo.userName ? args.registrationInfo.userName : args.registrationInfo.emailId,
                                  gender: args.registrationInfo.gender ? args.registrationInfo.gender : "",
                                  dateOfBirth: args.registrationInfo.dateOfBirth ? args.registrationInfo.dateOfBirth : "",
                                  qualification: args.registrationInfo.qualification ? args.registrationInfo.qualification : "",
                                  employmentStatus: args.registrationInfo.employmentStatus ? args.registrationInfo.employmentStatus : "",
                                  professionalTag: args.registrationInfo.professionalTag ? args.registrationInfo.professionalTag : "",
                                  yearsofExperience: args.registrationInfo.experience ? args.registrationInfo.experience : "",
                                  industry: args.registrationInfo.industry ? args.registrationInfo.industry : "",
                                  profession: args.registrationInfo.profession ? args.registrationInfo.profession : "",
                                  employerName: args.registrationInfo.employerName ? args.registrationInfo.employerName : "",
                                  mobileNumber: args.registrationInfo.contactNumber ? args.registrationInfo.contactNumber : "",
                                  facebookId: fb,
                                  linkedInId: linkedIn,
                                  twitterId: twitter,
                                  gplusId: googleplus,
                                  profilePic: args.registrationInfo.profileImage ? args.registrationInfo.profileImage : ""
                              }
                          }

                          let portfolio = {
                            userId:portfolioDetails.userId,
                            communityType:portfolioDetails.communityType,
                            portfolioDetailsId:ret,
                            portfolioIdeatorDetails:ideatorInfo
                          }
                          MlResolver.MlMutationResolver['createIdeatorPortfolio'](obj, portfolio, context, info)
                      }
                      break;

                      case "Startups":
                          let portfolio = {
                              userId: portfolioDetails.userId,
                              communityType: portfolioDetails.communityType,
                              portfolioDetailsId: ret
                          }
                          MlResolver.MlMutationResolver['createStartupPortfolio'](obj, portfolio, context, info)
                      break;

                      case "Investors": {

                          let funderInfo = {}
                          let fb = "";
                          let linkedIn="";
                          let twitter="";
                          let googleplus="";
                          if(args.registrationInfo && args.registrationInfo.socialLinksInfo && args.registrationInfo.socialLinksInfo.length>0){
                              _.each(args.registrationInfo.socialLinksInfo,function(link) {
                                  if(link.socialLinkTypeName == "Facebook"){
                                    fb = link.socialLinkUrl
                                  }else if(link.socialLinkTypeName == "Linkedin"){
                                    linkedIn = link.socialLinkUrl
                                  }
                                  else if(link.socialLinkTypeName == "Twitter"){
                                    twitter = link.socialLinkUrl
                                  }
                                  else if(link.socialLinkTypeName == "GooglePlus"){
                                    googleplus = link.socialLinkUrl
                                  }
                              })
                          }
                          if(args.registrationInfo){
                              funderInfo = {
                                firstName: args.registrationInfo.firstName ? args.registrationInfo.firstName : "",
                                lastName: args.registrationInfo.lastName ? args.registrationInfo.lastName : "",
                                emailId: args.registrationInfo.userName ? args.registrationInfo.userName : "",
                                gender: args.registrationInfo.gender ? args.registrationInfo.gender : "",
                                // dateOfBirth: args.registrationInfo.dateOfBirth ? args.registrationInfo.dateOfBirth : "",
                                qualification: args.registrationInfo.qualification ? args.registrationInfo.qualification : "",
                                employmentStatus: args.registrationInfo.employmentStatus ? args.registrationInfo.employmentStatus : "",
                                professionalTag: args.registrationInfo.professionalTag ? args.registrationInfo.professionalTag : "",
                                yearsofExperience: args.registrationInfo.experience ? args.registrationInfo.experience : "",
                                industry: args.registrationInfo.industry ? args.registrationInfo.industry : "",
                                profession: args.registrationInfo.profession ? args.registrationInfo.profession : "",
                                // employerName: args.registrationInfo.employerName ? args.registrationInfo.employerName : "",
                                mobileNumber: args.registrationInfo.contactNumber ? args.registrationInfo.contactNumber : "",
                                investmentFrom:args.registrationInfo.investingFrom?args.registrationInfo.investingFrom:"",
                                category:args.portfoliodetails.userType?args.portfoliodetails.userType:"",

                                // facebookId: fb,
                                // linkedInId: linkedIn,
                                // twitterId: twitter,
                                // gplusId: googleplus,
                                facebookUrl: fb,
                                linkedinUrl: linkedIn,
                                profilePic: args.registrationInfo.profileImage ? args.registrationInfo.profileImage : "",
                                logo:{fileUrl: args.registrationInfo.profileImage ? args.registrationInfo.profileImage : ""}
                              }
                          }
                          let portfolio = {
                            userId: portfolioDetails.userId,
                            communityType: portfolioDetails.communityType,
                            portfolioDetailsId: ret,
                            funderAbout:funderInfo
                          }
                          MlResolver.MlMutationResolver['createFunderPortfolio'](obj, portfolio, context, info)
                      }
                      break;
                    case "Service Providers": {
                      let portfolio = {
                        userId: portfolioDetails.userId,
                        communityType: portfolioDetails.communityType,
                        portfolioDetailsId: ret
                      }
                      MlResolver.MlMutationResolver['createServiceProviderPortfolio'](obj, portfolio, context, info)
                      console.log("creating service provider")
                    }
                    case "Companies": {
                      let portfolio = {
                        userId: portfolioDetails.userId,
                        communityType: portfolioDetails.communityType,
                        portfolioDetailsId: ret
                      }
                      MlResolver.MlMutationResolver['createCompanyPortfolio'](obj, portfolio, context, info)
                    }
                      break;
                    case "Institutions": {
                      let portfolio = {
                        userId: portfolioDetails.userId,
                        communityType: portfolioDetails.communityType,
                        portfolioDetailsId: ret
                      }
                      MlResolver.MlMutationResolver['createInstitutionPortfolio'](obj, portfolio, context, info)
                      console.log("creating Institutions")
                    }
                      break;
                  }
                //triggered on successfull portfolio creation
                  //MlEmailNotification.onPortfolioConfirmation(userDetails);

              }

          }
          else{
              ret = user._id;
          }
      }
  }
  catch (e){
    let code = 409;
    let response = new MlRespPayload().errorPayload(e.message, code);
    return response;
  }

  let code = 200;
  let response = new MlRespPayload().successPayload(ret, code);
  return response;
}

MlResolver.MlMutationResolver['updatePortfolio'] = (obj, args, context, info) => {
    let response;
    var privateFields = [];
    if(args.portfoliodetailsId){
        let details = MlPortfolioDetails.findOne({"_id":args.portfoliodetailsId});
        if(details && details.privateFields && details.privateFields.length){
          privateFields = portfolioValidationRepo.updatePrivateKeys(args.privateFields, args.removeKeys, details.privateFields)
        }
        else{
          privateFields = args.privateFields || [];
        }
        let detailsUpdate = mlDBController.update('MlPortfolioDetails', args.portfoliodetailsId, {status: 'WIP'}, {$set:true}, context)
      if(privateFields){
        detailsUpdate = mlDBController.update('MlPortfolioDetails', args.portfoliodetailsId, {privateFields:privateFields}, {$set:true}, context)
      }
        if(details && detailsUpdate){
            // switch (details.communityType){
              switch (details.communityCode){
                case 'IDE':{
                    response = MlResolver.MlMutationResolver['updateIdeatorPortfolio'](obj, args, context, info)
                }
                break;

                case "STU":{
                    response = MlResolver.MlMutationResolver['updateStartupPortfolio'](obj, args, context, info)
                }
                break;

                case "FUN":{
                    response = MlResolver.MlMutationResolver['updateFunderPortfolio'](obj, args, context, info)
                }
                break;
                case "SPS":{
                  response = MlResolver.MlMutationResolver['updateServiceProviderPortfolio'](obj, args, context, info)
                }
                break;
                case "CMP":{
                  response = MlResolver.MlMutationResolver['updateCompanyPortfolio'](obj, args, context, info)
                }
                break;
              case "INS":{
                response = MlResolver.MlMutationResolver['updateInstitutionPortfolio'](obj, args, context, info)
              }
                break;
            }
        }
    }

    if(response && response.success){
      portfolioValidationRepo.sendSMSonPortfolioUpdate(args.portfoliodetailsId);
    }

    return response;
}

/**
 * @params [portfolioId]
 * @usage 1)portfolio approval to go live
 *        2) process-setup if type funder
 * */
MlResolver.MlMutationResolver['approvePortfolio'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let updatedResponse;
    let regRecord = mlDBController.findOne('MlPortfolioDetails', {
        _id: args.portfoliodetailsId,
        status: 'Go Live',
      }, context) || {}
    if (!_.isEmpty(regRecord)) {
      updatedResponse = mlDBController.update('MlPortfolioDetails', args.portfoliodetailsId, {"status": "gone live", transactionUpdatedDate: new Date()}, {$set: true}, context)
      if (updatedResponse) {
        let user = mlDBController.findOne('users', {_id: regRecord.userId}, context) || {};
        let portfolioObject = _.pick(regRecord, ['userId','communityCode', 'clusterId', 'chapterId', 'subChapterId', 'communityId', 'clusterName', 'chapterName', 'subChapterName', 'communityName', 'profileId'])
        let extendObj = {
          "transactionType": "processSetup",
          "dateTime": new Date(),
          "status": "Yet To Start",
          portfolioId : args.portfoliodetailsId,
          "username": regRecord.portfolioUserName,
          "name": (user.profile && user.profile.firstName ? user.profile.firstName : "") + " " + (user.profile && user.profile.lastName ? user.profile.lastName : ""),
          mobileNumber: regRecord.contactNumber,
        }
        let portfolioDetails = _.extend(portfolioObject, extendObj)
        // orderNumberGenService.assignPortfolioId(portfolioDetails)

        /**if community is funder create process transaction by getting portfolio details*/
        if(_.isMatch(regRecord, {communityCode: 'FUN'})){
          MlResolver.MlMutationResolver['createProcessTransaction'](obj, {
            'portfoliodetails': portfolioDetails,
          }, context, info);
        }

        let code = 200;
        let result = {portfoliodetailsId: updatedResponse}
        let response = new MlRespPayload().successPayload(result, code);
        if(response){
          MlEmailNotification.portfolioSuccessfullGoLive(user);
          MlNotificationController.onGoLiveRequestApproval(user);
        }
        return response
      } else {
        let code = 401;
        let response = new MlRespPayload().errorPayload("Please validate the user", code);
        return response;
      }
    } else {
      let code = 401;
      let response = new MlRespPayload().errorPayload("Portfolio not requested for go live", code);
      return response;
    }
  }
}

MlResolver.MlMutationResolver['rejectPortfolio'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let updatedResponse = mlDBController.update('MlPortfolioDetails', args.portfoliodetailsId, {"status": "Rejected"}, {$set: true}, context)
    if(updatedResponse){
      let regRecord = mlDBController.findOne('MlPortfolioDetails', {
          _id: args.portfoliodetailsId,
          }, context) || {}
      let user = mlDBController.findOne('users', {_id: regRecord.userId}, context) || {};
      //MlEmailNotification.portfolioGoLiveDecline(user);
      MlNotificationController.onGoLiveRequestDecline(user);
    }
    return updatedResponse;
  }
}

MlResolver.MlMutationResolver["requestForGoLive"] = (obj, args, context, info) => {
  let details = MlPortfolioDetails.findOne({"_id":args.portfoliodetailsId});
  if(details && details.userId == context.userId){
    try {
      let status = "Go Live";
      let ret = mlDBController.update('MlPortfolioDetails', args.portfoliodetailsId, {status:status}, {$set: true}, context)
      if (ret) {
        let code = 200;
        let alert =  MlAlertNotification.onGoLiveRequestAdmin()
        MlNotificationController.onGoLiveRequest(details);
        let response = new MlRespPayload().successPayload(alert, code);
        return response;
      }
    }catch (e){
      let code = 409
      let response = new MlRespPayload().errorPayload(e.message, code);
      return response;
    }
  }

  let code = 400
  let response = new MlRespPayload().errorPayload("Not Found", code);
  return response;
}


MlResolver.MlMutationResolver['updatePortfolioProfilePic'] = (obj, args, context, info) => {
  if (args.portfolioId && args.communityType) {
    if( args.communityType == "IDE"){
      let updatedResponse = mlDBController.update('MlIdeatorPortfolio', {portfolioDetailsId:args.portfolioId,}, {'portfolioIdeatorDetails.profilePic': args.docUrl}, {$set:true}, context)
      return updatedResponse;
    }else if(args.communityType == "FUN"){
      let updatedResponse = mlDBController.update('MlFunderPortfolio', {portfolioDetailsId:args.portfolioId,}, {'portfolioIdeatorDetails.profilePic': args.docUrl}, {$set:true}, context)
      return updatedResponse;
    }else if(args.communityType == "STU"){
      let updatedResponse = mlDBController.update('MlStartupPortfolio', {portfolioDetailsId:args.portfolioId,}, {'portfolioIdeatorDetails.profilePic': args.docUrl}, {$set:true}, context)
      return updatedResponse;
    }

  }
}

MlResolver.MlMutationResolver['removeIdetaorProfilePic'] = (obj, args, context, info) => {
  let response;
  if(args.portfoliodetailsId){
    response = MlIdeatorPortfolio.update({portfolioDetailsId:args.portfoliodetailsId}, {$unset: { "portfolioIdeatorDetails.profilePic": ""}}, context)
  }

  return response;
}

/**
 * @moduleUsers left nav
 * @params registrationId
 * @return portfolio details
 * */

MlResolver.MlQueryResolver['fetchPortfolioByReg'] = (obj, args, context, info) => {
  var response = {}
  if (args.registrationId) {
    response = mlDBController.findOne('MlPortfolioDetails', {registrationId: args.registrationId}, context) || {}
    var subChapterId = response?response.subChapterId:''
    if(!subChapterId){
      var registrationDetails = mlDBController.findOne('MlRegistration', {_id: args.registrationId}, context) || {}
      subChapterId = registrationDetails && registrationDetails.registrationInfo && registrationDetails.registrationInfo.subChapterId ? registrationDetails && registrationDetails.registrationInfo && registrationDetails.registrationInfo.subChapterId : ''
    }
    var dataContext = MlSubChapterAccessControl.getAccessControl('VIEW', context, subChapterId, false)
    // response.canAccess = mlNonMoolyaAccess.canExternalUserViewReg(args.registrationId, context)
    response.canAccess = dataContext.hasAccess
  }
  return response
}

/**
 * @params portfolioId
 * @moduleUsage[PORTFOLIO && principleTeam in funder portfolio]
 * */
MlResolver.MlQueryResolver['fetchPortfolioClusterId'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlPortfolioDetails.findOne({"_id": args.portfoliodetailsId}) || {}
    var subChapterId = portfolio?portfolio.subChapterId:''
    // portfolio.canAccess = mlNonMoolyaAccess.canExternalUserView(args.portfoliodetailsId, context)
    var dataContext = MlSubChapterAccessControl.getAccessControl('VIEW', context, subChapterId, false)
    portfolio.canAccess = dataContext.hasAccess
    return portfolio;
  }
}

MlResolver.MlQueryResolver['fetchPortfolioImage'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    var portfolioImage = ""
    var response = ""
    let portfolio = MlPortfolioDetails.findOne({_id: args.portfoliodetailsId}) || {}
    switch (portfolio.communityCode) {
      case 'IDE': {
        response = MlResolver.MlQueryResolver['fetchIdeatorPortfolioDetails'](obj, args, context, info) || {}
        portfolioImage = response.profilePic
      }
        break;
      case "STU": {
        args.key = "aboutUs"
        response = MlResolver.MlQueryResolver['fetchStartupDetails'](obj, args, context, info) || {}
        portfolioImage = response && response.aboutUs && response.aboutUs.logo && response.aboutUs.logo.length ? response && response.aboutUs && response.aboutUs.logo[0].fileUrl : ''
      }
        break;
      case "FUN": {
        args.key = "funderAbout"
        response = MlResolver.MlQueryResolver['fetchFunderDetails'](obj, args, context, info) || {}
        portfolioImage = response && response.funderAbout && response.funderAbout.profilePic ? response.funderAbout.profilePic : ''
      }
        break;
      case "SPS": {
        args.key = "about"
        response = MlResolver.MlQueryResolver['fetchServiceProviderDetails'](obj, args, context, info) || {}
        portfolioImage = response && response.about && response.about.aboutImages && response.about.aboutImages.length ? response.about.aboutImages[0].fileUrl : ''
      }
        break;
      case "CMP": {
        args.key = "aboutUs"
        response = MlResolver.MlQueryResolver['fetchCompanyDetails'](obj, args, context, info) || {}
        portfolioImage = response && response.aboutUs && response.aboutUs.logo && response.aboutUs.logo.length ? response.aboutUs.logo[0].fileUrl : ''
      }
        break;
      case "INS": {
        args.key = "aboutUs"
        response = MlResolver.MlQueryResolver['fetchInstitutionDetails'](obj, args, context, info) || {}
        portfolioImage = response && response.aboutUs && response.aboutUs.logo && response.aboutUs.logo.length ? response.aboutUs.logo[0].fileUrl : ''
      }
        break;
    }
    portfolio.portfolioImage = portfolioImage
    return portfolio;
  }
}
