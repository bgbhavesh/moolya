/**
 * Created by venkatsrinag on 11/5/17.
 */

import MlResolver from "../../commons/mlResolverDef";
import MlRespPayload from "../../commons/mlPayload";
import MlUserContext from "../../MlExternalUsers/mlUserContext";
import mlOfficeValidationRepo from "./officeRepo";
import passwordUtil from "../../commons/passwordUtil";
import _ from "lodash";

MlResolver.MlQueryResolver['fetchOffice'] = (obj, args, context, info) => {
  let officeSC = [];
  if (context.userId) {
    officeSC = mlDBController.find('MlOffice', {userId: context.userId, isActive:true}).fetch()
    return officeSC
  } else {
    let code = 400;
    let response = new MlRespPayload().errorPayload("Not a Valid user", code);
    return response;
  }
}

MlResolver.MlQueryResolver['fetchOfficeSC'] = (obj, args, context, info) => {
  let officeSC = [];
  if (context.userId) {
    officeSC = mlDBController.find('MlOfficeSC', {userId: context.userId, isActive:true}).fetch()
    let extProfile = new MlUserContext(context.userId).userProfileDetails(context.userId)
    let regData = mlDBController.findOne('MlRegistration', {'registrationInfo.communityDefCode': extProfile.communityDefCode,'registrationInfo.userId':context.userId, status:'Approved'})
    if(regData){
      if(!_.isEmpty(officeSC)){  //if office is there and reg approved
        var newArr = _.map(officeSC, function(element) {
          return _.extend({}, element, {isRegistrationApproved: true});
        });
        return newArr
      }else{          //if no office and registration is approved
        return [{isRegistrationApproved: true}]
      }

    }else {
      return [{isRegistrationApproved: false}]
    }
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
};

MlResolver.MlQueryResolver['fetchOfficeSCById'] = (obj, args, context, info) => {
  let myOffice = [];
  if (context.userId) {
    myOffice = mlDBController.findOne('MlOfficeSC', {officeId:args.officeId});
    return myOffice
  } else {
    let code = 400;
    let response = new MlRespPayload().errorPayload("Not a Valid user", code);
    return response;
  }
};

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
    { $match: { 'user.profile.isActive':true } },
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
  let officeId = '';
  try {
    let userId = context.userId;
    let scDefId = "";
    let scId = "";
    let officeDetails = args.myOffice;
    let profile = new MlUserContext(userId).userProfileDetails(userId)
    let isFunder = _.isMatch(profile, {communityDefCode: 'FUN'})
    if(isFunder){
      // office record creation
      officeId = mlOfficeValidationRepo.createOffice(officeDetails, profile, context);
      if (!officeId) {
        let code = 400;
        let response = new MlRespPayload().successPayload("Failed To Create Office", code);
        return response;
      }
      // office Transaction record creation
      let details = {
        officeId: officeId,
        transactionType:'office',
        status: 'Pending',
        duration:{
          years:1
        }
      }
      let extendObj = _.pick(profile, ['clusterId', 'clusterName', 'chapterId', 'chapterName', 'subChapterId', 'subChapterName', 'communityId', 'communityName']);
      let officeTransaction = _.extend(details, extendObj)
      MlResolver.MlMutationResolver['createOfficeTransaction'](obj, {officeTransaction}, context, info)

      // office beSpoke Service Card Definition
      if(officeDetails.isBeSpoke)
        scDefId = mlOfficeValidationRepo.createBspokeSCDef(officeDetails, profile, context, officeId);
      else{
          // search for office id from MLOfficeSCDef
      }

      scId = mlOfficeValidationRepo.createofficeServiceCard(officeDetails, profile, context, scDefId, officeId)
    }
  }catch (e){
    let code = 400;
    return new MlRespPayload().successPayload("Failed To Create Office", code);
  }
  let code = 200;
  let response = new MlRespPayload().successPayload(officeId, code);
  return response;
};

