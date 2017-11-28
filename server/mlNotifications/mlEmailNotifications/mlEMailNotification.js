const noData = 'not mentioned';
const fromEmail = Meteor.settings.private.fromEmailAddr;
const bugReportEmail = Meteor.settings.private.bugReportEmailAddr;
import NotificationTemplateEngine from '../../commons/mlTemplateEngine'
import MlAccounts from '../../commons/mlAccounts'
const MlEmailNotification = class MlEmailNotification {
  static mlUserRegistrationOtp(otpNum, regId) {
    try {
      const regDetails = mlDBController.findOne('MlRegistration', { _id: regId });
      const to = regDetails.registrationInfo.userName;
      const msg = `Use ${otpNum} as One Time Password (OTP) to activate your Moolya account. `;

      const mail_body = `${'<html><body><div style="max-width:900px;margin:0 auto;min-height:350px;font-family:arial;font-size:14px;background:#fff;width:90%;color:#000">' +
        'Use'}${otpNum}as One Time Password (OTP) to activate your Moolya account.` +
        '</div></body></html>';
      Meteor.setTimeout(() => {
        mlEmail.sendHtml({
          from: fromEmail,
          to,
          subject: 'One Time Password (OTP) to activate your moolya account',
          html: mail_body
        });
      }, 2 * 1000);
    } catch (e) {
      console.log(`mlUserRegistrationOtp:Error while sending the OTP Email Notification${e}`);
    }
  }

  static clusterVerficationEmail(clusterId, context) {
    try {
      const clusterDetails = mlDBController.findOne('MlClusters', { _id: clusterId }, context);
      // var userDetails = Meteor.users.findOne({_id:context.userId});
      const userDetails = mlDBController.findOne('users', { _id: context.userId })
      const mail_body = `${'<html><body><div style="max-width:900px;margin:0 auto;min-height:350px;font-family:arial;font-size:14px;background:#fff;width:90%;color:#000">' +
        'Cluster'}${clusterDetails.clusterName} is created.` +
        '</div></body></html>';
      let fromEmail = '';
      let toEmail = ''
      if (userDetails && userDetails.username) {
        fromEmail = userDetails.username
      }
      if (clusterDetails && clusterDetails.email) {
        toEmail = clusterDetails.email
      }
      Meteor.setTimeout(() => {
        mlEmail.sendHtml({
          from: fromEmail,
          to: toEmail,
          subject: 'Moolya Cluster is activated',
          html: mail_body
        });
      }, 2 * 1000);
    } catch (e) {
      console.log(`mlUserRegistrationOtp:Error while sending the OTP Email Notification${e}`);
    }
  }

  static chapterVerficationEmail(chapterId, context) {
    try {
      const chapterDetails = mlDBController.findOne('MlSubChapters', { _id: chapterId }, context)
      // var userDetails = Meteor.users.findOne({_id:context.userId});
      const userDetails = mlDBController.findOne('users', { _id: context.userId })
      const mail_body = `${'<html><body><div style="max-width:900px;margin:0 auto;min-height:350px;font-family:arial;font-size:14px;background:#fff;width:90%;color:#000">' +
        'Sub chapter '}${chapterDetails.subChapterDisplayName}is created for a chapter ${chapterDetails.subChapterName
      }</div></body></html>`;
      let fromEmail = '';
      let toEmail = ''
      if (userDetails && userDetails.username) {
        fromEmail = userDetails.username
      }
      if (chapterDetails && chapterDetails.subChapterEmail) {
        toEmail = chapterDetails.subChapterEmail
      }
      Meteor.setTimeout(() => {
        mlEmail.sendHtml({
          from: fromEmail,
          to: toEmail,
          subject: 'Moolya Subchapter is activated',
          html: mail_body
        });
      }, 2 * 1000);
    } catch (e) {
      console.log(`mlUserRegistrationOtp:Error while sending the OTP Email Notification${e}`);
    }
  }

  static departmentVerficationEmail(departmentId, context) {
    try {
      const departmentDetails = mlDBController.findOne('MlDepartments', { _id: departmentId }, context)
      // var userDetails = Meteor.users.findOne({_id:context.userId});
      const userDetails = mlDBController.findOne('users', { _id: context.userId })
      const mail_body = `${'<html><body><div style="max-width:900px;margin:0 auto;min-height:350px;font-family:arial;font-size:14px;background:#fff;width:90%;color:#000">' +
        'Department with name '}${departmentDetails.departmentName} is created successfully`
      '</div></body></html>';
      let fromEmail = '';
      const toEmail = [];
      if (userDetails && userDetails.username) {
        fromEmail = userDetails.username
      }
      if (departmentDetails && departmentDetails.depatmentAvailable) {
        for (let i = 0; i < departmentDetails.depatmentAvailable.length; i++) {
          if (departmentDetails.depatmentAvailable[i] && departmentDetails.depatmentAvailable[i].email) {
            toEmail.push(departmentDetails.depatmentAvailable[i].email)
          }
        }
      }
      const emailString = toEmail.toString();
      Meteor.setTimeout(() => {
        mlEmail.sendHtml({
          from: fromEmail,
          to: emailString,
          subject: 'Department is created',
          html: mail_body
        });
      }, 2 * 1000);
    } catch (e) {
      console.log(`mlUserRegistrationOtp:Error while sending the OTP Email Notification${e}`);
    }
  }

  static subDepartmentVerficationEmail(subDepartmentId, departmentId, context) {
    try {
      if (subDepartmentId) {
        var departmentDetails = mlDBController.findOne('MlSubDepartments', { _id: subDepartmentId }, context)
      } else if (departmentId) {
        var departmentDetails = mlDBController.findOne('MlSubDepartments', { departmentId }, context)
      }

      // var userDetails = Meteor.users.findOne({_id: context.userId});
      const userDetails = mlDBController.findOne('users', { _id: context.userId })
      const mail_body = `${'<html><body><div style="max-width:900px;margin:0 auto;min-height:350px;font-family:arial;font-size:14px;background:#fff;width:90%;color:#000">' +
        'Sub Department with name '}${departmentDetails.subDepartmentName} is created successfully`
      '</div></body></html>';
      let fromEmail = '';
      const toEmail = [];
      if (userDetails && userDetails.username) {
        fromEmail = userDetails.username
      }
      if (departmentDetails && departmentDetails.subDepatmentAvailable) {
        for (let i = 0; i < departmentDetails.subDepatmentAvailable.length; i++) {
          if (departmentDetails.subDepatmentAvailable[i] && departmentDetails.subDepatmentAvailable[i].email) {
            toEmail.push(departmentDetails.subDepatmentAvailable[i].email)
          }
        }
      }
      const emailString = toEmail.toString();
      Meteor.setTimeout(() => {
        mlEmail.sendHtml({
          from: fromEmail,
          to: emailString,
          subject: 'Sub Department is created',
          html: mail_body
        });
      }, 2 * 1000);
    } catch (e) {
      console.log(`mlUserRegistrationOtp:Error while sending the OTP Email Notification${e}`);
    }
  }

  static sendInquiryEmail(inquiryData, context) {
    try {
      Meteor.setTimeout(() => {
        mlEmail.sendHtml({
          from: inquiryData.fromEmail,
          to: inquiryData.toEmail,
          subject: inquiryData.subject,
          html: `<div>${inquiryData.message}</div>`
        });
      }, 2 * 1000);
    } catch (e) {
      console.log('Failed to send inquiry email');
    }
  }

  static onChangePassword(context) {
    try {
      // var userDetails = Meteor.users.findOne({_id: context.userId});
      const userDetails = mlDBController.findOne('users', { _id: context.userId })
      const currentdate = new Date();
      const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
      const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
      const regObj = {
        userName: userDetails && userDetails.profile && userDetails.profile.firstName ? userDetails.profile.firstName : '',
        time,
        date
      }
      const toEmail = userDetails && userDetails.username ? userDetails.username : '';
      const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_change_of_password_confirmation_mailer', 'email', regObj)
      Meteor.setTimeout(() => {
        mlEmail.sendHtml({
          from: fromEmail,
          to: toEmail,
          subject: 'Moolya password changed!!!',
          html: mail_body && mail_body.content
        });
      }, 2 * 1000);
    } catch (e) {
      console.log(`mlChangePassword:Error while sending the  Email Notification${e}`);
    }
  }

  static onEmailVerificationSuccess(userDetails) {
    try {
      const regObj = {
        userName: userDetails && userDetails.registrationInfo && userDetails.registrationInfo.firstName ? userDetails.registrationInfo.firstName : ''
      }
      const toEmail = userDetails && userDetails.registrationInfo && userDetails.registrationInfo.email ? userDetails.registrationInfo.email : ''
      const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_email_verified_confirmation_mailer', 'email', regObj)
      Meteor.setTimeout(() => {
        mlEmail.sendHtml({
          from: fromEmail,
          to: toEmail,
          subject: 'Email Verified!!!',
          html: mail_body && mail_body.content
        });
      }, 2 * 1000);
    } catch (e) {
      console.log(`onEmailVerificationSuccess:Error while sending the  Email Notification${e}`);
    }
  }

  static onDeactivateUser(context) {
    try {
      // var userDetails = Meteor.users.findOne({_id: context.userId});
      const userDetails = mlDBController.findOne('users', { _id: context.userId })
      const currentdate = new Date();
      const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
      const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
      const firstName = userDetails && userDetails.profile && userDetails.profile.firstName ? userDetails.profile.firstName : '';
      const lastName = userDetails && userDetails.profile && userDetails.profile.lastName ? userDetails.profile.lastName : '';
      const regObj = {
        userName: `${firstName} ${lastName}`,
        time,
        date
      }
      const toEmail = userDetails && userDetails.username ? userDetails.username : '';
      const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_profile_deactivated', 'email', regObj)
      Meteor.setTimeout(() => {
        mlEmail.sendHtml({
          from: fromEmail,
          to: toEmail,
          subject: 'Profile Deactivation!!!',
          html: mail_body && mail_body.content
        });
      }, 2 * 1000);
    } catch (e) {
      console.log(`mlDeactivateUser:Error while sending the  Email Notification${e}`);
    }
  }


  static requestForProfileDeactivation(context) {
    try {
      // var userDetails = Meteor.users.findOne({_id: context.userId});
      const userDetails = mlDBController.findOne('users', { _id: context.userId })
      const currentdate = new Date();
      const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
      const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
      const firstName = userDetails && userDetails.profile && userDetails.profile.firstName ? userDetails.profile.firstName : '';
      const lastName = userDetails && userDetails.profile && userDetails.profile.lastName ? userDetails.profile.lastName : '';
      const regObj = {
        userName: `${firstName} ${lastName}`,
        time,
        date
      }
      const toEmail = userDetails && userDetails.username ? userDetails.username : '';
      const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_request_for_profile_deactivation', 'email', regObj)
      Meteor.setTimeout(() => {
        mlEmail.sendHtml({
          from: fromEmail,
          to: toEmail,
          subject: 'Profile Deactivation Request!!!',
          html: mail_body && mail_body.content
        });
      }, 2 * 1000);
    } catch (e) {
      console.log(`mlRequestforDeactivateUser:Error while sending the  Email Notification${e}`);
    }
  }

  static forgotPassword(context, path) {
    // var userDetails = Meteor.users.findOne({_id: context.userId});
    const userDetails = mlDBController.findOne('users', { _id: context.userId })
    const firstName = userDetails && userDetails.profile && userDetails.profile.firstName ? userDetails.profile.firstName : '';
    const lastName = userDetails && userDetails.profile && userDetails.profile.lastName ? userDetails.profile.lastName : '';
    const regObj = {
      userName: `${firstName} ${lastName}`,
      link: path
    }
    const toEmail = userDetails && userDetails.username ? userDetails.username : '';
    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_forgot_reset_password_mailer', 'email', regObj)
    const emailOptions = {};
    /* //emailContent= MlAccounts.greet("To verify your account email,",user,Meteor.absoluteUrl('reset')+'/'+token);
    emailOptions.from=fromEmail;
    emailOptions.to=toEmail;
    emailOptions.subject="Forgot Password !";
    emailOptions.html=mail_body;
    Meteor.setTimeout(function () {
      mlEmail.sendHtml(emailOptions);
    }, 2 * 1000);
    return {error: false,reason:"Reset link send successfully", code:200}; */

    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }

  static userVerficationLink(emailOptions) {
    const regObj = {
      link: emailOptions && emailOptions.path ? emailOptions.path : '',
      userName: emailOptions && emailOptions.firstName ? emailOptions.firstName : '',
      contactNumber: '+91-40-4672 5725 /Ext',
      hours: 48
    }
    const toEmail = emailOptions && emailOptions.toEmail ? emailOptions.toEmail : '';
    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_user_activation_mailer', 'email', regObj)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        // subject: "Welcome to moolya !",
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }

  static onKYCApprove(userDetails) {
    const user = userDetails || {}
    const regObj = {
      userName: user && user.registrationInfo && user.registrationInfo.firstName ? user.registrationInfo.firstName : '',
      path: Meteor.absoluteUrl('login')
    }
    const toEmail = user && user.registrationInfo && user.registrationInfo.email ? user.registrationInfo.email : ''
    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_kyc_approved_by_admin', 'email', regObj)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        // subject: "KYC Approved !",
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }

  static onKYCDecline(userDetails) {
    const user = userDetails || {}
    const regObj = {
      userName: user && user.registrationInfo && user.registrationInfo.firstName ? user.registrationInfo.firstName : '',
      contactNumber: '+91-40-4672 5725',
      contactEmail: 'cm@moolya.global',
      path: Meteor.absoluteUrl('login')
    }
    const toEmail = user && user.registrationInfo && user.registrationInfo.email ? user.registrationInfo.email : ''
    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_kyc_declined_by_admin', 'email', regObj)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        // subject: "KYC Declined !",
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }

  static onPortfolioConfirmation(userDetails) {
    const user = userDetails || {}
    const firstName = userDetails && userDetails.profile && userDetails.profile.firstName ? userDetails.profile.firstName : '';
    const lastName = userDetails && userDetails.profile && userDetails.profile.lastName ? userDetails.profile.lastName : '';
    const regObj = {
      userName: `${firstName} ${lastName}`,
      path: Meteor.absoluteUrl('login')
    }
    const toEmail = userDetails && userDetails.username ? userDetails.username : '';
    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_go_live_successful_mailer', 'email', regObj)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        // subject: "Portfolio Confirmation!!",
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }

  static onPortfolioUpdate(details) {
    const userDetails = mlDBController.findOne('users', { _id: details.userId })
    const firstName = userDetails && userDetails.profile && userDetails.profile.firstName ? userDetails.profile.firstName : '';
    const lastName = userDetails && userDetails.profile && userDetails.profile.lastName ? userDetails.profile.lastName : '';
    const regObj = {
      userName: `${firstName} ${lastName}`,
      path: Meteor.absoluteUrl('login')
    }
    const toEmail = userDetails && userDetails.username ? userDetails.username : '';
    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_portfolio_updated', 'email', regObj)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        // subject: "Portfolio Updated!!",
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }
  static endUserPortfolioConnect(fromUserId, toUserId) {
    fromUserId = fromUserId || '';
    toUserId = toUserId || ''
    const fromUserDetails = mlDBController.findOne('users', { _id: fromUserId })
    const toUserDetails = mlDBController.findOne('users', { _id: toUserId })
    const fromUserFirstName = fromUserDetails && fromUserDetails.profile && fromUserDetails.profile.firstName ? fromUserDetails.profile.firstName : '';
    const fromUserLastName = fromUserDetails && fromUserDetails.profile && fromUserDetails.profile.lastName ? fromUserDetails.profile.lastName : '';

    const toUserFirstName = toUserDetails && toUserDetails.profile && toUserDetails.profile.firstName ? toUserDetails.profile.firstName : '';
    const toUserLastName = toUserDetails && toUserDetails.profile && toUserDetails.profile.lastName ? toUserDetails.profile.lastName : '';

    const currentdate = new Date();
    const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    const regObj = {
      userName: `${fromUserFirstName} ${fromUserLastName}`,
      recieverName: `${toUserFirstName} ${toUserLastName}`,
      date,
      time,
      path: Meteor.absoluteUrl('login')
    }
    const toEmail = fromUserDetails && fromUserDetails.username ? fromUserDetails.username : '';

    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_new_connection_request_sent', 'email', regObj)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        // subject: "Portfolio Connection Request Sent !!",
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }

  static portfolioConnectRequestReceived(fromUserId, toUserId) {
    fromUserId = fromUserId || '';
    toUserId = toUserId || ''
    const fromUserDetails = mlDBController.findOne('users', { _id: fromUserId })
    const toUserDetails = mlDBController.findOne('users', { _id: toUserId })
    const fromUserFirstName = fromUserDetails && fromUserDetails.profile && fromUserDetails.profile.firstName ? fromUserDetails.profile.firstName : '';
    const fromUserLastName = fromUserDetails && fromUserDetails.profile && fromUserDetails.profile.lastName ? fromUserDetails.profile.lastName : '';

    const toUserFirstName = toUserDetails && toUserDetails.profile && toUserDetails.profile.firstName ? toUserDetails.profile.firstName : '';
    const toUserLastName = toUserDetails && toUserDetails.profile && toUserDetails.profile.lastName ? toUserDetails.profile.lastName : '';

    const currentdate = new Date();
    const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    const regObj = {
      userName: `${toUserFirstName} ${toUserLastName}`,
      recieverName: `${fromUserFirstName} ${fromUserLastName}`,
      path: Meteor.absoluteUrl('login')
    }
    const toEmail = toUserDetails && toUserDetails.username ? toUserDetails.username : '';
    console.log(toUserDetails.username);
    // let toEmail = "siri.dhavala@gmail.com"

    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_new_connection_request_received', 'email', regObj)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        // subject: "Portfolio Connection Request Received !!",
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }


  static portfolioConnectRequestDecline(fromUserId, toUserId) {
    fromUserId = fromUserId || '';
    toUserId = toUserId || ''
    const fromUserDetails = mlDBController.findOne('users', { _id: fromUserId })
    const toUserDetails = mlDBController.findOne('users', { _id: toUserId })
    const fromUserFirstName = fromUserDetails && fromUserDetails.profile && fromUserDetails.profile.firstName ? fromUserDetails.profile.firstName : '';
    const fromUserLastName = fromUserDetails && fromUserDetails.profile && fromUserDetails.profile.lastName ? fromUserDetails.profile.lastName : '';

    const toUserFirstName = toUserDetails && toUserDetails.profile && toUserDetails.profile.firstName ? toUserDetails.profile.firstName : '';
    const toUserLastName = toUserDetails && toUserDetails.profile && toUserDetails.profile.lastName ? toUserDetails.profile.lastName : '';

    const currentdate = new Date();
    const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    const regObj = {
      userName: `${fromUserFirstName} ${fromUserLastName}`,
      recieverName: `${toUserFirstName} ${toUserLastName}`,
      path: Meteor.absoluteUrl('login')
    }
    const toEmail = fromUserDetails && fromUserDetails.username ? fromUserDetails.username : '';

    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_connection_declined', 'email', regObj)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        // subject: "Portfolio Connection Request Decline !!",
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }

  static enquireRequest(fromUserDetails, toUserDetails) {
    const fromUserFirstName = fromUserDetails && fromUserDetails.profile && fromUserDetails.profile.firstName ? fromUserDetails.profile.firstName : '';
    const fromUserLastName = fromUserDetails && fromUserDetails.profile && fromUserDetails.profile.lastName ? fromUserDetails.profile.lastName : '';

    const toUserFirstName = toUserDetails && toUserDetails.profile && toUserDetails.profile.firstName ? toUserDetails.profile.firstName : '';
    const toUserLastName = toUserDetails && toUserDetails.profile && toUserDetails.profile.lastName ? toUserDetails.profile.lastName : '';

    const regObj = {
      userName: `${toUserFirstName} ${toUserLastName}`,
      recieverName: `${fromUserFirstName} ${fromUserLastName}`,
      path: Meteor.absoluteUrl('login')
    }
    const toEmail = toUserDetails && toUserDetails.username ? toUserDetails.username : '';

    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_new_enquire_request', 'email', regObj)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        // subject: "Portfolio Enquiry Request !!",
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }

  static reviewRecieved(fromUserDetails, toUserDetails) {
    const fromUserFirstName = fromUserDetails && fromUserDetails.profile && fromUserDetails.profile.firstName ? fromUserDetails.profile.firstName : '';
    const fromUserLastName = fromUserDetails && fromUserDetails.profile && fromUserDetails.profile.lastName ? fromUserDetails.profile.lastName : '';

    const toUserFirstName = toUserDetails && toUserDetails.profile && toUserDetails.profile.firstName ? toUserDetails.profile.firstName : '';
    const toUserLastName = toUserDetails && toUserDetails.profile && toUserDetails.profile.lastName ? toUserDetails.profile.lastName : '';

    const regObj = {
      userName: `${toUserFirstName} ${toUserLastName}`,
      recieverName: `${fromUserFirstName} ${fromUserLastName}`,
      path: Meteor.absoluteUrl('login')
    }
    const toEmail = toUserDetails && toUserDetails.username ? toUserDetails.username : '';

    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_new_review_received', 'email', regObj)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        // subject: "Portfolio New Review !!",
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }

  static portfolioSuccessfullGoLive(userDetails) {
    const user = userDetails || {}
    const firstName = userDetails && userDetails.profile && userDetails.profile.firstName ? userDetails.profile.firstName : '';
    const lastName = userDetails && userDetails.profile && userDetails.profile.lastName ? userDetails.profile.lastName : '';
    const regObj = {
      userName: `${firstName} ${lastName}`,
      path: Meteor.absoluteUrl('login')
    }
    const toEmail = userDetails && userDetails.username ? userDetails.username : '';
    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_go_live_successful_mailer', 'email', regObj)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        // subject: "Live on Moolya!!",
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }

  static portfolioGoLiveDecline(userDetails) {
    const user = userDetails || {}
    const firstName = userDetails && userDetails.profile && userDetails.profile.firstName ? userDetails.profile.firstName : '';
    const lastName = userDetails && userDetails.profile && userDetails.profile.lastName ? userDetails.profile.lastName : '';
    const regObj = {
      userName: `${firstName} ${lastName}`,
      path: Meteor.absoluteUrl('login')
    }
    const toEmail = userDetails && userDetails.username ? userDetails.username : '';
    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_go_live_declined', 'email', regObj)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        // subject: "Go Live Declined!!",
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }

  static newOfficeRequestSent(context) {
    const userDetails = mlDBController.findOne('users', { _id: context.userId })

    const currentdate = new Date();
    const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    const firstName = userDetails && userDetails.profile && userDetails.profile.firstName ? userDetails.profile.firstName : '';
    const lastName = userDetails && userDetails.profile && userDetails.profile.lastName ? userDetails.profile.lastName : '';
    const regObj = {
      userName: `${firstName} ${lastName}`,
      date,
      time
    }
    const toEmail = userDetails && userDetails.username ? userDetails.username : '';
    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_new_office_request_sent', 'email', regObj)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        // subject: "Office request sent!!!",
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  } catch(e) {
    console.log(`mlDeactivateUser:Error while sending the  Email Notification${e}`);
  }

  static bespokeOfficeActivated(officeId) {
    if (officeId) {
      const officeDetails = mlDBController.findOne('MlOffice', { _id: officeId }) || {}
      const officeUserId = officeDetails && officeDetails.userId ? officeDetails.userId : ''
      const userDetails = mlDBController.findOne('users', { _id: officeUserId }) || {}
      const firstName = userDetails && userDetails.profile && userDetails.profile.firstName ? userDetails.profile.firstName : '';
      const lastName = userDetails && userDetails.profile && userDetails.profile.lastName ? userDetails.profile.lastName : '';
      const regObj = {
        userName: `${firstName} ${lastName}`,
        path: Meteor.absoluteUrl('login')
      }
      const toEmail = userDetails && userDetails.username ? userDetails.username : '';
      const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_bespoke_customized_office_activated', 'email', regObj)
      Meteor.setTimeout(() => {
        mlEmail.sendHtml({
          from: fromEmail,
          to: toEmail,
          // subject: "Office Activated!!!",
          subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
          html: mail_body && mail_body.content
        });
      }, 2 * 1000);
    }
  }
  static officeInvitationEmail(verificationLink, registrationId, context, registrationData) {
    let address;
    const userDetails = mlDBController.findOne('users', { _id: context.userId }) || {}
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
    var verificationLink = MlAccounts.verifyEmailLink(tokenRecord.token); */
    const firstName = userDetails && userDetails.profile && userDetails.profile.firstName ? userDetails.profile.firstName : '';
    const lastName = userDetails && userDetails.profile && userDetails.profile.lastName ? userDetails.profile.lastName : '';
    const userEmail = userDetails && userDetails.username ? userDetails.username : '';
    const contactNumber = userDetails && userDetails.profile && userDetails.profile.mobileNumber ? userDetails.profile.mobileNumber : '';
    const regObj = {
      userName: registrationData && registrationData.firstName && registrationData.lastName ? `${registrationData.firstName} ${registrationData.lastName}` : '',
      investorName: `${firstName} ${lastName}`,
      path: verificationLink,
      investorEmail: userEmail,
      investorContactNumber: contactNumber,
      hours: 72
    }
    const toEmail = registrationData && registrationData.email ? registrationData.email : '';
    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_office_member_invitation_email', 'email', regObj);
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        // subject: "Office Bearer Invitation!!!",
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }

  static officeBearerApprovedByAdmin(userDetails) {
    /* let officeDetails = mlDBController.findOne('MlOffice', {_id: officeId}) || {}
      let officeUserId = officeDetails&&officeDetails.userId?officeDetails.userId:""
      let userDetails =  mlDBController.findOne('users', {_id: officeUserId}) || {} */
    const firstName = userDetails && userDetails.firstName ? userDetails.firstName : '';
    const lastName = userDetails && userDetails.lastName ? userDetails.lastName : '';
    const regObj = {
      userName: `${firstName} ${lastName}`,
      path: Meteor.absoluteUrl('login'),
      communityName: 'Investors'
    }
    const toEmail = userDetails && userDetails.emailId ? userDetails.emailId : '';
    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_office_bearer_request_approved_by_admin', 'email', regObj)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        // subject: "Office Bearer Approved!!!",
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }

  static processSetupCompletedByAdmin(userDetails) {
    const firstName = userDetails && userDetails.profile && userDetails.profile.firstName ? userDetails.profile.firstName : '';
    const lastName = userDetails && userDetails.profile && userDetails.profile.lastName ? userDetails.profile.lastName : '';
    const regObj = {
      userName: `${firstName} ${lastName}`,
      path: Meteor.absoluteUrl('login')
    }
    const toEmail = userDetails && userDetails.username ? userDetails.username : '';
    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_investor_process_setup_completed', 'email', regObj)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        // subject: "Process Setup Completed!!!",
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }

  static officePaymentLink() {

  }
  static UserRejectionByAdmin(userDetails) {
    const user = userDetails || {}
    const regObj = {
      userName: user && user.registrationInfo && user.registrationInfo.firstName ? user.registrationInfo.firstName : '',
      contactNumber: '+91-40-4672 5725',
      contactEmail: 'cm@moolya.global'
    }
    const toEmail = user && user.registrationInfo && user.registrationInfo.email ? user.registrationInfo.email : ''
    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_User_Rejected_By_Admin', 'email', regObj)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }

  static sendBugReportToAdmin(bugDetails) {
    // bugDetails clusterName,chapterName,subChapterName should not be empty
    bugDetails.clusterName = bugDetails.clusterName || ''; bugDetails.chapterName = bugDetails.chapterName || ''; bugDetails.subChapterName = bugDetails.subChapterName || ''; bugDetails.userName = bugDetails.userName || '';
    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_bugreport_user', 'email', bugDetails)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: (bugDetails || {}).emailId,
        to: bugReportEmail,
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : 'Bug Report',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }

  static sendBugReportFeedbackToUser(bugDetails) {
    // bugDetails username should not be empty
    bugDetails.userName = bugDetails.userName || '';
    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_bugreport_user_thanks', 'email', bugDetails);
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: bugReportEmail,
        to: (bugDetails || {}).emailId,
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : 'Thanks for feedback',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }
  static PaymentLink(userId, path) {
    // let paymentDetails = mlDBController.findOne('mlPayment', userId) || {}
    const paymentUserId = userId
    const userDetails = mlDBController.findOne('users', { _id: paymentUserId }) || {}
    const firstName = userDetails && userDetails.profile && userDetails.profile.firstName ? userDetails.profile.firstName : '';
    const lastName = userDetails && userDetails.profile && userDetails.profile.lastName ? userDetails.profile.lastName : '';
    const regObj = {
      userName: `${firstName} ${lastName}`,
      path: Meteor.absoluteUrl('login'),
      contactNumber: '+91-40-4672 5725',
      contactEmail: 'cm@moolya.global',
      Link: path,
      hours: 48
    }
    const toEmail = userDetails && userDetails.username ? userDetails.username : '';
    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_payment_link_email', 'email', regObj)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        // subject: "Payment Link!!!",
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }

  static onOfficeUpgrade(officeId) {
    if (officeId) {
      const officeDetails = mlDBController.findOne('MlOffice', { _id: officeId }) || {}
      const officeUserId = officeDetails && officeDetails.userId ? officeDetails.userId : ''
      const userDetails = mlDBController.findOne('users', { _id: officeUserId }) || {}
      const firstName = userDetails && userDetails.profile && userDetails.profile.firstName ? userDetails.profile.firstName : '';
      const lastName = userDetails && userDetails.profile && userDetails.profile.lastName ? userDetails.profile.lastName : '';
      const regObj = {
        userName: `${firstName} ${lastName}`,
        path: Meteor.absoluteUrl('login')
      }
      const toEmail = userDetails && userDetails.username ? userDetails.username : '';
      const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_office_category_upgrade', 'email', regObj)
      Meteor.setTimeout(() => {
        mlEmail.sendHtml({
          from: fromEmail,
          to: toEmail,
          // subject: "Office Upgrade!!!",
          subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
          html: mail_body && mail_body.content
        });
      }, 2 * 1000);
    }
  }
  static OfficeDeActivated(officeId) {
    if (officeId) {
      const officeDetails = mlDBController.findOne('MlOffice', { _id: officeId }) || {}
      const officeUserId = officeDetails && officeDetails.userId ? officeDetails.userId : ''
      const userDetails = mlDBController.findOne('users', { _id: officeUserId }) || {}
      const firstName = userDetails && userDetails.profile && userDetails.profile.firstName ? userDetails.profile.firstName : '';
      const lastName = userDetails && userDetails.profile && userDetails.profile.lastName ? userDetails.profile.lastName : '';
      const regObj = {
        userName: `${firstName} ${lastName}`,
        contactNumber: '+91-40-4672 5725',
        contactEmail: 'cm@moolya.global'
      }
      const toEmail = userDetails && userDetails.username ? userDetails.username : '';
      const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_bespoke_customized_office_de-activated', 'email', regObj)
      Meteor.setTimeout(() => {
        mlEmail.sendHtml({
          from: fromEmail,
          to: toEmail,
          // subject: "Office DeActivated!!!",
          subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
          html: mail_body && mail_body.content
        });
      }, 2 * 1000);
    }
  }
  static onAdminAssigned(collectionName, transactionId) {
    const userDetails = mlDBController.findOne(collectionName, { transactionId }) || {};
    let userId = '';
    // receiver user details
    if (userDetails && userDetails.registrationInfo) {
      userId = userDetails && userDetails.registrationInfo && userDetails && userDetails.registrationInfo.userId ? userDetails.registrationInfo.userId : '';
    } else {
      userId = userDetails && userDetails.userId ? userDetails.userId : '';
    }

    const userInfo = mlDBController.findOne('users', { _id: userId }) || {};

    // let allocationId =  userDetails&&userDetails.allocation&&userDetails.allocation.assigneeId?userDetails.allocation.assigneeId:''
    // let userInfo =  mlDBController.findOne('users', {_id: userId}) || {}
    const firstName = userInfo && userInfo.profile && userInfo.profile.firstName ? userInfo.profile.firstName : '';
    const lastName = userInfo && userInfo.profile && userInfo.profile.lastName ? userInfo.profile.lastName : '';

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
    const regObj = {
      userName: `${firstName} ${lastName}`,
      contactNumber: '+91-40-4672 5725',
      communitymanagerName: `${comMngFirstName}${comMngLastName}`,
      gender
    }

    const toEmail = userInfo && userInfo.username ? userInfo.username : '';
    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_admin_assigned', 'email', regObj)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        // subject: "Admin Assigned To User!!!",
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }

  static registerAsRequestSent(registrationId, communityName, context) {
    const regRecord = mlDBController.findOne('MlRegistration', registrationId, context)
    const userId = regRecord && regRecord.registrationInfo && regRecord.registrationInfo.userName ? regRecord.registrationInfo.userName : '';
    const userDetails = mlDBController.findOne('users', { username: userId }) || {}
    const firstName = userDetails && userDetails.profile && userDetails.profile.firstName ? userDetails.profile.firstName : '';
    const lastName = userDetails && userDetails.profile && userDetails.profile.lastName ? userDetails.profile.lastName : '';
    const currentdate = new Date();
    const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;

    const regObj = {
      userName: `${firstName} ${lastName}`,
      registrationType: communityName,
      time,
      date
    }
    const toEmail = userDetails && userDetails.username ? userDetails.username : '';
    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_registeras_request', 'email', regObj)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        // subject: "Live on Moolya!!",
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }

  static goIndependentRequest(userId, memberData) {
    if (userId) {
      const userDetails = mlDBController.findOne('users', { _id: userId }) || {}
      if (userDetails) {
        const firstName = userDetails && userDetails.profile && userDetails.profile.firstName ? userDetails.profile.firstName : '';
        const lastName = userDetails && userDetails.profile && userDetails.profile.lastName ? userDetails.profile.lastName : '';
        const currentdate = new Date();
        const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
        const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
        const memfirstName = memberData && memberData.firstName ? memberData.firstName : '';
        const memlastName = memberData && memberData.lastName ? memberData.lastName : '';
        const regObj = {
          userName: `${firstName} ${lastName}`,
          teamMemberName: `${memfirstName} ${memlastName}`,
          time,
          date
        }
        const toEmail = userDetails && userDetails.username ? userDetails.username : '';
        const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_GO_Independent_Request_received', 'email', regObj)
        Meteor.setTimeout(() => {
          mlEmail.sendHtml({
            from: fromEmail,
            to: toEmail,
            // subject: "Live on Moolya!!",
            subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
            html: mail_body && mail_body.content
          });
        }, 2 * 1000);
      }
    }
  }

  static onSuccessfulProfileUpdate(userId) {
    const userDetails = mlDBController.findOne('users', { _id: userId }) || {}
    const firstName = userDetails && userDetails.profile && userDetails.profile.firstName ? userDetails.profile.firstName : '';
    const lastName = userDetails && userDetails.profile && userDetails.profile.lastName ? userDetails.profile.lastName : '';
    const regObj = {
      userName: `${firstName} ${lastName}`,
      path: Meteor.absoluteUrl('login')
    }
    const toEmail = userDetails && userDetails.username ? userDetails.username : '';
    const mail_body = NotificationTemplateEngine.fetchTemplateContent('EML_Profile_Updated', 'email', regObj)
    Meteor.setTimeout(() => {
      mlEmail.sendHtml({
        from: fromEmail,
        to: toEmail,
        // subject: "Office Upgrade!!!",
        subject: mail_body && mail_body.tempConfig && mail_body.tempConfig.title ? mail_body.tempConfig.title : '',
        html: mail_body && mail_body.content
      });
    }, 2 * 1000);
  }
}


export default MlEmailNotification;

