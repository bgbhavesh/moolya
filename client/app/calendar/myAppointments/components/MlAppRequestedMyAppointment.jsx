/**
 * Created by pankaj on 24/7/17.
 */

import React from 'react';
import { requestedAppointmentActionHandler, getBeSpokeForAppointments } from '../actions/fetchRequestedAppointments';
import NoDataList from '../../../../commons/components/noData/noDataList';
import MlLoader from '../../../../commons/components/loader/loader';
import BeSpokeView from '../../../../admin/transaction/portfolio/component/Funders/edit/Services/Presentation/beSpokeView'
export default class MlAppRequestedMyAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
      showDetails: false
    }
    // this.fetchAppointment();
  }
  componentDidUpdate() {
    const WinWidth = $(window).width();
    const WinHeight = $(window).height();
    $('.tab_wrap_scroll').height(WinHeight - ($('.app_header').outerHeight(true) + 120));
    if (WinWidth > 768) {
      $('.tab_wrap_scroll').mCustomScrollbar({ theme: 'minimal-dark' });
    }
  }

  async fetchAppointment() {
    const response = await requestedAppointmentActionHandler();
    if (response) {
      this.setState({
        appointments: response
      })
    }
  }

  selectedAppointment(appointmentInfo, context) {
    this.fetchBeSpokeDetails(appointmentInfo._id);
  }

  async fetchBeSpokeDetails(serviceId) {
    const response = await getBeSpokeForAppointments(serviceId)
    this.setState({ beSpokeDetails: response, showDetails: true })
    return response;
  }


  render() {
    const that = this;
    const appointments = that.props.data || [];
    const config = this.props.config;
    return (
      !(this.state.showDetails) ? <div>
        {config.loading === true ? (<MlLoader/>) : (
          <div>
            {appointments && !appointments.length ? (<NoDataList appointment={true} moduleName="Requested Appointments"/>) : (
              <div className="tab_wrap_scroll ideators_list">
                {appointments.map((appointment, index) => (
                  <div className="col-md-2 col-sx-3 col-sm-4 col-lg-2" key={index}>
                    <div className="ideators_list_block" onClick={that.selectedAppointment.bind(that, appointment)}>
                      <div className="inactive"><span>inactive</span></div>
                      {/* <div className="hex_outer"><img src="/images/valuation.png"/></div>
                     <div className="task-status pending"></div> */}
                      <h3>{appointment.displayName ? appointment.displayName : 'Bespoke Service'}</h3>
                      <img src="/images/valuation.png" className="c_image"/>
                      <div className="block_footer">
                        <span></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>)
            }
          </div>
        )}
      </div> : <BeSpokeView data={this.state.beSpokeDetails} module={'appointments'}/>
    )
  }
}
