/**
 * Created by venkatasrinag on 25/1/17.
 */

import MlSchemas from '../../common/commonSchemas'

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

    latitude:{
        type:String,
        optional:false
    },

    longitude:{
        type:String,
        optional:false
    },

    email:{
        type:String,
        optional:true
    },

    showOnMap:{
        type:Boolean,
        optional:false
    },

    isActive:{
        type: Boolean,
        optional:true
    }
})


MlClusters.attachSchema(MlClusterSchema);

MlSchemas["MlClusters"] = MlClusterSchema;
