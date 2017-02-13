/**
 * Created by venkatasrinag on 27/1/17.
 */
let actions = ["create", "read", "update", "delete"]

// Meteor.startup(function () {
  for(i = 0; i < actions.length; i++){
      let action = MlActions.findOne({name: actions[i]});
      if(!action){
          let code = actions[i].toUpperCase();
          action = {name:actions[i], displayName:actions[i], code: code, isActive:true};
          MlActions.insert(action);
      }
  }
// })
