/**
 * Created by venkatasrinag on 6/4/17.
 */
import MlResolver from '../../../commons/mlResolverDef';
import MlRespPayload from '../../../commons/mlPayload';
import MlUserContext from '../../../MlExternalUsers/mlUserContext';
import _ from 'lodash';
import portfolioValidationRepo from './portfolioValidation';
import MlEmailNotification from '../../../mlNotifications/mlEmailNotifications/mlEMailNotification';
import MlAlertNotification from '../../../mlNotifications/mlAlertNotifications/mlAlertNotification'
import MlSubChapterAccessControl from '../../../mlAuthorization/mlSubChapterAccessControl'
import { getCommunityName } from '../../../commons/utils';
import MlNotificationController from '../../../mlNotifications/mlAppNotifications/mlNotificationsController'
import mlSmsConstants from '../../../mlNotifications/mlSmsNotifications/mlSmsConstants'
import mlRegistrationRepo from '../../admin/registration/mlRegistrationRepo';
import MlSiteMapInsertion from '../../../MlExternalUsers/microSite/microSiteRepo/MlSiteMapInsertion'
import MlSMSNotification from '../../../mlNotifications/mlSmsNotifications/mlSMSNotification'

/**
 * @module [externaluser portfolio Landing]
 * @params [context.userId]
 * */
MlResolver.MlQueryResolver.fetchPortfolioDetailsByUserId = (obj, args, context, info) => {
  if (context.userId) {
    const defaultProfile = new MlUserContext(context.userId).userProfileDetails(context.userId)
    if (defaultProfile) {
      const defaultCommunity = defaultProfile.communityDefCode || {};
      const portfolio = MlPortfolioDetails.findOne({ $and: [{ userId: context.userId }, { communityCode: defaultCommunity }, { profileId: defaultProfile.profileId }] })
      if (portfolio) {
        const data = MlResolver.MlQueryResolver.fetchPortfolioImage(obj, { portfoliodetailsId: portfolio._id }, context, info);
        portfolio.portfolioImage = data.portfolioImage
        return portfolio;
      }
      console.log('portfolio not found')
    }
  } else {
    console.log('NOt a valid user');
  }
}

/**
 * request for portfolio creation
 * */

