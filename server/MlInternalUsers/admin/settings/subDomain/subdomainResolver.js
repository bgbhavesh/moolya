/**
 * Created by venkatsrinag on 21/4/17.
 */
import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver.createSubDomain = (obj, args, context, info) => {
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
  args.SubDomainMasterData.createdBy = createdBy;
  args.SubDomainMasterData.createdDate = new Date();

  if (args && args.SubDomainMasterData) {
    try {
      const ret = MlSubDomain.insert({ ...args.SubDomainMasterData })
      if (ret) {
        const response = new MlRespPayload().successPayload('Sub Domain added successfully', 200);
        return response;
      }

      const response = new MlRespPayload().errorPayload('Sub-Domain could not be added', 400);
      return response;
    } catch (e) {
      const response = new MlRespPayload().errorPayload(e.message, 401);
      return response;
    }
  }
}

MlResolver.MlMutationResolver.updateSelectedSubDomain = (obj, args, context, info) => {
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
  args.SubDomainMasterData.updatedBy = createdBy;
  args.SubDomainMasterData.updatedDate = new Date();

  if (args && args.SubDomainId && args.SubDomainMasterData) {
    // try{
    const resp = MlSubDomain.update({ _id: args.SubDomainId }, { $set: args.SubDomainMasterData }, { upsert: true })
    if (resp) {
      const response = new MlRespPayload().successPayload('Sub-Domain updated successfully', 200);
      return response;
    }

    const response = new MlRespPayload().errorPayload('Sub-Domain could not be updated', 400);
    return response;

    // }
    // catch (e){
    //   let response = new MlRespPayload().errorPayload(e.message, 400);
    //   return response;
    // }
  }
}

MlResolver.MlQueryResolver.findSubDomain = (obj, args, context, info) => {
  if (args && args.SubDomainId) {
    return MlSubDomain.findOne({ _id: args.SubDomainId })
  }
}


MlResolver.MlQueryResolver.fetchIndustryDomain = (obj, args, context, info) => MlSubDomain.find({ industryId: args.industryId, isActive: true }).fetch()
