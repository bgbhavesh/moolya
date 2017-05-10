import SimpleSchema from 'simpl-schema';
import MlCollections from '../../../common/commonSchemas'

MlSubDomain = new Mongo.Collection('mlSubDomain');

MlSubDomainSchema = new SimpleSchema({
  name:{
    type:String,
    optional:false
  },

  displayName:{
    type:String,
    optional:false
  },

  industryId:{
    type:String,
    optional:false
  },

  about:{
    type:String,
    optional:true
  },

  isActive:{
    type:Boolean,
    optional:false
  }
})

MlSubDomain.attachSchema(MlSubDomainSchema);
MlCollections['MlSubDomain'] = MlSubDomain;
