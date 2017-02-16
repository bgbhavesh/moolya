/**
 * Created by venkatasrinag on 25/1/17.
 */
import MlSchemas from '../../common/commonSchemas'

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
        type:Array,
        optional:true
    },
    'depatmentAvailable.$.cluster.$':{
      type:Object,
      optional:true
    },
    'depatmentAvailable.$.cluster.$.clusterId':{
      type:String,
      optional:true
    },
    'depatmentAvailable.$.chapter':{
        type:String,
        optional:true
    },
    'depatmentAvailable.$.community':{
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
MlSchemas["MlDepartments"] = MlDepartmentSchema;
