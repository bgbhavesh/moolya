/**
 * Created by muralidhar on 14/02/17.
 */
MlUserTypes = new Mongo.Collection('mlUserTypes');

MlUserTypesSchema = new SimpleSchema({

  userTypeName: {
    type: String,
    optional: false
  },
  userTypeDisplayName: {
    type: String,
    optional: true
  },
  userTypeDescription: {
    type: String,
    optional: true
  },
  isActive: {
    type: Boolean,
    optional: true
  }

})

MlUserTypes.attachSchema(MlUserTypesSchema);
