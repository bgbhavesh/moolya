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
import {getUserProfileActionHandler} from "../../manageScheduler/activity/actions/activityActionHandler";

export default class MLAppMyCalendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      date: new Date(),
      appointmentDate: new Date(),
      showCalendar: false,
      componentToLoad: 'calendar',
      events: [],
      communityName:"",
      profile:[]
    }
    this.onNavigate = this.onNavigate.bind(this);
    this.componentToLoad.bind(this);
    this.eventsData.bind(this);
    this.getAllAppointments.bind(this);
    this.getAppointmentCounts = this.getAppointmentCounts.bind(this);
  }

  onNavigate(date) {
    this.setState({
      date: new Date(date)
    }, function () {
      let profileId = this.state.profileId;
      if(profileId){
        this.getProfileBasedAppointments(profileId);
      } else {
        this.getAppointmentCounts()
      }
    }.bind(this));
  }

  componentWillUpdate(nextProps, nextState){
    if(nextState.componentToLoad === 'calendar' && this.state.componentToLoad !== "calendar") {
      console.log('componentWillUpdate');
      let profileId = this.state.profileId;
      if(profileId) {
        this.getProfileBasedAppointments(profileId);
      } else {
        this.getAppointmentCounts()
      }
    }
  }

  componentWillMount() {
    this.getUserProfiles(),
    this.getAppointmentCounts();
    // this.setState({componentToLoad:'calendar'})
  }

  getAllAppointments(response) {
    if(response) {
      this.getAppointmentCounts();
    }
  }

  async getAppointmentCounts() {
    const resp = await fetchAllProfileAppointmentCountsHandler();
    let params = 'events' in resp ? resp.events : [];
    if(_.isEmpty(params)) {
      this.setState({
        events: params
      });
    } else {
      this.eventsData(params)
    }
    return resp;
  }

  eventsData(events){
    let that =  this;
    let profileInfo  = that.state.profile|| []
    let details = [];
    if(events){
       events.map(function(info){
        let event = Object.assign({}, info);
        profileInfo.map(function(data){
          if(event.profileId === data.profileId) {
            event.communityName = data.communityName
            let temp = {
              title: <span> <span className="ml ml-funder"></span>{" "+info.count + " " + event.communityName}</span>,
              start: new Date(info.date),
              end: new Date(info.date)
            }
            details.push(temp)
          }
        })
      })
    }
    this.setState({
      events: details
    });
    return ( details );
  }

  async getUserProfiles() {
    const resp = await getUserProfileActionHandler();
    this.setState({profile: resp})
    return resp;
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
    this.setState({ profileId: profileId, communityName: profileName})
    this.getProfileBasedAppointments(profileId);
  }

  async getProfileBasedAppointments(profileId) {
    const resp = await fetchProfileAppointmentCountsHandler(profileId)
    let that = this;
    let details = [];
    let events = 'events' in resp ? resp.events : [];
    let data = 'days' in resp ? resp.days : [];
    if(_.isEmpty(events)) {
      this.setState({
        events: [],
        data: data
      });
    } else {
      events.map( function( data ) {
        if( profileId === data.profileId ) {
          let temp = {
            title: <span className="ml ml-funder">{" "+data.count+" " +that.state.communityName}</span>,
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
              <MlCalendarHeader getAllAppointments={this.getAllAppointments} getAppointmentCounts={this.getAppointmentCounts}  headerManagement={that.headerManagement.bind(that)} userDetails={that.userDetails.bind(that)} componentToLoad={that.componentToLoad.bind(that)} />
              <Calender
                events={ that.state.events }
                dayBackgroundComponent={<MlAppMyCalendarDayComponent componentToLoad={that.componentToLoad.bind(that)}/> }
                dayData={{days:that.state.data}}
                dateHeaderEvent={that.componentToLoad.bind(that, 'calendarDayView')}
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
              <MlCalendarHeader getAllAppointments={this.getAllAppointments} getAppointmentCounts={this.getAppointmentCounts}  headerManagement={that.headerManagement.bind(that)} componentToLoad={that.componentToLoad.bind(that)} userDetails={that.userDetails.bind(that)}/>
              <AppCalendarDayView profileId={this.state.profileId} componentToLoad={this.componentToLoad.bind(this)} appointmentDate={this.state.appointmentDate} />
            </div>
          </div>
        )
        break;
      case 'createTask':
        return(
        <div className="app_main_wrap" style={{'overflow': 'auto'}}>
          <div className="app_padding_wrap">
            <MlCalendarHeader getAllAppointments={this.getAllAppointments} getAppointmentCounts={this.getAppointmentCounts}  headerManagement={that.headerManagement.bind(that)} componentToLoad={that.componentToLoad.bind(that)} userDetails={that.userDetails.bind(that)}/>
            <MlAppServiceManageSchedule profileId={this.state.profileId} appointmentDate={appointmentDate} componentToLoad={this.componentToLoad.bind(this)}/>
          </div>
        </div>
        )
      break;
      case 'viewTask':
        return(
          <div className="app_main_wrap" style={{'overflow': 'auto'}}>
            <div className="app_padding_wrap">
              <MlCalendarHeader getAppointmentCounts={this.getAppointmentCounts}  headerManagement={that.headerManagement.bind(that)} componentToLoad={that.componentToLoad.bind(that)} userDetails={that.userDetails.bind(that)}/>
              <CalCreateTask componentToLoad={this.componentToLoad.bind(this)} />
            </div>
          </div>
        )
        break;
      case 'appointmentDetails':
        return(
          <div className="app_main_wrap" style={{'overflow': 'auto'}}>
            <div className="app_padding_wrap">
              <MlCalendarHeader getAllAppointments={this.getAllAppointments} getAppointmentCounts={this.getAppointmentCounts} headerManagement={that.headerManagement.bind(that)} componentToLoad={that.componentToLoad.bind(that)} userDetails={that.userDetails.bind(that)}/>
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
