let promoCodes = [
  {_id:'moolya1',code:"moolya1",description:"moolya1","isActive":true,"validityFrom":new Date(Date.UTC(2017,1,2)),"validityTo":new Date(Date.UTC(2017,4,2))},
  {_id:'moolya2',code:"moolya2",description:"moolya2","isActive":true,"validityFrom":new Date(Date.UTC(2017,1,2)),"validityTo":new Date(Date.UTC(2017,6,2))},
];
Meteor.startup(function () {
  for(var i = 0; i < promoCodes.length; i++){
    let promo = MlPromocodes.findOne({_id: promoCodes[i]._id});
    if(!promo){
      MlPromocodes.insert(promoCodes[i]);
    }
  }
})

