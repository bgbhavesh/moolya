import React, { Component } from 'react';
import MlTableViewContainer from '../../core/containers/MlTableViewContainer';
import { mlHistoryTableConfig } from '../config/MlHistoryConfig';
export default class MlHistoryList extends Component {
  componentDidMount() {
  }

  render() {
    const params = this.props.params ? this.props.params : null;
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>History Details</h2>
          <MlTableViewContainer params={params} {...mlHistoryTableConfig}/>
        </div>
      </div>
    )
  }
}
