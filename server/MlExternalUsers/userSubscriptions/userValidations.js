/**
 * Created by venkatsrinag on 7/6/17.
 */

class MlUserValidations{
    constructor(){
    }

    // This Method Validates office expiry date
    validateOfficeExpiryDate(officeId, userId){
        var myOffice = mlDBController.findOne('MlOffice', {_id: args.myOfficeId});
        if(!myOffice || (myOffice && myOffice.userId != context.userId)){
            return {success:false, msg:'Invalid Office'}
        }
    }

    // This Method Validates office members count
    officeMemeberValidations(officeId, userType, officeOwnerId){
    }

  // This Method Validates process expiry date
    processValidations(processId){
    }
}


module.exports = MlUserValidations;
