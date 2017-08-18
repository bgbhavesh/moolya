/**
 * Appointment pending component
 * @Author :: Birendra Kumar
 * @Dated :: 17/08/2017
 */

// import NPM module(s)
import React, {Component} from 'react';
import MlAppOngoingSelectedMyAppointment from './mlAppServiceTaskAppointment/MlAppOngoingSelectedMyAppointment';
import MlAppSelectedTaskMyAppointment from './mlAppInternalTaskAppointment/MlAppSelectedTaskMyAppointment';
import MlAppSelectedSelfTaskMyAppointment from './mlAppSelfTaskAppointment/MlAppSelectedSelfTaskMyAppointment';
import {ongoingAppointmentActionHandler} from '../actions/fetchOngoingAppointments';

export default class MlAppPendingMyAppointment extends Component{
  constructor(props){
    super(props);
    this.state = {
      appointments:[],
      selectedAppointment: {},
      isSelectedAppointment: false
    };
    this.fetchAppointment();
    this.resetSelectedAppointment = this.resetSelectedAppointment.bind(this);
  }

  async fetchAppointment(){
    let response = await ongoingAppointmentActionHandler(this.props.status);
    if(response) {
      this.setState({
        appointments:response
      })
    };
  }

  /**
   * Method :: viewAppointment
   * Desc :: Redirect with view appointment component
   * @param id :: current service id
   */
  viewAppointment(appointment) {
    let data = {
      _id: appointment._id,
      appointmentType: appointment.appointmentType,
      appointmentId: appointment.appointmentId,
      seeker: appointment.client,
      provider: appointment.provider,
      resourceId: appointment.appointmentInfo.resourceId,
      serviceName: appointment.appointmentInfo.serviceName,
      sessionId: appointment.appointmentInfo.sessionId,
      startDate: appointment.startDate,
      endDate: appointment.endDate
    };
    this.setState({
      selectedAppointment: data,
      isSelectedAppointment: true
    });
  }

  resetSelectedAppointment() {
    this.setState({isSelectedAppointment: false}, () => this.fetchAppointment() );
  }

  getAppointmentComponentToLoad() {
    const {selectedAppointment} = this.state;
    switch (selectedAppointment.appointmentType) {
      case 'SERVICE-TASK':
        return (<MlAppOngoingSelectedMyAppointment resetSelectedAppointment={this.resetSelectedAppointment} status={this.props.status} appointment={selectedAppointment} />)
        break;
      case 'INTERNAL-TASK':
        return (<MlAppSelectedTaskMyAppointment resetSelectedAppointment={this.resetSelectedAppointment} status={this.props.status} appointment={selectedAppointment} />)
        break;
      case 'SELF-TASK':
        return (<MlAppSelectedSelfTaskMyAppointment resetSelectedAppointment={this.resetSelectedAppointment} status={this.props.status} appointment={selectedAppointment} />)
        break;
      default:
      // do nothing
    }
  }

  render() {
    const that = this;
    const {selectedAppointment, isSelectedAppointment} = this.state;
    return (
      <div>
        {(selectedAppointment && isSelectedAppointment) ?
          <div>{this.getAppointmentComponentToLoad()}</div>
          :
          <div>
            {that.state.appointments.map(function (appointment, index) {
              return (
                <div className="col-lg-2 col-md-4 col-sm-4" key={index} >
                  <div className="list_block list_block_intrests notrans" onClick={()=>that.viewAppointment(appointment)}>
                    <div className="hex_outer"><img src="/images/valuation.png"/></div>
                    <div className="task-status pending"></div>
                    <h3>{ (appointment.appointmentInfo && appointment.appointmentType === 'SERVICE-TASK') ?
                      appointment.appointmentInfo.serviceName : appointment.appointmentInfo.taskName}</h3>
                  </div>
                </div>
              )
            })}
          </div>
        }
      </div>
    )
  }
};
