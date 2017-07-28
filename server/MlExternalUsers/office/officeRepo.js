/**
 * Created by venkatsrinag on 7/6/17.
 */

import MlUserContext from '../mlUserContext'
import _ from 'lodash'

class MlOfficeRepo{
    constructor(){
    }

    validateOfficeActions(userId, resourceName, userAction, payload){
      var defaultProfile = new MlUserContext().userProfileDetails(userId);
      if(!defaultProfile)
        return {success:false, msg:"Invalid User Details"};

      switch (userAction){
        case 'CREATEOFFICE':{
          return this.validateOfficeDetails(payload, context)
        }
        case 'ADDMEMBER':{
          return this.officeMemeberValidations(userId, defaultProfile, payload);
        }
        break;
      }

      return false
    }

    // This Method Will Create New Office Record
    createOffice(officeDetails, profile, context){
      var myOffice = {};
      myOffice['userId']          = context.userId
      myOffice["profileId"]       = profile.profileId
      myOffice['isActive']        = false;
      myOffice['createdDate']     = new Date();
      myOffice['clusterId']       = profile.clusterId;
      myOffice['clusterName']     = profile.clusterName;
      myOffice['chapterId']       = profile.chapterId;
      myOffice['chapterName']     = profile.chapterName;
      myOffice['subChapterId']    = profile.subChapterId;
      myOffice['subChapterName']  = profile.subChapterName;
      myOffice["communityId"]     = profile.communityId;
      myOffice["communityName"]   = profile.communityName;
      myOffice["officeName"]      = officeDetails.officeName;
      myOffice["branchType"]      = officeDetails.branchType;
      myOffice["officeLocation"]  = officeDetails.officeLocation;
      myOffice["landmark"]        = officeDetails.landmark;
      myOffice["streetLocality"]  = officeDetails.streetLocality;
      myOffice["area"]            = officeDetails.area;
      myOffice["city"]            = officeDetails.city;
      myOffice["state"]           = officeDetails.state;
      myOffice["country"]         = officeDetails.country;
      myOffice["zipCode"]         = officeDetails.zipCode;
      myOffice["about"]           = officeDetails.about;
      var officeId = mlDBController.insert('MlOffice', myOffice, context)
      return officeId;
    }

    // This Method Will create a office service card Instance from the definition
    createofficeServiceCard(officeDetails, profile, context, scDefId, officeId){
      let officeSC = {};
      officeSC["userId"]                = context.userId
      officeSC["profileId"]             = profile.profileId
      officeSC["officeId"]              = officeId
      officeSC["scDefId"]               = scDefId
      officeSC["totalusercount"]        = officeDetails.totalCount
      officeSC["principalcount"]        = officeDetails.principalUserCount
      officeSC["teamMembercount"]       = officeDetails.teamUserCount
      officeSC["availableCommunities"]  = officeDetails.availableCommunities
      officeSC["isReconciled"]          = false
      officeSC["isActive"]              = true
      officeSC["isActivated"]           = false
      officeSC["isExpired"]             = false
      var scId = mlDBController.insert('MlOfficeSC', officeSC, context)
      return scId;
    }

