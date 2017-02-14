/**
 * Created by muralidhar on 14/02/17.
 */
MlFilters = new Mongo.Collection('mlFilters');

MlFiltersSchema = new SimpleSchema({

    _id:{
      type:String,
      optional:false
    },

    filterName:{
        type:String,
        optional:false
    },

    aboutFilter:{
        type:String,
        optional:false
    },

    isActive:{
      type:String,
      optional:false
    },

    assignFilters :{
        type:Array,
        optional:true
    },

    'assignFilters.$':{
        type:Object,
        optional:true
    },

    'assignFilters.$.cluster':{
        type:String,
        optional:true
    },

    'assignFilters.$.chapter':{
        type:String,
        optional:true
    },

    'assignFilters.$.subChapter':{
        type:String,
        optional:true
    },

    'assignFilters.$.department':{
        type:String,
        optional:true
    },

    'assignFilters.$.subDepartment':{
        type:String,
        optional:true
    },

    'assignFilters.$.subDepartment':{
      type:String,
      optional:true
    },

    'assignFilters.$.role':{
      type:String,
      optional:true
    },

    transactionType :{
        type:String,
        optional:false
    },

    filterFields :{
      type:Array,
      optional:true
    },

    'filterFields.$':{
      type:Object,
      optional:true
    },

    'filterFields.$.fieldName':{
      type:String,
      optional:true
    },

    'filterFields.$.displayName':{
      type:String,
      optional:true
    },

    'filterFields.$.isAcive':{
      type:String,
      optional:true
    },

    'filterFields.$.isRestrictedFilter':{
      type:String,
      optional:true
    },

    'filterFields.$.fieldType':{
      type:String,
      optional:true
    }
})

MlFilters.attachSchema(MlFiltersSchema);
