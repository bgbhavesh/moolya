/**
 * Created by  mohammed.mohasin on 6/5/17.
 */
import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import _ from 'lodash';
import mlInteractionService from '../mlInteractionRepoService';
import MlEmailNotification from '../../../mlNotifications/mlEmailNotifications/mlEMailNotification'
import MlAlertNotification from '../../../mlNotifications/mlAlertNotifications/mlAlertNotification'
MlResolver.MlMutationResolver['createInquiry'] = (obj, args, context, info) =>{
    if(args && context && context.userId){
      var resp=null;
        try {
            let user =mlDBController.findOne('users',{_id:context.userId}, context);
          var resourceDetails = mlInteractionService.fetchResourceBasedUserDetails(args.resourceType, args.resourceId, context);
          var fromuser = resourceDetails.contextUser;
          var toUser = resourceDetails.resourceOwner;
          if (!toUser._id || !fromuser._id || fromuser._id===toUser._id) {
            let code = 400;
            let response = new MlRespPayload().errorPayload('Invalid User', code);
            return response;
          }
          let inquiry={resourceId:args.resourceId,resourceType:args.resourceType,subject:args.subject,
                       message:args.message,userId:fromuser._id,userEmail:fromuser.username,createdOn:new Date()};

          //resp = MlInquiries.insert(inquiry);
          resp=mlDBController.insert('MlInquiries',inquiry,context);

          if(resp){
            //todo: create a repo for inquiry
            //send Email and transaction Log
            //MlEmailNotification.sendInquiryEmail({message:inquiry.message,subject:inquiry.subject,fromEmail:fromuser.username,toEmail:toUser.username},context);
            //Transaction Log
            MlEmailNotification.enquireRequest(fromuser,toUser)
          }
        }catch (e){
            let code = 400;
            let response = new MlRespPayload().errorPayload(e.message, code);
            return response;
        }
        // let code = 200;
        let enquire =  MlAlertNotification. onEnquireRequestSent(toUser)
        let response = new MlRespPayload().successPayload(enquire,200);
        return response;
    }
}


validateExternalUser=(user)=>{
    let userExternal = user.profile.isExternaluser;
    //check if email is verified.
    let emails=user&&user.emails?user.emails:[];
    var email = _.find(emails || [], function (e) { return (e.verified&&e.address===user.username);});
    if(!email){return false;}
    return userExternal
}
