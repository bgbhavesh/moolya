/**
 * Created by venkatsrinag on 14/7/17.
 */
let userTypes = [
  {name:"officebarers", displayName:"Office Bearers", "isActive":true},
  {name:"consultant",   displayName:"Consultant", "isActive":true},
  {name:"serviceprovider", displayName:"Service Provider", "isActive":true},
  {name:"principal", displayName:"Principal", "isActive":true},
  {name:"cofunder", displayName:"Co-Funder", "isActive":true}
];

Meteor.startup(function () {
    for(var i = 0; i < userTypes.length; i++){
        MlOfficeUserType.update({name:userTypes[i].name}, {$set:userTypes[i]}, {upsert:true})
    }
})
