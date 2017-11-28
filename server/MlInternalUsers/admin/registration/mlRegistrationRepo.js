
/**
 * Created by mohammed.mohasin on 30/04/17.
 */
import _ from 'lodash';
import MlStatusRepo from '../../../commons/mlStatus';
import MlRegistrationPreCondition from './registrationPreConditions';
class MlRegistrationRepo {
  constructor() {
    if (!MlRegistrationRepo.instance) {
      MlRegistrationRepo.instance = this;
    }
    return MlRegistrationRepo.instance;
  }

  updateStatus(request, code, module) {
    return MlStatusRepo.updateStatus(request, code, module);
  }

  updateEmailStatus(reg) {
    const registration = reg || {};
    const validation = MlRegistrationPreCondition.validateEmailVerification(registration);
    if (validation.isValid) {
      this.updateStatus(registration, 'REG_EMAIL_P');
    } else {
      this.updateStatus(registration, 'REG_EMAIL_V');
    }
    return registration;
  }

  /**
 *@param regId
 *This method updates the email/mobile number verification details of external user for the registration.
 *User will have multiple profiles but the primary verification details will be verified only once.
 * */
  updateUserVerificationDetails(regId, type, context) {
    const regDetails = mlDBController.findOne('MlRegistration', regId, context) || {};
    let updatedCount = 0;

    if (regDetails) {
      const userName = regDetails.registrationInfo.email;
      let emailVerificationTokens = null;
      let emails = null;
      let emailRec = null;
      let otps = null;
      let otpRec = null;
      let mobileNumber = null;
      switch (type) {
        case 'email':
          emailVerificationTokens = regDetails && regDetails.services && regDetails.services.email && regDetails.services.email.verificationTokens ? regDetails.services.email.verificationTokens : [];
          emails = regDetails && regDetails.emails ? regDetails.emails : [];
          emailRec = _.find(emails || [], e => e.address == userName);
          /** verify the email of user if its not verified. its one time activity. */
          updatedCount = mlDBController.update(
            'users', { username: userName, emails: { $elemMatch: { address: userName, verified: false } } },
            { $set: { 'emails.$': emailRec }, $push: { 'services.email.verificationTokens': emailVerificationTokens } }, { blackbox: true }, context
          );
          break;

        case 'mobileNumber':
          otps = regDetails && regDetails.otps ? regDetails.otps : [];
          mobileNumber = regDetails && regDetails.registrationInfo && regDetails.registrationInfo.contactNumber ? regDetails.registrationInfo.contactNumber : null;
          /** User mobile number verification should be based on email and mobileNumber */
          /** if user has valid email then check for verified mobileNumber to update the otp
          //Most Important: if user changes the mobileNumber,otps should be cleared. */
          updatedCount = mlDBController.update(
            'users', { username: userName, otps: { $elemMatch: { verified: false } } },
            { $set: { otps } }, { blackbox: true }, context
          );
          break;

        case 'all':
          emailVerificationTokens = regDetails && regDetails.services && regDetails.services.email && regDetails.services.email.verificationTokens ? regDetails.services.email.verificationTokens : [];
          emails = regDetails && regDetails.emails ? regDetails.emails : [];
          mobileNumber = regDetails && regDetails.registrationInfo && regDetails.registrationInfo.contactNumber ? regDetails.registrationInfo.contactNumber : null;
          otps = regDetails && regDetails.otps ? regDetails.otps : [];
          /** fetch the email of user from emails array */
          emailRec = _.find(emails || [], e => e.address == userName);

          /** fetch the verified otp of user from otps array */
          otpRec = _.find(otps || [], e => e.verified == true);

          mlDBController.update(
            'users', { username: userName, emails: { $elemMatch: { address: userName, verified: false } } },
            { $set: { 'emails.$': emailRec }, $push: { 'services.email.verificationTokens': emailVerificationTokens } }, { blackbox: true }, context
          );

          mlDBController.update(
            'users', { username: userName, mobileNumbers: { $elemMatch: { mobileNumber, verified: false } } },
            { $set: { 'mobileNumbers.$.verified': (otpRec || {}).verified || false } }, { blackbox: true }, context
          );

          break;
      }
      return updatedCount;
    }
  }

