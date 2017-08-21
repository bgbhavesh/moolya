import SimpleSchema from "simpl-schema";
import MlCollections from '../../../common/commonSchemas'
// import institution from "../../../../client/admin/transaction/requested/component/Institution";

MlInstitutionPortfolio = new Mongo.Collection('mlInstitutionPortfolio');


/*****charts*****/
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
/*****charts*****/

/*****Awards*****/
awardsRecognition = new SimpleSchema({
  awardName:{
    type:String,
    optional:true
  },
  awardId:{
    type:String,
    optional:true
  },
  year:{
    type:String,
    optional:true
  },
  awardsDescription:{
    type:String,
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
  index:{
    type: Number,
    optional:true
  }
})

/*****M,P,L*****/
memberships = new SimpleSchema({
  membershipDescription:{
    type:String,
    optional:true
  },
  // isDescriptionPrivate:{
  //   type:Boolean,
  //   optional:true
  // }
})

compliances = new SimpleSchema({
  complianceDescription:{
    type:String,
    optional:true
  },
  // isDescriptionPrivate:{
  //   type:Boolean,
  //   optional:true
  // }
})

licenses = new SimpleSchema({
  licenseDescription:{
    type:String,
    optional:true
  },
  // isDescriptionPrivate:{
  //   type:Boolean,
  //   optional:true
  // }
})
/*****M,P,L*****/

/***Management Tab*****/
management = new SimpleSchema({
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

/***** Investor *****/
institutionInvestor = new SimpleSchema({
  'investorName':{
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
  'investorDescription':{
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
/***** Investor *****/
/***Data Tab****/
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

/**About Us Tab ***/
rating = new SimpleSchema({
  rating:{
    type:String,
    optional:true
  }
})

aboutUs = new SimpleSchema({
  aboutImages: {
    type: Array,
    optional: true
  },
  'aboutImages.$': {
    type: Object,
    optional: true
  },
  'aboutImages.$.fileUrl':{
    type:String,
    optional:true
  },
  'aboutImages.$.fileName':{
    type:String,
    optional:true
  },
  'aboutImages.$.isDefault':{
    type:Boolean,
    optional:true
  },
  aboutTitle:{
    type:String,
    optional:true
  },
  aboutDescription:{
    type:String,
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

clients = new SimpleSchema({
  'clientName':{
    type:String,
    optional:true
  },
  'description':{
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
  'makePrivate':{
    type:Boolean,
    optional:true
  },
  index:{
    type: Number,
    optional:true
  }
})

/**Looking for type*/
institutionLookingFor = new SimpleSchema({
  lookingForName:{
    type:String,
    optional:true
  },
  typeId:{
    type:String,
    optional:true
  },
  // 'isTypePrivate':{
  //   type:Boolean,
  //   optional:true
  // },
  'lookingDescription':{
    type:String,
    optional:true
  },
  // 'isDescriptionPrivate':{
  //   type:Boolean,
  //   optional:true
  // },
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
  // 'makePrivate':{
  //   type:Boolean,
  //   optional:true
  // },
  index:{
    type: Number,
    optional:true
  }
})

institutionManagement = new SimpleSchema({
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
  managmentAbout:{
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

/**About Us Tab ***/

InstitutionPortfolioSchema = new SimpleSchema({
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
  awardsRecognition:{
    type:Array,
    optional:true
  },
  'awardsRecognition.$':{
    type:awardsRecognition,
    optional:true
  },
  investor:{
    type:Array,
    optional:true
  },
  "investor.$":{
    type:institutionInvestor,
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
    type:clients,
    optional:true
  },
  licenses:{
    type:licenses,
    optional:true
  },
  compliances:{
    type:compliances,
    optional:true
  },
  memberships:{
    type:memberships,
    optional:true
  },
  lookingFor:{
    type:Array,
    optional:true
  },
  'lookingFor.$':{
    type:institutionLookingFor,
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
    type:institutionManagement,
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
  data:{
    type: dataTypes,
    optional:true
  }
})

MlInstitutionPortfolio.attachSchema(InstitutionPortfolioSchema);
MlCollections['MlInstitutionPortfolio'] = MlInstitutionPortfolio;