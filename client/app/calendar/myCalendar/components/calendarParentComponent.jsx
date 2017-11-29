/**
 * Created by Mukhil on 19/6/17.
 */
import React, { Component } from 'react';
import Calender from '../../../../commons/calendar/calendar'
import { fetchAllProfileAppointmentCountsHandler, fetchProfileAppointmentCountsHandler, fetchSlotDetailsHandler, fetchMyAppointmentBetweenTwoDates } from '../actions/appointmentCount';
import MlCalendarHeader from './calendarHeader'
import CalCreateTask from './calCreateTask'
import CalCreateAppointmentView from './calAppointmentDetails'
import MlAppServiceManageSchedule from './createServiceCard'
import CalendarSlotDetail from './calCreateTask'
const _ = require('lodash');
import MlAppCalendarHeader from './../../common/components/MlAppCalendarHeader';
import MlAppDayAppointmentInfo from './../../common/components/MlAppDayAppointmentInfo';
import MlAppDayBackground from './../../common/components/MlAppDayBackground';
import MlAppEventComponent from './../../common/components/MlAppEventComponent';
import MlAppInfiniteCalendarSidebar from './../../common/components/MlAppInfiniteCalendarSidebar';
import MlAppSlotAppointmentDetails from './../../common/components/MlAppSlotAppointmentDetails';
import { getUserActiveProfileDetails } from '../../manageScheduler/activity/actions/activityActionHandler';
import MlAppCalenderAppointmentInfo from './../../common/components/MlAppCalenderAppointmentInfo';
import MlAppMyCalendarIdeator from './myTaskAppointments/components/MlAppMyCalendarIdeator';

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
      communityName: '',
      profile: [],
      slotDetailInfo: [{}],
      indexValue: 0,
      exploreAppointmentIds: [],
      calendarView: 'month'
    };
    this.onNavigate = this.onNavigate.bind(this);
    this.onViewChange = this.onViewChange.bind(this);
    this.componentToLoad.bind(this);
    this.eventsData.bind(this);
    this.getAllAppointments.bind(this);
    this.getAppointmentCounts = this.getAppointmentCounts.bind(this);
    this.appointmentView = this.appointmentView.bind(this);
    this.getSessionNumber.bind(this);
    this.onViewOrNagivationChange = this.onViewOrNagivationChange.bind(this);
  }

  async onViewOrNagivationChange(view, currentDate) {
    let startDay,
      startMonth,
      startYear,
      endDay,
      endMonth,
      endYear;
    const date = currentDate || new Date();
    if (view === 'day') {
      startDay = date.getDate();
      startMonth = date.getMonth();
      startYear = date.getFullYear();

      endDay = startDay;
      endMonth = startMonth;
      endYear = startYear;
    } else if (view === 'week') {
      startDay = date.getDate() - date.getDay(); // First day is the day of the month - the day of the week
      startMonth = date.getMonth();
      startYear = date.getFullYear();

      endDay = startDay + 6; // last day is the first day + 6
      endMonth = startMonth;
      endYear = startYear;
    }

    const profileId = this.state.profileId;
    const userId = Meteor.userId();
    if (profileId && (view === 'day' || view === 'week')) {
      let resp = await fetchMyAppointmentBetweenTwoDates(
        profileId, userId, startDay, startMonth, startYear,
        endDay, endMonth, endYear
      );
      resp = _.map(resp, _.partialRight(_.pick, ['title', 'start', 'end']));
      resp = resp.map((data) => {
        data.start = new Date(data.start);
        data.end = new Date(data.end);
        return data;
      });
      this.setState({ events: resp });
    } else {

    }
  }

  onNavigate(date) {
    this.setState({
      date: new Date(date)
    }, () => {
      const profileId = this.state.profileId;
      if (profileId) {
        const view = this.state.calendarView;
        if (view === 'day' || view === 'week') {
          this.onViewOrNagivationChange(view, new Date(date));
        } else { this.getProfileBasedAppointments(profileId); }
      } else {
        this.getAppointmentCounts()
      }
    });
  }

  onViewChange(view) {
    this.setState({ calendarView: view });
    this.onViewOrNagivationChange(view);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.componentToLoad === 'calendar' && this.state.componentToLoad !== 'calendar') {
      const profileId = this.state.profileId;
      if (profileId) {
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
    if (response) {
      this.getAppointmentCounts();
    }
  }

  async getAppointmentCounts() {
    const date = this.state.date ? new Date(this.state.date) : new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const resp = await fetchAllProfileAppointmentCountsHandler(month, year);
    const params = 'events' in resp ? resp.events : [];
    if (_.isEmpty(params)) {
      this.setState({
        events: params
      });
    } else {
      this.eventsData(params)
    }
    return resp;
  }

  eventsData(events) {
    const that = this;
    const profileInfo = that.state.profile || []
    const details = [];
    if (events) {
      events.map((info) => {
        const event = Object.assign({}, info);
        profileInfo.map((data) => {
          if (event.profileId === data.profileId) {
            event.communityName = data.communityName
            const temp = {
              title: `${info.count} ${event.communityName}`,
              className: 'ml my-ml-Investors',
              start: new Date(info.date),
              end: new Date(info.date)
            };
            details.push(temp);
          }
        })
      })
    }
    this.setState({
      events: details
    });
    return (details);
  }

  async getUserProfiles() {
    const resp = await getUserActiveProfileDetails();
    console.log('profile', resp);
    this.setState({ profile: resp });
    return resp;
  }

  getSessionNumber(index) {
    this.setState({ indexValue: index })
  }


  componentToLoad(response, date) {
    if (this.state.profileId) {
      this.setState({
        componentToLoad: response,
        appointmentDate: date
      });
    }
  }

  headerManagement(profileId, profileName) {
    this.setState({ profileId, communityName: profileName, componentToLoad: 'calendar' })
    this.getProfileBasedAppointments(profileId);
  }

  async getProfileBasedAppointments(profileId) {
    const date = this.state.date ? new Date(this.state.date) : new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const resp = await fetchProfileAppointmentCountsHandler(profileId, month, year)
    const that = this;
    const details = [];
    const events = 'events' in resp ? resp.events : [];
    const data = 'days' in resp ? resp.days : [];
    if (_.isEmpty(events)) {
      this.setState({
        events: [],
        data
      });
    } else {
      events.map((data) => {
        if (profileId === data.profileId) {
          const temp = {
            title: `${data.count} ${that.state.communityName}`,
            className: 'ml my-ml-Investors',
            start: new Date(data.date),
            end: new Date(data.date)
          };
          details.push(temp)
        }
      });
      that.setState({
        events: details,
        data
      });
    }
    return resp;
  }

  userDetails(response) {
    this.setState({ userInfo: response })
  }

  slotInfo(resp) {
    const appointmentIds = [];
    resp.appointments.map((data) => {
      appointmentIds.push(data.id)
    });
    this.setState({
      exploreAppointmentIds: appointmentIds,
      componentToLoad: 'slotDetailView'
    })
    // this.getSlotInfo( appointmentIds )
  }

  async getSlotInfo(appointmentId) {
    const that = this;
    const resp = await fetchSlotDetailsHandler(appointmentId)
    if (resp) {
      this.setState({ slotDetailInfo: resp }, () => {
        that.setState({ componentToLoad: 'slotDetailView' })
      })
      return resp;
    }
  }

  dayAppointmentInfoAddEvent(currentSlot) {
    const slot = currentSlot.slot;
    const date = new Date(this.state.appointmentDate);
    const startDate = slot.split('-')[0];
    const hours = startDate.split(':')[0];
    const minutes = startDate.split(':')[1];
    date.setHours(hours);
    date.setMinutes(minutes);
    const profiles = this.state.profile || [];
    const profileId = FlowRouter.getQueryParam('profile');
    const profile = profiles.find(user => user.profileId === profileId);
    if (profile && profile.isHasManageSchedule) {
      this.setState({
        componentToLoad: 'createTask',
        appointmentDate: date
      });
    } else {
      this.setState({
        componentToLoad: 'selfAppointment',
        appointmentDate: date
      });
    }
  }

  appointmentView(appointment) {
    const data = {
      _id: appointment._id,
      appointmentType: appointment.appointmentType,
      appointmentId: appointment.appointmentId,
      seeker: appointment.client,
      provider: appointment.provider,
      resourceId: appointment.appointmentInfo.resourceId,
      serviceName: appointment.appointmentInfo.serviceName,
      sessionId: appointment.appointmentInfo.sessionId,
      startDate: appointment.startDate,
      endDate: appointment.endDate
    };
    this.setState({
      selectedAppointment: data,
      componentToLoad: 'bookAppointmentDetails'
    });
  }

  render() {
    const { appointmentDate } = this.state;
    const that = this;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    // let eventsData = [{ title: '3', 'start': new Date(2017, 7, 7), 'end': new Date(2017, 7, 10) }];
    switch (that.state.componentToLoad) {
      case 'calendar':
        return (
          <div className="app_main_wrap" style={{ overflow: 'auto' }}>
            <div className="app_padding_wrap">
              <MlCalendarHeader getAllAppointments={this.getAllAppointments} getAppointmentCounts={this.getAppointmentCounts} headerManagement={that.headerManagement.bind(that)} userDetails={that.userDetails.bind(that)} componentToLoad={that.componentToLoad.bind(that)} />
              <Calender
                events={ that.state.events }
                dayBackgroundComponent={<MlAppDayBackground dayClickEvent={that.componentToLoad.bind(that, 'calendarDayView')}/> }
                eventComponent={<MlAppEventComponent />}
                dayData={{ days: that.state.data }}
                dateHeaderEvent={that.componentToLoad.bind(that, 'calendarDayView')}
                onNavigate={that.onNavigate}
                onViewChange={that.onViewChange}
                date={that.state.date}
              />
            </div>
          </div>
        )
        break;
      case 'calendarDayView':
        return (
          <div className="app_main_wrap" style={{ overflow: 'auto' }}>
            <div className="app_padding_wrap">
              <MlCalendarHeader getAllAppointments={this.getAllAppointments} getAppointmentCounts={this.getAppointmentCounts} headerManagement={that.headerManagement.bind(that)} componentToLoad={that.componentToLoad.bind(that)} userDetails={that.userDetails.bind(that)}/>
              <div className="app_main_wrap">
                <div className="app_padding_wrap">
                  <MlAppInfiniteCalendarSidebar
                    startDate={that.state.appointmentDate}
                    onDateClick={that.componentToLoad.bind(that, 'calendarDayView')}
                  />
                  <MlAppDayAppointmentInfo
                    appointmentDate={that.state.appointmentDate}
                    profileId={ that.state.profileId ? that.state.profileId : ''}
                    canAdd= { yesterday.getTime() < that.state.appointmentDate.getTime()}
                    canExplore= {true}
                    addEvent={this.dayAppointmentInfoAddEvent.bind(this)}
                    exploreEvent={this.slotInfo.bind(this)}
                  />
                </div>
              </div>
              {/* <AppCalendarDayView slotInfo={this.slotInfo.bind(this)} profileId={this.state.profileId} componentToLoad={this.componentToLoad.bind(this)} appointmentDate={this.state.appointmentDate} /> */}
            </div>
          </div>
        )
        break;
      case 'createTask':
        return (
          <div className="app_main_wrap" style={{ overflow: 'auto' }}>
            <div className="app_padding_wrap">
              <MlCalendarHeader getAllAppointments={this.getAllAppointments} getAppointmentCounts={this.getAppointmentCounts} headerManagement={that.headerManagement.bind(that)} componentToLoad={that.componentToLoad.bind(that)} userDetails={that.userDetails.bind(that)}/>
              <div className="app_main_wrap">
                <div className="app_padding_wrap">
                  <MlAppInfiniteCalendarSidebar
                    startDate={that.state.appointmentDate}
                    onDateClick={that.componentToLoad.bind(that, 'calendarDayView')}
                  />
                  <MlAppServiceManageSchedule profileId={this.state.profileId} getSessionNumber={this.getSessionNumber.bind(this)} appointmentDate={appointmentDate} componentToLoad={this.componentToLoad.bind(this)}/>
                </div>
              </div>
            </div>
          </div>
        )
        break;
      case 'viewTask':
        return (
          <div className="app_main_wrap" style={{ overflow: 'auto' }}>
            <div className="app_padding_wrap">
              <MlCalendarHeader getAppointmentCounts={this.getAppointmentCounts} headerManagement={that.headerManagement.bind(that)} componentToLoad={that.componentToLoad.bind(that)} userDetails={that.userDetails.bind(that)}/>
              <CalCreateTask componentToLoad={this.componentToLoad.bind(this)} />
            </div>
          </div>
        );
        break;
      case 'appointmentDetails':
        return (
          <div className="app_main_wrap" style={{ overflow: 'auto' }}>
            <div className="app_padding_wrap">
              <MlCalendarHeader getAllAppointments={this.getAllAppointments} getAppointmentCounts={this.getAppointmentCounts} headerManagement={that.headerManagement.bind(that)} componentToLoad={that.componentToLoad.bind(that)} userDetails={that.userDetails.bind(that)}/>
              <CalCreateAppointmentView/>
            </div>
          </div>
        );
        break;

      case 'selfAppointment':
        return (
          <div className="app_main_wrap" style={{ overflow: 'auto' }}>
            <div className="app_padding_wrap">
              <MlCalendarHeader getAppointmentCounts={this.getAppointmentCounts} headerManagement={that.headerManagement.bind(that)} componentToLoad={that.componentToLoad.bind(that)} userDetails={that.userDetails.bind(that)}/>
              <MlAppMyCalendarIdeator appointmentDate={that.state.appointmentDate} componentToLoad={that.componentToLoad.bind(that)}/>
              {/* <CalCreateAppointmentView/> */}
            </div>
          </div>
        )
        break;

      case 'slotDetailView':
        return (
          <div className="app_main_wrap" style={{ overflow: 'auto' }}>
            <div className="app_padding_wrap">
              <MlCalendarHeader getAppointmentCounts={this.getAppointmentCounts} headerManagement={that.headerManagement.bind(that)} componentToLoad={that.componentToLoad.bind(that)} userDetails={that.userDetails.bind(that)}/>
              <div className="app_main_wrap">
                <div className="app_padding_wrap">
                  <MlAppInfiniteCalendarSidebar
                    startDate={that.state.appointmentDate}
                    onDateClick={that.componentToLoad.bind(that, 'calendarDayView')}
                  />
                  <MlAppSlotAppointmentDetails
                    sessionNumber={this.state.indexValue}
                    appointmentIds={ this.state.exploreAppointmentIds }
                    isView={true}
                    viewEvent = {this.appointmentView}
                  />
                </div>
              </div>
            </div>
          </div>
        )
        break;
      case 'bookAppointmentDetails':
        return (
          <div className="app_main_wrap" style={{ overflow: 'auto' }}>
            <div className="app_padding_wrap">
              <MlCalendarHeader getAppointmentCounts={this.getAppointmentCounts} headerManagement={that.headerManagement.bind(that)} componentToLoad={that.componentToLoad.bind(that)} userDetails={that.userDetails.bind(that)}/>
              <div className="app_main_wrap">
                <div className="app_padding_wrap">
                  <MlAppInfiniteCalendarSidebar
                    startDate={that.state.appointmentDate}
                    onDateClick={that.componentToLoad.bind(that, 'calendarDayView')}
                  />
                  <div className="app_main_wrap" style={{ overflow: 'auto' }}>
                    <div className="app_padding_wrap">
                      <MlAppCalenderAppointmentInfo selectedAppointment={that.state.selectedAppointment} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        break;
    }
  }
}
