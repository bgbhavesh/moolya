/**
 * Created by venkatsrinag on 28/7/17.
 */
/**
 * Created by venkatsrinag on 28/7/17.
 */

let frequencyType = [
  {name:"onetime", displayName:"One Time", description:"", code:"ONETIME", isActive:true},
  {name:"monthly", displayName:"Monthly", description:"", code:"MONTHLY", isActive:true},
  {name:"quaterly", displayName:"Quaterly", description:"", code:"QUATERLY", isActive:true},
  {name:"halfyearly", displayName:"Half Yearly", description:"", code:"HALFYEARLY", isActive:true},
  {name:"yearly", displayName:"Yearly", description:"", code:"YEARLY", isActive:true},
];

Meteor.startup(function () {
  for(var i = 0; i < frequencyType.length; i++){
    let frequencytype = MlFrequencyType.findOne({code: frequencyType[i].code});
    if(!frequencytype){
      MlFrequencyType.insert(frequencyType[i]);
    }
  }
})
