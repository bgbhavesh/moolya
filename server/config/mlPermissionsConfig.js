/**
 * Created by venkatasrinag on 27/1/17.
 */
let permissions = ["create", "read", "update", "delete", "activate", "deactivate"]

Meteor.startup(function () {
  for(i = 0; i < permissions.length; i++){
    let permission = MlPermissions.findOne({name: permissions[i]});
    if(!permission){
      permission = {name:permissions[i], displayName:permissions[i], isActive:true};
      MlPermissions.insert(permission);
    }
  }
})
