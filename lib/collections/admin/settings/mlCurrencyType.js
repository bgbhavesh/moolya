import SimpleSchema from 'simpl-schema';
import MlCollections from '../../../common/commonSchemas'
MlCurrencyType = new Mongo.Collection('MlCurrencyType');

MlCurrencyTypeSchema = new SimpleSchema({
  currencyName:{
    type:String,
    optional:false
  },
  currencyDisplayName:{
    type:String,
    optional:true
  },
  countryName:{
    type: String,
    optional:true
  },
  createdDate:{
    type: String,
    optional:true
  },
  isActive:{
    type:Boolean,
    optional:true
  }
})


MlCurrencyType.attachSchema(MlCurrencyTypeSchema);
MlCollections['MlCurrencyType'] = MlCurrencyType;

