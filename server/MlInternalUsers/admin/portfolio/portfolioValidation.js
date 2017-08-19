/**
 * Created by venkatsrinag on 15/6/17.
 */

import _ from 'lodash'
import MlInvestmentsStageRepoService from '../../../MlExternalUsers/stages/mlInvestmentStagesRepoService';
class portfolioValidation{
    constructor(){

    }

  /**
   * allowPrivateFields checks for conditions to restrict the fields for portfolio
   * Returns Boolean for restricting the fields
   **/
  static allowPrivateFields(portfolioDetails,context){
        var allowPrivateFields=false;
        var user = mlDBController.findOne('users', {"_id":(context||{}).userId}, context) || {};
        var portfolioDetailsId=(portfolioDetails||{})._id;

       /** actual private fields condition : true if Internal User or if its portfolio owner*/
       if((user && user.profile && user.profile.isInternaluser) || (user._id === (portfolioDetails||{}).userId)){
           allowPrivateFields=true;
           return true;
       }

        /** check for user onBoard condition and restrict the private fields*/
        allowPrivateFields=MlInvestmentsStageRepoService.canViewCompletePortfolio((context||{}).userId,portfolioDetailsId)||false;
        return allowPrivateFields;
    }

    omitPrivateDetails(portfolioDetailsId, object, context){
        var portfolioDetails = MlPortfolioDetails.findOne(portfolioDetailsId)||{};
      //Pre Condition for restricting the private fields.
      var allowPrivateFields=portfolioValidation.allowPrivateFields(portfolioDetails,context);
      var praviteFields = portfolioDetails.privateFields
        var omittedFields = []

        if(_.isArray(object)){
          _.each(object, function (item, index) {
              var omittedfields = []
            _.each(praviteFields, function (praviteField){
              if(item[praviteField.keyName] != undefined && praviteField.index == index){

                if(!allowPrivateFields){
                  delete item[praviteField.keyName]
                }
                var praviteObject = _.find(praviteFields, {keyName:praviteField.keyName})
                omittedfields.push(praviteObject)
              }
            })
            item.privateFields = _.cloneDeep(omittedfields);
          })
          if(!allowPrivateFields){
            _.remove(object, {makePrivate:true})
          }
          return object;
        }
        _.each(praviteFields, function (praviteField)
        {
            console.log(praviteField)
            if(object[praviteField.keyName] != undefined){
                if(!allowPrivateFields){
                  delete object[praviteField.keyName]
                }
                var praviteObject = _.find(praviteFields, {keyName:praviteField.keyName})
                omittedFields.push(praviteObject)
            }
        })
        object.privateFields = _.cloneDeep(omittedFields);

        // if(!hasRestrictionOnPrivateFields) {object.privateFields=[]};
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
