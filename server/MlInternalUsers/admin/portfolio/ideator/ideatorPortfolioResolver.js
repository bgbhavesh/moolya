/**
 * Created by venkatasrinag on 3/4/17.
 */
import MlResolver from '../../mlAdminResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'

MlResolver.MlMutationResolver['createIdeatorPortfolio'] = (obj, args, context, info) => {

}

MlResolver.MlMutationResolver['createIdeatorPortfolioRequest'] = (obj, args, context, info) => {
    let user;
    try {
        if (args && args.userId && args.communityId) {
            user = MlIdeatorPortfolio.findOne({"$and": [{'userId': args.userId}, {'communityId': args.communityId}]})
            if (!user) {
                MlIdeatorPortfolio.insert({
                    userId: args.userId,
                    communityId: args.communityId,
                    portfolioDetails: args.portfolioDetails
                })
            }
        }
    }
    catch (e){
        let code = 409;
        let response = new MlRespPayload().errorPayload("Already Exist", code);
        return response;
    }

    let code = 200;
    let response = new MlRespPayload().successPayload(user, code);
    return response;
}

MlResolver.MlMutationResolver['updateIdeatorPortfolio'] = (obj, args, context, info) => {

}

MlResolver.MlMutationResolver['createAnnotation'] = (obj, args, context, info) => {

}

MlResolver.MlMutationResolver['updateAnnotation'] = (obj, args, context, info) => {

}

MlResolver.MlMutationResolver['createComment'] = (obj, args, context, info) => {

}


MlResolver.MlQueryResolver['fetchAnnotations'] = (obj, args, context, info) => {

}

MlResolver.MlQueryResolver['fetchComments'] = (obj, args, context, info) => {

}

MlResolver.MlQueryResolver['fetchIdeatorPortfolio'] = (obj, args, context, info) => {

}

MlResolver.MlQueryResolver['fetchIdeatorPortfolioRequests'] = (obj, args, context, info) => {

}

MlResolver.MlQueryResolver['fetchPortfolioMenu'] = (obj, args, context, info) => {
    return MlPortfolioMenu.findOne({"$and":[{communityType:args.communityType}, {templateName:args.templateName}]});
}
