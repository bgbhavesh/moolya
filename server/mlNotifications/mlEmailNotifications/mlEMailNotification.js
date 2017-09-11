var noData = "not mentioned";
var fromEmail = Meteor.settings.private.fromEmailAddr;
var bugReportEmail = Meteor.settings.private.bugReportEmailAddr;
import NotificationTemplateEngine from "../../commons/mlTemplateEngine"
import MlAccounts from "../../commons/mlAccounts"
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
      //var userDetails = Meteor.users.findOne({_id:context.userId});
      var userDetails =   mlDBController.findOne('users', {_id: context.userId})
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
      //var userDetails = Meteor.users.findOne({_id:context.userId});
      var userDetails = mlDBController.findOne('users', {_id: context.userId})
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
      //var userDetails = Meteor.users.findOne({_id:context.userId});
      var userDetails = mlDBController.findOne('users', {_id: context.userId})
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

      //var userDetails = Meteor.users.findOne({_id: context.userId});
      var userDetails = mlDBController.findOne('users', {_id: context.userId})
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

  static onChangePassword(context){
    try {


      //var userDetails = Meteor.users.findOne({_id: context.userId});
      var userDetails = mlDBController.findOne('users', {_id: context.userId})
      var currentdate = new Date();
      let date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
      let time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      let regObj = {
        userName : userDetails&&userDetails.profile&&userDetails.profile.firstName?userDetails.profile.firstName:"",
        time : time,
        date : date
      }
      let toEmail = userDetails&&userDetails.username?userDetails.username:"";
      let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_change_of_password_confirmation_mailer","email",regObj)
      Meteor.setTimeout(function () {
        mlEmail.sendHtml({
          from: fromEmail,
          to: toEmail,
          subject: "Moolya password changed!!!",
          html : mail_body&&mail_body.content
        });
      }, 2 * 1000);

    } catch (e) {
      console.log("mlChangePassword:Error while sending the  Email Notification" + e);
    }
  }

  static onEmailVerificationSuccess(userDetails){
    try {

      let regObj = {
        userName : userDetails&&userDetails.registrationInfo&&userDetails.registrationInfo.firstName?userDetails.registrationInfo.firstName:""
      }
      let toEmail = userDetails&&userDetails.registrationInfo&&userDetails.registrationInfo.email?userDetails.registrationInfo.email:""
      let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_email_verified_confirmation_mailer","email",regObj)
      Meteor.setTimeout(function () {
        mlEmail.sendHtml({
          from: fromEmail,
          to: toEmail,
          subject: "Email Verified!!!",
          html : mail_body&&mail_body.content
        });
      }, 2 * 1000);

    } catch (e) {
      console.log("onEmailVerificationSuccess:Error while sending the  Email Notification" + e);
    }
  }

  static onDeactivateUser(context){
    try {


      //var userDetails = Meteor.users.findOne({_id: context.userId});
      var userDetails = mlDBController.findOne('users', {_id: context.userId})
      var currentdate = new Date();
      let date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
      let time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      let firstName = userDetails&&userDetails.profile&&userDetails.profile.firstName?userDetails.profile.firstName:"";
      let lastName = userDetails&&userDetails.profile&&userDetails.profile.lastName?userDetails.profile.lastName:"";
      let regObj = {
        userName : firstName+" "+lastName,
        time : time,
        date : date
      }
      let toEmail = userDetails&&userDetails.username?userDetails.username:"";
      let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_profile_deactivated","email",regObj)
      Meteor.setTimeout(function () {
        mlEmail.sendHtml({
          from: fromEmail,
          to: toEmail,
          subject: "Profile Deactivation!!!",
          html : mail_body&&mail_body.content
        });
      }, 2 * 1000);

    } catch (e) {
      console.log("mlDeactivateUser:Error while sending the  Email Notification" + e);
    }
  }



  static requestForProfileDeactivation(context){
    try {
      //var userDetails = Meteor.users.findOne({_id: context.userId});
      var userDetails = mlDBController.findOne('users', {_id: context.userId})
      var currentdate = new Date();
      let date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
      let time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      let firstName = userDetails&&userDetails.profile&&userDetails.profile.firstName?userDetails.profile.firstName:"";
      let lastName = userDetails&&userDetails.profile&&userDetails.profile.lastName?userDetails.profile.lastName:"";
      let regObj = {
        userName : firstName+" "+lastName,
        time : time,
        date : date
      }
      let toEmail = userDetails&&userDetails.username?userDetails.username:"";
      let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_request_for_profile_deactivation","email",regObj)
      Meteor.setTimeout(function () {
        mlEmail.sendHtml({
          from: fromEmail,
          to: toEmail,
          subject: "Profile Deactivation Request!!!",
          html : mail_body&&mail_body.content
        });
      }, 2 * 1000);

    } catch (e) {
      console.log("mlRequestforDeactivateUser:Error while sending the  Email Notification" + e);
    }
  }

  static forgotPassword(context,path){

    //var userDetails = Meteor.users.findOne({_id: context.userId});
    var userDetails = mlDBController.findOne('users', {_id: context.userId})
    let firstName = userDetails&&userDetails.profile&&userDetails.profile.firstName?userDetails.profile.firstName:"";
    let lastName = userDetails&&userDetails.profile&&userDetails.profile.lastName?userDetails.profile.lastName:"";
    let regObj = {
      userName : firstName+" "+lastName,
      link : path
    }
    let toEmail = userDetails&&userDetails.username?userDetails.username:"";
    let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_forgot_reset_password_mailer","email",regObj)
    var emailOptions={};
   /* //emailContent= MlAccounts.greet("To verify your account email,",user,Meteor.absoluteUrl('reset')+'/'+token);
    emailOptions.from=fromEmail;
    emailOptions.to=toEmail;
    emailOptions.subject="Forgot Password !";
    emailOptions.html=mail_body;
    Meteor.setTimeout(function () {
      mlEmail.sendHtml(emailOptions);
    }, 2 * 1000);
    return {error: false,reason:"Reset link send successfully", code:200};*/

    Meteor.setTimeout(function () {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        subject: mail_body&&mail_body.tempConfig&&mail_body.tempConfig.title?mail_body.tempConfig.title:"",
        html : mail_body&&mail_body.content
      });
    }, 2 * 1000);

  }

  static userVerficationLink(emailOptions){

    let regObj = {
      link : emailOptions&&emailOptions.path?emailOptions.path:"",
      userName : emailOptions&&emailOptions.firstName?emailOptions.firstName:"",
      contactNumber : "+91-40-4672 5725 /Ext",
      hours : 48,
    }
    let toEmail = emailOptions&&emailOptions.toEmail?emailOptions.toEmail:"";
    let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_user_activation_mailer","email",regObj)
    Meteor.setTimeout(function () {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        //subject: "Welcome to moolya !",
        subject:mail_body&&mail_body.tempConfig&&mail_body.tempConfig.title?mail_body.tempConfig.title:"",
        html : mail_body&&mail_body.content
      });
    }, 2 * 1000);
  }

  static onKYCApprove(userDetails){
    let user = userDetails || {}
    let regObj = {
      userName : user&&user.registrationInfo&&user.registrationInfo.firstName?user.registrationInfo.firstName:"",
      path : Meteor.absoluteUrl('login')
    }
    let toEmail = user&&user.registrationInfo&&user.registrationInfo.email?user.registrationInfo.email:""
    let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_kyc_approved_by_admin","email",regObj)
    Meteor.setTimeout(function () {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        //subject: "KYC Approved !",
        subject: mail_body&&mail_body.tempConfig&&mail_body.tempConfig.title?mail_body.tempConfig.title:"",
        html : mail_body&&mail_body.content
      });
    }, 2 * 1000);
  }

  static onKYCDecline(userDetails){
    let user = userDetails || {}
    let regObj = {
      userName : user&&user.registrationInfo&&user.registrationInfo.firstName?user.registrationInfo.firstName:"",
      contactNumber : "+91-40-4672 5725",
      contactEmail : "cm@moolya.global",
      path : Meteor.absoluteUrl('login')
    }
    let toEmail = user&&user.registrationInfo&&user.registrationInfo.email?user.registrationInfo.email:""
    let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_kyc_declined_by_admin","email",regObj)
    Meteor.setTimeout(function () {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        //subject: "KYC Declined !",
        subject: mail_body&&mail_body.tempConfig&&mail_body.tempConfig.title?mail_body.tempConfig.title:"",
        html : mail_body&&mail_body.content
      });
    }, 2 * 1000);
  }

  static onPortfolioConfirmation(userDetails){
    let user = userDetails || {}
    let firstName = userDetails&&userDetails.profile&&userDetails.profile.firstName?userDetails.profile.firstName:"";
    let lastName = userDetails&&userDetails.profile&&userDetails.profile.lastName?userDetails.profile.lastName:"";
    let regObj = {
      userName : firstName+" "+lastName,
      path : Meteor.absoluteUrl('login')
    }
    let toEmail = userDetails&&userDetails.username?userDetails.username:"";
    let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_go_live_successful_mailer","email",regObj)
    Meteor.setTimeout(function () {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        //subject: "Portfolio Confirmation!!",
        subject: mail_body&&mail_body.tempConfig&&mail_body.tempConfig.title?mail_body.tempConfig.title:"",
        html : mail_body&&mail_body.content
      });
    }, 2 * 1000);
  }

  static onPortfolioUpdate(details){
    var userDetails =   mlDBController.findOne('users', {_id: details.userId})
    let firstName =userDetails&&userDetails.profile&&userDetails.profile.firstName?userDetails.profile.firstName:"";
    let lastName = userDetails&&userDetails.profile&&userDetails.profile.lastName?userDetails.profile.lastName:"";
    let regObj = {
      userName : firstName+" "+lastName,
      path : Meteor.absoluteUrl('login')
    }
    let toEmail = userDetails&&userDetails.username?userDetails.username:"";
    let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_portfolio_updated","email",regObj)
    Meteor.setTimeout(function () {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        //subject: "Portfolio Updated!!",
        subject: mail_body&&mail_body.tempConfig&&mail_body.tempConfig.title?mail_body.tempConfig.title:"",
        html : mail_body&&mail_body.content
      });
    }, 2 * 1000);
  }
  static endUserPortfolioConnect(fromUserId,toUserId){
     fromUserId  = fromUserId?fromUserId:"";
     toUserId = toUserId?toUserId:""
    var fromUserDetails =  mlDBController.findOne('users', {_id: fromUserId})
    var toUserDetails =  mlDBController.findOne('users', {_id: toUserId})
    let fromUserFirstName = fromUserDetails&&fromUserDetails.profile&&fromUserDetails.profile.firstName?fromUserDetails.profile.firstName:"";
    let fromUserLastName = fromUserDetails&&fromUserDetails.profile&&fromUserDetails.profile.lastName?fromUserDetails.profile.lastName:"";

    let toUserFirstName = toUserDetails&&toUserDetails.profile&&toUserDetails.profile.firstName?toUserDetails.profile.firstName:"";
    let toUserLastName = toUserDetails&&toUserDetails.profile&&toUserDetails.profile.lastName?toUserDetails.profile.lastName:"";

    var currentdate = new Date();
    let date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
    let time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    let regObj = {
      userName : fromUserFirstName+" "+fromUserLastName,
      recieverName : toUserFirstName+" "+toUserLastName,
      date : date,
      time : time,
      path : Meteor.absoluteUrl('login')
    }
    let toEmail =fromUserDetails&&fromUserDetails.username?fromUserDetails.username:"";

    let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_new_connection_request_sent","email",regObj)
    Meteor.setTimeout(function () {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        //subject: "Portfolio Connection Request Sent !!",
        subject: mail_body&&mail_body.tempConfig&&mail_body.tempConfig.title?mail_body.tempConfig.title:"",
        html : mail_body&&mail_body.content
      });
    }, 2 * 1000);
  }

  static portfolioConnectRequestReceived(fromUserId,toUserId){
    fromUserId  = fromUserId?fromUserId:"";
    toUserId = toUserId?toUserId:""
    var fromUserDetails =  mlDBController.findOne('users', {_id: fromUserId})
    var toUserDetails =  mlDBController.findOne('users', {_id: toUserId})
    let fromUserFirstName = fromUserDetails&&fromUserDetails.profile&&fromUserDetails.profile.firstName?fromUserDetails.profile.firstName:"";
    let fromUserLastName = fromUserDetails&&fromUserDetails.profile&&fromUserDetails.profile.lastName?fromUserDetails.profile.lastName:"";

    let toUserFirstName = toUserDetails&&toUserDetails.profile&&toUserDetails.profile.firstName?toUserDetails.profile.firstName:"";
    let toUserLastName = toUserDetails&&toUserDetails.profile&&toUserDetails.profile.lastName?toUserDetails.profile.lastName:"";

    var currentdate = new Date();
    let date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
    let time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    let regObj = {
      userName : toUserFirstName+" "+toUserLastName,
      recieverName : fromUserFirstName+" "+fromUserLastName,
      path : Meteor.absoluteUrl('login')
    }
    let toEmail =toUserDetails&&toUserDetails.username?toUserDetails.username:"";
    console.log(toUserDetails.username);
    //let toEmail = "siri.dhavala@gmail.com"

    let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_new_connection_request_received","email",regObj)
    Meteor.setTimeout(function () {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        //subject: "Portfolio Connection Request Received !!",
        subject: mail_body&&mail_body.tempConfig&&mail_body.tempConfig.title?mail_body.tempConfig.title:"",
        html : mail_body&&mail_body.content
      });
    }, 2 * 1000);
  }


  static portfolioConnectRequestDecline(fromUserId,toUserId){
    fromUserId  = fromUserId?fromUserId:"";
    toUserId = toUserId?toUserId:""
    var fromUserDetails =  mlDBController.findOne('users', {_id: fromUserId})
    var toUserDetails =  mlDBController.findOne('users', {_id: toUserId})
    let fromUserFirstName = fromUserDetails&&fromUserDetails.profile&&fromUserDetails.profile.firstName?fromUserDetails.profile.firstName:"";
    let fromUserLastName = fromUserDetails&&fromUserDetails.profile&&fromUserDetails.profile.lastName?fromUserDetails.profile.lastName:"";

    let toUserFirstName = toUserDetails&&toUserDetails.profile&&toUserDetails.profile.firstName?toUserDetails.profile.firstName:"";
    let toUserLastName = toUserDetails&&toUserDetails.profile&&toUserDetails.profile.lastName?toUserDetails.profile.lastName:"";

    var currentdate = new Date();
    let date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
    let time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    let regObj = {
      userName : fromUserFirstName+" "+fromUserLastName,
      recieverName : toUserFirstName+" "+toUserLastName,
      path : Meteor.absoluteUrl('login')
    }
    let toEmail =fromUserDetails&&fromUserDetails.username?fromUserDetails.username:"";

    let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_connection_declined","email",regObj)
    Meteor.setTimeout(function () {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        //subject: "Portfolio Connection Request Decline !!",
        subject: mail_body&&mail_body.tempConfig&&mail_body.tempConfig.title?mail_body.tempConfig.title:"",
        html : mail_body&&mail_body.content
      });
    }, 2 * 1000);
  }

  static enquireRequest(fromUserDetails,toUserDetails){
    let fromUserFirstName = fromUserDetails&&fromUserDetails.profile&&fromUserDetails.profile.firstName?fromUserDetails.profile.firstName:"";
    let fromUserLastName = fromUserDetails&&fromUserDetails.profile&&fromUserDetails.profile.lastName?fromUserDetails.profile.lastName:"";

    let toUserFirstName = toUserDetails&&toUserDetails.profile&&toUserDetails.profile.firstName?toUserDetails.profile.firstName:"";
    let toUserLastName = toUserDetails&&toUserDetails.profile&&toUserDetails.profile.lastName?toUserDetails.profile.lastName:"";

    let regObj = {
      userName : toUserFirstName+" "+toUserLastName,
      recieverName : fromUserFirstName+" "+fromUserLastName,
      path : Meteor.absoluteUrl('login')
    }
    let toEmail =toUserDetails&&toUserDetails.username?toUserDetails.username:"";

    let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_new_enquire_request","email",regObj)
    Meteor.setTimeout(function () {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        //subject: "Portfolio Enquiry Request !!",
        subject: mail_body&&mail_body.tempConfig&&mail_body.tempConfig.title?mail_body.tempConfig.title:"",
        html : mail_body&&mail_body.content
      });
    }, 2 * 1000);
  }

  static reviewRecieved(fromUserDetails,toUserDetails){
    let fromUserFirstName = fromUserDetails&&fromUserDetails.profile&&fromUserDetails.profile.firstName?fromUserDetails.profile.firstName:"";
    let fromUserLastName = fromUserDetails&&fromUserDetails.profile&&fromUserDetails.profile.lastName?fromUserDetails.profile.lastName:"";

    let toUserFirstName = toUserDetails&&toUserDetails.profile&&toUserDetails.profile.firstName?toUserDetails.profile.firstName:"";
    let toUserLastName = toUserDetails&&toUserDetails.profile&&toUserDetails.profile.lastName?toUserDetails.profile.lastName:"";

    let regObj = {
      userName : toUserFirstName+" "+toUserLastName,
      recieverName : fromUserFirstName+" "+fromUserLastName,
      path : Meteor.absoluteUrl('login')
    }
    let toEmail =toUserDetails&&toUserDetails.username?toUserDetails.username:"";

    let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_new_review_received","email",regObj)
    Meteor.setTimeout(function () {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        //subject: "Portfolio New Review !!",
        subject: mail_body&&mail_body.tempConfig&&mail_body.tempConfig.title?mail_body.tempConfig.title:"",
        html : mail_body&&mail_body.content
      });
    }, 2 * 1000);

  }

  static portfolioSuccessfullGoLive(userDetails){
    let user = userDetails || {}
    let firstName = userDetails&&userDetails.profile&&userDetails.profile.firstName?userDetails.profile.firstName:"";
    let lastName = userDetails&&userDetails.profile&&userDetails.profile.lastName?userDetails.profile.lastName:"";
    let regObj = {
      userName : firstName+" "+lastName,
      path : Meteor.absoluteUrl('login')
    }
    let toEmail = userDetails&&userDetails.username?userDetails.username:"";
    let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_go_live_successful_mailer","email",regObj)
    Meteor.setTimeout(function () {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        //subject: "Live on Moolya!!",
        subject: mail_body&&mail_body.tempConfig&&mail_body.tempConfig.title?mail_body.tempConfig.title:"",
        html : mail_body&&mail_body.content
      });
    }, 2 * 1000);
  }

  static portfolioGoLiveDecline(userDetails){
    let user = userDetails || {}
    let firstName = userDetails&&userDetails.profile&&userDetails.profile.firstName?userDetails.profile.firstName:"";
    let lastName = userDetails&&userDetails.profile&&userDetails.profile.lastName?userDetails.profile.lastName:"";
    let regObj = {
      userName : firstName+" "+lastName,
      path : Meteor.absoluteUrl('login')
    }
    let toEmail = userDetails&&userDetails.username?userDetails.username:"";
    let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_go_live_declined","email",regObj)
    Meteor.setTimeout(function () {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        //subject: "Go Live Declined!!",
        subject: mail_body&&mail_body.tempConfig&&mail_body.tempConfig.title?mail_body.tempConfig.title:"",
        html : mail_body&&mail_body.content
      });
    }, 2 * 1000);
  }

  static newOfficeRequestSent(context){

    var userDetails =  mlDBController.findOne('users', {_id: context.userId})

    var currentdate = new Date();
    let date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
    let time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    let firstName = userDetails&&userDetails.profile&&userDetails.profile.firstName?userDetails.profile.firstName:"";
    let lastName = userDetails&&userDetails.profile&&userDetails.profile.lastName?userDetails.profile.lastName:"";
    let regObj = {
      userName : firstName+" "+lastName,
      date : date,
      time : time
    }
    let toEmail = userDetails&&userDetails.username?userDetails.username:"";
    let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_new_office_request_sent","email",regObj)
    Meteor.setTimeout(function () {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        //subject: "Office request sent!!!",
        subject: mail_body&&mail_body.tempConfig&&mail_body.tempConfig.title?mail_body.tempConfig.title:"",
        html : mail_body&&mail_body.content
      });
    }, 2 * 1000);

  } catch (e) {
    console.log("mlDeactivateUser:Error while sending the  Email Notification" + e);
  }

  static bespokeOfficeActivated(officeId){
    if(officeId){
      let officeDetails = mlDBController.findOne('MlOffice', {_id: officeId}) || {}
      let officeUserId = officeDetails&&officeDetails.userId?officeDetails.userId:""
      let userDetails =  mlDBController.findOne('users', {_id: officeUserId}) || {}
      let firstName = userDetails&&userDetails.profile&&userDetails.profile.firstName?userDetails.profile.firstName:"";
      let lastName = userDetails&&userDetails.profile&&userDetails.profile.lastName?userDetails.profile.lastName:"";
      let regObj = {
        userName : firstName+" "+lastName,
        path : Meteor.absoluteUrl('login')
      }
      let toEmail = userDetails&&userDetails.username?userDetails.username:"";
      let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_bespoke_customized_office_activated","email",regObj)
      Meteor.setTimeout(function () {
        mlEmail.sendHtml({
          from: fromEmail,
          to: toEmail,
          //subject: "Office Activated!!!",
          subject: mail_body&&mail_body.tempConfig&&mail_body.tempConfig.title?mail_body.tempConfig.title:"",
          html : mail_body&&mail_body.content
        });
      }, 2 * 1000);
    }
  }

  static officeInvitationEmail(verificationLink,registrationId,context,registrationData) {
    var address;
    var userDetails = mlDBController.findOne('users', {_id: context.userId}) || {}
   /* var user=mlDBController.findOne('MlRegistration', {_id:registrationId},context||{});
    var email = _.find(user.emails || [], function (e) {
      return !e.verified;
    });

    address = (email || {}).address;
    var tokenRecord = {
      token: Random.secret(),
      address: address,
      when: new Date()
    };
    var verificationLink = MlAccounts.verifyEmailLink(tokenRecord.token);*/
    let firstName = userDetails && userDetails.profile && userDetails.profile.firstName ? userDetails.profile.firstName : "";
    let lastName = userDetails && userDetails.profile && userDetails.profile.lastName ? userDetails.profile.lastName : "";
    let userEmail = userDetails && userDetails.username ? userDetails.username : "";
    let contactNumber = userDetails && userDetails.profile && userDetails.profile.mobileNumber ? userDetails.profile.mobileNumber : "";
    let regObj = {
      userName: registrationData && registrationData.firstName && registrationData.lastName ? registrationData.firstName + " " + registrationData.lastName : "",
      investorName: firstName + " " + lastName,
      path: verificationLink,
      investorEmail: userEmail,
      investorContactNumber: contactNumber,
      hours: 48
    }
    let toEmail = registrationData && registrationData.email ? registrationData.email : "";
    let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_office_member_invitation_email", "email", regObj);
    Meteor.setTimeout(function () {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        //subject: "Office Bearer Invitation!!!",
        subject: mail_body&&mail_body.tempConfig&&mail_body.tempConfig.title?mail_body.tempConfig.title:"",
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);

  }

  static officeBearerApprovedByAdmin(userDetails){

      /*let officeDetails = mlDBController.findOne('MlOffice', {_id: officeId}) || {}
      let officeUserId = officeDetails&&officeDetails.userId?officeDetails.userId:""
      let userDetails =  mlDBController.findOne('users', {_id: officeUserId}) || {}*/
      let firstName = userDetails&&userDetails.firstName?userDetails.firstName:"";
      let lastName = userDetails&&userDetails.lastName?userDetails.lastName:"";
      let regObj = {
        userName : firstName+" "+lastName,
        path : Meteor.absoluteUrl('login'),
        communityName : "Investors"
      }
      let toEmail = userDetails&&userDetails.emailId?userDetails.emailId:"";
      let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_office_bearer_request_approved_by_admin","email",regObj)
      Meteor.setTimeout(function () {
        mlEmail.sendHtml({
          from: fromEmail,
          to: toEmail,
          //subject: "Office Bearer Approved!!!",
          subject: mail_body&&mail_body.tempConfig&&mail_body.tempConfig.title?mail_body.tempConfig.title:"",
          html : mail_body&&mail_body.content
        });
      }, 2 * 1000);

  }

  static processSetupCompletedByAdmin(userDetails){
    let firstName = userDetails && userDetails.profile && userDetails.profile.firstName ? userDetails.profile.firstName : "";
    let lastName = userDetails && userDetails.profile && userDetails.profile.lastName ? userDetails.profile.lastName : "";
    let regObj = {
      userName : firstName+" "+lastName,
      path : Meteor.absoluteUrl('login')
    }
    let toEmail = userDetails&&userDetails.username?userDetails.username:"";
    let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_investor_process_setup_completed","email",regObj)
    Meteor.setTimeout(function () {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        //subject: "Process Setup Completed!!!",
        subject: mail_body&&mail_body.tempConfig&&mail_body.tempConfig.title?mail_body.tempConfig.title:"",
        html : mail_body&&mail_body.content
      });
    }, 2 * 1000);

  }

  static officePaymentLink(){

  }

  static onOfficeUpgrade(){

  }
  static UserRejectionByAdmin(userDetails){
      let user = userDetails || {}
      let regObj = {
        userName : user&&user.registrationInfo&&user.registrationInfo.firstName?user.registrationInfo.firstName:"",
        contactNumber : "+91-40-4672 5725",
        contactEmail : "cm@moolya.global",
      }
      let toEmail = user&&user.registrationInfo&&user.registrationInfo.email?user.registrationInfo.email:""
      let mail_body = NotificationTemplateEngine.fetchTemplateContent("EML_User_Rejected_By_Admin","email",regObj)
      Meteor.setTimeout(function () {
        mlEmail.sendHtml({
          from: fromEmail,
          to: toEmail,
          subject: mail_body&&mail_body.tempConfig&&mail_body.tempConfig.title?mail_body.tempConfig.title:"",
          html : mail_body&&mail_body.content
        });
      }, 2 * 1000);
    }

  static sendBugReportToAdmin(bugDetails){
    Meteor.setTimeout(function () {
      mlEmail.sendHtml({
        from: (bugDetails||{}).emailId,
        to: bugReportEmail,
        subject:'Bug Report',
        html : (bugDetails||{}).details
      });
    }, 2 * 1000);
  }

}

export default MlEmailNotification;




