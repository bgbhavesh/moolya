import MlResolver from "../../../../commons/mlResolverDef";
import MlRespPayload from "../../../../commons/mlPayload";
import MlEmailNotification from "../../../../mlNotifications/mlEmailNotifications/mlEMailNotification";
import MlAlertNotification from '../../../../mlNotifications/mlAlertNotifications/mlAlertNotification';
import portfolioValidationRepo from '../portfolioValidation';
var _ = require('lodash')

MlResolver.MlMutationResolver['createInstitutionPortfolio'] = (obj, args, context, info) => {
  try {
    if (args && args.userId && args.communityType) {
      var user = MlInstitutionPortfolio.findOne({"$and": [{'userId': args.userId}, {'communityId': args.communityType}]})
      if (!user) {
        mlDBController.insert('MlInstitutionPortfolio', {
          userId: args.userId,
          communityType: args.communityType,
          portfolioDetailsId: args.portfolioDetailsId
        }, context)
      }
    }
  } catch (e) {
    console.log("Error: In creating Institute portfolio");
  }
}

MlResolver.MlMutationResolver['updateInstitutionPortfolio'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId)
  {
    try {
      let institutionPortfolio = MlInstitutionPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
      let updateFor = args.portfolio.institutionPortfolio;
      if (institutionPortfolio){
        for (key in updateFor) {
          if (institutionPortfolio.hasOwnProperty(key)){
            if(_.isArray(updateFor[key]) && _.isArray(institutionPortfolio[key])){
              institutionPortfolio[key] = updateArrayofObjects(updateFor[key], institutionPortfolio[key])
            }
            else if(_.isObject(updateFor[key]) && _.isObject(institutionPortfolio[key]))
            {
              _.mergeWith(institutionPortfolio[key], updateFor[key], function (objValue, srcValue) {
                if (_.isArray(objValue)) {
                  return objValue.concat(srcValue);
                }
              });
            }
          }
          else{
            institutionPortfolio[key] = updateFor[key]
          }
        }

        let ret = mlDBController.update('MlInstitutionPortfolio', {"portfolioDetailsId": args.portfoliodetailsId}, institutionPortfolio, {$set: true}, context)
        if (ret) {
          let details = MlPortfolioDetails.findOne({"_id":args.portfoliodetailsId})
          MlEmailNotification.onPortfolioUpdate(details);
          let institutealert =  MlAlertNotification.onPortfolioUpdates()
          let code = 200;
          let response = new MlRespPayload().successPayload(institutealert, code);
          return response;
        }
      }
      else{
        let code = 400;
        let response = new MlRespPayload().errorPayload("Invalid Portfolio Request", code);
        return response;
      }
    }
    catch (e) {
      let code = 400;
      let response = new MlRespPayload().errorPayload(e.message, code);
      return response;
    }
  }
}

MlResolver.MlQueryResolver['fetchInstitutePortfolioManagement'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlInstitutionPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('management')) {
      return portfolio['management'];
    }
  }
  return [];
}

MlResolver.MlQueryResolver['fetchInstitutePortfolioAboutUs'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let instituteAboutUsArray = {}
    let portfolio = MlInstitutionPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    instituteAboutUsArray["aboutUs"] = portfolio&&portfolio.aboutUs?portfolio.aboutUs:{};
    instituteAboutUsArray["clients"] = portfolio&&portfolio.clients?portfolio.clients:[];
    instituteAboutUsArray["serviceProducts"] = portfolio&&portfolio.serviceProducts?portfolio.serviceProducts:{};
    instituteAboutUsArray["information"] = portfolio&&portfolio.information?portfolio.information:{};
    instituteAboutUsArray["rating"] = portfolio&&portfolio.rating?portfolio.rating:null;


    //for view action
    MlResolver.MlMutationResolver['createView'](obj,{resourceId:args.portfoliodetailsId,resourceType:'portfolio'}, context, info);

    if (instituteAboutUsArray) {
      return instituteAboutUsArray
    }

  }

  return {};
}

MlResolver.MlQueryResolver['fetchInstitutePortfolioAwards'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlInstitutionPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('awardsRecognition')) {
      if(portfolio && portfolio['awardsRecognition']){
        portfolio.awardsRecognition.map(function(awards,index) {
          if(portfolio.awardsRecognition[index]){
            let awardData = MlAwards.findOne({"_id" : awards.awardId}) || {};
            portfolio.awardsRecognition[index].awardName = awardData.awardDisplayName || "";
          }

        })
      }
      return portfolio['awardsRecognition'];
    }
  }

  return [];
}

MlResolver.MlQueryResolver['fetchInstitutePortfolioData'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlInstitutionPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('data')) {
      return portfolio['data'];
    }
  }
  return {};
}

MlResolver.MlQueryResolver['fetchInstitutePortfolioCharts'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let instituteChartsArray = {}
    let portfolio = MlInstitutionPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    instituteChartsArray["employmentOfCompanyChart"] = portfolio&&portfolio.employmentOfCompanyChart?portfolio.employmentOfCompanyChart:[];
    instituteChartsArray["profitRevenueLiabilityChart"] = portfolio&&portfolio.profitRevenueLiabilityChart?portfolio.profitRevenueLiabilityChart:[];
    instituteChartsArray["reviewOfCompanyChart"] = portfolio&&portfolio.reviewOfCompanyChart?portfolio.reviewOfCompanyChart:[];
    instituteChartsArray["employeeBreakupDepartmentChart"] = portfolio&&portfolio.employeeBreakupDepartmentChart?portfolio.employeeBreakupDepartmentChart:[];
    if(instituteChartsArray && instituteChartsArray.employeeBreakupDepartmentChart){
      instituteChartsArray.employeeBreakupDepartmentChart.map(function(data,index) {
        if(instituteChartsArray.employeeBreakupDepartmentChart[index]){
          let entityData = MlDepartments.findOne({"_id":data.ebdDepartment}) || {};
          instituteChartsArray.employeeBreakupDepartmentChart[index].ebdDepartmentName = entityData.displayName || "";
        }

      })
    }
    if (instituteChartsArray) {
      return instituteChartsArray
    }
  }
}


MlResolver.MlQueryResolver['fetchInstitutionDetails'] = (obj, args, context, info) => {
  if(_.isEmpty(args))
    return;

  var key = args.key;
  var portfoliodetailsId = args.portfoliodetailsId
  var institutePortfolio = MlInstitutionPortfolio.findOne({"portfolioDetailsId": portfoliodetailsId})
  if (institutePortfolio && institutePortfolio.hasOwnProperty(key)) {
    var object = institutePortfolio[key];
    var filteredObject = portfolioValidationRepo.omitPrivateDetails(args.portfoliodetailsId, object, context)
    institutePortfolio[key] = filteredObject
    return institutePortfolio;
  }
  return;
}

updateArrayofObjects = (updateFor, source) =>{
  if(_.isArray(updateFor) && _.isArray(source)){
    _.each(updateFor, function (obj) {
      let isObj = _.find(source, {index:obj.index})
      let itemIndex = _.findIndex(source, {index:obj.index})
      if(isObj &&  itemIndex >= 0){
        _.mergeWith(source[itemIndex], obj)
      }
      else{
        source.push(obj)
      }
    })
  }
  return source;
}
