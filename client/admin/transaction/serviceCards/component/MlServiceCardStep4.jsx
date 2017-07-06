/** ************************************************************
 * Date: 19 Jun, 2017
 * Programmer: Mukhil <mukhil.padnamanabhan@raksan.in>
 * Description : This is the list view
 * JavaScript XML file MlserviceCardsList.jsx
 * *************************************************************** */

/**
 * Imports libs and components
 */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
import {getTaskFromService, updateServiceActionHandler} from '../actions/mlFindService'
import {MoolyaToggleSwitch} from '../../../../admin/utils/formElemUtil'

export default class MlServiceCardStep4 extends React.Component{

  /**
   * Constructor
   * @param props :: Object - Parents data
   */

  constructor(props){
    super(props)
    this.state={
      minute:"",
      discount:false,
      discountAmountR:false,
      discountPercentageR:false,
      status:"",
      promo:false,
      chargesAmount:0,
      chargesPercentage:"",
      derivedValue:0,
      discountAmountField:true,
      discountType:"",
      discountValue:""
    }
    this.getDetails.bind(this)
  }

  /**
   * componentWillMount
   * Desc :: Calls the function getDetails
   */

  componentWillMount() {
    this.getDetails()
  }

  /**
   * Method :: getDetails
   * Desc   :: getTaskFromService() is called and respective states are set
   * @returns :: void
   */

  async getDetails() {
    let id = this.props.data._id
    const resp = await getTaskFromService(id)
    console.log(resp)
    if (resp.payment) {
      this.setState({
        derivedValue: resp.payment.amount,
        discountAmount: resp.payment.discountValue,
        discountType:resp.payment.discountType,
        discountPercentage: resp.payment.discountValue,
        status: resp.payment.isTaxInclusive,
        promo: resp.payment.isPromoCodeApplicable,
        tasks: resp.tasks,
        tasksAmount: resp.payment.tasksAmount,
        tasksDerived: resp.payment.tasksDerived,
        tasksDiscount: resp.payment.tasksDiscount,
        facilitationAmount: resp.facilitationCharge.amount,
        facilitationPercentage: resp.facilitationCharge.percentage
      })
    }
    if (this.state.discountType === 'amount') {
        this.setState({discountAmountR: true, discountPercentageR: false, discountPercentage: 0})
    }else {
        this.setState({discountAmountR: false, discountPercentageR: true, discountAmount: 0})
    }
    let amount = this.state.amountToPay;
    if (this.state.derivedValue === 0) {
    if (this.state.discountType === 'amount') {
      let discount = this.state.discountAmount;
      let value = amount - discount
      this.setState({derivedValue: value})
    } else {
      let discount = this.state.discountPercentage;
      let value = amount * discount / 100
      this.setState({derivedValue: value})
    }
  }
  if(this.state.facilitationAmount !== 0) {
    this.setState({chargesAmount: true})
  }else if(this.state.facilitationPercentage !== 0){
      this.setState({chargesPercentage: true})
    }
  }

  /**
   * Method :: facilitationAmount
   * Desc   :: Calculation for facilitation amount is done
   * @params :: event handler
   * @returns :: void
   */

  facilitationAmount(e){
    if(e.currentTarget.value ==="") {
      e.currentTarget.value = 0;
    }
    if (e.currentTarget.value >= 0) {
      this.setState({"facilitationAmount": e.currentTarget.value}, function() {
        // if(this.state.amountToPay || this.state.discountAmount) {
        //   let amountPayable = this.state.amountToPay?parseInt(this.state.amountToPay):0;
        //   let discount = this.state.discountAmount?parseInt(this.state.discountAmount):0;
        //   if(amountPayable & discount) {
        //     let total = amountPayable - discount + parseInt(this.state.facilitationAmount);
        //     this.setState({derivedValue:total})
        //   } else if(amountPayable) {
        //     let total = amountPayable + parseInt(this.state.facilitationAmount);
        //     this.setState({derivedValue:total})
        //   } else if(discount) {
        //     let total = parseInt(this.state.facilitationAmount) - discount;
        //     this.setState({derivedValue:total})
        //   }
        // } else {
        //   let total = parseInt(this.state.facilitationAmount)
        //   this.setState({derivedValue:total})
        // }
        if(this.state.chargesAmount){
          let facilitationAmount = parseInt(this.state.facilitationAmount)
          let derivedAmount = parseInt(this.state.derivedValue)
          let total = derivedAmount + facilitationAmount;
          this.setState({derivedValue:total})
        }
      }).bind(this);
    } else {
      this.setState({"facilitationAmount": 0});
    }
  }

