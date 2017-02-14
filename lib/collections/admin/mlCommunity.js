/**
 * Created by murali on 14/2/17.
 */
MlCommunity = new Mongo.Collection('mlCommunity');


MlCommunitySchema = new SimpleSchema({


  communityName: {
    type: String,
    optional: false
  },
  communityDisplayName: {
    type: String,
    optional: true
  },
  communityDescription: {
    type: String,
    optional: false
  },
  clusterId: {
    type: String,
    optional: false
  },
  clusterName: {
    type: String,
    optional: true
  },
  chapterId: {
    type: Boolean,
    optional: true
  },
  chapterName: {
    type: String,
    optional: true
  },
  subChapterId: {
    type: Boolean,
    optional: true
  },
  subChapterName: {
    type: String,
    optional: true
  },
  showOnMap: {
    type: Boolean,
    optional: true
  },
  isActive: {
    type: Boolean,
    optional: true
  }
})


MlCommunity.attachSchema(MlCommunitySchema);
