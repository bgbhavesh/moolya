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
  'management.$.isTitleDisplay':{
    type:Boolean,
    optional:true
  },
  'management.$.firstName':{
    type:String,
    optional:true
  },
  'management.$.isFirstNameDisplay':{
    type:Boolean,
    optional:true
  },
  'management.$.lastName':{
    type:String,
    optional:true
  },
  'management.$.isLastNameDisplay':{
    type:Boolean,
    optional:true
  },
  'management.$.middleName':{
    type:String,
    optional:true
  },
  'management.$.isMiddleNameDisplay':{
    type:Boolean,
    optional:true
  },
  'management.$.qualification':{
    type:String,
    optional:true
  },
  'management.$.isQualificationDisplay':{
    type:Boolean,
    optional:true
  },
  'management.$.certification':{
    type:String,
    optional:true
  },
  'management.$.isCertificationDisplay':{
    type:Boolean,
    optional:true
  },
  'management.$.profilePic':{
    type:String,
    optional:true
  },
  'management.$.isProfilePicDisplay':{
    type:Boolean,
    optional:true
  },
  'management.$.gender':{
    type:String,
    optional:true
  },
  'management.$.isGenderDisplay':{
    type:Boolean,
    optional:true
  },
  'management.$.designation':{
    type:String,
    optional:true
  },
  'management.$.isDesignationDisplay':{
    type:Boolean,
    optional:true
  },
  'management.$.yearsOfExperience':{
    type:String,
    optional:true
  },
  'management.$.isYOFDisplay':{
    type:Boolean,
    optional:true
  },
  'management.$.joiningDate':{
    type:String,
    optional:true
  },
  'management.$.isJoiningDateDisplay':{
    type:Boolean,
    optional:true
  },
  'management.$.firstJobJoiningDate':{
    type:String,
    optional:true
  },
  'management.$.isFJJDDisplay':{
    type:Boolean,
    optional:true
  },
  'management.$.universities':{
    type:String,
    optional:true
  },
  'management.$.isUniversitiesDisplay':{
    type:Boolean,
    optional:true
  },
  'management.$.awards':{
    type:String,
    optional:true
  },
  'management.$.isAwardsDisplay':{
    type:Boolean,
    optional:true
  },
  'management.$.linkedInUrl':{
    type:String,
    optional:true
  },
  'management.$.isLinkedInUrlDisplay':{
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
  'branches.$.isAddressImageDisplay':{
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
  'assets.$.isAssetTypeDisplay':{
    type:Boolean,
    optional:true
  },
  'assets.$.quantity':{
    type:String,
    optional:true
  },
  'assets.$.isQuantityTypeDisplay':{
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
  'technology.$.isTechnologyDisplay':{
    type:Boolean,
    optional:true
  },
  'technology.$.description':{
    type:String,
    optional:true
  },
  'technology.$.isDescriptionDisplay':{
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
  'investor.$.isNameDisplay':{
    type:Boolean,
    optional:true
  },
  'investor.$.investorImage':{
    type:String,
    optional:true
  },
  'investor.$.isInvestorImageDisplay':{
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
  'investor.$.isInvestmentAmountDisplay':{
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
  'lookingFor.$.isTypeDisplay':{
    type:String,
    optional:true
  },
  'lookingFor.$.description':{
    type:String,
    optional:true
  },
  'lookingFor.$.isDescriptionDisplay':{
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
  isDescriptionDisplay:{
    type:Boolean,
    optional:true
  }
})

serviceProducts = new SimpleSchema({
  description:{
    type:String,
    optional:true
  },
  isDescriptionDisplay:{
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
  isLogoDisplay:{
    type:Boolean,
    optional:true
  },
  isDescriptionDisplay:{
    type:Boolean,
    optional:true
  }
})

awardsRecognisition = new SimpleSchema({
  award:{
    type:String,
    optional:true
  },
  isAwardDisplay:{
    type:Boolean,
    optional:true
  },
  year:{
    type:String,
    optional:true
  },
  isYearDisplay:{
    type:Boolean,
    optional:true
  },
  description:{
    type:String,
    optional:true
  },
  isDescriptionDisplay:{
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
  isDescriptionDisplay:{
    type:Boolean,
    optional:true
  }
})
compliances = new SimpleSchema({
  description:{
    type:String,
    optional:true
  },
  isDescriptionDisplay:{
    type:Boolean,
    optional:true
  }
})

licenses = new SimpleSchema({
  description:{
    type:String,
    optional:true
  },
  isDescriptionDisplay:{
    type:Boolean,
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
//
// charts{
//   employeeOfCompany[{
//     month,
//     year,
//     numberOfEmployees,
//     description
//   }],
//     profitrevenueliablity[{
//       entityType(profit, revenue),
//       fromMonth,
//       fromYear,
//       toMonth,
//       toYear,
//       valueType(percentage)
//     }],
//     reviewOfCompany[{
//       year,
//       reviewPercentage,
//       description
//     }],
//     employeeBreakupDepartment[{
//       department,
//       fromYear,
//       fromMonth,
//       toYear,
//       toMonth,
//       numberOfEmployment,
//       description
//     }]
// },
