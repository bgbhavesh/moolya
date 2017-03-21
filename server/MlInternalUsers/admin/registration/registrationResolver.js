import MlResolver from '../mlAdminResolverDef'
import MlRespPayload from '../../../commons/mlPayload'



MlResolver.MlMutationResolver['createRegistration'] = (obj, args, context, info) => {
  console.log(args);

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
      let community = MlCommunity.findOne({"communityDefCode":args.registrationDetails.registrationType})
      let details=args.registrationDetails;
      details.communityName=community.communityName;
      updatedResponse= MlRegistration.update(id, {$set:  {registrationInfo:details }});
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
    //let updatedResponse= MlRegistration.update(id, {$set:  {"docUrl":args.docUrl}});
    //return updatedResponse;
  }
}

MlResolver.MlMutationResolver['createStep3InRegistration'] = (obj, args, context, info) => {

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
      let addressInformation = args.registration.addressInfo.pop();
      id = MlRegistration.update(
        { _id : args.registrationId },
        { $push: { 'addressInfo': args.registration.addressInfo } }
      )
      /*}else{
       id = MlRegistrantion.insert({'addressInfo':args.registration.addressInfo});
       }*/
    }else if(args.type == "SOCIALLINKS"){
      /*if(args.registration.addressInfo && args.registration.addressInfo[0]){*/
      if(registrationDetails.socialLinksInfo){
        id = MlRegistration.update(
          { _id : args.registrationId },
          { $push: { 'socialLinksInfo': args.registration.socialLinksInfo[0] } }
        )
      }else{
        id = MlRegistration.update(
          { _id : args.registrationId },
          { $set: { 'socialLinksInfo': args.registration.socialLinksInfo } }
        )
      }

      /*}else{
       id = MlRegistrantion.insert({'addressInfo':args.registration.addressInfo});
       }*/
    }


  }
  if(id){
    let code = 200;
    console.log(MlRegistration.findOne(id));
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
