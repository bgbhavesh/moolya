/**
 * Created by vishwadeep on 18/6/17.
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import MlTableViewContainer from "../../../admin/core/containers/MlTableViewContainer";
import {mlMyTransactionTableConfig} from "../config/MlMyTransactionTableConfig";
export default class MlAppMyTransaction extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <h2>My Transaction</h2>
          <MlTableViewContainer {...mlMyTransactionTableConfig}/>
        </div>
      </div>
    )
  }
}