MlResolver.MlMutationResolver.createPortfolioRequest = (obj, args, context, info) => {
  let user;
  const portfolioDetails = args.portfoliodetails
  let ret;
  const updateRecord = {}
  try {
    if (portfolioDetails && portfolioDetails.userId && portfolioDetails.communityCode) {
      /** introducing profile Id based on registration in portfolio from users and creating portfolio based on profileId */
      const userDetails = mlDBController.findOne('users', { _id: portfolioDetails.userId }, context)
      if (userDetails && userDetails.profile && userDetails.profile.externalUserProfiles) {
        const reqProfile = _.find(userDetails.profile.externalUserProfiles, { registrationId: portfolioDetails.registrationId })
        portfolioDetails.profileId = reqProfile.profileId || ''
      }
      user = MlPortfolioDetails.findOne({ $and: [{ userId: portfolioDetails.userId }, { communityType: portfolioDetails.communityType }, { profileId: portfolioDetails.profileId }] })
      if (!user || portfolioDetails.communityCode == 'IDE') {
        portfolioDetails.createdAt = new Date();
        ret = mlDBController.insert('MlPortfolioDetails', portfolioDetails, context)
        if (ret) {
          // changing status to portfolio kickoff
          mlRegistrationRepo.updateStatus(updateRecord, 'REG_PORT_KICKOFF');
          const updatedResponse = mlDBController.update('MlPortfolioDetails', ret, updateRecord, { $set: true }, context)

          switch (portfolioDetails.communityCode) {
            case 'IDE': {
              let ideatorInfo = {}
              let fb = '';
              let linkedIn = '';
              let twitter = '';
              let googleplus = '';
              if (args.registrationInfo && args.registrationInfo.socialLinksInfo && args.registrationInfo.socialLinksInfo.length > 0) {
                _.each(args.registrationInfo.socialLinksInfo, (link) => {
                  if (link.socialLinkTypeName == 'Facebook') {
                    fb = link.socialLinkUrl
                  } else if (link.socialLinkTypeName == 'Linkedin') {
                    linkedIn = link.socialLinkUrl
                  } else if (link.socialLinkTypeName == 'Twitter') {
                    twitter = link.socialLinkUrl
                  } else if (link.socialLinkTypeName == 'GooglePlus') {
                    googleplus = link.socialLinkUrl
                  }
                })
              }
              if (args.registrationInfo) {
                ideatorInfo = {
                  firstName: args.registrationInfo.firstName ? args.registrationInfo.firstName : '',
                  lastName: args.registrationInfo.lastName ? args.registrationInfo.lastName : '',
                  emailId: args.registrationInfo.userName ? args.registrationInfo.userName : args.registrationInfo.emailId,
                  gender: args.registrationInfo.gender ? args.registrationInfo.gender : '',
                  dateOfBirth: args.registrationInfo.dateOfBirth ? args.registrationInfo.dateOfBirth : '',
                  qualification: args.registrationInfo.qualification ? args.registrationInfo.qualification : '',
                  employmentStatus: args.registrationInfo.employmentStatus ? args.registrationInfo.employmentStatus : '',
                  professionalTag: args.registrationInfo.professionalTag ? args.registrationInfo.professionalTag : '',
                  yearsofExperience: args.registrationInfo.experience ? args.registrationInfo.experience : '',
                  industry: args.registrationInfo.industry ? args.registrationInfo.industry : '',
                  profession: args.registrationInfo.profession ? args.registrationInfo.profession : '',
                  employerName: args.registrationInfo.employerName ? args.registrationInfo.employerName : '',
                  mobileNumber: args.registrationInfo.contactNumber ? args.registrationInfo.contactNumber : '',
                  facebookId: fb,
                  linkedInId: linkedIn,
                  twitterId: twitter,
                  gplusId: googleplus,
                  profilePic: args.registrationInfo.profileImage ? args.registrationInfo.profileImage : ''
                }
              }

              const portfolio = {
                userId: portfolioDetails.userId,
                communityType: portfolioDetails.communityType,
                portfolioDetailsId: ret,
                portfolioIdeatorDetails: ideatorInfo
              }
              MlResolver.MlMutationResolver.createIdeatorPortfolio(obj, portfolio, context, info)
            }
              break;

            case 'STU':
              const portfolio = {
                userId: portfolioDetails.userId,
                communityType: portfolioDetails.communityType,
                portfolioDetailsId: ret
              }
              MlResolver.MlMutationResolver.createStartupPortfolio(obj, portfolio, context, info)
              break;

            case 'FUN': {
              let funderInfo = {}
              let fb = '';
              let linkedIn = '';
              let twitter = '';
              let googleplus = '';
              if (args.registrationInfo && args.registrationInfo.socialLinksInfo && args.registrationInfo.socialLinksInfo.length > 0) {
                _.each(args.registrationInfo.socialLinksInfo, (link) => {
                  if (link.socialLinkTypeName == 'Facebook') {
                    fb = link.socialLinkUrl
                  } else if (link.socialLinkTypeName == 'Linkedin') {
                    linkedIn = link.socialLinkUrl
                  } else if (link.socialLinkTypeName == 'Twitter') {
                    twitter = link.socialLinkUrl
                  } else if (link.socialLinkTypeName == 'GooglePlus') {
                    googleplus = link.socialLinkUrl
                  }
                })
              }
              if (args.registrationInfo) {
                funderInfo = {
                  firstName: args.registrationInfo.firstName ? args.registrationInfo.firstName : '',
                  lastName: args.registrationInfo.lastName ? args.registrationInfo.lastName : '',
                  emailId: args.registrationInfo.userName ? args.registrationInfo.userName : '',
                  gender: args.registrationInfo.gender ? args.registrationInfo.gender : '',
                  // dateOfBirth: args.registrationInfo.dateOfBirth ? args.registrationInfo.dateOfBirth : "",
                  qualification: args.registrationInfo.qualification ? args.registrationInfo.qualification : '',
                  employmentStatus: args.registrationInfo.employmentStatus ? args.registrationInfo.employmentStatus : '',
                  professionalTag: args.registrationInfo.professionalTag ? args.registrationInfo.professionalTag : '',
                  yearsofExperience: args.registrationInfo.experience ? args.registrationInfo.experience : '',
                  industry: args.registrationInfo.industry ? args.registrationInfo.industry : '',
                  profession: args.registrationInfo.profession ? args.registrationInfo.profession : '',
                  // employerName: args.registrationInfo.employerName ? args.registrationInfo.employerName : "",
                  mobileNumber: args.registrationInfo.contactNumber ? args.registrationInfo.contactNumber : '',
                  investmentFrom: args.registrationInfo.investingFrom ? args.registrationInfo.investingFrom : '',
                  category: args.portfoliodetails.userType ? args.portfoliodetails.userType : '',

                  // facebookId: fb,
                  // linkedInId: linkedIn,
                  // twitterId: twitter,
                  // gplusId: googleplus,
                  facebookUrl: fb,
                  linkedinUrl: linkedIn,
                  profilePic: args.registrationInfo.profileImage ? args.registrationInfo.profileImage : '',
                  logo: { fileUrl: args.registrationInfo.profileImage ? args.registrationInfo.profileImage : '' }
                }
              }
              const portfolio = {
                userId: portfolioDetails.userId,
                communityType: portfolioDetails.communityType,
                portfolioDetailsId: ret,
                funderAbout: funderInfo
              }
              MlResolver.MlMutationResolver.createFunderPortfolio(obj, portfolio, context, info)
            }
              break;
            case 'SPS': {
              const portfolio = {
                userId: portfolioDetails.userId,
                communityType: portfolioDetails.communityType,
                portfolioDetailsId: ret
              }
              MlResolver.MlMutationResolver.createServiceProviderPortfolio(obj, portfolio, context, info)
              console.log('creating service provider')
            }
            case 'CMP': {
              const portfolio = {
                userId: portfolioDetails.userId,
                communityType: portfolioDetails.communityType,
                portfolioDetailsId: ret
              }
              MlResolver.MlMutationResolver.createCompanyPortfolio(obj, portfolio, context, info)
            }
              break;
            case 'INS': {
              const portfolio = {
                userId: portfolioDetails.userId,
                communityType: portfolioDetails.communityType,
                portfolioDetailsId: ret
              }
              MlResolver.MlMutationResolver.createInstitutionPortfolio(obj, portfolio, context, info)
              console.log('creating Institutions')
            }
              break;
          }
          // triggered on successfull portfolio creation
          // MlEmailNotification.onPortfolioConfirmation(userDetails);
        }
      } else {
        ret = user._id;
      }
    }
  } catch (e) {
    const code = 409;
    const response = new MlRespPayload().errorPayload(e.message, code);
    return response;
  }

  const code = 200;
  const response = new MlRespPayload().successPayload(ret, code);
  return response;
}

