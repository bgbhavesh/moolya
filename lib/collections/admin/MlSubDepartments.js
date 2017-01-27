/**
 * Created by venkatasrinag on 25/1/17.
 */
MlSubDepartments = new Mongo.Collection('mlSubDepartments');


MlSubDepartmentSchema = new SimpleSchema({

    departmentId:{
        type:String,
        optional:false
    },

    departmentName:{
        type:String,
        optional:false
    },

    displayName:{
        type:String,
        optional:false
    },

    clusterId:{
        type:String,
        optional:false
    },

    departmentDesc:{
        type: String,
        optional:true
    },

    isActive:{
        type:Boolean,
        optional:false
    },

    email:{
        type: String,
        optional:true
    }
})


MlSubDepartments.attachSchema(MlSubDepartmentSchema);
