import MlRespPayload from "../../../commons/mlPayload";
export default MlRegistrationPreCondition = class MlRegistrationPreCondition{

  static  validateActiveCommunity(regId,regDetails) {
    let communityDetails=null;
    let response=null;
    let subChapterId=null,registrationType=null;
    //if its step1 and changes are for the regDetails
    if(regDetails&&regDetails.subChapterId&&regDetails.registrationType){
      subChapterId=regDetails.subChapterId;
      registrationType=regDetails.registrationType;
    }else{
         let regRecord = mlDBController.findOne('MlRegistration', {_id: regId}, context)||{};
         registrationType=regRecord&&regRecord.registrationInfo?regRecord.registrationInfo.registrationType:null;
         subChapterId=regRecord&&regRecord.registrationInfo?regRecord.registrationInfo.subChapterId:null;
    }

    if(registrationType&&registrationType==="BRW"){
      return {'isValid':true};
    }
    // {"$and":[{hierarchyCode:"SUBCHAPTER", communityDefCode:args.communityId, "isActive":true}]}

    communityDetails = mlDBController.findOne('MlCommunityAccess', {"$and":[{subChapterId: subChapterId, communityDefCode:registrationType, "isActive":true}]}, context);

    //validate community availability in the cluster
    if(!communityDetails){
      let code = 409;
      response = new MlRespPayload().errorPayload("Community not available for cluster", code);
      return {'isValid':false,'validationResponse':response};
     }
    return {'isValid':true};
  }
  static  validateEmailClusterCommunity(registration) {
    var validate = MlRegistration.findOne({"$and":[{"registrationInfo.email":registration.email},{"registrationInfo.countryId":registration.countryId},{"registrationInfo.registrationType":registration.registrationType}]})
    if(validate){
      let code = 409;
      let message ="Registration Exist"
      let errResp = new MlRespPayload().errorPayload(message, code);
      return {'isValid':false,'validationResponse':errResp};
    }
    return {'isValid':true};
  }
}
