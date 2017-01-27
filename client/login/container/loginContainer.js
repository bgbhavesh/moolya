export let loginContainer = {
    login(username, password, callback){
        Meteor.loginWithPassword({username:username},password, function (result)
        {
          if(result && result.error){
                 callback(result);
            }
             else{
                var user = Meteor.user();
                 if(user && user.profile && user.profile.isAdmin){
                    callback(user);
                   //FlowRouter.go("/admin/dashboard");
               }
             }
         })
    },

    logout(){
        let originalLogout = Meteor.logout;
        Meteor.logout()
        {
            let user = Meteor.user();
            if (user && user.profile && user.profile.isMoolyaBackend === true) {
                originalLogout.apply(Meteor, arguments);
            }
            FlowRouter.go("/admin/login");
        }
    }
}

