import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import MlUserContext from '../../../MlExternalUsers/mlUserContext'
var extendify = require('extendify');
var _ = require('lodash')

MlResolver.MlQueryResolver['fetchIdeators'] = (obj, args, context, info) => {
  var allIds = [];
  var ideator =[];

  var allIdeas = MlIdeas.find({isActive:true}).fetch();
  allIds = _.map(allIdeas, "userId");
  allIds = _.uniq(allIds);

  _.each(allIds, function (userId) {
    let portfolio = MlPortfolioDetails.find({userId:userId, status: 'gone live'}).fetch();    //checking portfolio is gone live or not
    if(!_.isEmpty(portfolio)){                                                                // checking portfolio is there or not
      let user = Meteor.users.findOne({_id:userId});
      let ideas = MlIdeas.find({userId:userId}).fetch();
      let chapterName = portfolio[0].chapterName;
      let accountType = portfolio[0].accountType;
      let name = user.profile.firstName+" "+user.profile.lastName;
      let ideaObj = {
        userId:userId,
        ideas:ideas,
        chapterName:chapterName,
        name:name,
        accountType:accountType
      }
      ideator.push(ideaObj)
    }
  })

  return ideator;
}

MlResolver.MlQueryResolver['fetchIdeaByPortfolioId'] = (obj, args, context, info) => {
  if(args.portfolioId){
    let idea = MlIdeas.findOne({portfolioId:args.portfolioId});
    return idea;
  }
  return {};
}
