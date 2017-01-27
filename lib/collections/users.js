moolyaProfile = new SimpleSchema({
    email:{
        type:String,
        optional:false
    },

    phoneNumber:{
        type:String,
        optional:false
    },

    profileName:{
        type:String,
        optional:true
    },

    department:{
        type:String,
        optional:true
    },

    subDepartment:{
        type:String,
        optional:true
    },

    role:{
        type:String,
        optional:true
    },

    Hiearchy:{
        type:String,
        optional:true
    }
})

InternalUprofile = new SimpleSchema({
    moolyaprofile:{
        type:moolyaProfile,
        optional:false
    },

    accessprofile:{
        type:Array,
        optional:true
    },

    'accessprofile.$':{
        type:Object,
        optional:true
    },

    'accessprofile.$.Effect':{
        type:String,
        optional:true
    },

    'accessprofile.$.Action':{
        type:String,
        optional:true
    },

    'accessprofile.$.Module':{
        type:Array,
        optional:true
    },

    'accessprofile.$.Module.$':{
        type:String,
        optional:true
    }

})

UserProfileSchema = new SimpleSchema({
    isInternaluser:{
        type:String,
        optional:false
    },

    isExternaluser:{
        type:String,
        optional:false
    },

    city:{
        type:String,
        optional:true
    },

    state:{
        type:String,
        optional:true
    },

    country:{
        type:String,
        optional:true
    },

    cluster:{
        type:String,
        optional:true
    },

    chapter:{
        type:String,
        optional:true
    },

    community:{
        type:String,
        optional:true
    },

    InternalUprofile:{
        type:InternalUprofile,
        optional:false
    }

})


