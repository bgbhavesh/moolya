/**
 * Created by vishwadeep on 10/7/17.
 */
import MlResolver from "../../../../commons/mlResolverDef";
import MlRespPayload from "../../../../commons/mlPayload";
import _ from "lodash";

MlResolver.MlMutationResolver['createServiceProviderPortfolio'] = (obj, args, context, info) => {
  try {
    if (args && args.userId && args.communityType) {
      user = MlServiceProviderPortfolio.findOne({"$and": [{'userId': args.userId}, {'communityId': args.communityType}]})
      if (!user) {
        mlDBController.insert('MlServiceProviderPortfolio', {
          userId: args.userId,
          communityType: args.communityType,
          portfolioDetailsId: args.portfolioDetailsId
        }, context)
      }
    }
  } catch (e) {
    console.log("Error: In creating service provider portfolio");
  }
}

MlResolver.MlMutationResolver['updateServiceProviderPortfolio'] = (obj, args, context, info) =>
{
  if (args.portfoliodetailsId){
    try {
      let serviceProviderPortfolio = MlServiceProviderPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
      let updateFor = args.portfolio.serviceProviderPortfolio;
      if (serviceProviderPortfolio){
        for (key in updateFor){
          if (serviceProviderPortfolio.hasOwnProperty(key)){
            if(_.isArray(updateFor[key]) && _.isArray(serviceProviderPortfolio[key])){
              serviceProviderPortfolio[key] = updateArrayofObjects(updateFor[key], serviceProviderPortfolio[key])
            }
            else if(_.isObject(updateFor[key]) && _.isObject(serviceProviderPortfolio[key]))
            {
              _.mergeWith(serviceProviderPortfolio[key], updateFor[key], function (objValue, srcValue) {
                if (_.isArray(objValue)) {
                  return objValue.concat(srcValue);
                }
              });
            }
          }
          else{
            serviceProviderPortfolio[key] = updateFor[key]
          }
        }

        let ret = mlDBController.update('MlServiceProviderPortfolio', {"portfolioDetailsId": args.portfoliodetailsId}, serviceProviderPortfolio, {$set: true}, context)
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

MlResolver.MlQueryResolver['fetchServiceProviderPortfolioMemberships'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlServiceProviderPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('memberships')) {
      return portfolio['memberships'];
    }
  }

  return {};
}
MlResolver.MlQueryResolver['fetchServiceProviderPortfolioCompliances'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlServiceProviderPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('compliances')) {
      return portfolio['compliances'];
    }
  }

  return {};
}
MlResolver.MlQueryResolver['fetchServiceProviderPortfolioLicenses'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlServiceProviderPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('licenses')) {
      return portfolio['licenses'];
    }
  }

  return {};
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
