let transactionType = [
  {_id:'portfolio',name:"portfolio",displayName:"Portfolio",about:"","isActive":true},
  {_id:'valuation',name:"valuation",displayName:"Valuation",about:"","isActive":true},
  {_id:'registration',name:"registration",displayName:"Registration",about:"","isActive":true},
  {_id:'funding',name:"funding",displayName:"Funding",about:"","isActive":true}
];
Meteor.startup(function () {
  for(var i = 0; i < transactionType.length; i++){
    let transactionTypeData = MlTransactionTypes.findOne({_id: transactionType[i]._id});
    if(!transactionTypeData){
      MlTransactionTypes.insert(transactionType[i]);
    }
  }
})

