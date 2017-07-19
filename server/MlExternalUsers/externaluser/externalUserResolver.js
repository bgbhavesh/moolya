/**
 * Created by venkatsrinag on 28/4/17.
 */
import MlResolver from '../../commons/mlResolverDef'
import MlRespPayload from '../../commons/mlPayload'
import MlUserContext from '../../MlExternalUsers/mlUserContext'
import _ from 'lodash'
import _underscore from 'underscore'
var fs = Npm.require('fs');
var Future = Npm.require('fibers/future');
import geocoder from "geocoder";

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

  var  user= mlDBController.findOne('users',{_id:userId},context) || {};
  if(user){
    var registrationId;
    var clusterId;
    let profile = new MlUserContext(userId).userProfileDetails(userId)

    registrationId = profile.registrationId;
    clusterId = profile.clusterId;
    const addInfo = user.profile.externalUserAdditionalInfo?user.profile.externalUserAdditionalInfo:[]
    var infoDetails;
   /* _.each(addInfo,function (say,value) {
      if(say.registrationId == registrationId && say.clusterId == clusterId){
        infoDetails = say
      }
    })*/
    infoDetails = _underscore.find(addInfo, {'profileId': profile.profileId}) || {};
    return infoDetails;
  }else {
    let code = 409;
    let response = new MlRespPayload().errorPayload('Not a valid user', code);
    return response;
  }
}


MlResolver.MlMutationResolver['updateUserGeneralInfo'] = (obj, args, context, info) => {

  let id = " "
  // let registrationDetails =MlRegistration.findOne({_id: args.registrationId}) || {};
  let registrationDetails = mlDBController.findOne('users',{_id:context.userId},context) || {};
  if(args && args.registration) {
    if (args.type == "CONTACTTYPE") {
      id = mlDBController.update('users', {_id: context.userId,'profile.externalUserAdditionalInfo.profileId': args.profileId}, {'profile.externalUserAdditionalInfo.$.contactInfo': args.registration.contactInfo},{$set: true}, context)
    } else if (args.type == "ADDRESSTYPE") {
      id = mlDBController.update('users', {_id: context.userId,'profile.externalUserAdditionalInfo.profileId': args.profileId}, {'profile.externalUserAdditionalInfo.$.addressInfo': args.registration.addressInfo},{$set: true}, context)
    } else if (args.type == "SOCIALLINKS") {
      //id = mlDBController.update('MlRegistration', args.registrationId, {'socialLinksInfo': args.registration.socialLinksInfo}, {$set: true}, context)
      id = mlDBController.update('users', {_id: context.userId,'profile.externalUserAdditionalInfo.profileId': args.profileId}, {'profile.externalUserAdditionalInfo.$.socialLinksInfo': args.registration.socialLinksInfo},{$set: true}, context)
    } else if (args.type == "EMAILTYPE") {
      //id = mlDBController.update('MlRegistration', args.registrationId, {'emailInfo': args.registration.emailInfo}, {$set: true}, context)
      id = mlDBController.update('users', {_id: context.userId,'profile.externalUserAdditionalInfo.profileId': args.profileId}, {'profile.externalUserAdditionalInfo.$.emailInfo':args.registration.emailInfo},{$set: true}, context)
    }
  }

  if(id){
    let code = 200;
    let response = new MlRespPayload().successPayload(id, code);
    return response
  }


}

