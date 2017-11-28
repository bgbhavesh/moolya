import mlSMSConst from '../../mlNotifications/mlSmsNotifications/mlSmsConstants'
import mlSmsController from '../../mlNotifications/mlSmsNotifications/mlSmsController'
import _ from 'underscore';
import MlUserContext from '../../MlExternalUsers/mlUserContext';


const MlSMSNotification = class MlSMSNotification {
  static sendSMSonKYCApproved(regRecord) {
    const mobileNumber = regRecord && regRecord.registrationInfo && regRecord.registrationInfo.contactNumber ? regRecord.registrationInfo.contactNumber : '';
    const countryCode = regRecord && regRecord.registrationInfo && regRecord.registrationInfo.countryId ? regRecord.registrationInfo.countryId : '';
    const obj = _.find(mlSMSConst, 'KYC_APPROVED')
    const msg = obj.KYC_APPROVED
    mlSmsController.sendSMS(msg, countryCode, mobileNumber)
  }

  static sendSMSonKYCDeclined(regRecord) {
    const mobileNumber = regRecord && regRecord.registrationInfo && regRecord.registrationInfo.contactNumber ? regRecord.registrationInfo.contactNumber : '';
    const countryCode = regRecord && regRecord.registrationInfo && regRecord.registrationInfo.countryId ? regRecord.registrationInfo.countryId : '';
    const obj = _.find(mlSMSConst, 'KYC_DECLINED')
    const msg = obj.KYC_DECLINED
    mlSmsController.sendSMS(msg, countryCode, mobileNumber)
  }

  static sendSMSForReviewRecvd(fromUser, portfolioId, context) {
    const portfolioDetails = MlPortfolioDetails.findOne(portfolioId) || {};
    if (portfolioDetails) {
      const countryDetails = MlClusters.findOne(portfolioDetails.clusterId);
      const countryCode = countryDetails && countryDetails.countryId ? countryDetails.countryId : ''
      const defaultProfile = new MlUserContext().userProfileDetails(portfolioDetails.userId)
      const from = new MlUserContext().userProfileDetails(fromUser._id)
      if (countryCode && defaultProfile && from) {
        const mobileNumber = defaultProfile.mobileNumber;
        const currentdate = new Date();
        const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
        const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
        const updatedDateTime = `${date} ${time}`
        const msg = `You have received a review from ${from.firstName} ${from.lastName} on moolya on ${updatedDateTime}. Login now to view to it.`
        mlSmsController.sendSMS(msg, countryCode, mobileNumber)
      }
    }
  }

  static sendSMSForReviewReject(fromUser, portfolioId, context) {
    const portfolioDetails = MlPortfolioDetails.findOne(portfolioId) || {};
    if (portfolioDetails) {
      const countryDetails = MlClusters.findOne(portfolioDetails.clusterId);
      const countryCode = countryDetails && countryDetails.countryId ? countryDetails.countryId : ''
      const defaultProfile = new MlUserContext().userProfileDetails(portfolioDetails.userId)
      const from = new MlUserContext().userProfileDetails(fromUser._id)
      if (countryCode && defaultProfile && from) {
        const mobileNumber = defaultProfile.mobileNumber
        const currentdate = new Date();
        const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
        const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
        const updatedDateTime = `${date} ${time}`
        const msg = `Your review from ${from.firstName} ${from.lastName}was rejected by the admin.`
        mlSmsController.sendSMS(msg, countryCode, mobileNumber)
      }
    }
  }

  static sendSMSonSuccessfulEmailVerification(regId, mobileNumber) {
    const regDetails = mlDBController.findOne('MlRegistration', { _id: regId });
    if (!regDetails) {
      throw new Error(403, 'Mobile Number entered  is not registered');
    }
    const countryCode = (regDetails.registrationInfo || {}).countryId;
    const sms = _.find(mlSMSConst, 'SMS_EMAIL_VERIFIED')
    const msg = sms.SMS_EMAIL_VERIFIED
    mlSmsController.sendSMS(msg, countryCode, mobileNumber)
  }


  static sendSMSForEnquiryRequest(fromUser, portfolioId, context) {
    const portfolioDetails = MlPortfolioDetails.findOne(portfolioId) || {};
    if (portfolioDetails) {
      const countryDetails = MlClusters.findOne(portfolioDetails.clusterId);
      const countryCode = countryDetails && countryDetails.countryId ? countryDetails.countryId : ''
      const defaultProfile = new MlUserContext().userProfileDetails(portfolioDetails.userId)
      const from = new MlUserContext().userProfileDetails(fromUser._id);
      if (countryCode && defaultProfile && from) {
        const mobileNumber = defaultProfile.mobileNumber
        const currentdate = new Date();
        const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
        const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
        const updatedDateTime = `${date} ${time}`
        const msg = `You have received an enquiry request from ${from.firstName} ${from.lastName} on moolya on ${updatedDateTime}. Login now to respond to it.`
        mlSmsController.sendSMS(msg, countryCode, mobileNumber)
      }
    }
  }

  static sendSMSonOfficeActivation(officeId, context) {
    const office = mlDBController.findOne('MlOffice', officeId, context)
    if (office) {
      const countryDetails = MlClusters.findOne(office.clusterId);
      const countryCode = countryDetails && countryDetails.countryId ? countryDetails.countryId : ''
      const defaultProfile = new MlUserContext().userProfileDetails(office.userId)
      if (countryCode && defaultProfile) {
        const mobileNumber = defaultProfile.mobileNumber
        const currentdate = new Date();
        const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
        const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
        const updatedDateTime = `${date} ${time}`
        const msg = `Your customized office has been activated on moolya on ${updatedDateTime} Login and check it out now.`
        mlSmsController.sendSMS(msg, countryCode, mobileNumber)
      }
    }
  }

  static registerAsRequest(registrationId, communityName, context) {
    const regRecord = mlDBController.findOne('MlRegistration', registrationId, context)
    if (regRecord) {
      const mobileNumber = regRecord && regRecord.registrationInfo && regRecord.registrationInfo.contactNumber ? regRecord.registrationInfo.contactNumber : '';
      const countryCode = regRecord && regRecord.registrationInfo && regRecord.registrationInfo.countryId ? regRecord.registrationInfo.countryId : '';
      const currentdate = new Date();
      const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
      const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
      const updatedDateTime = `${date} ${time}`
      const msg = `New registration request for ${communityName} on moolya has been submitted on ${updatedDateTime}.`
      mlSmsController.sendSMS(msg, countryCode, mobileNumber)
    }
  }

  static forgotPassword(userId, context) {
    if (userId) {
      const defaultProfile = new MlUserContext().userProfileDetails(userId);
      const countryCode = defaultProfile && defaultProfile.countryId ? defaultProfile.countryId : ''
      const mobileNumber = defaultProfile && defaultProfile.mobileNumber ? defaultProfile.mobileNumber : ''
      const currentdate = new Date();
      const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
      const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
      const updatedDateTime = `${date} ${time}`
      const msg = `Your moolya login password was changed on ${updatedDateTime}.Contact moolya support immediately if you did not change the pw.`
      mlSmsController.sendSMS(msg, countryCode, mobileNumber)
    }
  }

  static portfolioUpdate(portfolioDetailsId) {
    const sms = _.find(mlSMSConst, 'PORTFOLIO_UPDATE')
    // var sms = _.find(mlSmsConstants, 'PORTFOLIO_UPDATE')
    const msg = `${sms.PORTFOLIO_UPDATE} ${new Date().toString()}`;
    const portfolioDetails = MlPortfolioDetails.findOne(portfolioDetailsId) || {};
    if (portfolioDetails) {
      const countryDetails = MlClusters.findOne(portfolioDetails.clusterId);
      const countryCode = countryDetails && countryDetails.countryId ? countryDetails.countryId : ''
      const defaultProfile = new MlUserContext().userProfileDetails(portfolioDetails.userId)
      if (countryCode && defaultProfile) {
        const mobileNumber = defaultProfile.mobileNumber
        mlSmsController.sendSMS(msg, countryCode, mobileNumber)
      }
    }
  }

  static portfolioGoLiveRequest(portfolioId) {
    const portfolioDetails = MlPortfolioDetails.findOne(portfolioId) || {};
    if (portfolioDetails) {
      const countryDetails = MlClusters.findOne(portfolioDetails.clusterId);
      const countryCode = countryDetails && countryDetails.countryId ? countryDetails.countryId : ''
      const defaultProfile = new MlUserContext().userProfileDetails(portfolioDetails.userId)
      // var from = new MlUserContext().userProfileDetails(fromUser._id);
      if (countryCode && defaultProfile) {
        const mobileNumber = defaultProfile.mobileNumber
        const currentdate = new Date();
        const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
        const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
        const updatedDateTime = `${date} ${time}`
        const msg = `Your Go-Live request for ${portfolioDetails.communityType} has been approved on${updatedDateTime}. Login to moolya for next steps..`
        mlSmsController.sendSMS(msg, countryCode, mobileNumber)
      }
    }
  }

  static processSetupCompleted(userId) {
    if (userId) {
      const defaultProfile = new MlUserContext().userProfileDetails(userId)
      const countryCode = defaultProfile && defaultProfile.countryId ? defaultProfile.countryId : ''
      const mobileNumber = defaultProfile && defaultProfile.mobileNumber ? defaultProfile.mobileNumber : ''
      const msg = 'Investor Process Setup has been completed for your moolya profile. Thank you.'
      mlSmsController.sendSMS(msg, countryCode, mobileNumber)
    }
  }

  static onVerificationSuccess(regRecord) {
    if (regRecord) {
      const mobileNumber = regRecord && regRecord.registrationInfo && regRecord.registrationInfo.contactNumber ? regRecord.registrationInfo.contactNumber : '';
      const countryCode = regRecord && regRecord.registrationInfo && regRecord.registrationInfo.countryId ? regRecord.registrationInfo.countryId : '';
      const msg = 'Congratulations ! Your moolya account login has now been verified and activated. Login to moolya now!'
      mlSmsController.sendSMS(msg, countryCode, mobileNumber)
    }
  }

  static profileUpdated(userId) {
    if (userId) {
      const defaultProfile = new MlUserContext().userProfileDetails(userId);
      const countryCode = defaultProfile && defaultProfile.countryId ? defaultProfile.countryId : ''
      const mobileNumber = defaultProfile && defaultProfile.mobileNumber ? defaultProfile.mobileNumber : ''
      const currentdate = new Date();
      const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
      const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
      const updatedDateTime = `${date} ${time}`
      const msg = `Your moolya profile has been updated on ${updatedDateTime}`;
      mlSmsController.sendSMS(msg, countryCode, mobileNumber)
    }
  }
  static errorForForgotPassword(userId, context) {
    if (userId) {
      const defaultProfile = new MlUserContext().userProfileDetails(userId);
      const countryCode = defaultProfile && defaultProfile.countryId ? defaultProfile.countryId : ''
      const mobileNumber = defaultProfile && defaultProfile.mobileNumber ? defaultProfile.mobileNumber : ''
      const currentdate = new Date();
      const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
      const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
      const updatedDateTime = `${date} ${time}`
      const msg = `Your moolya account password reset was unsuccessful on ${updatedDateTime}. Please contact support.`
      mlSmsController.sendSMS(msg, countryCode, mobileNumber)
    }
  }
  static AdminAssignedToUser(collectionName, transactionId) {
    if (transactionId) {
      const userDetails = mlDBController.findOne(collectionName, { transactionId }) || {};
      let userId = '';
      // receiver user details
      if (userDetails && userDetails.registrationInfo) {
        userId = userDetails && userDetails.registrationInfo && userDetails && userDetails.registrationInfo.userId ? userDetails.registrationInfo.userId : '';
      } else {
        userId = userDetails && userDetails.userId ? userDetails.userId : '';
      }
      const userInfo = new MlUserContext().userProfileDetails(userId);
      const countryCode = userInfo && userInfo.countryId ? userInfo.countryId : '';
      const mobileNumber = userInfo && userInfo.mobileNumber ? userInfo.mobileNumber : '';

      // community manager details
      const allocationId = userDetails && userDetails.allocation && userDetails.allocation.assigneeId ? userDetails.allocation.assigneeId : '';
      const allocationUserDetails = mlDBController.findOne('users', { _id: allocationId }) || {}
      const comMngFirstName = allocationUserDetails && allocationUserDetails.profile && allocationUserDetails.profile.firstName ? allocationUserDetails.profile.firstName : '';
      const comMngLastName = allocationUserDetails && allocationUserDetails.profile && allocationUserDetails.profile.lastName ? allocationUserDetails.profile.lastName : '';
      const genderType = allocationUserDetails && allocationUserDetails.profile && allocationUserDetails.profile.genderType ? allocationUserDetails.profile.genderType : '';
      let gender;
      if (genderType == 'male') {
        gender = 'Mr'
      } else {
        gender = 'Ms'
      }
      // var countryCode = defaultProfile&&defaultProfile.countryId?defaultProfile.countryId:""
      // var mobileNumber = defaultProfile&&defaultProfile.mobileNumber?defaultProfile.mobileNumber:""
      const msg = `${gender} ${comMngFirstName}. will be your Community Manager on moolya and will help you complete your moolya profile. Login now to explore more..`
      mlSmsController.sendSMS(msg, countryCode, mobileNumber)
    }
  }

  static newOfficeRequestSent(context) {
    const userId = context && context.userId ? context.userId : '';
    const defaultProfile = new MlUserContext().userProfileDetails(userId);
    const countryCode = defaultProfile && defaultProfile.countryId ? defaultProfile.countryId : '';
    const mobileNumber = defaultProfile && defaultProfile.mobileNumber ? defaultProfile.mobileNumber : '';
    const communityName = defaultProfile && defaultProfile.communityName ? defaultProfile.communityName : ''
    const currentdate = new Date();
    const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    const updatedDateTime = `${date} ${time}`
    const msg = `New registration request for ${communityName} on moolya has been submitted on ${updatedDateTime}`;
    mlSmsController.sendSMS(msg, countryCode, mobileNumber)
  }
/*  static portfolioGoLiveRequestDeclined(portfolioDetailsId){
    var portfolioDetails = MlPortfolioDetails.findOne(portfolioId) || {};
    if(portfolioDetails){
      var countryDetails = MlClusters.findOne(portfolioDetails.clusterId);
      var countryCode = countryDetails&&countryDetails.countryId?countryDetails.countryId:""
      var defaultProfile = new MlUserContext().userProfileDetails(portfolioDetails.userId)
      //var from = new MlUserContext().userProfileDetails(fromUser._id);
      if(countryCode && defaultProfile && from){
        var mobileNumber = defaultProfile.mobileNumber
        var currentdate = new Date();
        var date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
        var time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var updatedDateTime = date+" "+time
        var msg = 'Your Go-Live request for '+portfolioDetails.communityType+' has been approved on'+updatedDateTime+'. Login to moolya for next steps..'
        mlSmsController.sendSMS(msg, countryCode, mobileNumber)
      }
    }
  } */
}


export default MlSMSNotification;
