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
  // allIds = _.pull(allIds, context.userId);

  _.each(allIds, function (userId) {
    let user = Meteor.users.findOne({_id:userId})
    let ideas = MlIdeas.find({userId:userId}).fetch();
    chapterName = user.profile.externalUserProfiles[0].chapterName
    name = user.profile.firstName+" "+user.profile.lastName
     ideaObj = {
       userId:userId,
       ideas:ideas,
       chapterName:chapterName,
       name:name
     }
     ideator.push(ideaObj)
  })

  return ideator;
}
