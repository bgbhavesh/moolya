/**
 * Created by vishwadeep on 19/6/17.
 */
import React, {Component} from "react";
import Calender from '../../../../../commons/calendar/calendar'
import { fetchMyCalendarActionHandler } from '../../../../../app/calendar/myCalendar/actions/fetchMyCalendar';
import MlAppMyCalendarDayComponent from '../../../../../app/calendar/myCalendar/components/dayComponent';

export default class MlAppMyCalendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[],
      date: new Date()
    };
    this.getMyCalendar();
    this.onNavigate = this.onNavigate.bind(this);
  }

  async getMyCalendar(){
    let date = new Date(this.state.date);
    // console.log(date.getFullYear());
    let data = await fetchMyCalendarActionHandler(date.getMonth(), date.getFullYear());
    if(data) {
      this.setState({
        data: data.days
      })
    }
    console.log(data.days);
  }

  onNavigate(date){
    this.setState({
      date: new Date(date)
    }, function () {
      this.getMyCalendar();
    }.bind(this));
  }

  render() {
    const that = this;
    const props = that.props;
    return (
      <div className="app_main_wrap" style={{'overflow':'auto'}}>
        <div className="app_padding_wrap">
          <Calender
            dayBackgroundComponent={<MlAppMyCalendarDayComponent /> }
            dayData={that.state.data}
            onNavigate={that.onNavigate}
            date={that.state.date}
          />
        </div>
      </div>
    )
  }
}
