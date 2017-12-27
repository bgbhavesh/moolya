/**
 * Created by pankaj on 6/6/17.
 */

import React from 'react';
import MlTableViewContainer from "../../../core/containers/MlTableViewContainer";
import {mlOfficeTableConfig} from "../config/MlOfficeConfig";

export default class EditTaxation extends React.Component {

  render() {
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Office List</h2>
          <MlTableViewContainer {...mlOfficeTableConfig}/>
        </div>
      </div>
    );
  }
};