MlResolver.MlMutationResolver.updatePortfolio = (obj, args, context, info) => {
  let response;
  let privateFields = [];
  const updateRecord = {}
  if (args.portfoliodetailsId) {
    const details = MlPortfolioDetails.findOne({ _id: args.portfoliodetailsId });
    if (details && details.privateFields && details.privateFields.length) {
      privateFields = portfolioValidationRepo.updatePrivateKeys(args.privateFields, args.removeKeys, details.privateFields)
    } else {
      privateFields = args.privateFields || [];
    }
    // let detailsUpdate = mlDBController.update('MlPortfolioDetails', args.portfoliodetailsId, {status: 'WIP', transactionUpdatedDate:new Date()}, {$set:true}, context)
    mlRegistrationRepo.updateStatus(updateRecord, 'REG_PORT_PEND');
    updateRecord.transactionUpdatedDate = new Date();
    let detailsUpdate = mlDBController.update('MlPortfolioDetails', args.portfoliodetailsId, updateRecord, { $set: true }, context)
    if (privateFields) {
      detailsUpdate = mlDBController.update('MlPortfolioDetails', args.portfoliodetailsId, { privateFields }, { $set: true }, context)
    }
    if (details && detailsUpdate) {
      // switch (details.communityType){
      switch (details.communityCode) {
        case 'IDE': {
          response = MlResolver.MlMutationResolver.updateIdeatorPortfolio(obj, args, context, info)
        }
          break;

        case 'STU': {
          response = MlResolver.MlMutationResolver.updateStartupPortfolio(obj, args, context, info)
        }
          break;

        case 'FUN': {
          response = MlResolver.MlMutationResolver.updateFunderPortfolio(obj, args, context, info)
        }
          break;
        case 'SPS': {
          response = MlResolver.MlMutationResolver.updateServiceProviderPortfolio(obj, args, context, info)
        }
          break;
        case 'CMP': {
          response = MlResolver.MlMutationResolver.updateCompanyPortfolio(obj, args, context, info)
        }
          break;
        case 'INS': {
          response = MlResolver.MlMutationResolver.updateInstitutionPortfolio(obj, args, context, info)
        }
          break;
      }
    }
  }

  if (response && response.success) {
    MlSMSNotification.portfolioUpdate(args.portfoliodetailsId);
  }

  return response;
}

