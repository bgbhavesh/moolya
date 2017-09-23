/**
 * Created by pankaj on 24/7/17.
 */

import React from 'react';
import {requestedAppointmentActionHandler} from '../actions/fetchRequestedAppointments';
import NoDataList from '../../../../commons/components/noData/noDataList';
import MlLoader from "../../../../commons/components/loader/loader";
export default class MlAppRequestedMyAppointment extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      appointments:[]
    }
    // this.fetchAppointment();
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

  render() {
    const that = this;
    let appointments = that.props.data || [];
    let config=this.props.config;
    return (
      <div>
        {config.loading === true ? ( <MlLoader/>) : (
      <div>
        {appointments && !appointments.length ? (<NoDataList moduleName="Requested Appointments"/>) : (
          <div className="tab_wrap_scroll ideators_list">
            {appointments.map(function (appointment, index) {
              return (
                <div className="col-md-2 col-sx-3 col-sm-4 col-lg-2" key={index}>
                  <div className="ideators_list_block">
                    <div className="inactive"><span>inactive</span></div>
                    {/*<div className="hex_outer"><img src="/images/valuation.png"/></div>
                     <div className="task-status pending"></div>*/}
                    <h3>{appointment.displayName ? appointment.displayName : 'Bespoke Service'}</h3>
                    <img src="/images/valuation.png" className="c_image"/>
                    <div className="block_footer">
                      <span></span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>)
        }
        </div>
        )}
      </div>
    )
  }
}
