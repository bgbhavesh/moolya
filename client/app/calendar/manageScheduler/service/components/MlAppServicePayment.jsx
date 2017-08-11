/**
 * Parent component for service
 * @Author :: Mukhil P
 * @Dated :: 20/06/2017
 */

// import NPM module(s)
import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import ScrollArea from 'react-scrollbar';

// import custom method(s) and component(s)
import {MoolyaToggleSwitch} from '../../../../../admin/utils/formElemUtil'

export default class MlAppServicePayment extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount() {
    let WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(300+$('.app_header').outerHeight(true)));
    this.props.getServiceDetails();
    this.props.getRedirectServiceList(true);
  }

  componentDidUpdate() {
    MoolyaToggleSwitch(true, true);
  }

  bookService(){
    this.props.bookService(true)
  }

  render(){
    const {
      servicePayment,
      facilitationCharge,
      checkDiscountEligibility,
      checkDiscountStatus,
      calculateDiscounts,
      checkTaxStatus,
      checkPromoStatus,
      taxStatus} = this.props;
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
          <div className="centered_form">
            <form>
              <div className="form-group">
                <label>
                  Tasks gross payable amount&nbsp;<label>Rs</label>&nbsp;
                  <input type="number" disabled value={servicePayment.tasksAmount ? parseFloat(servicePayment.tasksAmount).toFixed(2):''}  className="form-control inline_input medium_in" />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Task discount payable amount&nbsp;<label>Rs</label>&nbsp;
                  <input type="number" disabled value={servicePayment.tasksDiscount ? parseFloat(servicePayment.tasksDiscount).toFixed(2):''}  className="form-control inline_input medium_in" />
                </label>
              </div>
              <div className="form-group">
                <label>
                  Task net payable amount&nbsp;<label>Rs</label>&nbsp;
                  <input type="number" disabled value={servicePayment.tasksDerived ? parseFloat(servicePayment.tasksAmount).toFixed(2):''}  className="form-control inline_input medium_in"/>
                </label>
              </div>
              <div className="form-group switch_wrap switch_names inline_switch">
                <label htmlFor="discount">Is Eligible for discount</label>
                <span className={servicePayment.isDiscount ? 'state_label acLabel' : 'state_label'}>Yes</span><label htmlFor="discount" className="switch nocolor-switch">
                <input type="checkbox" id="discount"
                       checked={!servicePayment.isDiscount}
                       value={servicePayment.isDiscount}
                       onChange={(event) => checkDiscountEligibility(event)} />
                <div className="slider"></div>
              </label>
                <span className={servicePayment.isDiscount ? 'state_label' : 'state_label acLabel'}>No</span>
              </div>
              <br className="brclear"/>
              <div className="form-group">
                <div className="input_types">
                  <input id="amount" type="radio" name="amount"
                         value="Amount" checked={servicePayment.discountType === 'amount' ? true : false}
                         disabled={!servicePayment.isDiscount}
                         onChange={(event) => checkDiscountStatus(event)}/>
                  <label htmlFor="amount"><span><span></span></span>Amount
                    {servicePayment.discountType === 'amount' ?
                      <input className="form-control inline_input"
                             onChange={(event) => calculateDiscounts(event)}
                             defaultValue={servicePayment.discountValue}/> : <div></div>}
                  </label>
                </div>
                <div className="input_types">
                  <input id="percent" type="radio" name="percent"
                         value="Percentage" checked={servicePayment.discountType === 'percent' ? true : false}
                         disabled={!servicePayment.isDiscount}
                         onChange={(event) => checkDiscountStatus(event)}/>
                  <label htmlFor="percent"><span><span></span></span>
                    Percentage{servicePayment.discountType === 'percent'?
                      <input className="form-control inline_input" onChange={(event) => calculateDiscounts(event)}
                             defaultValue={servicePayment.discountValue}/>:<div></div>}
                  </label>
                </div>
                <br className="brclear"/>
              </div>
              <div className="form-group">
                <div className="input_types">
                  <input id="taxinclusive" type="radio" name="taxinclusive"
                         value="taxinclusive" checked={taxStatus === 'taxinclusive' ? true : false}
                         onChange={(event) => checkTaxStatus(event)}/>
                  <label htmlFor="taxinclusive"><span><span></span></span>Tax Inclusive</label>
                </div>
                <div className="input_types">
                  <input id="taxexclusive" type="radio" name="taxexclusive"
                         value="taxexclusive" checked={taxStatus === 'taxexclusive' ? true : false}
                         onChange={(event) => checkTaxStatus(event)}/>
                  <label htmlFor="taxexclusive"><span><span></span></span>Tax Exclusive </label>
                </div>
                <br className="brclear"/>
              </div>
              <div className="form-group switch_wrap switch_names inline_switch">
                <label htmlFor="promo">Is Applicable for PROMOCODE</label>
                <span className={servicePayment.isPromoCodeApplicable ? 'state_label acLabel' : 'state_label'}>Yes</span><label htmlFor="promo" className="switch nocolor-switch">
                <input id="promo" type="checkbox" checked={!servicePayment.isPromoCodeApplicable}
                       value={servicePayment.isPromoCodeApplicable}
                       onChange={(event) => checkPromoStatus(event)}/>
                <div className="slider"></div>
              </label>
                <span className={servicePayment.isPromoCodeApplicable ? 'state_label' : 'state_label acLabel'}>No</span>
              </div>
              <div className="form-group">
                <label>Moolya facilitation charges &nbsp; &nbsp; &nbsp; &nbsp; </label>
                <div className="input_types">
                  <input id="facilitationamount" type="radio" name="facilitationamount"
                         checked={facilitationCharge.type === 'amount' ? true : false}
                         value="Amount" disabled/>
                  <label htmlFor="facilitationamount"><span><span></span></span>Amount
                    {facilitationCharge.type === 'amount' ?
                      <input className="form-control inline_input"
                             disabled
                             value={facilitationCharge.type === 'amount' ? facilitationCharge.amount : ''} />
                      :<div></div>
                    }
                  </label>
                </div>
                <div className="input_types">
                  <input id="facilitationpercent"
                         type="radio"
                         name="facilitationpercent"
                         checked={facilitationCharge.type === 'percent' ? true : false}
                         value="Percentage" disabled/>
                  <label htmlFor="radio2"><span><span></span></span>Percentage
                    {facilitationCharge.type === 'percent' ?
                      <input className="form-control inline_input"
                             disabled
                             value={facilitationCharge.type === 'percent' ? facilitationCharge.amount : ''} />
                      : <div></div>
                    }
                    </label>
                </div>
                <br className="brclear"/>
              </div>
              <div className="form-group">
                <label>Net payable amount&nbsp;<label>Rs</label>&nbsp;<input className="form-control inline_input medium_in"
                                                 value={this.props.finalAmount ? parseFloat(this.props.finalAmount).toFixed(2) : ''} disabled />
                </label>
              </div>
            </form>
          </div>
        </ScrollArea>
        {!this.props.viewMode?'':<div className="ml_btn" style={{'textAlign':'center'}}><div className="save_btn" onClick={() => this.bookService()}>Book</div> </div>}
      </div>
    )
  }
};
