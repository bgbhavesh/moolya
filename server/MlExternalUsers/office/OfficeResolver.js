/**
 * Created by venkatsrinag on 11/5/17.
 */

import MlResolver from "../../commons/mlResolverDef";
import MlRespPayload from "../../commons/mlPayload";
import MlUserContext from "../../MlExternalUsers/mlUserContext";
import MlOfficeValidations from "../userSubscriptions/officeValidations";
import passwordUtil from "../../commons/passwordUtil";

import _ from "lodash";

MlResolver.MlQueryResolver['fetchOffice'] = (obj, args, context, info) => {
  let myOffice = [];
  if (context.userId) {
    myOffice = mlDBController.find('MlOffice', {userId: context.userId}).fetch()
    return myOffice
  } else {
    let code = 400;
    let response = new MlRespPayload().errorPayload("Not a Valid user", code);
    return response;
  }
}

MlResolver.MlQueryResolver['fetchOfficeById'] = (obj, args, context, info) => {
  let myOffice = [];
  if (context.userId) {
    myOffice = mlDBController.findOne('MlOffice', {_id:args.officeId})
    return myOffice
  } else {
    let code = 400;
    let response = new MlRespPayload().errorPayload("Not a Valid user", code);
    return response;
  }
}

MlResolver.MlQueryResolver['fetchOfficeMembers'] = (obj, args, context, info) => {
  let query = {
    officeId:args.officeId,
    isPrincipal: args.isPrincipal
  }
  let response = mlDBController.find('MlOfficeMembers', query).fetch();
  return response;
}

MlResolver.MlQueryResolver['fetchOfficeMember'] = (obj, args, context, info) => {
  let query = {
    _id:args.memberId
  }
  let response = mlDBController.findOne('MlOfficeMembers', query);
  return response;
}

MlResolver.MlMutationResolver['createOffice'] = (obj, args, context, info) => {
  var ret = "";
  try {
    if (args.myOffice) {
      let userId = context.userId;
      let myOffice = args.myOffice;
      let profile = new MlUserContext(userId).userProfileDetails(userId)
      myOffice['userId'] = context.userId;
      myOffice['isActive'] = false;
      myOffice['createdDate'] = new Date();
      if (profile) {
        myOffice["clusterId"] = profile.clusterId;
        myOffice["clusterName"] = profile.clusterName;
        myOffice["chapterId"] = profile.chapterId;
        myOffice["chapterName"] = profile.chapterName;
        myOffice["subChapterId"] = profile.subChapterId;
        myOffice["subChapterName"] = profile.subChapterName;
        myOffice["communityId"] = profile.communityId;
        myOffice["communityName"] = profile.communityName;
      }
      ret = mlDBController.insert('MlOffice', myOffice, context)
      if (!ret) {
        let code = 400;
        let response = new MlRespPayload().successPayload("Failed To Create Office", code);
        return response;
      } else {
        let officeDetails = {
          officeId: ret,
          // userId: userId,
          // clusterId: profile.clusterId,
          // clusterName: profile.clusterName,
          // chapterId: profile.chapterId,
          // chapterName: profile.chapterName,
          // subChapterId: profile.subChapterId,
          // subChapterName: profile.subChapterName,
          // communityId: profile.communityId,
          // communityName: profile.communityName,
          //dateTime: new Date(),
          // transactionId: 'TransId',
          status: 'Pending'
        }
        let extendObj = _.pick(profile, ['clusterId', 'clusterName', 'chapterId', 'chapterName', 'subChapterId', 'subChapterName', 'communityId', 'communityName']);
        let officeTransaction = _.extend(officeDetails, extendObj)
        MlResolver.MlMutationResolver['createOfficeTransaction'](obj, {officeTransaction}, context, info)
        // let officeTransResponse = mlDBController.insert('MlOfficeTransaction', officeTrans, context);
        // if(!officeTransResponse){
        //   let code = 400;
        //   let response = new MlRespPayload().errorPayload("error in transaction creation", code);
        //   return response;
        // }
        // let code = 200;
        // let response = new MlRespPayload().successPayload("Office transaction created", code);
        // return response;
      }
    }
  }
  catch (e) {
    let code = 400;
    let response = new MlRespPayload().successPayload(e.message, code);
    return response;
  }

  let code = 200;
  let response = new MlRespPayload().successPayload(ret, code);
  return response;
}

MlResolver.MlMutationResolver['updateOffice'] = (obj, args, context, info) => {
}

MlResolver.MlMutationResolver['updateOfficeStatus'] = (obj, args, context, info) => {
  if(!args.id){
    let code = 400;
    let response = new MlRespPayload().successPayload('Office id is required', code);
    return response;
  }
  let result = mlDBController.update('MlOffice', args.id, {isActive:true}, {$set:true},  context);
  let code = 200;
  let response = new MlRespPayload().successPayload('Office activated', code);
  return response;
}

