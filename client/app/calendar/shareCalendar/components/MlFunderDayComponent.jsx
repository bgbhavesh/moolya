/**
 * Created by mukhil on 13/9/17.
 */

import React, {Component} from "react";
import {fetchSessionDayActionHandler } from '../actions/fetchSessionDayActionHandler';

export default class MlFunderDayComponent extends Component {

  constructor(props){
    super(props)
    this.state={
      status: null
    }
  }

  componentWillMount(){
    let that = this;
    let calendarInfo = this.props.dayData ? this.props.dayData : [];
    if(calendarInfo && calendarInfo.length>0){
      calendarInfo.map(function(info){
        that.setState({status: info.status});
      })
    }
  }

  // componentWillReceiveProps(newProps) {
  //   console.log('newProps', newProps)
  //   let that = this;
  //   let calendarInfo = newProps.dayData ? newProps.dayData : [];
  //   if(calendarInfo && calendarInfo.length>0){
  //     calendarInfo.map(function(info) {
  //       that.setState({status: info.status});
  //     })
  //     }
  // }



  render() {
    const {status} = this.state;
    return (
      status === 0? <div className="rbc-slot-filling-fast-status" ></div>:
        status > 1?<div className="rbc-slot-full-status" ></div>:
                <div></div>
    )
  }
}



