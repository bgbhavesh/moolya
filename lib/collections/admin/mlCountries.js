
import MlSchemas from '../../common/commonSchemas'

MlCountries = new Mongo.Collection('mlCountries');


MlCountriesSchema = new SimpleSchema({

    country :
    {
        type : String,
        optional : false
    },
    countryCode :{
        type : String,
        optional : false
    },

    displayName :{
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
