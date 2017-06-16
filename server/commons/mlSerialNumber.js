MlSerialNumbers = new Mongo.Collection("mlSerialNumbers")

// if(Meteor.isServer){
var portfolioNumber = MlSerialNumbers.findOne({_id: "portfolioNumber"});
if (!portfolioNumber) {
  MlSerialNumbers.insert({_id: "portfolioNumber", seq: 0});
}

var registrationNumber = MlSerialNumbers.findOne({_id: "registrationNumber"});
if (!registrationNumber) {
  MlSerialNumbers.insert({_id: "registrationNumber", seq: 0});
}
// }
var transactionNumber = MlSerialNumbers.findOne({_id: "transactionNumber"});
if (!transactionNumber) {
  MlSerialNumbers.insert({_id: "transactionNumber", seq: 0});
}
var requestsNumber = MlSerialNumbers.findOne({_id: "requestsNumber"});
if (!requestsNumber) {
  MlSerialNumbers.insert({_id: "requestsNumber", seq: 0});
}
var officeNumber = MlSerialNumbers.findOne({_id: "officeTransaction"});
if (!officeNumber) {
  MlSerialNumbers.insert({_id: "officeTransaction", seq: 0});
}

var profileNumber = MlSerialNumbers.findOne({_id: "profileNumber"});
if (!profileNumber) {
  MlSerialNumbers.insert({_id: "profileNumber", seq: 0});
}

orderNumberGenService = (function(){
  function getNextSequence(name) {
    var ret = MlSerialNumbers.update(
      { _id: name },
      { $inc: { seq: 1 } },
      {upsert:true}
    )
    if(ret===1){
      let data=MlSerialNumbers.findOne({_id:name})
      if(data){
       return data.seq
      }
    }
    return ret;
  }

  return {
    assignRegistrationId:function(registration){
      registration.registrationId="ML-RE-"+FormatUtil.leadingZeros(getNextSequence("registrationNumber"),8);
    },
    assignPortfolioId:function(portfolio){
      let portfolioId = "ML-PF-"+FormatUtil.leadingZeros(getNextSequence("portfolioNumber"),8);
      portfolio.portfolioId=portfolioId
      portfolio.transactionId= portfolioId
    },
      assignTransationRequest:function(transaction){
      transaction.transactionTypeId="ML-TR-"+FormatUtil.leadingZeros(getNextSequence("transactionNumber"),8);
    },
    assignRequests:function(requests){
      requests.requestId="ML-REQ-"+FormatUtil.leadingZeros(getNextSequence("requestsNumber"),8);
    },
    assignOfficeTransaction: function (officeTransaction) {
      officeTransaction.transactionId = "ML-OF-" + FormatUtil.leadingZeros(getNextSequence("officeTransaction"), 8);
    },
    assignProcessSetupTransaction: function (officeTransaction) {
      officeTransaction.transactionId = "ML-PS-" + FormatUtil.leadingZeros(getNextSequence("officeTransaction"), 8);
    },

    createUserProfileId: function (userProfile) {
      userProfile.profileId = "ML-PRO-" + FormatUtil.leadingZeros(getNextSequence("profileNumber"), 8);
    },
    generateRandomPassword:function(){
      var randomId = function makeid(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 7; i++ )
          text += possible.charAt(Math.floor(Math.random() * possible.length));
          return text;
      }

      return "ML"+randomId();
    }

    /*generateProfileId:function(transaction){
      regDetails.profileId="ML-PR-"+FormatUtil.leadingZeros(getNextSequence("profileNumber"),8);
    }*/
  }})();

FormatUtil = {
  leadingZeros: pad
};

function pad(num, size) {
  var s = "000000000" + num;
  return s.substr(s.length-size);
}
