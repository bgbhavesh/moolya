/**
 * Created by vishwadeep on 12/5/17.
 */

import React, {Component} from "react";
import {render} from "react-dom";
import {findUserOfficeActionHandler} from "../actions/findUserOffice";
import {findOfficeAction} from "../actions/findOfficeAction";
import MlLoader from "../../../../commons/components/loader/loader";
import _ from "lodash";
import {fetchExternalUserProfilesActionHandler} from "../../../profile/actions/switchUserProfilesActions";

export default class MlAppMyOffice extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, data: [], showButton:false};
    this.findUserOffice.bind(this);
    return this;
  }

  componentDidUpdate() {
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
    const resp = this.findUserOffice();
    var getExt = this.fetchExternalUserProfiles()
    return resp;
  }

  async findUserOffice() {
    const response = await findUserOfficeActionHandler();
    if (!_.isEmpty(response)) {
      let isRegApp = _.find(response, {isRegistrationApproved: true})
      let isOffice = _.find(response, {officeId: null})
      if (isRegApp) {
        if (isOffice) {
          this.setState({loading: false, data: [], isRegApp: true});
        } else {
          this.setState({loading: false, data: response, isRegApp: true});
        }
      }
      else
        this.setState({loading: false, data: response, isRegApp: false});
    } else
      this.setState({loading: false});
  }

  async fetchExternalUserProfiles() {
    const response = await fetchExternalUserProfilesActionHandler();
    if (response && response.length > 0) {
      let default_User_Profile = _.find(response, {isDefault: true})
      if (!default_User_Profile) {
        default_User_Profile = response[0];
      }
      let isFunder = _.isMatch(default_User_Profile, {communityDefCode: 'FUN'})
      this.setState({showButton: isFunder})
      // if(!this.isFunder){
      //   $('.addOletffice').addClass('disabled')
      // }
    }
  }

  addNewOffice() {
    if (this.state.showButton){
      FlowRouter.go("/app/addOffice")
    }else{
      toastr.error('Not Authorised');
    }

  }

  async selectOffice(officeId, evt) {
    let response = await findOfficeAction(officeId);
    if (response && response.success) {
      let data = JSON.parse(response.result)
      if (data[0].office.isExpired) {
        toastr.error('Office Expired');
      }
      else if (data[0].office.isActivated) {
        FlowRouter.go('/app/editOffice/' + officeId);
      } else if (data[0].officeTransaction && data[0].officeTransaction.paymentDetails && data[0].officeTransaction.paymentDetails.isPaid) {
        toastr.error('Office amount Paid wait for admin approval');
      } else if (data[0].officeTransaction && data[0].officeTransaction.orderSubscriptionDetails && data[0].officeTransaction.orderSubscriptionDetails.cost) {
        FlowRouter.go('/app/payOfficeSubscription/' + officeId)
      } else
        toastr.error('Waiting for admin approval');
    }
  }

  render() {
    let that = this
    let userOffice = this.state.data && this.state.data.length > 0 ? this.state.data : []
    const userOfficeList = userOffice.map(function (office, id) {
      return (
        <div className="swiper-slide office_accounts my-office-main" key={id}
             onClick={that.selectOffice.bind(that, office.officeId)}>
          <span className="ml flaticon-ml-building"></span><br />{office.officeLocation}
          <h2>Office Name: {office.officeName}</h2>
          <h2>Total Member(s): {office.totalusercount}</h2>
          <h3>Principal(s):{office.principalcount}&nbsp;&nbsp;Team Size:{office.teamMembercount}</h3>
        </div>
      )
    });

    const showLoader = this.state.loading;
    return (
      <div className="app_main_wrap">
        {showLoader === true ? ( <MlLoader/>) : (
          <div className="app_padding_wrap no_padding">
            <div className="list_view_block">
              {this.state.isRegApp ? <div>
                {(userOffice.length < 1) ? <div className="col-md-12 text-center">
                  <div className="col-md-offset-3 col-md-6 col-sm-6 col-xs-6 new-ideas2">
                    <div className="col-md-6">
                    </div>
                    <div className="col-md-6">
                      <a href="" onClick={this.addNewOffice.bind(this)} className="ideabtn addOffice">Add new office</a>
                    </div>
                  </div>
                </div> : <div>
                  <div className="col-md-12 text-center">
                    <div className="col-md-offset-2 col-md-8 col-sm-8 col-xs-8">
                      <div className="swiper-container profile_container">
                        <div className="swiper-wrapper">

                          {userOfficeList}

                        </div>
                        <div className="swiper-pagination"></div>
                      </div>
                      <div className="col-md-12 text-center well mart20">
                        {this.state.showButton?<div className="col-md-4 nopadding">
                          <a className="fileUpload mlUpload_btn addOffice" onClick={this.addNewOffice.bind(this)}>Add New
                            Office</a>
                        </div>:<div></div>}
                        <div className="col-md-4 nopadding">
                          <a href="" className="fileUpload mlUpload_btn disabled">Enter Office</a>
                        </div>
                        <div className="col-md-4 nopadding">
                          <a href="" className="fileUpload mlUpload_btn disabled">Deactivate Office</a>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>}

              </div> : <h3>Please complete Hard registration</h3>}

            </div>
          </div>)}
      </div>
    )
  }
};
