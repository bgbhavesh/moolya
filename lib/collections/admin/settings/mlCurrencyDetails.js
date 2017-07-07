import SimpleSchema from 'simpl-schema';

MlCurrencyDetails = new Mongo.Collection('mlCurrency_Details');

MlCurrencyDetailsSchema = new SimpleSchema({
  symbol:{
    type:String,
    optional:false
  },
  name:{
    type:String,
    optional:false
  },
  symbol_native:{
    type: String,
    optional:false
  },
  decimal_digits:{
    type:String,
    optional:false
  },
  rounding:{
    type:String,
    optional:false
  },
  code:{
    type: String,
    optional:false
  },
  name_plural:{
    type:String,
    optional:false
  }
})


MlCurrencyDetails.attachSchema(MlCurrencyDetailsSchema);

