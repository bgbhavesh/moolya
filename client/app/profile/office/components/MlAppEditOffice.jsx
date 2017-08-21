/**
 * Created by pankaj on 7/6/17.
 */

import React from 'react';
import Tabs from 'react-responsive-tabs';
import MlAppAddOfficeMember from './MlAppAddOfficeMember';
import MlUpgradeOffice from './MlUpgradeOffice';
import 'react-responsive-tabs/styles.css';
import {findOfficeAction} from "../actions/findOfficeAction";
import {getMyOfficeRoleActionHandler} from "../actions/getMyOfficeRole";
import MlTableViewContainer from "../../../../../client/admin/core/containers/MlTableViewContainer";
import {mlOfficeTransactionConfig} from "../config/MlOfficeTransactionConfig";

export default class MlAppEditOffice extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      availableCommunities:[],
      role : ''
    }
  }
  componentWillMount() {
    const resp = this.officeDetails();
    this.getMyOfficeRole();
    return resp;
  }

  async getMyOfficeRole() {
    let officeId = FlowRouter.getParam('officeId')
    let response = await getMyOfficeRoleActionHandler(officeId);
    if(response.success){
      this.setState({
        role: response.result
      })
    }
  }

  async officeDetails() {
    let officeId = FlowRouter.getParam('officeId')
    let response = await findOfficeAction(officeId);
    if (response && response.success) {
      let data = JSON.parse(response.result)
      let obj = data [0];
      let availableCommunities = obj.office.availableCommunities && obj.office.availableCommunities.length ? obj.office.availableCommunities : [];
      // availableCommunities.push({communityId:'officeBairer',communityName:'Office Bairer'});
      // availableCommunities.push({communityId:'consultant',communityName:'Consultant'});
      this.setState({loading: false, office: obj.office, availableCommunities:availableCommunities})
    } else {
      this.setState({loading: false})
    }
  }

  render(){
    const that = this;
    let noAccessMessage = <p className="text-danger">No access for team member. Only principle can have access to this tab.</p>
    const isAddNewMember = that.state.role == "Principal" || that.state.role == "AdminUser";
    let MlTabs = [
      {name: 'Principals', tabContent: <MlAppAddOfficeMember role={this.state.role} isAdd={isAddNewMember} />},
      {name: 'Team Members', tabContent: <MlAppAddOfficeMember role={this.state.role} isAdd={isAddNewMember} availableCommunities={this.state.availableCommunities} />},
      {name: 'Office Transactions',
        tabContent: isAddNewMember ? <MlTableViewContainer role={this.state.role} params={this.props.config} {...mlOfficeTransactionConfig}/> : noAccessMessage },
      {name: 'Upgrade Office',
        tabContent: isAddNewMember ? <MlUpgradeOffice  role={this.state.role} /> : noAccessMessage }
    ];

    function getTabs() {
      return MlTabs.map(MlTab => ({
        tabClassName: 'horizon-item', // Optional
        panelClassName: 'panel1', // Optional
        title: MlTab.name,
        getContent: () => MlTab.tabContent,
      }));
    }

    const App = () => <Tabs items={getTabs()} />;
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          <div className="col-md-12">

            <App/>
          </div>
        </div>
      </div>
    )
  }
};
