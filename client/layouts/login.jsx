import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import {loginContainer} from '../datacontainers/login'


LoginLayout = React.createClass({
  render(){
    return <main>{this.props.content}</main>
  }
})

LoginContent = React.createClass({
  getInitialState(){
    this.state = {
      username: '',
      password: ''
    };

    return this;
  },

    loginSubmit(){
        console.log(this.state.username);
        console.log(this.state.password);
        loginContainer.login(this.state.username, this.state.password, function (result) {
              if(result && result.error){
              }
              else if(result && result.profile && result.profile.isAdmin){
                  FlowRouter.go("/admin");
              }
        });

    },

  validationCheck() {
    const userInput = this.grabUserInput(); // grab user entered vals
    const validateNewInput = this.validateData(userInput); // run the new input against the validator

    this.setState(Object.assign(userInput, validateNewInput, this.validationErrors(validateNewInput)));
  },

  validateData(data) {
    return  {
      emailVal: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(data.username), // required: regex w3c uses in html5
      passwordVal:(data.password != "")
    }
  },

  validationErrors(val) {
    const errMsgs = {
      passwordValMsg: val.passwordVal ? '' : 'A Password is required',
      emailValMsg: val.emailVal ? '' : 'A valid email is required'
    }
    return errMsgs;
  },

  grabUserInput() {
    return {
      username: this.refs.username.value,
      password: this.refs.password.value
    };
  },

  render(){
    return (
      <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-4 col-md-offset-4">
              <h1 className="text-center login-title">Sign in to continue</h1>
              <div className="account-wall">
                {/*<img className="profile-img" src="https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120"*/}
                     {/*alt="" />*/}
                <form className="form-signin">
                  <input ref="username" type="text" className="form-control" placeholder="Email" required autoFocus defaultValue={this.state.username} onBlur={this.validationCheck}/>
                  <input ref="password" type="password" className="form-control" placeholder="Password" required defaultValue={this.state.password} onBlur={this.validationCheck}/>
                  <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.loginSubmit}>Sign in</button>
                  {/*<a href="" class="pull-right need-help">Need help? </a><span class="clearfix"></span>*/}
                </form>
              </div>
            </div>
          </div>
      </div>
    )

  }
})
