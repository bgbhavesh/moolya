/**
 * Created by vishwadeep on 5/9/17.
 */
import React, {Component} from "react";
import {render} from "react-dom";
import {mlValidations} from "../../commons/validations/formValidation";

export default class MlLogout extends Component {
  constructor(props) {
    super(props)
    this.state = {username: "", password: "", userNameErr: "", passwordErr: ""};
    this.validationMessage = "";
    this.loginSubmit.bind(this)
    return this;
  }

  loginSubmit() {
    let errMessages = {"userName": "A valid username is required", "Password": "A Password is required"};
    this.validationMessage = mlValidations.formValidations([this.refs.username, this.refs.password], errMessages);
    if (!this.validationMessage) {
      this.props.formSubmit({
        username: this.refs.username.value,
        password: this.refs.password.value
      }, function (result) {
        toastr.error(result);
      })
    }
    else {
      if (this.validationMessage.userName == true)
        toastr.error(this.validationMessage.errMsg);
      else if (this.validationMessage.Password == true)
        toastr.error(this.validationMessage.errMsg);
    }
  }

  onValueChange(event) {
    if (event.target.name == 'userName')
      this.setState({userNameErr: ""})
    if (event.target.name == 'Password')
      this.setState({passwordErr: ""})
  }

  handleKeyPress(target) {
    if (target.charCode == 13) {
      this.loginSubmit()
    }
  }

  render() {
    return (
      <div className="logout">
        <div className="login_bg" style={{textAlign: "center"}}>
          <img className="logo" src="/images/moolya_logo.png"/>
          <div className="clearfix"/>
          <div className="logout_message">
            <h2>You have been logged out...</h2>
            <p>
              ...as the result of clicking the logout link or because of an exteanded period of inactivity or as the
              result of attempting to re-login using a bookmark or 'favorite' link.It could also be because of security
              reasons or a percevide threat.
            </p>
            <h3>Please 'Sign in' below to continue</h3>
          </div>
          <div id="login_wrap">
            <div className="login_block">
              <div className="login_block login_block_in" id="login">
                <form className="form-signin" onChange={this.onValueChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}>
                  <span ref="userName">{this.state.userNameErr}</span>
                  <input type="text" name="userName" ref="username" className="form-control" placeholder="Email"
                         required autoFocus defaultValue={this.state.username} onBlur={this.validationCheck}/>
                  <span ref="Password">{this.state.passwordErr}</span>
                  <input type="password" name="Password" className="form-control" ref="password"
                         placeholder="Password" required defaultValue={this.state.password}
                         onBlur={this.validationCheck}/>
                  <div className="checkbox_wrap"><input type="checkbox"/><span>Remember me</span></div>
                  <button className="ml_submit_btn" type="button" onClick={this.loginSubmit.bind(this)}>Sign in</button>
                  <br className="brclear"/>
                  <p><a href="/forgot-password">Forgot Password</a> | <a
                    href="https://www.moolya.in/register">Register</a></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
MlLogout.propTypes = {
  formSubmit: React.PropTypes.func,
}
