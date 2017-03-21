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