  updateExternalProfileInfo(regId, type, context) {
    const regDetails = mlDBController.findOne('MlRegistration', regId, context) || {};
    const user = mlDBController.findOne('users', { 'profile.externalUserProfiles': { $elemMatch: { registrationId: regId } } }, context) || {};
    const userExternalProfile = user.profile && user.profile.externalUserProfiles ? user.profile.externalUserProfiles : []
    const exProfile = _.find(userExternalProfile, { registrationId: regId });
    const updatedCount = 0;
    if (regDetails) {
      // orderNumberGenService.generateProfileId(regDetails)
      const info = {
        clusterId: exProfile.clusterId,
        registrationId: exProfile.registrationId,
        profileId: exProfile.profileId,
        socialLinksInfo: regDetails.socialLinksInfo,
        addressInfo: regDetails.addressInfo,
        emailInfo: regDetails.emailInfo,
        contactInfo: regDetails.contactInfo,
        kycDocuments: regDetails.kycDocuments
      }
      const user = mlDBController.findOne('users', { 'profile.externalUserProfiles.registrationId': { $in: [regId] } }, context);
      const profileInfo = [];
      if (user.profile.externalUserAdditionalInfo) {
        const existingRecords = user.profile.externalUserAdditionalInfo
        existingRecords.map((oldRecord) => {
          profileInfo.push(oldRecord)
        })
        profileInfo.push(info)
      } else {
        profileInfo.push(info)
      }
      const resp = mlDBController.update('users', { _id: user._id }, { 'profile.isActive': true, 'profile.externalUserAdditionalInfo': profileInfo }, { $set: true }, context)
      console.log(resp);
    }
  }
  ApproveExternalProfileInfo(regId, type, context) {
    result = mlDBController.update(
      'users', { 'profile.externalUserProfiles': { $elemMatch: { registrationId: regId } } },
      { 'profile.externalUserProfiles.$.isApprove': true }, { $set: true }, context
    );
  }

  /**
   * creating the registration for moolya in case of
   * 1) non-moolya subchapter
   * 2) transact with moolya enabled
   * 13-09-2017 ( Discussed with Suresh)
   *      1) Auto Approve the hard-registration for default subchapter and clone the registration/portfolio
   *      2) This is triggered once the non-moolya registration and portfolio is approved
   * */
  createRegistrationProxy(registrationId, context) {
    // check the condition if canTransact is enabled in moolya then only follow the steps
    let registrationDetails = mlDBController.findOne('MlRegistration', { _id: registrationId }) || {}
    registrationDetails = _.omit(registrationDetails, '_id')
    const subChapterId = registrationDetails.registrationInfo && registrationDetails.registrationInfo.subChapterId ? registrationDetails.registrationInfo.subChapterId : ''
    const subChapterDetails = mlDBController.findOne('MlSubChapters', { _id: subChapterId }) || {}
    let resp = null
    if (subChapterDetails && !subChapterDetails.isDefaultSubChapter) {
      const defaultSubChapter = mlDBController.findOne('MlSubChapters', {
        clusterId: subChapterDetails.clusterId,
        chapterId: subChapterDetails.chapterId,
        isDefaultSubChapter: true
      })
      registrationDetails.status = 'Yet To Start'
      const regInfo = registrationDetails.registrationInfo
      const isRegister = mlDBController.findOne('MlRegistration', {
        'registrationInfo.clusterId': regInfo.clusterId,
        'registrationInfo.chapterId': regInfo.chapterId,
        'registrationInfo.subChapterId': defaultSubChapter._id,
        'registrationInfo.userId': regInfo.userId
      })
      if (!isRegister && regInfo.userId) {
        regInfo.registrationDate = new Date()
        regInfo.subChapterId = defaultSubChapter._id
        regInfo.subChapterName = defaultSubChapter.subChapterName
        orderNumberGenService.assignRegistrationId(regInfo)
        registrationDetails.transactionId = regInfo.registrationId
        registrationDetails.registrationInfo = regInfo
        resp = mlDBController.insert('MlRegistration', registrationDetails, context)
        return resp
      }
    }
  }
}
const mlRegistrationRepo = new MlRegistrationRepo();
Object.freeze(mlRegistrationRepo);

export default mlRegistrationRepo;