/**
 * @params [portfolioId]
 * @usage 1)portfolio approval to go live
 *        2) process-setup if type funder
 * */
MlResolver.MlMutationResolver.approvePortfolio = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let updatedResponse;
    const updateRecord = {}
    const regRecord = mlDBController.findOne('MlPortfolioDetails', {
      _id: args.portfoliodetailsId,
      status: 'PORT_GO_LIVE_PEND'
    }, context) || {}
    if (!_.isEmpty(regRecord)) {
      mlRegistrationRepo.updateStatus(updateRecord, 'PORT_LIVE_NOW');
      const updatedResponse = mlDBController.update('MlPortfolioDetails', args.portfoliodetailsId, updateRecord, { $set: true }, context)
      // updatedResponse = mlDBController.update('MlPortfolioDetails', args.portfoliodetailsId, {"status": "PORT_LIVE_NOW", transactionUpdatedDate: new Date()}, {$set: true}, context)
      if (updatedResponse) {
        const user = mlDBController.findOne('users', { _id: regRecord.userId }, context) || {};
        const portfolioObject = _.pick(regRecord, ['userId', 'communityCode', 'clusterId', 'chapterId', 'subChapterId', 'communityId', 'clusterName', 'chapterName', 'subChapterName', 'communityName', 'profileId'])
        const extendObj = {
          transactionType: 'processSetup',
          dateTime: new Date(),
          status: 'Yet To Start',
          portfolioId: args.portfoliodetailsId,
          username: regRecord.portfolioUserName,
          name: `${user.profile && user.profile.firstName ? user.profile.firstName : ''} ${user.profile && user.profile.lastName ? user.profile.lastName : ''}`,
          mobileNumber: regRecord.contactNumber
        }
        const portfolioDetails = _.extend(portfolioObject, extendObj)
        // orderNumberGenService.assignPortfolioId(portfolioDetails)

        /** if community is funder create process transaction by getting portfolio details */
        if (_.isMatch(regRecord, { communityCode: 'FUN' })) {
          MlResolver.MlMutationResolver.createProcessTransaction(obj, {
            portfoliodetails: portfolioDetails
          }, context, info);
        }

        const code = 200;
        const result = { portfoliodetailsId: updatedResponse }
        const response = new MlRespPayload().successPayload(result, code);
        if (response) {
          const urlFormationObject = {
            clusterName: regRecord.clusterName.replace(/ /g, '-'),
            chapterName: regRecord.chapterName.replace(/ /g, '-'),
            subChapterName: regRecord.subChapterName.replace(/ /g, '-'),
            communityName: regRecord.communityName.replace(/ /g, '-')
          }
          const firstNameUser = user.profile.firstName ? user.profile.firstName : '';
          const lastNameUser = user.profile && user.profile.lastName ? user.profile.lastName : '';
          let uniqueSeoName = `${firstNameUser}-${lastNameUser}`;
          uniqueSeoName = uniqueSeoName.replace(/ /g, '-');
          const date = new Date();
          const siteMapDetails = {
            userId: regRecord.userId,
            portFolioId: args.portfoliodetailsId,
            priority: 1,
            changeFreq: 'daily',
            uniqueSeoName,
            lastmodISO: date.toISOString()
          }

          MlSiteMapInsertion.mlCreateSEOUrl(siteMapDetails, urlFormationObject);
          MlEmailNotification.portfolioSuccessfullGoLive(user);
          MlNotificationController.onGoLiveRequestApproval(user);
          MlSMSNotification.portfolioGoLiveRequest(args.portfoliodetailsId)
          // if(response && response.success){
          if (response && response.success) {
            const defaultProfile = new MlUserContext().userProfileDetails(portfolioDetails.userId)
            const msg = `Your Go-Live request for ${defaultProfile.communityDefName} has been approved on${new Date()}.` + 'Login to moolya for next steps.'
            // portfolioValidationRepo.sendSMSforPortfolio(args.portfoliodetailsId, msg);
          }
        }
        return response
      }
      const code = 401;
      const response = new MlRespPayload().errorPayload('Please validate the user details', code);
      return response;
    }
    const code = 401;
    const response = new MlRespPayload().errorPayload("Portfolio not requested for 'go live'", code);
    return response;
  }
}

