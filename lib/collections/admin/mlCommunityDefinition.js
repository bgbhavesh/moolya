import SimpleSchema from 'simpl-schema';
/**
 * Created by muralidhar on 01/02/17.
 */
MlCommunityDefinition = new Mongo.Collection('mlCommunityDefinition');


MlCommunityDefinitionSchema = new SimpleSchema({

  name: {
    type: String,
    optional: false
  },
  displayName: {
    type: String,
    optional: true
  },
  code:{
    type:String,
    optional:false
  },
  communityImageLink: {
    type: String,
    optional: true
  },
  showOnMap: {
    type: Boolean,
    optional: true
  },
  aboutCommunity: {
    type: String,
    optional: true
  },
  clusters:{
    type:Array,
    optional:true
  },
  'clusters.$':{
    type:Object,
    optional:true
  },
  'clusters.$.id':{
    type:String,
    optional:true
  },
  'clusters.$.name':{
    type:String,
    optional:true
  },
  chapters:{
    type:Array,
    optional:true
  },
  'chapters.$':{
    type:Object,
    optional:true
  },
  'chapters.$.id':{
    type:String,
    optional:true
  },
  'chapters.$.name':{
    type:String,
    optional:true
  },
  isActive: {
    type: Boolean,
    optional: true
  }
})


MlCommunityDefinition.attachSchema(MlCommunityDefinitionSchema);
