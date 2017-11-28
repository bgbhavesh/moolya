`use strict`;

import mlConversationsRepo from '../../commons/Conversations/mlConversationsRepo'
class MlNotificationControllerClass {
  /** create new Notification */

  createNewApplication() {
    mlConversationsRepo.createApplication();
  }

  createNewUser(user) {
    const userId = user.userId
    const notifyMessage = 'Welcome to moolya. Your moolya relationship manager will coordinate with you to complete your moolya profile'
    const that = this
    mlConversationsRepo.createUser(user, (ret) => {
      if (ret && ret.success) {
        const obj = {
          notificationType: 'PUSHNOTIFICATION',
          subNotificationType: 'newUserCreation',
          message: notifyMessage,
          fromUserId: 'system',
          toUserId: userId
        }
        that.createNewNotification(obj)
      }
    });
  }

  onKYCApprove(payload) {
    const userId = payload && payload.registrationInfo && payload.registrationInfo.userId ? payload.registrationInfo.userId : ''
    const notifyMessage = `KYC documents have been approved on ${new Date()}`
    const obj = {
      notificationType: 'PUSHNOTIFICATION',
      subNotificationType: 'kycApprove',
      message: notifyMessage,
      fromUserId: 'system',
      toUserId: userId
    }
    this.createNewNotification(obj)
  }

  onKYCDecline(payload) {
    const userId = payload && payload.registrationInfo && payload.registrationInfo.userId ? payload.registrationInfo.userId : ''
    const firstName = payload && payload.registrationInfo && payload.registrationInfo.firstName ? payload.registrationInfo.firstName : ''
    const notifyMessage = `Your KYC document(s): ${firstName} have been declined by the admin. Please login and upload the KYC documents as per the requirement.`

    const obj = {
      notificationType: 'PUSHNOTIFICATION',
      subNotificationType: 'kycDecline',
      message: notifyMessage,
      fromUserId: 'system',
      toUserId: userId
    }
    this.createNewNotification(obj)
  }

  onPotfolioUpdate(details) {
    const userId = details && details.userId ? details.userId : ''
    const currentdate = new Date();
    const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    const updatedDateTime = `${date} ${time}`
    const notifyMessage = `Your portfolio has been updated on ${updatedDateTime}.`
    const obj = {
      notificationType: 'PUSHNOTIFICATION',
      subNotificationType: 'portfolioUpdate',
      message: notifyMessage,
      fromUserId: 'system',
      toUserId: userId
    }
    this.createNewNotification(obj)
  }

  onGoLiveRequest(details) {
    const userId = details && details.userId ? details.userId : ''
    const currentdate = new Date();
    const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    const updatedDateTime = `${date} ${time}`
    const notifyMessage = `Your Portfolio Go-Live request has been sent to Admin on ${updatedDateTime}.`
    const obj = {
      notificationType: 'PUSHNOTIFICATION',
      subNotificationType: 'goLiveRequest',
      message: notifyMessage,
      fromUserId: 'system',
      toUserId: userId
    }
    this.createNewNotification(obj)
  }

  onGoLiveRequestApproval(details) {
    const userId = details && details._id ? details._id : ''
    const currentdate = new Date();
    const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    const updatedDateTime = `${date} ${time}`
    const notifyMessage = `Your Go-Live request has been approved by the Admin  on  ${updatedDateTime}.`
    const obj = {
      notificationType: 'PUSHNOTIFICATION',
      subNotificationType: 'goLiveRequestApproval',
      message: notifyMessage,
      fromUserId: 'system',
      toUserId: userId
    }
    this.createNewNotification(obj)
  }

  onGoLiveRequestDecline(details) {
    const userId = details && details._id ? details._id : ''
    const currentdate = new Date();
    const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    const updatedDateTime = `${date} ${time}`
    const notifyMessage = `Your Go-Live request has been declined by the Admin on ${updatedDateTime}.`
    const obj = {
      notificationType: 'PUSHNOTIFICATION',
      subNotificationType: 'goLiveRequestDecline',
      message: notifyMessage,
      fromUserId: 'system',
      toUserId: userId
    }
    this.createNewNotification(obj)
  }

