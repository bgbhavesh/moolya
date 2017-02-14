/**
 * Created by muralidhar on 01/02/17.
 */
MlCommunityDefinition = new Mongo.Collection('mlCommunityDefinition');


MlCommunityDefinitionSchema = new SimpleSchema({

  _id:{
    type: String,
    optional: false
  },
  name: {
    type: String,
    optional: false
  },
  displayName: {
    type: String,
    optional: true
  },
  cluster: {
    type: String,
    optional: false
  },
  chapter: {
    type: String,
    optional: false
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
