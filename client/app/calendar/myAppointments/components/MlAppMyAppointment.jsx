/**
 * Created by pankaj on 24/7/17.
 */
import React from 'react';
import Tabs from 'react-responsive-tabs';
import 'react-responsive-tabs/styles.css';
import MlAppOngoingMyAppointment from './mlAppServiceTaskAppointment/MlAppOngoingMyAppointment';
import MlAppCompletedMyAppointment from './MlAppCompletedMyAppointment';
import MlAppRequestedMyAppointment from './MlAppRequestedMyAppointment';
import MlAppPendingMyAppointment from './MlAppPendingMyAppointment';
import MlAppRejectedMyAppointment from './MlAppRejectedMyAppointment';
import MlAppCurrentMyAppointment from './MlAppCurrentMyAppointment';

export default class MlAppMyAppointment extends React.Component {

  render(){
    let MlTabs = [
      { name: 'Pending', tabContent: <MlAppPendingMyAppointment /> },
      { name: 'Current', tabContent: <MlAppCurrentMyAppointment /> },
      { name: 'Completed', tabContent: <MlAppCompletedMyAppointment /> },
      { name: 'Rejected', tabContent: <MlAppRejectedMyAppointment /> },
      { name: 'Requested', tabContent: <MlAppRequestedMyAppointment /> }
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

