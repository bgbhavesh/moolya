/**
 * Created by pankaj on 27/8/17.
 */
let FontAwesome = require('react-fontawesome');
import React, { Component } from 'react';
import {fetctOfficeDayAppointmentActionHandler} from './../actions/fetchDayAppointmenstInfo';

const TIMINIG = {
  morning: {
    start: "00:00",
    end:  "12:00",
  },
  afternoon: {
    start: "12:00",
    end:  "18:00",
  },
  evening: {
    start: "18:00",
    end:  "24:00",
  }
};

export default class MlAppDayAppointmentInfo extends Component {

  constructor(props) {
    super(props);
    this.state= {
      showCreateComponent: false,
      shift:'morning',
      slots:[]
    };
    this.showCreateComponent=this.showCreateComponent.bind(this)
  }

  componentDidMount() {
    let WinWidth = $(window).width();
    if(WinWidth > 768){
      $(".app_main_wrap").mCustomScrollbar({theme:"minimal-dark"});
    }
    this.getMyAppointment();
  }

  async getMyAppointment() {
    console.log(this.props);
    let date = new Date(this.props.appointmentDate);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let profileId = this.props.profileId;
    let userId = this.props.userId;
    let response = await fetctOfficeDayAppointmentActionHandler(userId, profileId, day, month, year);
    if (response) {
      this.setState({
        slots: response
      });
    }
  }

  showCreateComponent(type, slot){
    let date = new Date(this.props.appointmentDate);
    let startDate = slot.split('-')[0];
    let hours = startDate.split(':')[0];
    let minutes = startDate.split(':')[1];
    date.setHours(hours);
    date.setMinutes(minutes);
    console.log(date);
    this.props.componentToLoad(type, date)
  }

  updateShift(shift){
    this.setState({
      shift: shift
    })
  }

  render(){
    //console.log('This Slots', this.state.slots)
    const that = this;
    const {canAdd, canExplore, addEvent, exploreEvent} = this.props;
    let slots = that.state.slots.filter( (slot) => {
      return slot.shift === that.state.shift;
    });
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
          {/*<InlineCalender/>*/}
          <div className="col-md-12">
            <ul className="cal_tabs act_tab">
              <li className="col-md-4 nopadding-left" onClick={() => that.updateShift('morning') } style={{cursor: "pointer"}} >
                <span className={ that.state.shift === "morning" ? "act_tab" : ''} >
                  <img src="/images/mor_icon.png"/> Morning
                </span>
              </li>
              <li className="col-md-4 nopadding" onClick={() => that.updateShift('afternoon') } style={{cursor: "pointer"}} >
                <span className={ that.state.shift === "afternoon" ? "act_tab" : ''} >
                  <img src="/images/aft_icon.png"/> Afternoon
                </span>
              </li>
              <li className="col-md-4 nopadding-right"  onClick={() => that.updateShift('evening') } style={{cursor: "pointer"}} >
                <span className={ that.state.shift === "evening" ? "act_tab" : ''} >
                  <img src="/images/eve_icon.png"/> Evening
                </span>
              </li>
            </ul>
            <br className="brclear"/>
            <div className="row day_tab_content">
              {
                slots.map(function (data, index) {
                  let appointments = data.appointments;
                  return (
                    <div className="col-md-3" key={index}>
                      <div className="day_app_list">
                        <div className="app_list_head">
                          {data.slot}
                          <span className="pull-right">
                            { canAdd ? <a href=""><FontAwesome name='plus' onClick={() => addEvent('createTask', data.slot)}/></a> : '' }
                            { canExplore ? <a href=""><FontAwesome name='ellipsis-h' onClick={ () => exploreEvent('viewTask')}/></a> : '' }
                          </span>
                        </div>
                        <ul className="list-group">
                          {
                            appointments.map(function (appointments, aptIndex) {
                              appointments = appointments ? appointments : {};
                              return (
                                <li key={aptIndex} className="list-group-item">
                                  <span className="task_with">
                                    <span className="ml ml-funder">
                                    </span>
                                  </span> { appointments.name } <span className="task_status act_task">
                                  <FontAwesome name='check'/>
                                </span>
                                </li>
                              )
                            })
                          }
                        </ul>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
