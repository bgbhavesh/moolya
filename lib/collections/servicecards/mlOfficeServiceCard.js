/**
 * Created by venkatsrinag on 13/6/17.
 */
import SimpleSchema from 'simpl-schema';

MlOfficeServiceCard = new Mongo.Collection('mlOfficeServiceCard');


MlOfficeServiceCardSchema = new SimpleSchema({
    totalCount:{
        type:Number,
        optional:true
    },
    principalUserCount:{
        type:Number,
        optional:true
    },
    teamUserCount:{
        type:Number,
        optional:true
    },
    availableCommunities:{
        type:Array,
        optional:true
    },

    'availableCommunities.$':{
        type:Object,
        optional:true
    },

    'availableCommunities.$.communityName':{
        type:String,
        optional:true
    },

    'availableCommunities.$.communityId':{
        type:String,
        optional:true
    },

    'availableCommunities.$.userCount':{
        type:Number,
        optional:true
    },

    serviceCardCode:{
        type:String,
        optional:true
    },

    serviceCardName:{
        type:String,
        optional:true
    },

    isSystemDefined:{
        type:Boolean,
        optional:true
    },

    totalAmount:{
        type:Number,
        optional:true
    },

    createdBy:{
        type:String,
        optional:true
    },

    createdOn:{
        type:Date,
        optional:true
    },

    updatedOn:{
        type:Date,
        optional:true
    },

    isActive:{
        type:Boolean,
        optional:true
    }
});

MlOfficeServiceCard.attachSchema(MlOfficeServiceCardSchema);
