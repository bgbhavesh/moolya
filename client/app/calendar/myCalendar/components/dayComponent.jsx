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
  }

  render(){
    const that = this;
    // console.log('MLDay',this.props);
    return (
      <div className="rbc-slot-available-status" onClick={()=>that.dayClick()}>
      </div>
    )
  }
}
