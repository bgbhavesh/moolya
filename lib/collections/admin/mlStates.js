
MlStates = new Mongo.Collection('mlStates');


MlStatesSchema = new SimpleSchema({

  _id :{
    type : String,
    optional : false
  },
  name :{
    type : String,
    optional : false
  },
  countryId :{
    type : String,
    optional : false
  },
  countryCode :{
    type : String,
    optional : false
  },
  isActive:{
    type: Boolean,
    optional:true
  }
})


MlStates.attachSchema(MlStatesSchema);
