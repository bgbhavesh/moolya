/* eslint-disable */
import {logoutActionHandler} from "../actions/logoutAction";
import {loginActionHandler} from "../actions/loginGraphqlAction";
export let loginContainer = {
    login(username, password, callback){
        const loginPromise=loginActionHandler(username, password);
        loginPromise.then(data => {
            localStorage.setItem('meteor-login-token',data.data.login.token)
            callback()
            console.log(data)
        })
        .catch(err=>{
            console.log("error",err);
        })
    },
    /*this function is depricated.*/
    depricatedLogout(callback){
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
    },
  logout(callback){
    const localStorageLoginToken = localStorage.getItem('Meteor.loginToken');
    const logoutPromise =  logoutActionHandler(localStorageLoginToken);
    logoutPromise.then(res =>{
      //handle logout success
      if(res&&res.data&&res.data.logout&&res.data.logout.success){
        if(callback)callback();
        //handle logout failure
      }else{

      };
    });

  }
}

