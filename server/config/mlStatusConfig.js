Meteor.startup(function () {
  MlStatus.update({code:"REG_EMAIL_P"}, {$set:{'module':['registration'],isActive:true,description:"New Soft Registration - Email Verification Pending"}}, {upsert:true});
  MlStatus.update({code:"REG_EMAIL_V"}, {$set:{'module':['registration'],isActive:true,description:"New Soft Registration - Email Verified"}}, {upsert:true});
  MlStatus.update({code:"REG_ADM_REJ"}, {$set:{'module':['registration'],isActive:true,description:"New Soft Registration - Admin Rejected"}}, {upsert:true});
  MlStatus.update({code:"REG_SOFT_APR"}, {$set:{'module':['registration'],isActive:true,description:"New Soft Registration - Admin Approved"}}, {upsert:true});
  MlStatus.update({code:"REG_KYC_U_KOFF"}, {$set:{'module':['registration'],isActive:true,description:"Registration - KYC upload Kickoff"}}, {upsert:true});
  MlStatus.update({code:"REG_KYC_U_PEND"}, {$set:{'module':['registration'],isActive:true,description:"Registration - KYC approval Pending"}}, {upsert:true});
  MlStatus.update({code:"REG_KYC_A_APR"}, {$set:{'module':['registration'],isActive:true,description:"Registration - KYC Approved"}}, {upsert:true});
  MlStatus.update({code:"REG_KYC_A_REJ"}, {$set:{'module':['registration'],isActive:true,description:"Registration - KYC Rejected"}}, {upsert:true});
  MlStatus.update({code:"REG_USER_APR"}, {$set:{'module':['registration'],isActive:true,description:"Registration - User Approved"}}, {upsert:true});
  MlStatus.update({code:"REG_USER_REJ"}, {$set:{'module':['registration'],isActive:true,description:"Registration - User Rejected"}}, {upsert:true});
  MlStatus.update({code:"REG_PORT_KICKOFF"}, {$set:{'module':['portfolio'],isActive:true,description:"Registration - Portfolio Kickoff"}}, {upsert:true});
  MlStatus.update({code:"REG_PORT_PEND"}, {$set:{'module':['portfolio'],isActive:true,description:"Registration - Portfolio Pending"}}, {upsert:true});
  MlStatus.update({code:"REG_PORT_APR"}, {$set:{'module':['portfolio'],isActive:true,description:"Registration - Portfolio Approved"}}, {upsert:true});
  MlStatus.update({code:"PORT_INACT"}, {$set:{'module':['portfolio'],isActive:true,description:"Registration - Portfolio Inactive"}}, {upsert:true});
  MlStatus.update({code:"PORT_REVIEW_INPRO"}, {$set:{'module':['portfolio'],isActive:true,description:" Portfolio Edited - After being Approved"}}, {upsert:true});
  MlStatus.update({code:"PORT_GO_LIVE_PEND"}, {$set:{'module':['portfolio'],isActive:true,description:" Portfolio - Go Live Pending"}}, {upsert:true});
  MlStatus.update({code:"PORT_LIVE_NOW"}, {$set:{'module':['portfolio'],isActive:true,description:" Go Live Completed"}}, {upsert:true});
});
