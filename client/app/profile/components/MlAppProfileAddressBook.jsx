/**
 * Created by viswadeep on 2/5/17.
 */

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ScrollArea from 'react-scrollbar';
// import ContactDetails from "./../../../../client/admin/profile/component/MlMyProfileContactDetails";
// import AddressDetails from "./../../../../client/admin/profile/component/mlRegistrationAddressDetails";
// import EmailDetails from "./../../../../client/admin/profile/component/mlRegistrationEmailDetails";

import AppContactDetails from './MlAppContactDetails';
import AppAddressDetails from './MlAppAddressDetails';
import AppEmailDetails from './MlAppEmailDetails';
import { findAddressBookActionHandler } from '../actions/findAddressBookAction'
import MlLoader from '../../../commons/components/loader/loader'

export default class MlAppProfileAddressBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
    this.findAddressBook.bind(this);
    return this;
  }

  componentWillMount() {
    const resp = this.findAddressBook();
    return resp;
  }

  async findAddressBook() {
    const response = await findAddressBookActionHandler();
    if (response) {
      this.setState({ data: response, loading: false });
    } else {
      this.setState({ loading: false, data: null })
    }
  }

  componentDidUpdate() {
    const WinHeight = $(window).height();
    $('.main_wrap_scroll ').height(WinHeight - (68 + $('.app_header').outerHeight(true)));
  }

  render() {
    const showLoader = this.state.loading;
    const clusterId = this.state.data ? this.state.data.clusterId : '';
    const contactInfo = this.state.data ? this.state.data.contactInfo : ''
    const verifiedMobileNumbers = this.state.data && this.state.data.mobileNumbers ? this.state.data.mobileNumbers : [];
    const emailInfo = this.state.data ? this.state.data.emailInfo : ''
    const addressInfo = this.state.data ? this.state.data.addressInfo : ''
    const registerId = this.state.data ? this.state.data.registrationId : ''
    const profileId = this.state.data ? this.state.data.profileId : ''
    return (
      <div className="app_main_wrap">
        {showLoader === true ? (<MlLoader/>) : (
          <div className="app_padding_wrap  ">

            <h2>My Contact Details</h2>

            <div className="col-md-12  main_wrap_scroll nopadding">
              <ScrollArea
                speed={0.8}
                className="main_wrap_scroll"
                smoothScrolling={true}
                default={true}
              >
                <div className="col-lg-6 ">
                  <form>
                    <div className="panel panel-default new_profile_tabs">
                      <div className="panel-heading">
                        Contact Numbers
                      </div>
                      <AppContactDetails clusterId={clusterId} verifiedMobileNumbers={verifiedMobileNumbers} contactInfoDetails={contactInfo} registerId = {registerId} profileId={profileId} registrationDetails={this.findAddressBook.bind(this)}/>
                    </div>
                    <div className="panel panel-default new_profile_tabs">
                      <div className="panel-heading">
                        Email Id
                      </div>
                      <AppEmailDetails clusterId={clusterId} emailInfoDetails={emailInfo} registerId = {registerId} profileId={profileId} registrationDetails={this.findAddressBook.bind(this)}/>
                    </div>
                  </form>
                </div>
                <div className="col-lg-6 ">
                  <form>
                    <div className="panel panel-default new_profile_tabs">
                      <div className="panel-heading">
                        Addresses
                      </div>
                      <AppAddressDetails clusterId={clusterId} addressInfoDetails={addressInfo} registerId = {registerId} profileId={profileId} registrationDetails={this.findAddressBook.bind(this)}/>
                    </div>
                  </form>
                </div>
              </ScrollArea>
            </div>

          </div>)}
      </div>
    )
  }
}
