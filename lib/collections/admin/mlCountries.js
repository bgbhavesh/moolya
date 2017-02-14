
import MlSchemas from '../../common/commonSchemas'

MlCountries = new Mongo.Collection('mlCountries');


MlCountriesSchema = new SimpleSchema({

  name :{
    type : String,
    optional : false
  },
  code :{
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
MlSchemas["MlCountries"] = MlCountriesSchema;
