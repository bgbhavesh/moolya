/**
 * Created by vishwadeep on 10/7/17.
 */
import MlResolver from '../../../../commons/mlResolverDef';
import MlRespPayload from '../../../../commons/mlPayload';
import MlEmailNotification from '../../../../mlNotifications/mlEmailNotifications/mlEMailNotification';
import MlAlertNotification from '../../../../mlNotifications/mlAlertNotifications/mlAlertNotification';
import MlNotificationController from '../../../../mlNotifications/mlAppNotifications/mlNotificationsController'
// import _ from "lodash";
const _ = require('lodash')
// import MlUserContext from "../../../../MlExternalUsers/mlUserContext";
// import MlAdminUserContext from "../../../../mlAuthorization/mlAdminUserContext";
import portfolioValidationRepo from '../portfolioValidation'

MlResolver.MlMutationResolver.createServiceProviderPortfolio = (obj, args, context, info) => {
  try {
    if (args && args.userId && args.communityType) {
      user = MlServiceProviderPortfolio.findOne({ $and: [{ userId: args.userId }, { communityId: args.communityType }] })
      if (!user) {
        mlDBController.insert('MlServiceProviderPortfolio', {
          userId: args.userId,
          communityType: args.communityType,
          portfolioDetailsId: args.portfolioDetailsId
        }, context)
      }
    }
  } catch (e) {
    console.log('Error: In creating service provider portfolio');
  }
}

MlResolver.MlMutationResolver.updateServiceProviderPortfolio = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    try {
      const serviceProviderPortfolio = MlServiceProviderPortfolio.findOne({ portfolioDetailsId: args.portfoliodetailsId })
      const updateFor = args.portfolio.serviceProviderPortfolio;
      if (serviceProviderPortfolio) {
        for (key in updateFor) {
          if (serviceProviderPortfolio.hasOwnProperty(key)) {
            if (_.isArray(updateFor[key]) && _.isArray(serviceProviderPortfolio[key])) {
              serviceProviderPortfolio[key] = updateArrayofObjects(updateFor[key], serviceProviderPortfolio[key])
            } else if (_.isObject(updateFor[key]) && _.isObject(serviceProviderPortfolio[key])) {
              _.mergeWith(serviceProviderPortfolio[key], updateFor[key], (objValue, srcValue) => {
                if (_.isArray(objValue)) {
                  return objValue.concat(srcValue);
                }
              });
            }
          } else {
            serviceProviderPortfolio[key] = updateFor[key]
          }
        }

        const ret = mlDBController.update('MlServiceProviderPortfolio', { portfolioDetailsId: args.portfoliodetailsId }, serviceProviderPortfolio, { $set: true }, context)
        if (ret) {
          const details = MlPortfolioDetails.findOne({ _id: args.portfoliodetailsId })
          MlEmailNotification.onPortfolioUpdate(details);
          MlNotificationController.onPotfolioUpdate(details);
          const serviceprovideralert = MlAlertNotification.onPortfolioUpdates()
          const code = 200;
          const response = new MlRespPayload().successPayload(serviceprovideralert, code);
          return response;
        }
      } else {
        const code = 400;
        const response = new MlRespPayload().errorPayload('Invalid portfolio request', code);
        return response;
      }
    } catch (e) {
      const code = 400;
      const response = new MlRespPayload().errorPayload(e.message, code);
      return response;
    }
  }
}

MlResolver.MlQueryResolver.fetchServiceProviderDetails = (obj, args, context, info) => {
  if (_.isEmpty(args)) { return; }
  const key = args.key;
  const serviceProviderPortfolio = MlServiceProviderPortfolio.findOne({ portfolioDetailsId: args.portfoliodetailsId })
  if (serviceProviderPortfolio && serviceProviderPortfolio.hasOwnProperty(key)) {
    const object = serviceProviderPortfolio[key];
    const filteredObject = portfolioValidationRepo.omitPrivateDetails(args.portfoliodetailsId, object, context, key);
    serviceProviderPortfolio[key] = filteredObject
    return serviceProviderPortfolio;
  }
}

updateArrayofObjects = (updateFor, source) => {
  if (_.isArray(updateFor) && _.isArray(source)) {
    _.each(updateFor, (obj) => {
      const isObj = _.find(source, { index: obj.index })
      const itemIndex = _.findIndex(source, { index: obj.index })
      if (isObj && itemIndex >= 0) {
        _.mergeWith(source[itemIndex], obj)
      } else {
        source.push(obj)
      }
    })
  }
  return source;
}
