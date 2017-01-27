/**
 * Created by venkatasrinag on 25/1/17.
 */
MlPermissions = new Mongo.Collection('mlPermissions');

MlPermissionSchema = new SimpleSchema({
    name:{
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

    isActive:{
        type:Boolean,
        optional:false
    }
})

MlPermissions.attachSchema(MlPermissionSchema);
