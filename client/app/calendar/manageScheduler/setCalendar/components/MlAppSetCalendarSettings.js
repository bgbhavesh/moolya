/**
 * Created by pankaj on 28/6/17.
 */
import React from 'react';
import MlAppScheduleHead from "../../commons/components/MlAppScheduleHead";
import {fetchCalendarSettingsActionHandler} from '../actions/fetchCalendarSettings';
import MlAppSetCalendarPrimarySettings from './MlAppSetCalendarPrimarySettings';
import MlAppSetCalendarTimmingSettings from './MlAppSetCalendarTimmingSettings';

export default class MlAppSetCalendarSettings extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      primarySettings:{
        duration:{}
      }
    }
  }

  componentDidMount() {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight - (290 + $('.admin_header').outerHeight(true)));
    this.fetchCalendarSettings();
  }

  async fetchCalendarSettings() {
    let profileId = FlowRouter.getParam('profileId');
    let response = await fetchCalendarSettingsActionHandler(profileId);
    console.log('response: ',response);
    if(response){
      let primarySettings = {
        slotDuration: response.slotDuration,
        appointmentCountPerSlots: response.appointmentCountPerSlots,
        slotBreakTime: response.slotBreakTime,
        isOverlappingSchedule: response.isOverlappingSchedule
      };
      this.setState({
        primarySettings: primarySettings
      })
    }
  }

  render(){
    return (
      <div className="app_main_wrap" style={{'overflow':'auto'}}>
        <div className="app_padding_wrap">
          <MlAppScheduleHead type="calendar"/>
          <MlAppSetCalendarPrimarySettings primarySettings={this.state.primarySettings} />
          {/*<MlAppSetCalendarTimmingSettings />*/}
        </div>
      </div>
    )
  }

}
