
MlCountries = new Mongo.Collection('mlCountries');


MlCountriesSchema = new SimpleSchema({
  _id :{
    type : String,
    optional : false
  },
  country :{
    type : String,
    optional : false
  },
  countryCode :{
    type : String,
    optional : false
  },
  url :{
    type : String,
    optional : false
  },
  isActive:{
    type: Boolean,
    optional:true
  }
})


MlCountries.attachSchema(MlCountriesSchema);