MlResolver.MlMutationResolver.rejectPortfolio = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    const updatedResponse = mlDBController.update('MlPortfolioDetails', args.portfoliodetailsId, { status: 'Rejected' }, { $set: true }, context)
    if (updatedResponse) {
      const regRecord = mlDBController.findOne('MlPortfolioDetails', {
        _id: args.portfoliodetailsId
      }, context) || {}
      const user = mlDBController.findOne('users', { _id: regRecord.userId }, context) || {};
      // MlEmailNotification.portfolioGoLiveDecline(user);
      MlNotificationController.onGoLiveRequestDecline(user);
      if (response && response.success) {
        const defaultProfile = new MlUserContext().userProfileDetails(portfolioDetails.userId)
        const msg = `Your Go-Live request for ${defaultProfile.communityDefName} has been declined on${new Date()}.` + 'Login to moolya for next steps.'
        // portfolioValidationRepo.sendSMSforPortfolio(args.portfoliodetailsId, msg);
      }
    }
    return updatedResponse;
  }
}

MlResolver.MlMutationResolver.requestForGoLive = (obj, args, context, info) => {
  const details = MlPortfolioDetails.findOne({ _id: args.portfoliodetailsId });
  const updateRecord = {}
  if (details && details.userId == context.userId) {
    try {
      // let status = "Go Live";
      // let ret = mlDBController.update('MlPortfolioDetails', args.portfoliodetailsId, {status:status}, {$set: true}, context)
      mlRegistrationRepo.updateStatus(updateRecord, 'PORT_GO_LIVE_PEND');
      const ret = mlDBController.update('MlPortfolioDetails', args.portfoliodetailsId, updateRecord, { $set: true }, context)
      if (ret) {
        const code = 200;
        const alert = MlAlertNotification.onGoLiveRequestAdmin()
        MlNotificationController.onGoLiveRequest(details);
        const response = new MlRespPayload().successPayload(alert, code);
        return response;
      }
    } catch (e) {
      const code = 409
      const response = new MlRespPayload().errorPayload(e.message, code);
      return response;
    }
  }

  const code = 400
  const response = new MlRespPayload().errorPayload('Not Found', code);
  return response;
}


