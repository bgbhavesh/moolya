/**
 * Created by mohasin.m on 14/2/17.
 */

let communityDef = [{_id:"ideators",name:"Ideators","code":"IDE",displayName:"Ideators","showOnMap":false,"aboutCommunity":"Ideator","communityImageLink" : "ml ml-ideator","isActive":true},
  {_id:"funders",name:"Investors","code":"FUN",displayName:"Investors","showOnMap":false,"aboutCommunity":"Funder","communityImageLink" : "ml ml-funder","isActive":true},
  {_id:"startups",name:"Startups","code":"STU",displayName:"Startups","showOnMap":false,"aboutCommunity":"Startups","communityImageLink" : "ml ml-startup","isActive":true},
  {_id:"companies",name:"Companies","code":"CMP",displayName:"Companies","showOnMap":false,"aboutCommunity":"Companies","communityImageLink" : "ml ml-company","isActive":true},
  {_id:"serviceproviders",name:"Service Providers","code":"SPS",displayName:"Service Providers","showOnMap":false,"aboutCommunity":"Service Providers","communityImageLink" : "ml ml-users","isActive":true},
  {_id:"institutions",name:"Institutions","code":"INS",displayName:"Institutions","showOnMap":false,"aboutCommunity":"Institutions","communityImageLink" : "ml ml-institutions","isActive":true},
  {_id:"browsers",name:"Browsers","code":"BRW",displayName:"Browsers","showOnMap":false,"aboutCommunity":"Browsers","communityImageLink" : "ml ml-browser","isActive":true},
  {_id:"officebearer",name:"Office Bearer","code":"OFB",displayName:"Office Bearer","showOnMap":false,"aboutCommunity":"Office Bearer","communityImageLink" : "ml ml-moolya-symbol","isActive":true}
  ];

 Meteor.startup(function () {
    for(var i = 0; i < communityDef.length; i++){
        let communityDefinition = MlCommunityDefinition.findOne({code: communityDef[i]["code"]});
        if(!communityDefinition){
          MlCommunityDefinition.insert(communityDef[i]);
        }
    }
 })
