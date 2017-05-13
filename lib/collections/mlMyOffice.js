/**
 * Created by venkatsrinag on 11/5/17.
 */
import SimpleSchema from 'simpl-schema';
import MlCollections from '../common/commonSchemas'

MlMyOffice = new Mongo.Collection('mlMyOffice');

MlMyOfficeMembers = new SimpleSchema({
    userId:{
        type:String,
        optional:true
    },
    firstName:{
        type:String,
        optional:true
    },
    lastName:{
        type:String,
        optional:true
    },
    mobileNumber:{
        type:String,
        optional:true
    },
    emailId:{
        type:String,
        optional:true
    },
    userType:{
        type:String,
        optional:true
    },
    description:{
        type:String,
        optional:true
    },
    name:{
        type:String,
        optional:true
    },
    joiningDate:{
        type:String,
        optional:true
    },
    role:{
        type:String,
        optional:true
    },
    isActive:{
        type:Boolean,
        optional:true
    },

    isPrincipal:{
        type:Boolean,
        optional:true
    },

    isIndependent:{
        type:Boolean,
        optional:true
    },
    isInternalUserInteraction:{
        type:Boolean,
        optional:true
    },
    isExternalUserInteraction:{
        type:Boolean,
        optional:true
    },
    isFreeze:{
        type:Boolean,
        optional:true
    },
    isRetire:{
        type:Boolean,
        optional:true
    }
})

MlMyOfficeSchema = new SimpleSchema({
    userId:{
        type:String,
        optional:true
    },

    totalCount:{
        type:Number,
        optional:true
    },
    principalUserCount:{
        type:Number,
        optional:true
    },
    teamUserCount:{
        type:Number,
        optional:true
    },
    availableCommunities:{
        type:Array,
        optional:true
    },

    'availableCommunities.$':{
        type:Object,
        optional:true
    },

    'availableCommunities.$.communityName':{
        type:String,
        optional:true
    },

    'availableCommunities.$.communityId':{
        type:String,
        optional:true
    },

    'availableCommunities.$.userCount':{
        type:String,
        optional:true
    },

    barerCount:{
        type:Number,
        optional:true
    },
    description:{
        type:String,
        optional:true
    },
    branchType:{
        type:String,
        optional:true
    },
    location:{
        type:String,
        optional:true
    },
    streetLocality:{
      type:String,
      optional:true
    },
    landmark:{
        type:String,
        optional:true
    },
    area:{
        type:String,
        optional:true
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
    zipCode:{
        type:Number,
        optional:true
    },
    about:{
      type:String,
      optional:true
    },
    isActive:{
        type:Boolean,
        optional:true
    },
    officeMembers:{
        type:Array,
        optional:true
    },
    'officeMembers.$':{
        type:MlMyOfficeMembers,
        optional:true
    },
    paymentLink:{
        type:String,
        optional:true
    }
})


MlMyOffice.attachSchema(MlMyOfficeSchema);
MlCollections['MlMyOffice'] = MlMyOffice;
