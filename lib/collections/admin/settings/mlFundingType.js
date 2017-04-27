/**
 * Created by rajatshekhar on 27/4/17.
 */
import SimpleSchema from 'simpl-schema';
import MlCollections from '../../../common/commonSchemas'
MlFundingTypes = new Mongo.Collection('mlFundingTypes');

MlFundingTypesSchema = new SimpleSchema({
  fundingTypeName:{
    type:String,
    optional:false
  },
  displayName:{
    type:String,
    optional:true
  },
  icon:{
    type:String,
    optional:true
  },
  about:{
    type: String,
    optional:true
  },
  isActive:{
    type:Boolean,
    optional:true
  }
})


MlFundingTypes.attachSchema(MlFundingTypesSchema);
MlCollections['MlFundingTypes'] = MlFundingTypes;