MlResolver.MlQueryResolver['findOfficeDetail'] = (obj, args, context, info) => {
  if (!args.officeId) {
    let code = 400;
    let response = new MlRespPayload().successPayload("Office Id is required", code);
    return response;
  }
  let pipeline = [{'$match': {_id: args.officeId}},
    {'$project': {office: '$$ROOT'}},
    {
      '$lookup': {
        from: 'mlOfficeTransaction',
        localField: 'office._id',
        foreignField: 'officeId',
        as: 'officeTransaction'
      }
    },
    {'$unwind': '$officeTransaction'},
    {
      '$project': {
        office: 1, officeTransaction: {
          status: '$officeTransaction.status', transactionId: '$officeTransaction.transactionId',
          orderSubscriptionDetails: '$officeTransaction.orderSubscriptionDetails',
          paymentDetails: '$officeTransaction.paymentDetails'
        }
      }
    }
  ];
  let result = mlDBController.aggregate('MlOffice', pipeline);
  let code = 200;
  let response = new MlRespPayload().successPayload(result, code);
  return response;
}


MlResolver.MlMutationResolver['createOfficeMembers'] = (obj, args, context, info) => {
    if(!args.myOfficeId){
        let code = 400;
        let response = new MlRespPayload().successPayload("Invalid Office", code);
        return response;
    }
    var ret = new MlOfficeValidations().validateOfficeExpiryDate(args.myOfficeId);
    if(!ret.success){
        let code = 400;
        let response = new MlRespPayload().successPayload(ret.msg, code);
        return response;
    }

    if(_.isEmpty(args.officeMember)){
        let code = 400;
        let response = new MlRespPayload().successPayload("Please add atleast one office memeber", code);
        return response;
    }
    args.officeMember.joiningDate = new Date();
    var ret = new MlOfficeValidations().officeMemeberValidations(args.myOfficeId, args.officeMember);
    if(!ret.success){
        let code = 400;
        let response = new MlRespPayload().successPayload(ret.msg, code);
        return response;
    }

    try{

        var officeMember = args.officeMember;
        officeMember.officeId = args.myOfficeId;
        officeMember.name = officeMember.firstName +' ' + officeMember.lastName;
        let ret = MlOfficeMembers.insert({...officeMember});

        let isUserExist = mlDBController.findOne('users', {username: args.officeMember.emailId})
        if(isUserExist){
            // Send an invite to the Existing User
        }
        else{
          // Soft Registration has to be done to new user
          var emails=[{address:args.officeMember.emailId,verified:false}];
          args.registration = {}
          if(Meteor.users.findOne({_id : context.userId}))
          {
            args.registration.createdBy = Meteor.users.findOne({_id: context.userId}).username
          }
          args.registration.firstName = args.officeMember.firstName;
          args.registration.lastName = args.officeMember.lastName;
          args.registration.email = args.officeMember.emailId;
          args.registration.contactNumber = args.officeMember.mobileNumber;
          let randomPassword = orderNumberGenService.generateRandomPassword()
          args.registration.password = randomPassword
          args.registration.registrationDate =  new Date()
          let id = mlDBController.insert('MlRegistration', {registrationInfo: args.registration, status: "Yet To Start",emails:emails}, context)
          if (id) { //for generating verfication token
             MlAccounts.sendVerificationEmail(id,{emailContentType:"html",subject:"Email Verification",context:context});
          }
          if(id){ //for creating new user
            var userProfile = {
              registrationId: id,
              mobileNumber: args.officeMember.mobileNumber,
              communityName: "BROWSER",
              isDefault: false,
              isActive: true,
              isApprove:false,
              isTypeOfficeBearer:true
            }
            let profile = {
              isInternaluser: false,
              isExternaluser: true,
              email: args.officeMember.emailId,
              mobileNumber:args.officeMember.mobileNumber,
              isActive   : false,
              firstName  :args.officeMember.firstName,
              lastName   : args.officeMember.lastName,
              displayName :args.officeMember.firstName+' '+ args.officeMember.lastName,
              externalUserProfiles: [userProfile]
            }
            let userObject = {
              username: args.officeMember.emailId,
              profile: profile,
              emails:emails?emails:[]
            }
            console.log(userObject);
            orderNumberGenService .createUserProfileId(userProfile);
            let userId = mlDBController.insert('users', userObject, context)
            console.log(userId);
           /* orderNumberGenService .createUserProfileId(userProfile);*/
            //let userId = mlDBController.insert('users', {userObject}, context)
            if(userId){
              //Email & MobileNumber verification updates to user
              let registerDetails= mlDBController.findOne('MlRegistration', id, context) || {};
              mlDBController.update('users', {username: userObject.username},
                {$set: {'services.email':registerDetails&&registerDetails.services?registerDetails.services.email:{},
                  'emails':userObject.emails}},{'blackbox': true}, context);
              let salted = passwordUtil.hashPassword(registerDetails.registrationInfo.password);
              let res = mlDBController.update('users', {username: userObject.username}, { 'services.password.bcrypt': salted}, {$set:true}, context);

            }
          }
        }

    }catch (e){
      let code = 400;
      let response = new MlRespPayload().successPayload(e.message, code);
      return response;
    }

    let code = 200;
    let response = new MlRespPayload().successPayload("Member Added Successfully", code);
    return response;
}

MlResolver.MlMutationResolver['updateOfficeMember'] =(obj, args, context, info) => {
  if(!args.memberId){
    let code = 400;
    let response = new MlRespPayload().successPayload("Invalid Office", code);
    return response;
  }
  try{
    let ret = mlDBController.update('MlOfficeMembers', args.memberId, args.officeMember, {$set:true}, context);
    let code = 200;
    let response = new MlRespPayload().successPayload("Member Updated Successfully", code);
    return response;
  } catch (e){
    let code = 400;
    let response = new MlRespPayload().successPayload(e.message, code);
    return response;
  }


}
