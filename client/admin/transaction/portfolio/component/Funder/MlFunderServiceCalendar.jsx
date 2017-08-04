/**
 * Created by Mukhil on 19/6/17.
 */
import React, {Component} from "react";
import Calender from '../../../../../commons/calendar/calendar'
import { fetchServiceCalendarActionHandler } from './../../actions/fetchServiceCalendarActionHandler';
import MlFunderDayComponent from './MlFunderdayComponent';
import _ from "lodash";
import MlAppFunderCalendarSlots from './MlAppFunderCalendarSlots';

export default class MlAppMyCalendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[],
      date: new Date(),
      showDetailView: false,
      sessionIds: [],
      day:0,month:0,year:0
    };
    this.getMyCalendar();
    this.onNavigate = this.onNavigate.bind(this);
    this.dayDetail.bind(this);
  }

  componentWillMount(){
    let sessionIds = []
    let serviceInfo = this.props.serviceDetails
    serviceInfo.tasks.map(function(session){
      session.sessions.map(function(sessionId){
        sessionIds.push(sessionId.id)
      })
    })
    this.setState({sessionIds: sessionIds})
  }

  async getMyCalendar(){
    let date = new Date(this.state.date);
    let portfolioId = FlowRouter.getParam('portfolioId');
    const data = await fetchServiceCalendarActionHandler(portfolioId, date.getMonth(), date.getFullYear())
    // let data = await fetchMyCalendarActionHandler();
    if(data) {
      this.setState({
        data: data.days
      })
    }
  }

  onNavigate(date){
    this.setState({
      date: new Date(date)
    }, function () {
      this.getMyCalendar();
    }.bind(this));
  }

  dayDetail(response){
    this.setState({showDetailView:response})
  }

  slots(response, date){
    console.log('Date', date);
    this.setState({
      slotDate: date
    });
    //console.log('--date--', date)
    // let temp = _.clone(response);
    // let x = temp.map(function(addDate){
    //   delete addDate['__typename'];
    //   addDate.currentDate = date;
    //   return addDate;
    // });
    // //console.log('--slotTimings--', x);
    // this.setState({slotDetails:x})
  }

  cellValue(Details){
    let dates =new Date(Details);
    let day = dates.getDate();
    let month= dates.getMonth();
    let year=  dates.getFullYear();
    this.setState({day: day, month: month, year: year})
  }

  render() {
    const that = this;
    return (
      !that.state.showDetailView?<div className="app_main_wrap" style={{'overflow':'auto'}}>
        <div className="app_padding_wrap">
          <Calender
            dayBackgroundComponent={<MlFunderDayComponent cellValue={this.cellValue.bind(this)} slots={this.slots.bind(this)} orderId={this.props.orderId} sessionId={this.state.sessionIds} dayDetailView={this.dayDetail.bind(this)}/> }
            dayData={this.props.calendarDetails}
            onNavigate={that.onNavigate}
            date={that.state.date}/>
        </div>
      </div>:
        <MlAppFunderCalendarSlots orderId={this.props.orderId} sessionId={this.state.sessionIds} date={that.state.slotDate}/>
    )
  }
}
