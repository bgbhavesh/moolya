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
  action:{
    type:String,
    optional:false
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
    optional:false
  },
  field:{
    type:String,
    optional:false
  },
  previousValue:{
    type:String,
    optional:false
  },
  currentValue:{
    type:String,
    optional:false
  },
  'userAgent.$':{
    type:Object,
    optional:false
  },
  'userAgent.$.ipAddress':{
    type:String,
    optional:false
  },
  'userAgent.$.OS':{
    type:String,
    optional:false
  },
  'userAgent.$.browser':{
    type:String,
    optional:false
  },
  'userAgent.$.deviceModel':{
    type:String,
    optional:false
  },
  'userAgent.$.deviceType':{
    type:String,
    optional:false
  },
  'userAgent.$.deviceVendor':{
    type:String,
    optional:false
  },
  timeStamp:{
    type:String,
    optional:false
  },
})

MlAudit.attachSchema(MlMlAuditSchema);

// moduleName: {
//   type: String,
//     optional: false
// },
// moduleId:{
//   type: String,
//     optional: false
// },
// fieldName:{
//   type: String,
//     optional: false
// },
// currentValue:{
//   type: String,
//     optional: false
// },
// previousValue:{
//   type: String,
//     optional: false
// },
// modifiedBy:{
//   type: String,
//     optional: false
// },
// ipAddress:{
//   type: String,
//     optional: false
// },
// lastUpdatedDateAndTime:{
//   type: Date,
//     optional: false
// }
