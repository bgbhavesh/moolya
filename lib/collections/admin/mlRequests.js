
MlRequests = new Mongo.Collection('mlRequests');


MlRequestsSchema = new SimpleSchema({

  requestName:{
    type : String,
    optional:true
  },

  requestDisplayName:{
    type : String,
    optional:true
  },

  requestDescription:{
    type : String,
    optional:true
  },

  isActive:{
    type: Boolean,
    optional:true
  }
})


MlRequests.attachSchema(MlRequestsSchema);
