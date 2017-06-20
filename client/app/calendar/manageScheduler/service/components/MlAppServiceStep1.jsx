import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';


export default class MlAppServiceStep1 extends React.Component{
  componentDidMount()
  {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(310+$('.admin_header').outerHeight(true)));
  }
  render(){
    return (

      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <div className="col-md-6 nopadding-left">
            <div className="form_bg">
              <h1><HI/></h1>
            </div>
          </div>
          <div className="col-md-6 nopadding-right">
            <div className="form_bg">
              <h1>Hello</h1>
            </div>
          </div>
          <br className="brclear"/>
          <div className="panel panel-default">
            <div className="panel-heading">Deliverables</div>
            <div className="panel-body">

            </div>
          </div>
        </ScrollArea>
        <div className="ml_btn" style={{'textAlign':'center'}}>
          <div className="save_btn">Save</div> <div className="cancel_btn">Cancel</div>
        </div>


      {/*<div className="step_form_wrap step1">*/}
        {/*<ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >*/}
          {/*<div className="col-md-6 nopadding-left">*/}
            {/*<div className="form_bg">*/}
              {/*<form>*/}
                {/*<div className="form-group">*/}
                  {/*<input type="text" placeholder="Service Name" className="form-control float-label" id=""/>*/}
                {/*</div>*/}
                {/*<div className="form-group">*/}
                  {/*<label>Total number of Sessions Rs. <input className="form-control inline_input"/> </label>*/}
                {/*</div>*/}
                {/*<div className="form-group">*/}
                  {/*<label>Duration: &nbsp; <input type="text" className="form-control inline_input"/> Hours <input type="text" className="form-control inline_input"/> Mins </label>*/}
                {/*</div>*/}
                {/*<div className="form-group">*/}
                  {/*<input type="text" placeholder="Valid till" className="form-control float-label" id=""/>*/}
                  {/*<FontAwesome name='calendar' className="input_icon"/>*/}
                {/*</div>*/}
              {/*</form>*/}
            {/*</div>*/}
          {/*</div>*/}
          {/*<div className="col-md-6 nopadding-right">*/}
            {/*<div className="form_bg">*/}
              {/*<form>*/}
                {/*<div className="form-group">*/}
                  {/*<input type="text" placeholder="Display Name" className="form-control float-label" id=""/>*/}
                {/*</div>*/}
                {/*<div className="form-group">*/}
                  {/*<span className="placeHolder active">Frequency</span>*/}
                  {/*<select className="form-control"><option>Weekly</option></select>*/}
                {/*</div>*/}
                {/*<div className="form-group switch_wrap inline_switch">*/}
                  {/*<label>Status</label>*/}
                  {/*<label className="switch">*/}
                    {/*<input type="checkbox" />*/}
                    {/*<div className="slider"></div>*/}
                  {/*</label>*/}
                {/*</div>*/}
                {/*<br className="brclear"/>*/}
                {/*<div className="form-group">*/}
                  {/*<label>Service expires &nbsp; <input type="text" className="form-control inline_input"/> days from the date of purchase</label>*/}
                {/*</div>*/}
              {/*</form>*/}
            {/*</div>*/}
          {/*</div>*/}
        {/*</ScrollArea>*/}
      {/*</div>*/}
      </div>
    )
  }
};
