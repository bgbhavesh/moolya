import SimpleSchema from 'simpl-schema';

MlCurrencyType = new Mongo.Collection('mlCurrencyType');

MlCurrencyTypeSchema = new SimpleSchema({
  currencyName:{
    type:String,
    optional:false
  },
  currencyCode:{
    type:String,
    optional:true
  },
  countryName:{
    type: String,
    optional:true
  },
  isActive:{
    type:Boolean,
    optional:true
  },
  symbol_native:
    {
      type: String,
      optional:true
    }
})

MlCurrencyType.attachSchema(MlCurrencyTypeSchema);

