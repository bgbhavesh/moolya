/**
 * Created by venkatsrinag on 24/4/17.
 */
import MlResolver from '../../../../commons/mlResolverDef';
import MlRespPayload from '../../../../commons/mlPayload';
import portfolioValidationRepo from '../portfolioValidation'
import MlEmailNotification from '../../../../mlNotifications/mlEmailNotifications/mlEMailNotification';
import MlAlertNotification from '../../../../mlNotifications/mlAlertNotifications/mlAlertNotification'
import MlNotificationController from '../../../../mlNotifications/mlAppNotifications/mlNotificationsController'
const _ = require('lodash')


MlResolver.MlMutationResolver.createFunderPortfolio = (obj, args, context, info) => {
  try {
    if (args && args.userId && args.communityType) {
      user = MlFunderPortfolio.findOne({ $and: [{ userId: args.userId }, { communityId: args.communityType }] })
      if (!user) {
        // MlFunderPortfolio.insert({
        //     userId: args.userId,
        //     communityType: args.communityType,
        //     portfolioDetailsId: args.portfolioDetailsId,
        //     funderAbout:args.funderAbout
        // })
        mlDBController.insert('MlFunderPortfolio', {
          userId: args.userId,
          communityType: args.communityType,
          portfolioDetailsId: args.portfolioDetailsId,
          funderAbout: args.funderAbout
        }, context)
      }
    }
  } catch (e) {
    console.log('Error: In creating Funder portfolio');
  }
}

MlResolver.MlMutationResolver.updateFunderPortfolio = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    try {
      const funderPortfolio = MlFunderPortfolio.findOne({ portfolioDetailsId: args.portfoliodetailsId })
      const updateFor = args.portfolio.funderPortfolio;
      if (funderPortfolio) {
        for (key in updateFor) {
          if (funderPortfolio.hasOwnProperty(key)) {
            if (_.isArray(updateFor[key]) && _.isArray(funderPortfolio[key])) {
              funderPortfolio[key] = updateArrayofObjects(updateFor[key], funderPortfolio[key])
            } else if (_.isObject(updateFor[key]) && _.isObject(funderPortfolio[key])) {
              _.mergeWith(funderPortfolio[key], updateFor[key], (objValue, srcValue) => {
                if (_.isArray(objValue)) {
                  return objValue.concat(srcValue);
                }
              });
            }
          } else {
            funderPortfolio[key] = updateFor[key]
          }
        }

        // let ret = MlFunderPortfolio.update({"portfolioDetailsId": args.portfoliodetailsId}, {$set: funderPortfolio})
        const ret = mlDBController.update('MlFunderPortfolio', { portfolioDetailsId: args.portfoliodetailsId }, funderPortfolio, { $set: true }, context)
        if (ret) {
          const details = MlPortfolioDetails.findOne({ _id: args.portfoliodetailsId })
          MlEmailNotification.onPortfolioUpdate(details);
          MlNotificationController.onPotfolioUpdate(details);
          const portfolioalert = MlAlertNotification.onPortfolioUpdates()
          const code = 200;
          const response = new MlRespPayload().successPayload(portfolioalert, code);
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

MlResolver.MlQueryResolver.fetchFunderAbout = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    const portfolio = MlFunderPortfolio.findOne({ portfolioDetailsId: args.portfoliodetailsId })
    if (portfolio && portfolio.hasOwnProperty('funderAbout')) {
      const details = portfolio.funderAbout ? portfolio.funderAbout : {}
      const extendData = MlProfessions.findOne({ _id: details.profession, industryId: details.industry }) || {};
      const userType = mlDBController.findOne('MlUserTypes', { _id: details.category ? details.category : '' }) || {};
      details.industry = extendData.industryName || details.industry;
      details.profession = extendData.professionName || details.profession;
      details.category = userType.displayName ? userType.displayName : details.category;
      /* let userPersonal = MlMasterSettings.findOne({_id:details.gender}) || {}
      details.gender = userPersonal.genderInfo ? userPersonal.genderInfo.genderName : '' */
      const userEmp = MlMasterSettings.findOne({ _id: details.employmentStatus }) || {}
      details.employmentStatus = userEmp.employmentTypeInfo ? userEmp.employmentTypeInfo.employmentName : details.employmentStatus;

      const object = portfolioValidationRepo.omitPrivateDetails(args.portfoliodetailsId, details, context, 'funderAbout');

      // for view action
      MlResolver.MlMutationResolver.createView(obj, { resourceId: args.portfoliodetailsId, resourceType: 'portfolio' }, context, info);

      return object;
    }
  }

  return {};
}

MlResolver.MlQueryResolver.fetchfunderPortfolioInvestor = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    const portfolio = MlFunderPortfolio.findOne({ portfolioDetailsId: args.portfoliodetailsId })
    if (portfolio && portfolio.hasOwnProperty('investments')) {
      if (portfolio && portfolio.investments) {
        portfolio.investments.map((investment, index) => {
          if (portfolio.investments[index]) {
            const investmentData = MlFundingTypes.findOne({ _id: investment.typeOfFundingId }) || {};
            portfolio.investments[index].typeOfFundingName = investmentData.displayName || '';
          }
        })
      }
      const filteredObject = portfolioValidationRepo.omitPrivateDetails(args.portfoliodetailsId, portfolio.investments, context, 'investments');
      return filteredObject;
    }
  }

  return [];
}

