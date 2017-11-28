import MlRespPayload from '../../../commons/mlPayload';
export default MlRegistrationPreCondition = class MlRegistrationPreCondition {
  static validateCommunity(regDetails, regId) {
    const isActiveCommunity = true;
    let response = null;
    let subChapterId = null,
      registrationType = null,
      clusterId = null,
      chapterId = null;
    // if its step1 and changes are for the regDetails
    if (regDetails) {
      subChapterId = regDetails.subChapterId;
      clusterId = regDetails.clusterId;
      chapterId = regDetails.chapterId;
      registrationType = regDetails.registrationType;
    } else {
      const regRecord = mlDBController.findOne('MlRegistration', { _id: regId }, {}) || {};
      registrationType = regRecord && regRecord.registrationInfo ? regRecord.registrationInfo.registrationType : null;
      subChapterId = regRecord && regRecord.registrationInfo ? regRecord.registrationInfo.subChapterId : null;
      clusterId = regRecord && regRecord.registrationInfo ? regRecord.registrationInfo.clusterId : null;
      chapterId = regRecord && regRecord.registrationInfo ? regRecord.registrationInfo.chapterId : null;
    }

    /** validating true if community is BROWSER or OFFICE BEARER */
    if (!registrationType || registrationType && (registrationType === 'BRW' || registrationType === 'OFB')) {
      return { isValid: true };
    }

    // check community access is active at platform
    const platformCommunity = mlDBController.findOne('MlCommunityAccess', { hierarchyLevel: 4, communityDefCode: registrationType, isActive: true }, {});
    if (!platformCommunity) {
      const code = 401;
      response = new MlRespPayload().errorPayload('Community is not active', code);
      return { isValid: false, validationResponse: response };
    }

    // check community access is active at cluster
    if (isActiveCommunity && clusterId) {
      const clusterCommunity = mlDBController.findOne('MlCommunityAccess', {
        hierarchyLevel: 3, clusterId, communityDefCode: registrationType, isActive: true
      }, {});
      if (!clusterCommunity) {
        const code = 401;
        response = new MlRespPayload().errorPayload('Community not available for cluster', code);
        return { isValid: false, validationResponse: response };
      }
    }
    // check community access is active at chapter
    if (isActiveCommunity && chapterId) {
      var communityDetails = mlDBController.findOne('MlCommunityAccess', { $and: [{ chapterId, communityDefCode: registrationType, isActive: true }] }, {});
      if (!communityDetails) {
        const code = 401;
        response = new MlRespPayload().errorPayload('Community not available for chapter', code);
        return { isValid: false, validationResponse: response };
      }
    }

    // check community access is active at subChapter
    if (isActiveCommunity && chapterId && subChapterId) {
      var communityDetails = mlDBController.findOne('MlCommunityAccess', { $and: [{ subChapterId, communityDefCode: registrationType, isActive: true }] }, {});
      if (!communityDetails) {
        const code = 401;
        response = new MlRespPayload().errorPayload('Community not available for subchapter', code);
        return { isValid: false, validationResponse: response };
      }
    }

    return { isValid: true };
  }

  static validateOFBCommunity(regDetails) {
    const registrationType = (regDetails || {}).registrationType;
    if (registrationType && registrationType === 'OFB') {
      const code = 401;
      response = new MlRespPayload().errorPayload('Community not available for registration', code);
      return { isValid: false, validationResponse: response };
    }
    return { isValid: true };
  }

  static validateActiveCommunity(regId, regDetails) {
    let isActiveCommunity = true;
    let response = null;
    let subChapterId = null,
      registrationType = null,
      clusterId = null,
      chapterId = null;
    // if its step1 and changes are for the regDetails
    if (regDetails) {
      subChapterId = regDetails.subChapterId;
      clusterId = regDetails.clusterId;
      chapterId = regDetails.chapterId;
      registrationType = regDetails.registrationType;
    } else {
      const regRecord = mlDBController.findOne('MlRegistration', { _id: regId }, {}) || {};
      registrationType = regRecord && regRecord.registrationInfo ? regRecord.registrationInfo.registrationType : null;
      subChapterId = regRecord && regRecord.registrationInfo ? regRecord.registrationInfo.subChapterId : null;
      clusterId = regRecord && regRecord.registrationInfo ? regRecord.registrationInfo.clusterId : null;
      chapterId = regRecord && regRecord.registrationInfo ? regRecord.registrationInfo.chapterId : null;
    }

    if (!registrationType || registrationType && registrationType === 'BRW') {
      return { isValid: true };
    }

    // check community access is active at platform
    const platformCommunity = mlDBController.findOne('MlCommunityAccess', { hierarchyLevel: 4, communityDefCode: registrationType, isActive: true }, {});
    if (!platformCommunity)isActiveCommunity = false;

    // check community access is active at cluster
    if (isActiveCommunity && clusterId) {
      const clusterCommunity = mlDBController.findOne('MlCommunityAccess', {
        hierarchyLevel: 3, clusterId, communityDefCode: registrationType, isActive: true
      }, {});
      if (!clusterCommunity)isActiveCommunity = false;
    }

    // check community access is active at subChapter
    if (isActiveCommunity && chapterId && subChapterId) {
      const communityDetails = mlDBController.findOne('MlCommunityAccess', { $and: [{ subChapterId, communityDefCode: registrationType, isActive: true }] }, {});
      if (!communityDetails)isActiveCommunity = false;
    }

    if (!isActiveCommunity) {
      const code = 401;
      response = new MlRespPayload().errorPayload('Community not available for cluster', code);
      return { isValid: false, validationResponse: response };
    }
    return { isValid: true };
  }
  static validateEmailClusterCommunity(registration) {
    // let clusterInfo=MlClusters.findOne({countryId:args.registration.countryId})
    const validate = MlRegistration.findOne({ $and: [{ 'registrationInfo.email': registration.email }, { 'registrationInfo.clusterId': registration.clusterId }, { 'registrationInfo.registrationType': registration.registrationType }] })
    if (validate) {
      /* var validate = MlRegistration.findOne({"$and":[{"registrationInfo.email":registration.email},{"registrationInfo.countryId":registration.countryId},{"registrationInfo.registrationType":registration.registrationType}]})
    if(validate){ */
      const code = 409;
      const message = 'Registration Exist'
      const errResp = new MlRespPayload().errorPayload(message, code);
      return { isValid: false, validationResponse: errResp };
    }
    return { isValid: true };
  }
  static validateEmail(registration) {
    // let clusterInfo=MlClusters.findOne({countryId:args.registration.countryId})
    const validate = MlRegistration.findOne({ 'registrationInfo.email': registration.email, status: { $nin: ['REG_USER_REJ', 'REG_ADM_REJ'] } })
    if (validate) {
      /* var validate = MlRegistration.findOne({"$and":[{"registrationInfo.email":registration.email},{"registrationInfo.countryId":registration.countryId},{"registrationInfo.registrationType":registration.registrationType}]})
       if(validate){ */
      const code = 409;
      const message = 'Registration exists with the Email-Id'
      const errResp = new MlRespPayload().errorPayload(message, code);
      return { isValid: false, validationResponse: errResp };
    }
    return { isValid: true };
  }
  static validateMobile(registration) {
    const validate = MlRegistration.findOne({ 'registrationInfo.contactNumber': registration.contactNumber, status: { $nin: ['REG_ADM_REJ', 'REG_USER_REJ'] } })
    if (validate) {
      const code = 409;
      const message = 'Registration exists with the mobile number'
      const errResp = new MlRespPayload().errorPayload(message, code);
      return { isValid: false, validationResponse: errResp };
    }
    return { isValid: true };
  }
  static validateBackEndUserExist(registration) {
    const userExist = mlDBController.findOne('users', { 'profile.email': registration.email }, {}) || {};
    if (userExist._id) {
      const code = 409;
      const message = 'Backend user registered with the same email'
      const errResp = new MlRespPayload().errorPayload(message, code);
      return { isValid: false, validationResponse: errResp };
    }
    return { isValid: true };
  }
  static validateRegisterAsActiveCommunity(regDetails) {
    let isActiveCommunity = true;
    let response = null;
    let registrationType = null,
      clusterId = null,
      countryId = null,
      countryClusterId = null;

    if (regDetails) {
      clusterId = regDetails.clusterId;
      registrationType = regDetails.registrationType;
      countryId = regDetails.countryId;
      const clusterObject = mlDBController.findOne('MlClusters', { countryId, isActive: true }, {});
      countryClusterId = clusterObject && clusterObject._id ? clusterObject._id : ''
    }

    // check community access is active at platform
    const platformCommunity = mlDBController.findOne('MlCommunityAccess', { hierarchyLevel: 4, communityDefCode: registrationType, isActive: true }, {});
    if (!platformCommunity)isActiveCommunity = false;

    // check community access is active at cluster
    if (isActiveCommunity && clusterId) {
      const clusterCommunity = mlDBController.findOne('MlCommunityAccess', {
        hierarchyLevel: 3, clusterId, communityDefCode: registrationType, isActive: true
      }, {});
      if (!clusterCommunity)isActiveCommunity = false;
    }

    // check comunity access is active at country
    if (isActiveCommunity && countryClusterId) {
      const countryCommunity = mlDBController.findOne('MlCommunityAccess', {
        hierarchyLevel: 3, clusterId: countryClusterId, communityDefCode: registrationType, isActive: true
      }, {});
      if (!countryCommunity)isActiveCommunity = false;
    }

    if (!isActiveCommunity) {
      const code = 401;
      response = new MlRespPayload().errorPayload('Community not available for cluster', code);
      return { isValid: false, validationResponse: response };
    }
    return { isValid: true };
  }

  /**
   * Method :: validateEmailVerification
   * Desc   :: checks if email is verified
   * @param registerDetails :: Object ::Registration Object
   * @returns  {Object}
   */
  static validateEmailVerification(registerDetails) {
    if (registerDetails && registerDetails.emails && registerDetails.emails.length > 0) {
      const email = registerDetails.emails;
      const emailVerified = _.find(email, mail => mail.verified == true);

      if (emailVerified) {
        return { isValid: true };
      }
      const response = new MlRespPayload().errorPayload('User has not yet verified his/her email-Id', 556);
      return { isValid: false, validationResponse: response };
    }/** if email does not exist,return response */
    const response = new MlRespPayload().errorPayload('Atleast one email-Id is required for registration', 556);
    return { isValid: false, validationResponse: response };
  }
  /**
   * @params registration object from client
   * @return isValid
   * */
  static checkDuplicateContactNumber(regDetails) {
    const checkNumber = mlDBController.findOne('MlRegistration', {
      'registrationInfo.userName': { $ne: regDetails.userName },
      'registrationInfo.contactNumber': regDetails.contactNumber,
      status: { $nin: ['REG_ADM_REJ', 'REG_USER_REJ', 'REG_USER_APR'] }
    })
    if (checkNumber) {
      const response = new MlRespPayload().errorPayload('This contact number has already been used for a registration', 409);
      return { isValid: false, validationResponse: response }
    } return { isValid: true };
  }

  static checkActiveOfficeBearer(regData) {
    let response = false
    const isOFB = mlDBController.findOne('MlRegistration', {
      'registrationInfo.email': regData.registration.email,
      'registrationInfo.communityDefCode': 'OFB'
    })
    const isOFBMember = mlDBController.findOne('MlOfficeMembers', {
      emailId: regData.registration.email,
      communityType: 'OFB',
      isActive: true
    })
    if (isOFB && isOFBMember) { response = true }
    return response
  }

  static isUserCanUpdate(regDetails, context) {
    const user = mlDBController.findOne('users', { _id: context.userId })
    if (user && user.profile && !user.profile.isInternaluser) {
      if (regDetails.status === 'REG_USER_APR' || regDetails.status === 'REG_ADM_REJ' || regDetails.status === 'REG_USER_REJ') {
        const response = new MlRespPayload().errorPayload('Registration details could not be updated. Please contact your moolya admin.', 409);
        return { isValid: false, validationResponse: response }
      }
      return { isValid: true };
    } return { isValid: true };
  }
}