MlResolver.MlMutationResolver['updateOffice'] = (obj, args, context, info) => {
}

MlResolver.MlMutationResolver['updateOfficeStatus'] = (obj, args, context, info) => {
  let result;
  if(!args.id){
    let code = 400;
    let response = new MlRespPayload().successPayload('Office id is required', code);
    return response;
  }
  try{
    // activating office
    result = mlDBController.update('MlOfficeTransaction', { officeId: args.id }, { status:"Approved" }, {$set: true}, context);
    if(!result) {
      let code = 400;
      return new MlRespPayload().successPayload('Error in Activating the office', code);
    }

    result = mlDBController.update('MlOffice', args.id, {isActive:true}, {$set:true},  context);
    if(!result){
      let code = 400;
      return new MlRespPayload().successPayload('Error in Activating the office', code);
    }
    result = mlDBController.update('MlOfficeSC', {officeId:args.id, isActive:true}, {isActivated:true, isReconciled:true}, {$set:true}, context)
    if(!result){
      let code = 400;
      return new MlRespPayload().successPayload('Error in Activating the Office Service Card', code);
    }

    // create a ledger balance entry
    officeSC = mlDBController.findOne('MlOfficeSC', {officeId:args.id, isActive:true})
    mlOfficeValidationRepo.createOfficeLedgerEntry(officeSC._id)

  }catch (e){
    let code = 400;
    return new MlRespPayload().successPayload(e.message, code);
  }
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
  let pipeline = [{'$match': {officeId: args.officeId}},
    {'$project': {office: '$$ROOT'}},
    {
      '$lookup': {
        from: 'mlOfficeTransaction',
        localField: 'office.officeId',
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
  let result = mlDBController.aggregate('MlOfficeSC', pipeline);
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
    var ret = mlOfficeValidationRepo.validateOfficeExpiryDate(args.myOfficeId);
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

        // update ledger balance and journal
        ret = mlOfficeValidationRepo.updateLedgerBalanceOfficeJournal(args.myOfficeId, officeMember, context)
        if(!ret)
          return new MlRespPayload().errorPayload("Error In Updating Ledger Balance", 400);
      }
    }

  } catch (e) {
    let code = 400;
    let response = new MlRespPayload().errorPayload(e.message, code);
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



MlResolver.MlQueryResolver['getTeamMembers'] = (obj, args, context, info) => {
  let temp = [];
  let temp1 = [];
  let result = mlDBController.find('MlOffice', {userId:context.userId} , context).fetch()

  result.map(function(communities){
    communities.availableCommunities.id = communities._id
    temp.push(communities.availableCommunities)
  })
  temp.map(function(community){
    community.map(function(attributes){
      attributes.id = community.id
      temp1.push(attributes)
    })
  })

  return temp1
}

MlResolver.MlQueryResolver['getTeamUsers'] = (obj, args, context, info) => {

  let pipeline =[];
  if(args.officeId) {
    pipeline.push({$match:{officeId:args.officeId}});
  }
  pipeline.push({"$lookup":{from: "users",localField: "emailId",foreignField: "username",as: "user"}});
  pipeline.push({"$unwind":"$user"});
  pipeline.push({"$project":{ communityType : '$communityType', userId:"$user._id", profileImage:"$user.profile.profileImage", name:"$user.profile.displayName", externalUserProfiles:"$user.profile.externalUserProfiles"}});
  let result = mlDBController.aggregate('MlOfficeMembers', pipeline).map(function (user) {
    let profileId;
    if(!user.communityType){
      profileId = user.externalUserProfiles[0].profileId;
    } else {
      //Handle once user can diff type of community team member
    }
    user.profileId = profileId;
    return user;
  });

  return result;
}

MlResolver.MlQueryResolver['getBranchDetails'] = (obj, args, context, info) => {

  let result = mlDBController.find('MlOffice', {userId:context.userId} , context).fetch()
  return result;
}
