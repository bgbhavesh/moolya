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
    super(props);
  }

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

  componentDidMount() {
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
    console.log('----data-step4--', this.props.data);
    const {
      servicePayment,
      facilitationCharge,
      checkDiscountEligibility,
      checkDiscountStatus,
      calculateDiscounts,
      checkTaxStatus,
      checkPromoStatus,
      taxStatus,
      saveService} = this.props.data;
    const {chargeType, checkChargeStatus, calculateCharges} = this.props;
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
          <div className="centered_form">
            <form>
              <div className="form-group">
                <label>
                  Tasks actual amount
                  <input type="number" disabled value={servicePayment.tasksAmount}  className="form-control" />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Task discount amount
                  <input type="number" disabled value={servicePayment.tasksDiscount}  className="form-control" />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Task derived amount
                  <input type="number" disabled value={servicePayment.tasksDerived}  className="form-control "/>
                </label>
              </div>
              <div className="form-group switch_wrap switch_names inline_switch">
                <label htmlFor="discount">Is Eligible for discount</label>
                <span className={servicePayment.isDiscount ? 'state_label acLabel' : 'state_label'}>Yes</span><label htmlFor="discount" className="switch nocolor-switch">
                <input type="checkbox" id="discount"
                       checked={!servicePayment.isDiscount}
                       value={servicePayment.isDiscount} disabled />
                <div className="slider"></div>
              </label>
                <span className={servicePayment.isDiscount ? 'state_label' : 'state_label acLabel'}>No</span>
              </div>
              <br className="brclear"/>
              <div className="form-group">
                <div className="input_types">
                  <input id="amount" type="radio" name="amount"
                         value="Amount" checked={servicePayment.discountType === 'amount' ? true : false}
                         disabled />
                  <label htmlFor="amount"><span><span></span></span>Amount Rs
                    {servicePayment.discountType === 'amount' ?
                      <input className="form-control inline_input"
                             disabled
                             value={servicePayment.discountValue}/> : <div></div>}
                  </label>
                </div>
                <div className="input_types">
                  <input id="percent" type="radio" name="percent"
                         value="Percentage" checked={servicePayment.discountType === 'percent' ? true : false}
                         disabled />
                  <label htmlFor="percent"><span><span></span></span>
                    Percentage{servicePayment.discountType === 'percent'?
                      <input className="form-control inline_input" disabled
                             value={servicePayment.discountValue}/>:<div></div>}
                  </label>
                </div>
                <br className="brclear"/>
              </div>
              <div className="form-group">
                <div className="input_types">
                  <input id="taxinclusive" type="radio" name="taxinclusive"
                         value="taxinclusive" checked={taxStatus === 'taxinclusive' ? true : false}
                         disabled />
                  <label htmlFor="taxinclusive"><span><span></span></span>Tax Inclusive</label>
                </div>
                <div className="input_types">
                  <input id="taxexclusive" type="radio" name="taxexclusive"
                         value="taxexclusive" checked={taxStatus === 'taxexclusive' ? true : false}
                         disabled />
                  <label htmlFor="taxexclusive"><span><span></span></span>Tax Exclusive </label>
                </div>
                <br className="brclear"/>
              </div>
              <div className="form-group switch_wrap switch_names inline_switch">
                <label htmlFor="promo">Is Applicable for PROMOCODE</label>
                <span className={servicePayment.isPromoCodeApplicable ? 'state_label acLabel' : 'state_label'}>Yes</span><label htmlFor="promo" className="switch nocolor-switch">
                <input id="promo" type="checkbox" checked={!servicePayment.isPromoCodeApplicable}
                       value={servicePayment.isPromoCodeApplicable} disabled />
                <div className="slider"></div>
              </label>
                <span className={servicePayment.isPromoCodeApplicable ? 'state_label' : 'state_label acLabel'}>No</span>
              </div>
              <br className="brclear"/>
              <div className="form-group">
                <label>Enter facilitation charges &nbsp; &nbsp;</label>
                <div className="input_types">
                  <input id="facilitationamount" type="radio"
                         name="facilitationamount"
                         checked={chargeType === 'facilitationamount' ? true : false}
                         onChange={(event) => checkChargeStatus(event)}
                         value="Amount" />
                  <label htmlFor="facilitationamount"><span><span></span></span>Amount Rs
                    <input className="form-control inline_input"
                           id="amount"
                           value={facilitationCharge.amount}
                           onChange={(event) => calculateCharges(event)} />
                  </label>
                </div>
                <div className="input_types">
                  <input id="facilitationpercent" type="radio"
                         name="facilitationpercent"
                         checked={chargeType === 'facilitationpercent' ? true : false}
                         onChange={(event) => checkChargeStatus(event)}
                         value="Percentage"/>
                  <label htmlFor="radio2"><span><span></span></span>Percentage
                    <input className="form-control inline_input"
                           id="percentage"
                           value={facilitationCharge.percentage}
                           onChange={(event) => calculateCharges(event)}/>
                  </label>
                </div>
              </div>
              <div className="form-group">
                <label>Derived amount Rs. <input className="form-control inline_input medium_in"
                                                 value={facilitationCharge.derivedAmount} readOnly="readOnly"/>
                </label>
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
