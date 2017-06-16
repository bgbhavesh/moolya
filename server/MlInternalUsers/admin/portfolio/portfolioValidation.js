/**
 * Created by venkatsrinag on 15/6/17.
 */
class portfolioValidation{
    constructor(){

    }

    omitPrivateDetails(portfolioDetailsId, object, boolKey, fieldToOmit, context){
        let retObject;
        var portfolioDetails = MlPortfolioDetails.findOne(portfolioDetailsId)
        if((portfolioDetails.userId == context.userId) || !object[boolKey]){
            return object;
        }
        retObject = _.omit(object, fieldToOmit);
        return retObject
    }
}
