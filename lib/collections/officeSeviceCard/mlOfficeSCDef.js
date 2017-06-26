/**
 * Created by venkatsrinag on 13/6/17.
 */
import SimpleSchema from 'simpl-schema';
import MlCollections from '../../common/commonSchemas'

MlOfficeSCDef = new Mongo.Collection('mlOfficeSCDef');

MlOfficeSCDefSchema = new SimpleSchema({
    officeId:{
        type:String,
        optional:true
    },
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
    code:{
        type:String,
        optional:true
    },

    serviceCardName:{
        type:String,
        optional:true
    },

    isBSpoke:{
        type:Boolean,
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

MlOfficeSCDef.attachSchema(MlOfficeSCDefSchema);
MlCollections['MlOfficeSCDef'] = MlOfficeSCDef;
