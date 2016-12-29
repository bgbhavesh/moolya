/**
 * Emailing
 */

/* Sample JSON:
 {
 from: getFromEmailAddress(),
 to: "suresh.sakham@trochil.com",
 subject: "Message Subject",
 text: "Message Body"
 }
 */
SMTPEmail = (function(){
  var SMTPEmailClass = function(){

  };
  SMTPEmailClass.prototype.send = function(email){
    Email.send(email);
  };
  return SMTPEmailClass;
})();

//Mandrill Email, Sample JSON
/*

 "message": {

 "text": "Example text content - via Server",
 "subject": "example subject",
 "from_email": "zoylo-ivr@raksanconsulting.com",
 "from_name": "zoylo-ivr",
 "to": [
 {
 "email": "suresh.sakham@trochil.com",
 "type": "to"
 }
 ],
 "important": false,
 "async": true

 }
 };*/


MandrillEmail = (function(){
  var MandrillEmailClass = function(){

  };
  MandrillEmailClass.prototype._createMandrillJSON = function(email){
    return {
      "message": {

        "text": email.text,
        "subject": email.subject,
        "from_email": email.from,
        "from_name": "Moolya",
        "to": [
          {
            "email": email.to,
            "type": "to"
          }
        ],
        "important": true,
        "async": true

      }
    };
  };

  MandrillEmailClass.prototype._createMandrillAttachment = function(email){
    return {
      "message": {

        "text": email.text,
        "subject": email.subject,
        "from_email": email.from,
        "from_name": "Moolya",
        "to": [
          {
            "email": email.to,
            "type": "to"
          }
        ],
        "attachments":email.attachments,
        "important": true,
        "async": true

      }
    };
  };



  MandrillEmailClass.prototype.send = function(email){
    Mandrill.messages.send(this._createMandrillJSON(email));
  };
  MandrillEmailClass.prototype.sendAttachments = function(email){
    Mandrill.messages.send(this._createMandrillAttachment(email));
  };
  MandrillEmailClass.prototype._createMandrillHTML = function(email){
    return {
      "message": {

        "html": email.html,
        "subject": email.subject,
        "from_email": email.from,
        "from_name": "Moolya",
        "to": [
          {
            "email": email.to,
            "type": "to"
          }
        ],
        "important": true,
        "async": true

      }
    };
  };
  MandrillEmailClass.prototype.send = function(email){
    Mandrill.messages.send(this._createMandrillJSON(email));
  };
  MandrillEmailClass.prototype.sendHTML = function(email){
    Mandrill.messages.send(this._createMandrillHTML(email));
  };
  return MandrillEmailClass;
})();

// all in lowercase
var whitelistedEmailDomains = ["@raksanconsulting.com","@moolya.com"];
var isWhiteListedEmail = function (email)
{
  // console.log("Meteor.settings.private.isWhiteListHonoured value is "+Meteor.settings.private.isWhiteListHonoured);
  // if(!email){
  //   return;
  // }
  // if (!Meteor.settings.private.isWhiteListHonoured) {
  //   return true;
  // }
  // else
  {
    //commented for Pre-Launch remove return true and uncomment next line
    //return whitelistedEmailDomains.indexOf(email.trim().substring(email.trim().lastIndexOf("@")).toLowerCase()) !== -1;
    // return true;
    var returnValue =whitelistedEmailDomains.indexOf(email.trim().substring(email.trim().lastIndexOf("@")).toLowerCase()) !== -1;
    console.log("Sending the email to "+email+" True/False? "+returnValue);
    return returnValue;
    console.log("Sending the email to "+email+" True/False? "+ (whitelistedEmailDomains.indexOf(email.trim().substring(email.trim().lastIndexOf("@")).toLowerCase()) !== -1));
    return whitelistedEmailDomains.indexOf(email.trim().substring(email.trim().lastIndexOf("@")).toLowerCase()) !== -1;
  }
};
MoolyaEmailSys = (function(){
  var MoolyaEmailSysClass = function(){

  };
  MoolyaEmailSysClass.prototype._smtpSys = new MandrillEmail();
  MoolyaEmailSysClass.prototype.send = function(email){
    if(email && isWhiteListedEmail(email.to)){
      this._smtpSys.send(email);
    }
  };
  MoolyaEmailSysClass.prototype.sendAttachments = function(email){
    if(email && isWhiteListedEmail(email.to)){
      this._smtpSys.sendAttachments(email);
    }
  };
  MoolyaEmailSysClass.prototype.sendHTML = function(email){
    if(email && isWhiteListedEmail(email.to)){
      this._smtpSys.sendHTML(email);
    }
  };
  return MoolyaEmailSysClass;
})();

