
MlRequests = new Mongo.Collection('mlRequests');


MlRequestsSchema = new SimpleSchema({
  _id :{
    type : String,
    optional : false
  },

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
