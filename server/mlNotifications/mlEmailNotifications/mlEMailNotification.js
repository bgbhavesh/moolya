var noData = "not mentioned";
var fromEmail = Meteor.settings.private.fromEmailAddr;
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

  static  clusterVerficationEmail(clusterId,context) {
    try{
      var clusterDetails = mlDBController.findOne('MlClusters', {_id: clusterId}, context);
      var userDetails = Meteor.users.findOne({_id:context.userId});
      var mail_body = '<html><body><div style="max-width:900px;margin:0 auto;min-height:350px;font-family:arial;font-size:14px;background:#fff;width:90%;color:#000">' +
        'Cluster'+ clusterDetails.clusterName +' is created.'+
        '</div></body></html>';
      let fromEmail = "";
      let toEmail = ""
      if(userDetails && userDetails.username){
        fromEmail = userDetails.username
      }
      if(clusterDetails && clusterDetails.email){
        toEmail = clusterDetails.email
      }
      Meteor.setTimeout(function () {
        mlEmail.sendHtml({
          from:fromEmail,
          to: toEmail,
          subject: "Moolya Cluster is activated",
          html: mail_body
        });
      }, 2 * 1000);
    }catch (e) {
      console.log("mlUserRegistrationOtp:Error while sending the OTP Email Notification"+e);
    }

  }

  static  chapterVerficationEmail(chapterId,context) {
    try{
      var chapterDetails = mlDBController.findOne('MlSubChapters', {_id: chapterId}, context)
      var userDetails = Meteor.users.findOne({_id:context.userId});
      var mail_body = '<html><body><div style="max-width:900px;margin:0 auto;min-height:350px;font-family:arial;font-size:14px;background:#fff;width:90%;color:#000">' +
        'Sub chapter '+ chapterDetails.subChapterDisplayName +'is created for a chapter '+ chapterDetails.subChapterName+
        '</div></body></html>';
      let fromEmail = "";
      let toEmail = ""
      if(userDetails && userDetails.username){
        fromEmail = userDetails.username
      }
      if(chapterDetails && chapterDetails.subChapterEmail){
        toEmail = chapterDetails.subChapterEmail
      }
      Meteor.setTimeout(function () {
        mlEmail.sendHtml({
          from:fromEmail,
          to: toEmail,
          subject: "Moolya Subchapter is activated",
          html: mail_body
        });
      }, 2 * 1000);
    }catch (e) {
      console.log("mlUserRegistrationOtp:Error while sending the OTP Email Notification"+e);
    }

  }

  static  departmentVerficationEmail(departmentId,context) {
    try{
      var departmentDetails = mlDBController.findOne('MlDepartments', {_id: departmentId}, context)
      var userDetails = Meteor.users.findOne({_id:context.userId});
      var mail_body = '<html><body><div style="max-width:900px;margin:0 auto;min-height:350px;font-family:arial;font-size:14px;background:#fff;width:90%;color:#000">' +
        'Department with name '+ departmentDetails.departmentName +' is created successfully'
        '</div></body></html>';
      let fromEmail = "";
      let toEmail = [];
      if(userDetails && userDetails.username){
        fromEmail = userDetails.username
      }
      if(departmentDetails && departmentDetails.depatmentAvailable){
        for (var i = 0; i < departmentDetails.depatmentAvailable.length; i++) {
          if(departmentDetails.depatmentAvailable[i] && departmentDetails.depatmentAvailable[i].email){
            toEmail.push(departmentDetails.depatmentAvailable[i].email)
          }

        }
      }
      let emailString = toEmail.toString();
      Meteor.setTimeout(function () {
        mlEmail.sendHtml({
          from:fromEmail,
          to: emailString,
          subject: "Department is created",
          html: mail_body
        });
      }, 2 * 1000);

    }catch (e) {
      console.log("mlUserRegistrationOtp:Error while sending the OTP Email Notification"+e);
    }

  }

  static  subDepartmentVerficationEmail(subDepartmentId,departmentId,context) {
    try {
      if(subDepartmentId){
        var departmentDetails = mlDBController.findOne('MlSubDepartments', {_id: subDepartmentId}, context)
      }else if(departmentId){
        var departmentDetails = mlDBController.findOne('MlSubDepartments', {departmentId: departmentId}, context)
      }

      var userDetails = Meteor.users.findOne({_id: context.userId});
      var mail_body = '<html><body><div style="max-width:900px;margin:0 auto;min-height:350px;font-family:arial;font-size:14px;background:#fff;width:90%;color:#000">' +
        'Sub Department with name ' + departmentDetails.subDepartmentName + ' is created successfully'
      '</div></body></html>';
      let fromEmail = "";
      let toEmail = [];
      if (userDetails && userDetails.username) {
        fromEmail = userDetails.username
      }
      if (departmentDetails && departmentDetails.subDepatmentAvailable) {
        for (var i = 0; i < departmentDetails.subDepatmentAvailable.length; i++) {
          if (departmentDetails.subDepatmentAvailable[i] && departmentDetails.subDepatmentAvailable[i].email) {
            toEmail.push(departmentDetails.subDepatmentAvailable[i].email)
          }

        }
      }
      let emailString = toEmail.toString();
      Meteor.setTimeout(function () {
        mlEmail.sendHtml({
          from: fromEmail,
          to: emailString,
          subject: "Sub Department is created",
          html: mail_body
        });
      }, 2 * 1000);

    } catch (e) {
      console.log("mlUserRegistrationOtp:Error while sending the OTP Email Notification" + e);
    }
  }

  static sendInquiryEmail(inquiryData, context) {
    try {
      Meteor.setTimeout(function () {
        mlEmail.sendHtml({
          from: inquiryData.fromEmail,
          to: inquiryData.toEmail,
          subject: inquiryData.subject,
          html: "<div>" + inquiryData.message + "</div>"
        });
      }, 2 * 1000);

    } catch (e) {
      console.log("Failed to send inquiry email");
    }
  }

}

export default MlEmailNotification;




