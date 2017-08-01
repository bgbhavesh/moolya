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
    let myOffices = mlDBController.find('MlOfficeMembers', {userId: context.userId, isActive:true}).fetch().map(function (data) {
      return data.officeId;
    });
    let officeQuery= {
      $or: [
        {
          officeId: {
            $in: myOffices
          }
        },
        {
          userId: context.userId
        }
      ],
      isActive:true
    };
    officeSC = mlDBController.find('MlOfficeSC', officeQuery).fetch()
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
  };
  let response = mlDBController.find('MlOfficeMembers', query).fetch();
  return response;
}

MlResolver.MlQueryResolver['fetchAllOfficeMembersWithUserId'] = (obj, args, context, info) => {
  let pipeline = [
    // { $match: { userId: context.userId } },
    { $lookup: { from: "mlOffice", localField: "officeId", foreignField: "_id", as: "office" } },
    { $match: { 'office.userId': context.userId } },
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
    { $project: {name:1, profileId:1, userId: '$user._id' , profileImage:'$user.profile.profileImage'} }
  ];
  let response = mlDBController.aggregate('MlOfficeMembers', pipeline);
  return response;
}

MlResolver.MlQueryResolver['fetchOfficeMember'] = (obj, args, context, info) => {

  let pipeline = [
    {
      $match : {
        _id:args.memberId
      }
    },
    {
      $lookup:
        {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "users"
        }
    },
    {
      $unwind : {
        "path": "$users",
        "preserveNullAndEmptyArrays": true
      }
    },
    {
      $project: {
        userId: "$userId",
        firstName: "$firstName",
        lastName: "$lastName",
        mobileNumber: "$mobileNumber",
        emailId: "$emailId",
        userType: "$userType",
        description: "$description",
        name: "$name",
        joiningDate: "$joiningDate",
        role: "$role",
        isActive: "$isActive",
        isIndependent: "$isIndependent",
        isInternalUserInteraction: "$isInternalUserInteraction",
        isExternalUserInteraction: "$isExternalUserInteraction",
        isFreeze: "$isFreeze",
        isRetire: "$isRetire",
        communityType: "$communityType",
        isPrincipal: "$isPrincipal",
        isFreeUser: "$isFreeUser",
        isPaidUser: "$isPaidUser",
        isAdminUser: "$isAdminUser"
      }
    }
  ]

  // let query = {
  //   _id:args.memberId
  // };
  // let response = mlDBController.findOne('MlOfficeMembers', query);
  let response = mlDBController.aggregate('MlOfficeMembers', pipeline);
  response = response.length ? response[0] : [];
  return response;
}

