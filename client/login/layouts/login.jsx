import React, {Component, PropTypes} from "react";
import {render} from "react-dom";
import {mlValidations} from "../../commons/validations/formValidation";

MlLoginLayout = React.createClass({
  render(){
    return <main>{this.props.content}</main>
  }
})

MlLoginContent = React.createClass({

  getInitialState(props){
    this.state = {username: "", password: "", userNameErr: "", passwordErr: ""};
    this.validationMessage = "";
    return this;
  },

  loginSubmit(){
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
        // this.setState(Object.assign({userNameErr: this.validationMessage.errMsg}))
      else if (this.validationMessage.Password == true)
        toastr.error(this.validationMessage.errMsg);
        // this.setState(Object.assign({passwordErr: this.validationMessage.errMsg}))
    }
  },

  onValueChange(event){
    if (event.target.name == 'userName')
      this.setState(Object.assign({userNameErr: ""}))
    if (event.target.name == 'Password')
      this.setState(Object.assign({passwordErr: ""}))
  },

  handleKeyPress(target) {
    if (target.charCode == 13) {
      this.loginSubmit()
    }
  },
  render() {
    return (
      <div>
        <div>
          <div className="login_bg" style={{textAlign: "center"}}>
            <video poster="" id="bgvid" autoPlay muted loop playsInline>
              <source src="/images/bg_video.mp4"/>
            </video>
            <div className="video_bg"></div>
            <img className="logo" src="/images/moolya_logo.png"/>
            <div className="login_top">
              <div className="login_top_in"><span>Login</span></div>
            </div>
            <div className="login_block">
              <div className="login_block login_block_in">
                <form className="form-signin" onChange={this.onValueChange} onKeyPress={this.handleKeyPress}>
                  <span ref="userName">{this.state.userNameErr}</span>
                  <input name="userName" ref="username" type="text" className="form-control" placeholder="Email"
                         required autoFocus defaultValue={this.state.username} onBlur={this.validationCheck}/>
                  <span ref="Password">{this.state.passwordErr}</span>
                  <input name="Password" ref="password" type="password" className="form-control"
                         placeholder="Password" required defaultValue={this.state.password}
                         onBlur={this.validationCheck}/>

                  <div className="checkbox_wrap"><input type="checkbox"/><span>Remember me</span></div>
                  <button className="ml_submit_btn" type="button" onClick={this.loginSubmit}>Sign in</button>
                  <br className="brclear"/>
                  <p><a href="/forgot-password">Forgot Password</a> | <a href="https://www.moolya.in/register">Register</a></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});


MlLoginContent.propTypes = {
  formSubmit: React.PropTypes.func,
}
