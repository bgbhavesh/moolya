/**
 * Created by sravani on 31/7/17.
 */
import NotificationTemplateEngine from "../../commons/mlTemplateEngine"
const MlAlertNotification= class MlAlertNotification {

  static onPasswordAlert(){
    var currentDate = new Date();
    let date =  currentDate.getDate() + "/" + (currentDate.getMonth()+1)  + "/" + currentDate.getFullYear();
    let timeStamp =  currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    let regObj= {
      timeStamp : timeStamp,
      date      : date
    }
    let alert = NotificationTemplateEngine.fetchTemplateContent("ALT_Password_Changed_Successfully","alert",regObj)
    if(alert && alert.content ? alert :''){
      return alert.content
    }
  }
static onConnectionRequestSent(details){
 var details =  mlDBController.findOne('users',{_id: details})
  let  toUserFirstName = details&&details.profile&&details.profile.firstName?details.profile.firstName:"";
  let toUserLastName = details&&details.profile&&details.profile.lastName?details.profile.lastName:"";
  let regObj = {
    userName:toUserFirstName + " " + toUserLastName
  }
  let connectRequest = NotificationTemplateEngine.fetchTemplateContent("ALT_new_connection_request_sent","alert",regObj)
  if(connectRequest && connectRequest.content ? connectRequest :''){
    return connectRequest.content
  }
}
static onConnectionRequestReceived(fromUserId){
  fromUserId  = fromUserId?fromUserId:"";
  var fromUserDetails = mlDBController.findOne({_id: fromUserId});
  let fromUserFirstName = fromUserDetails&&fromUserDetails.profile&&fromUserDetails.profile.firstName?fromUserDetails.profile.firstName:"";
  let fromUserLastName = fromUserDetails&&fromUserDetails.profile&&fromUserDetails.profile.lastName?fromUserDetails.profile.lastName:"";
  let regObj = {
    userName: fromUserFirstName + " " + fromUserLastName,
  }
  let connectReceived = NotificationTemplateEngine.fetchTemplateContent("ALT_new_connection_request_recvd","alert",regObj)
  if(connectReceived && connectReceived.content ? connectReceived :''){
    return connectReceived.content
  }
}
// static onKycApprove(){
//   let kycApprove = NotificationTemplateEngine.fetchTemplateContent("ALT_kyc_approved_portfolio_started","alert",null)
//   if(kycApprove && kycApprove.content){
//   return kycApprove.content
//   }
// }
static onEnquireRequestSent(toUserDetails){
  let toUserFirstName = toUserDetails&&toUserDetails.profile&&toUserDetails.profile.firstName?toUserDetails.profile.firstName:"";
  let toUserLastName = toUserDetails&&toUserDetails.profile&&toUserDetails.profile.lastName?toUserDetails.profile.lastName:"";
  let regObj = {
    userName : toUserFirstName+" "+toUserLastName,
  }
  let enquire = NotificationTemplateEngine.fetchTemplateContent("ALT_new_enquire_request_sent","alert",regObj)
  if(enquire && enquire.content){
    return enquire.content
  }
}
// static onKycUpload(context){
//   var userDetails =   mlDBController.findOne('users', {_id:context.userId})
//   let  document = userDetails&&userDetails.profile&&userDetails.profile.firstName?userDetails.profile.firstName:"";
//   let regObj = {
//     kycDocument : document,
//   }
//   let kyc = NotificationTemplateEngine.fetchTemplateContent("ALT_kyc_uploaded","alert",regObj)
//   if(kyc && kyc.content){
//     return kyc.content
//   }
// }

}
export default MlAlertNotification;
