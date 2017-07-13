import SimpleSchema from "simpl-schema";
import MlCollections from '../../../common/commonSchemas'

MlStartupPortfolio = new Mongo.Collection('mlStartupPortfolio');

startupManagement = new SimpleSchema({
  title:{
    type:String,
    optional:true
  },
  isTitlePrivate:{
    type:Boolean,
    optional:true
  },
  firstName:{
    type:String,
    optional:true
  },
  isFirstNamePrivate:{
    type:Boolean,
    optional:true
  },
  lastName:{
    type:String,
    optional:true
  },
  isLastNamePrivate:{
    type:Boolean,
    optional:true
  },
  middleName:{
    type:String,
    optional:true
  },
  isMiddleNamePrivate:{
    type:Boolean,
    optional:true
  },
  qualification:{
    type:String,
    optional:true
  },
  isQualificationPrivate:{
    type:Boolean,
    optional:true
  },
  certification:{
    type:String,
    optional:true
  },
  isCertificationPrivate:{
    type:Boolean,
    optional:true
  },
  profilePic:{
    type:String,
    optional:true
  },
  isProfilePicPrivate:{
    type:Boolean,
    optional:true
  },
  gender:{
    type:String,
    optional:true
  },
  isGenderPrivate:{
    type:Boolean,
    optional:true
  },
  designation:{
    type:String,
    optional:true
  },
  isDesignationPrivate:{
    type:Boolean,
    optional:true
  },
  yearsOfExperience:{
    type:String,
    optional:true
  },
  isYOEPrivate:{
    type:Boolean,
    optional:true
  },
  joiningDate:{
    type:String,
    optional:true
  },
  isJoiningDatePrivate:{
    type:Boolean,
    optional:true
  },
  firstJobJoiningDate:{
    type:String,
    optional:true
  },
  isFJJDPrivate:{
    type:Boolean,
    optional:true
  },
  universities:{
    type:String,
    optional:true
  },
  isUniversitiesPrivate:{
    type:Boolean,
    optional:true
  },
  awards:{
    type:String,
    optional:true
  },
  isAwardsPrivate:{
    type:Boolean,
    optional:true
  },
  linkedInUrl:{
    type:String,
    optional:true
  },
  isLinkedInUrlPrivate:{
    type:Boolean,
    optional:true
  },
  about:{
    type:String,
    optional:true
  },
  'logo':{
    type: Object,
    optional:true
  },
  'logo.fileUrl':{
    type:String,
    optional:false
  },
  'logo.fileName':{
    type:String,
    optional:false
  },
  isAboutPrivate:{
    type:String,
    optional:true
  },
  index:{
    type: Number,
    optional:true
  }
})


startupClients = new SimpleSchema({
  // 'companyId':{
  //   type:String,
  //   optional:true
  // },
  'companyName':{
    type:String,
    optional:true
  },
  'isCompanyNamePrivate':{
    type:Boolean,
    optional:true
  },
  'description':{
    type:String,
    optional:true
  },
  'isDescriptionPrivate':{
    type:Boolean,
    optional:true
  },
  'logo':{
    type: Object,
    optional:true
  },
  'logo.fileUrl':{
    type:String,
    optional:false
  },
  'logo.fileName':{
    type:String,
    optional:false
  },
  'makePrivate':{
    type:Boolean,
    optional:true
  },
  index:{
    type: Number,
    optional:true
  }

})

