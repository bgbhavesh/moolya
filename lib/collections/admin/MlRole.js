
MlRoles = new Mongo.Collection('mlRoles');

MlRolesSchema = new SimpleSchema({
    roleName:{
        type:String,
        optional:false
    },

    displayName:{
        type:String,
        optional:false
    },

    roletype : {
        type:Array,
        optional:true
    },

    'roletype.$':{
      type:Object,
      optional:true
    },

    'roletype.$.roleName':{
      type:String,
      optional:true
    },

    description :{
        type:String,
        optional:true
    },

    assignRoles :{
        type:Array,
        optional:true
    },

    'assignRoles.$':{
        type:Object,
        optional:true
    },

    'assignRoles.$.cluster':{
        type:String,
        optional:true
    },

    'assignRoles.$.chapter':{
        type:String,
        optional:true
    },

    'assignRoles.$.subChapter':{
        type:String,
        optional:true
    },

    'assignRoles.$.department':{
        type:String,
        optional:true
    },

    'assignRoles.$.subDepartment':{
        type:String,
        optional:true
    },

    'assignRoles.$.isActive':{
        type:Boolean,
        optional:true
    },

    modules :{
        type:Array,
        optional:true
    },

    'modules.$':{
        type:Object,
        optional:true
    },

    'modules.$.moduleId':{
        type:String,
        optional:true
    },

    'modules.$.fieldRestrictions':{
        type:String,
        optional:true
    },

    "modules.$.permissions":{
        type:Array,
        optional:true
    },

    "modules.$.permissions.$":{
        type:Object,
        optional:true
    },

    "modules.$.permissions.$.actionId":{
        type:String,
        optional:true
    },

    'modules.$.permissions.$.validFrom':{
        type:Date,
        optional:true
    },

    'modules.$.permissions.$.validTo':{
        type:Date,
        optional:true
    },

    'modules.$.permissions.$.isActive':{
        type:String,
        optional:true
    },

    isActive :{
        type:Boolean,
        optional:false
    }
})

MlRoles.attachSchema(MlRolesSchema);
