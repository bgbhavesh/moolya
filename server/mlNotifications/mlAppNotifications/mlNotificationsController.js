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

  onPotfolioUpdate(details){
    var userId = details&&details.userId?details.userId:""
    var currentdate = new Date();
    var date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
    var time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    var updatedDateTime = date+" "+time
    var notifyMessage = "Your portfolio has been updated on "+updatedDateTime+"."
    let obj = {
      notificationType: "PUSHNOTIFICATION",
      message: notifyMessage,
      fromUserId: "system",
      toUserId: userId
    }
    this.createNewNotification(obj)
  }

  onGoLiveRequest(details){
    var userId = details&&details.userId?details.userId:""
    var currentdate = new Date();
    var date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
    var time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    var updatedDateTime = date+" "+time
    var notifyMessage = "Your Portfolio Go-Live request has been sent to Admin on "+updatedDateTime+"."
    let obj = {
      notificationType: "PUSHNOTIFICATION",
      message: notifyMessage,
      fromUserId: "system",
      toUserId: userId
    }
    this.createNewNotification(obj)
  }

  onGoLiveRequestApproval(details){
    var userId = details&&details._id?details._id:""
    var currentdate = new Date();
    var date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
    var time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    var updatedDateTime = date+" "+time
    var notifyMessage = "Your Go-Live request has been approved by the Admin  on  "+updatedDateTime+"."
    let obj = {
      notificationType: "PUSHNOTIFICATION",
      message: notifyMessage,
      fromUserId: "system",
      toUserId: userId
    }
    this.createNewNotification(obj)
  }

  onGoLiveRequestDecline(details){
    var userId = details&&details._id?details._id:""
    var currentdate = new Date();
    var date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
    var time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    var updatedDateTime = date+" "+time
    var notifyMessage = "Your Go-Live request has been declined by the Admin on "+updatedDateTime+"."
    let obj = {
      notificationType: "PUSHNOTIFICATION",
      message: notifyMessage,
      fromUserId: "system",
      toUserId: userId
    }
    this.createNewNotification(obj)
  }

  onConnectionRequestReceived(fromUserId,toUserId){
    fromUserId  = fromUserId?fromUserId:"";
    toUserId = toUserId?toUserId:""
    var fromUserDetails =  mlDBController.findOne('users', {_id: fromUserId})
    var toUserDetails =  mlDBController.findOne('users', {_id: toUserId})
    let fromUserFirstName = fromUserDetails&&fromUserDetails.profile&&fromUserDetails.profile.firstName?fromUserDetails.profile.firstName:"";
    let fromUserLastName = fromUserDetails&&fromUserDetails.profile&&fromUserDetails.profile.lastName?fromUserDetails.profile.lastName:"";

    let toUserFirstName = toUserDetails&&toUserDetails.profile&&toUserDetails.profile.firstName?toUserDetails.profile.firstName:"";
    let toUserLastName = toUserDetails&&toUserDetails.profile&&toUserDetails.profile.lastName?toUserDetails.profile.lastName:"";

    var notifyMessage = "New connection request from  "+fromUserFirstName+" "+fromUserLastName+"."
    let obj = {
      notificationType: "PUSHNOTIFICATION",
      message: notifyMessage,
      fromUserId: "system",
      toUserId: toUserId
    }
    this.createNewNotification(obj)
  }

  onConnectionRequestSent(fromUserId,toUserId){
    fromUserId  = fromUserId?fromUserId:"";
    toUserId = toUserId?toUserId:""
    var fromUserDetails =  mlDBController.findOne('users', {_id: fromUserId})
    var toUserDetails =  mlDBController.findOne('users', {_id: toUserId})
    let fromUserFirstName = fromUserDetails&&fromUserDetails.profile&&fromUserDetails.profile.firstName?fromUserDetails.profile.firstName:"";
    let fromUserLastName = fromUserDetails&&fromUserDetails.profile&&fromUserDetails.profile.lastName?fromUserDetails.profile.lastName:"";

    let toUserFirstName = toUserDetails&&toUserDetails.profile&&toUserDetails.profile.firstName?toUserDetails.profile.firstName:"";
    let toUserLastName = toUserDetails&&toUserDetails.profile&&toUserDetails.profile.lastName?toUserDetails.profile.lastName:"";

    var notifyMessage = "Connection request for "+toUserFirstName+" "+toUserLastName+"sent."
    let obj = {
      notificationType: "PUSHNOTIFICATION",
      message: notifyMessage,
      fromUserId: "system",
      toUserId: fromUserId
    }
    this.createNewNotification(obj)
  }

  onEnquiryRequestReceived(fromUserId,toUserId){
    fromUserId  = fromUserId?fromUserId:"";
    toUserId = toUserId?toUserId:""
    var currentdate = new Date();
    var date = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
    var time =  currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    var updatedDateTime = date+" "+time
    var notifyMessage = "You have received an Enquiry from "+updatedDateTime+"."
    let obj = {
      notificationType: "PUSHNOTIFICATION",
      message: notifyMessage,
      fromUserId: "system",
      toUserId: toUserId
    }
    this.createNewNotification(obj)
  }

  onReviewReceived(fromUserId,toUserId){
    fromUserId  = fromUserId?fromUserId:"";
    toUserId = toUserId?toUserId:""
    var fromUserDetails =  mlDBController.findOne('users', {_id: fromUserId})
    var toUserDetails =  mlDBController.findOne('users', {_id: toUserId})
    let fromUserFirstName = fromUserDetails&&fromUserDetails.profile&&fromUserDetails.profile.firstName?fromUserDetails.profile.firstName:"";
    let fromUserLastName = fromUserDetails&&fromUserDetails.profile&&fromUserDetails.profile.lastName?fromUserDetails.profile.lastName:"";

    let toUserFirstName = toUserDetails&&toUserDetails.profile&&toUserDetails.profile.firstName?toUserDetails.profile.firstName:"";
    let toUserLastName = toUserDetails&&toUserDetails.profile&&toUserDetails.profile.lastName?toUserDetails.profile.lastName:"";

    var notifyMessage = "You have received a review from "+fromUserFirstName+" "+fromUserLastName+"."
    let obj = {
      notificationType: "PUSHNOTIFICATION",
      message: notifyMessage,
      fromUserId: "system",
      toUserId: toUserId
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

