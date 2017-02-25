import SimpleSchema from 'simpl-schema';
MlRequestType = new Mongo.Collection('mlRequestType');

MlRequestTypeSchema = new SimpleSchema({
  _id:{
    type:String,
    optional:false
  },

  requestName:{
    type:String,
    optional:true
  },

  displayName:{
    type:String,
    optional:true
  },

  requestDesc:{
    type: String,
    optional:true
  },

  isActive:{
    type:Boolean,
    optional:true
  }
})


MlRequestType.attachSchema(MlRequestTypeSchema);
