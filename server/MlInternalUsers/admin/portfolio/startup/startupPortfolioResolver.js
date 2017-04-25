import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'

var extendify = require('extendify');
var _ = require('lodash')

let applyDiff   = require('deep-diff').applyDiff,
  observableDiff  = require('deep-diff').observableDiff

MlResolver.MlMutationResolver['createStartupPortfolio'] = (obj, args, context, info) => {
  try {
    if (args && args.userId && args.communityType) {
      user = MlStartupPortfolio.findOne({"$and": [{'userId': args.userId}, {'communityId': args.communityType}]})
      if (!user) {
        MlStartupPortfolio.insert({
          userId: args.userId,
          communityType: args.communityType,
          portfolioDetailsId: args.portfolioDetailsId
          // portfolioStartupDetails:args.portfolioStartupDetails
        })
      }
    }
  }catch(e) {
    console.log("Error: In creating Startup portfolio");
  }
}
MlResolver.MlMutationResolver['updateStartupPortfolio'] = (obj, args, context, info) =>
{
  if(args.portfoliodetailsId){
    try {
      let startupPortfolio = MlStartupPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
      let updateFor = args.portfolio.startupPortfolio;
      if (startupPortfolio) {
        for (key in updateFor) {
          if (startupPortfolio.hasOwnProperty(key))
          {
            if(_.isArray(startupPortfolio[key]) && _.isArray(updateFor[key])){
              if(startupPortfolio[key].length != updateFor[key].length){
                var diff = (updateFor[key].length)-(startupPortfolio[key].length);
                for (i = diff; i > 0; i--){
                  let idx = updateFor[key].length-i;
                  let newObj = updateFor[key][idx];
                  startupPortfolio[key].push(newObj)
                }
                  // let newObj = _.last(updateFor[key])
                  // startupPortfolio[key].push(newObj)
              }else if(startupPortfolio[key].length == updateFor[key].length){
                _.mergeWith(startupPortfolio[key], updateFor[key])
              }
              if(args.indexArray && args.indexArray.length>0){
                _.each(args.indexArray, function (index) {
                  _.mergeWith(startupPortfolio[key][index], updateFor[key][index], function (objValue, srcValue) {
                    if (_.isArray(objValue)) {
                      return objValue.concat(srcValue);
                    }
                  })
                })
              }
            }else if(_.isArray(startupPortfolio[key]) && _.isObject(updateFor[key])){
              if(args.indexArray && args.indexArray.length>0){
                _.each(args.indexArray, function (index) {
                  _.extend(startupPortfolio[key][index], updateFor[key])
                })
              }else{
                startupPortfolio[key].push(updateFor[key])
              }
            }else{
              _.mergeWith(startupPortfolio[key], updateFor[key], function (objValue, srcValue) {
                if (_.isArray(objValue)) {
                  return objValue.concat(srcValue);
                }
              });
            }

          }else {
            if(_.isObject(updateFor[key])){

              startupPortfolio[key] = [updateFor[key]];
            }else{
              startupPortfolio[key] = updateFor[key];
            }
          }
        }

        let ret = MlStartupPortfolio.update({"portfolioDetailsId": args.portfoliodetailsId}, {$set: startupPortfolio}, {upsert: true})
        if (ret) {
          let code = 200;
          let response = new MlRespPayload().successPayload("Updated Successfully", code);
          return response;
        }
      }
    }
    catch (e){
      let code = 400;
      let response = new MlRespPayload().errorPayload(e.message, code);
      return response;
    }
  }
}


MlResolver.MlQueryResolver['fetchStartupPortfolioManagement'] = (obj, args, context, info) => {
  if(args.portfoliodetailsId){
    let portfolio = MlStartupPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('management')) {
      return portfolio['management'];
    }
  }

  return [];
}

MlResolver.MlQueryResolver['fetchStartupPortfolioAboutUs'] = (obj, args, context, info) => {
  if(args.portfoliodetailsId){
    let startAboutUsArray = {}
    let portfolio = MlStartupPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    startAboutUsArray["aboutUs"]=portfolio.aboutUs;
    startAboutUsArray["clients"]=portfolio.clients;
    startAboutUsArray["serviceProducts"]=portfolio.serviceProducts;
    startAboutUsArray["information"]=portfolio.information;
    startAboutUsArray["branches"]=portfolio.branches;
    startAboutUsArray["technologies"]=portfolio.technologies;
    startAboutUsArray["legalIssue"]=portfolio.legalIssue;

    startAboutUsArray["assets"]=portfolio.assets
    if(startAboutUsArray){
      return startAboutUsArray
    }


  }

  return [];
}

MlResolver.MlQueryResolver['fetchStartupPortfolioInvestor'] = (obj, args, context, info) => {
  if(args.portfoliodetailsId){
    let portfolio = MlStartupPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('investor')) {
      return portfolio['investor'];
    }
  }

  return [];
}
MlResolver.MlQueryResolver['fetchStartupPortfolioLookingFor'] = (obj, args, context, info) => {
  if(args.portfoliodetailsId){
    let portfolio = MlStartupPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('lookingFor')) {
      return portfolio['lookingFor'];
    }
  }

  return [];
}

MlResolver.MlQueryResolver['fetchStartupPortfolioAwards'] = (obj, args, context, info) => {
  if(args.portfoliodetailsId){
    let portfolio = MlStartupPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('awardsRecognition')) {
      return portfolio['awardsRecognition'];
    }
  }

  return [];
}
