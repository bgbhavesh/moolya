


MlChapter = new Mongo.Collection('mlChapter');

MlChapterrSchema = new SimpleSchema({

  clusterId:{
    type:String,
    optional: false
  },
  chapterName:{
    type:String,
    optional:false
  },
  displayName:{
    type:String,
    optional:false
  },
  id:{
    type:String,
    optional:false
  },
  about:{
    type:String,
    optional:false
  },
  link:{
    type:String,
    optional:false
  },
  state:{
    type:String,
    optional:false
  },
  email:{
    type:String,
    optional:false
  },
  status:{
    type:String,
    optional:false
  },
  showOnMap:{
    type:Boolean,
    optional:false
  }
})





MlChapter.attachSchema(MlChapterrSchema);
