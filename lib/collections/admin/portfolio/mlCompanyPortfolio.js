import SimpleSchema from "simpl-schema";
import MlCollections from '../../../common/commonSchemas'

MlCompanyPortfolio = new Mongo.Collection('mlCompanyPortfolio');

managementAndPromotersSchema = new SimpleSchema({
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


companyClients = new SimpleSchema({
  // 'companyId':{
  //   type:String,
  //   optional:true
  // },
  'clientName':{
    type:String,
    optional:true
  },
  'isClientNamePrivate':{
    type:Boolean,
    optional:true
  },
  'clientDescription':{
    type:String,
    optional:true
  },
  'isClientDescriptionPrivate':{
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

dataTypes = new SimpleSchema({
  'balanceSheet':{
    type: Array,
    optional:true
  },
  'balanceSheet.$': {
    type: Object,
    optional: true
  },
  'balanceSheet.$.fileUrl':{
    type:String,
    optional:true
  },
  'balanceSheet.$.fileName':{
    type:String,
    optional:true
  },
  'profitAndLoss':{
    type: Array,
    optional:true
  },
  'profitAndLoss.$': {
    type: Object,
    optional: true
  },
  'profitAndLoss.$.fileUrl':{
    type:String,
    optional:true
  },
  'profitAndLoss.$.fileName':{
    type:String,
    optional:true
  },
  'quaterlyReport':{
    type: Array,
    optional:true
  },
  'quaterlyReport.$': {
    type: Object,
    optional: true
  },
  'quaterlyReport.$.fileUrl':{
    type:String,
    optional:true
  },
  'quaterlyReport.$.fileName':{
    type:String,
    optional:true
  },
  'yearlyReport':{
    type: Array,
    optional:true
  },
  'yearlyReport.$': {
    type: Object,
    optional: true
  },
  'yearlyReport.$.fileUrl':{
    type:String,
    optional:true
  },
  'yearlyReport.$.fileName':{
    type:String,
    optional:true
  },
  'halfYearlyReport':{
    type: Array,
    optional:true
  },
  'halfYearlyReport.$': {
    type: Object,
    optional: true
  },
  'halfYearlyReport.$.fileUrl':{
    type:String,
    optional:true
  },
  'halfYearlyReport.$.fileName':{
    type:String,
    optional:true
  },
  'annualReport':{
    type: Array,
    optional:true
  },
  'annualReport.$': {
    type: Object,
    optional: true
  },
  'annualReport.$.fileUrl':{
    type:String,
    optional:true
  },
  'annualReport.$.fileName':{
    type:String,
    optional:true
  },
  'cashFlow':{
    type: Array,
    optional:true
  },
  'cashFlow.$': {
    type: Object,
    optional: true
  },
  'cashFlow.$.fileUrl':{
    type:String,
    optional:true
  },
  'cashFlow.$.fileName':{
    type:String,
    optional:true
  },
  'shareHoldings':{
    type: Array,
    optional:true
  },
  'shareHoldings.$': {
    type: Object,
    optional: true
  },
  'shareHoldings.$.fileUrl':{
    type:String,
    optional:true
  },
  'shareHoldings.$.fileName':{
    type:String,
    optional:true
  },
  'ratio':{
    type: Array,
    optional:true
  },
  'ratio.$': {
    type: Object,
    optional: true
  },
  'ratio.$.fileUrl':{
    type:String,
    optional:true
  },
  'ratio.$.fileName':{
    type:String,
    optional:true
  },
  'capitalStructure':{
    type: Array,
    optional:true
  },
  'capitalStructure.$': {
    type: Object,
    optional: true
  },
  'capitalStructure.$.fileUrl':{
    type:String,
    optional:true
  },
  'capitalStructure.$.fileName':{
    type:String,
    optional:true
  }
})

incubatorsSchema = new SimpleSchema({
  startupIncubators:{
    type:String,
    optional:true
  },
  isStartupIncubatorsPrivate:{
    type:Boolean,
    optional:true
  },
  sectorsAndServices:{
    type:String,
    optional:true
  },
  isSectorsAndServicesPrivate:{
    type:Boolean,
    optional:true
  },
  listOfIncubators:{
    type:Array,
    optional:true
  },
  isListOfIncubatorsPrivate:{
    type:Boolean,
    optional:true
  }
})

serviceProducts = new SimpleSchema({
  spDescription:{
    type:String,
    optional:true
  },
  isSPDescriptionPrivate:{
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
  companyDescription:{
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
  isCompanyDescriptionPrivate:{
    type:Boolean,
    optional:true
  }
})

companyAwardsRecognition = new SimpleSchema({
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
  awardsDescription:{
    type:String,
    optional:true
  },
  isAwardsDescriptionPrivate:{
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
companyIntrapreneur = new SimpleSchema({
  intrapreneurName:{
    type:String,
    optional:true
  },
  // 'awardId':{
  //   type:String,
  //   optional:true
  // },
  isIntrapreneurNamePrivate:{
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
  intrapreneurDescription:{
    type:String,
    optional:true
  },
  isIntrapreneurDescriptionPrivate:{
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
companyMemberships = new SimpleSchema({
  membershipsDescription:{
    type:String,
    optional:true
  },
  isMembershipsDescriptionPrivate:{
    type:Boolean,
    optional:true
  }
})
companyCompliances = new SimpleSchema({
  compliancesDescription:{
    type:String,
    optional:true
  },
  isCompliancesDescriptionPrivate:{
    type:Boolean,
    optional:true
  }
})

companyLicenses = new SimpleSchema({
  licensesDescription:{
    type:String,
    optional:true
  },
  isLicensesDescriptionPrivate:{
    type:Boolean,
    optional:true
  }
})

profitRevenueLiability = new SimpleSchema({
  prlFromMonth:{
    type:String,
    optional:true
  },
  prlFromYear:{
    type:String,
    optional:true
  },
  prlToMonth:{
    type:String,
    optional:true
  },
  prlToYear:{
    type:String,
    optional:true
  },
  prlEntityType:{
    type:String,
    optional:true
  },
  pelValueType:{
    type:String,
    optional:true
  },
  prlValue:{
    type:Number,
    optional:true
  },
  prlabout:{
    type:String,
    optional:true
  },
  index:{    //percentage
    type:Number,
    optional:true
  }
})

employmentOfCompany = new SimpleSchema({
  eofAbout:{    //profit, revenue
    type:String,
    optional:true
  },
  eofFromMonth:{
    type:String,
    optional:true
  },
  eofFromYear:{
    type:String,
    optional:true
  },
  eofToMonth:{
    type:String,
    optional:true
  },
  eofToYear:{
    type:String,
    optional:true
  },
  eofNumberOfEmployment:{
    type:Number,
    optional:true
  },
  index:{
    type:Number,
    optional:true
  }
})


reviewOfCompany = new SimpleSchema({
  rofYear:{
    type:String,
    optional:true
  },
  rofValue:{
    type:Number,
    optional:true
  },
  rofAbout:{
    type:String,
    optional:true
  },
  index:{    //percentage
    type:Number,
    optional:true
  }
})



employeeBreakupDepartment = new SimpleSchema({
  ebdDepartment:{
    type:String,
    optional:true
  },
  ebdFromYear:{
    type:String,
    optional:true
  },
  ebdFromMonth:{
    type:String,
    optional:true
  },
  ebdToYear:{
    type:String,
    optional:true
  },
  ebdToMonth:{
    type:String,
    optional:true
  },
  ebdNumberOfEmployment:{
    type:Number,
    optional:true
  },
  ebdAbout:{
    type:String,
    optional:true
  },
  index:{    //percentage
    type:Number,
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

crsSchema = new SimpleSchema({
  evolutionDescription:{
    type:String,
    optional:true
  },
  isEvolutionDescriptionPrivate:{
    type:Boolean,
    optional:true
  },
  achivements:{
    type:Array,
    optional:true
  },
  'achivements.$':{
    type:companyAwardsRecognition,
    optional:true
  },
  policyDescription:{
    type:String,
    optional:true
  },
  isPolicyDescriptionPrivate:{
    type:Boolean,
    optional:true
  },

  employmentOfCompanyChart:{
    type:Array,
    optional:true
  },

  'employmentOfCompanyChart.$':{
    type:employmentOfCompany,
    optional:true
  },

  reviewOfCompanyChart:{
    type:Array,
    optional:true
  },

  'reviewOfCompanyChart.$':{
    type:reviewOfCompany,
    optional:true
  },

  profitRevenueLiabilityChart:{
    type:Array,
    optional:true
  },

  'profitRevenueLiabilityChart.$':{
    type:profitRevenueLiability,
    optional:true
  },

  employeeBreakupDepartmentChart:{
    type:Array,
    optional:true
  },

  'employeeBreakupDepartmentChart.$':{
    type:employeeBreakupDepartment,
    optional:true
  },
})

partnerSchema = new SimpleSchema({
  title:{
    type:String,
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
  designation:{
    type:String,
    optional:true
  },
  isDesignationPrivate:{
    type:Boolean,
    optional:true
  },
  partnercompanyName:{
    type:String,
    optional:true
  },
  duration:{
    type:String,
    optional:true
  },
  isDurationPrivate:{
    type:Boolean,
    optional:true
  },
  yearsOfExperience:{
    type:String,
    optional:true
  },
  isYearsOfExperiencePrivate:{
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
  aboutPartner:{
    type:String,
    optional:true
  },
  isAboutPartnerPrivate:{
    type:Boolean,
    optional:true
  },

  socialLinks:{
    type:Array,
    optional:true
  },

  'socialLinks.$':{
    type:Object,
    optional:true
  },

  'socialLinks.$.socialLinkType':{
    type:String,
    optional:true
  },

  'socialLinks.$.userId':{
    type:String,
    optional:true
  },

  'socialLinks.$.isUserIdPrivate':{
    type:Boolean,
    optional:true
  },
  index:{
    type: Number,
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
  }
})

researchAndDevelopmentSchema = new SimpleSchema({
  // industryTypeId:{
  //   type:String,
  //   optional:true
  // },
  rdName:{
    type:String,
    optional:true
  },
  // subDomainId:{
  //   type:String,
  //   optional:true
  // },
  // subDomainName:{
  //   type:String,
  //   optional:true
  // },
  isActive:{
    type:Boolean,
    optional:true
  },
  index:{
    type: Number,
    optional:true
  }
})
information = new SimpleSchema({
  informationDescription:{
    type:String,
    optional:true
  },
  isInformationDescriptionPrivate:{
    type:Boolean,
    optional:true
  }
})


CompanyPortfolioSchema = new SimpleSchema({
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
  aboutUs:{
    type:aboutUs,
    optional:true
  },
  rating:{
    type:rating,
    optional:true
  },
  clients:{
    type:Array,
    optional:true
  },
  "clients.$":{
    type:companyClients,
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


  management:{
    type:Array,
    optional:true
  },
  'management.$':{
    type:managementAndPromotersSchema,
    optional:true
  },
  data:{
    type: dataTypes,
    optional:true
  },
  awardsRecognition:{
    type:Array,
    optional:true
  },
  'awardsRecognition.$':{
    type:companyAwardsRecognition,
    optional:true
  },
  licenses:{
    type:companyLicenses,
    optional:true
  },
  compliances:{
    type:companyCompliances,
    optional:true
  },
  memberships:{
    type:companyMemberships,
    optional:true
  },
  incubators:{
    type:incubatorsSchema,
    optional:true
  },
  partner:{
    type:Array,
    optional:true
  },

  "partner.$":{
    type:partnerSchema,
    optional:true
  },
  crs:{
    type:crsSchema,
    optional:true
  },
  researchAndDevelopment:{
    type:Array,
    optional:true
  },
  "researchAndDevelopment.$":{
    type:researchAndDevelopmentSchema,
    optional:true
  },
  intrapreneur:{
    type:Array,
    optional:true
  },
  'intrapreneur.$':{
    type:companyIntrapreneur,
    optional:true
  },

  employmentOfCompanyChart:{
    type:Array,
    optional:true
  },

  'employmentOfCompanyChart.$':{
    type:employmentOfCompany,
    optional:true
  },

  reviewOfCompanyChart:{
    type:Array,
    optional:true
  },

  'reviewOfCompanyChart.$':{
    type:reviewOfCompany,
    optional:true
  },

  profitRevenueLiabilityChart:{
    type:Array,
    optional:true
  },

  'profitRevenueLiabilityChart.$':{
    type:profitRevenueLiability,
    optional:true
  },

  employeeBreakupDepartmentChart:{
    type:Array,
    optional:true
  },

  'employeeBreakupDepartmentChart.$':{
    type:employeeBreakupDepartment,
    optional:true
  },


})

MlCompanyPortfolio.attachSchema(CompanyPortfolioSchema);

MlCollections['MlCompanyPortfolio'] = MlCompanyPortfolio;
