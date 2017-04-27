var noData = "not mentioned";
var fromEmail = "noreply@moolya.in";
const MlEmailNotification= class MlEmailNotification {

  static  mlUserRegistrationOtp(otpNum,regId) {
    try {
      var regDetails = mlDBController.findOne('MlRegistration',{_id:regId});
      let to=regDetails.registrationInfo.userName;
      let msg= "Use "+otpNum+" as One Time Password (OTP) to activate your Moolya account. ";

      var mail_body = '<html><body><div style="max-width:900px;margin:0 auto;min-height:350px;font-family:arial;font-size:14px;background:#fff;width:90%;color:#000">' +
        'Use'+otpNum+'as One Time Password (OTP) to activate your Moolya account.'+
        '</div></body></html>';
      Meteor.setTimeout(function () {
        mlEmail.sendHtml({
          from:fromEmail,
          to: to,
          subject: "One Time Password (OTP) to activate your moolya account",
          html: mail_body
        });
      }, 2 * 1000);

    } catch (e) {
      console.log("mlUserRegistrationOtp:Error while sending the OTP Email Notification"+e);
    }
  }

}

export default MlEmailNotification;




