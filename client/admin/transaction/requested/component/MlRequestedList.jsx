import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import MlTableViewContainer from '../../../core/containers/MlTableViewContainer';
import { mlUserTypeTableConfig } from '../config/mlRequestedConfig';
import MlAssignComponent from './MlAssignComponent'
import CreateRequestComponent from './CreateRequestComponent'
import _ from 'lodash';
export default class MlRequestedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false, showCreateComponent: false, requestId: null, transactionId: null, clusterId: null
    };
    this.assignActionHandler.bind(this);
  }
  showPopUp(value) {
    this.setState({ show: value })
  }
  componentDidMount() {

    /* $("#Reg_Request").popover({
      'title' : 'Title Here',
      'html' : true,
      'placement' : 'top',
      'container' : '.admin_main_wrap',
      'content' : $(".ml_assignrequest").html()
    }); */

  }
  assignActionHandler(data) {
    if (data && data.id) {
      this.setState({
        requestId: data.id, show: true, transactionId: data.registrationId, clusterId: data.clusterId
      });
      console.log(data);
      console.log('yipppe its working');
    } else {
      this.setState({ requestId: null, show: false });
      toastr.error('Please select a record');
    }
  }
  assignAddActionHandler() {
    this.setState({ show: true });
  }
  render() {
    const actions = mlUserTypeTableConfig.actionConfiguration;
    const action = _.find(actions, { actionName: 'assign' });
    action.handler = this.assignActionHandler.bind(this);
    const addAction = _.find(actions, { actionName: 'add' });
    if (addAction) {
      addAction.handler = this.assignAddActionHandler.bind(this);
    }
    const showAssignComponent = this.state.show;
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Requested List</h2>
          <MlTableViewContainer {...mlUserTypeTableConfig} forceFetch={false}/>
          {showAssignComponent && <MlAssignComponent transactionType={'registration'} transactionId={this.state.transactionId} clusterId={this.state.clusterId} showPopUp={this.showPopUp.bind(this)}/>}
        </div>
      </div>
    )
  }
}
