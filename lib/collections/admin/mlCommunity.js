/**
 * Created by muralidhar on 01/02/17.
 */
MlCommunity = new Mongo.Collection('mlCommunity');


MlCommunitySchema = new SimpleSchema({

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
  link: {
    type: String,
    optional: true
  },
  showOnMap: {
    type: Boolean,
    optional: true
  },
  about: {
    type: String,
    optional: true
  },
  isActive: {
    type: Boolean,
    optional: true
  }
})


MlCommunity.attachSchema(MlCommunitySchema);
