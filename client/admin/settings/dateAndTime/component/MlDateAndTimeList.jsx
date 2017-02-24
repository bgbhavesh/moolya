import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import MlTableViewContainer from "../../../core/containers/MlTableViewContainer";
import {mlDateAndTimeTableConfig} from "../config/mlDateAndTimeConfig";
export default class MlDateAndTimeList extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Date And Time List</h2>

          <MlTableViewContainer {...mlDateAndTimeTableConfig}/>

        </div>


      </div>
    )
  }
}