MlResolver.MlQueryResolver.fetchfunderPortfolioService = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    const portfolio = MlFunderPortfolio.findOne({ portfolioDetailsId: args.portfoliodetailsId })
    if (portfolio && portfolio.hasOwnProperty('services')) {
      // if(portfolio && portfolio['services']){
      //   portfolio.services.map(function(service,index) {
      //     if(portfolio.investments[index]){
      //       let investmentData = MlFundingTypes.findOne({"_id" : service.typeOfFundingId}) || {};
      //       portfolio.investments[index].typeOfFundingName = investmentData.displayName || "";
      //     }
      //
      //   })
      // }
      return portfolio.services;
    }
  }

  return [];
}

MlResolver.MlQueryResolver.fetchFunderPrincipal = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    const portfolio = MlFunderPortfolio.findOne({ portfolioDetailsId: args.portfoliodetailsId })
    if (portfolio && portfolio.hasOwnProperty('principal')) {
      return portfolio.principal;
    }
  }

  return [];
}

MlResolver.MlQueryResolver.fetchFunderTeam = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    const portfolio = MlFunderPortfolio.findOne({ portfolioDetailsId: args.portfoliodetailsId })
    if (portfolio && portfolio.hasOwnProperty('team')) {
      return portfolio.team;
    }
  }

  return [];
}

MlResolver.MlQueryResolver.fetchFunderAreaOfInterest = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    const portfolio = MlFunderPortfolio.findOne({ portfolioDetailsId: args.portfoliodetailsId })
    if (portfolio && portfolio.hasOwnProperty('areaOfInterest')) {
      if (portfolio && portfolio.areaOfInterest) {
        portfolio.areaOfInterest.map((areaOfInterest, index) => {
          if (portfolio.areaOfInterest[index]) {
            const areaOfInterestData = MlIndustries.findOne({ _id: areaOfInterest.industryTypeId }) || {};
            portfolio.areaOfInterest[index].industryTypeName = areaOfInterestData.industryName || '';
            const areaOfInterestDomain = MlSubDomain.findOne({ _id: areaOfInterest.subDomainId }) || {};
            portfolio.areaOfInterest[index].subDomainName = areaOfInterestDomain.name || '';
          }
        })
      }
      return portfolio.areaOfInterest;
    }
  }

  return [];
}

MlResolver.MlQueryResolver.fetchFunderSuccessStories = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    const portfolio = MlFunderPortfolio.findOne({ portfolioDetailsId: args.portfoliodetailsId })
    if (portfolio && portfolio.hasOwnProperty('successStories')) {
      return portfolio.successStories;
    }
  }

  return [];
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

/**
 * moving it from here to portfolioResolver
 * */
// MlResolver.MlQueryResolver['findPortfolioDetails'] = (obj, args, context, info) => {
//   if (args.portfoliodetailsId) {
//     let portfolio = MlPortfolioDetails.findOne({"_id": args.portfoliodetailsId})
//     if (portfolio.clusterId) {
//       return portfolio;
//     }
//   }
//   return {};
// }

MlResolver.MlQueryResolver.fetchFunderDetails = (obj, args, context, info) => {
  if (_.isEmpty(args)) { return; }

  const key = args.key;
  const portfoliodetailsId = args.portfoliodetailsId
  const funderPortfolio = MlFunderPortfolio.findOne({ portfolioDetailsId: portfoliodetailsId })
  if (funderPortfolio && funderPortfolio.hasOwnProperty(key)) {
    const object = funderPortfolio[key];
    const filteredObject = portfolioValidationRepo.omitPrivateDetails(args.portfoliodetailsId, object, context, key);
    funderPortfolio[key] = filteredObject
    return funderPortfolio;
  }
}
