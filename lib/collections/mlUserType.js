import SimpleSchema from 'simpl-schema';
/**
 * Created by muralidhar on 14/02/17.
 */
MlUserTypes = new Mongo.Collection('mlUserTypes');

MlUserTypesSchema = new SimpleSchema({

  userTypeName: {
    type: String,
    optional: false
  },
  displayName: {
    type: String,
    optional: true
  },
  userTypeDesc: {
    type: String,
    optional: true
  },
  isActive: {
    type: Boolean,
    optional: true
  },
  communityId:{
    type:String,
    optional:true
  },
  communityName:{
    type:String,
    optional:true
  }

})

MlUserTypes.attachSchema(MlUserTypesSchema);
