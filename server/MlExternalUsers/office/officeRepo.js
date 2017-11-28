/**
 * Created by venkatsrinag on 7/6/17.
 */

import MlUserContext from '../mlUserContext'
import moment from 'moment'
import mlSmsController from '../../mlNotifications/mlSmsNotifications/mlSmsController'
import _ from 'lodash'

const DEFAULT_FREQUENCY_BSPOKE = 'YEARLY';

class MlOfficeRepo {
  constructor() {
  }

  validateOfficeActions(userId, resourceName, userAction, payload) {
    const defaultProfile = new MlUserContext().userProfileDetails(userId);
    if (!defaultProfile) { return { success: false, msg: 'Invalid user details' }; }

    switch (userAction) {
      case 'CREATEOFFICE': {
        return this.validateOfficeDetails(payload)
      }
      case 'ADDMEMBER': {
        return this.officeMemeberValidations(userId, defaultProfile, payload);
      }
        break;
    }

    return false
  }

  // This Method Will Create New Office Record
  createOffice(officeDetails, profile, context) {
    const myOffice = {};
    myOffice.userId = context.userId
    myOffice.profileId = profile.profileId
    myOffice.isActive = false;
    myOffice.createdDate = new Date();
    myOffice.clusterId = profile.clusterId;
    myOffice.clusterName = profile.clusterName;
    myOffice.chapterId = profile.chapterId;
    myOffice.chapterName = profile.chapterName;
    myOffice.subChapterId = profile.subChapterId;
    myOffice.subChapterName = profile.subChapterName;
    myOffice.communityId = profile.communityId;
    myOffice.communityName = profile.communityName;
    myOffice.officeName = officeDetails.officeName;
    myOffice.branchType = officeDetails.branchType;
    myOffice.officeLocation = officeDetails.officeLocation;
    myOffice.landmark = officeDetails.landmark;
    myOffice.streetLocality = officeDetails.streetLocality;
    myOffice.area = officeDetails.area;
    myOffice.city = officeDetails.city;
    myOffice.state = officeDetails.state;
    myOffice.country = officeDetails.country;
    myOffice.zipCode = officeDetails.zipCode;
    myOffice.about = officeDetails.about;
    const officeId = mlDBController.insert('MlOffice', myOffice, context)
    return officeId;
  }

  // This Method Will create a office service card Instance from the definition
  createofficeServiceCard(officeDetails, profile, context, scDefId, officeId, frequencyType) {
    const officeSC = {};
    officeSC.userId = context.userId
    officeSC.profileId = profile.profileId
    officeSC.officeId = officeId
    officeSC.scDefId = scDefId
    officeSC.totalusercount = officeDetails.totalCount
    officeSC.principalcount = officeDetails.principalUserCount
    officeSC.teamMembercount = officeDetails.teamUserCount
    officeSC.availableCommunities = officeDetails.availableCommunities
    officeSC.isReconciled = false
    officeSC.isActive = true
    officeSC.isActivated = false
    officeSC.isExpired = false
    // officeSC["expiryDate"]            = this.getExpiryDate(frequencyType)
    const scId = mlDBController.insert('MlOfficeSC', officeSC, context)
    return scId;
  }

  // This Method Updates office Service Card
  updateOfficeServiceCard(officeId, updatedSCDetails, context) {
    if (!officeId) { throw new Error('Office Not Found'); }

    const ret = reconcileSCLedgerBalance(officeId, context)
    if (!ret) { throw new Error('Failed in updating the office details'); }

    const officeSC = mlDBController.findOne('MlOfficeSC', { officeId, isActive: true })
    if (!officeSC) { throw new Error('Invalid Office Id'); }

    const ledger = mlDBController.findOne('MlOfficeLedger', { officeId })
    if (!ledger) { throw new Error('No ledger is created'); }

    // Need some clarity on update office payload

    // let updatedOffice = {};
    // updatedOffice["userId"]                = officeSC["userId"]
    // updatedOffice["profileId"]             = officeSC["profileId"]
    // updatedOffice["officeId"]              = officeSC["officeId"]
    // updatedOffice["scDefId"]               = officeSC["scDefId"]
    // updatedOffice["isReconciled"]          = true
    // updatedOffice["isActive"]              = true
    // updatedOffice["isActivated"]           = true
    // updatedOffice["isExpired"]             = false
    // updatedOffice["totalCount"]            = officeSC.totalCount + updatedSCDetails.totalCount
    // updatedOffice["principalUserCount"]    = officeSC.totalCount + updatedSCDetails.principalUserCount
    // updatedOffice["teamUserCount"]         = officeSC.totalCount + updatedSCDetails.teamUserCount
    // // updatedOffice["availableCommunities"]  = updatedSCDetails.availableCommunities
    // var scId = mlDBController.insert('MlOfficeSC', updatedOffice, context)
  }

