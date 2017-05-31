/**
 * Created by venkatasrinag on 28/1/17.
 */

let modules = [
    "community",
    "chapter",
    "subchapter",
    "cluster",
    "department",
    "subdepartment",
    "roles",
    "users",
    "settings",
    "documents",
    "conversations",
    "countries",
    "states",
    "cities",
    "userType",
    "roleType",
    "documentType",
    "documentFormat",
    "kycCategory",
    "Assets",
    "documentMapping",
    "template",
    "industry",
    "specification",
    "profession",
    "entity",
    "stageOfCompany",
    "processTypes",
    "businessType",
    "citizenship",
    "lookingFor",
    "taxation",
    "globalSettings",
    "masterSettings",
    "registration",
    "CommunityDefinition",
    "processMapping",
    "hierarchy",
    "identityTypes",
    "subProcess",
    "Technologies",
    "SubDomain",
    "portfolioLibrary",
    "communityAccess",
    "templates",
    "services" ,
    "templateTypes",
    "documentCategories",
    "filters",
    'templateAssignment',
    'transactionTypes',
    'requestType',
    'awards',
    'fundingType',
    'portfolio',
    'transactionLog',
    'modulelist'];

// Meteor.startup(function () {

for (i = 0; i < modules.length; i++) {
  let module = MlModules.findOne({name: modules[i]});
  if (!module) {
    module = {name: modules[i], displayName: modules[i], code: modules[i].toUpperCase(), isActive: true};
    MlModules.insert(module);
  }
}
// })
