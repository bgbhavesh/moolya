/**
 * Created by mohasin.m on 14/2/17.
 */

let communityDef = [{_id:"ideators",name:"Ideators","code":"IDE",displayName:"Ideators","showOnMap":false,"aboutCommunity":"Ideator","isActive":true},
  {_id:"funders",name:"Funders","code":"FUN",displayName:"Funders","showOnMap":false,"aboutCommunity":"Funder","isActive":true},
  {_id:"startups",name:"Startups","code":"STU",displayName:"Startups","showOnMap":false,"aboutCommunity":"Startups","isActive":true},
  {_id:"companies",name:"Companies","code":"CMP",displayName:"Companies","showOnMap":false,"aboutCommunity":"Companies","isActive":true},
  {_id:"serviceproviders",name:"Service Providers","code":"SPS",displayName:"Service Providers","showOnMap":false,"aboutCommunity":"Service Providers","isActive":true},
  {_id:"institutions",name:"Institutions","code":"INS",displayName:"Institutions","showOnMap":false,"aboutCommunity":"Institutions","isActive":true},
  {_id:"others",name:"Others","code":"OTH",displayName:"Others","showOnMap":false,"aboutCommunity":"Others","isActive":false}];

 Meteor.startup(function () {
    for(var i = 0; i < communityDef.length; i++){
        let communityDefinition = MlCommunityDefinition.findOne({code: communityDef[i]["code"]});
        if(!communityDefinition){
          MlCommunityDefinition.insert(communityDef[i]);
        }
    }
 })
