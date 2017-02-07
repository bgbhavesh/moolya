
MlRole = new Mongo.Collection('mlRoles');

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

    permissions :{
        type:Array,
        optional:true
    },

    'permissions.$':{
        type:Object,
        optional:true
    },

    'permissions.$.actionId':{
        type:String,
        optional:true
    },

    'permissions.$.moduleId':{
        type:String,
        optional:true
    },

    'permissions.$.fieldRestrictions':{
        type:String,
        optional:true
    },

    'permissions.$.validFrom':{
        type:Date,
        optional:true
    },

    'permissions.$.validTo':{
        type:Date,
        optional:true
    },

    'permission.$.isActive':{
        type:String,
        optional:true
    },

    isActive :{
        type:Boolean,
        optional:false
    }
})

MlRole.attachSchema(MlRolesSchema);
