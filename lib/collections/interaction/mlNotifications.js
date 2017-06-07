/**
 * Created by mohammed.mohasin on 6/6/17.
 */
import SimpleSchema from 'simpl-schema';

MlNotifications = new Mongo.Collection('mlNotifications');


MlNotificationSchema = new SimpleSchema({
  resourceId:{
    type:String,
    optional:true
  },
  resourceType:{
    type:String,
    optional:true
  },
  notificationType:{
    type:String,
    optional:true
  },
  message:{
    type:String,
    optional:true
  },
  from:{
    type:String,
    optional:true
  },
  fromEmail:{
    type:String,
    optional:true
  },
  to:{
    type:String,
    optional:true
  },
  toEmail:{
    type:String,
    optional:true
  },
  createdOn:{
    type:String,
    optional:true
  },
  updatedOn:{
    type:String,
    optional:true
  },
  isRead:{
    type:Boolean,
    optional:true
  },
  isActive:{
    type:Boolean,
    optional:true
  }

});
