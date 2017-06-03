
export let loginContainer = {
    login(username, password, callback){
        Meteor.loginWithPassword({username:username},password, function (result)
        {
            if(result && result.error){
                callback(result);
            }
             else{
                var user = Meteor.user();
                 if(user && user.profile){
                      callback(user);
                 }
             }
        })
    },

    logout(callback){
        let originalLogout = Meteor.logout;
        Meteor.logout()
        {

            let user = Meteor.user();
            // console.log(user);
            if (user && user.profile && user.profile.isMoolyaBackend === true) {
                originalLogout.apply(Meteor, arguments);
            }

            if(callback) {
              callback();
            }
        }
    }
}

