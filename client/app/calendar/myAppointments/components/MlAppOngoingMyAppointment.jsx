/**
 * Created by pankaj on 24/7/17.
 */
import React from 'react';
import {ongoingAppointmentActionHandler} from '../actions/fetchOngoingAppointments';

export default class MlAppOngoingMyAppointment extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      appointments:[]
    }
    this.fetchAppointment();
  }

  async fetchAppointment(){
    let response = await ongoingAppointmentActionHandler();
    if(response) {
      this.setState({
        appointments:response
      })
    };
  }

  render() {
    const that = this;
    return (
      <div>
        {that.state.appointments.map(function (appointment, index) {
          return (
            <div className="col-lg-2 col-md-4 col-sm-4" key={index} >
              <div className="list_block list_block_intrests notrans">
                <div className="hex_outer"><img src="/images/valuation.png"/></div>
                <div className="task-status pending"></div>
                <h3>{appointment.serviceName}</h3>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

}

