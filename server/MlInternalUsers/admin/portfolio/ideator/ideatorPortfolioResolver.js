/**
 * Created by venkatasrinag on 3/4/17.
 */
import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'

var extendify = require('extendify');
var _ = require('lodash')

let applyDiff   = require('deep-diff').applyDiff,
  observableDiff  = require('deep-diff').observableDiff

MlResolver.MlMutationResolver['createIdeatorPortfolio'] = (obj, args, context, info) => {
      try {
          if (args && args.userId && args.communityType) {
              user = MlIdeatorPortfolio.findOne({"$and": [{'userId': args.userId}, {'communityId': args.communityType}]})
              if (!user) {
                  MlIdeatorPortfolio.insert({
                    userId: args.userId,
                    communityType: args.communityType,
                    portfolioDetailsId: args.portfolioDetailsId
                  })
              }
          }
      }catch(e) {

      }
}

MlResolver.MlMutationResolver['updateIdeatorPortfolio'] = (obj, args, context, info) =>
{
    if(args.portfoliodetailsId){
        try {
            let ideatorPortfolio = MlIdeatorPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
            let updateFor = args.portfolio.ideatorPortfolio;
            if (ideatorPortfolio) {
                for (key in updateFor) {
                    if (ideatorPortfolio.hasOwnProperty(key)) {
                      _.mergeWith(ideatorPortfolio[key], updateFor[key], function (objValue, srcValue) {
                        if (_.isArray(objValue)) {
                          return objValue.concat(srcValue);
                        }
                      });
                    }
                    else {
                      console.log(key)
                      ideatorPortfolio[key] = updateFor[key];
                    }
                }

                let ret = MlIdeatorPortfolio.update({"portfolioDetailsId": args.portfoliodetailsId}, {$set: ideatorPortfolio}, {upsert: true})
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

MlResolver.MlMutationResolver['createAnnotation'] = (obj, args, context, info) => {
    try {
        if(args.portfoliodetailsId && args.docId && args.quote){
          let annotator = {portfolioId:args.portfoliodetailsId, referenceDocId:args.docId, quote:args.quote, isResolved:false, isReopened:false}
          MlAnnotator.insert({...annotator})
        }
        else{
            let code = 400;
            let response = new MlRespPayload().errorPayload("Invalid Portfolio ID", code);
            return response;
        }
    }catch (e){
        let code = 400;
        let response = new MlRespPayload().errorPayload(e.message, code);
        return response;
    }

    let code = 200;
    let response = new MlRespPayload().successPayload("Annotator Created Successfully", code);
    return response;
}

MlResolver.MlMutationResolver['updateAnnotation'] = (obj, args, context, info) => {

}

MlResolver.MlMutationResolver['createComment'] = (obj, args, context, info) => {

}


MlResolver.MlQueryResolver['fetchAnnotations'] = (obj, args, context, info) => {
    let annotators = [];
    try {
        if(args.portfoliodetailsId && args.docId){
            let annotatorObj = MlAnnotator.find({"$and":[{"portfolioId":args.portfoliodetailsId, "referenceDocId":args.docId}]}).fetch()
            if(annotatorObj.length > 0){
                _.each(annotatorObj, function (value) {
                      annotators.push(JSON.parse(value['quote']))
                })
            }
        }
        else{
          let code = 400;
          let response = new MlRespPayload().errorPayload("Invalid Portfolio ID", code);
          return response;
        }
      }catch (e){
        let code = 400;
        let response = new MlRespPayload().errorPayload(e.message, code);
        return response;
    }

    let code = 200;
    let response = new MlRespPayload().successPayload(annotators, code);
    return response;
}

MlResolver.MlQueryResolver['fetchComments'] = (obj, args, context, info) => {

}

MlResolver.MlQueryResolver['fetchIdeatorPortfolioDetails'] = (obj, args, context, info) => {
    if(args.portfoliodetailsId){
        let ideatorPortfolio = MlIdeatorPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
        if (ideatorPortfolio && ideatorPortfolio.hasOwnProperty('portfolioIdeatorDetails')) {
            return ideatorPortfolio['portfolioIdeatorDetails'];
        }
    }

    return {};
}
MlResolver.MlQueryResolver['fetchIdeatorPortfolioIdeas'] = (obj, args, context, info) => {
  if(args.portfoliodetailsId){
    let ideatorPortfolio = MlIdeatorPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (ideatorPortfolio && ideatorPortfolio.hasOwnProperty('ideas')) {
      return ideatorPortfolio['ideas'];
    }
  }

  return {};
}
MlResolver.MlQueryResolver['fetchIdeatorPortfolioProblemsAndSolutions'] = (obj, args, context, info) => {
  if(args.portfoliodetailsId){
    let ideatorPortfolio = MlIdeatorPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (ideatorPortfolio && ideatorPortfolio.hasOwnProperty('problemSolution')) {
      return ideatorPortfolio['problemSolution'];
    }
  }

  return {};
}
MlResolver.MlQueryResolver['fetchIdeatorPortfolioAudience'] = (obj, args, context, info) => {
  if(args.portfoliodetailsId){
    let ideatorPortfolio = MlIdeatorPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (ideatorPortfolio && ideatorPortfolio.hasOwnProperty('audience')) {
      return ideatorPortfolio['audience'];
    }
  }

  return {};
}
MlResolver.MlQueryResolver['fetchIdeatorPortfolioLibrary'] = (obj, args, context, info) => {
  if(args.portfoliodetailsId){
    let ideatorPortfolio = MlIdeatorPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (ideatorPortfolio && ideatorPortfolio.hasOwnProperty('library')) {
      return ideatorPortfolio['library'];
    }
  }

  return {};
}
MlResolver.MlQueryResolver['fetchIdeatorPortfolioStrategyAndPlanning'] = (obj, args, context, info) => {
  if(args.portfoliodetailsId){
    let ideatorPortfolio = MlIdeatorPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (ideatorPortfolio && ideatorPortfolio.hasOwnProperty('strategyAndPlanning')) {
      return ideatorPortfolio['strategyAndPlanning'];
    }
  }

  return {};
}
MlResolver.MlQueryResolver['fetchIdeatorPortfolioLookingFor'] = (obj, args, context, info) => {
  if(args.portfoliodetailsId){
    let ideatorPortfolio = MlIdeatorPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (ideatorPortfolio && ideatorPortfolio.hasOwnProperty('lookingFor')) {
      return ideatorPortfolio['lookingFor'];
    }
  }

  return {};
}

MlResolver.MlQueryResolver['fetchIdeatorPortfolioIntellectualPlanning'] = (obj, args, context, info) => {
  if(args.portfoliodetailsId){
    let ideatorPortfolio = MlIdeatorPortfolio.findOne({"portfolioDetailsId": args.portfoliodetailsId})
    if (ideatorPortfolio && ideatorPortfolio.hasOwnProperty('intellectualPlanning')) {
      return ideatorPortfolio['intellectualPlanning'];
    }
  }

  return {};
}


MlResolver.MlQueryResolver['fetchIdeatorPortfolioRequests'] = (obj, args, context, info) => {

}

MlResolver.MlQueryResolver['fetchPortfolioMenu'] = (obj, args, context, info) => {
    return MlPortfolioMenu.findOne({"$and":[{communityType:args.communityType}, {templateName:args.templateName}]});
}
