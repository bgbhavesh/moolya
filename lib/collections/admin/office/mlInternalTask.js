/**
 * Created by pankaj on 19/6/17.
 */
import SimpleSchema from 'simpl-schema';
import MlCollections from '../../../common/commonSchemas'

MlInternalTask = new Mongo.Collection('mlInternalTask');
MlInternalTaskSchema = new SimpleSchema({
  userId:{
    type:String,
    optional:true
  },
  attendee:{
    type:String,
    optional:true
  },
  internalTaskId:{
    type:String,
    optional:true
  },
  name: {
    type:String,
    optional:true
  },
  stage: {
    type:String,
    optional:true
  },
  resourceId: {
    type:String,
    optional:true
  },
  community:{
      type:Object,
      optional:true
  },
  "community.type":{
    type:String,
    optional:true
  },
  "community.code":{
    type:String,
    optional:true
  },
  "community.name":{
    type:String,
    optional:true
  },
  attendees:{
    type:Array,
    optional:true
  },
  'attendees.$':{
    type:String,
    optional:true
  },
  docs:{
    type:Array,
    optional:true
  },
  'docs.$':{
    type:String,
    optional:true
  },
  status:{
    type:String,
    optional:true,
    allowedValues:['pending','accepted','rejected','started','completed'],
  },
  note:{
    type:String,
    optional:true
  },
  mode:{
    type:String,
    optional:true,
    allowedValues:['online','offline'],
  },
  createdAt:{
    type:Date,
    optional:true,
  }
});

MlInternalTask.attachSchema(MlInternalTaskSchema);
MlCollections['MlInternalTask'] = MlInternalTask;