startupBranches = new SimpleSchema({

/*  'addressType':{
    type:String,
    optional:true
  },*/
  'addressTypeId':{
    type:String,
    optional:true
  },
  'name':{
    type:String,
    optional:true
  },
  'isNamePrivate':{
    type:Boolean,
    optional:true
  },
  'phoneNumber':{
    type:String,
    optional:true
  },
  'isPhoneNumberPrivate':{
    type:Boolean,
    optional:true
  },
  'address1':{
    type:String,
    optional:true
  },
  'isAddrssOnePrivate':{
    type:Boolean,
    optional:true
  },
  'address2':{
    type:String,
    optional:true
  },
  'isAddressTwoPrivate':{
    type:Boolean,
    optional:true
  },
  'landmark':{
    type:String,
    optional:true
  },
  'isLandmarkPrivate':{
    type:Boolean,
    optional:true
  },
  'area':{
    type:String,
    optional:true
  },
  'isAreaPrivate':{
    type:Boolean,
    optional:true
  },
  'city':{
    type:String,
    optional:true
  },
  'isCityPrivate':{
    type:Boolean,
    optional:true
  },
  'state':{
    type:String,
    optional:true
  },
  'isStatePrivate':{
    type:Boolean,
    optional:true
  },
  'country':{
    type:String,
    optional:true
  },
  'isCountryPrivate':{
    type:Boolean,
    optional:true
  },
  addressImage: {
    type: String,
    optional: true
  },
/*  'addressImage.$': {
    type: Object,
    optional: true
  },
  'addressImage.$.fileUrl':{
    type:String,
    optional:true
  },
  'addressImage.$.fileName':{
    type:String,
    optional:true
  },*/
  'isAddressImagePrivate':{
    type:Boolean,
    optional:true
  },
  'logo':{
    type: Object,
    optional:true
  },
  'logo.fileUrl':{
    type:String,
    optional:false
  },
  'logo.fileName':{
    type:String,
    optional:false
  },
  'makePrivate':{
    type:Boolean,
    optional:true
  },
/*  'makePrivate':{
    type:Boolean,
    optional:true
  },*/
  index:{
    type: Number,
    optional:true
  }

})


assets = new SimpleSchema({
  'assetTypeName':{
    type:String,
    optional:true
  },
  'assetTypeId':{
    type:String,
    optional:true
  },
  'isAssetTypePrivate':{
    type:Boolean,
    optional:true
  },
  'quantity':{
    type:String,
    optional:true
  },
  'isQuantityTypePrivate':{
    type:Boolean,
    optional:true
  },
  'description':{
    type:String,
    optional:true
  },
  'isDescriptionPrivate':{
    type:Boolean,
    optional:true
  },
  'logo':{
    type: Object,
    optional:true
  },
  'logo.fileUrl':{
    type:String,
    optional:false
  },
  'logo.fileName':{
    type:String,
    optional:false
  },
  'makePrivate':{
    type:Boolean,
    optional:true
  },
  index:{
    type: Number,
    optional:true
  }
})


technologies = new SimpleSchema({
 'technologyName':{
    type:String,
    optional:true
  },
  'technologyId':{
    type:String,
    optional:true
  },
  'isTechnologyPrivate':{
    type:Boolean,
    optional:true
  },
  'description':{
    type:String,
    optional:true
  },
  'isDescriptionPrivate':{
    type:Boolean,
    optional:true
  },
  'logo':{
    type: Object,
    optional:true
  },
  'logo.fileUrl':{
    type:String,
    optional:false
  },
  'logo.fileName':{
    type:String,
    optional:false
  },
  'makePrivate':{
    type:Boolean,
    optional:true
  },
  index:{
    type: Number,
    optional:true
  }
})

startInvestor = new SimpleSchema({
  'name':{
    type:String,
    optional:true
  },
  'isNamePrivate':{
    type:Boolean,
    optional:true
  },
  'investorImage':{
    type:String,
    optional:true
  },
  'isInvestorImagePrivate':{
    type:Boolean,
    optional:true
  },
  // 'fundingType':{
  //   type:String,
  //   optional:true
  // },
  'fundingTypeId':{
    type:String,
    optional:true
  },
  'investmentAmount':{
    type:String,
    optional:true
  },
  'isInvestmentAmountPrivate':{
    type:Boolean,
    optional:true
  },
  'description':{
    type:String,
    optional:true
  },
  'isDescriptionPrivate':{
    type:Boolean,
    optional:true
  },
  'logo':{
    type: Object,
    optional:true
  },
  'logo.fileUrl':{
    type:String,
    optional:false
  },
  'logo.fileName':{
    type:String,
    optional:false
  },
  'makePrivate':{
    type:Boolean,
    optional:true
  },
  index:{
    type: Number,
    optional:true
  }
})

startupLookingFor = new SimpleSchema({
  'lookingForName':{
     type:String,
     optional:true
  },
  typeId:{
    type:String,
    optional:true
  },
  'isTypePrivate':{
    type:Boolean,
    optional:true
  },
  'description':{
    type:String,
    optional:true
  },
  'isDescriptionPrivate':{
    type:Boolean,
    optional:true
  },
  'logo':{
    type: Object,
    optional:true
  },
  'logo.fileUrl':{
    type:String,
    optional:false
  },
  'logo.fileName':{
    type:String,
    optional:false
  },
  'makePrivate':{
    type:Boolean,
    optional:true
  },
  index:{
    type: Number,
    optional:true
  }
})

