import React, {Component} from "react";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
import MlLoader from "../../../../../commons/components/loader/loader";
import {findTaskActionHandler} from "../actions/saveCalanderTask";

export default class MlAppTaskPayment extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      loading: true,
      data: {}
    }
    this.findTaskDetails.bind(this);
    this.handleBlurAmount.bind(this);
    this.handleBlurPercent.bind(this);
    return this;
  }

  componentWillMount() {
    const resp = this.findTaskDetails();
    return resp;
  }

  async findTaskDetails() {
    let taskId = this.props.taskId
    if (taskId) {
      var response = await findTaskActionHandler(taskId);
      if (!_.isEmpty(response)) {
        console.log(response)
        this.setState({loading: false, data: response});
      }
      return response
    } else {
      this.setState({loading: false});
    }
  }

  handleBlurAmount(e) {
    let details = this.state.data
    let name = 'discountValue';
    let value = e.target.value;
    let amount = this.state.data.payment ? this.state.data.payment.amount : ''
    let derivedAmount = Number(amount) - Number(value)
    details['payment'] = _.omit(details['payment'], [name]);
    details['payment'] = _.omit(details['payment'], ['derivedAmount']);
    details['payment'] = _.extend(details['payment'], {[name]: value, 'derivedAmount': derivedAmount});
    this.setState({data: details}, function () {
      this.sendTaskPaymentToParent()
    })
  }

  handleBlurPercent(e) {
    let details = this.state.data
    let name = 'discountValue';
    let value = e.target.value;
    let amount = this.state.data.payment ? this.state.data.payment.amount : ''
    let derivedAmount = Number(amount) - Number((Number(value)/100)*Number(amount))
    details['payment'] = _.omit(details['payment'], [name]);
    details['payment'] = _.omit(details['payment'], ['derivedAmount']);
    details['payment'] = _.extend(details['payment'], {[name]: value, 'derivedAmount': derivedAmount});
    this.setState({data: details}, function () {
      this.sendTaskPaymentToParent()
    })
  }

  onStatusChange(e) {
    let details = this.state.data;
    let name = e.target.name;
    details['payment'] = _.omit(details['payment'], [name]);
    details['payment'] = _.extend(details['payment'], {[name]: !e.currentTarget.checked});
    this.setState({data: details}, function () {
      this.sendTaskPaymentToParent()
    })
  }

  discountAmount() {
    let details = this.state.data
    let name = 'discountType';
    details['payment'] = _.omit(details['payment'], [name]);
    details['payment'] = _.omit(details['payment'], ['derivedAmount']);
    details['payment'] = _.extend(details['payment'], {[name]: 'amount', 'derivedAmount': 0});
    this.setState({data: details}, function () {
      this.sendTaskPaymentToParent()
    })
    console.log('amount click')
  }

  discountPercent() {
    let details = this.state.data
    let name = 'discountType';
    details['payment'] = _.omit(details['payment'], [name]);
    details['payment'] = _.omit(details['payment'], ['derivedAmount']);
    details['payment'] = _.extend(details['payment'], {[name]: 'percent', 'derivedAmount': 0});
    this.setState({data: details}, function () {
      this.sendTaskPaymentToParent()
    })
    console.log('percent click')
  }

  sendTaskPaymentToParent() {
    let data = this.state.data;
    this.props.getPaymentDetails(data);
  }
  handleNull(){
    console.log('null')
  }

  componentDidMount() {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight - (310 + $('.admin_header').outerHeight(true)));
  }

  render() {
    const showLoader = this.state.loading;
    return (
      <div className="step_form_wrap step1">
        {showLoader === true ? ( <MlLoader/>) : (
          <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
            <div className="centered_form">
              <form>
                <div className="form-group">
                  <label>Activity actual amount <input className="form-control inline_input medium_in"
                                                         defaultValue={this.state.data.payment.activitiesAmount} disabled="true"/>
                  </label>
                </div>
                <div className="form-group">
                  <label>Activity discount amount <input className="form-control inline_input medium_in"
                                                         defaultValue={this.state.data.payment.activitiesDiscount} disabled="true"/>
                  </label>
                </div>
                <div className="form-group">
                  <label>Activity derived amount <input className="form-control inline_input medium_in"
                                                         defaultValue={this.state.data.payment.activitiesDerived} disabled="true"/>
                  </label>
                </div>
                <div className="form-group switch_wrap switch_names inline_switch">
                  <label>Is Eligible for discount</label>
                  <span className="state_label">Yes</span><label className="switch nocolor-switch">
                  <input type="checkbox" name="isDiscount" checked={this.state.data.isDiscount}
                         onChange={this.onStatusChange.bind(this)}/>
                  <div className="slider"></div>
                </label>
                  <span className="state_label acLabel">No</span>
                </div>
                <br className="brclear"/>
                <div className="form-group">
                  <div className="input_types">
                    <input id="radio1" type="radio" name="radio1" value="1"
                           onChange={this.discountAmount.bind(this)}/><label
                    htmlFor="radio1"><span><span></span></span>Amount
                    Rs {(this.state.data.payment && this.state.data.payment.discountType == 'amount') ? <input
                      className="form-control inline_input"
                      onBlur={this.handleBlurAmount.bind(this)}/> : ''}</label>
                  </div>
                  <div className="input_types">
                    <input id="radio2" type="radio" name="radio1" value="2" onChange={this.discountPercent.bind(this)}/><label
                    htmlFor="radio2"><span><span></span></span>Percentage {(this.state.data.payment && this.state.data.payment.discountType == 'percent') ?
                    <input className="form-control inline_input"
                           onBlur={this.handleBlurPercent.bind(this)}/> : ''}
                    %
                  </label>
                  </div>
                  <br className="brclear"/>
                </div>
                <div className="form-group">
                  <label>Derived amount Rs. <input className="form-control inline_input medium_in"
                                                   onChange={this.handleNull.bind(this)}
                                                   value={this.state.data.payment.derivedAmount}
                                                   readOnly="readOnly"/>
                  </label>
                </div>
              </form>
            </div>
          </ScrollArea>)}
      </div>
    )
  }
  // key={(this.state.data.payment && this.state.data.payment.derivedAmount)? 'notLoadedYet' : 'loaded'}
};
