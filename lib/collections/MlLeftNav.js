


MlLeftNavModel = new Mongo.Collection('mlLeftNav');

MlLeftNavSchema = new SimpleSchema({
  name:{
        type:String,
        optional:false
    },
  subMenu:{
    type:[Object],
    optional:false
  }
})



MlLeftNavModel.attachSchema(MlLeftNavSchema);
