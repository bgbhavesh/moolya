import MlResolver from '../../../commons/mlResolverDef'
import MlRespPayload from '../../../commons/mlPayload'
import MlUserContext from '../../../MlExternalUsers/mlUserContext'
var extendify = require('extendify');
var _ = require('lodash')

MlResolver.MlQueryResolver['fetchIdeators'] = (obj, args, context, info) => {
  var userIds = [];
  var ideator =[];

  var users = Meteor.users.find({"$and": [{'profile.isActive': true}, {'profile.isExternaluser': true}]}).fetch();
    // _.each(users, function (user) {
    //   userIds.push(user._id)
    // })
  userIds = _.map(users, "_id")
  userIds = _.pull(userIds, context.userId)
  var allIdeas = MlIdeas.find({isActive:true, userId:{$in:userIds}}).fetch()
  var ideas = _.uniqBy(allIdeas, 'userId');

  _.each(ideas, function (idea) {
    let user = Meteor.users.findOne({_id:idea.userId})
    chapterName = user.profile.externalUserProfiles[0].chapterName
    name = user.profile.firstName+" "+user.profile.lastName
     ideaObj = {
       userId:idea.userId,
       portfolioId:idea.portfolioId,
       ideaTitle:idea.title,
       chapterName:chapterName,
       name:name
     }
     ideator.push(ideaObj)
  })

  return ideator;
}
