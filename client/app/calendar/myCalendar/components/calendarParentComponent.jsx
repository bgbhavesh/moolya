/**
 * Created by Mukhil on 19/6/17.
 */
import React, {Component} from "react";
import Calender from '../../../../commons/calendar/calendar'
import { fetchMyCalendarActionHandler } from '../actions/fetchMyCalendar';
import MlAppMyCalendarDayComponent from './dayComponent1';
import AppCalendarDayView from './calendarDetailComponent';
import CalCreateAppointment from './calSettings'
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
      componentToLoad: 'calendar'
    };
    //this.getMyCalendar();
    this.onNavigate = this.onNavigate.bind(this);
    this.componentToLoad.bind(this);
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

  componentWillMount(){
    this.setState({componentToLoad:'calendar'})
  }


  componentToLoad(response){
   this.setState({componentToLoad: response})
  }

  render() {
    const that = this;
    switch(that.state.componentToLoad) {
      case 'calendar':
        return (
          <div className="app_main_wrap" style={{'overflow': 'auto'}}>
            <div className="app_padding_wrap">
              <Calender
                dayBackgroundComponent={<MlAppMyCalendarDayComponent componentToLoad={this.componentToLoad.bind(this)}/> }
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
