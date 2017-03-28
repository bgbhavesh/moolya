import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import MlTableViewContainer from '../../admin/core/containers/MlTableViewContainer';
import {mltemplatesassignmetConfig} from '../config/MlTemplatesAssignmentConfig';
export default class MlTemplateTypeList extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Template Assignment Details</h2>
          <MlTableViewContainer {...mltemplatesassignmetConfig}/>
        </div>
      </div>
    )
  }
}
