import MlResolver from '../mlAdminResolverDef'
import MlRespPayload from '../../../commons/mlPayload'



MlResolver.MlMutationResolver['createRegistration'] = (obj, args, context, info) => {


/*  let id = MlSubDepartments.insert({...args.subDepartment});
  if(id){
    let code = 200;
    let result = {subDepartmentId: id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }*/
  let isValidAuth = mlAuthorization.validteAuthorization(context.userId, args.moduleName, args.actionName, args);
  if (!isValidAuth) {
    let code = 401;
    let response = new MlRespPayload().errorPayload("Not Authorized", code);
    return response;
  }
  if(!args.registration.registrationType){
    let code = 409;
    let response = new MlRespPayload().errorPayload("Registration Type is mandatory!!!!",code);
    return response;
  }
  let id = MlRegistration.insert({registrationInfo : args.registration,status:"Pending"});
  if(id){
    let code = 200;

    let insertedData =  MlRegistration.findOne(id) || {};
    /*  let tabName = insertedData.contactInfo[0].numberTypeName;*/
    let result = {registrationId : id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}

MlResolver.MlMutationResolver['createRegistrationAPI'] = (obj, args, context, info) => {
  let response
  let validate = MlRegistration.findOne({"$and":[{"registrationInfo.email":args.registration.email},{"registrationInfo.countryId":args.registration.countryId},{"registrationInfo.registrationType":args.registration.registrationType}]})
  if(validate){
    let code = 400;
    let result = {message: "Registration Exist"}
    let response = new MlRespPayload().errorPayload(result, code);
    return response
  }
  else if (args.registration) {
    response = MlRegistration.insert({registrationInfo: args.registration});
    if(response){
      let code = 200;
      let result = {message: "Registration Successful",registrationId: response}
      let response = new MlRespPayload().successPayload(result, code);
      return response
    }
  }
  return response
}

MlResolver.MlQueryResolver['findRegistrationInfo'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.registrationId) {
    var id= args.registrationId;
    let response= MlRegistration.findOne({"_id":id});
    //response = response.registrationInfo;
    return response;
  }
}

MlResolver.MlMutationResolver['updateRegistrationInfo'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.registrationId) {
    let updatedResponse
    var id= args.registrationId;
    if(args.registrationDetails){
      let details=args.registrationDetails||{};

      let subChapterDetails=MlSubChapters.findOne({chapterId:details.chapterId})||{};

      details.clusterName=subChapterDetails.clusterName;
      details.chapterName=subChapterDetails.chapterName;
      details.subChapterName=subChapterDetails.subChapterName;
      details.subChapterId=subChapterDetails._id;

      let communityDetails=MlCommunity.findOne({subChapterId:details.subChapterId,communityDefCode:details.registrationType})||{};

      details.communityId=communityDetails._id;
      //details.communityName=communityDetails.communityName;
      details.communityDefName=communityDetails.communityDefName;
      details.communityDefCode=communityDetails.communityDefCode;

      details.identityType=details.identityType||null;
      details.transactionType="registration";
      details.userType=details.userType||null;
      let user=Meteor.users.findOne({"username":details.userName});
      details.userId=user?user._id:null;

      let registrationDetails={identityType:details.identityType,userType:details.userType};

      //validate the registrationInfo for mandatory fields such as cluster chapter etc
      updatedResponse= MlRegistration.update(id, {$set:  {registrationInfo:details,"registrationDetails.identityType":details.identityType,"registrationDetails.userType":details.userType }});
      let userProfile = {
        registrationId    : id,
        countryName       : '',
        countryId         : details.countryId,
        cityName          : '',
        cityId            : details.cityId,
        mobileNumber      : details.contactNumber,
        clusterId         : details.clusterId,
        clusterName       : details.clusterName,
        chapterId         : details.chapterId,
        chapterName       : details.chapterName,
        subChapterId      : details.subChapterId,
        subChapterName    : details.subChapterName,
        communityId       : details.communityId,
        communityName     : details.communityName,
        communityDefCode  : details.communityDefCode,
        communityDefName  : details.communityDefName,
        communityType     : '',
        isDefault         : false,
        isProfileActive   : false,
        accountType       : details.accountType,
        optional          : false,
        userType          :details.userType||null,
        identityType      :details.identityType||null
      }
      let profile = {
        isInternaluser  : false,
        isExternaluser  : true,
        email           : details.email,
        isActive        : false,
        externalUserProfile: [userProfile]
      }
      let userObject = {
        username        : details.email,
        password        : details.password,
        profile         : profile
      }

      let existingUser=Meteor.users.findOne({"username":userObject.username});
      let updateCount=0;
      let userId=null;
      if(existingUser){

        let result = Meteor.users.update({username:userObject.username,'profile.externalUserProfile' : {
          $elemMatch: {'registrationId': id}}}, {$set: {"profile.externalUserProfile.$":userProfile}});

        if(result!=1) {
          updateCount= Meteor.users.update({username:userObject.username},{'$push':{'profile.externalUserProfile':userProfile}},{upsert:false});
        }else{
          updateCount==1;
        }
      }else{
        userId = Accounts.createUser(userObject);
      }

      if(updateCount===1 ||userId){
        let code = 200;
        let result = {username: userObject.username};
        MlRegistration.update(id, {$set:  {"registrationInfo.userId":userId}});
        let response = new MlRespPayload().successPayload(result, code);
        return response
      }

      // MlResolver.MlMutationResolver['createUser'](obj, {user:userObject,moduleName:"USERS",actionName:"CREATE"}, context, info);
    }else{
      updatedResponse= MlRegistration.update(id, {$set:  {registrationDetails: args.details}});
    }
    return updatedResponse
  }
}

