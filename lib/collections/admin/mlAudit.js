
MlAudit = new Mongo.Collection('mlAudit');

MlMlAuditSchema = new SimpleSchema({
  moduleName: {
    type: String,
    optional: false
  },
  moduleId:{
    type: String,
    optional: false
  },
  fieldName:{
    type: String,
    optional: false
  },
  currentValue:{
    type: String,
    optional: false
  },
  previousValue:{
    type: String,
    optional: false
  },
  modifiedBy:{
    type: String,
    optional: false
  },
  ipAddress:{
    type: String,
    optional: false
  },
  lastUpdatedDateAndTime:{
    type: Date,
    optional: false
  }

})

MlAudit.attachSchema(MlMlAuditSchema);
