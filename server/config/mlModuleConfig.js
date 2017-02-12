/**
 * Created by venkatasrinag on 28/1/17.
 */

let modules = ["community", "chapter", "subchapter", "cluster", "department", "subdepartment", "roles", "users", "settings", "documents", "conversations"];

// Meteor.startup(function () {
    for(i = 0; i < modules.length; i++){
        let module = MlModules.findOne({name: modules[i]});
        if(!module){
          module = {name:modules[i], displayName:modules[i], code:modules[i].toUpperCase(), isActive:true};
          MlModules.insert(module);
        }
    }
// })