  /**
   * Method :: facilitationPercentage
   * Desc   :: Calculation for facilitation percentage is done
   * @params :: event handler
   * @returns :: void
   */

  facilitationPercentage(e){
    if(e.currentTarget.value ==="") {
      e.currentTarget.value = 0.0;
    }
    if(this.state.chargesPercentage) {
      if (e.currentTarget.value >= 0.0) {
        this.setState({"facilitationPercentage": e.currentTarget.value}, function(){
          // if(this.state.discountPercentage) {
          //   let totalPercentage = parseFloat(this.state.facilitationPercentage) - parseFloat(this.state.discountPercentage);
          //   let amountPayable = this.state.amountToPay?parseFloat(this.state.amountToPay):0.0;
          //   let total = (amountPayable * totalPercentage / 100)+ amountPayable ;
          //   this.setState({derivedValue:total})
          // }else{
          //   let totalPercentage = parseFloat(this.state.facilitationPercentage);
          //   let amountPayable = this.state.amountToPay?parseFloat(this.state.amountToPay):0.0;
          //   let total = (amountPayable * totalPercentage / 100)+ amountPayable
          //   this.setState({derivedValue:total})
          // }
          let facilitationPercentage = parseInt(this.state.facilitationPercentage)
          let derivedAmount = parseInt(this.state.derivedValue)
          let total = (derivedAmount * facilitationPercentage)/100;
          this.setState({derivedValue:total})
        }).bind(this);
      } else {
        this.setState({"facilitationPercentage": 0.0});
      }
    }
  }

  /**
   * Method :: facilitationChargesPercentage
   * Desc   :: Radio button for facilitation charges percentage
   * @params :: event handler
   * @returns :: void
   */


  facilitationChargesPercentage(e) {
    let charges = e.target.checked;
    this.setState({chargesPercentage: charges})
  }


  /**
   * Method :: facilitationChargesAmount
   * Desc   :: Radio button for facilitation charges amount
   * @params :: event handler
   * @returns :: void
   */

  facilitationChargesAmount(e) {
    let charges = e.target.checked
    this.setState({chargesAmount: charges})
  }

  /**
   * Method :: saveDetails
   * Desc   :: Performs the saving action
   * @returns :: response - type :: number
   */

  async saveDetails(){
    let amount = this.state.discountAmount;
    let percentage = this.state.discountPercentage;
    if(this.state.discountType === 'amount') {
      this.setState({discountValue: amount})
    } else {
      this.setState({discountValue: percentage})
    }
    let id = this.props.data._id;
    let payment = {
      amount: this.state.derivedValue,
      isDiscount: this.state.discount ? this.state.discount : false,
      discountType: this.state.discountType,
      discountValue: this.state.discountValue,
      isTaxInclusive: this.state.status,
      isPromoCodeApplicable: this.state.promo
    }
    let facilitationCharge = {
      amount:this.state.facilitationAmount?parseInt(this.state.facilitationAmount):0,
      percentage: this.state.facilitationPercentage?parseFloat(this.state.facilitationPercentage):0.0,
      derivedAmount: this.state.derivedValue?parseFloat(this.state.derivedValue):0.0
    }
    let Details ={
      payment:payment,
      facilitationCharge: facilitationCharge
    }
    console.log(payment)
    const response = await updateServiceActionHandler(id,Details)
    if(response) {;
      toastr.success("Saved Successfully")
    }
    return response;
  }

  /**
   * Method :: approveDetails
   * Desc   :: Approves the service card
   * @returns :: response - type :: number
   */

  async approveDetails() {
    let id = this.props.data._id;
    let Details= {
      isApproved: true
    }
    const response = await updateServiceActionHandler(id,Details)
    if(response){
      toastr.success("Service Card Approved")
    }
    return response
  }

  /**
   * Method :: rejectDetails
   * Desc   :: Rejects the service card
   * @returns :: response - type :: number
   */

  async rejectDetails() {
    let id = this.props.data._id;
    let Details= {
      isApproved: false
    }
    const response = await updateServiceActionHandler(id,Details)
    if(response){
      toastr.error("Service Card Rejected")
    }
    return response
  }

  /**
   * ComponentDidMount
   * Desc :: Initializing the float labels
   */

