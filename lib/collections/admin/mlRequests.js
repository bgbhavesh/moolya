
MlRequests = new Mongo.Collection('mlRequests');


MlStatesSchema = new SimpleSchema({
  _id :{
    type : String,
    optional : false
  },

  requestName:{
    type : String,
    optinal:true
  },

  requestDisplayName:{
    type : String,
    optinal:true
  },

  requestDescription:{
    type : String,
    optinal:true
  },

  isActive:{
    type: Boolean,
    optional:true
  }
})


MlRequests.attachSchema(MlRequestsSchema);
