/**
 * Created by venkatsrinag on 15/6/17.
 */

import _ from 'lodash'

class portfolioValidation{
    constructor(){

    }

    omitPrivateDetails(portfolioDetailsId, object, context){
        var portfolioDetails = MlPortfolioDetails.findOne(portfolioDetailsId);
        var user = Meteor.users.findOne({_id:context.userId});
        var praviteFields = portfolioDetails.privateFields
        var omittedFields = []
        _.each(praviteFields, function (praviteField)
        {
            if(object[praviteField.keyName] != undefined){

                if((user && user.profile && !user.profile.isInternaluser) && (context.userId != portfolioDetails.userId)){
                  delete object[praviteField.keyName]
                }
                var praviteObject = _.find(praviteFields, {keyName:praviteField.keyName})
                omittedFields.push(praviteObject)
            }
        })
        object.privateFields = _.cloneDeep(omittedFields);
        return object;
    }

    updatePrivateKeys(privateKeyArray, removeArray, dbArray){
      if((removeArray.length == 0 && dbArray.length == 0) && (removeArray.length > 0 && dbArray.length == 0)){
        return privateKeyArray;
      }

      if(removeArray.length > 0 && dbArray.length > 0){
        _.each(removeArray, function (item) {
          var index = _.find(dbArray, {keyName:item.keyName})
          if(index)
            _.remove(dbArray, {keyName:index.keyName});
        })
      }

      var concat = _.concat(dbArray, privateKeyArray);

      return concat
    }
}

const portfolioValidationRepo = new portfolioValidation();
Object.freeze(portfolioValidationRepo);

export default portfolioValidationRepo;
