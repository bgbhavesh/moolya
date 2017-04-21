/**
 * Created by venkatasrinag on 6/4/17.
 */
import MlResolver from "../mlAdminResolverDef";
import MlRespPayload from "../../../commons/mlPayload";
import _ from "lodash";

MlResolver.MlQueryResolver['fetchPortfolioDetails'] = (obj, args, context, info) => {
}


MlResolver.MlMutationResolver['createPortfolioRequest'] = (obj, args, context, info) => {
  let user;
  let portfolioDetails = args.portfoliodetails
  let ret;
  try {
      if (portfolioDetails && portfolioDetails.userId && portfolioDetails.communityType) {
          user = MlPortfolioDetails.findOne({"$and": [{'userId': portfolioDetails.userId}, {'communityType': portfolioDetails.communityType}]})
          if (!user) {
              ret = MlPortfolioDetails.insert({...portfolioDetails})
              if(ret){
                  switch (portfolioDetails.communityType){
                    case "Ideators":{
                      let fb = "";
                      let linkedIn="";
                      let twitter="";
                      let googleplus="";
                      if(args.registrationInfo.socialLinksInfo && args.registrationInfo.socialLinksInfo.length>0){
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

                      let ideatorInfo={
                        firstName:args.registrationInfo.firstName?args.registrationInfo.firstName:"",
                        lastName:args.registrationInfo.lastName?args.registrationInfo.lastName:"",
                        emailId:args.registrationInfo.userName?args.registrationInfo.userName:"",
                        gender:args.registrationInfo.gender?args.registrationInfo.gender:"",
                        dateOfBirth:args.registrationInfo.dateOfBirth?args.registrationInfo.dateOfBirth:"",
                        qualification:args.registrationInfo.qualification?args.registrationInfo.qualification:"",
                        employmentStatus:args.registrationInfo.employmentStatus?args.registrationInfo.employmentStatus:"",
                        professionalTag:args.registrationInfo.professionalTag?args.registrationInfo.professionalTag:"",
                        yearsofExperience:args.registrationInfo.experience?args.registrationInfo.experience:"",
                        industry:args.registrationInfo.industry?args.registrationInfo.industry:"",
                        profession:args.registrationInfo.profession?args.registrationInfo.profession:"",
                        employerName:args.registrationInfo.employerName?args.registrationInfo.employerName:"",
                        mobileNumber:args.registrationInfo.contactNumber?args.registrationInfo.contactNumber:"",
                        facebookId:fb,
                        linkedInId:linkedIn,
                        twitterId:twitter,
                        gplusId:googleplus,
                        profilePic:args.registrationInfo.profileImage?args.registrationInfo.profileImage:""
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
                  // response = MlResolver.MlMutationResolver['updateStartupPortfolio'](obj, args, context, info)
              }
              break;
            }
        }
    }

    return response;
}
