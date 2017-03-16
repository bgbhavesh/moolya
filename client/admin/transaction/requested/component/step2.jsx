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
              <input type="text" placeholder="Request ID" className="form-control float-label" id=""/>    
            </div>
            <div className="form-group">                
                <Select name="form-field-name"value="select"options={options} className="float-label"/>
            </div>
            <div className="form-group">    
              <input type="text" placeholder="Title" className="form-control float-label" id=""/>    
            </div>
            <div className="form-group">    
              <input type="text" placeholder="First Name" className="form-control float-label" id=""/>    
            </div>
            <div className="form-group">    
              <input type="text" placeholder="Middle Name" className="form-control float-label" id=""/>    
            </div>
            <div className="form-group">    
              <input type="text" placeholder="Last Name" className="form-control float-label" id=""/>    
            </div>            
            <div className="form-group">    
              <input type="text" placeholder="Display Name" className="form-control float-label" id=""/>    
            </div>
            <div className="form-group">    
              <input type="text" placeholder="DOB" className="form-control float-label" id=""/>
              <FontAwesome name="calendar" className="password_icon"/>    
            </div>
            <div className="form-group">
                        <div className="input_types">
                           <label>Gender : </label>
                        </div>
                        <div className="input_types">
                           <input id="radio1" type="radio" name="radio" value="1"/><label htmlFor="radio1"><span><span></span></span>Male</label>
                        </div>
                        <div className="input_types">
                           <input id="radio2" type="radio" name="radio" value="2"/><label htmlFor="radio2"><span><span></span></span>Female</label>
                        </div>
                        <div className="input_types">
                           <input id="radio3" type="radio" name="radio" value="2"/><label htmlFor="radio3"><span><span></span></span>Others</label>
                        </div>
                        <br className="brclear"/>
                     </div>
            <div className="form-group">                
                <Select name="form-field-name" value="select" options={options1} className="float-label"/>
            </div>
          </form>
          </div>
    </div>
    <div className="col-md-6 nopadding-right">
    <div className="form_bg">
    <form>
         <div className="form-group">
              <input type="text" placeholder="Qualification" className="form-control float-label" id=""/>        
            </div>
            <div className="form-group">                
                <Select name="form-field-name" value="select" options={options2} className="float-label"/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Professional tag" className="form-control float-label" id=""/>        
            </div>
            <div className="form-group">                
                <Select name="form-field-name" value="select" options={options3} className="float-label"/>
            </div>
            <div className="form-group">                
                <Select name="form-field-name" value="select" options={options4} className="float-label"/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Employer name" className="form-control float-label" id=""/>        
            </div>
            <div className="form-group">
              <input type="text" placeholder="Employer website" className="form-control float-label" id=""/>        
            </div>
            <div className="form-group">
              <input type="text" placeholder="Employment date" className="form-control float-label" id=""/> 
              <FontAwesome name="calendar" className="password_icon"/>       
            </div>

</form>
      </div>
    </div>
    </ScrollArea>
      </div>      
    )
  }
};