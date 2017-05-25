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
    result = mlDBController.update('users', {'profile.externalUserProfiles':{$elemMatch: {'registrationId': args.profileId}}},
      {"profile.externalUserProfiles.$.isActive": false}, {$set: true}, context);
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
    result = mlDBController.update('users', {'profile.externalUserProfiles':{$elemMatch: {'registrationId': args.profileId}}},
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
  const user = Meteor.users.findOne({_id:userId}) || {}
  if(user&&args&&args.profileId){

    result= mlDBController.update('users', {'profile.externalUserProfiles':{$elemMatch: {'isDefault': true}}},
      {"profile.externalUserProfiles.$.isDefault": false}, {$set: true,multi:true}, context);

    result= mlDBController.update('users', {'profile.externalUserProfiles':{$elemMatch: {'registrationId': args.profileId}}},
      {"profile.externalUserProfiles.$.isDefault": true}, {$set: true}, context);
     response = new MlRespPayload().successPayload({}, 200);
  }else {
    let code = 409;
     response = new MlRespPayload().errorPayload('Not a valid user', code);
    return response;
  }
  return response;
}
