import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import MlTableViewContainer from "../../../core/containers/MlTableViewContainer";
import {mlUserTypeTableConfig} from "../config/mlRegistrationApprovedConfig";
import  MlAssignComponent from "./MlAssignComponent"
import _ from 'lodash';
export default class MlRegistrtionRejectedList extends Component {
  constructor(props){
    super(props);
    this.state={show:false,requestId:null};
    this.assignActionHandler.bind(this);
  }
  componentDidMount() {
  }

  render() {
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Rejected List</h2>

          <MlTableViewContainer {...mlRegistrationRejectedTableConfig} forceFetch={false}/>

        </div>


      </div>
    )
  }
}
