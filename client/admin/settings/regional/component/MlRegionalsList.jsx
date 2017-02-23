import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import MlTableViewContainer from "../../../core/containers/MlTableViewContainer";
import {mlRegionalTableConfig} from "../config/mlRegionalConfig";
export default class MlRegionalsList extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Regionals List</h2>

          <MlTableViewContainer {...mlRegionalTableConfig}/>

        </div>


      </div>
    )
  }
}
