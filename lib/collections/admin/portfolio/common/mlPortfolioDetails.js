/**
 * Created by venkatasrinag on 4/4/17.
 */
import SimpleSchema from 'simpl-schema';

MlPortfolioDetails = new Mongo.Collection('mlPortfolioDetails');

portfolioDetails = new SimpleSchema({
    transcationType:{
        type:String,
        optional:true
    },

    portfolioUserName:{
      type:String,
      optional:true
    },

    userId:{
      type:String,
      optional:true
    },

    contactNumber:{
        type:String,
       optional:true
    },

    userType:{
        type:String,
        optional:true
    },

    communityType:{
       type:String,
       optional:true
    },

    communityCode:{
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

    subChapter:{
        type:String,
        optional:true
    },

    communityId:{
        type:String,
        optional:true
    },

    subscriptionType:{
        type:String,
        optional:true
    },

    source:{
        type:String,
        optional:true
    },

    createdBy:{
        type:String,
        optional:true
    },

    status:{
        type:String,
        optional:true
    },

    assignedTo:{
        type:String,
        optional:true
    },

    progress:{
        type:String,
        optional:true
    },

    isPublic:{
        type:Boolean,
        optional:true
    },

    isGoLive:{
        type:Boolean,
        optional:true
    },

    isActive:{
        type:Boolean,
        optional:true
    }
})


MlPortfolioDetails.attachSchema(portfolioDetails);
