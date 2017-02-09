/**
 * Created by venkatasrinag on 25/1/17.
 */
MlDepartments = new Mongo.Collection('mlDepartments');

MlDepartmentSchema = new SimpleSchema({
    _id:{
      type:String,
      optional:false
    },

    departmentName:{
        type:String,
        optional:true
    },

    displayName:{
        type:String,
        optional:true
    },

    departmentDesc:{
        type: String,
        optional:true
    },

    isActive:{
        type:Boolean,
        optional:true
    },

    isMoolya:{
      type:Boolean,
      optional:true
    },

    depatmentAvailable:{
      type:Array,
      optional:true
    },

    'depatmentAvailable.$':{
      type:Object,
      optional:true
    },

    'depatmentAvailable.$.cluster':{
      type:String,
      optional:true
    },
    'depatmentAvailable.$.chapter':{
      type:String,
      optional:true
    },
    'depatmentAvailable.$.subChapter':{
      type:String,
      optional:true
    },
    'depatmentAvailable.$.email':{
      type:String,
      optional:true
    },
    'depatmentAvailable.$.notify':{
      type:Boolean,
      optional:true
    },
    'depatmentAvailable.$.isActive':{
      type:Boolean,
      optional:true
    }
})


MlDepartments.attachSchema(MlDepartmentSchema);