information = new SimpleSchema({
  description:{
    type:String,
    optional:true
  },
  isDescriptionPrivate:{
    type:Boolean,
    optional:true
  }
})

serviceProducts = new SimpleSchema({
  description:{
    type:String,
    optional:true
  },
  isDescriptionPrivate:{
    type:Boolean,
    optional:true
  }
})

legal = new SimpleSchema({
  description:{
    type:String,
    optional:true
  },
  isDescriptionPrivate:{
    type:Boolean,
    optional:true
  }
})

rating = new SimpleSchema({
  rating:{
    type:String,
    optional:true
  },
  isRatingPrivate:{
    type:Boolean,
    optional:true
  }
})

aboutUs = new SimpleSchema({
  logo: {
    type: Array,
    optional: true
  },
  'logo.$': {
    type: Object,
    optional: true
  },
  'logo.$.fileUrl':{
    type:String,
    optional:true
  },
  'logo.$.fileName':{
    type:String,
    optional:true
  },
  description:{
    type:String,
    optional:true
  },
  annotatorId:{
    type:String,
    optional:true
  },
  isLogoPrivate:{
    type:Boolean,
    optional:true
  },
  isDescriptionPrivate:{
    type:Boolean,
    optional:true
  }
})

startupAwardsRecognition = new SimpleSchema({
  awardName:{
    type:String,
    optional:true
  },
  'awardId':{
    type:String,
    optional:true
  },
  isAwardPrivate:{
    type:Boolean,
    optional:true
  },
  year:{
    type:String,
    optional:true
  },
  isYearPrivate:{
    type:Boolean,
    optional:true
  },
  description:{
    type:String,
    optional:true
  },
  isDescriptionPrivate:{
    type:Boolean,
    optional:true
  },
  'logo': {
    type: Object,
    optional: true
  },
  'logo.fileUrl':{
    type:String,
    optional:true
  },
  'logo.fileName':{
    type:String,
    optional:true
  },
  makePrivate:{
    type:Boolean,
    optional:true
  },
  index:{
      type: Number,
      optional:true
  }
})
startupMemberships = new SimpleSchema({
  description:{
    type:String,
    optional:true
  },
  isDescriptionPrivate:{
    type:Boolean,
    optional:true
  }
})
startupCompliances = new SimpleSchema({
  description:{
    type:String,
    optional:true
  },
  isDescriptionPrivate:{
    type:Boolean,
    optional:true
  }
})

startupLicenses = new SimpleSchema({
  description:{
    type:String,
    optional:true
  },
  isDescriptionPrivate:{
    type:Boolean,
    optional:true
  }
})

profitRevenueLiability = new SimpleSchema({
  profitRevenueLiability:{
    type:Array,
    optional:true
  },
  'profitRevenueLiability.$':{
    type:Object,
    optional:true
  },
  'profitRevenueLiability.$.fromMonth':{
    type:Date,
    optional:true
  },
  'profitRevenueLiability.$.fromYear':{
    type:Date,
    optional:true
  },
  'profitRevenueLiability.$.toMonth':{
    type:Date,
    optional:true
  },
  'profitRevenueLiability.$.toYear':{
    type:Date,
    optional:true
  },
  'profitRevenueLiability.$.entityType':{
    type:String,
    optional:true
  },
  'profitRevenueLiability.$.valueType':{
    type:String,
    optional:true
  },
  'profitRevenueLiability.$.value':{
    type:String,
    optional:true
  },
  'profitRevenueLiability.$.about':{
    type:String,
    optional:true
  }
})

employmentOfCompany = new SimpleSchema({
  employmentOfCompany:{
    type:Array,
    optional:true
  },
  'employmentOfCompany.$':{
    type:Object,
    optional:true
  },
  'employmentOfCompany.$.about':{    //profit, revenue
    type:String,
    optional:true
  },
  'employmentOfCompany.$.fromMonth':{
    type:Date,
    optional:true
  },
  'employmentOfCompany.$.fromYear':{
    type:Date,
    optional:true
  },
  'employmentOfCompany.$.toMonth':{
    type:Date,
    optional:true
  },
  'employmentOfCompany.$.toYear':{
    type:Date,
    optional:true
  },
  'employmentOfCompany.$.numberOfEmployment':{    //percentage
    type:Number,
    optional:true
  }
})