MlResolver.MlMutationResolver['updateRegistrationUploadedDocumentUrl'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.docUrl&&args.documentId&&args.docTypeId) {
    var id= args.registrationId;
    var randomId= Math.floor(Math.random()*90000) + 10000;
    let updatedResponse=MlRegistration.update({_id:args.registrationId,'kycDocuments':{$elemMatch: {'documentId':args.documentId,'docTypeId':args.docTypeId}}},{$push: {"kycDocuments.$.docFiles":{fileId:randomId,fileName:args.document.name, fileSize:args.document.size, fileUrl:args.docUrl}}});
    return updatedResponse;
  }else if(args.registrationId){
      MlRegistration.update({_id:args.registrationId},{ $set:{'registrationInfo.profileImage': args.docUrl}})
  }
}
MlResolver.MlMutationResolver['ApprovedStatusForUser'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.registrationId) {
     let updatedResponse=MlRegistration.update({_id:args.registrationId},{$set: {"status":"Approved"}});

    //Portfolio Request Generation
    if(updatedResponse===1){
    let regRecord=MlRegistration.findOne(args.registrationId)||{"registrationInfo":{}};

    let portfolioDetails={
      "transactionType" : "portfolio",
      "communityType" : regRecord.registrationInfo.communityDefName,
      "communityCode" :regRecord.registrationInfo.communityDefCode,
      "cluster" :regRecord.registrationInfo.clusterId,
      "chapter" : regRecord.registrationInfo.chapterId,
      "subChapter" :regRecord.registrationInfo.subChapterId,
      "source" : "self",
      "createdBy" : "admin",
      "status" : "Yet To Start",
      "isPublic": false,
      "isGoLive" : false,
      "isActive" : false,
      "portfolioUserName" : regRecord.registrationInfo.userName,
      "userId" :regRecord.registrationInfo.userId,
      "userType":regRecord.registrationInfo.userType
     }

       try{
          MlResolver.MlMutationResolver['createPortfolioRequest'] (obj,{'portfoliodetails':portfolioDetails},context, info);
       }catch(e){
            console.log(e);
         //send error response;
       }
    }

    return updatedResponse;
  }
}
MlResolver.MlMutationResolver['RejectedStatusForUser'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.registrationId) {
    let updatedResponse=MlRegistration.update({_id:args.registrationId},{$set: {"status":"Rejected"}});
    return updatedResponse;
  }
}

