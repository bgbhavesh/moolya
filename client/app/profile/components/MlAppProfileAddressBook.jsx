/**
 * Created by viswadeep on 2/5/17.
 */

import React from "react";
import {Meteor} from "meteor/meteor";
import {render} from "react-dom";
import ScrollArea from "react-scrollbar";
// import ContactDetails from "./../../../../client/admin/profile/component/MlMyProfileContactDetails";
// import AddressDetails from "./../../../../client/admin/profile/component/mlRegistrationAddressDetails";
// import EmailDetails from "./../../../../client/admin/profile/component/mlRegistrationEmailDetails";

import AppContactDetails from "./MlAppContactDetails";
import AppAddressDetails from "./MlAppAddressDetails";
import AppEmailDetails from "./MlAppEmailDetails";
import {findAddressBookActionHandler} from '../actions/findAddressBookAction'

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
    const resp=this.findAddressBook();
    return resp;
  }

  async findAddressBook(){
    const response = await findAddressBookActionHandler();
    if(response){
      this.setState({data:response, loading:false,});
    }else {
      this.setState({loading:false})
    }
  }

  componentDidMount() {
    var WinHeight = $(window).height();
    $('.left_wrap').height(WinHeight - (160 + $('.admin_header').outerHeight(true)));
  }

  render() {
    const showLoader=this.state.loading;
    return (
      <div className="admin_main_wrap">
        {showLoader === true ? ( <div className="loader_wrap"></div>) : (
        <div className="admin_padding_wrap">
          <h2>Address Book</h2>
          <div className="main_wrap_scroll">
            <ScrollArea
              speed={0.8}
              className="main_wrap_scroll"
              smoothScrolling={true}
              default={true}
            >
              <div className="row">
                <div className="col-lg-6 ">
                  <form>
                    <div className="panel panel-default new_profile_tabs">
                      <div className="panel-heading">
                        Contact Number
                      </div>
                      <AppContactDetails clusterId={this.state.data.clusterId} contactInfoDetails={this.state.data.contactInfo}/>
                    </div>
                    <div className="panel panel-default new_profile_tabs">
                      <div className="panel-heading">
                        Email ID
                      </div>
                      <AppEmailDetails clusterId={this.state.data.clusterId} emailInfoDetails={this.state.data.emailInfo}/>
                    </div>
                  </form>
                </div>
                <div className="col-lg-6 ">
                  <form>
                    <div className="panel panel-default new_profile_tabs">
                      <div className="panel-heading">
                        Address
                      </div>
                      <AppAddressDetails clusterId={this.state.data.clusterId} addressInfoDetails={this.state.data.addressInfo}/>
                    </div>
                  </form>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>)}
      </div>
    )
  }
};
