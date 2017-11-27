import { loginActionHandler } from '../../../../login/actions/loginActions';


export function logout() {
  loginActionHandler.onLogout(() => {
    // FlowRouter.go("/login");
    FlowRouter.go('/logout');
  });
}
