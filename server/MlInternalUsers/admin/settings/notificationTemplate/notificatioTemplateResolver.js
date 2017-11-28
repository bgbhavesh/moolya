/**
 * Created by mohammed.mohasin on 22/07/17.
 */
import MlResolver from '../../../../commons/mlResolverDef'
import MlRespPayload from '../../../../commons/mlPayload'


MlResolver.MlMutationResolver.createNotificationTemplate = (obj, args, context, info) => {
  if (args && args.notificationTemplate) {
    // args.notificationTemplate.createdBy = context.userId;
    // args.notificationTemplate.createdAt = new Date();
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
    args.notificationTemplate.createdBy = createdBy;
    args.notificationTemplate.createdAt = new Date();
    try {
      const ret = mlDBController.insert('MlNotificationTemplates', { ...args.notificationTemplate }, context);
      // let ret = MlNotificationTemplates.insert({...args.notificationTemplate});
      if (ret) {
        const response = new MlRespPayload().successPayload("'Notification Template' added successfully", 200);
        return response;
      }

      const response = new MlRespPayload().errorPayload("'Notification Template' could not be added", 400);
      return response;
    } catch (e) {
      const response = new MlRespPayload().errorPayload(e.message, 400);
      return response;
    }
  }
}

MlResolver.MlMutationResolver.updateNotificationTemplate = (obj, args, context, info) => {
  if (context.userId && args && args.notificationTemplateId && args.notificationTemplate) {
    // args.notificationTemplate.updatedBy = context.userId;
    // args.notificationTemplate.updatedAt = new Date();
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
    args.notificationTemplate.updatedBy = createdBy;
    args.notificationTemplate.updatedAt = new Date();
    try {
      // let resp = MlNotificationTemplates.update({_id: args.notificationTemplateId}, {$set: args.notificationTemplate});
      const resp = mlDBController.update('MlNotificationTemplates', args.notificationTemplateId, args.notificationTemplate, { $set: true }, context);
      if (resp) {
        const response = new MlRespPayload().successPayload("'Notification Template' updated successfully", 200);
        return response;
      }

      const response = new MlRespPayload().errorPayload("'Notification Template' could not be added", 400);
      return response;
    } catch (e) {
      const response = new MlRespPayload().errorPayload(e.message, 400);
      return response;
    }
  }
}

MlResolver.MlQueryResolver.fetchNotificationTemplate = (obj, args, context, info) => {
  if (args && args.notificationTemplateId) {
    return mlDBController.findOne('MlNotificationTemplates', { _id: args.notificationTemplateId }, context);
    // return MlNotificationTemplates.findOne({"_id":args.notificationTemplateId})
  }
}


MlResolver.MlQueryResolver.fetchNotificationTemplates = (obj, args, context, info) =>
  mlDBController.find('MlNotificationTemplates', { isActive: true }, context).fetch()
// return MlNotificationTemplates.find({isActive : true}).fetch();

