/**
 * Created by venkatasrinag on 3/4/17.
 */
import SimpleSchema from 'simpl-schema';


MlIdeatorPortfolio = new Mongo.Collection('mlIdeatorPortfolio');

ideatorAbout = new SimpleSchema({
    title:{
        type:String,
        optional:true
    },
    description:{
        type:String,
        optional:true
    },
    isTitlePublic:{
        type:Boolean,
        optional:true
    },
    isDescriptionPublic:{
        type:Boolean,
        optional:true
    }
})

portfolioIdeatorDetails = new SimpleSchema({
    firstName:{
        type:String,
        optional:true
    },
    isfirstNamePublic:{
        type:Boolean,
        optional:true
    },
    lastName:{
        type:String,
        optional:true
    },
    islastNamePublic:{
        type:Boolean,
        optional:true
    },
    gender:{
        type:String,
        optional:true
    },
    isGenderPublic:{
        type:Boolean,
        optional:true
    },
    qualification:{
        type:String,
        optional:true
    },
    isQualificationPublic:{
      type:Boolean,
      optional:true
    },
    employmentStatus:{
        type:String,
        optional:true
    },
    isEmploymentStatusPublic:{
        type:Boolean,
        optional:true
    },
    professionalTag:{
        type:String,
        optional:true
    },
    isProfessionalTag:{
      type:Boolean,
      optional:true
    },
    yearsofExperience:{
        type:String,
        optional:true
    },
    isYoePublic:{
        type:Boolean,
        optional:true
    },
    industry:{
        type:String,
        optional:true
    },
    isIndustryPublic:{
        type:Boolean,
        optional:true
    },
    profession:{
        type:String,
        optional:true
    },

    isProfession:{
        type:Boolean,
        optional:true
    },
    employerName:{
        type:String,
        optional:true
    },
    isEmployerNamePublic:{
        type:Boolean,
        optional:true
    },
    profilePic:{
        type:String,
        optional:true
    },
    mobileNumber:{
        type:String,
        optional:true
    },
    isMobileNumberPublic:{
        type:Boolean,
        optional:true
    },
    emailId:{
        type:String,
        optional:true
    },
    isEmailIdPublic:{
        type:Boolean,
        optional:true
    },
    facebookId:{
        type:String,
        optional:true
    },
    isfacebookIdPublic:{
        type:Boolean,
        optional:true
    },
    linkedInId:{
        type:String,
        optional:true
    },
    islinkedInIdPublic:{
        type:Boolean,
        optional:true
    },
    twitterId:{
        type:String,
        optional:true
    },
    isTwitterIdPublic:{
        type:Boolean,
        optional:true
    },
    gplusId:{
        type:String,
        optional:true
    },
    isGplusIdPublic:{
        type:Boolean,
        optional:true
    }
})

problemSolution = new SimpleSchema({
    problemImage:{
        type:String,
        optional:true
    },
    problemStatment:{
        type:String,
        optional:true
    },
    solutions:{
        type:String,
        optional:true
    }
})

audience = new SimpleSchema({
    description:{
        type:String,
        optional:true
    },
    image:{
        type:String,
        optional:true
    }
})

strategyPlans = new SimpleSchema({
    description:{
        type:String,
        optional:true
    }
})

intellectualPlanning = new SimpleSchema({
    description:{
        type:String,
        optional:true
    }
})

lookingFor = new SimpleSchema({
    description:{
        type:String,
        optional:true
    }
})

IdeatorPortfolioSchema = new SimpleSchema({
    userId:{
        type:String,
        optional:true
    },
    communityId:{
        type:String,
        optional:true
    },
    portfolioDetailsId:{
        type:String,
        optional:true
    },
    ideatorabout:{
        type:ideatorAbout,
        optional:true
    },

    portfolioIdeatorDetails:{
        type:portfolioIdeatorDetails,
        optional:true
    },

    problemSolution:{
        type:problemSolution,
        optional:true
    },

    audience:{
        type:audience,
        optional:true
    },

    strategyPlans:{
        type:strategyPlans,
        optional:true
    },

    intellectualPlanning:{
        type:intellectualPlanning,
        optional:true
    },

    lookingFor:{
        type:lookingFor,
        optional:true
    }

})

MlIdeatorPortfolio.attachSchema(IdeatorPortfolioSchema);
