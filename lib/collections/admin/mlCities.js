
MlCities = new Mongo.Collection('mlCities');


MlCitiesSchema = new SimpleSchema({
  _id :{
    type : String,
    optional : false
  },
  name :{
    type : String,
    optional : false
  },
  stateId :{
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


MlCities.attachSchema(MlCitiesSchema);
