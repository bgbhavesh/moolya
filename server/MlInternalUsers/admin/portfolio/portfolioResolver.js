/**
 * Created by venkatasrinag on 6/4/17.
 */
import MlResolver from "../../../commons/mlResolverDef";
import MlRespPayload from "../../../commons/mlPayload";
import MlUserContext from "../../../MlExternalUsers/mlUserContext";
import _ from "lodash";

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
                                  if(link.socialLinkType == "FACEBOOK"){
                                      fb = link.socialLinkUrl
                                  }else if(link.socialLinkType == "LINKEDIN"){
                                      linkedIn = link.socialLinkUrl
                                  }
                                  else if(link.socialLinkType == "TWITTER"){
                                      twitter = link.socialLinkUrl
                                  }
                                  else if(link.socialLinkType == "GOOGLEPLUS"){
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

                      case "Funders": {
                          let funderInfo = {}
                          let fb = "";
                          let linkedIn="";
                          let twitter="";
                          let googleplus="";
                          if(args.registrationInfo && args.registrationInfo.socialLinksInfo && args.registrationInfo.socialLinksInfo.length>0){
                              _.each(args.registrationInfo.socialLinksInfo,function(link) {
                                  if(link.socialLinkType == "FACEBOOK"){
                                    fb = link.socialLinkUrl
                                  }else if(link.socialLinkType == "LINKEDIN"){
                                    linkedIn = link.socialLinkUrl
                                  }
                                  else if(link.socialLinkType == "TWITTER"){
                                    twitter = link.socialLinkUrl
                                  }
                                  else if(link.socialLinkType == "GOOGLEPLUS"){
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
                                // facebookId: fb,
                                // linkedInId: linkedIn,
                                // twitterId: twitter,
                                // gplusId: googleplus,
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
    if(args.portfoliodetailsId){
        let details = MlPortfolioDetails.findOne({"_id":args.portfoliodetailsId});
        if(details){
            switch (details.communityType){
                case 'Ideators':{
                    response = MlResolver.MlMutationResolver['updateIdeatorPortfolio'](obj, args, context, info)
                }
                break;

                case "Startups":{
                    response = MlResolver.MlMutationResolver['updateStartupPortfolio'](obj, args, context, info)
                }
                break;

                case "Funders":{
                    response = MlResolver.MlMutationResolver['updateFunderPortfolio'](obj, args, context, info)
                }
                break;
            }
        }
    }

    return response;
}

MlResolver.MlMutationResolver['approvePortfolio'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.portfoliodetailsId) {
    let updatedResponse;
    let regRecord = mlDBController.findOne('MlPortfolioDetails', {_id: args.portfoliodetailsId}, context) || {};
    if(regRecord.status != "Approved"){
      updatedResponse = mlDBController.update('MlPortfolioDetails', args.portfoliodetailsId, {"status": "Approved"}, {$set: true}, context)
    }else{
      let code = 401;
      let response = new MlRespPayload().errorPayload("Portfolio already approved", code);
      return response;
    }
    if(updatedResponse===1) {
      let user = mlDBController.findOne('users', {_id: regRecord.userId}, context) || {};
      let portfolioDetails = {
        "transactionType": "processSetup",
        "communityType": regRecord.communityName,
        "communityCode": regRecord.communityCode,
        "clusterId": regRecord.clusterId,
        "chapterId": regRecord.chapterId,
        "subChapterId": regRecord.subChapterId,
        "communityId": regRecord.communityId,
        clusterName: regRecord.clusterName,
        chapterName: regRecord.chapterName,
        subChapterName: regRecord.subChapterName,
        communityName: regRecord.communityName,
        "dateTime": new Date(),
        "status": "Yet To Start",
        "userId": regRecord.userId,
        "username": regRecord.portfolioUserName,
        "name": (user.profile&&user.profile.firstName?user.profile.firstName:"")+" "+(user.profile&&user.profile.lastName?user.profile.lastName:""),
        mobileNumber: regRecord.contactNumber,
      }
      orderNumberGenService.assignPortfolioId(portfolioDetails)

      try {
        MlResolver.MlMutationResolver['createProcessTransaction'](obj, {
          'portfoliodetails': portfolioDetails,
        }, context, info); //portfolio request
      } catch (e) {
        console.log(e);
        //send error response;
      }
    }
      if(updatedResponse===1){
        let code = 200;
        let result = {portfoliodetailsId : updatedResponse}
        let response = new MlRespPayload().successPayload(result, code);
        return response
      }else{
        let code = 401;
        let response = new MlRespPayload().errorPayload("Please validate the user", code);
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
      let ret = mlDBController.update('MlPortfolioDetails', {"_id": args.portfoliodetailsId}, {status:status}, {$set: true}, context)
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
