import MlCollections from '../../common/commonSchemas'
import SimpleSchema from 'simpl-schema';

MlNotificationTemplates = new Mongo.Collection('mlNotificationTemplates');

MlNotificationTemplatesSchema = new SimpleSchema({

  type          : { type:String },                 // email/sms/alert/notification
  tempCode      : { type:String},                  // Here we need to store the unique template code.
  title         : { type:String },                 // its email or sms title
  tempDesc      : { type:String },                 // It states more about template description
  isHtmlContent : { type:Boolean },                // for email content it is true else false.
  content       : { type: String }                 // its html/plain content of email sms.
});

MlNotificationTemplates.attachSchema(MlNotificationTemplatesSchema);
MlCollections['MlNotificationTemplates'] = MlNotificationTemplates;

