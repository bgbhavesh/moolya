/**
 * Created by venkatsrinag on 7/6/17.
 */

class MlOfficeValidations{
    constructor(){
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

    // This Method Validates office members count
    officeMemeberValidations(officeId, officeMember){
        var myOffice = mlDBController.findOne('MlOffice', {_id: officeId});
        var isExist = MlOfficeMembers.findOne({officeId:officeId , emailId:officeMember.emailId})
        if(isExist)
          return {success:false, msg:'User Already Exist'}

        var totalOfficeMembersCount = mlDBController.find('MlOfficeMembers', {officeId: officeId}).count();
        if(totalOfficeMembersCount == myOffice.totalCount){
            return {success:false, msg:'Limit Exceeded'}
        }

        if(officeMember.isPrincipal){
            let principalUserCount = MlOfficeMembers.find({officeId:officeId , isPrincipal:true}).count();
            if(principalUserCount == myOffice.principalUserCount)
              return {success:false, msg:'Limit Exceeded'}
        }
        else{
            let communityMemberCount = MlOfficeMembers.find({officeId:officeId, isPrincipal: { '$ne' : true}, communityType:officeMember.communityType}).count();
            let cmc = _.filter(myOffice.availableCommunities, function (ac) {
                return ac.communityName == officeMember.communityType
            });
          if( cmc && cmc.length &&  cmc[0].count == communityMemberCount )
                return {success:false, msg:'Limit Exceeded'}
        }

        return {success:true}
    }
}


module.exports = MlOfficeValidations;