  onConnectionRequestReceived(fromUserId, toUserId) {
    fromUserId = fromUserId || '';
    toUserId = toUserId || ''
    const fromUserDetails = mlDBController.findOne('users', { _id: fromUserId })
    const toUserDetails = mlDBController.findOne('users', { _id: toUserId })
    const fromUserFirstName = fromUserDetails && fromUserDetails.profile && fromUserDetails.profile.firstName ? fromUserDetails.profile.firstName : '';
    const fromUserLastName = fromUserDetails && fromUserDetails.profile && fromUserDetails.profile.lastName ? fromUserDetails.profile.lastName : '';

    const toUserFirstName = toUserDetails && toUserDetails.profile && toUserDetails.profile.firstName ? toUserDetails.profile.firstName : '';
    const toUserLastName = toUserDetails && toUserDetails.profile && toUserDetails.profile.lastName ? toUserDetails.profile.lastName : '';

    const notifyMessage = `New connection request from  ${fromUserFirstName} ${fromUserLastName}.`
    const obj = {
      notificationType: 'PUSHNOTIFICATION',
      subNotificationType: 'connectionRequestReceived',
      message: notifyMessage,
      fromUserId: 'system',
      toUserId
    }
    this.createNewNotification(obj)
  }

  onConnectionRequestSent(fromUserId, toUserId) {
    fromUserId = fromUserId || '';
    toUserId = toUserId || ''
    const fromUserDetails = mlDBController.findOne('users', { _id: fromUserId })
    const toUserDetails = mlDBController.findOne('users', { _id: toUserId })
    const fromUserFirstName = fromUserDetails && fromUserDetails.profile && fromUserDetails.profile.firstName ? fromUserDetails.profile.firstName : '';
    const fromUserLastName = fromUserDetails && fromUserDetails.profile && fromUserDetails.profile.lastName ? fromUserDetails.profile.lastName : '';

    const toUserFirstName = toUserDetails && toUserDetails.profile && toUserDetails.profile.firstName ? toUserDetails.profile.firstName : '';
    const toUserLastName = toUserDetails && toUserDetails.profile && toUserDetails.profile.lastName ? toUserDetails.profile.lastName : '';

    const notifyMessage = `Connection request for ${toUserFirstName} ${toUserLastName}sent.`
    const obj = {
      notificationType: 'PUSHNOTIFICATION',
      subNotificationType: 'connectionRequestSent',
      message: notifyMessage,
      fromUserId: 'system',
      toUserId: fromUserId
    }
    this.createNewNotification(obj)
  }


  onEnquiryRequestReceived(fromUser, toUser) {
    const fromUserId = fromUser && fromUser._id ? fromUser._id : '';
    const toUserId = toUser && toUser._id ? toUser._id : ''
    const currentdate = new Date();
    const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    const updatedDateTime = `${date} ${time}`
    const notifyMessage = `You have received an Enquiry from ${updatedDateTime}.`
    const obj = {
      notificationType: 'PUSHNOTIFICATION',
      subNotificationType: 'enquiryRequestRecieved',
      message: notifyMessage,
      fromUserId: 'system',
      toUserId
    }
    this.createNewNotification(obj)
  }

