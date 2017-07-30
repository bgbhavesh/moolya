/**
 * Created by venkatsrinag on 24/4/17.
 */
import MlResolver from "../../../../commons/mlResolverDef";
import MlRespPayload from "../../../../commons/mlPayload";
import portfolioValidationRepo from '../portfolioValidation'
import MlEmailNotification from "../../../../mlNotifications/mlEmailNotifications/mlEMailNotification";
var _ = require('lodash')


MlResolver.MlMutationResolver['createFunderPortfolio'] = (obj, args, context, info) => {
    try {
        if (args && args.userId && args.communityType)
        {
            user = MlFunderPortfolio.findOne({"$and": [{'userId': args.userId}, {'communityId': args.communityType}]})
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
        console.log("Error: In creating Funder portfolio");
    }
}

MlResolver.MlMutationResolver['updateFunderPortfolio'] = (obj, args, context, info) =>
{
    if (args.portfoliodetailsId){
        try {
            let funderPortfolio = MlFunderPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
            let updateFor = args.portfolio.funderPortfolio;
            if (funderPortfolio){
                for (key in updateFor){
                    if (funderPortfolio.hasOwnProperty(key)){
                        if(_.isArray(updateFor[key]) && _.isArray(funderPortfolio[key])){
                          funderPortfolio[key] = updateArrayofObjects(updateFor[key], funderPortfolio[key])
                        }
                        else if(_.isObject(updateFor[key]) && _.isObject(funderPortfolio[key]))
                        {
                            _.mergeWith(funderPortfolio[key], updateFor[key], function (objValue, srcValue) {
                                if (_.isArray(objValue)) {
                                    return objValue.concat(srcValue);
                                }
                            });
                        }
                    }
                    else{
                        funderPortfolio[key] = updateFor[key]
                    }
                }

                // let ret = MlFunderPortfolio.update({"portfolioDetailsId": args.portfoliodetailsId}, {$set: funderPortfolio})
              let ret = mlDBController.update('MlFunderPortfolio', {"portfolioDetailsId": args.portfoliodetailsId}, funderPortfolio, {$set: true}, context)
                if (ret) {
                  let details = MlPortfolioDetails.findOne({"_id":args.portfoliodetailsId})
                  MlEmailNotification.onPortfolioUpdate(details);
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

MlResolver.MlQueryResolver['fetchFunderAbout'] = (obj, args, context, info) => {

  if (args.portfoliodetailsId) {
    let portfolio = MlFunderPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('funderAbout')) {
      let details = portfolio.funderAbout
      let extendData = MlProfessions.findOne({_id: details.profession, industryId: details.industry})|| {};
      details.industry = extendData.industryName || details.industry;
      details.profession = extendData.professionName || details.profession;
      /*let userPersonal = MlMasterSettings.findOne({_id:details.gender}) || {}
      details.gender = userPersonal.genderInfo ? userPersonal.genderInfo.genderName : ''*/
      let userEmp = MlMasterSettings.findOne({_id:details.employmentStatus}) || {}
      details.employmentStatus = userEmp.employmentTypeInfo ? userEmp.employmentTypeInfo.employmentName : details.employmentStatus;

      var object = portfolioValidationRepo.omitPrivateDetails(args.portfoliodetailsId, details, context)

      //for view action
      MlResolver.MlMutationResolver['createView'](obj,{resourceId:args.portfoliodetailsId,resourceType:'portfolio'}, context, info);

      return object;
    }
  }

  return {};
}

MlResolver.MlQueryResolver['fetchfunderPortfolioInvestor'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlFunderPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('investments')) {
      if(portfolio && portfolio['investments']){
        portfolio.investments.map(function(investment,index) {
          if(portfolio.investments[index]){
            let investmentData = MlFundingTypes.findOne({"_id" : investment.typeOfFundingId}) || {};
            portfolio.investments[index].typeOfFundingName = investmentData.displayName || "";
          }

        })
      }
      return portfolio['investments'];
    }
  }

  return [];
}

MlResolver.MlQueryResolver['fetchfunderPortfolioService'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlFunderPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
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
      return portfolio['services'];
    }
  }

  return [];
}

MlResolver.MlQueryResolver['fetchFunderPrincipal'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlFunderPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('principal')) {
      return portfolio['principal'];
    }
  }

  return [];
}

MlResolver.MlQueryResolver['fetchFunderTeam'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlFunderPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('team')) {
      return portfolio['team'];
    }
  }

  return [];
}

MlResolver.MlQueryResolver['fetchFunderAreaOfInterest'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlFunderPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('areaOfInterest')){
      if(portfolio && portfolio['areaOfInterest']){
        portfolio.areaOfInterest.map(function(areaOfInterest,index) {
          if(portfolio.areaOfInterest[index]){
            let areaOfInterestData = MlIndustries.findOne({"_id" : areaOfInterest.industryTypeId}) || {};
            portfolio.areaOfInterest[index].industryTypeName = areaOfInterestData.industryName || "";
            let areaOfInterestDomain = MlSubDomain.findOne({_id : areaOfInterest.subDomainId}) || {};
            portfolio.areaOfInterest[index].subDomainName = areaOfInterestDomain.name || "";
          }

        })
      }
      return portfolio['areaOfInterest'];
    }
  }

  return [];
}

MlResolver.MlQueryResolver['fetchFunderSuccessStories'] = (obj, args, context, info) => {
  if (args.portfoliodetailsId) {
    let portfolio = MlFunderPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (portfolio && portfolio.hasOwnProperty('successStories')){
      return portfolio['successStories'];
    }
  }

  return [];
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

/**
 * moving it from here to portfolioResolver
 * */
// MlResolver.MlQueryResolver['fetchPortfolioClusterId'] = (obj, args, context, info) => {
//   if (args.portfoliodetailsId) {
//     let portfolio = MlPortfolioDetails.findOne({"_id": args.portfoliodetailsId})
//     if (portfolio.clusterId) {
//       return portfolio;
//     }
//   }
//   return {};
// }

MlResolver.MlQueryResolver['fetchFunderDetails'] = (obj, args, context, info) => {
  if(_.isEmpty(args))
    return;

  var key = args.key;
  var portfoliodetailsId = args.portfoliodetailsId
  var funderPortfolio = MlFunderPortfolio.findOne({"portfolioDetailsId": portfoliodetailsId})
  if (funderPortfolio && funderPortfolio.hasOwnProperty(key)) {
    var object = funderPortfolio[key];
    var filteredObject = portfolioValidationRepo.omitPrivateDetails(args.portfoliodetailsId, object, context)
    funderPortfolio[key] = filteredObject
    return funderPortfolio;
  }

}
