/**
 * Created by pankaj on 20/6/17.
 */

import React from 'react';
import Tabs from 'react-responsive-tabs';
import MlAppInternalPendingTask from './MlAppInternalPendingTask';
import MlAppInternalCurrentTask from './MlAppInternalCurrentTask';
import MlAppInternalCompleteTask from './MlAppInternalCompleteTask';
import MlAppInternalRejectTask from './MlAppInternalRejectTask';
import 'react-responsive-tabs/styles.css';

export default class MlAppInternalTask extends React.Component{

  componentDidMount() {
  }

  render(){
    let MlTabs = [
      {name: 'Pending Requests', tabContent: <MlAppInternalPendingTask/>},
      {name: 'Current Tasks', tabContent: <MlAppInternalCurrentTask/>},
      {name: 'Completed Tasks', tabContent: <MlAppInternalCompleteTask/>},
      {name: 'Rejected Tasks', tabContent: <MlAppInternalRejectTask/>}

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

