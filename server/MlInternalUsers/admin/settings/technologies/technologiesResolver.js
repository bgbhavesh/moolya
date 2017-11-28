/**
 * Created by venkatsrinag on 21/4/17.
 */
import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver.createTechnology = (obj, args, context, info) => {
  let firstName = ''; let lastName = '';
  // let id = MlDepartments.insert({...args.department});
  if (Meteor.users.findOne({ _id: context.userId })) {
    const user = Meteor.users.findOne({ _id: context.userId }) || {}
    if (user && user.profile && user.profile.isInternaluser && user.profile.InternalUprofile) {
      firstName = (user.profile.InternalUprofile.moolyaProfile || {}).firstName || '';
      lastName = (user.profile.InternalUprofile.moolyaProfile || {}).lastName || '';
    } else if (user && user.profile && user.profile.isExternaluser) { // resolve external user context based on default profile
      firstName = (user.profile || {}).firstName || '';
      lastName = (user.profile || {}).lastName || '';
    }
  }
  const createdBy = `${firstName} ${lastName}`
  args.technologyMasterData.createdBy = createdBy;
  args.technologyMasterData.createdDate = new Date();
  if (args && args.technologyMasterData) {
    try {
      const ret = MlTechnologies.insert({ ...args.technologyMasterData })
      if (ret) {
        const response = new MlRespPayload().successPayload("'Technology' added successfully", 200);
        return response;
      }

      const response = new MlRespPayload().errorPayload('Technology could not be added', 400);
      return response;
    } catch (e) {
      const response = new MlRespPayload().errorPayload(e.message, 400);
      return response;
    }
  }
}

MlResolver.MlMutationResolver.updateSelectedTechnology = (obj, args, context, info) => {
  let firstName = ''; let lastName = '';
  // let id = MlDepartments.insert({...args.department});
  if (Meteor.users.findOne({ _id: context.userId })) {
    const user = Meteor.users.findOne({ _id: context.userId }) || {}
    if (user && user.profile && user.profile.isInternaluser && user.profile.InternalUprofile) {
      firstName = (user.profile.InternalUprofile.moolyaProfile || {}).firstName || '';
      lastName = (user.profile.InternalUprofile.moolyaProfile || {}).lastName || '';
    } else if (user && user.profile && user.profile.isExternaluser) { // resolve external user context based on default profile
      firstName = (user.profile || {}).firstName || '';
      lastName = (user.profile || {}).lastName || '';
    }
  }
  const createdBy = `${firstName} ${lastName}`
  args.technologyMasterData.updatedBy = createdBy;
  args.technologyMasterData.updatedDate = new Date();

  if (args && args.technologyId && args.technologyMasterData) {
    try {
      const resp = MlTechnologies.update({ _id: args.technologyId }, { $set: args.technologyMasterData }, { upsert: true })
      if (resp) {
        const response = new MlRespPayload().successPayload("'Technology' updated successfully", 200);
        return response;
      }

      const response = new MlRespPayload().errorPayload('Technology could not be updated', 400);
      return response;
    } catch (e) {
      const response = new MlRespPayload().errorPayload(e.message, 400);
      return response;
    }
  }
}

MlResolver.MlQueryResolver.findTechnology = (obj, args, context, info) => {
  if (args && args.technologyId) {
    return MlTechnologies.findOne({ _id: args.technologyId })
  }
}


MlResolver.MlQueryResolver.fetchTechnologies = (obj, args, context, info) => MlTechnologies.find({ isActive: true }).fetch()
