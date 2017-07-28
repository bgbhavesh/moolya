/**
 * Created by pankaj on 24/7/17.
 */
import React from 'react';
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
import MlAppOngoingMyAppointment from './MlAppOngoingMyAppointment';
import MlAppCompletedMyAppointment from './MlAppCompletedMyAppointment';
import MlAppRequestedMyAppointment from './MlAppRequestedMyAppointment';

export default class MlAppMyAppointment extends React.Component {

  render(){
    let MlTabs = [
      { name: 'Ongoing', tabContent: <MlAppOngoingMyAppointment/> },
      { name: 'Completed', tabContent: <MlAppCompletedMyAppointment/> },
      { name: 'Requested', tabContent: <MlAppRequestedMyAppointment/> }
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

