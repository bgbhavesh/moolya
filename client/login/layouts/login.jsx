
import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import mlFormValidations, {mlValidations} from '../../commons/validations/formValidation'

MlLoginLayout = React.createClass({
    render(){
      return <main>{this.props.content}</main>
    }
})

MlLoginContent = React.createClass({

    getInitialState(props){
        this.state = {username:"", password:"", userNameErr:"", passwordErr:""};
        this.validationMessage = "";
        return this;
    },

    loginSubmit(){
        let errMessages = {"userName":"A valid username is required", "Password":"A Password is required"};
        this.validationMessage = mlValidations.formValidations([this.refs.username, this.refs.password], errMessages);
        if(!this.validationMessage)
            this.props.formSubmit({username:this.state.username, password:this.state.password})

        if(this.validationMessage.userName == true)
          this.setState(Object.assign({userNameErr:this.validationMessage.errMsg}))
        else if(this.validationMessage.Password == true)
          this.setState(Object.assign({passwordErr:this.validationMessage.errMsg}))
    },

    onValueChange(event){
        if(event.target.name == 'userName')
          this.setState(Object.assign({userNameErr:""}))
        if(event.target.name == 'Password')
          this.setState(Object.assign({passwordErr:""}))
    },

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-4 col-md-offset-4">
                        <h1 className="text-center login-title">Sign in to continue</h1>
                    </div>
                    <div className="account-wall">
                        <form className="form-signin" onChange={this.onValueChange}>
                            <input name="userName" ref="username" type="email" className="form-control" placeholder="Email" required="true" autoFocus/>
                            <span ref="userName">{this.state.userNameErr}</span>
                            <input name="Password" ref="password" type="password" className="form-control" placeholder="Password" required />
                            <span ref="Password">{this.state.passwordErr}</span>
                            <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.loginSubmit}>Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});


MlLoginContent.propTypes={
    formSubmit: React.PropTypes.func,
}
