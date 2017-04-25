/**
 * Created by venkatsrinag on 24/4/17.
 */
import SimpleSchema from "simpl-schema";

MlFunderPortfolio = new Mongo.Collection('mlFunderPortfolio');

funderAbout = new SimpleSchema({
    firstName:{
        type:String,
        optional:true
    },
    isfirstNamePrivate:{
        type:Boolean,
        optional:true
    },
    lastName:{
        type:String,
        optional:true
    },
    islastNamePrivate:{
        type:Boolean,
        optional:true
    },
    gender:{
        type:String,
        optional:true
    },
    isgenderPrivate:{
        type:Boolean,
        optional:true
    },
    category:{
        type:String,
        optional:true
    },
    iscategoryPrivate:{
        type:Boolean,
        optional:true
    },
    qualification:{
        type:String,
        optional:true
    },
    isqualificationPrivate:{
        type:Boolean,
        optional:true
    },
    employmentStatus:{
        type:String,
        optional:true
    },
    isemploymentStatusPrivate:{
        type:Boolean,
        optional:true
    },
    professionalTag:{
        type:String,
        optional:true
    },
    isprofessionalTagPrivate:{
        type:Boolean,
        optional:true
    },
    yearsOfExperience:{
        type:String,
        optional:true
    },
    isyearsOfExperiencePrivate:{
        type:Boolean,
        optional:true
    },
    industry:{
        type:String,
        optional:true
    },
    isindustryPrivate:{
        type:Boolean,
        optional:true
    },
    profession:{
        type:String,
        optional:true
    },
    isprofessionPrivate:{
        type:Boolean,
        optional:true
    },
    investmentForm:{
        type:String,
        optional:true
    },
    investmentCount:{
        type:String,
        optional:true
    },
    isInvestmentCountPrivate:{
        type:Boolean,
        optional:true
    },
    emailId:{
        type:String,
        optional:true
    },
    isEmailIdPrivate:{
        type:Boolean,
        optional:true
    },
    mobileNumber:{
        type:Number,
        optional:true
    },
    isMobileNumberPrivate:{
        type:Boolean,
        optional:true
    },
    linkedinUrl:{
        type:String,
        optional:true
    },
    isLinkedinUrlPrivate:{
        type:Boolean,
        optional:true
    },
    facebookUrl:{
        type:String,
        optional:true
    },
    isFacebookUrlPrivate:{
        type:Boolean,
        optional:true
    },

    investmentBudget:{
        type:Object,
        optional:true
    },

    "investmentBudget.from":{
        type:String,
        optional:true
    },

    "investmentBudget.isFromPrivate":{
        type:Boolean,
        optional:true
    },

    "investmentBudget.to":{
        type:String,
        optional:true
    },

    "investmentBudget.isToPrivate":{
        type:Boolean,
        optional:true
    }
})

investments = new SimpleSchema({
    dateOfInvestment:{
        type:String,
        optional:true
    },
    companyName:{
        type:String,
        optional:true
    },
    isCompanyNamePrivate:{
        type:Boolean,
        optional:true
    },
    typeOfFunding:{
        type:String,
        optional:true
    },
    istypeOfFundingPrivate:{
        type:Boolean,
        optional:true
    },
    aboutInvestment:{
        type:String,
        optional:true
    },
    isaboutInvestmentPrivate:{
        type:Boolean,
        optional:true
    },
    isPivate:{
        type:Boolean,
        optional:true
    }
})

principal = new SimpleSchema({
    // title:{},
    // firstName:{},
    // isFirstNamePrivate:{},
    // lastName:{},
    // isLastNamePrivate:{},
    // designation:{},
    // isDesignationPrivate:{},
    // companyName:{},
    // duration:{},
    // isDurationPrivate:{},
    // yearsOfExperience:{},
    // isyearsOfExperiencePrincipal:{},
    // qualification:{},
    // isQualificationPrivate:{},
    // aboutPrincipal:{},
    // isAboutPrincipalPrivate:{},
    // socialLinks[{
    //   socialLinkType,
    //   userId,
    //   isuserIdPrivate
    // }]
})

team = new SimpleSchema({

})

areaofInterest = new SimpleSchema({

})

successStories = new SimpleSchema({

})

FunderPortfolioSchema = new SimpleSchema({
    funderAbout:{
        type:funderAbout,
        optional: true
    },

    investments:{
        type:Array,
        optional:true
    },

    "investments.$":{
        type:investments,
        optional:true
    },

    principal:{
        type:Array,
        optional:true
    },

    "principal.$":{
        type:principal,
        optional:true
    },

    team:{
        type:Array,
        optional:true
    },

    "team.$":{
        type:team,
        optional:true
    },

    areaofInterest:{
        type:Array,
        optional:true
    },

    "areaofInterest.$":{
        type:areaofInterest,
        optional:true
    },

    successStories:{
        type:Array,
        optional:true
    },

    "successStories.$":{
        type:successStories,
        optional:true
    }
})

MlFunderPortfolio.attachSchema(FunderPortfolioSchema);