  // This Method Will create be Spoke Service Card Definition
  createBspokeSCDef(officeDetails, profile, context) {
    const bSpokeOffice = {};
    const clusters = [{ clusterId: profile.clusterId, clusterName: profile.clusterName }];
    const chapters = [{ chapterId: profile.chapterId, chapterName: profile.chapterName }];
    const subChapters = [{ subChapterId: profile.subChapterId, subChapterName: profile.subChapterName }];

    // bSpokeOffice["officeId"]              = ;
    bSpokeOffice.profileId = profile.profileId;
    bSpokeOffice.totalCount = officeDetails.totalCount
    bSpokeOffice.principalUserCount = officeDetails.principalUserCount
    bSpokeOffice.teamUserCount = officeDetails.teamUserCount
    bSpokeOffice.availableCommunities = officeDetails.availableCommunities
    bSpokeOffice.serviceCardName = 'beSpoke'
    bSpokeOffice.isBSpoke = true
    bSpokeOffice.isSystemDefined = false
    bSpokeOffice.createdBy = context.userId
    bSpokeOffice.createdOn = new Date();
    bSpokeOffice.isActive = true;
    bSpokeOffice.clusters = clusters;
    bSpokeOffice.chapters = chapters;
    bSpokeOffice.subChapters = subChapters;
    const frequency = MlFrequencyType.findOne({ code: DEFAULT_FREQUENCY_BSPOKE })
    bSpokeOffice.frequencyType = frequency._id;
    const cardType = MlServiceCardType.findOne({ code: 'OFFICECARD' })
    bSpokeOffice.cardType = cardType._id;
    orderNumberGenService.createBspokeOfficeSCcode(bSpokeOffice)
    const beSpokeId = mlDBController.insert('MlOfficeSCDef', bSpokeOffice, context)
    return { officeDefId: beSpokeId, frequencyType: frequency._id };
  }

  // Ledger Entry will be created
  createOfficeLedgerEntry(scId, context) {
    const officeLedger = {};
    officeSC = mlDBController.findOne('MlOfficeSC', { _id: scId })
    if (!officeSC) { return }

    officeLedger.userId = officeSC.userId
    officeLedger.profileId = officeSC.profileId
    officeLedger.officeId = officeSC.officeId
    officeLedger.totalusercount = officeSC.totalusercount
    officeLedger.principalcount = officeSC.principalcount// - 1 // -1 for default principle user
    officeLedger.teamMembercount = officeSC.teamMembercount
    officeLedger.availableCommunities = officeSC.availableCommunities
    officeLedger.createdOn = new Date();
    const ledgerId = mlDBController.insert('MlOfficeLedger', officeLedger, context)
    return ledgerId;
  }

  // This Method Reconcile ServiceCard and Update Office Service Card and Ledger Balance
  reconcileSCLedgerBalance(officeId, context) {
    if (!officeId) { return }

    const officeSC = mlDBController.findOne('MlOfficeSC', { officeId })
    if (officeSC) { return }

    const ledger = mlDBController.findOne('MlOfficeLedger', { officeId })
    if (ledger) { return }

    const TUC = ledger.totalusercount <= officeSC.totalusercount ? ledger.totalusercount : 0
    var PUC = ledger.principalcount <= officeSC.principalcount ? ledger.principalcount : 0
    var PUC = ledger.teamMembercount <= officeSC.teamMembercount ? ledger.teamMembercount : 0
    const ACC = [];

    _.each(officeSC.availableCommunities, (item) => {
      const obj = _.find(ledger.availableCommunities, { communityName: item.communityName })
      if (obj.limit > item.limit) { obj.limit = item.limit - obj.limit }
      ACC.push(obj)
    })

    ledger.totalusercount = officeSC.totalusercount
    ledger.principalcount = officeSC.principalcount
    ledger.teamMembercount = officeSC.teamMembercount
    ledger.availableCommunities = officeSC.availableCommunities
    ledger.updatedOn = new Date();
    return mlDBController.update('MlOfficeLedger', { officeId }, ledger, { $set: true, upsert: true }, context);
  }

