/**
 * Created by venkatsrinag on 5/5/17.
 */
import SimpleSchema from "simpl-schema";

MlConnections = new Mongo.Collection('mlConnections');

ConnectionSchema = new SimpleSchema({
    users:{
        type:Array,
        optional:true
    },

    'users.$':{
        type:Object,
        optional:true
    },

    'users.$.userid':{
        type:String,
        optional:true
    },

    'users.$.userName':{
        type:String,
        optional:true
    },

    'users.$.isFavourite':{
        type:Boolean,
        optional:true
    },

    'users.$.isBlock':{
        type:Boolean,
        optional:true
    },

    requestedFrom:{
        type:String,
        optional:true
    },

    createdBy:{
        type:Date,
        optional:true
    },

    updatedBy:{
        type:Date,
        optional:true
    },

    isAccepted:{
        type:Boolean,
        optional:true
    },
    isDenied:{
        type:Boolean,
        optional:true
    },
    resendCount: {
      type: Number,
      optional: true
    }
})

MlConnections.attachSchema(ConnectionSchema);
