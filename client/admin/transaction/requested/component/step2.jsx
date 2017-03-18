import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
var Select = require('react-select');
import ScrollArea from 'react-scrollbar';
var options = [
    {value: 'select', label: 'Select user type'},
    {value: 'one', label: 'One'},
    {value: 'two', label: 'Two'}
];
var options1 = [
    {value: 'select', label: 'Citizenship'},
    {value: 'one', label: 'One'},
    {value: 'two', label: 'Two'}
];
var options2 = [
    {value: 'select', label: 'Employment Status'},
    {value: 'one', label: 'One'},
    {value: 'two', label: 'Two'}
];
var options3 = [
    {value: 'select', label: 'Industry'},
    {value: 'one', label: 'One'},
    {value: 'two', label: 'Two'}
];
var options4 = [
    {value: 'select', label: 'Profession'},
    {value: 'one', label: 'One'},
    {value: 'two', label: 'Two'}
];
export default class Step2 extends React.Component{
componentDidMount()
  {
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(160+$('.admin_header').outerHeight(true)));
  }
  render(){
    return (
      <div className="step_form_wrap step2">
      <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
<div className="col-md-6 nopadding-left">
          <div className="form_bg">
              <form>
            <div className="form-group">
              <input type="text" placeholder="Date & Time" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Request id" className="form-control float-label" id=""/>
            </div>
            <div className="ml_tabs">
                      <ul  className="nav nav-pills">
                        <li className="active">
                          <a  href="#3a" data-toggle="tab">Individual&nbsp;</a>
                        </li>
                        <li>
                          <a href="#4a" data-toggle="tab">Company&nbsp;</a>
                        </li>

                      </ul>

                    </div>
            <div className="form-group">
                <Select name="form-field-name" placeholder="select user category"options={options} className="float-label"/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Company name" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Group name" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Company website" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Comapany email" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Foundation date" className="form-control float-label" id=""/>
              <FontAwesome name="calendar" className="password_icon"/>
            </div>
            <div className="form-group">
                <Select name="form-field-name" placeholder="Headquarter location" options={options1} className="float-label"/>
            </div>
            <div className="form-group">
                <Select name="form-field-name" placeholder="Branch location" options={options1} className="float-label"/>
            </div>
                <div className="form-group">
                  <input type="text" placeholder="ISO certification number" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Comapany turnover" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Partners" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Investors" className="form-control float-label" id=""/>
                </div>
                <div className="form-group">
                  <Select name="form-field-name" placeholder="Looking for" options={options1} className="float-label"/>
                </div>

          </form>
          </div>
    </div>
    <div className="col-md-6 nopadding-right">
    <div className="form_bg">
    <form>
            <div className="form-group">
              <Select name="form-field-name" placeholder="Select Type Of Company"  options={options} className="float-label"/>
            </div>
            <div className="form-group">
              <Select name="form-field-name" placeholder="Select Type Of Entity"  options={options} className="float-label"/>
            </div>
            <div className="form-group">
              <Select name="form-field-name" placeholder="Select Type Of Business"  options={options} className="float-label"/>
            </div>
            <div className="form-group">
              <Select name="form-field-name" placeholder="Select Industry"  options={options} className="float-label"/>
            </div>
            <div className="form-group">
              <Select name="form-field-name" placeholder="Select Subdomain"  options={options} className="float-label"/>
            </div>
            <div className="form-group">
              <Select name="form-field-name" placeholder="Select Stage Of Company"  options={options} className="float-label"/>
            </div>
            <div className="form-group">
              <Select name="form-field-name" placeholder="Select Subsidary Company" options={options} className="float-label"/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Enter Holding/Group/Owner Company Name" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Registration number" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="CEO name" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Total number of management people" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Total number of employee" className="form-control float-label" id=""/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Associate company" className="form-control float-label" id=""/>
            </div>

</form>
      </div>
    </div>
    </ScrollArea>
      </div>
    )
  }
};
