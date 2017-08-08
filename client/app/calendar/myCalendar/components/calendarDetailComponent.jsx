import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import InlineCalender from './inlineCalendar';
import CalenderHead from './calendarHead';
import CalCreateAppointment from './calSettings'
import CalCreateTask from './calCreateTask'
import { fetchSessionDayActionHandler, bookUserServiceCardAppointmentActionHandler } from '../../../../app/calendar/myCalendar/actions/fetchMyCalendar';

export default class AppCalendarDayView extends React.Component{


  constructor(props){
  super(props)
  this.state={
    showCreateComponent: false
  }
  this.showCreateComponent=this.showCreateComponent.bind(this)
}


  componentDidMount()
  {
    var WinWidth = $(window).width();
    if(WinWidth > 768){
      $(".app_main_wrap").mCustomScrollbar({theme:"minimal-dark"});
    }
  }

  showCreateComponent(type){
    this.props.componentToLoad(type)
  }

  render(){
    return (
      <div className="app_main_wrap">
        <div className="app_padding_wrap">
        <InlineCalender/>
          <div className="col-md-12">
            <ul className="cal_tabs act_tab">
              <li className="col-md-4 nopadding-left">
                <span><img src="/images/mor_icon.png"/> Morning</span>
              </li>
              <li className="col-md-4 nopadding">
                <span className="act_tab"><img src="/images/aft_icon.png"/> Afternoon</span>
              </li>
              <li className="col-md-4 nopadding-right">
                <span><img src="/images/eve_icon.png"/> Evening</span>
              </li>
            </ul>
            <br className="brclear"/>
            <div className="row day_tab_content">
              <div className="col-md-3">
                <div className="day_app_list">
                  <div className="app_list_head">
                    12:00 - 01:00 <span className="pull-right"><a href=""><FontAwesome name='plus' onClick={this.showCreateComponent.bind(this, 'createTask')}/></a><a href=""><FontAwesome name='ellipsis-h' onClick={this.showCreateComponent.bind(this, 'viewTask')}/></a></span>
                  </div>
                  <ul className="list-group">
                    <li className="list-group-item"><span className="task_with"><span className="ml ml-funder"></span></span>Task name here<span className="task_status act_task"><FontAwesome name='check'/></span></li>
                    <li className="list-group-item"><span className="task_with"><span className="ml ml-funder"></span></span>Task name here<span className="task_status act_task"><FontAwesome name='check'/></span></li>
                    <li className="list-group-item"><span className="task_with"><span className="ml ml-funder"></span></span>Task name here<span className="task_status can_task"><FontAwesome name='times'/></span></li>
                    <li className="list-group-item"><span className="task_with"><span className="ml ml-funder"></span></span>Task name here<span className="task_status res_task"><FontAwesome name='refresh'/></span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

