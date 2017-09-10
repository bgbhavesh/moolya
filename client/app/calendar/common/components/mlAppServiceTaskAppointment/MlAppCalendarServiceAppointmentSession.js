// import NPM module(s)
import React, { Component } from 'react';
import  Select from 'react-select';
import FontAwesome from 'react-fontawesome';
import Datetime from "react-datetime";
import Moment from "moment";
import ScrollArea from 'react-scrollbar';

import {findTaskActionHandler} from '../../actions/fetchOngoingAppointments';

export default class MlAppCalendarServiceAppointmentSession extends Component{

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
                      <div className="swiper-slide funding_list list_block notrans" key={index}>
                        <p className="online">{activity.mode}</p>
                        <span>Duration:</span><br />
                        <div className="form-group">
                          <label><input type="text" className="form-control inline_input"
                                        value={activity.duration.hours || 0} disabled /> Hours
                            <input type="text" className="form-control inline_input"
                                   value={activity.duration.minutes || 0} disabled /> Mins
                          </label>
                        </div>
                        <h3>{activity.displayName}</h3>
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
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
          <br/>
          <div className="panel panel-default">
            <div className="panel-body">
              {this.getSessionList()}
              <form>
                <div className="col-md-6">
                  <div className="form-group">
                    <input type="text" placeholder="Date"
                           className="form-control float-label"
                           value={appointment.startDate? new Moment(appointment.startDate).format('DD-MM-YYYY') : null}
                           disabled />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <input type="text" placeholder="From time"
                           className="form-control float-label"
                           value={appointment.startDate ? new Moment(appointment.startDate).format('HH:mm') : null}
                           disabled />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="form-group">
                    <input type="text" placeholder="To time"
                           className="form-control float-label"
                           inputProps={{placeholder: "To time"}}
                           value={appointment.endDate ? new Moment(appointment.endDate).format('HH:mm') : null}
                           disabled />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </ScrollArea>
      </div>
    )
  }
};

