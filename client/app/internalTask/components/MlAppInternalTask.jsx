/**
 * Created by pankaj on 20/6/17.
 */

import React from 'react';
import Tabs from 'react-responsive-tabs';
import MlAppInternalPendingTask from './MlAppInternalPendingTask';
import MlAppInternalCurrentTask from './MlAppInternalCurrentTask';
import MlAppInternalCompleteTask from './MlAppInternalCompleteTask';
import MlAppInternalRejectTask from './MlAppInternalRejectTask';
import MlAppInternalMyTask from './myTask/MlAppInternalMyTask';
import 'react-responsive-tabs/styles.css';

import MlInfiniteScroll from "../../../commons/core/mlInfiniteScroll/components/MlInfiniteScroll";
import {mlMyAppPendingInternalTaskConfig} from './../config/MlAppPendingTasksConfig';
import {mlMyAppCurrentInternalTaskConfig} from './../config/MlAppCurrentTasksConfig';
import {mlMyAppCompletedInternalTaskConfig} from './../config/mlAppCompletedTasksConfig';
import {mlMyAppRejectedInternalTaskConfig} from './../config/mlAppRejectedTasksConfig';
import {mlMyAppSelfInternalTaskConfig} from './../config/MlAppSelfTasksConfig';

export default class MlAppInternalTask extends React.Component{

  componentDidMount() {
  }

  render(){
    let MlTabs = [
      {
        name: 'My Tasks',
        tabContent: <MlInfiniteScroll viewMode={false} showInfinity={false} config={mlMyAppSelfInternalTaskConfig} />
      },
      {
        name: 'Pending Tasks',
        tabContent: <MlInfiniteScroll viewMode={false} showInfinity={false} config={mlMyAppPendingInternalTaskConfig} />
      },
      {
        name: 'Current Tasks',
        tabContent: <MlInfiniteScroll viewMode={false} showInfinity={false} config={mlMyAppCurrentInternalTaskConfig} />
      },
      {
        name: 'Completed Tasks',
        tabContent: <MlInfiniteScroll viewMode={false} showInfinity={false} config={mlMyAppCompletedInternalTaskConfig} />
      },
      {
        name: 'Rejected Tasks',
        tabContent: <MlInfiniteScroll viewMode={false} showInfinity={false} config={mlMyAppRejectedInternalTaskConfig} />
      }
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

