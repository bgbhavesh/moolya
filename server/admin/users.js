Meteor.methods({
    reterieveAllUsers()
    {
        var registeredUsers = MlSoftRegistration.find().fetch();
        return registeredUsers;
        // return Meteor.users.find().fetch();
    }
})
