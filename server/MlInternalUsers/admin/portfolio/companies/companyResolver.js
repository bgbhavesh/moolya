import MlResolver from "../../../../commons/mlResolverDef";
import MlRespPayload from "../../../../commons/mlPayload";
import portfolioValidationRepo from '../portfolioValidation'
import MlEmailNotification from "../../../../mlNotifications/mlEmailNotifications/mlEMailNotification";
import MlAlertNotification from '../../../../mlNotifications/mlAlertNotifications/mlAlertNotification'
import MlNotificationController from '../../../../mlNotifications/mlAppNotifications/mlNotificationsController'
import MlMasterSettingRepo from '../../settings/globalAndMasterSettings/repository/mlMasterSettingRepo';
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

MlResolver.MlMutationResolver['updateCompanyPortfolio'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId)
  {
    try {
      let companyPortfolio = MlCompanyPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
      let updateFor = args.portfolio.companyPortfolio;
      if (companyPortfolio){
        for (key in updateFor) {
          if (companyPortfolio.hasOwnProperty(key)){
            if(_.isArray(updateFor[key]) && _.isArray(companyPortfolio[key])){
              companyPortfolio[key] = updateArrayofObjects(updateFor[key], companyPortfolio[key])
            }
            else if(_.isObject(updateFor[key]) && _.isObject(companyPortfolio[key]))
            {
              _.mergeWith(companyPortfolio[key], updateFor[key], function (objValue, srcValue) {
                if (_.isArray(objValue)) {
                  return objValue.concat(srcValue);
                }
              });
            }
          }
          else{
            companyPortfolio[key] = updateFor[key]
          }
        }

        // let ret = MlStartupPortfolio.update({"portfolioDetailsId": args.portfoliodetailsId}, {$set: startupPortfolio})
        let ret = mlDBController.update('MlCompanyPortfolio', {"portfolioDetailsId": args.portfoliodetailsId}, companyPortfolio, {$set: true}, context)
        if (ret) {
          let details = MlPortfolioDetails.findOne({"_id":args.portfoliodetailsId})
          MlEmailNotification.onPortfolioUpdate(details);
          MlNotificationController.onPotfolioUpdate(details);
          let startupalert =  MlAlertNotification.onPortfolioUpdates()
          let code = 200;
          let response = new MlRespPayload().successPayload(startupalert, code);
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

MlResolver.MlQueryResolver['fetchCompanyDetails'] = (obj, args, context, info) => {
  if(_.isEmpty(args))
    return;

  var key = args.key;
  var portfoliodetailsId = args.portfoliodetailsId
  var portfolioObject = MlPortfolioDetails.findOne(portfoliodetailsId) || {};
  let titleValue = new MlMasterSettingRepo().dropDownMasterSettingsPlatformAdmin({type:"TITLE", hierarchyRefId:portfolioObject.clusterId});

  var companyPortfolio = MlCompanyPortfolio.findOne({"portfolioDetailsId": portfoliodetailsId})
  if (companyPortfolio && companyPortfolio.hasOwnProperty(key)) {
    var object = companyPortfolio[key];
    var filteredObject = portfolioValidationRepo.omitPrivateDetails(args.portfoliodetailsId, object, context)
    companyPortfolio[key] = filteredObject
    if (key == 'management') {
      companyPortfolio[key].map(function(data, index)
        {
          // let titleObject = underscore.findWhere(titleValue, {value: data.title});
          let titleObject = _.find(titleValue, {value: data.title});
          data.title = titleObject && titleObject.label;
        }
      )
    }
    return companyPortfolio;
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

MlResolver.MlQueryResolver['fetchCompanyPortfolioData'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlCompanyPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('data')) {
      return portfolio['data'];
    }
  }
  return {};
}



MlResolver.MlQueryResolver['fetchCompanyPortfolioCharts'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let companyChartsArray = {}
    let portfolio = MlCompanyPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    companyChartsArray["employmentOfCompanyChart"] = portfolio&&portfolio.employmentOfCompanyChart?portfolio.employmentOfCompanyChart:[];
    companyChartsArray["profitRevenueLiabilityChart"] = portfolio&&portfolio.profitRevenueLiabilityChart?portfolio.profitRevenueLiabilityChart:[];
    companyChartsArray["reviewOfCompanyChart"] = portfolio&&portfolio.reviewOfCompanyChart?portfolio.reviewOfCompanyChart:[];
    companyChartsArray["employeeBreakupDepartmentChart"] = portfolio&&portfolio.employeeBreakupDepartmentChart?portfolio.employeeBreakupDepartmentChart:[];
    if(companyChartsArray && companyChartsArray.employeeBreakupDepartmentChart){
      companyChartsArray.employeeBreakupDepartmentChart.map(function(data,index) {
        if(companyChartsArray.employeeBreakupDepartmentChart[index]){
          let entityData = MlDepartments.findOne({"_id":data.ebdDepartment}) || {};
          companyChartsArray.employeeBreakupDepartmentChart[index].ebdDepartmentName = entityData.displayName || "";
        }

      })
    }
    if (companyChartsArray) {
      return companyChartsArray
    }
  }
}

MlResolver.MlQueryResolver['fetchCompanyPortfolioAboutUs'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let startAboutUsArray = {}
    let portfolio = MlCompanyPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    startAboutUsArray["aboutUs"] = portfolio&&portfolio.aboutUs?portfolio.aboutUs:{};
    startAboutUsArray["clients"] = portfolio&&portfolio.clients?portfolio.clients:[];
    startAboutUsArray["serviceProducts"] = portfolio&&portfolio.serviceProducts?portfolio.serviceProducts:{};
    startAboutUsArray["information"] = portfolio&&portfolio.information?portfolio.information:{};
    startAboutUsArray["rating"] = portfolio&&portfolio.rating?portfolio.rating:null;

    //private keys for service products
    var object = startAboutUsArray["serviceProducts"];
    var filteredObject = portfolioValidationRepo.omitPrivateDetails(args.portfoliodetailsId, object, context)
    startAboutUsArray["serviceProducts"] = filteredObject

    // if(startAboutUsArray && startAboutUsArray.clients){
    //   startAboutUsArray.clients.map(function(client,index) {
    //     let clientData = MlStageOfCompany.findOne({"_id":client.companyId}) || {};
    //     if(startAboutUsArray.clients[index]){
    //       startAboutUsArray.clients[index].companyName = clientData.stageOfCompanyDisplayName || "";
    //     }
    //   })
    // }
    //for view action
    MlResolver.MlMutationResolver['createView'](obj,{resourceId:args.portfoliodetailsId,resourceType:'portfolio'}, context, info);

    if (startAboutUsArray) {
      return startAboutUsArray
    }

  }

  return {};
}
MlResolver.MlQueryResolver['fetchCompanyPortfolioCSRReports'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlCompanyPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('reports')) {
      return portfolio['reports'];
    }
  }
  return {};
}