MlResolver.MlMutationResolver['ApprovedStatusOfDocuments'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.registrationId) {
      let documentList=args.documentId;
      let doctypeList=args.docTypeId
    let updatedResponse;
      for(let i=0;i<documentList.length;i++){
      updatedResponse=MlRegistration.update({_id:args.registrationId,'kycDocuments':{$elemMatch: {'documentId':documentList[i],'docTypeId':doctypeList[i]}}},{$set: {"kycDocuments.$.status":"Approved"}});
        //return updatedResponse;
      }
    return updatedResponse;
  }
}
MlResolver.MlMutationResolver['RejectedStatusOfDocuments'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.registrationId) {
    let documentList=args.documentId;
    let doctypeList=args.docTypeId
    let updatedResponse;
    for(let i=0;i<documentList.length;i++){
      updatedResponse=MlRegistration.update({_id:args.registrationId,'kycDocuments':{$elemMatch: {'documentId':documentList[i],'docTypeId':doctypeList[i]}}},{$set: {"kycDocuments.$.status":"Rejected"}});
      //return updatedResponse;
    }
    return updatedResponse;
  }
}
MlResolver.MlMutationResolver['RemoveFileFromDocuments'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.registrationId) {
    let documentList=args.documentId;
    let updatedResponse;
    //  updatedResponse=MlRegistration.update({_id:args.registrationId,'kycDocuments':{$elemMatch: {'documentId':args.documentId}},'kycDocuments':{$elemMatch: {'documentId.$.docFiles':{$elemMatch:{'fileId':args.fileId}}}}},{$pull: {}});
    updatedResponse=MlRegistration.update({"$and":[{_id:args.registrationId},{'kycDocuments':{$elemMatch: {'docTypeId':args.docTypeId,'documentId':args.documentId}}}]},{ $pull: { 'kycDocuments.$.docFiles':{'fileId':args.fileId  }} });
    //return updatedResponse;
    return updatedResponse;
  }
}

