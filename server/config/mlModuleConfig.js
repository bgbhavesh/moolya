/**
 * Created by venkatasrinag on 28/1/17.
 */

let modules = ["community", "chapter", "subchapter", "cluster", "department", "subdepartment", "permissions", "roles", "users", "settings", "documents", "conversations", "countries", "states", "cities", "request", "userType", "roleType", "documentType", "documentFormat", "kycCategory", "documentMapping", "transaction", "template", "BackendUsers", "industry", "specification", "profession", "entity", "stageOfCompany", "process", "process", "businessType", "citizenship", "lookingFor", "EmployeeType", "tax","taxation","globalSettings","masterSettings","registration"];
// Meteor.startup(function () {

for (i = 0; i < modules.length; i++) {
  let module = MlModules.findOne({name: modules[i]});
  if (!module) {
    module = {name: modules[i], displayName: modules[i], code: modules[i].toUpperCase(), isActive: true};
    MlModules.insert(module);
  }
}
// })
