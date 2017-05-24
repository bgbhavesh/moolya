let transactionType = [
  {_id:'portfolio',transactionName:"portfolio",transactionDisplayName:"Portfolio",transactionDescription:"","isActive":true,"createdDateTime": new Date},
  {_id:'valuation',transactionName:"valuation",transactionDisplayName:"Valuation",transactionDescription:"","isActive":true,"createdDateTime": new Date},
  {_id:'registration',transactionName:"registration",transactionDisplayName:"Registration",transactionDescription:"","isActive":true,"createdDateTime": new Date},
  {_id:'funding',transactionName:"funding",transactionDisplayName:"Funding",transactionDescription:"","isActive":true,"createdDateTime": new Date},
  {_id:'system',transactionName:"system",transactionDisplayName:"System",transactionDescription:"","isActive":true,"createdDateTime": new Date},
  {_id:'interaction',transactionName:"interaction",transactionDisplayName:"Interaction",transactionDescription:"","isActive":true,"createdDateTime": new Date},
  {_id:'conversation',transactionName:"conversation",transactionDisplayName:"Conversation",transactionDescription:"","isActive":true,"createdDateTime": new Date}
];
Meteor.startup(function () {
  for(var i = 0; i < transactionType.length; i++){
    let transactionTypeData = MlTransactionTypes.findOne({_id: transactionType[i]._id});
    if(!transactionTypeData){
      MlTransactionTypes.insert(transactionType[i]);
    }
  }
})

