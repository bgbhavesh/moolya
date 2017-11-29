/**
 * Created by pankaj on 20/8/17.
 */

import React, { Component } from 'react';
import Calender from '../../../../commons/calendar/calendar';
import { fetchOfficeMemberCalendarActionHandler } from './../actions/fetchOfficeMemberCalendar';
import { fetchAllOfficeMemberCalendarActionHandler } from './../actions/fetchAllOfficeMemberCalendar';
import MlAppDayAppointmentInfo from './../../common/components/MlAppDayAppointmentInfo';
import MlAppCalendarHeader from './../../common/components/MlAppCalendarHeader';
import MlAppDayBackground from './../../common/components/MlAppDayBackground';
import MlAppEventComponent from './../../common/components/MlAppEventComponent';
import { fetchOfficeMemberActionHandler } from './../actions/fetchOfficeMember';
import MlAppInfiniteCalendarSidebar from './../../common/components/MlAppInfiniteCalendarSidebar';
import MlAppSlotAppointmentDetails from './../../common/components/MlAppSlotAppointmentDetails';

export default class MlAppOfficeCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      users: [],
      date: new Date(),
      selectedUser: {
        _id: 0,
        name: 'Consolidated',
        isConsolidated: true
      },
      componentToLoad: 'calendar',
      exploreAppointmentIds: []
    };
    const month = this.state.date ? this.state.date.getMonth() : '';
    const year = this.state.date ? this.state.date.getFullYear() : '';
    this.fetchAllOfficeMemberCalendar(month, year);
    this.onNavigate = this.onNavigate.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.slotInfo = this.slotInfo.bind(this);
    this.getOfficeMembers();
  }

  onNavigate(date) {
    if (this.state.selectedUser) {
      this.setState({
        date: new Date(date)
      }, () => {
        const month = this.state.date ? this.state.date.getMonth() : '';
        const year = this.state.date ? this.state.date.getFullYear() : '';
        const userId = this.state.selectedUser.userId;
        const profileId = this.state.selectedUser.profileId;
        this.fetchOfficeMemberCalendar(userId, profileId, month, year);
      })
    }
  }

  selectUser(user) {
    if (!user.isConsolidated) {
      this.setState({
        selectedUser: user,
        componentToLoad: 'calendar'
      }, () => {
        const month = this.state.date ? this.state.date.getMonth() : '';
        const year = this.state.date ? this.state.date.getFullYear() : '';
        this.fetchOfficeMemberCalendar(user.userId, user.profileId, month, year)
      });
    } else {
      this.setState({
        selectedUser: null,
        componentToLoad: 'calendar'
      }, () => {
        const month = this.state.date ? this.state.date.getMonth() : '';
        const year = this.state.date ? this.state.date.getFullYear() : '';
        this.fetchAllOfficeMemberCalendar(month, year);
      });
    }
  }

  async fetchOfficeMemberCalendar(userId, profileId, month, year) {
    const data = await fetchOfficeMemberCalendarActionHandler(userId, profileId, month, year);
    if (data) {
      const events = data.events ? data.events : [];
      const eventsData = events.map(data => ({
        title: `${data.count} Office Bearer`,
        className: 'ml ml-moolya-symbol',
        start: new Date(data.date),
        end: new Date(data.date),
        profileId: data.profileId
      }));
      this.setState({
        events: eventsData
      });
    }
    // console.log('Data', data);
  }

  async fetchAllOfficeMemberCalendar(month, year) {
    const data = await fetchAllOfficeMemberCalendarActionHandler(month, year);
    if (data) {
      const events = data.events ? data.events : [];
      const eventsData = events.map(data => ({
        title: `${data.count} Office Bearer`,
        className: 'ml ml-moolya-symbol',
        start: new Date(data.date),
        end: new Date(data.date),
        profileId: data.profileId
      }));
      this.setState({
        events: eventsData
      });
    }
  }

  componentToLoad(componentName, date) {
    const selectedUser = this.state.selectedUser;
    if (selectedUser) {
      this.setState({
        componentToLoad: componentName,
        selectedDate: new Date(date)
      });
    }
  }

  async getOfficeMembers() {
    const users = await fetchOfficeMemberActionHandler();
    if (users) {
      if (users.length == 1) {
        console.log('selectedUser', this.state.selectedUser, users);
        this.setState({
          users,
          selectedUser: users[0]
        }, () => {
          this.selectUser(users[0]);
        });
      } else {
        const teamUsers = JSON.parse(JSON.stringify(users));
        teamUsers.splice(0, 0, {
          _id: 0,
          name: 'Consolidated',
          isConsolidated: true
        });
        console.log(teamUsers);
        this.setState({
          users: teamUsers
        });
      }
    }
  }

  slotInfo(resp) {
    const appointmentIds = [];
    resp.appointments.map((data) => {
      appointmentIds.push(data.id)
    });
    this.setState({
      exploreAppointmentIds: appointmentIds,
      componentToLoad: 'dayDetailsAppointment'
    })
  }

  render() {
    const that = this;
    const { componentToLoad } = this.state;
    const switchCaseComponent = function () {
      switch (componentToLoad) {
        case 'calendar':
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
        case 'dayAppointment':
          return (
            <div className="app_main_wrap">
              <div className="app_padding_wrap">
                <MlAppInfiniteCalendarSidebar
                  startDate={that.state.selectedDate}
                  onDateClick={that.componentToLoad.bind(that, 'dayAppointment')}
                />
                <MlAppDayAppointmentInfo
                  appointmentDate={that.state.selectedDate}
                  userId={ that.state.selectedUser ? that.state.selectedUser.userId : ''}
                  profileId={ that.state.selectedUser ? that.state.selectedUser.profileId : ''}
                  canAdd= {false}
                  canExplore= {true}
                  exploreEvent={that.slotInfo.bind(this)}
                />
              </div>
            </div>
          );
          break;
        case 'dayDetailsAppointment':
          return (
            <div className="app_main_wrap">
              <div className="app_padding_wrap">
                <MlAppInfiniteCalendarSidebar
                  startDate={that.state.appointmentDate}
                  onDateClick={that.componentToLoad.bind(that, 'dayAppointment')}
                />
                <MlAppSlotAppointmentDetails
                  appointmentIds={ that.state.exploreAppointmentIds }
                />
              </div>
            </div>
          );
          break;
      }
    };

    return (
      <div className="app_main_wrap" style={{ overflow: 'auto' }}>
        <div className="app_padding_wrap">
          <MlAppCalendarHeader users={this.state.users} selectUser={that.selectUser} selectedUser={this.state.selectedUser} />
          {switchCaseComponent()}
        </div>
      </div>
    )
  }
}
