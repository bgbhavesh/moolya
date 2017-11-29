/**
 * Created by pankaj on 13/9/17.
 */

import React, { Component, PropTypes } from 'react';
import MlAppServicePurchasedDetail from './mlAppServicePurchasedDetail/MlAppServicePurchasedDetail';
import MlAppServiceSessionAppointment from './mlAppServiceSessionAppointment/MlAppServiceSessionAppointment';
export default class MlAppointmentsDetailsComponent extends Component {
  render() {
    const { data } = this.props;
    const appointmentId = data.appointmentId;
    const appointmentType = data.transactionType;
    if (appointmentType === 'Service-Purchased') {
      return (
        <MlAppServicePurchasedDetail orderId={appointmentId} />
      )
    }
    // return (<h1>Comming Soon</h1>);
    return (
      <MlAppServiceSessionAppointment orderId={appointmentId} />
    );
  }
}

