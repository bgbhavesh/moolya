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

    clusterId:{
        type:String,
        optional:false
    },

    chapterId:{
      type:String,
      optional:false
    },

    subChapterId:{
      type:String,
      optional:false
    },

    displayName:{
      type:String,
      optional:false
    },

    aboutSubChapter:{
      type:String,
      optional:true
    },

    email:{
      type: String,
      optional:true
    },

    notifyEmail:{
      type:Boolean,
      optional:false
    },

    isActive:{
        type:Boolean,
        optional:false
    }
})


MlSubDepartments.attachSchema(MlSubDepartmentSchema);
