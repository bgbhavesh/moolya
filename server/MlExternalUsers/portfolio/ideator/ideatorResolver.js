import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import MlUserContext from '../../../MlExternalUsers/mlUserContext'
const extendify = require('extendify');
const _ = require('lodash')

MlResolver.MlQueryResolver.fetchIdeators = (obj, args, context, info) => {
  let allIds = [];
  const ideator = [];

  const allIdeas = MlIdeas.find({ isActive: true }).fetch();
  allIds = _.map(allIdeas, 'userId');
  allIds = _.uniq(allIds);

  _.each(allIds, (userId) => {
    const portfolios = MlPortfolioDetails.find({ userId, status: 'PORT_LIVE_NOW' }).fetch(); // checking portfolio is gone live or not
    const ideasArr = [];
    if (!_.isEmpty(portfolios)) { // checking portfolio is there or not
      _.each(portfolios, (portfolio) => {
        // let ideas = MlIdeas.find({userId:userId}).fetch();
        ideas = MlIdeas.findOne({ portfolioId: portfolio._id }) || {};
        ideasArr.push(ideas);
      })
      const user = Meteor.users.findOne({ _id: userId });
      const ideaObj = {
        userId,
        ideas: ideasArr,
        chapterName: portfolios[0].chapterName,
        name: `${user.profile.firstName} ${user.profile.lastName}`,
        accountType: portfolios[0].accountType
      }
      ideator.push(ideaObj)
    }
  })

  return ideator;
}

MlResolver.MlQueryResolver.fetchIdeaByPortfolioId = (obj, args, context, info) => {
  if (args.portfolioId) {
    const idea = MlIdeas.findOne({ portfolioId: args.portfolioId })
    return idea;
  }
  return {};
}
