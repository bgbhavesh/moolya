import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';

export default class Step4 extends React.Component{
constructor(props){
  super(props)
  this.state={
    minute:"",
    discount:"",
    taxAmountR:"",
    taxPercentageR:"",
    status:"",
    promo:"",
    chargesAmount:"",
    chargesPercentage:"",
    derivedValue:0
  }
}

  discountEligibility(e){
  let discount = e.target.checked;
  this.setState({discount:discount})
  }

  discountAmountRadio(e) {
    let tax = e.target.checked;
    console.log(tax)
    this.setState({discountAmountR:tax})
  }

  discountPercentageRadio(e) {
    let tax = e.target.checked;
    this.setState({discountPercentageR:tax})
  }

  taxStatus(e) {
    let status = e.target.value;
    this.setState({status:status})
  }

  payableAmount(e){
  if(e.currentTarget.value >= 0) {
    this.setState({"amountToPay":e.currentTarget.value});
  } else {
    this.setState({"amountToPay":0});
  }
}
  discountAmount(e){
    if(this.state.discountAmountR) {
      if (e.currentTarget.value >= 0) {
        this.setState({"discountAmount": e.currentTarget.value});
      } else {
        this.setState({"discountAmount": 0});
      }
    }
  }

  discountPercentage(e){
    if(this.state.discountPercentageR) {
      if (e.currentTarget.value >= 0) {
        this.setState({"discountPercentage": e.currentTarget.value});
      } else {
        this.setState({"discountPercentage": 0.0});
      }
    }
  }


  facilitationAmount(e){
    if(this.state.chargesAmount) {
      if (e.currentTarget.value >= 0) {
        this.setState({"facilitationAmount": e.currentTarget.value});
      } else {
        this.setState({"facilitationAmount": 0});
      }
    }
  }

  facilitationPercentage(e){
    if(this.state.chargesPercentage) {
      if (e.currentTarget.value >= 0) {
        this.setState({"facilitationPercentage": e.currentTarget.value});
      } else {
        this.setState({"facilitationPercentage": 0.0});
      }
    }
  }

  promoCode(e) {
    let promoCode = e.target.checked;
    this.setState({promo:promoCode})
  }

  facilitationChargesPercentage(e) {
    let charges = e.target.checked;
    console.log(charges)
    this.setState({chargesPercentage: charges})
  }

  facilitationChargesAmount(e) {
    let charges = e.target.checked
    console.log(charges)
    this.setState({chargesAmount: charges})
  }

  saveDetails(){
    console.log(this.state.chargesAmount,this.state.facilitationAmount,this.state.taxAmount, this.state.amountToPay, )
  }


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
          <div className="centered_form">
            <form>
              <div className="form-group">
                <label>Enter payable amount Rs.<input type="number" onChange={(e)=>this.payableAmount(e)} value={this.state.amountToPay}  className="form-control "/>
                </label>
              </div>
              <div className="form-group switch_wrap switch_names inline_switch">
                <label>Is Eligible for discount</label>
                <span className="state_label">Yes</span><label className="switch nocolor-switch">
                <input type="checkbox" onChange={this.discountEligibility.bind(this)} />
                <div className="slider"></div>
              </label>
                <span className="state_label acLabel">No</span>
              </div>
              <br className="brclear"/>
              <div className="form-group">
                <div className="input_types">
                  <input id="radio1" type="radio" name="radio1" value="Amount" onChange={this.discountAmountRadio.bind(this)}/><label htmlFor="radio1"><span><span></span></span>Amount Rs <input className="form-control inline_input" onChange={(e)=>this.discountAmount(e)} value={this.state.discountAmount}  /></label>
                </div>
                <div className="input_types">
                  <input id="radio2" type="radio" name="radio1" value="Percentage" onChange={this.discountPercentageRadio.bind(this)}/><label htmlFor="radio2"><span><span></span></span>Percentage <input className="form-control inline_input" onChange={(e)=>this.discountPercentage(e)} value={this.state.discountPercentage} /> % </label>
                </div>
                <br className="brclear"/>
              </div>
              <div className="form-group">
                <div className="input_types">
                  <input id="radio1" type="radio" name="radio2" value="TaxInclusive" onChange={this.taxStatus.bind(this)}/><label htmlFor="radio1"><span><span></span></span>Tax Inclusive</label>
                </div>
                <div className="input_types">
                  <input id="radio2" type="radio" name="radio2" value="TaxExclusive" onChange={this.taxStatus.bind(this)}/><label htmlFor="radio2"><span><span></span></span>Tax Exclusive </label>
                </div>
                <br className="brclear"/>
              </div>
              <div className="form-group switch_wrap switch_names inline_switch">
                <label>Is Applicable for PROMOCODE</label>
                <span className="state_label">Yes</span><label className="switch nocolor-switch">
                <input type="checkbox"  onChange={this.promoCode.bind(this)}/>
                <div className="slider"></div>
              </label>
                <span className="state_label acLabel">No</span>
              </div>
              <div className="form-group">
                <label>Enter facilitation charges &nbsp; &nbsp; &nbsp; &nbsp; </label>
                <div className="input_types">
                  <input id="radio1" type="radio" name="radio3" value="Amount" onChange={this.facilitationChargesAmount.bind(this)}/><label htmlFor="radio1"><span><span></span></span>Amount Rs <input className="form-control inline_input" onChange={(e)=>this.facilitationAmount(e)} value={this.state.facilitationAmount} /></label>
                </div>
                <div className="input_types">
                  <input id="radio2" type="radio" name="radio3" value="Percentage" onChange={this.facilitationChargesPercentage.bind(this)}/><label htmlFor="radio2"><span><span></span></span>Percentage <input className="form-control inline_input" onChange={(e)=>this.facilitationPercentage(e)} value={this.state.facilitationPercentage} /> % </label>
                </div>
                <br className="brclear"/>
              </div>
              <div className="form-group">
                <label>Derived amount Rs. <input className="form-control inline_input medium_in" defaultValue={this.state.derivedValue}readOnly="readOnly"/> </label>
              </div>
            </form>
          </div>
        </ScrollArea>
        <div className="ml_btn" style={{'textAlign':'center'}}>
          <div className="save_btn" onClick={this.saveDetails.bind(this)}>Save</div> <div className="cancel_btn">Cancel</div>
        </div>
      </div>
    )
  }
};
