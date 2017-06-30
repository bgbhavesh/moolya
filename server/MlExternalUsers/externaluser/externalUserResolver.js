/**
 * Created by venkatsrinag on 28/4/17.
 */
import MlResolver from '../../commons/mlResolverDef'
import MlRespPayload from '../../commons/mlPayload'
import MlUserContext from '../../MlExternalUsers/mlUserContext'
import _ from 'lodash'

MlResolver.MlQueryResolver['fetchIdeatorUsers'] = (obj, args, context, info) =>
{
    let sample = [
        {
            username:"",
            profile:{
                isExternaluser:true,
                city:"",
                state:"",
                country:"",
                cluster:"",
                chapter:"",
                community:"",
                externalUserProfiles:{
                    firstName:"",
                    lastName:"",
                    userProfiles:[
                        {
                            registrationId:"",
                            portfolio:[
                                {
                                    portfolioId:"",
                                    isDefault:true
                                }
                            ],
                            countryName:"",
                            countryId:"",
                            cityName:"",
                            mobileNumber:"",
                            clusterId:"",
                            clusterName:"",
                            chapterId:"",
                            chapterName:"",
                            subChapterId:"",
                            subChapterName:"",
                            communityId:"",
                            communityName:"",
                            communityType:"",
                            isDefault:true,
                            isActive:true,
                            accountType:""
                        }
                    ]
                }
            }
        }
    ]
  let code = 200;
  let response = new MlRespPayload().successPayload(sample, code);
  return response;
}

MlResolver.MlQueryResolver['findAddressBook'] = (obj, args, context, info) => {
  // TODO : Authorization
  let userId=context.userId
  const user = Meteor.users.findOne({_id:userId}) || {}
  if(user){
    var registrationId;
    var clusterId;
    // const userProfile = user.profile.isExternaluser?user.profile.externalUserProfiles:[]

    let profile = new MlUserContext(userId).userProfileDetails(userId)
    // for(var i = 0; i < userProfile.length; i++){
    //   if(userProfile[i].isDefault == true){
    //     registrationId = userProfile[i].registrationId;
    //     clusterId = userProfile[i].clusterId;
    //     break;
    //   }
    // }
    registrationId = profile.registrationId;
    clusterId = profile.clusterId;
    const addInfo = user.profile.externalUserAdditionalInfo?user.profile.externalUserAdditionalInfo:[]
    var infoDetails;
    _.each(addInfo,function (say,value) {
      if(say.registrationId == registrationId && say.clusterId == clusterId){
        infoDetails = say
      }
    })
    return infoDetails;
  }else {
    let code = 409;
    let response = new MlRespPayload().errorPayload('Not a valid user', code);
    return response;
  }
}


MlResolver.MlMutationResolver['updateContactNumber'] = (obj, args, context, info) => {

}


MlResolver.MlQueryResolver['fetchUserProfiles'] = (obj, args, context, info) => {
  let userId=context.userId
  const user = Meteor.users.findOne({_id:userId}) || {}
  if(user){
    var userProfiles = user.profile.isExternaluser?user.profile.externalUserProfiles:[];

    //todo: add isApproved Attribute to the profile
    userProfiles=_.filter(userProfiles, {'isActive': true })||[];
    userProfiles=_.map(userProfiles,function (profile)
    {
      let communityDetails=mlDBController.findOne('MlCommunityDefinition', {code: profile.communityDefCode}, context) || {};
      if(communityDetails) {profile.communityImage=communityDetails.communityImageLink}
      return profile;
    })
    return userProfiles;
  }else {
    let code = 409;
    let response = new MlRespPayload().errorPayload('Not a valid user', code);
    return response;
  }

}
MlResolver.MlMutationResolver['deActivateUserProfile'] = (obj, args, context, info) => {
  let userId=context.userId;
  var response=null;
  const user = Meteor.users.findOne({_id:userId}) || {}
  if(user&&args&&args.profileId){
    result = mlDBController.update('users', {'profile.externalUserProfiles':{$elemMatch: {'profileId': args.profileId}}},
      {"profile.externalUserProfiles.$.isDefault": false}, {$set: true}, context);
    response = new MlRespPayload().successPayload({}, 200);
  }else {
    let code = 409;
    response = new MlRespPayload().errorPayload('Not a valid user', code);
    return response;
  }

  return response;

}


