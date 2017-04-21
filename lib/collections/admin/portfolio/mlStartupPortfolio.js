import SimpleSchema from "simpl-schema";

MlStartupPortfolio = new Mongo.Collection('mlStartupPortfolio');

startupManagement = new SimpleSchema({
  title:{
    type:String,
    optional:true
  },
  logo:{
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
  isAboutPrivate:{
    type:String,
    optional:true
  }
})


clients = new SimpleSchema({
  clients: {
    type: Array,
    optional: true
  },
  'clients.$': {
    type: Object,
    optional: true
  },
  'clients.$.companyName':{
    type:String,
    optional:true
  },
  'clients.$.logo':{
    type:String,
    optional:true
  },
  'clients.$.description':{
    type:String,
    optional:true
  },
  'clients.$.makePrivate':{
    type:Boolean,
    optional:true
  }
})

branches = new SimpleSchema({
  branches: {
    type: Array,
    optional: true
  },
  'branches.$': {
    type: Object,
    optional: true
  },
  'branches.$.addressType':{
    type:String,
    optional:true
  },
  'branches.$.name':{
    type:String,
    optional:true
  },
  'branches.$.phoneNumber':{
    type:String,
    optional:true
  },
  'branches.$.address1':{
    type:String,
    optional:true
  },
  'branches.$.address2':{
    type:String,
    optional:true
  },
  'branches.$.landmark':{
    type:String,
    optional:true
  },
  'branches.$.area':{
    type:String,
    optional:true
  },
  'branches.$.city':{
    type:String,
    optional:true
  },
  'branches.$.state':{
    type:String,
    optional:true
  },
  'branches.$.country':{
    type:String,
    optional:true
  },
  'branches.$.addressImage':{
    type:String,
    optional:true
  },
  'branches.$.isAddressImagePrivate':{
    type:Boolean,
    optional:true
  },
  'branches.$.makePrivate':{
    type:Boolean,
    optional:true
  }
})


assets = new SimpleSchema({

  'assetType':{
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
  'makePrivate':{
    type:Boolean,
    optional:true
  }
})


technologies = new SimpleSchema({
  technology: {
    type: Array,
    optional: true
  },
  'technology.$': {
    type: Object,
    optional: true
  },
  'technology.$.technology':{
    type:String,
    optional:true
  },
  'technology.$.isTechnologyPrivate':{
    type:Boolean,
    optional:true
  },
  'technology.$.description':{
    type:String,
    optional:true
  },
  'technology.$.isDescriptionPrivate':{
    type:Boolean,
    optional:true
  },
  'technology.$.makePrivate':{
    type:Boolean,
    optional:true
  }
})

investor = new SimpleSchema({
  investor: {
    type: Array,
    optional: true
  },
  'investor.$': {
    type: Object,
    optional: true
  },
  'investor.$.name':{
    type:String,
    optional:true
  },
  'investor.$.isNamePrivate':{
    type:Boolean,
    optional:true
  },
  'investor.$.investorImage':{
    type:String,
    optional:true
  },
  'investor.$.isInvestorImagePrivate':{
    type:Boolean,
    optional:true
  },
  'investor.$.fundingType':{
    type:String,
    optional:true
  },
  'investor.$.investmentAmount':{
    type:String,
    optional:true
  },
  'investor.$.isInvestmentAmountPrivate':{
    type:Boolean,
    optional:true
  },
  'investor.$.description':{
    type:String,
    optional:true
  },
  'investor.$.makePrivate':{
    type:Boolean,
    optional:true
  }
})

lookingFor = new SimpleSchema({
  lookingFor: {
    type: Array,
    optional: true
  },
  'lookingFor.$': {
    type: Object,
    optional: true
  },
  'lookingFor.$.type':{
    type:String,
    optional:true
  },
  'lookingFor.$.isTypePrivate':{
    type:Boolean,
    optional:true
  },
  'lookingFor.$.description':{
    type:String,
    optional:true
  },
  'lookingFor.$.isDescriptionPrivate':{
    type:Boolean,
    optional:true
  },
  'lookingFor.$.makePrivate':{
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

rating = new SimpleSchema({
  rating:{
    type:String,
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

awardsRecognisition = new SimpleSchema({
  award:{
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
  makePrivate:{
    type:Boolean,
    optional:true
  }
})
memberships = new SimpleSchema({
  description:{
    type:String,
    optional:true
  },
  isDescriptionPrivate:{
    type:Boolean,
    optional:true
  }
})
compliances = new SimpleSchema({
  description:{
    type:String,
    optional:true
  },
  isDescriptionPrivate:{
    type:Boolean,
    optional:true
  }
})

licenses = new SimpleSchema({
  description:{
    type:String,
    optional:true
  },
  isDescriptionPrivate:{
    type:Boolean,
    optional:true
  }
})

employeeOfCompany = new SimpleSchema({
  employeeOfCompany:{
    type:Array,
    optional:true
  },
  'employeeOfCompany.$':{
    type:Object,
    optional:true
  },
  'employeeOfCompany.$.month':{
    type:String,
    optional:true
  },
  'employeeOfCompany.$.year':{
    type:String,
    optional:true
  },
  'employeeOfCompany.$.numberOfEmployees':{
    type:String,
    optional:true
  },
  'employeeOfCompany.$.description':{
    type:String,
    optional:true
  }
})

profitRevenueLiability = new SimpleSchema({
  employeeOfCompany:{
    type:Array,
    optional:true
  },
  'employeeOfCompany.$':{
    type:Object,
    optional:true
  },
  'employeeOfCompany.$.entityType':{    //profit, revenue
    type:String,
    optional:true
  },
  'employeeOfCompany.$.fromMonth':{
    type:String,
    optional:true
  },
  'employeeOfCompany.$.fromYear':{
    type:String,
    optional:true
  },
  'employeeOfCompany.$.toMonth':{
    type:String,
    optional:true
  },
  'employeeOfCompany.$.toYear':{
    type:String,
    optional:true
  },
  'employeeOfCompany.$.valueType':{    //percentage
    type:String,
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
    type:String,
    optional:true
  },
  'reviewOfCompany.$.reviewPercentage':{
    type:String,
    optional:true
  },
  'reviewOfCompany.$.description':{
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
    type:String,
    optional:true
  },
  'employeeBreakupDepartment.$.fromMonth':{
    type:String,
    optional:true
  },
  'employeeBreakupDepartment.$.toYear':{
    type:String,
    optional:true
  },
  'employeeBreakupDepartment.$.toMonth':{
    type:String,
    optional:true
  },
  'employeeBreakupDepartment.$.numberOfEmployment':{
    type:String,
    optional:true
  },
  'employeeBreakupDepartment.$.description':{
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
    type : employeeOfCompany,
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
  awardsRecognisition:{
    type:awardsRecognisition,
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
    type:lookingFor,
    optional:true
  },
  investor:{
    type:investor,
    optional:true
  },
  technologies:{
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
    type:branches,
    optional:true
  },
  clients:{
    type:clients,
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
  }
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
