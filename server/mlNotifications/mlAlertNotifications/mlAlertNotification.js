/**
 * Created by sravani on 31/7/17.
 */
import NotificationTemplateEngine from '../../commons/mlTemplateEngine'
const MlAlertNotification = class MlAlertNotification {
  static onPasswordAlert() {
    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const timeStamp = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    const regObj = {
      timeStamp,
      date
    }
    const alert = NotificationTemplateEngine.fetchTemplateContent('ALT_password_changed_successfully', 'alert', regObj)
    if (alert && alert.content ? alert : '') {
      return alert.content
    }
  }
  static onConnectionRequestSent(details) {
    if (details) {
      var details = mlDBController.findOne('users', { _id: details })
      const toUserFirstName = details && details.profile && details.profile.firstName ? details.profile.firstName : '';
      const toUserLastName = details && details.profile && details.profile.lastName ? details.profile.lastName : '';
      const regObj = {
        userName: `${toUserFirstName} ${toUserLastName}`
      }
      const connectRequest = NotificationTemplateEngine.fetchTemplateContent('ALT_new_connection_request_sent', 'alert', regObj)
      if (connectRequest && connectRequest.content ? connectRequest : '') {
        return connectRequest.content
      }
    } else {
      return ''
    }
  }
  static onConnectionSenderDeclined(fromUserId) {
    if (fromUserId) {
      fromUserId = fromUserId || '';
      const fromUserDetails = mlDBController.findOne('users', { _id: fromUserId })
      const fromUserFirstName = fromUserDetails && fromUserDetails.profile && fromUserDetails.profile.firstName ? fromUserDetails.profile.firstName : '';
      const fromUserLastName = fromUserDetails && fromUserDetails.profile && fromUserDetails.profile.lastName ? fromUserDetails.profile.lastName : '';
      const regObj = {
        userName: `${fromUserFirstName} ${fromUserLastName}`
      }
      const connectRequest = NotificationTemplateEngine.fetchTemplateContent('ALT_new_connection_request_declined_message_sender_side', 'alert', regObj)
      if (connectRequest && connectRequest.content ? connectRequest : '') {
        return connectRequest.content
      }
    } else {
      return ''
    }
  }
  static onConnectionSenderAccept(fromUserId) {
    if (fromUserId) {
      fromUserId = fromUserId || '';
      const fromUserDetails = mlDBController.findOne('users', { _id: fromUserId })
      const fromUserFirstName = fromUserDetails && fromUserDetails.profile && fromUserDetails.profile.firstName ? fromUserDetails.profile.firstName : '';
      const fromUserLastName = fromUserDetails && fromUserDetails.profile && fromUserDetails.profile.lastName ? fromUserDetails.profile.lastName : '';
      const regObj = {
        userName: `${fromUserFirstName} ${fromUserLastName}`
      }
      const connectRequest = NotificationTemplateEngine.fetchTemplateContent('ALT_new_connection_request_accept_message_sender_side', 'alert', regObj)
      if (connectRequest && connectRequest.content ? connectRequest : '') {
        return connectRequest.content
      }
    } else {
      return ''
    }
  }
  static onEnquireRequestSent(toUserDetails) {
    const toUserFirstName = toUserDetails && toUserDetails.profile && toUserDetails.profile.firstName ? toUserDetails.profile.firstName : '';
    const toUserLastName = toUserDetails && toUserDetails.profile && toUserDetails.profile.lastName ? toUserDetails.profile.lastName : '';
    const regObj = {
      userName: `${toUserFirstName} ${toUserLastName}`
    }
    const enquire = NotificationTemplateEngine.fetchTemplateContent('ALT_new_enquire_request_sent', 'alert', regObj)
    if (enquire && enquire.content ? enquire : '') {
      return enquire.content
    }
  }
  static onFollowRequestMsg(details) {
    if (details) {
      var details = mlDBController.findOne('users', { _id: details })
      const toUserFirstName = details && details.profile && details.profile.firstName ? details.profile.firstName : '';
      const toUserLastName = details && details.profile && details.profile.lastName ? details.profile.lastName : '';
      const regObj = {
        userName: `${toUserFirstName} ${toUserLastName}`
      }
      const follow = NotificationTemplateEngine.fetchTemplateContent('ALT_follow_message_sender_side', 'alert', regObj)
      if (follow && follow.content ? follow : '') {
        return follow.content
      }
    } else {
      return ''
    }
  }
  static onFavouriteRequestMsg(details) {
    if (details) {
      var details = mlDBController.findOne('users', { _id: details })
      const toUserFirstName = details && details.profile && details.profile.firstName ? details.profile.firstName : '';
      const toUserLastName = details && details.profile && details.profile.lastName ? details.profile.lastName : '';
      const regObj = {
        userName: `${toUserFirstName} ${toUserLastName}`
      }
      const favourite = NotificationTemplateEngine.fetchTemplateContent('ALT_favourite_request_message_sender_side', 'alert', regObj)
      if (favourite && favourite.content ? favourite : '') {
        return favourite.content
      }
    } else {
      return ''
    }
  }
  static onKycUpload(args) {
    const details = mlDBController.findOne('MlRegistration', { _id: args.registrationId })
    const document = details && details.kycDocuments && details.kycDocuments.documentName ? details.kycDocuments.documentName : '';
    const regObj = {
      kycDocument: document
    }
    const kyc = NotificationTemplateEngine.fetchTemplateContent('ALT_kyc_uploaded', 'alert', regObj)
    if (kyc && kyc.content ? kyc : '') {
      return kyc.content
    }
  }
  static onOfficeRequestSent() {
    const officerequest = NotificationTemplateEngine.fetchTemplateContent('ALT_new_office_request_sent', 'alert', null)
    if (officerequest && officerequest.content ? officerequest : '') {
      return officerequest.content
    }
  }
  static onPortfolioUpdates() {
    const currentDate = new Date();
    const date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    const timeStamp = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    const regObj = {
      timeStamp,
      date
    }
    const alert = NotificationTemplateEngine.fetchTemplateContent('ALT_portfolio_updated', 'alert', regObj)
    if (alert && alert.content ? alert : '') {
      return alert.content
    }
  }
  static onGoLiveRequestAdmin() {
    const liverequest = NotificationTemplateEngine.fetchTemplateContent('ALT_go_live_request_sent_to_admin', 'alert', null)
    if (liverequest && liverequest.content ? liverequest : '') {
      return liverequest.content
    }
  }
  static onLikeRequest() {
    const likerequest = NotificationTemplateEngine.fetchTemplateContent('ALT_new_like_sent', 'alert', null)
    if (likerequest && likerequest.content ? likerequest : '') {
      return likerequest.content
    }
  }
}
export default MlAlertNotification;
