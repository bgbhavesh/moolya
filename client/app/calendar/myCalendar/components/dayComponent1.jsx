/**
 * Created by pankaj on 21/7/17.
 */

import React, {Component} from "react";

export default class MlAppMyCalendarDayComponent extends Component {

  constructor(props){
    super(props)
  }

  dayClick(){
    let date = this.props && this.props.calendar && this.props.calendar.value ? this.props.calendar.value : new Date();
    // console.log(this.props);
    this.props.componentToLoad('calendarDayView', date)
  }

  render(){
    const that = this;
    // console.log('MLDay',this.props);
    return (
      <div className="rbc-slot-filling-fast-status" onClick={()=>that.dayClick()}></div>
    )
  }
}
