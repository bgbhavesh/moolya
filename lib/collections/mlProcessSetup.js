/**
 * Created by venkatsrinag on 6/6/17.
 */
import SimpleSchema from 'simpl-schema';
import MlCollections from '../common/commonSchemas'

MlProcessSetup = new Mongo.Collection('mlProcessSetup');

ProcessSetupSchema = new SimpleSchema({
    userId:{
        type:String,
        optional:true
    },

    userName:{
        type:String,
        optional:true
    },

    processTranscationId:{
        type:String,
        optional:true
    },

    stageId:{
        type:String,
        optional:true
    },

    stageActions:{
        type:Array,
        optional:true
    },

    "stageActions.$.":{
        type:Object,
        optional:true
    },

    "stageActions.$.actionId":{
        type:String,
        optional:true
    },

    "stageActions.$.actionType":{
        type:String,
        optional:true
    },

    "stageActions.$.isActive":{
        type:Boolean,
        optional:true
    },

    isActive:{
        type:Boolean,
        optional:true
    },


})

MlProcessSetup.attachSchema(OfficeSchema);
MlCollections['MlProcessSetup'] = MlProcessSetup;
