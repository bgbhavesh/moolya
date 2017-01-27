


MlCluster = new Mongo.Collection('mlCluster');

MlClusterSchema = new SimpleSchema({

  countryId:{
    type:String,
    optional: false
  },
  link:{
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
  email:{
    type:String,
    optional:false
  },
  showOnMap:{
    type:Boolean,
    optional:false
  }
})


MlCluster.attachSchema(MlClusterSchema);
