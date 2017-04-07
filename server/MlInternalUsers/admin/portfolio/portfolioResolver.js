/**
 * Created by venkatasrinag on 6/4/17.
 */
import MlResolver from '../mlAdminResolverDef'
import MlRespPayload from '../../../commons/mlPayload'


MlResolver.MlQueryResolver['fetchPortfolioDetails'] = (obj, args, context, info) => {
}


MlResolver.MlMutationResolver['createPortfolioRequest'] = (obj, args, context, info) => {
  let user;
  let portfolioDetails = args.portfoliodetails
  let ret;
  try {
      if (portfolioDetails && portfolioDetails.userId && portfolioDetails.communityType) {
          user = MlPortfolioDetails.findOne({"$and": [{'userId': portfolioDetails.userId}, {'communityType': portfolioDetails.communityType}]})
          if (!user) {
              ret = MlPortfolioDetails.insert({...portfolioDetails})
              if(ret){
                  switch (portfolioDetails.communityType){
                    case "ideators":{
                        let portfolio = {userId:portfolioDetails.userId, communityType:portfolioDetails.communityType, portfolioDetailsId:ret}
                        MlResolver.MlMutationResolver['createIdeatorPortfolio'](obj, portfolio, context, info)
                    }
                      break;

                    case "startup":
                      break;
                  }
              }

          }
          else{
              ret = user._id;
          }
      }
  }
  catch (e){
    let code = 409;
    let response = new MlRespPayload().errorPayload(e.message, code);
    return response;
  }

  let code = 200;
  let response = new MlRespPayload().successPayload(ret, code);
  return response;
}
