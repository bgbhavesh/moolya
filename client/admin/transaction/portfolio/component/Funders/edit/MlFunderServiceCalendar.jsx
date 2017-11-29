/**
 * Created by Mukhil on 19/6/17.
 */
import React, { Component } from 'react';
import Calender from '../../../../../../commons/calendar/calendar'
import { fetchServiceCalendarActionHandler } from './../../../actions/fetchServiceCalendarActionHandler';
import MlFunderDayComponent from './MlFunderdayComponent';
import _ from 'lodash';
import MlAppFunderCalendarSlots from './MlAppFunderCalendarSlots';

export default class MlAppMyCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      date: new Date(),
      showDetailView: false,
      sessionIds: [],
      day: 0,
      month: 0,
      year: 0
    };
    this.getMyCalendar();
    this.onNavigate = this.onNavigate.bind(this);
    this.dayDetail.bind(this);
  }

  componentWillMount() {
    const sessionIds = []
    const serviceInfo = this.props.serviceDetails
    serviceInfo.tasks.map((session) => {
      session.sessions.map((sessionId) => {
        sessionIds.push(sessionId.id)
      })
    })
    this.setState({ sessionIds })
  }

  async getMyCalendar() {
    const date = new Date(this.state.date);
    console.log(this.props);
    const orderId = this.props.orderId;
    const portfolioId = FlowRouter.getParam('portfolioId');
    const data = await fetchServiceCalendarActionHandler(portfolioId, date.getMonth(), date.getFullYear(), orderId);
    // let data = await fetchMyCalendarActionHandler();
    if (data) {
      this.setState({
        data
      });
    }
  }

  onNavigate(date) {
    this.setState({
      date: new Date(date)
    }, () => {
      this.getMyCalendar();
    });
  }

  dayDetail(response) {
    this.setState({ showDetailView: response })
  }

  slots(response, date) {
    console.log('Date', date);
    this.setState({
      slotDate: date
    });
    // console.log('--date--', date)
    // let temp = _.clone(response);
    // let x = temp.map(function(addDate){
    //   delete addDate['__typename'];
    //   addDate.currentDate = date;
    //   return addDate;
    // });
    // //console.log('--slotTimings--', x);
    // this.setState({slotDetails:x})
  }

  cellValue(Details) {
    const dates = new Date(Details);
    const day = dates.getDate();
    const month = dates.getMonth();
    const year = dates.getFullYear();
    this.setState({ day, month, year })
  }

  render() {
    const that = this;
    console.log('this.state.data', this.state.data);
    return (
      !that.state.showDetailView ? <div className="app_main_wrap" style={{ overflow: 'auto' }}>
        <div className="app_padding_wrap">
          <Calender
            dayBackgroundComponent={<MlFunderDayComponent cellValue={this.cellValue.bind(this)} slots={this.slots.bind(this)} orderId={this.props.orderId} sessionId={this.state.sessionIds} dayDetailView={this.dayDetail.bind(this)}/> }
            dayData={this.state.data}
            onNavigate={that.onNavigate}
            date={that.state.date}/>
        </div>
      </div> :
        <MlAppFunderCalendarSlots componentToView={this.props.componentToView} orderId={this.props.orderId} sessionId={this.state.sessionIds} date={that.state.slotDate}/>
    )
  }
}
