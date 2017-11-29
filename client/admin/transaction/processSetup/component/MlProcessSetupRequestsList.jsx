import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import MlTableViewContainer from '../../../core/containers/MlTableViewContainer';
import { mlProcessSetupRequestsTableConfig } from '../config/MlProcessSetupRequestsConfig';
// import CreateRequestComponent from './CreateRequestComponent'
import _ from 'lodash';

export default class MlProcessSetupRequestsList extends Component {
  constructor(props) {
    super(props);
    this.state = { showCreateRequestComponent: false, time: new Date() };
    // this.refreshList = this.refreshList.bind(this);
  }

  addRequestHandler() {
    this.setState({ showCreateRequestComponent: true });
  }

  render() {
    const actions = mlProcessSetupRequestsTableConfig.actionConfiguration;
    const action = _.find(actions, { actionName: 'add' });
    action.handler = this.addRequestHandler.bind(this);
    // let showCreateRequestComponent=this.state.showCreateRequestComponent;
    // let refreshList = this.refreshList.bind(this);
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Process Setup </h2>
          <MlTableViewContainer {...mlProcessSetupRequestsTableConfig} forceFetch={false}/>
          {/* {showCreateRequestComponent?<CreateRequestComponent refreshList={refreshList} openPopUp={true}/>:<div></div>} */}
        </div>
      </div>
    )
  }
}
