/**
 * Created by venkatasrinag on 28/1/17.
 */

let modules = ["community", "chapter", "subchapter", "cluster", "department", "subdepartment", "roles", "users", "settings", "documents", "conversations"];

Meteor.startup(function () {
    for(i = 0; i < modules.length; i++){
        let module = MlModules.findOne({moduleName: modules[i]});
        if(!module){
          module = {roleName:modules[i], isActive:true};
          MlModules.insert(module);
        }
    }
})
