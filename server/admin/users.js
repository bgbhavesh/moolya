Meteor.methods({
    reterieveAllUsers()
    {
        var registeredUsers = MlSoftRegistration.find().fetch();
        return registeredUsers;
        // return Meteor.users.find().fetch();
    },

    sendEmail()
    {
      new MoolyaEmailSys().sendHTML({
        from: "mailchimp@raksanconsulting.com",
        to: "ramana.chandavarapu@raksanconsulting.com",
        subject: "Moolya Test Email",
        html: "Test"
      });
    }
})
