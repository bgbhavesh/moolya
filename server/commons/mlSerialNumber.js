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

var internalTaskNumber = MlSerialNumbers.findOne({_id: "internalTaskNumber"});
if (!internalTaskNumber) {
  MlSerialNumbers.insert({_id: "internalTaskNumber", seq: 0});
}

var activityNumber = MlSerialNumbers.findOne({_id: "activityNumber"});
if (!activityNumber) {
  MlSerialNumbers.insert({_id: "activityNumber", seq: 0});
}
var taskNumber = MlSerialNumbers.findOne({_id: "taskNumber"});
if (!taskNumber) {
  MlSerialNumbers.insert({_id: "taskNumber", seq: 0});
}
var sessionNumber = MlSerialNumbers.findOne({_id: "sessionNumber"});
if (!sessionNumber) {
  MlSerialNumbers.insert({_id: "sessionNumber", seq: 0});
}
var serviceNumber = MlSerialNumbers.findOne({_id: "serviceNumber"});
if (!serviceNumber) {
  MlSerialNumbers.insert({_id: "serviceNumber", seq: 0});
}

let userServiceOrderNumber = MlSerialNumbers.findOne({_id: "userServiceOrderNumber"});
if (!userServiceOrderNumber) {
  MlSerialNumbers.insert({_id: "userServiceOrderNumber", seq: 0});
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
      registration.registrationId="MLRE"+FormatUtil.leadingZeros(getNextSequence("registrationNumber"),8);
    },
    assignPortfolioId:function(portfolio){
      let portfolioId = "MLPF"+FormatUtil.leadingZeros(getNextSequence("portfolioNumber"),8);
      portfolio.portfolioId=portfolioId
      portfolio.transactionId= portfolioId
    },
    assignTransationRequest:function(transaction){
      transaction.transactionTypeId="MLTR"+FormatUtil.leadingZeros(getNextSequence("transactionNumber"),8);
    },
    assignRequests:function(requests){
      requests.requestId="MLREQ"+FormatUtil.leadingZeros(getNextSequence("requestsNumber"),8);
    },
    assignOfficeTransaction: function (officeTransaction) {
      officeTransaction.transactionId = "MLOF" + FormatUtil.leadingZeros(getNextSequence("officeTransaction"), 8);
    },
    assignProcessSetupTransaction: function (officeTransaction) {
      officeTransaction.transactionId = "MLPS" + FormatUtil.leadingZeros(getNextSequence("officeTransaction"), 8);
    },
    createUserProfileId: function (userProfile) {
      userProfile.profileId = "MLPRO" + FormatUtil.leadingZeros(getNextSequence("profileNumber"), 8);
    },
    createinternalTaskId: function (taskObj) {
      taskObj.internalTaskId = "MLITK" + FormatUtil.leadingZeros(getNextSequence("internalTaskNumber"), 8);
    },
    createInteractionSCcode: function (scDef) {
      scDef.code = "MLINT"+ FormatUtil.leadingZeros(getNextSequence("interactionSC"), 8);
    },
    createBspokeOfficeSCcode: function (scDef) {
      scDef.code = "ML-OFF-"+ FormatUtil.leadingZeros(getNextSequence("bspoke"), 8);
    },
    createActivityId: function (userActivity) {
      userActivity.transactionId = "MLACT"+ FormatUtil.leadingZeros(getNextSequence("activityNumber"), 8);
    },
    createTaskId: function (userTask) {
      userTask.transactionId = "MLTSK"+ FormatUtil.leadingZeros(getNextSequence("taskNumber"), 8);
    },
    createSessionId: function (userTask) {
      userTask.sessionId = "MLSES"+ FormatUtil.leadingZeros(getNextSequence("sessionNumber"), 8);
    },
    createServiceId: function (userService) {
      userService.transactionId = "MLSER"+ FormatUtil.leadingZeros(getNextSequence("serviceNumber"), 8);
    },
    createUserServiceOrderId: function (data) {
      data.orderId = "MLUSO" + FormatUtil.leadingZeros(getNextSequence("userServiceOrderNumber"), 8);
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
