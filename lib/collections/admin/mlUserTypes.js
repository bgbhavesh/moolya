

import MlSchemas from '../../common/commonSchemas'

MlUserTypes = new Mongo.Collection('mlUserType');


MlUserTypesSchema = new SimpleSchema({
  userTypeName:{
    type:String,
    optional:true
  },
  userTypeDesc:{
    type:String,
    optional:true
  },
  displayName:{
    type:String,
    optional:true
  },
  isActive:{
    type: Boolean,
    optional:true
  }
})


MlUserTypes.attachSchema(MlUserTypesSchema);

MlSchemas["MlUserTypes"] = MlUserTypesSchema;
