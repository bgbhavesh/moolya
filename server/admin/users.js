Meteor.methods({
    reterieveAllUsers(limit,skip)
    {
      check(skip,Number);
      check(limit,Number);
        var registeredUsers = MlSoftRegistration.find({},{skip:skip,limit:limit}).fetch();
      var totalRecordsCount = MlSoftRegistration.find({}).count();
        return {'records':registeredUsers,'recordsCount':totalRecordsCount};
        // return Meteor.users.find().fetch();
    }
})
