
export const loginContainer = {
  login(username, password, callback) {
    Meteor.loginWithPassword({ username }, password, (result) => {
      if (result && result.error) {
        callback(result);
      } else {
        const user = Meteor.user();
        if (user && user.profile) {
          Meteor.logoutOtherClients();
          callback(user);
        }
      }
    })
  },

  logout(callback) {
    const originalLogout = Meteor.logout;
    Meteor.logout()
    {
      const user = Meteor.user();
      // console.log(user);
      if (user && user.profile && user.profile.isMoolyaBackend === true) {
        originalLogout.apply(Meteor, arguments);
      }

      if (callback) {
        callback();
      }
    }
  }
}