MlResolver.MlMutationResolver.updatePortfolioProfilePic = (obj, args, context, info) => {
  if (args.portfolioId && args.communityType) {
    if (args.communityType == 'IDE') {
      const updatedResponse = mlDBController.update('MlIdeatorPortfolio', { portfolioDetailsId: args.portfolioId }, { 'portfolioIdeatorDetails.profilePic': args.docUrl }, { $set: true }, context)
      return updatedResponse;
    } else if (args.communityType == 'FUN') {
      const updatedResponse = mlDBController.update('MlFunderPortfolio', { portfolioDetailsId: args.portfolioId }, { 'portfolioIdeatorDetails.profilePic': args.docUrl }, { $set: true }, context)
      return updatedResponse;
    } else if (args.communityType == 'STU') {
      const updatedResponse = mlDBController.update('MlStartupPortfolio', { portfolioDetailsId: args.portfolioId }, { 'portfolioIdeatorDetails.profilePic': args.docUrl }, { $set: true }, context)
      return updatedResponse;
    }
  }
}

MlResolver.MlMutationResolver.removeIdetaorProfilePic = (obj, args, context, info) => {
  let response;
  if (args.portfoliodetailsId) {
    response = MlIdeatorPortfolio.update({ portfolioDetailsId: args.portfoliodetailsId }, { $unset: { 'portfolioIdeatorDetails.profilePic': '' } }, context)
  }

  return response;
}

/**
 * @moduleUsers left nav
 * @params registrationId
 * @return portfolio details
 * */

MlResolver.MlQueryResolver.fetchPortfolioByReg = (obj, args, context, info) => {
  let response = {}
  if (args.registrationId) {
    response = mlDBController.findOne('MlPortfolioDetails', { registrationId: args.registrationId }, context) || {}
    let subChapterId = response ? response.subChapterId : ''
    if (!subChapterId) {
      const registrationDetails = mlDBController.findOne('MlRegistration', { _id: args.registrationId }, context) || {}
      subChapterId = registrationDetails && registrationDetails.registrationInfo && registrationDetails.registrationInfo.subChapterId ? registrationDetails && registrationDetails.registrationInfo && registrationDetails.registrationInfo.subChapterId : ''
    }
    const dataContext = MlSubChapterAccessControl.getAccessControl('VIEW', context, subChapterId, false)
    response.canAccess = dataContext.hasAccess
  }
  return response
}

/**
 * @params portfolioId
 * @moduleUsage[PORTFOLIO && principleTeam in funder portfolio]
 * */
MlResolver.MlQueryResolver.findPortfolioDetails = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    const portfolio = MlPortfolioDetails.findOne({ _id: args.portfoliodetailsId }) || {}
    const subChapterId = portfolio ? portfolio.subChapterId : ''
    const dataContext = MlSubChapterAccessControl.getAccessControl('VIEW', context, subChapterId, false)
    portfolio.canAccess = dataContext.hasAccess
    return portfolio;
  }
}

MlResolver.MlQueryResolver.fetchPortfolioImage = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolioImage = ''
    let response = ''
    const portfolio = MlPortfolioDetails.findOne({ _id: args.portfoliodetailsId }) || {}
    const defaultProfile = new MlUserContext().userProfileDetails(portfolio.userId)
    switch (portfolio.communityCode) {
      case 'IDE': {
        response = MlResolver.MlQueryResolver.fetchIdeatorPortfolioDetails(obj, args, context, info) || {}
        portfolioImage = response.profilePic
      }
        break;
      case 'STU': {
        args.key = 'aboutUs'
        response = MlResolver.MlQueryResolver.fetchStartupDetails(obj, args, context, info) || {}
        portfolioImage = response && response.aboutUs && response.aboutUs.logo && response.aboutUs.logo.length ? response && response.aboutUs && response.aboutUs.logo[0].fileUrl : ''
      }
        break;
      case 'FUN': {
        args.key = 'funderAbout'
        response = MlResolver.MlQueryResolver.fetchFunderDetails(obj, args, context, info) || {}
        portfolioImage = response && response.funderAbout && response.funderAbout.profilePic ? response.funderAbout.profilePic : ''
      }
        break;
      case 'SPS': {
        args.key = 'about'
        response = MlResolver.MlQueryResolver.fetchServiceProviderDetails(obj, args, context, info) || {}
        portfolioImage = response && response.about && response.about.aboutImages && response.about.aboutImages.length ? response.about.aboutImages[0].fileUrl : ''
      }
        break;
      case 'CMP': {
        args.key = 'aboutUs'
        response = MlResolver.MlQueryResolver.fetchCompanyDetails(obj, args, context, info) || {}
        portfolioImage = response && response.aboutUs && response.aboutUs.logo && response.aboutUs.logo.length ? response.aboutUs.logo[0].fileUrl : ''
      }
        break;
      case 'INS': {
        args.key = 'aboutUs'
        response = MlResolver.MlQueryResolver.fetchInstitutionDetails(obj, args, context, info) || {}
        portfolioImage = response && response.aboutUs && response.aboutUs.logo && response.aboutUs.logo.length ? response.aboutUs.logo[0].fileUrl : ''
      }
        break;
    }
    portfolio.portfolioImage = portfolioImage
    portfolio.portfolioUserName = `${defaultProfile.firstName} ${defaultProfile.lastName}` /** attached first and last name to portfolioUserName */
    portfolio.communityType = getCommunityName(portfolio.communityCode)
    return portfolio;
  }
}

