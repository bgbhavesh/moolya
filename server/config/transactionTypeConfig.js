let transactionType = [
  {_id:'portfolio',transactionName:"portfolio",transactionDisplayName:"Portfolio",transactionDescription:"","isActive":true},
  {_id:'valuation',transactionName:"valuation",transactionDisplayName:"Valuation",transactionDescription:"","isActive":true},
  {_id:'registration',transactionName:"registration",transactionDisplayName:"Registration",transactionDescription:"","isActive":true},
  {_id:'funding',transactionName:"funding",transactionDisplayName:"Funding",transactionDescription:"","isActive":true}
];
Meteor.startup(function () {
  for(var i = 0; i < transactionType.length; i++){
    let transactionTypeData = MlTransactionTypes.findOne({_id: transactionType[i]._id});
    if(!transactionTypeData){
      MlTransactionTypes.insert(transactionType[i]);
    }
  }
})

