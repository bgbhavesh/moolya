`use strict`;

import mlConversationsRepo from '../../commons/Conversations/mlConversationsRepo'
class MlNotificationControllerClass {

  /**create new Notification*/

  createNewApplication() {
    mlConversationsRepo.createApplication();
  }

  createNewUser(user) {
    var userId = user.userId
    var notifyMessage = "Welcome to moolya. Your moolya relationship manager will coordinate with you to complete your moolya profile"
    var that = this
    mlConversationsRepo.createUser(user, function (ret) {
      if (ret && ret.success) {
        let obj = {
          "notificationType": "PUSHNOTIFICATION",
          "message": notifyMessage,
          "fromUserId": "system",
          "toUserId": userId
        }
        that.createNewNotification(obj)
      }
    });
  }

  onKYCApprove(payload) {
    var userId = payload && payload.registrationInfo && payload.registrationInfo.userId ? payload.registrationInfo.userId : ""
    var notifyMessage = "KYC documents have been approved on " + new Date()
    let obj = {
      notificationType: "PUSHNOTIFICATION",
      message: notifyMessage,
      fromUserId: "system",
      toUserId: userId
    }
    this.createNewNotification(obj)
  }

  onKYCDecline(payload) {
    var userId = payload && payload.registrationInfo && payload.registrationInfo.userId ? payload.registrationInfo.userId : ""
    var firstName = payload && payload.registrationInfo && payload.registrationInfo.firstName ? payload.registrationInfo.firstName : ""
    var notifyMessage = "Your KYC document(s): "+firstName+ " have been declined by the admin. Please login and upload the KYC documents as per the requirement."

    let obj = {
      notificationType: "PUSHNOTIFICATION",
      message: notifyMessage,
      fromUserId: "system",
      toUserId: userId
    }
    this.createNewNotification(obj)
  }

  createNewNotification(payload) {
    mlConversationsRepo.createNotifications(payload)
  }
}

const MlNotificationController = new MlNotificationControllerClass();
Object.freeze(MlNotificationController);

export default MlNotificationController;

