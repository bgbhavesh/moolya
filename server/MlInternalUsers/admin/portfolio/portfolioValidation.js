/**
 * Created by venkatsrinag on 15/6/17.
 */

import _ from 'lodash'
import MlInvestmentsStageRepoService from '../../../MlExternalUsers/stages/mlInvestmentStagesRepoService';
import MlUserContext from '../../../MlExternalUsers/mlUserContext'
import mlSmsController from '../../../mlNotifications/mlSmsNotifications/mlSmsController'


class portfolioValidation {
  constructor() {

  }

  /**
   * allowPrivateFields checks for conditions to restrict the fields for portfolio
   * Returns Boolean for restricting the fields
   **/
  static allowPrivateFields(portfolioDetails, context) {
    var allowPrivateFields = false;
    var user = mlDBController.findOne('users', {"_id": (context || {}).userId}, context) || {};
    var portfolioDetailsId = (portfolioDetails || {})._id;

    /** actual private fields condition : true if Internal User or if its portfolio owner*/
    if ((user && user.profile && user.profile.isInternaluser) || (user._id === (portfolioDetails || {}).userId)) {
      allowPrivateFields = true;
      return true;
    }

    /** check for user onBoard condition and restrict the private fields*/
    allowPrivateFields = MlInvestmentsStageRepoService.canViewCompletePortfolio((context || {}).userId, portfolioDetailsId) || false;
    return allowPrivateFields;
  }

  omitPrivateDetails(portfolioDetailsId, object, context) {
    var portfolioDetails = MlPortfolioDetails.findOne(portfolioDetailsId) || {};
    //Pre Condition for restricting the private fields.
    var allowPrivateFields = portfolioValidation.allowPrivateFields(portfolioDetails, context);
    var praviteFields = portfolioDetails.privateFields
    var omittedFields = []

    if (!_.isArray(object)) {
    } else {
      _.each(object, function (item, index) {
        var omittedfields = []
        _.each(praviteFields, function (praviteField) {
          if ((item[praviteField.keyName] != undefined || ((_.isEmpty(item[praviteField.objectName]) == false && item[praviteField.objectName][praviteField.keyName] != undefined))) && praviteField.index == index) {
            if (!allowPrivateFields) {
              delete item[praviteField.keyName]
            }
            var praviteObject = _.find(praviteFields, {keyName: praviteField.keyName})
            omittedfields.push(praviteObject)
          }
        })
        item.privateFields = _.cloneDeep(omittedfields);
      })
      if (!allowPrivateFields) {
        _.remove(object, {makePrivate: true})
      }
      return object;
    }
    _.each(praviteFields, function (praviteField) {
      if (object[praviteField.keyName] != undefined || ((_.isEmpty(object[praviteField.objectName]) == false && object[praviteField.objectName][praviteField.keyName] != undefined))) {
        if (!allowPrivateFields) {
          // delete object[praviteField.keyName]
          if (object[praviteField.keyName])
            delete object[praviteField.keyName]
          else
            delete object[praviteField.objectName][praviteField.keyName]
        }
        var praviteObject = _.find(praviteFields, {keyName: praviteField.keyName})
        omittedFields.push(praviteObject)
      }
    })
    object.privateFields = _.cloneDeep(omittedFields);
    return object;
  }

  updatePrivateKeys(privateKeyArray, removeArray, dbArray) {
    if ((removeArray.length == 0 && dbArray.length == 0) && (removeArray.length > 0 && dbArray.length == 0)) {
      return privateKeyArray;
    }

    if (removeArray.length > 0 && dbArray.length > 0) {
      _.each(removeArray, function (item) {
        var index = _.find(dbArray, {keyName: item.keyName})
        if (index)
          _.remove(dbArray, {keyName: index.keyName});
      })
    }

    var concat = _.concat(dbArray, privateKeyArray);

    return concat
  }

  // sendSMSforPortfolio(portfolioDetailsId, msg){
  //   var portfolioDetails = MlPortfolioDetails.findOne(portfolioDetailsId) || {};
  //   if(portfolioDetails){
  //     var countryCode = MlClusters.findOne(portfolioDetails.clusterId);
  //     var defaultProfile = new MlUserContext().userProfileDetails(portfolioDetails.userId)
  //     if(countryCode && defaultProfile){
  //       var mobileNumber = defaultProfile.mobileNumber
  //       mlSmsController.sendSMS(msg, countryCode, mobileNumber)
  //     }
  //   }
  // }

  getLivePortfolioCount() {
    return mlDBController.aggregate('MlPortfolioDetails', [
      {$match: {status: "PORT_LIVE_NOW"}},
      {
        "$group": {
          _id: "$communityCode",
          "communityType": {$first: "$communityType"}, count: {$sum: 1}
        }
      },
      {
        "$lookup": {from: "mlCommunityDefinition", localField: "_id", foreignField: "code", as: "imageLink"}
      },
      {"$unwind": "$imageLink"},
      {
        $project: {
          "communityType": 1,
          "count": 1,
          "communityImageLink": '$imageLink.communityImageLink'
        }
      }
    ])
  }
}

const portfolioValidationRepo = new portfolioValidation();
Object.freeze(portfolioValidationRepo);

export default portfolioValidationRepo;