  updateLedgerBalanceOfficeJournal(officeId, officeMemberDetails, context) {
    const ledgerBalance = mlDBController.findOne('MlOfficeLedger', { officeId });
    if (!ledgerBalance) { throw new Error('Invalid Office Id'); }

    ledgerBalance.totalusercount -= 1;
    if (officeMemberDetails.isPrincipal) {
      ledgerBalance.principalcount -= 1;
    } else {
      const index = _.findIndex(ledgerBalance.availableCommunities, { communityId: officeMemberDetails.communityType })
      if (index < 0) { throw new Error('Invalid Community Type') }
      ledgerBalance.availableCommunities[index].userCount = ledgerBalance.availableCommunities[index].userCount - 1;
      ledgerBalance.teamMembercount -= 1;
    }

    const ret = mlDBController.update('MlOfficeLedger', { officeId }, ledgerBalance, { $set: true, upsert: true }, context);
    if (!ret) {
      return false;
    }


    // office journal entry should create

    return true;
  }

  getExpiryDate(frequencyId) {
    const frequency = MlFrequencyType.findOne({ _id: frequencyId });
    if (!frequency) { throw new Error('Invalid Frequency'); }

    const expiryDate = moment().add(frequency.value, 'months')
    return expiryDate;
  }

  // This Method Validates office expiry date
  validateOfficeExpiryDate(officeId, userId) {
    // var myOffice = mlDBController.findOne('MlOffice', {_id: officeId});
    // if(!myOffice || (myOffice && myOffice.userId != context.userId)){
    //     return {success:false, msg:'Invalid Office'}
    // }
    // let offices = MlUserSubscriptions.find({resId:officeId}).fetch();
    return { success: true }
  }


  // This Method Validates office Details
  validateOfficeDetails(officeDetails, userId) {
    return { success: true }
  }


  // This Method Validates office members count
  officeMemeberValidations(userId, profile, payload) {
    // var userOffices = mlDBController.find('MlOffice', {profileId:profile.profileId, userId:userId}).fetch();
    const officeMember = mlDBController.findOne('MlOfficeMembers', { officeId: payload.myOfficeId, userId });
    if (!officeMember || (!officeMember.isPrincipal && !officeMember.isAdminUser)) { throw new Error('Invalid Office Member'); }

    const myOffice = mlDBController.findOne('MlOffice', { _id: payload.myOfficeId, isActive: true });
    if (!myOffice) { throw new Error('Invalid Office Id'); }

    const ledgerBalance = mlDBController.findOne('MlOfficeLedger', { officeId: myOffice._id });
    if (!ledgerBalance) { throw new Error('Invalid Office Id'); }

    const isExist = MlOfficeMembers.findOne({ officeId: myOffice._id, emailId: payload.officeMember.emailId })
    if (isExist) { return { success: false, msg: 'User already exists' } }

    if (ledgerBalance.totalusercount == 0) {
      return { success: false, msg: 'Limit Exceeded' }
    }

    if (payload.officeMember.isPrincipal && ledgerBalance.principalcount == 0) {
      return { success: false, msg: 'Principal Users Limit Exceeded' }
    } else if (!payload.officeMember.isPrincipal) {
      if (ledgerBalance.teamMembercount == 0) { return { success: false, msg: 'Team User Count Limit Exceeded' } }

      const obj = _.find(ledgerBalance.availableCommunities, { communityId: payload.officeMember.communityType })
      if (!obj) { return { success: false, msg: 'Invalid Community Type' } }

      if (obj.userCount == 0) { return { success: false, msg: `${obj.communityName} Limit Exceeded` } }
    }
    return { success: true }
  }
}


const mlOfficeValidationRepo = new MlOfficeRepo();
Object.freeze(mlOfficeValidationRepo);
export default mlOfficeValidationRepo;
