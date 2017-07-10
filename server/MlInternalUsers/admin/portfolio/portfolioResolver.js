/**
 * Created by venkatasrinag on 6/4/17.
 */
import MlResolver from "../../../commons/mlResolverDef";
import MlRespPayload from "../../../commons/mlPayload";
import MlUserContext from "../../../MlExternalUsers/mlUserContext";
import _ from "lodash";
import portfolioValidationRepo from "./portfolioValidation";

MlResolver.MlQueryResolver['fetchPortfolioDetails'] = (obj, args, context, info) => {
}

MlResolver.MlQueryResolver['fetchPortfolioDetailsByUserId'] = (obj, args, context, info) => {
  if (context.userId) {
    let defaultProfile = new MlUserContext(context.userId).userProfileDetails(context.userId)
    if (defaultProfile) {
      var defaultCommunity = defaultProfile.communityDefCode || {};
      var portfolio = MlPortfolioDetails.findOne({$and: [{userId: context.userId}, {communityCode: defaultCommunity}]})
      if (portfolio)
        return portfolio;
      else
        console.log("portfolio not found")
    }
  } else {
    console.log("NOt a valid user");
  }
}

MlResolver.MlMutationResolver['createPortfolioRequest'] = (obj, args, context, info) => {
  let user;
  let portfolioDetails = args.portfoliodetails
  let ret;
  try {
      if (portfolioDetails && portfolioDetails.userId && portfolioDetails.communityType) {
          user = MlPortfolioDetails.findOne({"$and": [{'userId': portfolioDetails.userId}, {'communityType': portfolioDetails.communityType}]})
          if (!user || portfolioDetails.communityType == 'Ideators') {
              // ret = MlPortfolioDetails.insert({...portfolioDetails})
            let user = mlDBController.findOne('users', {_id: portfolioDetails.userId}, context)

            /** introducing profile Id based on registration in portfolio from users*/
            if(user && user.profile && user.profile.externalUserProfiles){
              let reqProfile = _.find(user.profile.externalUserProfiles, {registrationId: portfolioDetails.registrationId})
              portfolioDetails['profileId'] = reqProfile.profileId || ''
            }
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
                                  emailId: args.registrationInfo.userName ? args.registrationInfo.userName : "",
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
                      console.log("creating service provider")
                    }
                      break;
                  }
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
            switch (details.communityType){
                case 'Ideators':{
                    response = MlResolver.MlMutationResolver['updateIdeatorPortfolio'](obj, args, context, info)
                }
                break;

                case "Startups":{
                    response = MlResolver.MlMutationResolver['updateStartupPortfolio'](obj, args, context, info)
                }
                break;

                case "Investors":{
                    response = MlResolver.MlMutationResolver['updateFunderPortfolio'](obj, args, context, info)
                }
                break;
            }
        }
    }

    return response;
}

MlResolver.MlMutationResolver['approvePortfolio'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let updatedResponse;
    let regRecord = mlDBController.findOne('MlPortfolioDetails', {
        _id: args.portfoliodetailsId,
        status: 'Go Live',
      }, context) || {}
    if (!_.isEmpty(regRecord)) {
      updatedResponse = mlDBController.update('MlPortfolioDetails', args.portfoliodetailsId, {"status": "gone live"}, {$set: true}, context)
      if (updatedResponse) {
        let user = mlDBController.findOne('users', {_id: regRecord.userId}, context) || {};
        let portfolioObject = _.pick(regRecord, ['userId','communityCode', 'clusterId', 'chapterId', 'subChapterId', 'communityId', 'clusterName', 'chapterName', 'subChapterName', 'communityName'])
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

        if(_.isMatch(regRecord, {communityCode: 'FUN'})){
          MlResolver.MlMutationResolver['createProcessTransaction'](obj, {
            'portfoliodetails': portfolioDetails,
          }, context, info);
        }

        let code = 200;
        let result = {portfoliodetailsId: updatedResponse}
        let response = new MlRespPayload().successPayload(result, code);
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
        let response = new MlRespPayload().successPayload("Updated Successfully", code);
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


