/**
 * Created by venkatsrinag on 21/4/17.
 */
import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver.createAssets = (obj, args, context, info) => {
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
  args.assetsMasterData.createdBy = createdBy;
  args.assetsMasterData.createdDate = new Date();
  if (args && args.assetsMasterData) {
    try {
      const ret = MlAssets.insert({ ...args.assetsMasterData })
      if (ret) {
        const response = new MlRespPayload().successPayload('Asset added successfully', 200);
        return response;
      }

      const response = MlRespPayload.errorPayload('Asset could not be added', 400);
      return response;
    } catch (e) {
      const response = MlRespPayload.errorPayload(e.message, 400);
      return response;
    }
  }
}

MlResolver.MlMutationResolver.updateSelectedAsset = (obj, args, context, info) => {
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
  args.assetsMasterData.updatedBy = createdBy;
  args.assetsMasterData.updatedDate = new Date();

  if (args && args.assetId && args.assetsMasterData) {
    try {
      const resp = MlAssets.update({ _id: args.assetId }, { $set: args.assetsMasterData }, { upsert: true })
      if (resp) {
        const response = new MlRespPayload().successPayload('Asset updated successfully', 200);
        return response;
      }

      const response = new MlRespPayload.errorPayload('Asset could not be updated', 400);
      return response;
    } catch (e) {
      const response = new MlRespPayload.errorPayload(e.message, 400);
      return response;
    }
  }
}

MlResolver.MlQueryResolver.fetchAssets = (obj, args, context, info) => MlAssets.find({ isActive: true }).fetch()

MlResolver.MlQueryResolver.findAsset = (obj, args, context, info) => {
  if (args && args.assetId) {
    return MlAssets.findOne({ _id: args.assetId })
  }
}
