import React from 'react';

Step2=React.createClass({


  getInitialState: function() {
    this.state = {

            register: '',
            username:'',
            password:'',
            companyurl:'',
            companyname:''

        };

        this.validationCheck = this._validationCheck.bind(this);
        this.isValidated = this._isValidated.bind(this);

        return this;
    },

    componentDidMount() {},

    componentWillUnmount() {},

    _isValidated() {
        const userInput = this._grabUserInput(); // grab user entered vals
        const validateNewInput = this._validateData(userInput); // run the new input against the validator
        let isDataValid = false;

        // if full validation passes then save to store and pass as valid
        if (Object.keys(validateNewInput).every((k) => { return validateNewInput[k] === true })) {
            //store.update(); // Update store here
            localStorage.setItem( 'step2', JSON.stringify(this._grabUserInput()) );
            isDataValid = true;
        }
        else {
            // if anything fails then update the UI validation state but NOT the UI Data State
            this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
        }

        return isDataValid;
    },

    _validationCheck() {
        if (!this._validateOnDemand)
            return;

        const userInput = this._grabUserInput(); // grab user entered vals
        const validateNewInput = this._validateData(userInput); // run the new input against the validator

        this.setState(Object.assign(userInput, validateNewInput, this._validationErrors(validateNewInput)));
    },

    _validateData(data) {
        return  {

            usernameVal: /^[a-zA-Z0-9.\s_-]{1,40}$/.test(data.username),
            passwordVal: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(data.password),
            companynameVal:/^[a-zA-Z0-9.\s_-]{1,40}$/.test(data.companyname),

        }
    },

    _validationErrors(val) {
        const errMsgs = {

            usernameValMsg: val.usernameVal ? '' : 'A valid username is required',
            passwordValMsg: val.passwordVal? '': 'Password contain minimum 6 characters at least 1 Alphabet and 1 Number',
            companynameValMsg: val.companynameVal? '': 'Avalid companyname is required',

        }
        return errMsgs;
    },

    _grabUserInput() {
        return {
           register: this.refs.register.value,
            username: this.refs.username.value,
            password: this.refs.password.value,
            companyname: this.refs.companyname.value,
            companyurl: this.refs.companyurl.value,
        };
    },

    render() {
        // explicit class assigning based on validation
        let notValidClasses = {};

        if (typeof this.state.usernameVal == 'undefined' || this.state.usernameVal) {
            notValidClasses.usernameCls = 'no-error col-md-8';
        }
        else {
            notValidClasses.usernameCls = 'has-error col-md-8';
            notValidClasses.usernameValGrpCls = 'val-err-tooltip';
        }
        if (typeof this.state.passwordVal == 'undefined' || this.state.passwordVal) {
            notValidClasses.passwordCls = 'no-error col-md-8';
        }
        else {
            notValidClasses.passwordCls = 'has-error col-md-8';
            notValidClasses.passwordValGrpCls = 'val-err-tooltip';
        }
        if (typeof this.state.companynameVal == 'undefined' || this.state.companynameVal) {
            notValidClasses.companynameCls = 'no-error col-md-8';
        }
        else {
            notValidClasses.companynameCls = 'has-error col-md-8';
            notValidClasses.companynameValGrpCls = 'val-err-tooltip';
        }



        return (
            <div className="step2">
                <div className="row">
                    <form id="Form" className="form-horizontal">
                        <div className="form-group col-md-12">
                            <label className="control-label col-md-4">
                                <div></div>
                                Registration type
                            </label>
                            <div className="no-error col-md-8">
                                <select ref="register" autoComplete="off" className="form-control" defaultValue={this.state.register} required onBlur={this.validationCheck}>
                                        <option value="0">simplybrowsing</option>
                                        <option value="1">ideator</option>
                                        <option value="2">startup</option>
                                        <option value="3">company</option>
                                        <option value="4">funder/investor</option>
                                        <option value="5">institution</option>
                                        <option value="6">service provider</option>
                                        <option value="7">iam not sure</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group col-md-12">
                            <label className="control-label col-md-4">
                                <div className={notValidClasses.usernameValGrpCls}>{this.state.usernameValMsg}</div>
                                Username
                            </label>
                            <div className={notValidClasses.usernameCls}>
                                <input ref="username" autoComplete="off" type="text" placeholder="Username"  className="form-control" defaultValue={this.state.username} required onBlur={this.validationCheck} />
                            </div>
                        </div>
                        <div className="form-group col-md-12">
                            <label className="control-label col-md-4">
                                <div className={notValidClasses.passwordValGrpCls}>{this.state.passwordValMsg}</div>
                                Password
                            </label>
                            <div className={notValidClasses.passwordCls}>
                                <input ref="password" autoComplete="off" type="password" placeholder="password"  className="form-control" defaultValue={this.state.password} required onBlur={this.validationCheck} />
                            </div>
                        </div>
                        <div className="form-group col-md-12">
                            <label className="control-label col-md-4">
                                <div className={notValidClasses.companynameValGrpCls}>{this.state.companynameValMsg}</div>
                                Companyname
                            </label>
                            <div className={notValidClasses.companynameCls}>
                                <input ref="companyname" autoComplete="off" type="text" placeholder="Companyname"  className="form-control" defaultValue={this.state.companyname} required onBlur={this.validationCheck} />
                            </div>
                        </div>
                        <div className="form-group col-md-12">
                            <label className="control-label col-md-4">
                                <div></div>
                                Companyurl
                            </label>
                            <div className="no-error col-md-8">
                                <input ref="companyurl" autoComplete="off" type="text" placeholder="companyurl"  className="form-control" defaultValue={this.state.companyurl} required onBlur={this.validationCheck} />
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
});
