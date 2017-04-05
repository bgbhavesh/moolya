import SimpleSchema from 'simpl-schema';
import MlCollections from '../../../common/commonSchemas'
MlSpecifications = new Mongo.Collection('mlSpecifications');

MlSpecificationSchema = new SimpleSchema({
  specificationName:{
    type:String,
    optional:false
  },
  specificationDisplayName:{
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


MlSpecifications.attachSchema(MlSpecificationSchema);
MlCollections['MlSpecifications'] = MlSpecifications;

