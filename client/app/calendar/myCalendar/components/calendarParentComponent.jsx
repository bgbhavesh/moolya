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

export default class MLAppMyCalendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      date: new Date(),
      showCalendar: false,
      componentToLoad: 'calendar',
      events: []
    }
    //this.getMyCalendar();
    this.onNavigate = this.onNavigate.bind(this);
    this.componentToLoad.bind(this);
    this.eventsData.bind(this);
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
    console.log(resp)
    resp.events.map(function( data ) {
      dates.push(data.date);
      counts.push(data.count);
    });
    let params = 'events' in resp ? resp.events : [];
    this.eventsData(params)
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


  componentToLoad(response){
    console.log(response)
   this.setState({componentToLoad: response})
  }

  headerManagement(profileId, profileName) {
    console.log('--profileId--', profileId , '--communityName--', profileName )
    this.getProfileBasedAppointments(profileId);
  }

  async getProfileBasedAppointments(profileId) {
      const resp = await fetchProfileAppointmentCountsHandler(profileId)
    let that = this;
    let details = [];
    let events = 'events' in resp ? resp.events : [];
    events.map(function(data){
      if(profileId === data.profileId){
        let temp = {
          title: data.count  ,
          start: new Date(data.date),
          end: new Date(data.date)
        }
        details.push(temp)
      }
    })
    that.setState({
      events: details
    });
      return resp;
  }



  render() {
    const that = this;
    // let eventsData = [{ title: '3', 'start': new Date(2017, 7, 7), 'end': new Date(2017, 7, 10) }];
    switch(that.state.componentToLoad) {
      case 'calendar':
        return (
          <div className="app_main_wrap" style={{'overflow': 'auto'}}>
            <div className="app_padding_wrap">
              <MlCalendarHeader headerManagement={that.headerManagement.bind(that)}/>
              <Calender
                events={ that.state.events }
                dayBackgroundComponent={<MlAppMyCalendarDayComponent componentToLoad={that.componentToLoad.bind(that)}/> }
                dayData={that.state.data}
                onNavigate={that.onNavigate}
                date={that.state.date}
                eventComponent={<IconComponent/>  }
              />
            </div>
          </div>
        )
        break;
      case 'calendarDayView':
        return (
          <div className="app_main_wrap" style={{'overflow': 'auto'}}>
            <div className="app_padding_wrap">
              <MlCalendarHeader componentToLoad={that.componentToLoad.bind(that)}/>
              <AppCalendarDayView componentToLoad={this.componentToLoad.bind(this)}/>
            </div>
          </div>
        )
        break;
      case 'createTask':
        return(
        <div className="app_main_wrap" style={{'overflow': 'auto'}}>
          <div className="app_padding_wrap">
            <MlAppServiceManageSchedule componentToLoad={this.componentToLoad.bind(this)}/>
          </div>
        </div>
        )
      break;
      case 'viewTask':
        return(
          <div className="app_main_wrap" style={{'overflow': 'auto'}}>
            <div className="app_padding_wrap">
              <CalCreateTask/>
            </div>
          </div>
        )
        break;
      case 'appointmentDetails':
        return(
          <div className="app_main_wrap" style={{'overflow': 'auto'}}>
            <div className="app_padding_wrap">
              <CalCreateAppointmentView/>
            </div>
          </div>
        )
        break;
    }
  }
}

class IconComponent extends Component {
  render() {
    console.log('HELLO')
    return(
      <span>
        <span className="ml ml-funder">
        </span>
        <span> 25
        </span>
      </span>
    )
  }
}
