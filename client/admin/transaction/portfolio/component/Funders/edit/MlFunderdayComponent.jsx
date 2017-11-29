/**
 * Created by pankaj on 21/7/17.
 */

import React, { Component } from 'react';
import moment from 'moment';
import { fetchSessionDayActionHandler } from '../../../actions/fetchSessionDayActionHandler';

export default class MlFunderDayComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: null
    }
  }

  componentWillMount() {
    console.log(this.props);
    const that = this;
    const calendarInfo = this.props.dayData ? this.props.dayData.days : [];
    const expiry = this.props.dayData ? this.props.dayData.expiryDate : ''
    const dayDate = new Date(this.props.calendar.value);
    if (calendarInfo && calendarInfo.length > 0) {
      calendarInfo.map((info) => {
        const date = new Date(info.date);
        if (date.getDate() == dayDate.getDate() && date.getMonth() == dayDate.getMonth()) {
          if (expiry) {
            const expiryDate = new Date(expiry);
            if (date.getTime() < expiryDate.getTime()) {
              that.setState({ status: info.status });
            }
          } else {
            that.setState({ status: info.status });
          }
        }
      })
    }
  }

  dayClick() {
    const portfolioId = FlowRouter.getParam('portfolioId')
    // console.log(this.props)
    this.props.slots('', this.props.calendar.value);
    this.props.dayDetailView(true);
    this.props.cellValue(this.props.calendar.value)
    // this.getSessionDetails(this.props.calendar.value)
  }

  async getSessionDetails(currentDate) {
    const dates = new Date(currentDate);
    const orderId = this.props.orderId;
    const sessionId = this.props.sessionId[0];
    const date = dates.getDate();
    const month = dates.getMonth();
    const year = dates.getFullYear();
    const response = await fetchSessionDayActionHandler(orderId, sessionId, date, month, year)
    // console.log(response)
    this.props.slots(response, date)
    return response
  }

  render() {
    const that = this;
    return (
      that.state.status === 0 ? <div className="rbc-slot-available-status" onClick={() => that.dayClick()}></div> :
        that.state.status === 1 ? <div className="rbc-slot-filling-fast-status" onClick={() => that.dayClick()}></div> :
          that.state.status === 2 ? <div className="rbc-slot-full-status" onClick={() => that.dayClick()}></div> :
            that.state.status === 3 ? <div className="rbc-slot-holiday-status" onClick={() => that.dayClick()}></div> :
              that.state.status === 4 ? <div className="rbc-slot-travel-status" onClick={() => that.dayClick()}></div> :
                <div></div>
    )
  }
}
