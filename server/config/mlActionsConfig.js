/**
 * Created by venkatasrinag on 27/1/17.
 */
let actions = [ "create", "read", "update", "delete", "like","connect",
                "collaborate","favourite","view","partner","enquire",
                "conversation","feedback","compare","share","download","upload",
                "wishlist","favourite","edit","save","golive","comment","onboard",
                "shortlist","review","assess","discuss","promote","negotiate","valuation",
                "handover", "report card", "invest", "term sheet", "exit", "remove","comment"];

// Meteor.startup(function () {
  for(i = 0; i < actions.length; i++){
      let action = MlActions.findOne({name: actions[i]});
      if(!action){
          let code = actions[i].toUpperCase();
          action = {name:actions[i], displayName:actions[i], code: code, isActive:true, isAdmin:true};
          MlActions.insert(action);
      }
  }
// })
