import React from 'react';
import ScrollArea from 'react-scrollbar';

export default class Step4 extends React.Component{

  /**
   * Constructor
   * @param props :: Object - Parents data
   */
  constructor(props) {
    super(props);
    console.log(props.data);
    this.state={
      paymentData: props.data ? props.data : {isDiscount: false},
    };
  }

  /**
   * Component Did Mount
   * Desc :: Initialize js float
   */
  componentDidMount() {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(220+$('.admin_app').outerHeight(true)));
    this.props.getActivityDetails();
  }

  /**
   * Method :: discountEligibility
   * Desc   :: update discount eligibility for activity
   * @param evt   :: Object  :: javascript event object
   * @returns Void
   */
  discountEligibility(evt) {
    let paymentData = this.state.paymentData;
    paymentData.isDiscount = !evt.target.checked;
    if(!paymentData.isDiscount){
      delete paymentData.discountType;
      delete paymentData.discountValue;
    }
    this.setState({
      paymentData: paymentData
    }, function () {
      this.calculateDerivedAmount();
    }.bind(this));
  }

  /**
   * Method :: payableAmount
   * Desc   :: update discount type for activity
   * @param evt   :: Object  :: javascript event object
   * @returns Void
   */
  updateDiscountType(evt) {
    let paymentData = this.state.paymentData;
    if(paymentData.isDiscount) {
      let discountType = evt.target.value;
      paymentData.discountType = discountType;
      this.setState({
        paymentData: paymentData
      }, function () {
        this.calculateDerivedAmount();
      }.bind(this));
    }
  }

  /**
   * Method :: payableAmount
   * Desc   :: update payable amount for activity
   * @param evt   :: Object  :: javascript event object
   * @returns Void
   */
  payableAmount(evt) {
    let amount = evt.target.value;
    if(amount >= 0){
      let paymentData = this.state.paymentData;
      paymentData.amount = amount;
      this.setState({
        paymentData: paymentData
      }, function () {
        this.calculateDerivedAmount();
      }.bind(this));
    } else {
      let paymentData = this.state.paymentData;
      paymentData.derivedAmount = paymentData.amount || 0;
      paymentData.discountValue = 0;
      this.setState({
        paymentData: paymentData
      });
    }
  }

  /**
   * Method :: discountedAmount
   * Desc   :: update discount amount for activity
   * @param evt   :: Object  :: javascript event object
   * @returns Void
   */
  discountedAmount(evt) {
    let discountValue = evt.target.value;
    if(discountValue > 0){
      let paymentData = this.state.paymentData;
      paymentData.discountValue = discountValue;
      this.setState({
        paymentData: paymentData
      }, function () {
        this.calculateDerivedAmount();
      }.bind(this));
    } else {
      let paymentData = this.state.paymentData;
      paymentData.derivedAmount = paymentData.amount || 0;
      paymentData.discountValue = 0;
      this.setState({
        paymentData: paymentData
      });
    }
  }

  /**
   * Validate the payment based on discount
   * @return {boolean}
   */
  paymentValidate() {
    let paymentData = this.state.paymentData;
    this.errorMsg = '';
    if(paymentData.amount === '' || typeof paymentData.amount === 'undefined' || paymentData.amount === null ){
      this.errorMsg = 'Payable amount is required';
      toastr.error(this.errorMsg);
      return false;
    }
    switch (paymentData.discountType) {
      case 'amount':
        if (parseFloat(paymentData.discountValue) > parseFloat(paymentData.amount)) {
          this.errorMsg = 'Amount must be equal or less than the payable amount'
        }
        break;
      case 'percent':
        if (parseFloat(paymentData.discountValue) > 100) {
          this.errorMsg = 'Percent must be equal or less than 100'
        }
        break;
      default:
      // do nothing
    }
  }
  /**
   * Method :: calculateDerivedAmount
   * Desc   :: calculate derived amount for activity
   * @returns Void
   */
  calculateDerivedAmount(){
    let paymentData = this.state.paymentData;
    this.paymentValidate();
    if (this.errorMsg) {
      toastr.error(this.errorMsg);
    } else {
      this.errorMsg = '';
      let derivedAmount = this.state.paymentData.amount ? this.state.paymentData.amount : 0;
      if(paymentData.isDiscount && paymentData.discountType == "amount") {
        derivedAmount -= paymentData.discountValue ? paymentData.discountValue : 0 ;
      } else if (paymentData.isDiscount && paymentData.discountType == "percent") {
        derivedAmount -= paymentData.discountValue ? ( paymentData.amount / 100 )*paymentData.discountValue : 0 ;
      }
      paymentData.derivedAmount = derivedAmount;
      this.setState({
        paymentData: paymentData
      });
    }
  }

  /**
   * Method :: saveDetails
   * Desc   :: save payment details in activity
   * @returns Void
   */
  async saveDetails() {
    let paymentData = this.state.paymentData;
    if(!paymentData.isDiscount){
      delete  paymentData.discountType;
      delete  paymentData.discountValue;
    } else {
      this.paymentValidate();
    }
    if (!this.errorMsg) {
      this.props.saveActivity({payment:paymentData});
    }
  }

  /**
   * Render
   * Desc   :: Render the HTML for this component
   * @returns {HTML}
   */
  render() {

    /**
     * Return the html to render
     */
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <div className="centered_form">
            <form>
              <div className="form-group">
                <label>
                  Enter payable amount Rs.
                  <input type="number" onChange={(e)=>this.payableAmount(e)} value={ this.state.paymentData.amount ? this.state.paymentData.amount : '' } className="form-control " />
                </label>
              </div>
              <div className="form-group switch_wrap switch_names inline_switch">
                <label>Is Eligible for discount</label>
                <span className={this.state.paymentData.isDiscount ? 'state_label acLabel' : 'state_label'}>Yes</span><label className="switch nocolor-switch">
                <input type="checkbox" checked={ !this.state.paymentData.isDiscount } onChange={this.discountEligibility.bind(this)} />
                <div className="slider"></div>
              </label>
                <span className={this.state.paymentData.isDiscount ? 'state_label' : 'state_label acLabel'}>No</span>
              </div>
              <br className="brclear"/>
              <div className="form-group">
                <div className="input_types">
                  <input id="amountDiscount" type="radio"
                         name="amountDiscount"
                         value="amount"
                         disabled={!this.state.paymentData.isDiscount}
                         checked={ this.state.paymentData.discountType == "amount" ? true : false } onChange={this.updateDiscountType.bind(this)}/>
                  <label htmlFor="amountDiscount"><span><span></span></span>
                    Amount Rs
                    {this.state.paymentData.discountType === 'amount'?
                      <input className="form-control inline_input"
                             onChange={(evt)=>this.discountedAmount(evt)}
                             defaultValue={ this.state.paymentData.discountValue }/>:<div></div>}
                  </label>
                </div>
                <div className="input_types">
                  <input id="percentDiscount" type="radio"
                         name="percentDiscount" value="percent"
                         disabled={!this.state.paymentData.isDiscount}
                         checked={ this.state.paymentData.discountType == "percent" ? true : false }  onChange={this.updateDiscountType.bind(this)}/>
                  <label htmlFor="percentDiscount"><span><span></span></span>
                    Percentage
                    {this.state.paymentData.discountType === 'percent'? <input className="form-control inline_input" onChange={(evt)=>this.discountedAmount(evt)} defaultValue={ this.state.paymentData.discountValue } /> :<div></div>}
                  </label>
                </div>
                <br className="brclear"/>
              </div>
              <div className="form-group">
                <label>
                  Derived amount Rs.
                  <input className="form-control inline_input medium_in" value={this.state.paymentData.derivedAmount} disabled />
                </label>
              </div>
            </form>
          </div>
        </ScrollArea>
        <div className="ml_btn" style={{'textAlign':'center'}}>
          <div className="save_btn" onClick={this.saveDetails.bind(this)}>Save</div>
          <div onClick={() => this.props.handleCancel()} className="cancel_btn">Cancel</div>
        </div>
      </div>
    )
  }
};
