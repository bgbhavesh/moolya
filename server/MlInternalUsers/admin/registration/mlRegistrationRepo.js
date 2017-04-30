
/**
 * Created by mohammed.mohasin on 30/04/17.
 */
import _ from 'lodash';
class MlRegistrationRepo{

  constructor(){
    if(!MlRegistrationRepo.instance){
      MlRegistrationRepo.instance = this;
    }
      return MlRegistrationRepo.instance;
  }

/*@param regId
*This method updates the email/mobile number verification details of external user for the registration.
*User will have multiple profiles but the primary verification details will be verified only once.
**/
  updateUserVerificationDetails(regId,type,context){
    var  regDetails= mlDBController.findOne('MlRegistration',regId, context) || {};
    var updatedCount=0;

    if(regDetails){
       var userName=regDetails.registrationInfo.email;
      var  emailVerificationTokens=null;
      var emails=null;
      var emailRec=null;
      var otps=null;
      var mobileNumber=null;
      switch(type){

        case 'email':
           emailVerificationTokens=regDetails&&regDetails.services&&regDetails.services.email&&regDetails.services.email.verificationTokens?regDetails.services.email.verificationTokens:[];
           emails=regDetails&&regDetails.emails?regDetails.emails:[];
           emailRec = _.find(emails || [], function (e) {
            return e.address==userName;
          });
          //verify the email of user if its not verified. its one time activity.
           updatedCount=mlDBController.update('users', {username:userName,'emails': {$elemMatch: {'address': userName,'verified':false}}},
            {$set: {'emails.$':emailRec},$push:{'services.email.verificationTokens':emailVerificationTokens}},{'blackbox': true}, context);
          break;

        case "mobileNumber":
           otps=regDetails&&regDetails.otps?regDetails.otps:[];
           mobileNumber=regDetails&&regDetails.registrationInfo&&regDetails.registrationInfo.contactNumber?regDetails.registrationInfo.contactNumber:null;
          //User mobile number verification should be based on email and mobileNumber
          //if user has valid email then check for verified mobileNumber to update the otp
          //Most Important: if user changes the mobileNumber,otps should be cleared.
          updatedCount=mlDBController.update('users', {username:userName,'otps': {$elemMatch: {'verified':false}}},
            {$set: {'otps':otps}},{'blackbox': true}, context);
          break;

        case "all":
           emailVerificationTokens=regDetails&&regDetails.services&&regDetails.services.email&&regDetails.services.email.verificationTokens?regDetails.services.email.verificationTokens:[];
           emails=regDetails&&regDetails.emails?regDetails.emails:[];
           mobileNumber=regDetails&&regDetails.registrationInfo&&regDetails.registrationInfo.contactNumber?regDetails.registrationInfo.contactNumber:null;
           otps=regDetails&&regDetails.otps?regDetails.otps:[];
          //fetch the email of user from emails array
           emailRec = _.find(emails || [], function (e) {
            return e.address==userName;
          });

          mlDBController.update('users', {username:userName,'emails': {$elemMatch: {'address': userName,'verified':false}}},
            {$set: {'emails.$':emailRec},$push:{'services.email.verificationTokens':emailVerificationTokens}},{'blackbox': true}, context);

          mlDBController.update('users', {username:userName,'otps': {$elemMatch: {'verified':false}}},
            {$set: {'otps':otps}},{'blackbox': true}, context);

          break;

    }
      return updatedCount;

    }

}

}
const mlRegistrationRepo = new MlRegistrationRepo();
Object.freeze(mlRegistrationRepo);

export default mlRegistrationRepo;

