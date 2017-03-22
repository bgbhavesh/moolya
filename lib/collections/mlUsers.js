import SimpleSchema from 'simpl-schema';
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
      optional:false
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
  'userProfiles.$.userRoles.$.roleId': {
    type: String,
    optional: true
  },
  'userProfiles.$.userRoles.$.roleName': {
    type: String,
    optional: true
  },
  'userProfiles.$.userRoles.$.departmentId': {
    type: String,
    optional: true
  },
  'userProfiles.$.userRoles.$.departmentName': {
    type: String,
    optional: true
  },
  'userProfiles.$.userRoles.$.subDepartmentId': {
    type: String,
    optional: true
  },
  'userProfiles.$.userRoles.$.subDepartmentName': {
    type: String,
    optional: true
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
        type:SimpleSchema.Integer,
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

externalUserProfile = new SimpleSchema({
    userProfiles:{
        type:Array,
        optional:true
    },
    'userProfiles.$':{
        type:Object,
        optional:true
    },
    'userProfiles.$.registrationId':{
        type:String,
        optional:true
    },
    'userProfiles.$.countryName':{
      type:String,
      optional:true
    },
    'userProfiles.$.countryId':{
        type:String,
        optional:true
    },
    'userProfiles.$.cityName':{
        type:String,
        optional:true
    },
    'userProfiles.$.cityId':{
        type:String,
        optional:true
    },
    'userProfiles.$.mobileNumber':{
        type:String,
        optional:true
    },
    'userProfiles.$.clusterId':{
        type:String,
        optional:true
    },
    'userProfiles.$.clusterName':{
        type:String,
        optional:true
    },
    'userProfiles.$.chapterId':{
        type:String,
        optional:true
    },
    'userProfiles.$.chapterName':{
        type:String,
        optional:true
    },
    'userProfiles.$.subChapterId':{
        type:String,
        optional:true
    },
    'userProfiles.$.subChapterName':{
        type:String,
        optional:true
    },
    'userProfiles.$.communityId':{
        type:String,
        optional:true
    },
    'userProfiles.$.communityName':{
        type:String,
        optional:true
    },
    'userProfiles.$.communityType':{
        type:String,
        optional:true
    },
    'userProfiles.$.isDefault':{
        type:Boolean,
        optional:true
    },
    'userProfiles.$.isProfileActive':{
        type:Boolean,
        optional:true
    },
    'userProfiles.$.accountType':{
        type:String,
        optional:true
    }
})

UserProfileSchema = new SimpleSchema({
    isInternaluser:{
        type:Boolean,
        optional:false
    },

    isExternaluser:{
        type:Boolean,
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
    },

    externalUserProfile:{
      type:externalUserProfile,
      optional:true
    },

    isActive:{
        type:Boolean,
        optional:true
    },

    isSystemDefined : {
      type : Boolean,
      optional : true,
      defaultValue : false
    }


})


