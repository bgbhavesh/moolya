/**
 * Created by pankaj on 6/6/17.
 */
import React, {Component} from "react";
import {findOfficeAction} from "../actions/findOfficeAction";
import MlLoader from "../../../../commons/components/loader/loader";

export default class MlAppPayOfficeSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, office: {}, transaction:{}};
    this.officeDetails.bind(this);
    return this;
  }
  componentDidMount() {
    var swiper = new Swiper('.profile_container', {
      pagination: '.swiper-pagination',
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      initialSlide: 1,
      slidesPerView: 'auto',
      coverflow: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      }
    });
  }

  componentWillMount() {
    const resp = this.officeDetails();
    return resp;
  }

  async officeDetails() {
    let officeId = this.props.config
    let response = await findOfficeAction(officeId);
    if (response && response.success) {
      let data = JSON.parse(response.result)
      console.log(data)
      let obj = data [0];
      this.setState({loading: false, office: obj.office, transaction: obj.officeTransaction})
    } else {
      this.setState({loading: false})
    }
  }

  payClick() {
    let officeAmount = this.state.transaction && this.state.transaction.orderSubscriptionDetails && this.state.transaction.orderSubscriptionDetails.cost ? this.state.transaction.orderSubscriptionDetails.cost : "00"
    var data = {
      officeId: this.props.config,
      amount: officeAmount,
      transactionId: this.state.transaction && this.state.transaction.transactionId
    }
    var header = {apiKey: "741432fd-8c10-404b-b65c-a4c4e9928d32"};
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: Meteor.absoluteUrl('moolyaPaymentStatus'),
      data: JSON.stringify(data),
      headers: header,
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        if (response.success) {
          toastr.success(response.result);
          FlowRouter.go("/app/myOffice")
        } else {
          toastr.error(response.result);
        }
      }
    });
  }

  render() {
    const showLoader = this.state.loading;
    return (
      <div className="app_main_wrap">
        {showLoader === true ? ( <MlLoader/>) : (
        <div className="app_padding_wrap no_padding">
          <div className="list_view_block">
            <div className="col-md-12 text-center">
              <div className="col-md-offset-3 col-md-6 col-sm-6 col-xs-6 new-ideas3">
                <div className="col-md-6">
                </div>
                <div className="col-md-6 subscription">
                  <h3>Subscription</h3>

                  <ul>
                    <li>Validity</li>
                    <li>: 1Year</li>
                    <li>Includes</li>
                    <li>:</li>
                    <li>Principal</li>
                    <li>: {this.state.office && this.state.office.principalcount?this.state.office.principalcount:"00"}</li>
                    <li>Team</li>
                    <li>: {this.state.office && this.state.office.teamMembercount?this.state.office.teamMembercount:"00"}</li>
                    <li>Cost</li>
                    <li>
                      : {this.state.transaction && this.state.transaction.orderSubscriptionDetails && this.state.transaction.orderSubscriptionDetails.cost ? this.state.transaction.orderSubscriptionDetails.cost : "00"}
                      {this.state.transaction && this.state.transaction.orderSubscriptionDetails && this.state.transaction.orderSubscriptionDetails.isTaxInclusive?<b> tax inclusive</b>:<b> tax exclusive</b>}
                    </li>
                  </ul>

                  <br />
                  <a className="ideabtn" onClick={this.payClick.bind(this)}>Pay</a>
                </div>
              </div>
            </div>
          </div>
        </div>)}
      </div>
    )
  }
};
