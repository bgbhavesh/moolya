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
            _.mergeWith(startupPortfolio[key], updateFor[key], function (objValue, srcValue) {
              if (_.isArray(objValue)) {
                return objValue.concat(srcValue);
              }
            });
          }
          else {
            startupPortfolio[key] = updateFor[key];
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

  return {};
}
