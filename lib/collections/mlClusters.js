/**
 * Created by venkatasrinag on 25/1/17.
 */
mlClusters = new Mongo.Collection('mlClusters');


mlClusterSchema = new SimpleSchema({
  countryId:{
    type:String,
    optional:false
  },

  countryFlag:{
    type:String,
    optional:true
  },
  about:{
    type:String,
    optional:false
  },
  displayName:{
    type:String,
    optional:false
  },
  latitude:{
    type:String,
    optional:false
  },
  longitude:{
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

  showOnMap:{
    type:Boolean,
    optional:true
  },

  isActive:{
    type: Boolean,
    optional:true
  }
})


MlClusters.attachSchema(MlClusterSchema);
