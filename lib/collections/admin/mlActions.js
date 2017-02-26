import SimpleSchema from 'simpl-schema';
/**
 * Created by venkatasrinag on 25/1/17.
 */
MlActions = new Mongo.Collection('mlActions');

MlActionsSchema = new SimpleSchema({
    name:{
        type:String,
        optional:false
    },

    displayName:{
        type:String,
        optional:false
    },

    code:{
        type:String,
        optional:false
    },

    isActive:{
        type:Boolean,
        optional:false
    }
})

MlActions.attachSchema(MlActionsSchema);
