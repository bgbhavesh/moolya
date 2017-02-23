import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import MlTableViewContainer from "../../../core/containers/MlTableViewContainer";
import {mlLanguageTableConfig} from "../config/mlLanguageConfig";
export default class MlLanguagesList extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Languages List</h2>

          <MlTableViewContainer {...mlLanguageTableConfig}/>

        </div>


      </div>
    )
  }
}
