import MlResolver from "../../../../commons/mlResolverDef";
import MlRespPayload from "../../../../commons/mlPayload";
import portfolioValidationRepo from '../portfolioValidation'
import MlEmailNotification from "../../../../mlNotifications/mlEmailNotifications/mlEMailNotification";
import MlAlertNotification from '../../../../mlNotifications/mlAlertNotifications/mlAlertNotification'
var _ = require('lodash')


MlResolver.MlMutationResolver['createCompanyPortfolio'] = (obj, args, context, info) => {
  try {
    if (args && args.userId && args.communityType)
    {
      user = MlCompanyPortfolio.findOne({"$and": [{'userId': args.userId}, {'communityId': args.communityType}]})
      if (!user) {
        mlDBController.insert('MlCompanyPortfolio', {
          userId: args.userId,
          communityType: args.communityType,
          portfolioDetailsId: args.portfolioDetailsId,
        }, context)
      }
    }
  } catch (e) {
    console.log("Error: In creating company portfolio");
  }
}
