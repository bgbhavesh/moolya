import SimpleSchema from "simpl-schema";

MlStartupPortfolio = new Mongo.Collection('mlStartupPortfolio');

management = new SimpleSchema({
  management: {
    type: Array,
    optional: true
  },
  'management.$': {
    type: Object,
    optional: true
  },
  'management.$.title':{
    type:String,
    optional:true
  },
  'management.$.logo':{
    type:String,
    optional:true
  },
  'management.$.isTitlePrivate':{
    type:Boolean,
    optional:true
  },
  'management.$.firstName':{
    type:String,
    optional:true
  },
  'management.$.isFirstNamePrivate':{
    type:Boolean,
    optional:true
  },
  'management.$.lastName':{
    type:String,
    optional:true
  },
  'management.$.isLastNamePrivate':{
    type:Boolean,
    optional:true
  },
  'management.$.middleName':{
    type:String,
    optional:true
  },
  'management.$.isMiddleNamePrivate':{
    type:Boolean,
    optional:true
  },
  'management.$.qualification':{
    type:String,
    optional:true
  },
  'management.$.isQualificationPrivate':{
    type:Boolean,
    optional:true
  },
  'management.$.certification':{
    type:String,
    optional:true
  },
  'management.$.isCertificationPrivate':{
    type:Boolean,
    optional:true
  },
  'management.$.profilePic':{
    type:String,
    optional:true
  },
  'management.$.isProfilePicPrivate':{
    type:Boolean,
    optional:true
  },
  'management.$.gender':{
    type:String,
    optional:true
  },
  'management.$.isGenderPrivate':{
    type:Boolean,
    optional:true
  },
  'management.$.designation':{
    type:String,
    optional:true
  },
  'management.$.isDesignationPrivate':{
    type:Boolean,
    optional:true
  },
  'management.$.yearsOfExperience':{
    type:String,
    optional:true
  },
  'management.$.isYOEPrivate':{
    type:Boolean,
    optional:true
  },
  'management.$.joiningDate':{
    type:String,
    optional:true
  },
  'management.$.isJoiningDatePrivate':{
    type:Boolean,
    optional:true
  },
  'management.$.firstJobJoiningDate':{
    type:String,
    optional:true
  },
  'management.$.isFJJDPrivate':{
    type:Boolean,
    optional:true
  },
  'management.$.universities':{
    type:String,
    optional:true
  },
  'management.$.isUniversitiesPrivate':{
    type:Boolean,
    optional:true
  },
  'management.$.awards':{
    type:String,
    optional:true
  },
  'management.$.isAwardsPrivate':{
    type:Boolean,
    optional:true
  },
  'management.$.linkedInUrl':{
    type:String,
    optional:true
  },
  'management.$.isLinkedInUrlPrivate':{
    type:Boolean,
    optional:true
  },
  'management.$.about':{
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
  assets: {
    type: Array,
    optional: true
  },
  'assets.$': {
    type: Object,
    optional: true
  },
  'assets.$.assetType':{
    type:String,
    optional:true
  },
  'assets.$.isAssetTypePrivate':{
    type:Boolean,
    optional:true
  },
  'assets.$.quantity':{
    type:String,
    optional:true
  },
  'assets.$.isQuantityTypePrivate':{
    type:Boolean,
    optional:true
  },
  'assets.$.description':{
    type:String,
    optional:true
  },
  'assets.$.makePrivate':{
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
  logo:{
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
    type:management,
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
