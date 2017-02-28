/**
 * Created by mohasin.m on 14/2/17.
 */

let communityAccess = [

  {"isRoot":true,"platformId":"Admin","communityDefId":"ideators","communityDefCode":"IDE","communityDefName":"Ideators","isActive":true,"hierarchyLevel":4,"hierarchyCode":"PLATFORM"},
  {"isRoot":true,"platformId":"Admin","communityDefId":"funders","communityDefCode":"FUN","communityDefName":"Funders","isActive":true,"hierarchyLevel":4,"hierarchyCode":"PLATFORM"},
  {"isRoot":true,"platformId":"Admin","communityDefId":"startups","communityDefCode":"STU","communityDefName":"Startups","isActive":true,"hierarchyLevel":4,"hierarchyCode":"PLATFORM"},
  {"isRoot":true,"platformId":"Admin","communityDefId":"companies","communityDefCode":"CMP","communityDefName":"Companies","isActive":true,"hierarchyLevel":4,"hierarchyCode":"PLATFORM"},
  {"isRoot":true,"platformId":"Admin","communityDefId":"serviceproviders","communityDefCode":"SPS","communityDefName":"Service Providers","isActive":true,"hierarchyLevel":4,"hierarchyCode":"PLATFORM"},
  {"isRoot":true,"platformId":"Admin","communityDefId":"institutions","communityDefCode":"INS","communityDefName":"Institutions","isActive":true,"hierarchyLevel":4,"hierarchyCode":"PLATFORM"},
  {"isRoot":true,"platformId":"Admin","communityDefId":"others","communityDefCode":"OTH","communityDefName":"Others","isActive":true,"hierarchyLevel":4,"hierarchyCode":"PLATFORM"}];

 Meteor.startup(function () {
    for(var i = 0; i < communityAccess.length; i++){
        let communityAccessRec = MlCommunityAccess.findOne({communityDefCode: communityAccess[i]["communityDefCode"],"platformId":"Admin"});
        if(!communityAccessRec){
           MlCommunityAccess.insert(communityAccess[i]);
        }
    }
 })
