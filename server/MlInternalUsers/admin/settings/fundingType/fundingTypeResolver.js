/**
 * Created by rajatshekhar on 27/4/17.
 */
import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver.createFundingType = (obj, args, context, info) => {
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
  args.fundingType.createdBy = createdBy;
  args.fundingType.createdDate = new Date();
  if (args && args.fundingType) {
    try {
      const ret = MlFundingTypes.insert({ ...args.fundingType })
      if (ret) {
        const response = new MlRespPayload().successPayload("'Funding Type' added successfully", 200);
        return response;
      }

      const response = new MlRespPayload().errorPayload('Funding Type could not be added', 400);
      return response;
    } catch (e) {
      const response = new MlRespPayload().errorPayload(e.message, 400);
      return response;
    }
  }
}

MlResolver.MlMutationResolver.updateFundingType = (obj, args, context, info) => {
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
  args.fundingType.updatedBy = createdBy;
  args.fundingType.updatedDate = new Date();

  if (args && args.fundingTypeId && args.fundingType) {
    try {
      const resp = MlFundingTypes.update({ _id: args.fundingTypeId }, { $set: args.fundingType }, { upsert: true })
      if (resp) {
        const response = new MlRespPayload().successPayload("'Funding Type' updated successfully", 200);
        return response;
      }

      const response = new MlRespPayload().errorPayload('Funding Type could not be updated', 400);
      return response;
    } catch (e) {
      const response = new MlRespPayload().errorPayload(e.message, 400);
      return response;
    }
  }
}

MlResolver.MlQueryResolver.fetchFundingType = (obj, args, context, info) => {
  if (args && args.fundingTypeId) {
    return MlFundingTypes.findOne({ _id: args.fundingTypeId })
  }
}


MlResolver.MlQueryResolver.fetchFundingTypes = (obj, args, context, info) => MlFundingTypes.find({ isActive: true }).fetch()