MlResolver.MlMutationResolver['createUserGeneralInfo'] = (obj, args, context, info) => {
    let id = "";
    let response;
  var fut = new Future();
  if(args.registration&& args.registrationId && args.profileId){

    var  registrationDetails= mlDBController.findOne('users',{_id:context.userId},context) || {};


    const addInfo = registrationDetails.profile.externalUserAdditionalInfo?registrationDetails.profile.externalUserAdditionalInfo:[]
    let infoDetails = _underscore.find(addInfo, {'profileId': args.profileId}) || {};


    if(args && args.registration){
      if(args.type == "CONTACTTYPE"){

        let dbData = _underscore.pluck(infoDetails.contactInfo, 'numberType') || [];
        let contactExist = null;
        if(args.registration&&args.registration.contactInfo&&args.registration.contactInfo[0]){
          contactExist = _underscore.contains(dbData, args.registration.contactInfo[0].numberType);
        }

        if(contactExist){
          let code = 409;
          let response = new MlRespPayload().errorPayload("Contact type already exist!!!!", code);
          return response;
        }

        if(infoDetails.contactInfo){
          id = mlDBController.update('users', {_id: context.userId,'profile.externalUserAdditionalInfo.profileId': args.profileId}, {'profile.externalUserAdditionalInfo.$.contactInfo': args.registration.contactInfo[0]},{$push: true}, context)
        }else{
          //id = mlDBController.update('MlRegistration', args.registrationId, {'contactInfo': args.registration.contactInfo}, {$set: true}, context)
          id = mlDBController.update('users', {_id: context.userId,'profile.externalUserAdditionalInfo.profileId': args.profileId}, {'profile.externalUserAdditionalInfo.$.contactInfo': [args.registration.contactInfo[0]]},{$set: true}, context)
        }

      }else if(args.type == "ADDRESSTYPE"){
        let dbData = _underscore.pluck(infoDetails.addressInfo, 'addressType') || [];
        let addressExist = null;
        if(args.registration.addressInfo&&args.registration.addressInfo[0]){
          addressExist = _underscore.contains(dbData, args.registration.addressInfo[0].addressType);
        }

        if(addressExist){
          let code = 409;
          let response = new MlRespPayload().errorPayload("Address type already exist!!!!", code);
          return response;
        }
        if(infoDetails.addressInfo){
          // id = MlRegistration.update(
          //   { _id : args.registrationId },
          //   { $push: { 'addressInfo': args.registration.addressInfo[0] } }
          // )
          let city = args.registration.addressInfo[0].addressCity
          let area = args.registration.addressInfo[0].addressArea
          let locality = args.registration.addressInfo[0].addressLocality
          let pin =args.registration.addressInfo[0].addressPinCode
          geocoder.geocode(locality+","+area+","+city+","+pin, Meteor.bindEnvironment(function ( err, data ) {
            if(err){
              throw new Error("Invalid Locality selection "+e);
            }
            args.registration.addressInfo[0].latitude = data&&data.results[0]&&data.results[0].geometry&&data.results[0].geometry.location&&data.results[0].geometry.location.lat?data.results[0].geometry.location.lat:null;
            args.registration.addressInfo[0].longitude = data&&data.results[0]&&data.results[0].geometry&&data.results[0].geometry.location&&data.results[0].geometry.location.lat?data.results[0].geometry.location.lng:null;

            try{
              // let id = MlClusters.insert(cluster);
             /* let  id = mlDBController.update('users', {_id: context.userId},{'profile.externalUserAdditionalInfo.profileId': args.profileId}, {'$push': {
                'profile.externalUserAdditionalInfo.$.addressInfo': args.registration.addressInfo[0]
              }}, context)*/
              id = mlDBController.update('users', {_id: context.userId,'profile.externalUserAdditionalInfo.profileId': args.profileId}, {'profile.externalUserAdditionalInfo.$.addressInfo': args.registration.addressInfo[0]},{$push: true}, context)
              if(id){
                let code = 200;
                let result = {addressId: id}
                 response = JSON.stringify(new MlRespPayload().successPayload(result, code));
                if(response){
                  fut.return(response);
                }
              }
            }catch(e){
              throw new Error("Error while updating address "+e);
            }

          }),{key:Meteor.settings.private.googleApiKey});
          var addressData = fut.wait();
        }else{
          let city = args.registration.addressInfo[0].addressCity||"";
          let area = args.registration.addressInfo[0].addressArea||"";
          let locality = args.registration.addressInfo[0].addressLocality||"";
          let pin =args.registration.addressInfo[0].addressPinCode||"";
          geocoder.geocode(locality+","+area+","+city+","+pin, Meteor.bindEnvironment(function ( err, data ) {
            if(err){
              throw new Error("Invalid Locality selection "+e);
            }
            args.registration.addressInfo[0].latitude = data&&data.results[0]&&data.results[0].geometry&&data.results[0].geometry.location&&data.results[0].geometry.location.lat?data.results[0].geometry.location.lat:null;
            args.registration.addressInfo[0].longitude = data&&data.results[0]&&data.results[0].geometry&&data.results[0].geometry.location&&data.results[0].geometry.location.lat?data.results[0].geometry.location.lng:null;

            try{
              // let id = MlClusters.insert(cluster);
              //let id = mlDBController.update('MlRegistration', args.registrationId, {'addressInfo': args.registration.addressInfo}, {$set: true}, context)
               id = mlDBController.update('users', {_id: context.userId,'profile.externalUserAdditionalInfo.profileId': args.profileId}, {'profile.externalUserAdditionalInfo.$.addressInfo': [args.registration.addressInfo[0]]},{$set: true}, context)
              if(id){
                let code = 200;
                let result = {addressId: id}
                let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
                if(response){
                  fut.return(response);
                }

              }
            }catch(e){
              throw new Error("Error while updating address "+e);
            }
          }),{key:Meteor.settings.private.googleApiKey});

          var addressData = fut.wait();

        }
      }else if (args.type == "EMAILTYPE") {
        let dbData = _underscore.pluck(infoDetails.emailInfo, 'emailIdType') || [];
        let emailTypeExist = null;
        if(args.registration.emailInfo[0]){
          emailTypeExist = _underscore.contains(dbData, args.registration.emailInfo[0].emailIdType);
        }

        if(emailTypeExist){
          let code = 409;
          let response = new MlRespPayload().errorPayload("Email   type already exist!!!!", code);
          return response;
        }
        if(infoDetails.emailInfo){
          id = mlDBController.update('users', {_id: context.userId,'profile.externalUserAdditionalInfo.profileId': args.profileId}, {'profile.externalUserAdditionalInfo.$.emailInfo': args.registration.emailInfo[0]},{$push: true}, context)
        }else{
          id = mlDBController.update('users', {_id: context.userId,'profile.externalUserAdditionalInfo.profileId': args.profileId}, {'profile.externalUserAdditionalInfo.$.emailInfo': [args.registration.emailInfo[0]]},{$set: true}, context)
        }
      }
    }


  }

  if(id){
    let code = 200;


    let response = new MlRespPayload().successPayload(id, code);
    return response
  }


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
    /**switch profile/make default- if user has makes a profile as default,check for profile switch flag and set switchedProfileDefaultId to selected id
     * if user has switched his profile, then switchedProfileDefaultId value has the default profile Id.
     *Once user logs in again, default profile Id will be retained and switchProfile details will be cleared.
     * */
    if(hasSwitchedProfile){
      result= mlDBController.update('users',{'_id':userId,"profile.hasSwitchedProfile": true,'profile.externalUserProfiles':{$elemMatch: {'profileId': args.profileId}}},
        {"profile.switchedProfileDefaultId": args.profileId}, {$set: true}, context);
    }else{
      result= mlDBController.update('users', {_id:userId,'profile.externalUserProfiles':{$elemMatch: {'isDefault': true}}},
        {"profile.externalUserProfiles.$.isDefault": false}, {$set: true,multi:true}, context);

      /**check if hasSwitchedProfile value is false/null/undefined/not exists*/
      result= mlDBController.update('users',{'_id':userId,$or:[{"profile.hasSwitchedProfile":false},{"profile.hasSwitchedProfile" : { $type: 10 }},{"profile.hasSwitchedProfile":{ $exists: false } }],'profile.externalUserProfiles':{$elemMatch: {'profileId': args.profileId}}},
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
    /**Check if switchedProfileDefaultId exists for the first time and update defaultUserProfileId*/
    result= mlDBController.update('users',{'_id':userId,$or:[{"profile.switchedProfileDefaultId" : { $type: 10 }},{"profile.switchedProfileDefaultId":{ $exists: false } }]},
      {"profile.switchedProfileDefaultId":defaultUserProfileId}, {$set: true,multi:false}, context);

    /**clear the default flag of all profiles*/
    result= mlDBController.update('users', {'_id':userId,'profile.externalUserProfiles':{$elemMatch: {'isDefault': true}}},
      {"profile.externalUserProfiles.$.isDefault": false}, {$set: true,multi:true}, context);

    /**switch profile - if user has switched profile,make the profile as default */
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

MlResolver.MlQueryResolver['fetchMapCenterCordsForExternalUser'] = (obj, args, context, info) => {
  var clusterId=args.id||null;

  if(!clusterId){
    let user= mlDBController.findOne('users',{_id:context.userId});
    var externalProfile = _.find(user.profile.externalUserProfiles, {'isDefault':true});
    if(!externalProfile){
      externalProfile = user.profile.externalUserProfiles[0];
    }
    clusterId=externalProfile.clusterId;
  }

  let clusterDetails = MlClusters.findOne(clusterId);
  if (clusterDetails && clusterDetails.latitude && clusterDetails.longitude) {
    return {lat: clusterDetails.latitude, lng: clusterDetails.longitude};
  }
}
