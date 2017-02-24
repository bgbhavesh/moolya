moolyaProfile = new SimpleSchema({

    firstName:{
      type:String,
      optional:false
    },

    middleName:{
      type:String,
      optional:false
    },

    lastName:{
      type:String,
      optional:false
    },

    userType:{
        type:String,
        optional:false
    },

    roleType:{
        type:String,
        optional:false
    },

    assignedDepartment :{
        type:Array,
        optional:true
    },

    'assignedDepartment.$':{
      type:Object,
      optional:true
    },

    'assignedDepartment.$.department':{
      type:String,
      optional:true
    },

    'assignedDepartment.$.subDepartment':{
      type:String,
      optional:true
    },

    displayName:{
      type:String,
      optional:true
    },

    email:{
      type:String,
      optional:false
    },

    contact:{
      type:Array,
      optional:false
    },

    'contact.$':{
      type:Object,
      optional:true
    },

    'contact.$.contactNumberType':{
      type:String,
      optional:true
    },

    'contact.$.contactType':{
      type:String,
      optional:true
    },

    'contact.$.countryCode':{
      type:String,
      optional:true
    },

    'contact.$.number':{
      type:String,
      optional:true
    },

    'contact.$.isOTPValidated':{
      type:Boolean,
      optional:true
    },

    globalAssignment:{
      type:Boolean,
      optional:true
    },

    isActive:{
      type:Boolean,
      optional:true
    },

    userProfiles:{
        type:Array,
        optional:true
    },

    'userProfiles.$':{
        type:Object,
        optional:true
    },

    'userProfiles.$.isDefault':{
      type:Boolean,
      optional:true
    },

    'userProfiles.$.clusterId':{
        type:String,
        optional:true
    },

   'userProfiles.$.userRoles':{
      type:Array,
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
  'userProfiles.$.userRoles.$.clusterId':{
    type:String,
    optional:true
  },
    'userProfiles.$.userRoles.$.chapterId':{
        type:String,
        optional:true
    },
    'userProfiles.$.userRoles.$.subChapterId':{
        type:String,
        optional:true
    },
    'userProfiles.$.userRoles.$.communityId':{
        type:String,
        optional:true
    },
    'userProfiles.$.userRoles.$.isActive':{
        type:Boolean,
        optional:true
    },
    'userProfiles.$.userRoles.$.validFrom':{
        type:String,
        optional:true
    },

    'userProfiles.$.userRoles.$.validTo':{
      type:String,
      optional:true
    },

    'userProfiles.$.userRoles.$.hierarchyLevel':{
        type:String,
        optional:true
    },

    'userProfiles.$.userRoles.$.hierarchyCode':{
        type:String,
        optional:true
    },
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