reviewOfCompany = new SimpleSchema({
  reviewOfCompany:{
    type:Array,
    optional:true
  },
  'reviewOfCompany.$':{
    type:Object,
    optional:true
  },
  'reviewOfCompany.$.year':{
    type:Date,
    optional:true
  },
  'reviewOfCompany.$.value':{
    type:Number,
    optional:true
  },
  'reviewOfCompany.$.about':{
    type:String,
    optional:true
  }
})



employeeBreakupDepartment = new SimpleSchema({
  employeeBreakupDepartment:{
    type:Array,
    optional:true
  },
  'employeeBreakupDepartment.$':{
    type:Object,
    optional:true
  },
  'employeeBreakupDepartment.$.department':{
    type:String,
    optional:true
  },
  'employeeBreakupDepartment.$.fromYear':{
    type:Date,
    optional:true
  },
  'employeeBreakupDepartment.$.fromMonth':{
    type:Date,
    optional:true
  },
  'employeeBreakupDepartment.$.toYear':{
    type:Date,
    optional:true
  },
  'employeeBreakupDepartment.$.toMonth':{
    type:Date,
    optional:true
  },
  'employeeBreakupDepartment.$.numberOfEmployment':{
    type:Number,
    optional:true
  },
  'employeeBreakupDepartment.$.about':{
    type:String,
    optional:true
  }
})



charts = new SimpleSchema({
  charts:{
    type:Array,
    optional:true
  },
  'charts.$':{
    type : employmentOfCompany,
    optional:true
  },
  'charts.$':{
    type : profitRevenueLiability,
    optional:true
  },
  'charts.$':{
    type : reviewOfCompany,
    optional:true
  },
  'charts.$':{
    type : employeeBreakupDepartment,
    optional:true
  }
})


StartupPortfolioSchema = new SimpleSchema({
  userId:{
    type:String,
    optional:true
  },
  communityType:{
    type:String,
    optional:true
  },
  portfolioDetailsId:{
    type:String,
    optional:true
  },
  licenses:{
    type:startupLicenses,
    optional:true
  },
  compliances:{
    type:startupCompliances,
    optional:true
  },
  memberships:{
    type:startupMemberships,
    optional:true
  },
  awardsRecognition:{
    type:Array,
    optional:true
  },
  'awardsRecognition.$':{
    type:startupAwardsRecognition,
    optional:true
  },
  aboutUs:{
    type:aboutUs,
    optional:true
  },
  rating:{
    type:rating,
    optional:true
  },
  serviceProducts:{
    type:serviceProducts,
    optional:true
  },
  information:{
    type:information,
    optional:true
  },
  lookingFor:{
    type:Array,
    optional:true
  },
  'lookingFor.$':{
    type:startupLookingFor,
    optional:true
  },
  investor:{
    type:Array,
    optional:true
  },
  "investor.$":{
    type:startInvestor,
    optional:true
  },
  technologies:{
    type:Array,
    optional:true
  },
  "technologies.$":{
    type:technologies,
    optional:true
  },
  assets:{
    type:Array,
    optional:true
  },
  "assets.$":{
    type:assets,
    optional:true
  },

  branches:{
    type:Array,
    optional:true
  },
  "branches.$":{
    type:startupBranches,
    optional:true
  },
  clients:{
    type:Array,
    optional:true
  },
  "clients.$":{
    type:startupClients,
    optional:true
  },
  management:{
    type:Array,
    optional:true
  },

  'management.$':{
      type:startupManagement,
      optional:true
  },

  charts:{
    type:charts,
    optional:true
  },
  legalIssue:{
    type:legal,
    optional:true
  },
})

MlStartupPortfolio.attachSchema(StartupPortfolioSchema);

//data model not yet implemented

// reports{
//   balanceSheet{
//   },
//
//   profitLoss{
//   },
//
//   cashFlow{
//   }.
//
//   quaterlyReport{
//   },
//
//   halfYearlyReport{
//   },
//
//   yearlyReport{
//   }
// },
MlCollections['MlStartupPortfolio'] = MlStartupPortfolio;
