/**
 * Created by venkatasrinag on 25/1/17.
 */
MlSubDepartments = new Mongo.Collection('mlSubDepartments');


MlSubDepartmentSchema = new SimpleSchema({

    subDepartmentName:{
        type:String,
        optional:false
    },

    displayName:{
      type:String,
      optional:true
    },

    aboutSubDepartment :{
      type:String,
      optional:false
    },

    isActive:{
      type:Boolean,
      optional:false
    },

    departmentId:{
      type:String,
      optional:false
    },

    isMoolya:{
      type:Boolean,
      optional:false
    },

    subDepatmentAvailable:{
      type:Array,
      optional:true
    },

    'subDepatmentAvailable.$':{
      type:Object,
      optional:true
    },

    'subDepatmentAvailable.$.cluster':{
      type:String,
      optional:true
    },
    'subDepatmentAvailable.$.chapter':{
      type:String,
      optional:true
    },
    'subDepatmentAvailable.$.community':{
      type:String,
      optional:true
    },
    'subDepatmentAvailable.$.email':{
      type:String,
      optional:true
    },
    'subDepatmentAvailable.$.notify':{
      type:Boolean,
      optional:true
    },
    'subDepatmentAvailable.$.isActive':{
      type:Boolean,
      optional:true
    }

})


MlSubDepartments.attachSchema(MlSubDepartmentSchema);
