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

    // hiearchy:{
    //     type:String,
    //     optional:true
    // },

    userProfiles:{
        type:Array,
        optional:true
    },

    'userProfiles.$':{
        type:Object,
        optional:true
    },

    'userProfiles.$.clusterId':{
        type:String,
        optional:true
    },

    'userProfiles.$.userRoles.$':{
        type:Object,
        optional:true
    },

    'userProfiles.$.userRoles.$.roleId':{
        type:String,
        optional:true
    },

    'userProfiles.$.userRoles.$.chapterId':{
        type:String,
        optional:true
    },

    'userProfiles.$.userRoles.$.subchapterId':{
        type:String,
        optional:true
    },

    'userProfiles.$.userRoles.$.communityId':{
        type:String,
        optional:true
    },

    'userProfiles.$.userRoles.$.hiearchy':{
        type:String,
        optional:true
    }
})

InternalUprofile = new SimpleSchema({
    moolyaprofile:{
        type:moolyaProfile,
        optional:false
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


