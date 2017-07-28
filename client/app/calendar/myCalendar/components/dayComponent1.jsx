/**
 * Created by pankaj on 21/7/17.
 */

import React, {Component} from "react";

export default class MlAppMyCalendarDayComponent extends Component {

  constructor(props){
    super(props)
  }

  dayClick(){
    console.log(this.props);
    this.props.componentToLoad('calendarDayView')
  }

  render(){
    const that = this;
    // console.log('MLDay',this.props);
    return (
      <div className="rbc-slot-travel-status" onClick={()=>that.dayClick()}>
      </div>
    )
  }
}
