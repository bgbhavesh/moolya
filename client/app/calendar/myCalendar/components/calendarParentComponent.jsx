/**
 * Created by Mukhil on 19/6/17.
 */
import React, {Component} from "react";
import Calender from '../../../../commons/calendar/calendar'
import { fetchMyCalendarActionHandler } from '../actions/fetchMyCalendar';
import { fetchAllProfileAppointmentCountsHandler, fetchProfileAppointmentCountsHandler } from '../actions/appointmentCount';
import MlAppMyCalendarDayComponent from './dayComponent1';
import AppCalendarDayView from './calendarDetailComponent';
import CalCreateAppointment from './calSettings'
// import MlAppScheduleHead from '../../manageScheduler/commons/components/MlAppScheduleHead'
import MlCalendarHeader from './calendarHeader'
import CalCreateTask from './calCreateTask'
import CalCreateAppointmentView from './calAppointmentDetails'
import MlAppServiceManageSchedule from './createServiceCard'
var _ = require('lodash')

export default class MLAppMyCalendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      date: new Date(),
      appointmentDate: new Date(),
      showCalendar: false,
      componentToLoad: 'calendar',
      events: []
    }
    //this.getMyCalendar();
    this.onNavigate = this.onNavigate.bind(this);
    this.componentToLoad.bind(this);
    this.eventsData.bind(this);
    this.getAppointmentCounts = this.getAppointmentCounts.bind(this);
  }

  async getMyCalendar() {
    let date = new Date(this.state.date);
    // console.log(date.getFullYear());
    let data = await fetchMyCalendarActionHandler(date.getMonth(), date.getFullYear());
    if (data) {
      this.setState({
        data: data.days
      })
    }
    console.log(data.days);
  }

  onNavigate(date) {
    this.setState({
      date: new Date(date)
    }, function () {
      this.getMyCalendar();
    }.bind(this));
  }

  componentWillMount() {
    this.getAppointmentCounts();
    // this.setState({componentToLoad:'calendar'})
  }


  async getAppointmentCounts() {
    const resp = await fetchAllProfileAppointmentCountsHandler();
    let dates = [];
    let counts = [];
    resp.events.map(function( data ) {
      dates.push(data.date);
      counts.push(data.count);
    });
    let params = 'events' in resp ? resp.events : [];
    if(_.isEmpty(params)) {
      this.setState({
        events: []
      });
    } else {
      this.eventsData(params)
    }
    return resp;
  }

  eventsData(events){
    let details = [];
    if(events){
      events.map(function(data){
        let temp = {
          title: data.count,
          start: new Date(data.date),
          end: new Date(data.date)
        }
        details.push(temp)
      })
    }
    this.setState({
      events: details
    });
    return ( details );
  }


  componentToLoad(response, date){
   if(this.state.profileId) {
     this.setState({
       componentToLoad: response,
       appointmentDate: date
     });
   }
  }

  headerManagement(profileId, profileName) {
    this.setState({ profileId: profileId })
    this.getProfileBasedAppointments(profileId);
  }

  async getProfileBasedAppointments(profileId) {
      const resp = await fetchProfileAppointmentCountsHandler(profileId)
    let that = this;
    let details = [];
    let events = 'events' in resp ? resp.events : [];
    if(_.isEmpty(events)) {
      this.setState({
        events: []
      });
    } else {
      events.map( function( data ) {
        if( profileId === data.profileId ) {
          let temp = {
            title: data.count  ,
            start: new Date( data.date ),
            end: new Date( data.date )
          }
          details.push( temp )
        }
      })
      that.setState({
        events: details
      });
    }
      return resp;
  }

  userDetails(response) {
    this.setState({userInfo: response})
  }



  render() {
    const {appointmentDate} = this.state;
    const that = this;
    // let eventsData = [{ title: '3', 'start': new Date(2017, 7, 7), 'end': new Date(2017, 7, 10) }];
    switch(that.state.componentToLoad) {
      case 'calendar':
        return (
          <div className="app_main_wrap" style={{'overflow': 'auto'}}>
            <div className="app_padding_wrap">
              <MlCalendarHeader getAppointmentCounts={this.getAppointmentCounts} headerManagement={that.headerManagement.bind(that)} userDetails={that.userDetails.bind(that)} componentToLoad={that.componentToLoad.bind(that)} />
              <Calender
                events={ that.state.events }
                dayBackgroundComponent={<MlAppMyCalendarDayComponent componentToLoad={that.componentToLoad.bind(that)}/> }
                dayData={that.state.data}
                onNavigate={that.onNavigate}
                date={that.state.date}
              />
            </div>
          </div>
        )
        break;
      case 'calendarDayView':
        return (
          <div className="app_main_wrap" style={{'overflow': 'auto'}}>
            <div className="app_padding_wrap">
              <MlCalendarHeader getAppointmentCounts={this.getAppointmentCounts} headerManagement={that.headerManagement.bind(that)} componentToLoad={that.componentToLoad.bind(that)} userDetails={that.userDetails.bind(that)}/>
              <AppCalendarDayView profileId={this.state.profileId} componentToLoad={this.componentToLoad.bind(this)} appointmentDate={this.state.appointmentDate} />
            </div>
          </div>
        )
        break;
      case 'createTask':
        return(
        <div className="app_main_wrap" style={{'overflow': 'auto'}}>
          <div className="app_padding_wrap">
            <MlCalendarHeader getAppointmentCounts={this.getAppointmentCounts} headerManagement={that.headerManagement.bind(that)} componentToLoad={that.componentToLoad.bind(that)} userDetails={that.userDetails.bind(that)}/>
            <MlAppServiceManageSchedule profileId={this.state.profileId} appointmentDate={appointmentDate} componentToLoad={this.componentToLoad.bind(this)}/>
          </div>
        </div>
        )
      break;
      case 'viewTask':
        return(
          <div className="app_main_wrap" style={{'overflow': 'auto'}}>
            <div className="app_padding_wrap">
              <MlCalendarHeader getAppointmentCounts={this.getAppointmentCounts} headerManagement={that.headerManagement.bind(that)} componentToLoad={that.componentToLoad.bind(that)} userDetails={that.userDetails.bind(that)}/>
              <CalCreateTask/>
            </div>
          </div>
        )
        break;
      case 'appointmentDetails':
        return(
          <div className="app_main_wrap" style={{'overflow': 'auto'}}>
            <div className="app_padding_wrap">
              <MlCalendarHeader getAppointmentCounts={this.getAppointmentCounts} headerManagement={that.headerManagement.bind(that)} componentToLoad={that.componentToLoad.bind(that)} userDetails={that.userDetails.bind(that)}/>
              <CalCreateAppointmentView/>
            </div>
          </div>
        )
        break;

      case 'selfAppointment':
        return(
          <div className="app_main_wrap" style={{'overflow': 'auto'}}>
            <div className="app_padding_wrap">
              <MlCalendarHeader getAppointmentCounts={this.getAppointmentCounts} headerManagement={that.headerManagement.bind(that)} componentToLoad={that.componentToLoad.bind(that)} userDetails={that.userDetails.bind(that)}/>
              <CalCreateAppointmentView/>
            </div>
          </div>
        )
        break;
    }
  }
}
