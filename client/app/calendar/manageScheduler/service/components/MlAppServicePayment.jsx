/**
 * Created by Mukhil on 19/6/17.
 */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
import {updateServiceActionHandler, fetchServiceActionHandler, fetchTasksAmountActionHandler} from '../actions/MlServiceActionHandler'
import {MoolyaToggleSwitch} from '../../../../../admin/utils/formElemUtil'

export default class Step4 extends React.Component{
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
    this.getTotalAmount.bind(this)
    this.discountEligibility = this.discountEligibility.bind(this)
  }

  componentWillMount() {
    this.getDetails()
  }

  async getDetails() {
    let id = FlowRouter.getQueryParam('id')
    const resp = await fetchServiceActionHandler(id)
    console.log(resp)
    if(resp.payment) {
      this.setState({
        derivedValue: resp.payment.amount,
        discountAmount: resp.payment.discountValue, discountType:resp.payment.discountType,
        discountPercentage: resp.payment.discountValue, status: resp.payment.isTaxInclusive,
        promo: resp.payment.isPromoCodeApplicable,
        tasks: resp.tasks
      })
    }
    if(this.state.discountType === 'amount') {
      this.setState({discountAmountR: true, discountPercentageR: false, discountPercentage:0})
    }else {
      this.setState({discountAmountR: false, discountPercentageR: true, discountAmount: 0})
    }
    this.getTotalAmount();
  }

  async getTotalAmount() {
    var total = 0;
    let profileId = FlowRouter.getParam('profileId')
    const resp = await fetchTasksAmountActionHandler(profileId)

    temp = []
    resp.map(function(data){
      temp.push(data.totalAmount)
    })
    console.log(temp)
    $.each(temp,function() {
      total += this;
    });
    this.setState({amountToPay:total})
    // let amountPayable = parseInt(this.state.amountToPay);
    // let discountAmount = parseInt(this.state.discountAmount?this.state.discountAmount: 0);
    // let discountPercentage = parseFloat(this.state.discountPercentage?this.state.discountPercentage: 0)
    // if(!discountPercentage){
    //   let totalAmount = amountPayable - discountAmount;
    //   this.setState({derivedValue:totalAmount})
    // }else{
    //   let totalAmount = amountPayable/discountPercentage*100;
    //   this.setState({derivedValue:totalAmount})
    // }


    // console.log(this.state.derivedValue)
  }

  discountEligibility(e){
    let discount = e.target.checked;
    console.log(discount)
    if(discount){
      this.setState({discount:false})
    }else {
      this.setState({discount:true})
    }
    console.log(this.state.discount)
  }

  discountAmountRadio(e) {
    let discountAmountCheck = e.target.checked;
    this.setState({discountAmountR: discountAmountCheck, discountType: 'amount'})
  }

  discountPercentageRadio(e) {
    let discountPercentageCheck = e.target.checked;
    this.setState({discountPercentageR:discountPercentageCheck, discountType: 'percent'})
  }

  taxStatus(e) {
    let status = e.target.value;
    if(status === "TaxInclusive") {
      this.setState({status:true})
    }else {
      this.setState({status:false})
    }
  }

  // payableAmount(e){
  //   console.log(e.currentTarget.value);
  //   if(e.currentTarget.value ==="") {
  //     e.currentTarget.value = 0;
  //   }
  //   if(e.currentTarget.value >= 0) {
  //     this.setState({"amountToPay":e.currentTarget.value},function(){
  //       if(this.state.discountAmount || this.state.facilitationAmount) {
  //         let discount = this.state.discountAmount?parseInt(this.state.discountAmount):0;
  //         let facilitationAmount = this.state.facilitationAmount?parseInt(this.state.facilitationAmount):0;
  //         if(discount & facilitationAmount) {
  //           let amt = facilitationAmount - discount;
  //           let total = amt + parseInt(this.state.amountToPay);
  //           this.setState({derivedValue:total})
  //         }else if(discount) {
  //           let total = parseInt(this.state.amountToPay) - discount;
  //           this.setState({derivedValue:total})
  //         }else if(facilitationAmount) {
  //           let total = parseInt(this.state.amountToPay) - facilitationAmount;
  //           this.setState({derivedValue:total})
  //         }
  //       }else {
  //         let total = parseInt(this.state.amountToPay)
  //         this.setState({derivedValue:total})
  //       }
  //     }).bind(this);
  //   } else {
  //     this.setState({"amountToPay":0});
  //   }
  // }
  discountedAmount(e){
    if(e.currentTarget.value ==="") {
      e.currentTarget.value = 0;
    }
    if(this.state.discountAmountR) {
      if (e.currentTarget.value >= 0) {
        this.setState({discountAmount: e.currentTarget.value}, function(){
          if(this.state.amountToPay || this.state.facilitationAmount) {
            let payableAmount = this.state.amountToPay?parseInt(this.state.amountToPay):0
            let facilitationAmount = this.state.facilitationAmount?parseInt(this.state.facilitationAmount):0
            if(payableAmount & facilitationAmount) {
              let total = payableAmount + facilitationAmount - parseInt(this.state.discountAmount);
              this.setState({derivedValue:total})
            }else if(payableAmount){
              let total = payableAmount - parseInt(this.state.discountAmount);
              this.setState({derivedValue:total})
            }else if(facilitationAmount) {
              let total = facilitationAmount - parseInt(this.state.discountAmount);
              this.setState({derivedValue:total})
            }
          } else {
            let total = parseInt(this.state.discountAmount)
            this.setState({derivedValue:total})
          }
        }).bind(this)
      } else {
        this.setState({discountAmount: 0});
      }
    } else {
      this.setState({discountAmount: 0});
    }
  }

  discountPercentage(e){
    if(e.currentTarget.value ==="") {
      e.currentTarget.value = 0.0;
    }
    if(this.state.discountPercentageR) {
      if (e.currentTarget.value >= 0) {
        this.setState({discountPercentage: e.currentTarget.value}, function(){
          if(this.state.facilitationPercentage) {
            let totalPercentage = parseFloat(this.state.facilitationPercentage) - parseFloat(this.state.discountPercentage);
            let amountPayable = this.state.amountToPay?parseFloat(this.state.amountToPay):0;
            let total = (amountPayable * totalPercentage/ 100) + amountPayable;
            this.setState({derivedValue:total})
          }else {
            let totalPercentage = parseFloat(this.state.discountPercentage);
            let amountPayable = this.state.amountToPay?parseFloat(this.state.amountToPay):0;
            let total = amountPayable - (amountPayable * totalPercentage / 100)  ;
            this.setState({derivedValue:total})
          }
        }).bind(this);
      } else {
        this.setState({discountPercentage: 0.0});
      }
    }
  }


  // facilitationAmount(e){
  //   if(e.currentTarget.value ==="") {
  //     e.currentTarget.value = 0;
  //   }
  //   if (e.currentTarget.value >= 0) {
  //     this.setState({"facilitationAmount": e.currentTarget.value}, function() {
  //       if(this.state.amountToPay || this.state.discountAmount) {
  //         let amountPayable = this.state.amountToPay?parseInt(this.state.amountToPay):0;
  //         let discount = this.state.discountAmount?parseInt(this.state.discountAmount):0;
  //         if(amountPayable & discount) {
  //           let total = amountPayable - discount + parseInt(this.state.facilitationAmount);
  //           this.setState({derivedValue:total})
  //         } else if(amountPayable) {
  //           let total = amountPayable + parseInt(this.state.facilitationAmount);
  //           this.setState({derivedValue:total})
  //         } else if(discount) {
  //           let total = parseInt(this.state.facilitationAmount) - discount;
  //           this.setState({derivedValue:total})
  //         }
  //       } else {
  //         let total = parseInt(this.state.facilitationAmount)
  //         this.setState({derivedValue:total})
  //       }
  //     }).bind(this);
  //   } else {
  //     this.setState({"facilitationAmount": 0});
  //   }
  // }
  //
  //
  // facilitationPercentage(e){
  //   if(e.currentTarget.value ==="") {
  //     e.currentTarget.value = 0.0;
  //   }
  //   if(this.state.chargesPercentage) {
  //     if (e.currentTarget.value >= 0.0) {
  //       this.setState({"facilitationPercentage": e.currentTarget.value}, function(){
  //         if(this.state.discountPercentage) {
  //           let totalPercentage = parseFloat(this.state.facilitationPercentage) - parseFloat(this.state.discountPercentage);
  //           let amountPayable = this.state.amountToPay?parseFloat(this.state.amountToPay):0.0;
  //           let total = (amountPayable * totalPercentage / 100)+ amountPayable ;
  //           this.setState({derivedValue:total})
  //         }else{
  //           let totalPercentage = parseFloat(this.state.facilitationPercentage);
  //           let amountPayable = this.state.amountToPay?parseFloat(this.state.amountToPay):0.0;
  //           let total = (amountPayable * totalPercentage / 100)+ amountPayable
  //           this.setState({derivedValue:total})
  //         }
  //       }).bind(this);
  //     } else {
  //       this.setState({"facilitationPercentage": 0.0});
  //     }
  //   }
  // }

  promoCode(e) {
    let promoCode = e.target.checked
    if(promoCode) {
      this.setState({promo: false})
    }else{
      this.setState({promo: true})
    }
  }

  // facilitationChargesPercentage(e) {
  //   let charges = e.target.checked;
  //   this.setState({chargesPercentage: charges})
  // }
  //
  // facilitationChargesAmount(e) {
  //   let charges = e.target.checked
  //   this.setState({chargesAmount: charges})
  // }

  async saveDetails(){
    let amount = this.state.discountAmount;
    let percentage = this.state.discountPercentage;
    if(this.state.discountType === 'amount') {
      this.setState({discountValue: amount})
    } else {
      this.setState({discountValue: percentage})
    }
    let profileId = FlowRouter.getParam('profileId')
    let id = FlowRouter.getQueryParam('id')
    let payment = {
      amount: this.state.derivedValue,
      isDiscount: this.state.discount ? this.state.discount : false,
      discountType: this.state.discountType,
      discountValue: this.state.discountValue,
      isTaxInclusive: this.state.status,
      isPromoCodeApplicable: this.state.promo
    }
    let Details ={
      payment:payment
    }
    console.log(payment)
    const response = await updateServiceActionHandler(id,Details)
    if(response) {
      toastr.success("Saved Successfully")
      this.getDetails();
    }
    FlowRouter.go('/app/calendar/manageSchedule/'+profileId+'/serviceList')
    return response;
  }

  componentDidMount()
  {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(310+$('.admin_header').outerHeight(true)));

  }
  componentDidUpdate() {
    MoolyaToggleSwitch(true, true);
  }

  render(){
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <div className="centered_form">
            <form>
              <div className="form-group">
                <label>Enter payable amount Rs.<input type="number" disabled value={this.state.amountToPay}  className="form-control "/>
                </label>
              </div>
              <div className="form-group switch_wrap switch_names inline_switch">
                <label>Is Eligible for discount</label>
                <span className="state_label">Yes</span><label className="switch nocolor-switch">
                {this.state.discount}
                <input type="checkbox" defaultChecked={this.state.discount} onChange={this.discountEligibility.bind(this)} />
                <div className="slider"></div>
              </label>
                <span className="state_label acLabel">No</span>
              </div>
              <br className="brclear"/>
              <div className="form-group">
                <div className="input_types">
                  <input id="radio1" type="radio" name="radio1" value="Amount" checked={this.state.discountAmountR} onChange={this.discountAmountRadio.bind(this)}/><label htmlFor="radio1"><span><span></span></span>Amount Rs {this.state.discountType === 'amount'?<input className="form-control inline_input" onChange={(e)=>this.discountedAmount(e)} value={this.state.discountAmount}/>:<div></div>}</label>
                </div>
                <div className="input_types">
                  <input id="radio2" type="radio" name="radio1" value="Percentage" checked={this.state.discountPercentageR} onChange={this.discountPercentageRadio.bind(this)}/><label htmlFor="radio2"><span><span></span></span>Percentage{this.state.discountType === 'percent'?<input className="form-control inline_input" onChange={(e)=>this.discountPercentage(e)} value={this.state.discountPercentage}/>:<div></div>}</label>
                </div>
                <br className="brclear"/>
              </div>
              <div className="form-group">
                <div className="input_types">
                  <input id="radio1" type="radio" name="radio2" value="TaxInclusive" checked={this.state.status} onChange={this.taxStatus.bind(this)}/><label htmlFor="radio1"><span><span></span></span>Tax Inclusive</label>
                </div>
                <div className="input_types">
                  <input id="radio2" type="radio" name="radio2" value="TaxExclusive" checked={!this.state.status} onChange={this.taxStatus.bind(this)}/><label htmlFor="radio2"><span><span></span></span>Tax Exclusive </label>
                </div>
                <br className="brclear"/>
              </div>
              <div className="form-group switch_wrap switch_names inline_switch">
                <label>Is Applicable for PROMOCODE</label>
                <span className="state_label">Yes</span><label className="switch nocolor-switch">
                <input type="checkbox" defaultChecked={this.state.promo} onChange={this.promoCode.bind(this)}/>
                <div className="slider"></div>
              </label>
                <span className="state_label acLabel">No</span>
              </div>
              <div className="form-group">
                <label>Enter facilitation charges &nbsp; &nbsp; &nbsp; &nbsp; </label>
                <div className="input_types">
                  <input id="radio1" type="radio" name="radio3" value="Amount" disabled/><label htmlFor="radio1"><span><span></span></span>Amount Rs <input className="form-control inline_input" disabled value={this.state.facilitationAmount} /></label>
                </div>
                <div className="input_types">
                  <input id="radio2" type="radio" name="radio3" value="Percentage" disabled/><label htmlFor="radio2"><span><span></span></span>Percentage <input className="form-control inline_input" disabled value={this.state.facilitationPercentage} /></label>
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
          <div className="save_btn" onClick={this.saveDetails.bind(this)}>Save</div> <div className="cancel_btn">Cancel</div>
        </div>
      </div>
    )
  }
};
