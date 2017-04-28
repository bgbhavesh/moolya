
/**
 * Created by mohammed.mohasin on 26/04/17.
 */
import mlSms from './mlSms';
var fromEmail = Meteor.settings.private.fromEmailAddr;
export default MlAccounts=class MlAccounts {

  static verifyEmailLink(token){
    return Meteor.absoluteUrl('verify-email/' + token);
  }


  static greet(message,user, url) {                                                                                        // 2
      var greeting = user&&user.name ? "Hello " + user.name + "," : "Hello,";                  // 3
      return greeting + "\n\n"+message+" simply click the link below.\n\n" + url + "\n\nThanks.\n";              // 5
    };                                                                                                                   // 13



  static sendVerificationEmail(regId,emailOptions,address,customEmailComponent){

    // XXX Also generate a link using which someone can delete this
    // account if they own said address but weren't those who created this account.
    // Make sure the user exists, and address is one of their addresses.
    // var user = Meteor.users.findOne(regId);
    var userId=regId;
    var user=mlDBController.findOne('MlRegistration', {_id:regId},context);
    if (!user) throw new Error("Can't find user"); // pick the first unverified address if we weren't passed an address.
    //
    if (!address) {
      var email = _.find(user.emails || [], function (e) {
        return !e.verified;
      });

      address = (email || {}).address;

      if (!address) {
        throw new Error("That user has no unverified email addresses.");
      }
    } // make sure we have a valid address

    if (!address || !_.contains(_.pluck(user.emails || [], 'address'), address)) throw new Error("No such email address for user.");
    var tokenRecord = {
      token: Random.secret(),
      address: address,
      when: new Date()
    };

    MlRegistration.update({_id: userId},
      {$push: {'services.email.verificationTokens': tokenRecord}});
    //Meteor.users.update({_id: userId }, {$push: {'services.email.verificationTokens': tokenRecord}});

    var verificationLink = MlAccounts.verifyEmailLink(tokenRecord.token);
    var emailContent=null;

    if (typeof customEmailComponent === 'function') {
      emailContent = customEmailComponent(user,verificationLink);
    }else{
      emailContent= MlAccounts.greet("To verify your account email,",user,verificationLink);
    }

    emailOptions.from=fromEmail;
    emailOptions.to=address;
    if (emailOptions&&emailOptions.emailContentType==="html") {
      emailOptions.html=emailContent;
      Meteor.setTimeout(function () {
        mlEmail.sendHtml(emailOptions);
      }, 2 * 1000);
    }else if(emailOptions&&emailOptions.emailContentType==="text") {
      emailOptions.text=emailContent;
      Meteor.setTimeout(function () {
        mlEmail.sendJson(emailOptions);
      },2 * 1000);
    };

    return {userId: user._id};

  }; // Take token from sendVerificationEmail, mark the email as verified


  static verifyEmail(token) {
       //var user = Meteor.users.findOne({'services.email.verificationTokens.token': token});
    var user=mlDBController.findOne('MlRegistration', {'services.email.verificationTokens.token': token},context);
      if (!user) throw new Meteor.Error(403, "Verify email link expired");

      var tokenRecord = _.find(user.services.email.verificationTokens, function (t) {
        return t.token == token;
      });

      if (!tokenRecord) return {
        userId: user._id,
        error: new Meteor.Error(403, "Verify email link expired")
      };

      var emailsRecord = _.find(user.emails, function (e) {
        return e.address == tokenRecord.address;
      });

      if (!emailsRecord) return {
        userId: user._id,
        error: new Meteor.Error(403, "Verify email link is for unknown address")
      }; // By including the address in the query, we can use 'emails.$' in the
         // modifier to get a reference to the specific object in the emails
         // array.
         MlRegistration.update({_id: user._id,'emails.address': tokenRecord.address},{$set: {'emails.$.verified': true },
                             $pull: {'services.email.verificationTokens': {address: tokenRecord.address}}});

      return {
        userId: user._id
      };
  }

  static sendVerificationSmsOtp(regId,numbr,customEmailComponent){

    var regDetails = mlDBController.findOne('MlRegistration',{_id:regId});

    if(!regDetails){
      throw new Error(403, "Mobile Number entered  is not registered");
    }

    var otp = null;
    var mobileNumber=numbr;
    var countryCode=(regDetails.registrationInfo||{}).countryId;
    var msg=null;
    if(!numbr){
      mobileNumber=(regDetails.registrationInfo||{}).contactNumber;
    }

    var otps = regDetails.otps || [];

    if(otps){
      for(var i =0; i<otps.length; i++){
        var otpRec = otps[i];
        if(otpRec.verified === false){
          if(new Date() - otpRec.time.getTime() < 60*60*1000){
            otp = otpRec.num;
            otpRec.resendTime = new Date();
            break;
          }
        }
      }
    }else{
      var otpNumber = Math.floor(1000 + Math.random() * 9000)+"";
      otps = [{num: otpNumber, time: new Date(), verified: false}];
      otp=otpNumber;
    }

    var otpNum = otp || Math.floor(1000 + Math.random() * 9000)+"";
    if(otp){
      //DO WE NEED TO UPDATE THE TIME?
    }else{
      otps.push({num:otpNum, time: new Date(), verified: false});
    }

    MlRegistration.update({_id: regId},{$set:{"otps": otps}});

    if (typeof customEmailComponent === 'function') {
      msg = customEmailComponent(regDetails,otpNum);
    }else{
      msg= "Use "+otpNum+" as One Time Password (OTP) to verify your moolya account. Do not share this OTP to anyone for security reasons.";
    }

    //send SMS
    if(mobileNumber){

      Meteor.setTimeout(function() {

        mlSms.send(countryCode,mobileNumber,msg);
      }, 1 * 1000);

    }

    // before passing to template, update user object with new token
    var resp={};
    resp.mobileNumber=mobileNumber;
    resp.otp=otp;
    return resp;
  }

  static resendVerificationSmsOtp(numbr,customEmailComponent){

    var regDetails = mlDBController.findOne('MlRegistration',{"registrationInfo.contactNumber":numbr});

    if(!regDetails){
      throw new Error(403, "Mobile Number entered is not registered");
    }

    let to=(regDetails.registrationInfo||{}).contactNumber;
    let countryCode=(regDetails.registrationInfo||{}).countryId;

    if(!to){
      throw new Error(403, "Mobile Number entered is not registered");
    }
    var otp = null;
    var mobileNumber=to;
    var msg=null;
    var otps = regDetails.otps;
    if(otps){
      for(var i =0; i<otps.length; i++){
        var otpRec =otps[i];
        if(otpRec.verified === false){
          if(new Date() - otpRec.time.getTime() < 15*60*1000){
            otp = otpRec.num;
            otpRec.resendTime = new Date();
            break;
          }
        }
      }

    }else{
      var otpNumber = Math.floor(1000 + Math.random() * 9000)+"";
      otps = [{num: otpNumber, time: new Date(), verified: false}];
      otp=otpNumber;
    }

    var otpNum = otp || Math.floor(1000 + Math.random() * 9000)+"";
    if(otp){
      //DO WE NEED TO UPDATE THE TIME?
    }else{
      otps.push({num:otpNum, time: new Date(), verified: false});
    }
    MlRegistration.update({"registrationInfo.contactNumber":numbr},{$set:{"otps":otps}});
    //send SMS
    if (typeof customEmailComponent === 'function') {
      msg = customEmailComponent(regDetails,otpNum);
    }else{
      msg= "Use "+otpNum+" as One Time Password (OTP) to verify your moolya account. Do not share this OTP to anyone for security reasons.";
    }
    //send SMS
    if(mobileNumber){

      Meteor.setTimeout(function() {

        mlSms.send(countryCode,to,"OTP sent for reset password: "+otpNum);
      }, 1 * 1000);

    }

    // before passing to template, update user object with new token
    var resp={};
    resp.mobileNumber=mobileNumber;
    resp.otp=otp;
    return resp;

  }

}

