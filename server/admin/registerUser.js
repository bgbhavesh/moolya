Meteor.methods({
  insertUser()
  {
    var registeredUsers = MlSoftRegistration.insert().fetch();
    return registeredUsers;
    // return Meteor.users.find().fetch();
  }
})
