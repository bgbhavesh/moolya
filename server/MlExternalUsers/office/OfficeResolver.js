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

MlResolver.MlQueryResolver['fetchAllOfficeMembersWithUserId'] = (obj, args, context, info) => {
  let pipeline = [
    { $match: { userId: context.userId } },
    { $lookup:
      {
        from: "users",
        localField: "emailId",
        foreignField: "username",
        as: "user"
      }
    },
    { $unwind:"$user"},
    { $project: {name:1, userId: '$user._id' , profileImage:'$user.profile.profileImage'} }
  ];
  let response = mlDBController.aggregate('MlOfficeMembers', pipeline);
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
      let isFunder = _.isMatch(profile, {communityDefCode: 'FUN'})
      if(isFunder){
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
            transactionType:'office',
            status: 'Pending',
            duration:{
              years:1
            }
          }
          let extendObj = _.pick(profile, ['clusterId', 'clusterName', 'chapterId', 'chapterName', 'subChapterId', 'subChapterName', 'communityId', 'communityName']);
          let officeTransaction = _.extend(officeDetails, extendObj)
          MlResolver.MlMutationResolver['createOfficeTransaction'](obj, {officeTransaction}, context, info)
        }
      }else {
        let code = 400;
        let response = new MlRespPayload().errorPayload('Not Authorised to create office', code);
        return response;
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
        let response = new MlRespPayload().successPayload("Please add atleast one office member", code);
        return response;
    }
    args.officeMember.joiningDate = new Date();
    var ret = new MlOfficeValidations().officeMemeberValidations(args.myOfficeId, args.officeMember);
    if(!ret.success){
        let code = 400;
        let response = new MlRespPayload().successPayload(ret.msg, code);
        return response;
    }

  try {

    let isUserExist = mlDBController.findOne('users', {username: args.officeMember.emailId})
    if (isUserExist) {
      console.log('user already present')
      // Send an invite to the Existing User
    }
    else {
      // Soft Registration has to be done to new user
      var emails = [{address: args.officeMember.emailId, verified: false}];
      let randomPassword = orderNumberGenService.generateRandomPassword()

      var adminUser = mlDBController.findOne('users', {_id: context.userId}) || {}

      var registrationData = {
        createdBy: adminUser.username,
        password: randomPassword,
        firstName: args.officeMember.firstName,
        lastName: args.officeMember.lastName,
        email:args.officeMember.emailId,
        userName:args.officeMember.emailId,
        contactNumber: args.officeMember.mobileNumber,
        communityName: "Browsers",
        communityDefCode : "BRW",
        registrationType : "BRW",
        communityDefName : "Browsers",
        registrationDate :new Date()
      }



      let profile = new MlUserContext(context.userId).userProfileDetails(context.userId)
      let extendObj = _.pick(profile, ['clusterId', 'clusterName', 'chapterId', 'chapterName', 'subChapterId', 'subChapterName']);
      let finalRegData = _.extend(registrationData, extendObj)
      orderNumberGenService.assignRegistrationId(finalRegData)

      let registrationId = mlDBController.insert('MlRegistration', {
        registrationInfo: finalRegData,
        status: "Yet To Start",
        emails: emails,
        transactionId :finalRegData.registrationId
      }, context)
      if (registrationId) { //for generating verfication token
        MlAccounts.sendVerificationEmail(registrationId,{emailContentType:"html",subject:"Email Verification",context:context});
      }
      if (registrationId) { //for creating new user
        // let officeTrans = {
        //   officeId: args.myOfficeId,
        //   transactionType: 'registration',
        //   communityName: "Browsers",
        //   status: 'done'
        // }
        // let officeTransaction = _.extend(officeTrans, extendObj)
        // MlResolver.MlMutationResolver['createOfficeTransaction'](obj, {officeTransaction}, context, info)

        var userProfileTemp = {
          registrationId: registrationId,
          mobileNumber: args.officeMember.mobileNumber,
          communityName: "Browsers",
          communityDefCode : "BRW",
          isDefault: false,
          isActive: true,
          isApprove: false,
          isTypeOfficeBearer: true
        }
        let userProfile = _.extend(userProfileTemp, extendObj)
        let profile = {
          isInternaluser: false,
          isExternaluser: true,
          email: args.officeMember.emailId,
          mobileNumber: args.officeMember.mobileNumber,
          isActive: false,
          firstName: args.officeMember.firstName,
          lastName: args.officeMember.lastName,
          displayName: args.officeMember.firstName + ' ' + args.officeMember.lastName,
          externalUserProfiles: [userProfile]
        }
        let userObject = {
          username: args.officeMember.emailId,
          profile: profile,
          emails: emails ? emails : []
        }
        orderNumberGenService.createUserProfileId(userProfile);
        let userId = mlDBController.insert('users', userObject, context)
        console.log('userId' + userId);
        if (userId) {
          //Email & MobileNumber verification updates to user
          let registerDetails = mlDBController.findOne('MlRegistration', registrationId, context) || {};
          mlDBController.update('users', {username: userObject.username},
            {
              $set: {
                'services.email': registerDetails && registerDetails.services ? registerDetails.services.email : {},
                'emails': userObject.emails
              }
            }, {'blackbox': true}, context);
          let salted = passwordUtil.hashPassword(registerDetails.registrationInfo.password);
          let res = mlDBController.update('users', {username: userObject.username}, {'services.password.bcrypt': salted}, {$set: true}, context);

        }

        var officeMember = args.officeMember;
        officeMember.officeId = args.myOfficeId;
        officeMember.name = officeMember.firstName + ' ' + officeMember.lastName;
        officeMember['registrationId'] = registrationId
        officeMember['userId'] = context.userId
        officeMember['createdDate'] = new Date()
        let ret = mlDBController.insert('MlOfficeMembers', officeMember, context)
      }
    }

  } catch (e) {
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
    if(args.officeMember.isPrincipal){
      var myOffice = mlDBController.findOne('MlOffice', {_id: args.officeId});
      let principalUserCount = MlOfficeMembers.find({officeId:args.officeId , isPrincipal:true}).count();
      if(principalUserCount == myOffice.principalUserCount){
        let response = new MlRespPayload().errorPayload('Limit Exceeded', code);
        return response;
      }
    }
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
