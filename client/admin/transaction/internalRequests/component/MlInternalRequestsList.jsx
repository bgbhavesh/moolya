import React, {Component, PropTypes} from 'react';
import {render} from 'react-dom';
import MlTableViewContainer from "../../../core/containers/MlTableViewContainer";
import {mlInternalRequestsTableConfig} from "../../internalRequests/config/MlInternalRequestsConfig";
import CreateRequestComponent from './CreateRequestComponent'
import _ from 'lodash';

export default class MlInternalRequestsList extends Component {
  constructor(props){
    super(props);
    this.state={showCreateRequestComponent:false, time: new Date()};
    this.refreshList = this.refreshList.bind(this);

  }
  componentDidMount() {
  }
  addRequestHandler(){
    this.setState({showCreateRequestComponent:true});
  }
  refreshList(){
    this.setState({
      time: new Date()
    });
  }
  render() {
    let actions= mlInternalRequestsTableConfig.actionConfiguration;
    let action = _.find(actions, {"actionName": "add"});
    action.handler=this.addRequestHandler.bind(this);
    let showCreateRequestComponent=this.state.showCreateRequestComponent;
    let refreshList = this.refreshList.bind(this);
    return (
      <div className="admin_main_wrap">
        <div className="admin_padding_wrap">
          <h2>Internal Requests </h2>
          <MlTableViewContainer {...mlInternalRequestsTableConfig} forceFetch={false}/>
          {showCreateRequestComponent?<CreateRequestComponent refreshList={refreshList} openPopUp={true}/>:<div></div>}
        </div>
      </div>
    )
  }
}
