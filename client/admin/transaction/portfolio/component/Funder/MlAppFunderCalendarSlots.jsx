/**
 * Created by pankaj on 31/7/17.
 */
import React, {Component} from "react";
import { fetchSessionDayActionHandler, bookUserServiceCardAppointmentActionHandler } from '../../../../../app/calendar/myCalendar/actions/fetchMyCalendar';
import CDNImage from "../../../../../commons/components/CDNImage/CDNImage";
let FontAwesome = require('react-fontawesome');
import Days from "./Days.jsx";

export default class MlAppFunderCalendarSlots extends Component {

  constructor(props) {
    super(props);
    this.state = {
      shift:'morning',
      slotDetails:[],
      date: props.date ? props.date : new Date()
    };
    console.log(props);
    this.handleDateSelect = this.handleDateSelect.bind(this);
  }

  bookSlot(timeSlot, index){
    let orderId=this.props.orderId;
    let sessionId=this.props.sessionId[0];
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
      day: this.props.date.getDate(),
      month: this.props.date.getMonth(),
      year: this.props.date.getFullYear()
    };
    this.bookAppointment(tempObject)
  }

  async bookAppointment(userServiceCardAppointmentInfo){
    const resp = await bookUserServiceCardAppointmentActionHandler(userServiceCardAppointmentInfo)
    if(resp && resp.success){
      toastr.success('Appointment Booked Successfully')
      this.props.componentToView('landingPage')
    } else {
      toastr.error(resp.result);
    }
    return resp;
  }

  componentDidMount() {
    this.getSessionDetails(this.state.date);
  }

  async getSessionDetails(currentDate){
    let dates =new Date(currentDate);
    let orderId= this.props.orderId;
    let sessionId= this.props.sessionId[0];
    let date = dates.getDate();
    let month= dates.getMonth();
    let year=  dates.getFullYear();
    const response = await fetchSessionDayActionHandler(orderId,sessionId, date, month, year)
    if(response){
      this.setState({
        slotDetails: response
      })
    }
  }

  handleDateSelect(date) {
    this.setState({
      date: date
    }, function () {
      this.getSessionDetails(date);
    }.bind(this));
  }

  updateShift(shift){
    this.setState({
      shift: shift
    })
  }

  render() {
    const that = this;
    // const slots = this.state.slotDetails;
    let slots = that.state.slotDetails.filter( (slot) => {
      return slot.shift === that.state.shift;
    });
    const slotTimings = slots.map(function(slot, index){
      return(
        <div className="col-md-4 col-sm-4 col-lg-3" key={index} >
          <a href="">
            <div className="funders_list_block" onClick={that.bookSlot.bind(that, slot.slotTime, index)}>
              <h3>{slot.slotTime}</h3>
              <div className="list_icon"><span className="ml ml-moolya-symbol"></span></div>
              <div className="block_footer">
                <span>{slot.status === 0?"Available":slot.status===1?"Filling Fast":slot.status===2?"Busy":""}</span>
              </div>
            </div>
          </a>
        </div>
      )
    });

    return (
      <div className="main_wrap_scroll" style={{"overflow": "hidden"}}>
        <div className="row funders_list">
          <ul className="cal_tabs act_tab">
            <li className="col-md-4 nopadding-left" onClick={() => that.updateShift('morning') } style={{cursor: "pointer"}} >
                  <span className={ that.state.shift === "morning" ? "act_tab" : ''} >
                    <CDNImage src="/images/mor_icon.png"/> Morning
                  </span>
            </li>
            <li className="col-md-4 nopadding" onClick={() => that.updateShift('afternoon') } style={{cursor: "pointer"}} >
                  <span className={ that.state.shift === "afternoon" ? "act_tab" : ''} >
                    <CDNImage src="/images/aft_icon.png"/> Afternoon
                  </span>
            </li>
            <li className="col-md-4 nopadding-right"  onClick={() => that.updateShift('evening') } style={{cursor: "pointer"}} >
                  <span className={ that.state.shift === "evening" ? "act_tab" : ''} >
                    <CDNImage src="/images/eve_icon.png"/> Evening
                  </span>
            </li>
          </ul>
          <br className="brclear"/>
          <div className="row day_tab_content">
            {slotTimings}
          </div>
          <span className="calender_switch"><FontAwesome name="calendar"/></span>
          <div>
            <Days
              width = {that.state.width}
              onDateSelect = {that.handleDateSelect}
              startDate = { that.state.date } />
          </div>
        </div>
      </div>
    )
  }
}