// todo: // need to merge all conditions of one community in one part only
MlResolver.MlMutationResolver.removePortfolioFileUrl = (obj, args, context, info) => {
  let response
  const portfolio = MlPortfolioDetails.findOne({ _id: args.portfoliodetailsId }) || {}
  if (args.portfoliodetailsId) {
    switch (portfolio.communityCode) {
      case 'STU':
        {
          if (args.tabName === 'data') {
            const startupPortfolioData = MlStartupPortfolio.findOne({ portfolioDetailsId: args.portfoliodetailsId }) || {};
            if (startupPortfolioData && startupPortfolioData.data) {
              _.remove(startupPortfolioData.data[args.typeOfData], { fileUrl: args.fileUrl })
              response = mlDBController.update('MlStartupPortfolio', { portfolioDetailsId: args.portfoliodetailsId }, { data: startupPortfolioData.data }, { $set: true }, context)
              return response
            }
          }
        }
        break;
      case 'CMP':
        {
          if (args.tabName === 'data') {
            const companyPortfolioData = MlCompanyPortfolio.findOne({ portfolioDetailsId: args.portfoliodetailsId }) || {};
            if (companyPortfolioData && companyPortfolioData.data) {
              _.remove(companyPortfolioData.data[args.typeOfData], { fileUrl: args.fileUrl })
              response = mlDBController.update('MlCompanyPortfolio', { portfolioDetailsId: args.portfoliodetailsId }, { data: companyPortfolioData.data }, { $set: true }, context)
              return response
            }
          }
        }
        break;
      case 'INS': {
        if (args.tabName === 'data') {
          const institutionPortfolioData = MlInstitutionPortfolio.findOne({ portfolioDetailsId: args.portfoliodetailsId }) || {};
          if (institutionPortfolioData && institutionPortfolioData.data) {
            _.remove(institutionPortfolioData.data[args.typeOfData], { fileUrl: args.fileUrl })
            response = mlDBController.update('MlInstitutionPortfolio', { portfolioDetailsId: args.portfoliodetailsId }, { data: institutionPortfolioData.data }, { $set: true }, context)
            return response
          }
        }
      }
        break;
      case 'IDE': {
        const ideatorPortfolioData = MlIdeatorPortfolio.findOne({ portfolioDetailsId: args.portfoliodetailsId }) || {};
        if (ideatorPortfolioData && ideatorPortfolioData[args.tabName]) {
          _.remove(ideatorPortfolioData[args.tabName][args.typeOfData], { fileUrl: args.fileUrl })
          response = mlDBController.update('MlIdeatorPortfolio', { portfolioDetailsId: args.portfoliodetailsId }, { [args.tabName]: ideatorPortfolioData[args.tabName] }, { $set: true }, context)
          return response
        }
      }
        break;
      default:
        break;
    }
  }
}
