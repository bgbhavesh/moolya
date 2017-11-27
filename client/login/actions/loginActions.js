/**
 * Created by venkatasrinag on 9/1/17.
 */
import MoolyaloginContainer from '../containers/loginContainer'
import mlConversationUtils from '../../commons/conversations/utils/mlconversationUtils'

export const loginActionHandler = {
  onLoginFormSubmit(details, callback) {
    const logincontainer = MoolyaloginContainer.loginContainer
    logincontainer.login(details.username, details.password, (result) => {
      if (result && result.error) {
        console.log(result.reason)
        callback(result.reason)
      } else if (result && result.profile && result.profile.isInternaluser == true) {
        FlowRouter.redirect('/admin');
        // mlConversationUtils.login(client)
      } else if (result && result.profile && result.profile.isExternaluser == true) {
        FlowRouter.redirect('/app');
        mlConversationUtils.login()
      }
    });
  },
  onLogout(callback) {
    const logoutcontainer = MoolyaloginContainer.loginContainer;
    logoutcontainer.logout(callback);
  }
}
