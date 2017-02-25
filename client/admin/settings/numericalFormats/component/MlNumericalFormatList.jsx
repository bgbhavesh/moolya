import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import MlTableViewContainer from "../../../core/containers/MlTableViewContainer";
import {mlNumericalFormatTableConfig} from "../config/mlNumericalFormatConfig";
export default class MlNumericalFormatList extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Numerical Formats List</h2>

          <MlTableViewContainer {...mlNumericalFormatTableConfig}/>

        </div>


      </div>
    )
  }
}
