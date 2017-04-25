MlSerialNumbers = new Mongo.Collection("mlSerialNumbers")

if(Meteor.isServer){
  var portfolioNumber = MlSerialNumbers.findOne({_id:"portfolioNumber"});
  if(!portfolioNumber){
    MlSerialNumbers.insert({_id:"portfolioNumber", seq:0});
  }

  var registrationNumber = MlSerialNumbers.findOne({_id:"registrationNumber"});
  if(!registrationNumber){
    MlSerialNumbers.insert({_id:"registrationNumber", seq:0});
  }

}var transactionNumber = MlSerialNumbers.findOne({_id:"transactionNumber"});
if(!transactionNumber){
  MlSerialNumbers.insert({_id:"transactionNumber", seq:0});
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
    assignRegistrationId:function(registration, communityCode){
      registration.registrationId="ML-RE-"+communityCode+"-"+FormatUtil.leadingZeros(getNextSequence("registrationNumber"),6);
    },
    assignPortfolioId:function(portfolio, communityCode){
      portfolio.portfolioId="ML-PF-"+communityCode+"-"+FormatUtil.leadingZeros(getNextSequence("portfolioNumber"),6);
    },
    assignTransationRequest:function(transaction){
      transaction.requestId="ML-REQ-"+FormatUtil.leadingZeros(getNextSequence("transactionNumber"),6);
    }
  }})();

FormatUtil = {
  leadingZeros: pad
};

function pad(num, size) {
  var s = "000000000" + num;
  return s.substr(s.length-size);
}
