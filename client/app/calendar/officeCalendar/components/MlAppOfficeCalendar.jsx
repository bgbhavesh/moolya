/**
 * Created by pankaj on 20/8/17.
 */

import React, {Component} from "react";
import Calender from '../../../../commons/calendar/calendar';
import MlAppOfficeCalendarHeader from './MlAppOfficeCalendarHeader';
import {fetchOfficeMemberCalendarActionHandler} from './../actions/fetchOfficeMemberCalendar';
import {fetchAllOfficeMemberCalendarActionHandler} from './../actions/fetchAllOfficeMemberCalendar';
import MlAppDayAppointmentInfo from "../../common/components/MlAppDayAppointmentInfo";

export default class MlAppOfficeCalendar extends Component {

  constructor(props){
    super(props);
    this.state = {
      events: [],
      date: new Date(),
      selectedUser: ''
    };
    let month = this.state.date ? this.state.date.getMonth() : '' ;
    let year = this.state.date ? this.state.date.getFullYear() : '' ;
    this.fetchAllOfficeMemberCalendar(month, year);
    this.onNavigate = this.onNavigate.bind(this);
    this.selectUser = this.selectUser.bind(this);
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
        selectedUser: user
      }, function () {
        let month = this.state.date ? this.state.date.getMonth() : '' ;
        let year = this.state.date ? this.state.date.getFullYear() : '' ;
        this.fetchOfficeMemberCalendar(user.userId, user.profileId, month, year)
      }.bind(this));
    } else {
      this.setState({
        selectedUser: null
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
          title: data.count,
          start: new Date(data.date),
          end: new Date(data.date)
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
          title: data.count,
          start: new Date(data.date),
          end: new Date(data.date)
        }
      });
      this.setState({
        events: eventsData
      });
    }
  }

  render(){
    const that = this;
    return (
      <div className="app_main_wrap" style={{'overflow': 'auto'}}>
        <div className="app_padding_wrap">
          <MlAppOfficeCalendarHeader selectUser={that.selectUser} selectedUser={this.state.selectedUser} />
          <Calender
            events={ that.state.events }
            // dayBackgroundComponent={<MlAppMyCalendarDayComponent componentToLoad={that.componentToLoad.bind(that)}/> }
            dayData={that.state.data}
            onNavigate={that.onNavigate}
            date={that.state.date}
          />
        </div>
        {/*<MlAppDayAppointmentInfo />*/}
      </div>

    )
  }
}
