/**
 * Created by venkatasrinag on 25/1/17.
 */
MlDepartments = new Mongo.Collection('mlDepartments');

MlDepartmentSchema = new SimpleSchema({
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


MlDepartments.attachSchema(MlDepartmentSchema);
