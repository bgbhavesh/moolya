// import NPM module(s)
import React, { Component } from 'react';
import ScrollArea from 'react-scrollbar';

export default class MlAppCalendarTaskAppointmentSession extends Component{

  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      selectedSessionId: '',
      isExternal: props.task.isExternal || false,
      isInternal: props.task.isInternal || false
    };
  }

  componentDidMount() {
    // $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(290+$('.app_header').outerHeight(true)));
  }

  /**
   * Method :: getSessionList
   * Desc :: List of task session
   * @return XML
   */

  getSessionList() {
    let session = this.props.task.session;
    const sessionsList = session ? session.map((data, index) => {
      if(data && data.sessionId === this.props.appointment.sessionId) {
        return(
          <div onClick={() => this.setSession(index, data.sessionId, data.duration)} className="panel panel-info" key={index}>
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
              {/*<div className="col-md-4 col-lg-4 pull-right">
                <div  style={{'marginTop':'-4px'}}>
                  <div className="input_types">
                    <input id="slottime" type="checkbox" slottime="clone" value="1"
                           checked />
                    <label htmlFor="slottime"><span><span></span></span></label>
                  </div>
                  <label style={{'marginTop':'5px'}} htmlFor="fancy-checkbox-default">
                    22nd May 2017 11:16:30
                  </label>
                </div>
              </div>*/}
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
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
          <br/>
            <div className="panel panel-default">
              <div className="panel-body">
                {this.getSessionList()}
              </div>
            </div>
        </ScrollArea>
      </div>
    )
  }
};