  componentDidMount()
  {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(310+$('.admin_header').outerHeight(true)));
  }

  /**
   * componentDidUpdate
   * Desc :: Updates the Toggle Switch
   */

  componentDidUpdate() {
    MoolyaToggleSwitch(true, true);
  }

  /**
   * Render
   * Desc   :: Render the HTML for this component
   * @returns {HTML}
   */

  render(){
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <div className="centered_form">
            <form>
              <div className="form-group">
                <label>
                  Tasks actual amount
                  <input type="number" disabled value={this.state.tasksAmount}  className="form-control "/>
                </label>
              </div>
              <div className="form-group">
                <label>
                  Task discount amount
                  <input type="number" disabled value={this.state.tasksDiscount}  className="form-control "/>
                </label>
              </div>
              <div className="form-group">
                <label>
                  Task derived amount
                  <input type="number" disabled value={this.state.tasksDerived}  className="form-control "/>
                </label>
              </div>
              <div className="form-group switch_wrap switch_names inline_switch">
                <label>Is Eligible for discount
                </label>
                <span className="state_label">Yes
                </span>
                <label className="switch nocolor-switch">
                  {this.state.discount}
                  <input type="checkbox" checked={this.state.discount} disabled/>
                  <div className="slider">
                  </div>
                </label>
                <span className="state_label acLabel">No
                </span>
              </div>
              <br className="brclear"/>
              <div className="form-group">
                <div className="input_types">
                  <input id="radio1" type="radio" name="radio1" value="Amount" checked={this.state.discountAmountR} disabled /><label htmlFor="radio1"><span><span></span></span>Amount Rs {this.state.discountType === 'amount'?<input className="form-control inline_input" disabled value={this.state.discountAmount}/>:<div></div>}</label>
                </div>
                <div className="input_types">
                  <input id="radio2" type="radio" name="radio1" value="Percentage" checked={this.state.discountPercentageR} disabled /><label htmlFor="radio2"><span><span></span></span>Percentage{this.state.discountType === 'percent'?<input className="form-control inline_input" disabled value={this.state.discountPercentage}/>:<div></div>}</label>
                </div>
                <br className="brclear"/>
              </div>
              <div className="form-group">
                <div className="input_types">
                  <input id="radio1" type="radio" name="radio2" value="TaxInclusive" checked={this.state.status} disabled/><label htmlFor="radio1"><span><span></span></span>Tax Inclusive</label>
                </div>
                <div className="input_types">
                  <input id="radio2" type="radio" name="radio2" value="TaxExclusive" checked={!this.state.status} disabled/><label htmlFor="radio2"><span><span></span></span>Tax Exclusive </label>
                </div>
                <br className="brclear"/>
              </div>
              <div className="form-group switch_wrap switch_names inline_switch">
                <label>Is Applicable for PROMOCODE</label>
                <span className="state_label">Yes</span>
                <label className="switch nocolor-switch">
                  <input type="checkbox" defaultChecked={this.state.promo} disabled/>
                  <div className="slider"></div>
              </label>
                <span className="state_label acLabel">No</span>
              </div>
              <br className="clearfix"/>
              <br className="clearfix"/><br className="clearfix"/>
              <div className="form-group">
                <label>Enter facilitation charges &nbsp; &nbsp; &nbsp; &nbsp; </label>
                <div className="input_types">
                  <input id="radio1" type="radio" name="radio3" value="Amount" onChange={this.facilitationChargesAmount.bind(this)} /><label htmlFor="radio1"><span><span></span></span>Amount Rs <input className="form-control inline_input" onChange={this.facilitationAmount.bind(this)}   value={this.state.facilitationAmount} /></label>
                </div>
                <div className="input_types">
                  <input id="radio2" type="radio" name="radio3" value="Percentage" onChange={this.facilitationChargesPercentage.bind(this)} /><label htmlFor="radio2"><span><span></span></span>Percentage <input className="form-control inline_input" onChange={this.facilitationPercentage.bind(this)}  value={this.state.facilitationPercentage} /></label>
                </div>
                <br className="brclear"/>
              </div>
              <div className="form-group">
                <label>Derived amount Rs. <input className="form-control inline_input medium_in" value={this.state.derivedValue} readOnly="readOnly"/> </label>
              </div>
            </form>
          </div>
        </ScrollArea>
        <div className="ml_btn" style={{'textAlign':'center'}}>
          <div className="save_btn" onClick={this.saveDetails.bind(this)}>Save</div><div className="save_btn" onClick={this.approveDetails.bind(this)}>Approve</div> <div className="cancel_btn" onClick={this.rejectDetails.bind(this)}>Reject</div>
        </div>
      </div>
    )
  }
};