    // This Method Updates office Service Card
    updateOfficeServiceCard(officeId, updatedSCDetails, context){
      if(!officeId)
        throw new Error('Office Not Found');

      var ret = reconcileSCLedgerBalance(officeId)
      if(!ret)
        throw new Error('Failed in updating the office');

      let officeSC = mlDBController.findOne('MlOfficeSC', {officeId:officeId, isActive:true})
      if(!officeSC)
        throw new Error('Invalid Office Id');

      var ledger = mlDBController.findOne('MlOfficeLedger', {officeId:officeId})
      if(!ledger)
        throw new Error('No ledger is created');

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
    createBspokeSCDef(officeDetails, profile, context){
      let bSpokeOffice = {};
      // bSpokeOffice["officeId"]              = ;
      bSpokeOffice["totalCount"]            = officeDetails.totalCount
      bSpokeOffice["principalUserCount"]    = officeDetails.principalUserCount
      bSpokeOffice["teamUserCount"]         = officeDetails.teamUserCount
      bSpokeOffice["availableCommunities"]  = officeDetails.availableCommunities
      bSpokeOffice["serviceCardName"]       = 'beSpoke'
      bSpokeOffice["isBSpoke"]              = true
      bSpokeOffice["isSystemDefined"]       = false
      bSpokeOffice["createdBy"]             = context.userId
      bSpokeOffice["createdOn"]             = new Date();
      bSpokeOffice["isActive"]              = true
      orderNumberGenService.createBspokeOfficeSCcode(bSpokeOffice)
      var beSpokeId = mlDBController.insert('MlOfficeSCDef', bSpokeOffice, context)
      return beSpokeId;
    }

    // Ledger Entry will be created
    createOfficeLedgerEntry(scId){
        let officeLedger = {};
        officeSC = mlDBController.findOne('MlOfficeSC', {_id:scId})
        if(!officeSC)
          return

        officeLedger["userId"]                = officeSC.userId
        officeLedger["profileId"]             = officeSC.profileId
        officeLedger["officeId"]              = officeSC.officeId
        officeLedger["totalusercount"]        = officeSC.totalusercount
        officeLedger["principalcount"]        = officeSC.principalcount
        officeLedger["teamMembercount"]       = officeSC.teamMembercount
        officeLedger["availableCommunities"]  = officeSC.availableCommunities
        officeLedger["createdOn"]             = new Date();
        var ledgerId = mlDBController.insert('MlOfficeLedger', officeLedger, context)
        return ledgerId;

    }

    //This Method Reconcile ServiceCard and Update Office Service Card and Ledger Balance
    reconcileSCLedgerBalance(officeId){
        if(!officeId)
            return

        var officeSC = mlDBController.findOne('MlOfficeSC', {officeId:officeId})
        if(officeSC)
            return

        var ledger = mlDBController.findOne('MlOfficeLedger', {officeId:officeId})
        if(ledger)
          return

        var TUC  = ledger['totalusercount']   <= officeSC['totalusercount']  ? ledger['totalusercount']  : 0
        var PUC  = ledger['principalcount']   <= officeSC['principalcount']  ? ledger['principalcount']  : 0
        var PUC  = ledger['teamMembercount']  <= officeSC['teamMembercount'] ? ledger['teamMembercount'] : 0
        var ACC  = [];

        _.each(officeSC.availableCommunities, function(item){
          var obj = _.find(ledger.availableCommunities, {communityName:item.communityName})
          if(obj.limit > item.limit)
            obj.limit = item.limit - obj.limit
          ACC.push(obj)
        })

        ledger["totalusercount"]        = officeSC.totalusercount
        ledger["principalcount"]        = officeSC.principalcount
        ledger["teamMembercount"]       = officeSC.teamMembercount
        ledger["availableCommunities"]  = officeSC.availableCommunities
        ledger["updatedOn"]             = new Date();
        return mlDBController.update('MlOfficeLedger',{officeId:officeId},ledger,{$set: true,upsert: true},context);
    }

    updateLedgerBalanceOfficeJournal(officeId, officeMemberDetails, context){
      var ledgerBalance = mlDBController.findOne('MlOfficeLedger', {officeId:officeId});
      if(!ledgerBalance)
        throw new Error('Invalid Office Id');

      ledgerBalance.totalusercount = ledgerBalance.totalusercount - 1;
      if(officeMemberDetails.isPrincipal){
        ledgerBalance.principalcount = ledgerBalance.principalcount - 1;
      }
      else{
        var index = _.findIndex(ledgerBalance.availableCommunities, {communityId:officeMemberDetails.communityType})
        if(index < 0)
          throw  new Error('Invalid Community Type')
        ledgerBalance.availableCommunities[index].userCount = ledgerBalance.availableCommunities[index].userCount - 1;
        ledgerBalance.teamMembercount = ledgerBalance.teamMembercount - 1;
      }

      var ret = mlDBController.update('MlOfficeLedger',{officeId:officeId},ledgerBalance,{$set: true,upsert: true},context);
      if(!ret){
        return false;
      }


      // office journal entry should create

      return true;
    }

    // This Method Validates office expiry date
    validateOfficeExpiryDate(officeId, userId){
        var myOffice = mlDBController.findOne('MlOffice', {_id: officeId});
        if(!myOffice || (myOffice && myOffice.userId != context.userId)){
            return {success:false, msg:'Invalid Office'}
        }
        // let offices = MlUserSubscriptions.find({resId:officeId}).fetch();
        return {success:true}
    }


    // This Method Validates office Details
    validateOfficeDetails(officeDetails, userId) {
      return {success:true}
    }



    // This Method Validates office members count
    officeMemeberValidations(userId, profile, payload){
        var userOffices = mlDBController.find('MlOffice', {profileId:profile.profileId, userId:userId}).fetch();

        var myOffice = _.find(userOffices, {_id:payload.myOfficeId})
        if(!myOffice)
          throw new Error('Invalid Office Id');

        var ledgerBalance = mlDBController.findOne('MlOfficeLedger', {officeId:myOffice._id});
        if(!ledgerBalance)
          throw new Error('Invalid Office Id');

        var isExist = MlOfficeMembers.findOne({officeId:myOffice._id , emailId:payload.officeMember.emailId})
        if(isExist)
          return {success:false, msg:'User Already Exist'}

        if(ledgerBalance.totalusercount  == 0){
          return {success:false, msg:'Limit Exceeded'}
        }

        if(payload.officeMember.isPrincipal && ledgerBalance.principalcount == 0){
            return {success:false, msg:'Principal Users Limit Exceeded'}
        }

        else if(!payload.officeMember.isPrincipal){
          if(ledgerBalance.teamMembercount == 0)
            return {success:false, msg:'Team User Count Limit Exceeded'}

          var obj = _.find(ledgerBalance.availableCommunities, {communityId:payload.officeMember.communityType})
          if(!obj)
            return {success:false, msg:'Invalid Community Type'}

          if(obj.userCount == 0)
            return {success:false, msg:'Limit Exceeded'}
        }
        return {success:true}
    }
}


const mlOfficeValidationRepo = new MlOfficeRepo();
Object.freeze(mlOfficeValidationRepo);

export default mlOfficeValidationRepo;
