import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css'
Step2=React.createClass({


  getInitialState: function() {
    this.state = {

            register: '',
            username:'',
            password:'',
            companyurl:'',
            companyname:'',
      selectedValue: '',

        };

        return this;
    },
  componentWillMount() {
    let step2res=localStorage.getItem('step2')
    if(step2res==undefined){
      let self=this;
      self.setState({
        register: '',
        username:'',
        password:'',
        companyurl:'',
        companyname:'',
      });

      return self;
    }else{
      let step2=JSON.parse(step2res)
      let self=this;
      self.setState({
        register: step2.register,
        username:step2.username,
        password:step2.password,
        companyurl:step2.companyurl,
        companyname:step2.companyname,
      });

      return self;
    }

  },



    componentWillUnmount() {},

    isValidated() {
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

    validationCheck() {
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
           register: this.state.selectedValue,
            username: this.refs.username.value,
            password: this.refs.password.value,
            companyname: this.refs.companyname.value,
            companyurl: this.refs.companyurl.value,
        };
    },
  registrationSelect(val) {

    console.log(val.value)
    this.setState({ selectedValue: val.value });
  },

    render() {

      let registrationOption = [
        { value: '0', label: 'simplybrowsing' },
        { value: '1', label: 'ideator' },
        { value: '2', label: 'startup' },
        { value: '3', label: 'company' },
        { value: '4', label: 'funder/investor' },
        { value: '5', label: 'institution' },
        { value: '6', label: 'service provider' },
        { value: '7', label: 'iam not sure' },
      ];

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
                              <Select options={registrationOption}  value={this.state.selectedValue}  onChange={this.registrationSelect}
                              />
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
