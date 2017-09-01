/**
 * Created by pankaj on 28/6/17.
 */

import React from 'react';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
import {updateCalendarSettingActionHandler} from '../actions/updateCalendarSettings';

export default class MlAppSetCalendarPrimarySettings extends React.Component{

  constructor(props){
    super(props);
    let slotDuration = props.primarySettings.slotDuration ? props.primarySettings.slotDuration : {};
    slotDuration = {
      hours : slotDuration.hours ? slotDuration.hours : "",
      minutes : slotDuration.minutes ? slotDuration.minutes : ""
    };
    this.state = {
      slotDuration: slotDuration,
      appointmentCountPerSlots: props.primarySettings.appointmentCountPerSlots ? props.primarySettings.appointmentCountPerSlots : "",
      slotBreakTime: props.primarySettings.slotBreakTime ? props.primarySettings.slotBreakTime : "",
      isOverlappingSchedule: props.primarySettings.isOverlappingSchedule ? props.primarySettings.isOverlappingSchedule : false
    };
  }

  componentWillReceiveProps(props){
    let slotDuration = props.primarySettings.slotDuration ? props.primarySettings.slotDuration : {};
    slotDuration = {
      hours : slotDuration.hours ? slotDuration.hours : "",
      minutes : slotDuration.minutes ? slotDuration.minutes : ""
    };
    this.setState({
      slotDuration: slotDuration,
      appointmentCountPerSlots: props.primarySettings.appointmentCountPerSlots ? props.primarySettings.appointmentCountPerSlots : "",
      slotBreakTime: props.primarySettings.slotBreakTime ? props.primarySettings.slotBreakTime : "",
      isOverlappingSchedule: props.primarySettings.isOverlappingSchedule ? props.primarySettings.isOverlappingSchedule : false
    });
  }

  componentDidMount() {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(290+$('.admin_header').outerHeight(true)));
  }

  updateSlotBreakTime(event){
    if(event.target.value > 0) {
      this.setState({
        slotBreakTime:event.target.value
      });
    }
  }

  updateAppointmentCountPerSlots(event){
    if(event.target.value > 0) {
      this.setState({
        appointmentCountPerSlots:event.target.value
      });
    }
  }

  updateOverlappingSchedule(event){
    this.setState({
      isOverlappingSchedule: event.target.checked
    });
  }

  updateSlotDuration(event, type) {
    let slotDuration = this.state.slotDuration;
    if( parseInt(event.target.value) >= 0) {
      slotDuration[type] = event.target.value;
    }
    this.setState({
      slotDuration: slotDuration
    });
  }

  async updateCalendarSetting(){
    let dataToInsert = {
      slotDuration: {},
      isOverlappingSchedule: this.state.isOverlappingSchedule
    };
    if(this.state.slotBreakTime || this.state.slotBreakTime.length) {
      dataToInsert.slotBreakTime= this.state.slotBreakTime;
    }
    if(this.state.appointmentCountPerSlots || this.state.appointmentCountPerSlots.length) {
      dataToInsert.appointmentCountPerSlots= this.state.appointmentCountPerSlots;
    }
    if(this.state.slotDuration.hours || this.state.slotDuration.hours === 0 || this.state.slotDuration.hours.length) {
      dataToInsert.slotDuration.hours= this.state.slotDuration.hours;
    }
    if(this.state.slotDuration.minutes || this.state.slotDuration.minutes === 0 || this.state.slotDuration.minutes.length) {
      dataToInsert.slotDuration.minutes= this.state.slotDuration.minutes;
    }
    let profileId = FlowRouter.getParam('profileId');
    let response = await updateCalendarSettingActionHandler(profileId, dataToInsert);
    if(response.success){
      toastr.success(response.result);
    } else {
      toastr.error(response.result);
    }
  }

  render(){
    return (
    <div className="step_form_wrap step1">
      <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
        <form>
          <div className="form-group">
            <label>
              <FontAwesome name="clock-o"/>
              Slot duration: &nbsp;
              <input type="number" onChange={(evt)=>this.updateSlotDuration(evt, 'hours')} value={(this.state.slotDuration.hours ? this.state.slotDuration.hours : '')} className="form-control inline_input"/> Hours
              <input type="number" onChange={(evt)=>this.updateSlotDuration(evt, 'minutes')} value={(this.state.slotDuration.minutes ? this.state.slotDuration.minutes : '')} className="form-control inline_input"/> Mins
            </label>
          </div>
          <div className="form-group">
            <label>
              <FontAwesome name="clock-o"/>
              Number of Appointments per slot: &nbsp;
              <input type="number" onChange={(evt)=>this.updateAppointmentCountPerSlots(evt)} value={(this.state.appointmentCountPerSlots ? this.state.appointmentCountPerSlots : '')} className="form-control inline_input"/>
            </label>
          </div>
          {/*<div className="form-group">*/}
            {/*<label>*/}
              {/*<FontAwesome name="clock-o"/>*/}
              {/*Time slots per break-up time: &nbsp;*/}
              {/*<input type="number" onChange={(evt)=>this.updateSlotBreakTime(evt)} value={(this.state.slotBreakTime ? this.state.slotBreakTime : '')} className="form-control inline_input"/>*/}
            {/*</label>*/}
          {/*</div>*/}
          <div className="form-group switch_wrap switch_names inline_switch small_sw">
            <label style={{'marginLeft':'0px'}}><FontAwesome name="clock-o"/> Overlapping in schedule</label>
            <span className="state_label">Yes</span><label className="switch nocolor-switch">
            <input type="checkbox" onClick={(evt)=>this.updateOverlappingSchedule(evt)} checked={this.state.isOverlappingSchedule} />
            <div className="slider"></div>
          </label>
            <span className="state_label acLabel">No</span>
          </div>
          <div className="clearfix"></div>
        </form>
        <div className="form-group">
          <div className="ml_btn" style={{'textAlign':'center'}}>
            <button onClick={()=>this.updateCalendarSetting()} className="save_btn" >Save</button>
          </div>
        </div>
      </ScrollArea>
    </div>
    )
  }
};
