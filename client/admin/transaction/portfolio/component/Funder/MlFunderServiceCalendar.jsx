/**
 * Created by Mukhil on 19/6/17.
 */
import React, {Component} from "react";
import Calender from '../../../../../commons/calendar/calendar'
import { fetchServiceCalendarActionHandler, fetchMyCalendarActionHandler, fetchSessionDayActionHandler, bookUserServiceCardAppointmentActionHandler } from '../../../../../app/calendar/myCalendar/actions/fetchMyCalendar';
import MlAppMyCalendarDayComponent from '../../../../../app/calendar/myCalendar/components/dayComponent';
import _ from "lodash";

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
    //console.log('--date--', date)
    let temp = _.clone(response);
    let x = temp.map(function(addDate){
      delete addDate['__typename'];
      addDate.currentDate = date;
      return addDate;
    });
    //console.log('--slotTimings--', x);
    this.setState({slotDetails:x})
  }

  bookSlot(timeSlot, index){
    let orderId=this.props.orderId;
    let sessionId=this.state.sessionIds[0]
    let time = timeSlot.split('-');
    let firstHour = time[1].split(':')
    let secondHour = time[0].split(':')
    let hours = secondHour[0]
    let minutes = secondHour[1];
    let tempObject={
      orderId: orderId,
      sessionId: sessionId,
      hours: hours,
      minutes: minutes,
      day: this.state.day,
      month:this.state.month,
      year:this.state.year
    }
    this.bookAppointment(tempObject)
  }

  cellValue(Details){
    let dates =new Date(Details);
    let day = dates.getDate();
    let month= dates.getMonth();
    let year=  dates.getFullYear();
    this.setState({day: day, month: month, year: year})
  }



  async bookAppointment(userServiceCardAppointmentInfo){
    const resp = await bookUserServiceCardAppointmentActionHandler(userServiceCardAppointmentInfo)
    if(resp){
      toastr.success('Appointment Booked Successfully')
    }
    return resp;
  }

  render() {
    const that = this;
    const props = that.props;

    const slots = this.state.slotDetails || []
    const slotTimings = slots.map(function(slot, index){
      return(
        <div className="col-md-4 col-sm-4 col-lg-3" key={index} >
          <a href="#">
            <div className="funders_list_block" onClick={that.bookSlot.bind(that, slot.slotTime, index)}>
              <h3>{slot.slotTime}</h3>
              <div className="list_icon"><span className="ml ml-moolya-symbol"></span></div>
              <div className="block_footer">
                <span>{slot.currentDate}</span>
                <span>{slot.status === 0?"Available":slot.status===1?"Filling Fast":slot.status===2?"Busy":""}</span>
              </div>
            </div>
          </a>
        </div>
      )
      })




    return (
      !that.state.showDetailView?<div className="app_main_wrap" style={{'overflow':'auto'}}>
        <div className="app_padding_wrap">
          <Calender
            dayBackgroundComponent={<MlAppMyCalendarDayComponent cellValue={this.cellValue.bind(this)} slots={this.slots.bind(this)} orderId={this.props.orderId} sessionId={this.state.sessionIds} dayDetailView={this.dayDetail.bind(this)}/> }
            dayData={this.props.calendarDetails}
            onNavigate={that.onNavigate}
            date={that.state.date}/>
        </div>
      </div>:
        <div className="row funders_list">
          {slotTimings}
      </div>
    )
  }
}
