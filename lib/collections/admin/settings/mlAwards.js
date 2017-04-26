import SimpleSchema from 'simpl-schema';
import MlSchemas from '../../../common/commonSchemas'
import MlCollections from '../../../common/commonSchemas'

MlAwards = new Mongo.Collection('mlAwards');

MlAwardsSchema = new SimpleSchema({
  awardName:{
    type:String,
    optional:false
  },
  awardDisplayName:{
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


MlAwards.attachSchema(MlAwardsSchema);

MlSchemas["MlAwards"] = MlAwards;
MlCollections['MlAwards'] = MlAwards;
