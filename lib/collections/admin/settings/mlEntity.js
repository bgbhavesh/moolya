import SimpleSchema from 'simpl-schema';
import MlCollections from '../../../common/commonSchemas'
MlEntity = new Mongo.Collection('mlEntityType');

MlEntitySchema = new SimpleSchema({
  entityName:{
    type:String,
    optional:false
  },
  entityDisplayName:{
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


MlEntity.attachSchema(MlEntitySchema);
MlCollections['MlEntity'] = MlEntity;
