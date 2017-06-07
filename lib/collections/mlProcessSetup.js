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

    processSteps:{
        type:Array,
        optional:true
    },

    "processSteps.$.":{
        type:Object,
        optional:true
    },

    "processSteps.$.stageId":{
        type:String,
        optional:true
    },

    "processSteps.$.stageActions":{
        type:Array,
        optional:true
    },

    "processSteps.$.stageActions.$.":{
        type:Object,
        optional:true
    },

    "processSteps.$.stageActions.$.actionId":{
        type:String,
        optional:true
    },

    "processSteps.$.stageActions.$.actionType":{
        type:String,
        optional:true
    },

    "processSteps.$.stageActions.$.isActive":{
        type:Boolean,
        optional:true
    },

    "processSteps.$.isActive":{
        type:Boolean,
        optional:true
    },

    isActive:{
        type:Boolean,
        optional:true
    }
})

MlProcessSetup.attachSchema(ProcessSetupSchema);
MlCollections['MlProcessSetup'] = MlProcessSetup;