MlResolver.MlMutationResolver['blockUserProfile'] = (obj, args, context, info) => {
  let userId=context.userId;
  var response=null;
  const user = Meteor.users.findOne({_id:userId}) || {}
  if(user&&args&&args.profileId){
    result = mlDBController.update('users', {'profile.externalUserProfiles':{$elemMatch: {'profileId': args.profileId}}},
      {"profile.externalUserProfiles.$.isApprove": false}, {$set: true}, context);
    response = new MlRespPayload().successPayload({}, 200);
  }else {
    let code = 409;
    response = new MlRespPayload().errorPayload('Not a valid user', code);
    return response;
  }

  return response;

}

MlResolver.MlMutationResolver['setDefaultProfile'] = (obj, args, context, info) => {
  let userId=context.userId;
  var response=null;
  var update=null;
  const user = mlDBController.findOne('users',{_id:userId}) || {}
  if(user&&args&&args.profileId){
    var hasSwitchedProfile=user.profile.hasSwitchedProfile;
    /*switch profile/make default- if user has makes a profile as default,check for profile switch flag and set switchedProfileDefaultId to selected id
     * if user has switched his profile, then switchedProfileDefaultId value has the default profile Id.
     *Once user logs in again, default profile Id will be retained and switchProfile details will be cleared.
     * */
    if(hasSwitchedProfile){
      result= mlDBController.update('users',{'_id':userId,"profile.hasSwitchedProfile": true,'profile.externalUserProfiles':{$elemMatch: {'profileId': args.profileId}}},
        {"profile.switchedProfileDefaultId": args.profileId}, {$set: true}, context);
    }else{
      result= mlDBController.update('users', {_id:userId,'profile.externalUserProfiles':{$elemMatch: {'isDefault': true}}},
        {"profile.externalUserProfiles.$.isDefault": false}, {$set: true,multi:true}, context);

      result= mlDBController.update('users',{'_id':userId,"profile.hasSwitchedProfile": false,'profile.externalUserProfiles':{$elemMatch: {'profileId': args.profileId}}},
        {"profile.externalUserProfiles.$.isDefault": true, "profile.switchedProfileDefaultId":null}, {$set: true}, context);

    }

    response = new MlRespPayload().successPayload({}, 200);


  }else {
    let code = 409;
     response = new MlRespPayload().errorPayload('Not a valid user', code);
    return response;
  }
  return response;
}


MlResolver.MlMutationResolver['switchExternalProfile'] = (obj, args, context, info) => {
  let userId=context.userId;
  var response=null;
  var update=null;
  const user = mlDBController.findOne('users',{_id:userId}) || {}
  if(user&&args&&args.profileId){

    var defaultUserProfile=_.find(user.profile.externalUserProfiles, {'isDefault':true })||user.profile.externalUserProfiles[0];
    var defaultUserProfileId=defaultUserProfile?defaultUserProfile.profileId:null;
    //Check if switchedProfileDefaultId exists for the first time and update defaultUserProfileId
    result= mlDBController.update('users',{'_id':userId,$or:[{"profile.switchedProfileDefaultId" : { $type: 10 }},{"profile.switchedProfileDefaultId":{ $exists: false } }]},
      {"profile.switchedProfileDefaultId":defaultUserProfileId}, {$set: true,multi:false}, context);

    /*clear the default flag of all profiles*/
    result= mlDBController.update('users', {'_id':userId,'profile.externalUserProfiles':{$elemMatch: {'isDefault': true}}},
      {"profile.externalUserProfiles.$.isDefault": false}, {$set: true,multi:true}, context);

    /*switch profile - if user has switched profile,make the profile as default */
    result= mlDBController.update('users',{'_id':userId,'profile.externalUserProfiles':{$elemMatch: {'profileId': args.profileId}}},
      {"profile.hasSwitchedProfile": true,
        "profile.externalUserProfiles.$.isDefault": true}, {$set: true}, context);

    if(result==1) response = new MlRespPayload().successPayload({}, 200);

  }else {
    let code = 409;
    response = new MlRespPayload().errorPayload('Not a valid user', code);
    return response;
  }
  return response;
}
