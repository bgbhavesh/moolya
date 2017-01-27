/**
 * Created by venkatasrinag on 25/1/17.
 */
MlChapters = new Mongo.Collection('mlChapter');

MlChapterSchema = new SimpleSchema({
  clusterId:{
      type:String,
      optional:false
  },

  name:{
      type:String,
      optional:false
  },

  state:{
    type:String,
    optional:false
  },

  displayName:{
      type:String,
      optional:false
  },

  description:{
      type:String,
      optional:true
  },

  email:{
      type:String,
      optional:true
  },

  isActive:{
      type: Boolean,
      optional:false
  }
})

MlChapters.attachSchema(MlChapterSchema);
