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
  isActive: {
    type: Boolean,
    optional: true
  }
})


MlCommunityDefinition.attachSchema(MlCommunityDefinitionSchema);
