/**
 * Created by pankaj on 13/9/17.
 */

import React, {Component, PropTypes} from 'react';
import MlAppServicePurchasedDetail from './mlAppServicePurchasedDetail/MlAppServicePurchasedDetail';

export default class MlAppointmentsDetailsComponent extends Component {
  render() {
    const {data} = this.props;
    let appointmentId = data.appointmentId;
    let appointmentType = data.transactionType;
    console.log(this.props);
    if( appointmentType  === "Service-Purchased"){
      return (
        <MlAppServicePurchasedDetail orderId={appointmentId} />
      )
    } else {
      return (<h1>Comming Soon</h1>);
    }

  }
}

