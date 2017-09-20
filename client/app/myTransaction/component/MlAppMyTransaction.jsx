/**
 * Created by vishwadeep on 18/6/17.
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import MlTableViewContainer from "../../../admin/core/containers/MlTableViewContainer";
import {mlMyTransactionTableConfig} from "../config/MlMyTransactionTableConfig";
export default class MlAppMyTransaction extends Component {

  componentDidMount() {
    let status = FlowRouter.getQueryParam('status');
    if(status.toLowerCase() == "canceled"){
      toastr.error("payment canceled");
    }else if(status.toLowerCase() == "success"){
      toastr.success("payment successful!!");
    }
  }

  render() {

    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <div className="col-md-12">
          <h2>My Transactions</h2>
          <MlTableViewContainer {...mlMyTransactionTableConfig}/>
          </div>
        </div>
      </div>
    )
  }
}
