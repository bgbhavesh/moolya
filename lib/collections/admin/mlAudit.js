import SimpleSchema from 'simpl-schema';
MlAudit = new Mongo.Collection('mlAudit');

MlMlAuditSchema = new SimpleSchema({
  userId:{
    type:String,
    optional:false
  },
  userName:{
    type:String,
    optional:false
  },
  moduleName:{
    type:String,
    optional:true
  },
  collectionName:{
    type:String,
    optional:false
  },
  url:{
    type:String,
    optional:false
  },
  docId:{
    type:String,
    optional:true
  },
  action:{
    type:String,
    optional:true
  },
  field:{
    type: String,
    optional:true
  },
  previousValue:{
    type:String,
    optional:true
  },
  currentValue:{
    type:String,
    optional:true
  },
  errorReason:{
    type:String,
    optional: true
  },
  'userAgent':{
    type: Object,
    optional:true
  },
  'userAgent.ipAddress':{
    type:String,
    optional:false
  },
  'userAgent.OS':{
    type:String,
    optional:false
  },
  'userAgent.browser':{
    type:String,
    optional:false
  },
  'userAgent.deviceModel':{
    type:String,
    optional:false
  },
  'userAgent.deviceType':{
    type:String,
    optional:false
  },
  'userAgent.deviceVendor':{
    type:String,
    optional:false
  },
  timeStamp:{
    type:String,
    optional:false
  },
})

MlAudit.attachSchema(MlMlAuditSchema);
