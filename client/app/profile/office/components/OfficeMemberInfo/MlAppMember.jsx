/**
 * Created by pankaj on 8/6/17.
 */

import React from 'react';
import Tabs from 'react-responsive-tabs';
import MlAppMemberDetails from './MlAppMemberDetails';
import MlAppMemberSchedule from './MlAppMemberSchedule';
import MlAppMemberTaskInfo from './MlAppMemberTaskInfo';
import MlAppMemberUpcomingTask from './MlAppMemberUpcomingTask';
import MlAppMemberTaskHistory from './MlAppMemberTaskHistory';
import 'react-responsive-tabs/styles.css';

export default class MlAppMember extends React.Component{
  componentDidMount()
  {}
  render(){
    let MlTabs = [
      {name: 'Details', tabContent: <MlAppMemberDetails/>},
      {name: 'Schedule', tabContent: <MlAppMemberSchedule/>},
      {name: 'Task Info', tabContent: <MlAppMemberTaskInfo/>},
      {name: 'Upcoming Task', tabContent: <MlAppMemberUpcomingTask/>},
      {name: 'History of Task', tabContent: <MlAppMemberTaskHistory/>},
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
