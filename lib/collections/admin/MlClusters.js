/**
 * Created by venkatasrinag on 25/1/17.
 */
MlClusters = new Mongo.Collection('mlClusters');


MlClusterSchema = new SimpleSchema({
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

    description:{
        type:String,
        optional:true
    },

    link:{
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
