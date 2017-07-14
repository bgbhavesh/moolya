import MlResolver from "../../../../commons/mlResolverDef";
import MlRespPayload from "../../../../commons/mlPayload";

var extendify = require('extendify');
var _ = require('lodash')

MlResolver.MlMutationResolver['createStartupPortfolio'] = (obj, args, context, info) => {
  try {
    if (args && args.userId && args.communityType) {
      user = MlStartupPortfolio.findOne({"$and": [{'userId': args.userId}, {'communityId': args.communityType}]})
      if (!user) {
        mlDBController.insert('MlStartupPortfolio', {
          userId: args.userId,
          communityType: args.communityType,
          portfolioDetailsId: args.portfolioDetailsId
        }, context)
        // MlStartupPortfolio.insert({
        //   userId: args.userId,
        //   communityType: args.communityType,
        //   portfolioDetailsId: args.portfolioDetailsId
        // })
      }
    }
  } catch (e) {
    console.log("Error: In creating Startup portfolio");
  }
}
MlResolver.MlMutationResolver['updateStartupPortfolio'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId)
  {
      try {
          let startupPortfolio = MlStartupPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
          let updateFor = args.portfolio.startupPortfolio;
          if (startupPortfolio){
              for (key in updateFor) {
                  if (startupPortfolio.hasOwnProperty(key)){
                      if(_.isArray(updateFor[key]) && _.isArray(startupPortfolio[key])){
                          startupPortfolio[key] = updateArrayofObjects(updateFor[key], startupPortfolio[key])
                      }
                      else if(_.isObject(updateFor[key]) && _.isObject(startupPortfolio[key]))
                      {
                          _.mergeWith(startupPortfolio[key], updateFor[key], function (objValue, srcValue) {
                              if (_.isArray(objValue)) {
                                  return objValue.concat(srcValue);
                              }
                          });
                      }
                  }
                  else{
                      startupPortfolio[key] = updateFor[key]
                  }
              }

              // let ret = MlStartupPortfolio.update({"portfolioDetailsId": args.portfoliodetailsId}, {$set: startupPortfolio})
            let ret = mlDBController.update('MlStartupPortfolio', {"portfolioDetailsId": args.portfoliodetailsId}, startupPortfolio, {$set: true}, context)
            if (ret) {
                let code = 200;
                let response = new MlRespPayload().successPayload("Updated Successfully", code);
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


MlResolver.MlQueryResolver['fetchStartupPortfolioManagement'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlStartupPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('management')) {
      return portfolio['management'];
    }
  }

  return [];
}

MlResolver.MlQueryResolver['fetchStartupPortfolioAboutUs'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let startAboutUsArray = {}
    let portfolio = MlStartupPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    startAboutUsArray["aboutUs"] = portfolio.aboutUs;
    startAboutUsArray["clients"] = portfolio.clients;
    startAboutUsArray["serviceProducts"] = portfolio.serviceProducts;
    startAboutUsArray["information"] = portfolio.information;
    startAboutUsArray["branches"] = portfolio.branches;
    startAboutUsArray["technologies"] = portfolio.technologies;
    startAboutUsArray["legalIssue"] = portfolio.legalIssue;
    startAboutUsArray["rating"] = portfolio.rating;
    startAboutUsArray["assets"] = portfolio.assets;

    // if(startAboutUsArray && startAboutUsArray.clients){
    //   startAboutUsArray.clients.map(function(client,index) {
    //     let clientData = MlStageOfCompany.findOne({"_id":client.companyId}) || {};
    //     if(startAboutUsArray.clients[index]){
    //       startAboutUsArray.clients[index].companyName = clientData.stageOfCompanyDisplayName || "";
    //     }
    //   })
    // }
    if(startAboutUsArray && startAboutUsArray.assets){
      startAboutUsArray.assets.map(function(asset,index) {
        if(startAboutUsArray.assets[index]){
          let assetData = MlAssets.findOne({"_id":asset.assetTypeId}) || "";
          startAboutUsArray.assets[index].assetTypeName = assetData.displayName || "";
        }

      })
    }
    if(startAboutUsArray && startAboutUsArray.technologies){
      startAboutUsArray.technologies.map(function(technology,index) {
        if(startAboutUsArray.technologies[index]){
          let technologyData = MlTechnologies.findOne({"_id":technology.technologyId}) || "";
          startAboutUsArray.technologies[index].technologyName = technologyData.displayName || "";
        }

      })
    }

    //for view action
    MlResolver.MlMutationResolver['createView'](obj,{resourceId:args.portfoliodetailsId,resourceType:'portfolio'}, context, info);

    if (startAboutUsArray) {
      return startAboutUsArray
    }

  }

  return {};
}

MlResolver.MlQueryResolver['fetchStartupPortfolioInvestor'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlStartupPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('investor')) {
      return portfolio['investor'];
    }
  }

  return [];
}
MlResolver.MlQueryResolver['fetchStartupPortfolioLookingFor'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlStartupPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('lookingFor')) {
      if(portfolio && portfolio['lookingFor']){
        portfolio.lookingFor.map(function(lookingFor,index) {
          if(portfolio.lookingFor[index]){
            let lookingForData = MlLookingFor.findOne({"_id" : lookingFor.typeId}) || {};
            portfolio.lookingFor[index].lookingForName = lookingForData.lookingForDisplayName || "";
          }

        })
      }
      return portfolio['lookingFor'];
    }
  }

  return [];
}