  onReviewReceived(fromUser, toUser) {
    const fromUserId = fromUser && fromUser._id ? fromUser._id : '';
    const toUserId = toUser && toUser._id ? toUser._id : ''
    const fromUserDetails = mlDBController.findOne('users', { _id: fromUserId })
    const toUserDetails = mlDBController.findOne('users', { _id: toUserId })
    const fromUserFirstName = fromUserDetails && fromUserDetails.profile && fromUserDetails.profile.firstName ? fromUserDetails.profile.firstName : '';
    const fromUserLastName = fromUserDetails && fromUserDetails.profile && fromUserDetails.profile.lastName ? fromUserDetails.profile.lastName : '';

    const toUserFirstName = toUserDetails && toUserDetails.profile && toUserDetails.profile.firstName ? toUserDetails.profile.firstName : '';
    const toUserLastName = toUserDetails && toUserDetails.profile && toUserDetails.profile.lastName ? toUserDetails.profile.lastName : '';

    const notifyMessage = `You have received a review from ${fromUserFirstName} ${fromUserLastName}.`
    const obj = {
      notificationType: 'PUSHNOTIFICATION',
      subNotificationType: 'reviewRecieved',
      message: notifyMessage,
      fromUserId: 'system',
      toUserId
    }
    this.createNewNotification(obj)
  }


  onUserApproval(payload) {
    const userId = payload && payload.registrationInfo && payload.registrationInfo.userId ? payload.registrationInfo.userId : ''
    const communityName = payload && payload.registrationInfo && payload.registrationInfo.communityDefName ? payload.registrationInfo.communityDefName : ''
    const notifyMessage = `You have been added to the ${communityName} on ${new Date()}.Please proceed to complete your portfolio process.`
    const obj = {
      notificationType: 'PUSHNOTIFICATION',
      subNotificationType: 'userApproval',
      message: notifyMessage,
      fromUserId: 'system',
      toUserId: userId
    }
    this.createNewNotification(obj)
  }
  profileUpdated(userId) {
    const currentdate = new Date();
    const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    const updatedDateTime = `${date} ${time}`
    const notifyMessage = `Your profile has been updated by you on  ${updatedDateTime}.`
    const obj = {
      notificationType: 'PUSHNOTIFICATION',
      subNotificationType: 'profileUpdate',
      message: notifyMessage,
      fromUserId: 'system',
      toUserId: userId
    }
    this.createNewNotification(obj)
  }
  changePassword(userId) {
    if (userId) {
      const currentdate = new Date();
      const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
      const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
      const updatedDateTime = `${date} ${time}`
      const notifyMessage = `Your password was last changed on ${updatedDateTime}.`
      const obj = {
        notificationType: 'PUSHNOTIFICATION',
        subNotificationType: 'changePassword',
        message: notifyMessage,
        fromUserId: 'system',
        toUserId: userId
      }
      this.createNewNotification(obj)
    }
  }
  officeActivation(officeId) {
    if (officeId) {
      const office = mlDBController.findOne('MlOffice', { _id: officeId }) || {}
      if (office) {
        const notifyMessage = 'Your customized office has been activated.'
        const obj = {
          notificationType: 'PUSHNOTIFICATION',
          subNotificationType: 'officeActivation',
          message: notifyMessage,
          fromUserId: 'system',
          toUserId: office.userId
        }
        this.createNewNotification(obj)
      }
    }
  }
  officeMemberIndependent(officeMemberId, userId) {
    if (userId && officeMemberId) {
      const defaultProfile = new MlUserContext().userProfileDetails(userId);
      const firstName = defaultProfile && defaultProfile.firstName ? defaultProfile.firstName : '';
      const lastName = defaultProfile && defaultProfile.lastName ? defaultProfile.lastName : '';
      const currentdate = new Date();
      const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
      const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
      const updatedDateTime = `${date} ${time}`
      const notifyMessage = `Go Independent request for ${firstName} ${lastName} has been received on ${updatedDateTime}.`;
      const obj = {
        notificationType: 'PUSHNOTIFICATION',
        subNotificationType: 'officeMemberIndependent',
        message: notifyMessage,
        fromUserId: 'system',
        toUserId: officeMemberId
      }
      this.createNewNotification(obj)
    }
  }