MlResolver.MlMutationResolver['createOffice'] = (obj, args, context, info) => {
  let officeId = '';
  try {
    let userId = context.userId;
    let scDefId = "";
    let frequencyType = "";
    let scId = "";
    let officeDetails = args.myOffice;
    let profile = new MlUserContext(userId).userProfileDetails(userId);
    let isFunder = _.isMatch(profile, {communityDefCode: 'FUN'})
    if(isFunder){
      // office beSpoke Service Card Definition
      if(officeDetails.isBeSpoke){
        var ret = mlOfficeValidationRepo.createBspokeSCDef(officeDetails, profile, context);
        scDefId = ret.officeDefId;
        frequencyType = ret.frequencyType;
      }
      else{
        // search for office id from MLOfficeSCDef
      }

      // office record creation
      officeId = mlOfficeValidationRepo.createOffice(officeDetails, profile, context);
      if (!officeId) {
        let code = 400;
        let response = new MlRespPayload().errorPayload("Failed To Create Office", code);
        return response;
      }

      let officeMemberData = {
        officeId: officeId,
        profileId: profile.profileId,
        userId: userId,
        isFreeUser:false,
        isPaidUser: false,
        isAdminUser: true,
        mobileNumber:profile.mobileNumber,
        joiningDate: new Date(),
        firstName: profile.firstName,
        lastName: profile.lastName,
        name: profile.firstName + ' ' + profile.lastName,
        emailId: profile.email,
        isPrincipal: true,
        isActive: true
      };
      let ret = mlDBController.insert('MlOfficeMembers', officeMemberData, context)
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
      scId = mlOfficeValidationRepo.createofficeServiceCard(officeDetails, profile, context, scDefId, officeId, frequencyType)
    }else {
      let code = 200;
      let response = new MlRespPayload().errorPayload("Not Allowed to create Office", code);
      return response;
    }
  }catch (e){
    let code = 400;
    return new MlRespPayload().errorPayload("Failed To Create Office", code);
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
    let response = new MlRespPayload().errorPayload('Office id is required', code);
    return response;
  }
  try{
    // activating office
    result = mlDBController.update('MlOfficeTransaction', { officeId: args.id }, { status:"Approved" }, {$set: true}, context);
    if(!result) {
      let code = 400;
      return new MlRespPayload().errorPayload('Error in Activating the office', code);
    }

    result = mlDBController.update('MlOffice', args.id, {isActive:true}, {$set:true},  context);
    if(!result){
      let code = 400;
      return new MlRespPayload().errorPayload('Error in Activating the office', code);
    }
    result = mlDBController.update('MlOfficeSC', {officeId:args.id, isActive:true}, {isActivated:true, isReconciled:true}, {$set:true}, context)
    if(!result){
      let code = 400;
      return new MlRespPayload().errorPayload('Error in Activating the Office Service Card', code);
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

    /**checking if user already present in the users collectio*/
    let isUserRegExist = mlDBController.findOne('MlRegistration', { 'registrationInfo.email': args.officeMember.emailId});
    let isUserExist = mlDBController.findOne('users', {username: args.officeMember.emailId});
    if (isUserExist || isUserRegExist) {
      console.log('user already present');
      let code = 400;
      let response = new MlRespPayload().errorPayload("User is not allowed to be associated to this office. Please contact administrator", code);
      return response;
      // Send an invite to the Existing User
    }
    else {
      // Soft Registration has to be done to new user
      /**generating random password for the users and saving in the registration*/
      var emails = [{address: args.officeMember.emailId, verified: false}];
      let randomPassword = orderNumberGenService.generateRandomPassword()

      /**user details who is creating the office member*/
      var adminUser = mlDBController.findOne('users', {_id: context.userId}) || {}

      var registrationData = {
        createdBy: adminUser.username,
        password: randomPassword,
        firstName: args.officeMember.firstName,
        lastName: args.officeMember.lastName,
        email:args.officeMember.emailId,
        userName:args.officeMember.emailId,
        contactNumber: args.officeMember.mobileNumber,
        communityName: "Office Bearer",
        communityDefCode : "OFB",
        registrationType : "OFB",
        communityDefName : "Office Bearer",
        registrationDate :new Date()
      }


      /**attaching creator details to the office member details in the registration*/
      let profile = new MlUserContext(context.userId).userProfileDetails(context.userId)
      let extendObj = _.pick(profile, ['clusterId', 'clusterName', 'chapterId', 'chapterName', 'subChapterId', 'subChapterName', 'countryId']);
      let finalRegData = _.extend(registrationData, extendObj)
      orderNumberGenService.assignRegistrationId(finalRegData)

      let registrationId = mlDBController.insert('MlRegistration', {
        registrationInfo: finalRegData,
        status: "Yet To Start",
        emails: emails,
        transactionId :finalRegData.registrationId
      }, context)

      /**sending email verification token to the created office member*/
      if (registrationId) {
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

        /**
         * commenting and moving the user creation in registration when the admin approves the office brearer
         * */
        // var userProfileTemp = {
        //   registrationId: registrationId,
        //   mobileNumber: args.officeMember.mobileNumber,
        //   communityName: "Office Bearer",
        //   communityDefCode : "OFB",
        //   isDefault: false,
        //   isActive: true,
        //   isApprove: false,
        //   isTypeOfficeBearer: true
        // }
        // let userProfile = _.extend(userProfileTemp, extendObj)
        // let profile = {
        //   isInternaluser: false,
        //   isExternaluser: true,
        //   email: args.officeMember.emailId,
        //   mobileNumber: args.officeMember.mobileNumber,
        //   isActive: false,
        //   firstName: args.officeMember.firstName,
        //   lastName: args.officeMember.lastName,
        //   displayName: args.officeMember.firstName + ' ' + args.officeMember.lastName,
        //   externalUserProfiles: [userProfile]
        // }
        // let userObject = {
        //   username: args.officeMember.emailId,
        //   profile: profile,
        //   emails: emails ? emails : []
        // }
        // orderNumberGenService.createUserProfileId(userProfile);
        // let userId = mlDBController.insert('users', userObject, context)
        // console.log('userId' + userId);
        // if (userId) {
        //   //Email & MobileNumber verification updates to user
        //   let registerDetails = mlDBController.findOne('MlRegistration', registrationId, context) || {};
        //   mlDBController.update('users', {username: userObject.username},
        //     {
        //       $set: {
        //         'services.email': registerDetails && registerDetails.services ? registerDetails.services.email : {},
        //         'emails': userObject.emails
        //       }
        //     }, {'blackbox': true}, context);
        //   let salted = passwordUtil.hashPassword(registerDetails.registrationInfo.password);
        //   let res = mlDBController.update('users', {username: userObject.username}, {'services.password.bcrypt': salted}, {$set: true}, context);
        // }

        /**finally saving the user to the office member collection*/
        var officeMember = args.officeMember;
        officeMember.officeId = args.myOfficeId;
        officeMember.name = officeMember.firstName + ' ' + officeMember.lastName;
        officeMember['registrationId'] = registrationId

        /**no user is created at this step user will be created after admin approval*/
        // officeMember['userId'] = userId
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
  pipeline.push({ $match: { 'user.profile.isActive':true } });
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


MlResolver.MlQueryResolver['getOfficeUserTypes'] = () => {
  return MlOfficeUserType.find({"isActive":true, code: {$ne: 'PRI'}}).fetch();
}

MlResolver.MlMutationResolver['getMyOfficeRole'] = (obj, args, context, info) => {
  let role;
  let query = {
    officeId: args.officeId,
    userId: context.userId
  };
  let result = mlDBController.findOne('MlOfficeMembers', query);
  if(result.isPrincipal){
    role = 'Principal';
  } else if (result.isAdminUser){
    role = 'AdminUser';
  } else {
    role = 'User';
  }
  let code = 200;
  let response = new MlRespPayload().successPayload(role, code);
  return response;
}

/**
 * update the office member after registration Approval
 * */
MlResolver.MlMutationResolver['updateOfficeMemberOnReg'] = (obj, args, context, info) => {
  try{
    if(args.officeMember){
      var officeMember =  mlDBController.findOne('MlOfficeMembers', {registrationId : args.registrationId}, context);
      if(officeMember){
        let ret = mlDBController.update('MlOfficeMembers', {registrationId: args.registrationId}, args.officeMember, {$set: true}, context);
      }else {
        let code = 400;
        let response = new MlRespPayload().successPayload("user not found", code);
        return response;
      }
      let code = 400;
      let response = new MlRespPayload().successPayload("Successfully Updated user", code);
      return response;
    }
  }catch(e){
    let code = 400;
    let response = new MlRespPayload().errorPayload(e.message, code);
    return response;
  }
}
