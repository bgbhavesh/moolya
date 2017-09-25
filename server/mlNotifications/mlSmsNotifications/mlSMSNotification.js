import mlSMSConst from '../../mlNotifications/mlSmsNotifications/mlSmsConstants'
import mlSmsController from '../../mlNotifications/mlSmsNotifications/mlSmsController'
import _ from "underscore";
import MlUserContext from '../../MlExternalUsers/mlUserContext';


const MlSMSNotification= class MlSMSNotification{
  static sendSMSonKYCApproved(regRecord){
    var mobileNumber = regRecord&&regRecord.registrationInfo&&regRecord.registrationInfo.contactNumber?regRecord.registrationInfo.contactNumber:"";
    var countryCode =  regRecord&&regRecord.registrationInfo&&regRecord.registrationInfo.countryId?regRecord.registrationInfo.countryId:"";
    var obj = _.find(mlSMSConst, 'KYC_APPROVED')
    var msg= obj.KYC_APPROVED
    mlSmsController.sendSMS(msg, countryCode, mobileNumber)
  }

  static sendSMSonKYCDeclined(regRecord){
    var mobileNumber = regRecord&&regRecord.registrationInfo&&regRecord.registrationInfo.contactNumber?regRecord.registrationInfo.contactNumber:"";
    var countryCode =  regRecord&&regRecord.registrationInfo&&regRecord.registrationInfo.countryId?regRecord.registrationInfo.countryId:"";
    var obj = _.find(mlSMSConst, 'KYC_DECLINED')
    var msg= obj.KYC_DECLINED
    mlSmsController.sendSMS(msg, countryCode, mobileNumber)
  }

  static sendSMSForReviewRecvd(fromUser, portfolioId, context){
    var portfolioDetails = MlPortfolioDetails.findOne(portfolioId) || {};
    if(portfolioDetails){
      var countryDetails = MlClusters.findOne(portfolioDetails.clusterId);
      var countryCode = countryDetails&&countryDetails.countryId?countryDetails.countryId:""
      var defaultProfile = new MlUserContext().userProfileDetails(portfolioDetails.userId)
      var from = new MlUserContext().userProfileDetails(fromUser._id)
      if(countryCode && defaultProfile && from){
        var mobileNumber = defaultProfile.mobileNumber;
        var currentdate = new Date();
        var date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
        var time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var updatedDateTime = date+" "+time
        var msg = 'You have received a review from '+from.firstName+' '+from.lastName +' on moolya on '+updatedDateTime+'. Login now to view to it.'
        mlSmsController.sendSMS(msg, countryCode, mobileNumber)
      }
    }
  }

  static sendSMSForReviewReject(fromUser, portfolioId, context){
    var portfolioDetails = MlPortfolioDetails.findOne(portfolioId) || {};
    if(portfolioDetails){
      var countryDetails = MlClusters.findOne(portfolioDetails.clusterId);
      var countryCode = countryDetails&&countryDetails.countryId?countryDetails.countryId:""
      var defaultProfile = new MlUserContext().userProfileDetails(portfolioDetails.userId)
      var from = new MlUserContext().userProfileDetails(fromUser._id)
      if(countryCode && defaultProfile && from){
        var mobileNumber = defaultProfile.mobileNumber
        var currentdate = new Date();
        var date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
        var time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var updatedDateTime = date+" "+time
        var msg = 'Your review from '+from.firstName+' '+from.lastName +'was rejected by the admin.'
        mlSmsController.sendSMS(msg, countryCode, mobileNumber)
      }
    }
  }

  static sendSMSonSuccessfulEmailVerification(regId, mobileNumber){
    var regDetails = mlDBController.findOne('MlRegistration',{_id:regId});
    if(!regDetails){
      throw new Error(403, "Mobile Number entered  is not registered");
    }
    var countryCode = (regDetails.registrationInfo||{}).countryId;
    var sms = _.find(mlSMSConst, 'SMS_EMAIL_VERIFIED')
    var msg= sms.SMS_EMAIL_VERIFIED
    mlSmsController.sendSMS(msg, countryCode, mobileNumber)
  }


  static sendSMSForEnquiryRequest(fromUser, portfolioId, context){
    var portfolioDetails = MlPortfolioDetails.findOne(portfolioId) || {};
    if(portfolioDetails){
      var countryDetails = MlClusters.findOne(portfolioDetails.clusterId);
      var countryCode = countryDetails&&countryDetails.countryId?countryDetails.countryId:""
      var defaultProfile = new MlUserContext().userProfileDetails(portfolioDetails.userId)
      var from = new MlUserContext().userProfileDetails(fromUser._id);
      if(countryCode && defaultProfile && from){
        var mobileNumber = defaultProfile.mobileNumber
        var currentdate = new Date();
        var date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
        var time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var updatedDateTime = date+" "+time
        var msg = 'You have received an enquiry request from '+from.firstName+' '+from.lastName +' on moolya on '+updatedDateTime+'. Login now to respond to it.'
        mlSmsController.sendSMS(msg, countryCode, mobileNumber)
      }
    }
  }

  static sendSMSonOfficeActivation(officeId, context){
    var office = mlDBController.findOne('MlOffice', officeId, context)
    if(office){
      var countryDetails = MlClusters.findOne(office.clusterId);
      var countryCode = countryDetails&&countryDetails.countryId?countryDetails.countryId:""
      var defaultProfile = new MlUserContext().userProfileDetails(office.userId)
      if(countryCode && defaultProfile){
        var mobileNumber = defaultProfile.mobileNumber
        var currentdate = new Date();
        var date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
        var time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var updatedDateTime = date+" "+time
        var msg = 'Your customized office has been activated on moolya on '+updatedDateTime+' Login and check it out now.'
        mlSmsController.sendSMS(msg, countryCode, mobileNumber)
      }
    }
  }

  static registerAsRequest(registrationId,communityName,context){
    var regRecord  = mlDBController.findOne('MlRegistration',registrationId,context)
    if(regRecord){
      var mobileNumber = regRecord&&regRecord.registrationInfo&&regRecord.registrationInfo.contactNumber?regRecord.registrationInfo.contactNumber:"";
      var countryCode =  regRecord&&regRecord.registrationInfo&&regRecord.registrationInfo.countryId?regRecord.registrationInfo.countryId:"";
      var currentdate = new Date();
      var date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
      var time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      var updatedDateTime = date+" "+time
      var msg = 'New registration request for '+communityName+' on moolya has been submitted on '+updatedDateTime+'.'
      mlSmsController.sendSMS(msg, countryCode, mobileNumber)
    }
  }

  static forgotPassword(userId,context){
    if(userId){
      var defaultProfile = new MlUserContext().userProfileDetails(userId);
      var countryCode = defaultProfile&&defaultProfile.countryId?defaultProfile.countryId:""
      var mobileNumber = defaultProfile&&defaultProfile.mobileNumber?defaultProfile.mobileNumber:""
      var currentdate = new Date();
      var date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
      var time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      var updatedDateTime = date+" "+time
      var msg = 'Your moolya login password was changed on '+updatedDateTime+'.Contact moolya support immediately if you did not change the pw.'
      mlSmsController.sendSMS(msg, countryCode, mobileNumber)
    }
  }

  static portfolioUpdate(portfolioDetailsId){
    var sms = _.find(mlSMSConst, 'PORTFOLIO_UPDATE')
    //var sms = _.find(mlSmsConstants, 'PORTFOLIO_UPDATE')
    var msg= sms.PORTFOLIO_UPDATE+" "+new Date().toString();
    var portfolioDetails = MlPortfolioDetails.findOne(portfolioDetailsId) || {};
    if(portfolioDetails){
      var countryDetails = MlClusters.findOne(portfolioDetails.clusterId);
      var countryCode = countryDetails&&countryDetails.countryId?countryDetails.countryId:""
      var defaultProfile = new MlUserContext().userProfileDetails(portfolioDetails.userId)
      if(countryCode && defaultProfile){
        var mobileNumber = defaultProfile.mobileNumber
        mlSmsController.sendSMS(msg, countryCode, mobileNumber)
      }
    }
  }

  static portfolioGoLiveRequest(portfolioId){
    var portfolioDetails = MlPortfolioDetails.findOne(portfolioId) || {};
    if(portfolioDetails){
      var countryDetails = MlClusters.findOne(portfolioDetails.clusterId);
      var countryCode = countryDetails&&countryDetails.countryId?countryDetails.countryId:""
      var defaultProfile = new MlUserContext().userProfileDetails(portfolioDetails.userId)
      //var from = new MlUserContext().userProfileDetails(fromUser._id);
      if(countryCode && defaultProfile){
        var mobileNumber = defaultProfile.mobileNumber
        var currentdate = new Date();
        var date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
        var time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
        var updatedDateTime = date+" "+time
        var msg = 'Your Go-Live request for '+portfolioDetails.communityType+' has been approved on'+updatedDateTime+'. Login to moolya for next steps..'
        mlSmsController.sendSMS(msg, countryCode, mobileNumber)
      }
    }
  }

  static profileUpdated(userId){
    if(userId){
      var defaultProfile = new MlUserContext().userProfileDetails(userId);
      var countryCode = defaultProfile&&defaultProfile.countryId?defaultProfile.countryId:""
      var mobileNumber = defaultProfile&&defaultProfile.mobileNumber?defaultProfile.mobileNumber:""
      var currentdate = new Date();
      var date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
      var time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      var updatedDateTime = date+" "+time
      var msg = 'Your moolya profile has been updated on '+updatedDateTime;
      mlSmsController.sendSMS(msg, countryCode, mobileNumber)
    }
  }
  static errorForForgotPassword(userId,context){
    if(userId){
      var defaultProfile = new MlUserContext().userProfileDetails(userId);
      var countryCode = defaultProfile&&defaultProfile.countryId?defaultProfile.countryId:""
      var mobileNumber = defaultProfile&&defaultProfile.mobileNumber?defaultProfile.mobileNumber:""
      var currentdate = new Date();
      var date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
      var time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      var updatedDateTime = date+" "+time
      var msg = 'Your moolya account password reset was unsuccessful on '+updatedDateTime+'. Please contact support.'
      mlSmsController.sendSMS(msg, countryCode, mobileNumber)
    }
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
  }*/

}


export default MlSMSNotification;
