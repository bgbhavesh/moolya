import MlResolver from '../../../../commons/mlResolverDef';
import MlRespPayload from '../../../../commons/mlPayload';
import MlEmailNotification from '../../../../mlNotifications/mlEmailNotifications/mlEMailNotification';
import MlAlertNotification from '../../../../mlNotifications/mlAlertNotifications/mlAlertNotification';
import portfolioValidationRepo from '../portfolioValidation';
import MlNotificationController from '../../../../mlNotifications/mlAppNotifications/mlNotificationsController';

const _ = require('lodash')

MlResolver.MlMutationResolver.createInstitutionPortfolio = (obj, args, context, info) => {
  try {
    if (args && args.userId && args.communityType) {
      const user = MlInstitutionPortfolio.findOne({ $and: [{ userId: args.userId }, { communityId: args.communityType }] })
      if (!user) {
        mlDBController.insert('MlInstitutionPortfolio', {
          userId: args.userId,
          communityType: args.communityType,
          portfolioDetailsId: args.portfolioDetailsId
        }, context)
      }
    }
  } catch (e) {
    console.log('Error: In creating Institute portfolio');
  }
}

MlResolver.MlMutationResolver.updateInstitutionPortfolio = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    try {
      const institutionPortfolio = MlInstitutionPortfolio.findOne({ portfolioDetailsId: args.portfoliodetailsId })
      const updateFor = args.portfolio.institutionPortfolio;
      if (institutionPortfolio) {
        for (key in updateFor) {
          if (institutionPortfolio.hasOwnProperty(key)) {
            if (_.isArray(updateFor[key]) && _.isArray(institutionPortfolio[key])) {
              institutionPortfolio[key] = updateArrayofObjects(updateFor[key], institutionPortfolio[key])
            } else if (_.isObject(updateFor[key]) && _.isObject(institutionPortfolio[key])) {
              _.mergeWith(institutionPortfolio[key], updateFor[key], (objValue, srcValue) => {
                if (_.isArray(objValue)) {
                  return objValue.concat(srcValue);
                }
              });
            }
          } else {
            institutionPortfolio[key] = updateFor[key]
          }
        }

        const ret = mlDBController.update('MlInstitutionPortfolio', { portfolioDetailsId: args.portfoliodetailsId }, institutionPortfolio, { $set: true }, context)
        if (ret) {
          const details = MlPortfolioDetails.findOne({ _id: args.portfoliodetailsId })
          MlEmailNotification.onPortfolioUpdate(details);
          MlNotificationController.onPotfolioUpdate(details);
          const institutealert = MlAlertNotification.onPortfolioUpdates()
          const code = 200;
          const response = new MlRespPayload().successPayload(institutealert, code);
          return response;
        }
      } else {
        const code = 400;
        const response = new MlRespPayload().errorPayload('Invalid Portfolio Request', code);
        return response;
      }
    } catch (e) {
      const code = 400;
      const response = new MlRespPayload().errorPayload(e.message, code);
      return response;
    }
  }
}

// MlResolver.MlQueryResolver['fetchInstitutePortfolioManagement'] = (obj, args, context, info) => {
//   if (args.portfoliodetailsId) {
//     let portfolio = MlInstitutionPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
//     if (portfolio && portfolio.hasOwnProperty('management')) {
//       return portfolio['management'];
//     }
//   }
//   return [];
// }

MlResolver.MlQueryResolver.fetchInstitutionPortfolioAboutUs = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    const instituteAboutUsArray = {}
    const portfolio = MlInstitutionPortfolio.findOne({ portfolioDetailsId: args.portfoliodetailsId })
    instituteAboutUsArray.aboutUs = portfolio && portfolio.aboutUs ? portfolio.aboutUs : {};
    instituteAboutUsArray.clients = portfolio && portfolio.clients ? portfolio.clients : [];
    instituteAboutUsArray.serviceProducts = portfolio && portfolio.serviceProducts ? portfolio.serviceProducts : {};
    instituteAboutUsArray.information = portfolio && portfolio.information ? portfolio.information : {};
    instituteAboutUsArray.rating = portfolio && portfolio.rating ? portfolio.rating : {};

    // private keys for service products
    var object = instituteAboutUsArray.serviceProducts;
    var filteredObject = portfolioValidationRepo.omitPrivateDetails(args.portfoliodetailsId, object, context, 'serviceProducts');
    instituteAboutUsArray.serviceProducts = filteredObject;

    // private keys for information
    var object = instituteAboutUsArray.information;
    var filteredObject = portfolioValidationRepo.omitPrivateDetails(args.portfoliodetailsId, object, context, 'information');
    instituteAboutUsArray.information = filteredObject;

    // private keys for aboutUs
    var object = instituteAboutUsArray.aboutUs;
    var filteredObject = portfolioValidationRepo.omitPrivateDetails(args.portfoliodetailsId, object, context, 'aboutUs');
    instituteAboutUsArray.aboutUs = filteredObject;

    // private keys for clients
    var object = instituteAboutUsArray.clients;
    var filteredObject = portfolioValidationRepo.omitPrivateDetails(args.portfoliodetailsId, object, context, 'clients');
    instituteAboutUsArray.clients = filteredObject;

    // private keys for rating
    var object = instituteAboutUsArray.rating;
    var filteredObject = portfolioValidationRepo.omitPrivateDetails(args.portfoliodetailsId, object, context, 'rating');
    instituteAboutUsArray.rating = filteredObject;

    // for view action
    MlResolver.MlMutationResolver.createView(obj, { resourceId: args.portfoliodetailsId, resourceType: 'portfolio' }, context, info);

    if (instituteAboutUsArray) {
      return instituteAboutUsArray
    }
  }

  return {};
}

