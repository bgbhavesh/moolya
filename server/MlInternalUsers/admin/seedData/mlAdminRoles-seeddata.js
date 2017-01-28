if(Meteor.isServer){
  MlRoles.upsert({name:"mlAdminRole"},{$set:{
    "name" : "mlAdminRole",
    "role" : [
      {
        "roleName" : "Admin",
        "roleValue" : "0",
      },
      {
        "roleName" : "Manager",
        "roleValue" : "1",
      },
      {
        "roleName" : "Lead",
        "roleValue" : "2",
      },
      {
        "roleName" : "Executive",
        "roleValue" : "3",
      }
    ]
  }});
}
