import SimpleSchema from 'simpl-schema';
MlprocessTypes = new Mongo.Collection('mlProcessTypes');

MlprocessTypesSchema = new SimpleSchema({

  processName: {
    type: String,
    optional: false
  },
  displayName: {
    type: String,
    optional: true
  },
  processDesc: {
    type: String,
    optional: true
  },
  isActive: {
    type: Boolean,
    optional: true
  }

})

MlprocessTypes.attachSchema(MlprocessTypesSchema);