// MlResolver.MlQueryResolver['fetchInstitutePortfolioAwards'] = (obj, args, context, info) => {
//   if (args.portfoliodetailsId) {
//     let portfolio = MlInstitutionPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
//     if (portfolio && portfolio.hasOwnProperty('awardsRecognition')) {
//       if(portfolio && portfolio['awardsRecognition']){
//         portfolio.awardsRecognition.map(function(awards,index) {
//           if(portfolio.awardsRecognition[index]){
//             let awardData = MlAwards.findOne({"_id" : awards.awardId}) || {};
//             portfolio.awardsRecognition[index].awardName = awardData.awardDisplayName || "";
//           }
//
//         })
//       }
//       return portfolio['awardsRecognition'];
//     }
//   }
//
//   return [];
// }

MlResolver.MlQueryResolver.fetchInstitutionPortfolioData = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    const portfolio = MlInstitutionPortfolio.findOne({ portfolioDetailsId: args.portfoliodetailsId })
    if (portfolio && portfolio.hasOwnProperty('data')) {
      return portfolio.data;
    }
  }
  return {};
}

MlResolver.MlQueryResolver.fetchInstitutionPortfolioCSRReports = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    const portfolio = MlInstitutionPortfolio.findOne({ portfolioDetailsId: args.portfoliodetailsId })
    if (portfolio && portfolio.hasOwnProperty('reports')) {
      return portfolio.reports;
    }
  }
  return {};
}


MlResolver.MlQueryResolver.fetchInstitutePortfolioCharts = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    const instituteChartsArray = {}
    const portfolio = MlInstitutionPortfolio.findOne({ portfolioDetailsId: args.portfoliodetailsId })
    const employeesData = portfolio && portfolio.employmentOfCompanyChart ? portfolio.employmentOfCompanyChart : [];
    const profitRevenu = portfolio && portfolio.profitRevenueLiabilityChart ? portfolio.profitRevenueLiabilityChart : [];
    const reviewData = portfolio && portfolio.reviewOfCompanyChart ? portfolio.reviewOfCompanyChart : [];
    instituteChartsArray.employmentOfCompanyChart = _.sortBy(employeesData, (item) => { if (item && item.eofFromYear) return item.eofFromYear; })
    instituteChartsArray.profitRevenueLiabilityChart = _.sortBy(profitRevenu, (item) => { if (item && item.prlFromYear) return item.prlFromYear; })
    instituteChartsArray.reviewOfCompanyChart = _.sortBy(reviewData, (item) => { if (item && item.rofYear) return item.rofYear; })
    instituteChartsArray.employeeBreakupDepartmentChart = portfolio && portfolio.employeeBreakupDepartmentChart ? portfolio.employeeBreakupDepartmentChart : [];
    if (instituteChartsArray && instituteChartsArray.employeeBreakupDepartmentChart) {
      instituteChartsArray.employeeBreakupDepartmentChart.map((data, index) => {
        if (instituteChartsArray.employeeBreakupDepartmentChart[index]) {
          const entityData = MlDepartments.findOne({ _id: data.ebdDepartment }) || {};
          instituteChartsArray.employeeBreakupDepartmentChart[index].ebdDepartmentName = entityData.displayName || '';
        }
      })
    }
    if (instituteChartsArray) {
      return instituteChartsArray
    }
  }
}


MlResolver.MlQueryResolver.fetchInstitutionDetails = (obj, args, context, info) => {
  if (_.isEmpty(args)) { return; }

  const key = args.key;
  const portfoliodetailsId = args.portfoliodetailsId;
  const institutePortfolio = MlInstitutionPortfolio.findOne({ portfolioDetailsId: portfoliodetailsId })
  if (institutePortfolio && institutePortfolio.hasOwnProperty(key)) {
    const object = institutePortfolio[key];
    const filteredObject = portfolioValidationRepo.omitPrivateDetails(args.portfoliodetailsId, object, context, key);
    institutePortfolio[key] = filteredObject
    return institutePortfolio;
  }
}


MlResolver.MlQueryResolver.fetchInstitutePortfolioCharts = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    const startChartsArray = {}
    const portfolio = MlInstitutionPortfolio.findOne({ portfolioDetailsId: args.portfoliodetailsId })
    startChartsArray.employmentOfCompanyChart = portfolio && portfolio.employmentOfCompanyChart ? portfolio.employmentOfCompanyChart : [];
    startChartsArray.profitRevenueLiabilityChart = portfolio && portfolio.profitRevenueLiabilityChart ? portfolio.profitRevenueLiabilityChart : [];
    startChartsArray.reviewOfCompanyChart = portfolio && portfolio.reviewOfCompanyChart ? portfolio.reviewOfCompanyChart : [];
    startChartsArray.employeeBreakupDepartmentChart = portfolio && portfolio.employeeBreakupDepartmentChart ? portfolio.employeeBreakupDepartmentChart : [];
    if (startChartsArray && startChartsArray.employeeBreakupDepartmentChart) {
      startChartsArray.employeeBreakupDepartmentChart.map((data, index) => {
        if (startChartsArray.employeeBreakupDepartmentChart[index]) {
          const entityData = MlDepartments.findOne({ _id: data.ebdDepartment }) || {};
          startChartsArray.employeeBreakupDepartmentChart[index].ebdDepartmentName = entityData.displayName || '';
        }
      })
    }
    if (startChartsArray) {
      return startChartsArray
    }
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
