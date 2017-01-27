MlMenuModel = new Mongo.Collection('mlMenu');

MlMenuSchema = new SimpleSchema({
  image:{
    type:String,
    optional: false
  },

  link:{
    type:String,
    optional:false
  },

  name:{
    type:String,
    optional:false
  },
  id:{
    type:String,
    optional:false
  },
  isLink:{
    type:Boolean,
    optional:false
  },
  isMenu:{
    type:Boolean,
    optional:false
  }
})



MlMenuModel.attachSchema(MlMenuSchema);
