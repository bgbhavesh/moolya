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
      let details=args.registrationDetails;
      updatedResponse= MlRegistration.update(id, {$set:  {registrationInfo:details }});
      let userProfile = {
        registrationId    : id,
        countryName       : details.countryName,
        countryId         : '',
        cityName          : '',
        cityId            : details.cityId,
        mobileNumber      : details.contactNumber,
        clusterId         : '',
        clusterName       : '',
        chapterId         : '',
        chapterName       : '',
        subChapterId      : '',
        subChapterName    : '',
        communityId       : '',
        communityName     : details.communityName,
        communityType     : '',
        isDefault         : false,
        isProfileActive   : false,
        accountType       : details.accountType,
        optional          : false
      }
      let profile = {
        isInternaluser  : false,
        isExternaluser  : true,
        email           : details.email,
        isActive        : false,
        externalUserProfile: userProfile
      }
      let userObject = {
        username        : details.email,
        password        : details.password,
        profile         : profile
      }

      MlResolver.MlMutationResolver['createUser'](obj, {user:userObject,moduleName:"USERS",actionName:"CREATE"}, context, info);
    }else{
      updatedResponse= MlRegistration.update(id, {$set:  {registrationDetails: args.details}});
    }
    return updatedResponse
  }
}

MlResolver.MlMutationResolver['updateRegistrationUploadedDocumentUrl'] = (obj, args, context, info) => {
  // TODO : Authorization
  if (args.docUrl&&args.documentId) {
    var id= args.registrationId;
    var randomId= Math.floor(Math.random()*90000) + 10000;
    let updatedResponse=MlRegistration.update({_id:args.registrationId,'kycDocuments':{$elemMatch: {'documentId':args.documentId}}},{$push: {"kycDocuments.$.docFiles":{fileId:randomId,fileName:args.document.name, fileSize:args.document.size, fileUrl:args.docUrl}}});
    return updatedResponse;
  }
}

MlResolver.MlMutationResolver['createGeneralInfoInRegistration'] = (obj, args, context, info) => {

  let id = " "
 let registrationDetails =MlRegistration.findOne({_id: args.registrationId}) || {};
  if(args && args.registration){
    if(args.type == "CONTACTTYPE"){
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
      //if(args.registration.contactInfo && args.registration.contactInfo[0]){
      id = MlRegistration.update(
        { _id : args.registrationId },
        { $set: { 'contactInfo': args.registration.contactInfo } }
      )
      /*}else{
       id = MlRegistration.insert({'contactInfo':args.registration.contactInfo});
       }*/
    }else if(args.type == "ADDRESSTYPE"){
      /*if(args.registration.addressInfo && args.registration.addressInfo[0]){*/

      id = MlRegistration.update(
        { _id : args.registrationId },
        { $set: { 'addressInfo': args.registration.addressInfo } }
      )
      /*}else{
       id = MlRegistrantion.insert({'addressInfo':args.registration.addressInfo});
       }*/
    }else if(args.type == "SOCIALLINKS"){
      /*if(args.registration.addressInfo && args.registration.addressInfo[0]){*/

        id = MlRegistration.update(
          { _id : args.registrationId },
          { $set: { 'socialLinksInfo': args.registration.socialLinksInfo } }
        )


      /*}else{
       id = MlRegistrantion.insert({'addressInfo':args.registration.addressInfo});
       }*/
    }else if(args.type == "EMAILTYPE"){
      /*if(args.registration.addressInfo && args.registration.addressInfo[0]){*/

      id = MlRegistration.update(
        { _id : args.registrationId },
        { $set: { 'emailInfo': args.registration.emailInfo } }
      )


      /*}else{
       id = MlRegistrantion.insert({'addressInfo':args.registration.addressInfo});
       }*/
    }


      /*}else{
       id = MlRegistrantion.insert({'addressInfo':args.registration.addressInfo});
       }*/
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