  onNewRegistrationRequest(registrationId, communityName, context) {
    const payload = mlDBController.findOne('MlRegistration', registrationId, context)
    const userName = payload && payload.registrationInfo && payload.registrationInfo.userName ? payload.registrationInfo.userName : ''
    const userDetails = mlDBController.findOne('users', { username: userName }) || {}
    const userId = userDetails && userDetails._id ? userDetails._id : ''
    const notifyMessage = `Your new registration request for ${communityName} has been submitted successfully.`
    const obj = {
      notificationType: 'PUSHNOTIFICATION',
      subNotificationType: 'newRegistrationRequest',
      message: notifyMessage,
      fromUserId: 'system',
      toUserId: userId
    }
    this.createNewNotification(obj)
  }

  onNewOfficeRequest(payload) {
    const userId = payload && payload.userId ? payload.userId : ''
    const currentdate = new Date();
    const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
    const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
    const updatedDateTime = `${date} ${time}`
    const notifyMessage = `New Office Request has been sent on ${updatedDateTime}.`
    const obj = {
      notificationType: 'PUSHNOTIFICATION',
      subNotificationType: 'newOfficeRequest',
      message: notifyMessage,
      fromUserId: 'system',
      toUserId: userId
    }
    this.createNewNotification(obj)
  }

  /*
  onPricipalInvitation(officeId){
    if(officeId){
      let officeDetails = mlDBController.findOne('MlOffice', {_id: officeId}) || {}
      let officeUserId = officeDetails&&officeDetails.userId?officeDetails.userId:""
      var currentdate = new Date();
      var date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
      var time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
      var updatedDateTime = date+" "+time
      let notifyMessage = "You have been invited to be the Principal on "+updatedDateTime+"."
      let obj = {
        notificationType: "PUSHNOTIFICATION",
        "subNotificationType":"onPrincipalInvitation",
        message: notifyMessage,
        fromUserId: "system",
        toUserId: officeUserId
      }
      this.createNewNotification(obj)
    }
  }
*/

  officeBearerApprovedByAdmin(userId) {
    if (userId) {
      const currentdate = new Date();
      const date = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()}`;
      const time = `${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
      const updatedDateTime = `${date} ${time}`
      const notifyMessage = `Office Bearer request has been approved on  ${updatedDateTime}.`
      const obj = {
        notificationType: 'PUSHNOTIFICATION',
        subNotificationType: 'officeBearerApproved',
        message: notifyMessage,
        fromUserId: 'system',
        toUserId: userId
      }
      this.createNewNotification(obj)
    }
  }

  createNewNotification(payload) {
    mlConversationsRepo.createNotifications(payload)
  }
  onUserAssigned(collectionName, transactionId) {
    if (transactionId) {
      const userDetails = mlDBController.findOne(collectionName, { transactionId }) || {};
      let userId = '';
      // receiver user details
      if (userDetails && userDetails.registrationInfo) {
        userId = userDetails && userDetails.registrationInfo && userDetails && userDetails.registrationInfo.userId ? userDetails.registrationInfo.userId : '';
      } else {
        userId = userDetails && userDetails.userId ? userDetails.userId : '';
      }
      //
      // let userInfo=mlDBController.findOne('users', {_id: userId}) || {};

      // let allocationId =  userDetails&&userDetails.allocation&&userDetails.allocation.assigneeId?userDetails.allocation.assigneeId:''
      // let userInfo =  mlDBController.findOne('users', {_id: userId}) || {}
      // let firstName = userInfo&&userInfo.profile&&userInfo.profile.firstName?userInfo.profile.firstName:"";
      // let lastName = userInfo&&userInfo.profile&&userInfo.profile.lastName?userInfo.profile.lastName:"";

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
      const notifyMessage = `${gender} ${comMngFirstName}will be your Community Manager and will help you complete your moolya profile.`
      const obj = {
        notificationType: 'PUSHNOTIFICATION',
        subNotificationType: 'onUserAssigned',
        message: notifyMessage,
        fromUserId: 'system',
        toUserId: userId
      }
      this.createNewNotification(obj)
    }
  }
}

const MlNotificationController = new MlNotificationControllerClass();
Object.freeze(MlNotificationController);

export default MlNotificationController;

