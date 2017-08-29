/**
 * Created by pankaj on 20/8/17.
 */

import React, {Component} from "react";
import Calender from '../../../../commons/calendar/calendar';
import {fetchOfficeMemberCalendarActionHandler} from './../actions/fetchOfficeMemberCalendar';
import {fetchAllOfficeMemberCalendarActionHandler} from './../actions/fetchAllOfficeMemberCalendar';
import MlAppDayAppointmentInfo from "./../../common/components/MlAppDayAppointmentInfo";
import MlAppCalendarHeader from './../../common/components/MlAppCalendarHeader';
import MlAppDayBackground from "./../../common/components/MlAppDayBackground";
import MlAppEventComponent from "./../../common/components/MlAppEventComponent";
import {fetchOfficeMemberActionHandler} from './../actions/fetchOfficeMember';

export default class MlAppOfficeCalendar extends Component {

  constructor(props){
    super(props);
    this.state = {
      events: [],
      users:[],
      date: new Date(),
      selectedUser: '',
      componentToLoad: 'calendar'
    };
    let month = this.state.date ? this.state.date.getMonth() : '' ;
    let year = this.state.date ? this.state.date.getFullYear() : '' ;
    this.fetchAllOfficeMemberCalendar(month, year);
    this.onNavigate = this.onNavigate.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.getOfficeMembers();
  }

  onNavigate(date) {
    if(this.state.selectedUser){
      this.setState({
        date: new Date(date)
      }, function () {
        let month = this.state.date ? this.state.date.getMonth() : '' ;
        let year = this.state.date ? this.state.date.getFullYear() : '' ;
        let userId = this.state.selectedUser.userId;
        let profileId = this.state.selectedUser.profileId;
        this.fetchOfficeMemberCalendar(userId, profileId, month, year);
      }.bind(this))
    }

  }

  selectUser(user){
    if(user){
      this.setState({
        selectedUser: user,
        componentToLoad: 'calendar'
      }, function () {
        let month = this.state.date ? this.state.date.getMonth() : '' ;
        let year = this.state.date ? this.state.date.getFullYear() : '' ;
        this.fetchOfficeMemberCalendar(user.userId, user.profileId, month, year)
      }.bind(this));
    } else {
      this.setState({
        selectedUser: null,
        componentToLoad: 'calendar'
      }, function () {
        let month = this.state.date ? this.state.date.getMonth() : '' ;
        let year = this.state.date ? this.state.date.getFullYear() : '' ;
        this.fetchAllOfficeMemberCalendar(month, year);
      }.bind(this));
    }

  }

  async fetchOfficeMemberCalendar(userId, profileId, month, year) {
    let data = await fetchOfficeMemberCalendarActionHandler(userId, profileId, month, year);
    if(data){
      let events = data.events ? data.events : [];
      let eventsData = events.map((data) => {
        return {
          title: data.count+ " Office Bearer",
          className: "ml ml-moolya-symbol",
          start: new Date(data.date),
          end: new Date(data.date),
          profileId: data.profileId
        }
      });
      this.setState({
        events: eventsData
      });
    }
    // console.log('Data', data);
  }

  async fetchAllOfficeMemberCalendar(month, year) {
    let data = await fetchAllOfficeMemberCalendarActionHandler( month, year );
    if(data){
      let events = data.events ? data.events : [];
      let eventsData = events.map((data) => {
        return {
          title: data.count+ " Office Bearer",
          className: "ml ml-moolya-symbol",
          start: new Date(data.date),
          end: new Date(data.date),
          profileId: data.profileId
        }
      });
      this.setState({
        events: eventsData
      });
    }
  }

  componentToLoad(componentName, date){
    let selectedUser = this.state.selectedUser;
    if(selectedUser){
      this.setState({
        componentToLoad: componentName,
        selectedDate : new Date(date)
      });
    }
  }

  async getOfficeMembers() {
    let users = await fetchOfficeMemberActionHandler();
    if(users){
      this.setState({
        users: users
      });
    }
  }

  render(){
    const that = this;
    const {componentToLoad} = this.state;
    let switchCaseComponent = function () {
      switch(componentToLoad) {
        case "calendar":
          return (
            <Calender
              events={ that.state.events }
              dayBackgroundComponent={<MlAppDayBackground dayClickEvent={that.componentToLoad.bind(that, 'dayAppointment')}/> }
              eventComponent={<MlAppEventComponent />}
              dateHeaderEvent={that.componentToLoad.bind(that, 'dayAppointment')}
              dayData={that.state.data}
              onNavigate={that.onNavigate}
              date={that.state.date}
            />
          );
          break;
        case "dayAppointment":
          return (
            <MlAppDayAppointmentInfo
              appointmentDate={that.state.selectedDate}
              userId={ that.state.selectedUser ? that.state.selectedUser.userId : ''}
              profileId={ that.state.selectedUser ? that.state.selectedUser.profileId : ''}
              canAdd= {false}
              canExplore= {false}
            />
          );
          break;
        case "dayDetailsAppointment":
          return (
            <h1>dayDetailsAppointment</h1>
          );
          break;

      }
    };

    return (
      <div className="app_main_wrap" style={{'overflow': 'auto'}}>
        <div className="app_padding_wrap">
          <MlAppCalendarHeader users={this.state.users} selectUser={that.selectUser} selectedUser={this.state.selectedUser} />
          {switchCaseComponent()}
        </div>
      </div>
    )
  }
}
