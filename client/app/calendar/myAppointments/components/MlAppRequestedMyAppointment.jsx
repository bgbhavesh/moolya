/**
 * Created by pankaj on 24/7/17.
 */

import React from 'react';
import {requestedAppointmentActionHandler} from '../actions/fetchRequestedAppointments';
export default class MlAppRequestedMyAppointment extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      appointments:[]
    }
    this.fetchAppointment();
  }
  componentDidUpdate()
  {
    var WinWidth = $(window).width();
    var WinHeight = $(window).height();
    $('.tab_wrap_scroll').height(WinHeight-($('.app_header').outerHeight(true)+120));
    if(WinWidth > 768){
      $(".tab_wrap_scroll").mCustomScrollbar({theme:"minimal-dark"});}

  }

  async fetchAppointment(){
    let response = await requestedAppointmentActionHandler();
    if(response) {
      this.setState({
        appointments:response
      })
    };
  }

  render(){
    const that = this;
    return (
      <div className="tab_wrap_scroll">
        {that.state.appointments.map(function (appointment, index) {
          return (
            <div className="col-lg-2 col-md-4 col-sm-4" key={index} >
              <div className="list_block list_block_intrests notrans">
                <div className="hex_outer"><img src="/images/valuation.png"/></div>
                <div className="task-status pending"></div>
                <h3>{appointment.displayName ? appointment.displayName : 'Bespoke Service'}</h3>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
