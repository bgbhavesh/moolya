
MlPermissions = new Mongo.Collection('mlPermissions');

MlPermissionsSchema = new SimpleSchema({
  _id:{
    type:String,
    optional:false
  },

  permissionName:{
    type:String,
    optional:true
  },

  displayName:{
    type:String,
    optional:true
  },

  permissionDesc:{
    type: String,
    optional:true
  },

  isActive:{
    type:Boolean,
    optional:true
  }
})


MlPermissions.attachSchema(MlPermissionsSchema);
