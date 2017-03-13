import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import MlTableViewContainer from "../../../core/containers/MlTableViewContainer";
import {mlUserTypeTableConfig} from "../config/mlRequestedConfig";
export default class MlRequestedList extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Requested List</h2>

          <MlTableViewContainer {...mlUserTypeTableConfig}/>

        </div>


      </div>
    )
  }
}
