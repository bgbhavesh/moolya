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
    optional: true
  },
  communityDefId: {
    type: String,
    optional: false
  },
  communityDefCode: {
    type: String,
    optional: false
  },
  communityDefName: {
    type: String,
    optional: false
  },
  // clusterId: {
  //   type: String,
  //   optional: false
  // },
  // clusterName: {
  //   type: String,
  //   optional: true
  // },
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
  // chapterId: {
  //   type: Boolean,
  //   optional: false
  // },
  // chapterName: {
  //   type: String,
  //   optional: true
  // },
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
  subChapterId: {
    type: Boolean,
    optional: false
  },
  communityCode:{
    type: String,
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
