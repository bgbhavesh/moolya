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
    let alert = NotificationTemplateEngine.fetchTemplateContent("ALT_password_changed_successfully","alert",regObj)
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
static onEnquireRequestSent(toUserDetails){
  let toUserFirstName = toUserDetails&&toUserDetails.profile&&toUserDetails.profile.firstName?toUserDetails.profile.firstName:"";
  let toUserLastName = toUserDetails&&toUserDetails.profile&&toUserDetails.profile.lastName?toUserDetails.profile.lastName:"";
  let regObj = {
    userName : toUserFirstName+" "+toUserLastName,
  }
  let enquire = NotificationTemplateEngine.fetchTemplateContent("ALT_new_enquire_request_sent","alert",regObj)
  if(enquire && enquire.content ? enquire :''){
    return enquire.content
  }
}
static onKycUpload(args){
  var details =   mlDBController.findOne('MlRegistration', {_id: args.registrationId})
  let  document = details&&details.kycDocuments&&details.kycDocuments.documentName?details.kycDocuments.documentName:"";
  let regObj = {
    kycDocument : document
  }
  let kyc = NotificationTemplateEngine.fetchTemplateContent("ALT_kyc_uploaded","alert",regObj)
  if(kyc && kyc.content ? kyc :''){
    return kyc.content
  }
}
static onOfficeRequestSent(){
  let officerequest = NotificationTemplateEngine.fetchTemplateContent("ALT_new_office_request_sent","alert",null)
  if(officerequest && officerequest.content ? officerequest :''){
    return officerequest.content
  }
}
static  onPortfolioUpdates(){
  var currentDate = new Date();
  let date =  currentDate.getDate() + "/" + (currentDate.getMonth()+1)  + "/" + currentDate.getFullYear();
  let timeStamp =  currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
  let regObj= {
    timeStamp : timeStamp,
    date      : date
  }
  let alert = NotificationTemplateEngine.fetchTemplateContent("ALT_portfolio_updated","alert",regObj)
  if(alert && alert.content ? alert :''){
    return alert.content
  }
}
 static onGoLiveRequestAdmin(){
   let liverequest = NotificationTemplateEngine.fetchTemplateContent("ALT_go_live_request_sent_to_admin","alert",null)
   if(liverequest && liverequest.content ? liverequest :''){
     return liverequest.content
   }
 }
 static onLikeRequest(){
   let likerequest = NotificationTemplateEngine.fetchTemplateContent("ALT_new_like_sent","alert",null)
   if(likerequest && likerequest.content ? likerequest :''){
     return likerequest.content
   }
 }
}
export default MlAlertNotification;
