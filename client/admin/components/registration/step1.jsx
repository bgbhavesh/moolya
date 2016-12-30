import React from 'react';
import MoolyaDatepicker from '../../../common/components/Datepicker.jsx'
import Select from 'react-select';
import 'react-select/dist/react-select.css'
Step1=React.createClass({


  getInitialState: function() {
    this.state = {
            name:'',
            email: '',
           contact:'',
            city:'',
      selectedDate:'',
        };

        return this;
    },


  componentWillMount() {
    let step1res=localStorage.getItem('step1')
    if(step1res==undefined){
      let self=this;
      self.setState({
        name:'',
        email: '',
        contact:'',
        city:'',
        selectedDate:'',
      });

      return self;
    }else{
      let step1=JSON.parse(step1res)
      let self=this;
      self.setState({
        name: step1.name,
        email: step1.email,
        contact:step1.contact,
        city: step1.city,
        selectedDate: step1.selectedDate
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

          // console.log(this._grabUserInput())

            localStorage.setItem( 'step1', JSON.stringify(this._grabUserInput()) );
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
           nameVal: /^[a-zA-Z0-9'.\s]{1,40}$/.test(data.name),
            genderVal: (data.gender != 0), // required: anything besides N/A
            contactVal: /^[0-9]{10}$/.test(data.contact),
          //  contactVal: undefined,
           cityVal:/^[a-zA-Z0-9'.\s]{1,40}$/.test(data.city) ,
            emailVal: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(data.email),
        }
    },

    _validationErrors(val) {
        const errMsgs = {
            nameValMsg:val.nameVal?'':'A valid name is required',
           contactValMsg:val.contactVal?'':'Avalid contact is required',
            emailValMsg: val.emailVal ? '' :'A valid email is required',
            cityValMsg: val.cityVal ? '' : 'A valid city is required'
        }
        return errMsgs;
    },


  _grabUserInput() {

        return {
            name: this.refs.name.value,
            email: this.refs.email.value,
            contact: this.refs.contact.value,
           city:this.refs.city.value,
          selectedDate:this.state.selectedDate,

        };
    },
  selectDate(date){
  //alert(date)
    this.setState({selectedDate:date})
  },

    render() {
        // explicit class assigning based on validation
        let notValidClasses = {};
          if (typeof this.state.nameVal == 'undefined' || this.state.nameVal) {
                notValidClasses.nameCls = 'no-error col-md-8';
            }
            else {
                notValidClasses.nameCls = 'has-error col-md-8';
                notValidClasses.nameValGrpCls = 'val-err-tooltip';
            }

            if (typeof this.state.emailVal == 'undefined' || this.state.emailVal) {
                notValidClasses.emailCls = 'no-error col-md-8';
            }
            else {
                notValidClasses.emailCls = 'has-error col-md-8';
                notValidClasses.emailValGrpCls = 'val-err-tooltip';
            }
            if (typeof this.state.contactVal == 'undefined' || this.state.contactVal) {
                notValidClasses.contactCls = 'no-error col-md-8';
            }
            else {
                notValidClasses.contactCls = 'has-error col-md-8';
                notValidClasses.contactValGrpCls = 'val-err-tooltip';
            }
            if (typeof this.state.cityVal == 'undefined' || this.state.cityVal) {
                notValidClasses.cityCls = 'no-error col-md-8';
            }
            else {
                notValidClasses.cityCls = 'has-error col-md-8';
                notValidClasses.cityValGrpCls = 'val-err-tooltip';
            }

        return (
            <div className="step1" >
                <div className="row" >
                    <form id="Form" className="form-horizontal">
                        <div className="form-group col-md-12">
                            <label className="control-label col-md-4">
                                <div className={notValidClasses.nameValGrpCls}>{this.state.nameValMsg}</div>
                                Name
                            </label>
                            <div className={notValidClasses.nameCls}>
                                <input ref="name" autoComplete="off" type="text" placeholder="name" id="name" className="form-control" defaultValue={this.state.name} required onBlur={this.validationCheck} />
                            </div>
                        </div>
                        <div className="form-group col-md-12">
                            <label className="control-label col-md-4">
                                <div className={notValidClasses.contactValGrpCls}>{this.state.contactValMsg}</div>
                                Contact Number
                            </label>
                            <div className={notValidClasses.contactCls}>
                                <input ref="contact" autoComplete="off" type="Number" placeholder="contact" className="form-control" defaultValue={this.state.contact} required onBlur={this.validationCheck} />
                            </div>
                        </div>


                        <div className="form-group col-md-12">
                            <label className="control-label col-md-4">
                                <div className={notValidClasses.emailValGrpCls}>{this.state.emailValMsg}</div>
                                Email
                            </label>
                            <div className={notValidClasses.emailCls}>
                                <input ref="email" autoComplete="off" type="email" placeholder="john.smith@example.com" className="form-control" defaultValue={this.state.email} required onBlur={this.validationCheck} />
                            </div>
                        </div>

                        <div className="form-group col-md-12">
                            <label className="control-label col-md-4">
                                <div className={notValidClasses.cityValGrpCls}>{this.state.cityValMsg}</div>
                                City
                            </label>
                            <div className={notValidClasses.cityCls}>
                                <input ref="city" autoComplete="off" type="text" placeholder="city" className="form-control" defaultValue={this.state.city} required onBlur={this.validationCheck} />
                            </div>
                        </div>
                      <div className="form-group col-md-12">
                        <label className="control-label col-md-4">
                          <div className={notValidClasses.dateValGrpCls}>{this.state.dateValMsg}</div>
                         Date
                        </label>
                          <div className="no-error col-md-8">
                          <MoolyaDatepicker dateformate="dd/mm/yy" value={this.state.selectedDate} customSelect={this.selectDate}  />
                        </div>
                      </div>
                    </form>
                </div>
            </div>
        )
    }

});


