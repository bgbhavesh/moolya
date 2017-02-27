/**
 * Created by mohasin.m on 14/2/17.
 */

let communityDef = [{_id:"ideators",name:"Ideators","code":"IDE",displayName:"Ideators","showOnMap":false,"aboutCommunity":"Ideator","communityImageLink" : "https://s3.ap-south-1.amazonaws.com/moolya-app-images/communities/ideator_lg_icon.png","isActive":true},
  {_id:"funders",name:"Funders","code":"FUN",displayName:"Funders","showOnMap":false,"aboutCommunity":"Funder","communityImageLink" : "https://s3.ap-south-1.amazonaws.com/moolya-app-images/communities/funder_lg_icon.png","isActive":true},
  {_id:"startups",name:"Startups","code":"STU",displayName:"Startups","showOnMap":false,"aboutCommunity":"Startups","communityImageLink" : "https://s3.ap-south-1.amazonaws.com/moolya-app-images/communities/startup_lg_icon.png","isActive":true},
  {_id:"companies",name:"Companies","code":"CMP",displayName:"Companies","showOnMap":false,"aboutCommunity":"Companies","communityImageLink" : "https://s3.ap-south-1.amazonaws.com/moolya-app-images/communities/company_lg_icon.png","isActive":true},
  {_id:"serviceproviders",name:"Service Providers","code":"SPS",displayName:"Service Providers","showOnMap":false,"aboutCommunity":"Service Providers","communityImageLink" : "https://s3.ap-south-1.amazonaws.com/moolya-app-images/communities/provider_lg_icon.png","isActive":true},
  {_id:"institutions",name:"Institutions","code":"INS",displayName:"Institutions","showOnMap":false,"aboutCommunity":"Institutions","communityImageLink" : "https://s3.ap-south-1.amazonaws.com/moolya-app-images/communities/institutions_lg_icon.png","isActive":true},
  {_id:"others",name:"Others","code":"OTH",displayName:"Others","showOnMap":false,"aboutCommunity":"Others","isActive":false}];

 Meteor.startup(function () {
    for(var i = 0; i < communityDef.length; i++){
        let communityDefinition = MlCommunityDefinition.findOne({code: communityDef[i]["code"]});
        if(!communityDefinition){
          MlCommunityDefinition.insert(communityDef[i]);
        }
    }
 })
