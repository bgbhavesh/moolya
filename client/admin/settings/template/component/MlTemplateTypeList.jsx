import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import MlTableViewContainer from "../../../core/containers/MlTableViewContainer";
import {mlTemplateTypeTableConfig} from "../config/MlTemplateTypeConfig";
export default class MlTemplateTypeList extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Template Types Details</h2>
          <MlTableViewContainer {...mlTemplateTypeTableConfig}/>
        </div>
      </div>
    )
  }
}
