/**
 * Created by venkatasrinag on 9/1/17.
 */
import MoolyaloginContainer from '../container/loginContainer'
export let loginActionHandler = {
    onLoginFormSubmit(details,callback){
      let logincontainer=MoolyaloginContainer.loginContainer
      logincontainer.login(details.username, details.password, function (result) {
        if(result && result.error){
          console.log(result.reason)
          callback(result.reason)
        }
        else if(result && result.profile && result.profile.isAdmin){
          FlowRouter.go("/admin/dashboard");
        }
      });
    }
}