MlResolver.MlMutationResolver['createGeneralInfoInRegistration'] = (obj, args, context, info) => {

  let id = " "
 let registrationDetails =MlRegistration.findOne({_id: args.registrationId}) || {};

  if(args && args.registration){
    if(args.type == "CONTACTTYPE"){
      let dbData = _.pluck(registrationDetails.contactInfo, 'numberType') || [];
      let contactExist = null;
      if(args.registration.contactInfo[0]){
         contactExist = _.contains(dbData, args.registration.contactInfo[0].numberType);
      }

      if(contactExist){
        let code = 409;
        let response = new MlRespPayload().errorPayload("Contact type already exist!!!!", code);
        return response;
      }

      if(registrationDetails.contactInfo){
        id = MlRegistration.update(
          { _id : args.registrationId },
          { $push: { 'contactInfo': args.registration.contactInfo[0] } }
        )
      }else{
        id = MlRegistration.update(
          { _id : args.registrationId },
          { $set: { 'contactInfo': args.registration.contactInfo } }
        )
      }
    }else if(args.type == "ADDRESSTYPE"){
      let dbData = _.pluck(registrationDetails.addressInfo, 'addressType') || [];
      let addressExist = null;
      if(args.registration.addressInfo[0]){
        addressExist = _.contains(dbData, args.registration.addressInfo[0].addressType);
      }

      if(addressExist){
        let code = 409;
        let response = new MlRespPayload().errorPayload("Address type already exist!!!!", code);
        return response;
      }
      if(registrationDetails.addressInfo){
        id = MlRegistration.update(
          { _id : args.registrationId },
          { $push: { 'addressInfo': args.registration.addressInfo[0] } }
        )
      }else{
        id = MlRegistration.update(
          { _id : args.registrationId },
          { $set: { 'addressInfo': args.registration.addressInfo } }
        )
      }
    }else if(args.type == "SOCIALLINKS") {
      let dbData = _.pluck(registrationDetails.socialLinksInfo, 'socialLinkType') || [];
      let addressExist = null;
      if(args.registration.socialLinksInfo[0]){
        addressExist = _.contains(dbData, args.registration.socialLinksInfo[0].socialLinkType);
      }

      if(addressExist){
        let code = 409;
        let response = new MlRespPayload().errorPayload("Social Link type already exist!!!!", code);
        return response;
      }
      /*if(args.registration.addressInfo && args.registration.addressInfo[0]){*/
      if (registrationDetails.socialLinksInfo) {
        id = MlRegistration.update(
          {_id: args.registrationId},
          {$push: {'socialLinksInfo': args.registration.socialLinksInfo[0]}}
        )
      } else {
        id = MlRegistration.update(
          {_id: args.registrationId},
          {$set: {'socialLinksInfo': args.registration.socialLinksInfo}}
        )
      }
    }else if(args.type == "EMAILTYPE"){
        /*if(args.registration.addressInfo && args.registration.addressInfo[0]){*/
      let dbData = _.pluck(registrationDetails.emailInfo, 'emailIdType') || [];
      let emailTypeExist = null;
      if(args.registration.emailInfo[0]){
        emailTypeExist = _.contains(dbData, args.registration.emailInfo[0].emailIdType);
      }

      if(emailTypeExist){
        let code = 409;
        let response = new MlRespPayload().errorPayload("Email   type already exist!!!!", code);
        return response;
      }
        if(registrationDetails.emailInfo){
          id = MlRegistration.update(
            { _id : args.registrationId },
            { $push: { 'emailInfo': args.registration.emailInfo[0] } }
          )
        }else{
          id = MlRegistration.update(
            { _id : args.registrationId },
            { $set: { 'emailInfo': args.registration.emailInfo } }
          )
        }

      /*}else{
       id = MlRegistrantion.insert({'addressInfo':args.registration.addressInfo});
       }*/
    }
    else if(args.type == "KYCDOCUMENT"){
      /*if(args.registration.addressInfo && args.registration.addressInfo[0]){*/
      if(registrationDetails.kycDocuments){
        id = MlRegistration.update(
          { _id : args.registrationId,kycDocuments:{ $exists:false } },
          { $push: { 'kycDocuments': args.registration.kycDocuments } }
        )
      }else{
        id = MlRegistration.update(
          { _id : args.registrationId,kycDocuments:{ $exists:false }},
          { $set: { 'kycDocuments': args.registration.kycDocuments } }
        )
      }


    }

  }

  if(id){
    let code = 200;

    let insertedData =  MlRegistration.findOne(id) || {};
    /*  let tabName = insertedData.contactInfo[0].numberTypeName;*/
    let result = {registrationId : id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }
}
MlResolver.MlQueryResolver['findRegistration'] = (obj, args, context, info) => {
  let resp = MlRegistration.findOne({_id: args.registrationId});
  return resp;
  // if(resp){
  //     let code = 200;
  //     let result = {department: resp}
  //     let response = JSON.stringify(new MlRespPayload().successPayload(result, code));
  //     return response
  // }
}
MlResolver.MlMutationResolver['updateRegistrationGeneralInfo'] = (obj, args, context, info) => {
 let id = " "
  let registrationDetails =MlRegistration.findOne({_id: args.registrationId}) || {};
  if(args && args.registration){
    if(args.type == "CONTACTTYPE"){
      id = MlRegistration.update(
        { _id : args.registrationId },
        { $set: { 'contactInfo': args.registration.contactInfo } }
      )
    }else if(args.type == "ADDRESSTYPE"){
      id = MlRegistration.update(
        { _id : args.registrationId },
        { $set: { 'addressInfo': args.registration.addressInfo } }
      )
    }else if(args.type == "SOCIALLINKS"){
        id = MlRegistration.update(
          { _id : args.registrationId },
          { $set: { 'socialLinksInfo': args.registration.socialLinksInfo } }
        )
    }else if(args.type == "EMAILTYPE"){
      id = MlRegistration.update(
        { _id : args.registrationId },
        { $set: { 'emailInfo': args.registration.emailInfo } }
      )
    }
  }

  if(id){
    let code = 200;
    let insertedData =  MlRegistration.findOne(id) || {};
    let result = {registrationId : id}
    let response = new MlRespPayload().successPayload(result, code);
    return response
  }


}
