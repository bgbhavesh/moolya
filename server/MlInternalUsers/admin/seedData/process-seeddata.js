if(Meteor.isServer){

  MlprocessTypes.insert({
    "processName":"funding",
    "displayName":"funding",
    "processDesc":"funding",
    "isActive": true
  });
 MlprocessTypes.insert({
    "processName":"registration",
    "displayName":"registration",
    "processDesc":"registration",
    "isActive": true
  });

}
