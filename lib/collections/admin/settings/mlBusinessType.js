import SimpleSchema from 'simpl-schema';
import MlCollections from '../../../common/commonSchemas'

MlBusinessType = new Mongo.Collection('mlBusinessType');

MlBusinessTypeSchema = new SimpleSchema({
  businessTypeName:{
    type:String,
    optional:false
  },
  businessTypeDisplayName:{
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


MlBusinessType.attachSchema(MlBusinessTypeSchema);
MlCollections['MlBusinessType'] = MlBusinessType;

