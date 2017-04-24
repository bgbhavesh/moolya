var noData = "not mentioned";
import mlSms from '../../commons/mlSms';

const MlSmsNotification= class MlSmsNotification {
  static  mlUserRegistrationOtp(otpNum,regId) {
    try {
      var regDetails = mlDBController.findOne('MlRegistration',{_id:regId});
      let to=regDetails.registrationInfo.contactNumber;
      let countryCode=regDetails.registrationInfo.countryId;
      let msg= "Use "+otpNum+" as One Time Password (OTP) to activate your moolya account. ";
      Meteor.setTimeout(function () {
          mlSms.send(countryCode,to,msg);
      }, 2 * 1000);

    }catch (e) {
      console.log("mlUserRegistrationOtp:Error while sending the OTP SMS Notification"+e);
    }
  }
}

export default MlSmsNotification;




