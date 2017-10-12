// import NPM module(s)
import React, { Component } from 'react';
import  Select from 'react-select';
import FontAwesome from 'react-fontawesome';
import Datetime from "react-datetime";
import Moment from "moment";
import ScrollArea from 'react-scrollbar';
import {initalizeFloatLabel} from "../../../../../commons/utils/formElemUtil";

import {findTaskActionHandler} from '../../actions/fetchOngoingAppointments';

export default class MlAppOngoingMyAppointmentSession extends Component{

  constructor(props) {
    super(props);
    this.state = {
      task: {}
    };
    this.getTask = this.getTask.bind(this);
  }

  componentWillMount() {
    this.getTask();
  }

  componentDidMount() {
    initalizeFloatLabel();
    let mySwiper = new Swiper('.manage_tasks', {
      speed: 400,
      spaceBetween:20,
      slidesPerView:'auto',
      pagination: '.swiper-pagination',
      paginationClickable: true
    });
    //$('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(310+$('.app_header').outerHeight(true)));
  }

  /**
   * Method :: getTask
   * Desc :: get the task for appointment
   */
  async getTask() {
    if (this.props.service.tasks) {
      let resp = await findTaskActionHandler(this.props.service.tasks.id);
      this.setState({
        task: resp || {}
      });
    }
  }


  /**
   * Method :: getSessionList
   * Desc :: List of task session
   * @return XML
   */

  getSessionList() {
    let session = this.state.task.session;
    const sessionsList = session ? session.map((data, index) => {
      if(data && data.sessionId === this.props.appointment.sessionId) {
        return(
          <div className="panel panel-info" key={index}>
            <div className="panel-heading" style={{'paddingBottom': '30px'}}>
              <div className="col-md-2 nopadding-left">Session {index+1}</div>
              <div className="col-md-4">
                <div  style={{'marginTop':'-4px'}}>
                  <label>Duration: &nbsp;
                    <input type="text"
                           className="form-control inline_input"
                           value={data.duration.hours || 0}/> Hours
                    <input type="text"
                           className="form-control inline_input"
                           value={data.duration.minutes || 0}/> Mins
                  </label>
                </div>
              </div>
            </div>
            <div className="panel-body">
              <div className="swiper-container manage_tasks">
                <div className="swiper-wrapper">
                  { data.activities && data.activities.map((activity, index) => {
                    return (
                      <div className="card_block swiper-slide" key={index}>
                        <div className="">
                          <h3>{' '}</h3>
                          <div className="clearfix"></div>
                          <div className="list_icon mart0">
                            <div className="clearfix"></div>
                            <i className="c_image ml my-ml-Ideator"></i>
                            <div className="clearfix"></div>
                            <span className="price"><div className="form-group">
                      <label>
                      <span key={activity.duration ? 'notLoadedYetHrs' : 'loadedHrs'} disabled="true"
                            className="inline_input">{(activity.duration && activity.duration.hours) ? activity.duration.hours : 0}</span> Hours
                    <span key={activity.duration ? 'notLoadedYetMin' : 'loadedMin'} disabled="true"
                          className="inline_input"> {(activity.duration && activity.duration.minutes) ? activity.duration.minutes : 0}</span> Mins
                    </label>
                    </div></span>
                            <button className="btn btn-danger pull-right">{activity.mode}</button>
                          </div>
                          <div className="block_footer">
                            <span> {activity.displayName} </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )
      }
    }) : [];
    return sessionsList;
  }
  /**
   * Method :: React render
   * Desc :: Showing html page
   * @returns {XML}
   */
  render() {
    let that = this;
    let appointment = this.props.appointment;
    let data = this.props.slotInfo || {};

    let appointmentType = data.appointmentType === "SERVICE-TASK" ? "External" : "Internal";
    data.attendeeDetails = data.attendeeDetails ? data.attendeeDetails : [];
    let user = data.attendeeDetails.find((attendee) => {
      if(data.appointmentType === "SERVICE-TASK"){
        return attendee.isClient
      } else {
        return attendee.isProvider
      }
    });
    user = user ? user : {};
    console.log('slotInfo', this.props.slotInfo);
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
          <br/>
          <div className="panel panel-default">
            <div className="panel-body">
              {this.getSessionList()}
            </div>
          </div>

          <div className="row">
            <div className="panel panel-default cal_view_task pending">
              <div className="panel-body">
                <div className="col-md-12 nopadding">
                  <div className="col-md-3 nopadding text-center">
                    <img src={user.profileImage?user.profileImage:'/images/img2.png'} className="image" />
                    <div className="">
                      <span>{`${user.firstName} ${user.lastName}`}</span>
                    </div>
                  </div>
                  <div className="col-md-9">
                    <br />
                    <div className="form-group">
                      <input className="form-control float-label" type="text" placeholder="Start Date Time" defaultValue={ data.startDate ?  new Moment(data.startDate).format('MM-DD-YYYY HH:mm:ss') : '' } id="" disabled/>
                    </div>
                    <div className="form-group">
                      <input type="text" placeholder="End Date Time" defaultValue={ data.endDate ?  new Moment(data.endDate).format('MM-DD-YYYY HH:mm:ss') : '' } className="form-control float-label" id="" disabled/>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 naopadding att_members" >
                  <ul className="users_list">
                    {data.attendeeDetails?data.attendeeDetails.map(function(info){
                      if( data.appointmentType === "SERVICE-TASK" && info.isClient ) {
                        return;
                      } else if (data.appointmentType !== "SERVICE-TASK" && info.isProvider) {
                        return;
                      }
                      return(
                        <li>
                          <a href="">
                            {info.status === 'Accepted' ? <FontAwesome name='circle' style={{'position': 'absolute', 'color': 'yellowgreen'}}/> : info.status === 'Pending' ? <FontAwesome name='circle' style={{'position': 'absolute', 'color': 'yellow'}}/> :
                              info.status === 'Rejected' ? <FontAwesome name='circle' style={{'position': 'absolute', 'color': 'red'}}/> : <FontAwesome name='circle' style={{'position': 'absolute', }}/>}
                            <img src={info.profileImage? info.profileImage : "/images/img2.png"}/><br />
                            <div className="tooltiprefer">
                              <span>{`${info.firstName} ${info.lastName}`}</span>
                            </div>
                          </a>
                        </li>
                      )
                    }):<div></div>}
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </ScrollArea>
      </div>
    )
  }
};