MlResolver.MlQueryResolver['fetchStartupPortfolioAwards'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlStartupPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
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
MlResolver.MlQueryResolver['fetchStartupPortfolioMemberships'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlStartupPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('memberships')) {
      return portfolio['memberships'];
    }
  }

  return {};
}
MlResolver.MlQueryResolver['fetchStartupPortfolioCompliances'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlStartupPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('compliances')) {
      return portfolio['compliances'];
    }
  }

  return {};
}
MlResolver.MlQueryResolver['fetchStartupPortfolioLicenses'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlStartupPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('licenses')) {
      return portfolio['licenses'];
    }
  }

  return {};
}

MlResolver.MlQueryResolver['fetchStartupPortfolioCharts'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let startChartsArray = {}
    let portfolio = MlStartupPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    startChartsArray["employmentOfCompany"] = portfolio&&portfolio.charts&&portfolio.charts.employmentOfCompany?portfolio.charts.employmentOfCompany:[];
    startChartsArray["profitRevenueLiability"] = portfolio&&portfolio.charts&&portfolio.charts.profitRevenueLiability?portfolio.charts.profitRevenueLiability:[];
    startChartsArray["reviewOfCompany"] = portfolio&&portfolio.charts&&portfolio.charts.reviewOfCompany?portfolio.charts.reviewOfCompany:[];
    startChartsArray["employeeBreakupDepartment"] = portfolio&&portfolio.charts&&portfolio.charts.employeeBreakupDepartment?portfolio.charts.employeeBreakupDepartment:[];
    if (startChartsArray) {
      return startChartsArray
    }
  }
 /* var portfolioDetails = mlDBController.findOne('MlPortfolioDetails', {_id: args.portfolioDetailsId}, context)
  if (portfolioDetails) {
    args.userId = portfolioDetails.userId;
    var query = {
      userId: args.userId,
    }
    var startupChartDetails = mlDBController.findOne('MlStartupPortfolio', query, context);
    return startupChartDetails.charts;
  }*/
}

MlResolver.MlQueryResolver['fetchStartupPortfolioChart'] = (obj, args, context, info) => {
  var portfolioDetails = mlDBController.findOne('MlPortfolioDetails', {_id: args.portfolioDetailsId}, context)
  if (portfolioDetails) {
    args.userId = portfolioDetails.userId;
    var query = {
      userId: args.userId,
    }
    var startupChartDetails = mlDBController.findOne('MlStartupPortfolio', query, context);
    let startUpChart = []
    startupChartDetails.charts.map(function(data){
      data.args.chartType.map(function(chart){
        startUpChart = chart
      })
    })
    return startUpChart;
  }
}

MlResolver.MlMutationResolver['createStartupPortfolioChart'] = (obj, args, context, info) => {
  var query = {
    _id: args.startUpPortfolioId,
  }
  var startupChartDetails = mlDBController.findOne('MlStartupPortfolio', query, context);
  if(startupChartDetails.charts){
    var startupChartDetailsUpdate = mlDBController.update('MlStartupPortfolio',query,{'charts':args.chartDetails},{$set:1}, context);
    return startupChartDetailsUpdate;
  }else {
    var startupChartDetailsInsert = mlDBController.insert('MlStartupPortfolio', query,{'charts':args.chartDetails}, context);
    return startupChartDetailsInsert;
  }
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
