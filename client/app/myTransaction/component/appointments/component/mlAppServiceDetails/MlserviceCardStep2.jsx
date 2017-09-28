/**
 * Created by Mukhil on 19/6/17.
 */
import React from 'react';
// import {fetchServiceActionHandler} from '../actions/mlFindService'
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
import { getTaskFromService, fetchTaskDetails } from '../../action/mlFindService';


export default class MlAppServiceStep2 extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let mySwiper = new Swiper('.manage_tasks', {
      speed: 400,
      spaceBetween: 20,
      slidesPerView: 'auto',
      pagination: '.swiper-pagination',
      paginationClickable: true
    });
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight - (220 + $('.app_header').outerHeight(true)));
    this.props.optionsBySelectService(this.props.data.serviceTask.selectedTaskId || this.props.data.serviceTask.tasks[0].id);
  }

  /**
   * Method :: getTabs
   * Desc :: Get the tab for task
   * @return XML
   */

  getTabs() {
    const { serviceTask } = this.props.data;
    const { optionsBySelectService } = this.props;
    console.log('-----serviceTask--', serviceTask.tasks);
    if (serviceTask.tasks && serviceTask.tasks.length && !serviceTask.selectedTaskId) {
      serviceTask.selectedTaskId = serviceTask.tasks[0].id
    }
    const tabs = serviceTask.tasks ? serviceTask.tasks.map((tab, index) => {
      return (
        <li className={serviceTask.selectedTaskId === tab.id ? 'active' : ''} key={index}>
          <a href="#newTask" data-toggle="tab"
            onClick={() => optionsBySelectService(tab.id)}>
            {tab.displayName}
          </a>
        </li>
      )
    }) : [];
    return tabs;
  }

  /**
   * Method :: getSessionList
   * Desc :: List of task session
   * @return XML
   */

  getSessionList() {
    let { session } = this.props.data.serviceTask.selectedTaskDetails;
    // const { updateSessionSequence } = this.props;
    const sessionsList = session ? session.map((data, index) => {
      if (data) {
        return (
          <div className="panel panel-info" key={index}>
            <div className="panel-heading">
              <div className="col-md-2 nopadding-left">Session {index + 1}</div>
              <div className="col-md-4">
                <div style={{ 'marginTop': '-4px' }}>
                  <label>Duration: &nbsp;
                    <input type="text"
                      className="form-control inline_input"
                      value={data.duration.hours || 0} disabled /> Hours
                    <input type="text"
                      className="form-control inline_input"
                      value={data.duration.minutes || 0} disabled /> Mins
                  </label>
                </div>
              </div>
              <div className="col-md-offset-2 col-md-3">
                <div style={{ 'marginTop': '-4px' }}>
                  <label>
                    Sequence: &nbsp;
                    <input className="form-control inline_input"
                      type="number"
                      min="0"
                      value={data.sequence} disabled />
                  </label>
                </div>
              </div>
              &nbsp;
            </div>
            <div className="panel-body">
              <div className="swiper-container manage_tasks">
                <div className="swiper-wrapper">
                  {data.activities && data.activities.map((activity, index) => {
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
  render() {
    const {
      optionsBySelectService,
      respectiveTab,
      serviceTask } = this.props.data;
    const tasks = serviceTask.selectedTaskDetails || {};
    const {
      profileId,
      serviceId } = this.props;
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true} ><br />
          <div className="panel panel-default new_profile_tabs">
            <div className="panel-heading">
              View the tasks to the created services
            </div>
            <div className="panel-body">
              <div className="ml_tabs ml_tabs_large">
                <ul className="nav nav-pills">
                  {this.getTabs()}
                </ul>
              </div>
              <div className="tab-content clearfix">
                <div className="tab-pane active" id="newTask">
                  <div className="col-md-6 nopadding-left">
                    <form>
                      <div className="form-group">
                        <input type="text"
                          className="form-control float-label"
                          value={tasks.name} disabled />
                      </div>
                      <div className="form-group">
                        <label>Total number of Sessions Rs.
                          <input className="form-control inline_input"
                            value={tasks.noOfSession} disabled />
                        </label>
                      </div>
                      <div className="form-group">
                        <label>Duration: &nbsp;
                          <input type="text"
                            className="form-control inline_input"
                            value={tasks.duration.hours} disabled /> Hours
                          <input type="text"
                            className="form-control inline_input"
                            value={tasks.duration.hours} disabled /> Mins </label>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-6 nopadding-right">
                    <form>
                      <div className="form-group">
                        <input type="text"
                          className="form-control"
                          placeholder="Display Name"
                          value={tasks.displayName} disabled />
                      </div>
                      <div className="form-group">
                        <span className="placeHolder active">Frequency</span>
                        <input className="form-control" value={tasks.sessionFrequency} disabled />
                      </div>
                      <div className="form-group">
                        <label>Sequence
                          <input className="form-control inline_input"
                            type="number" min="0"
                            value={tasks.sequence} disabled />
                        </label>
                      </div>
                    </form>
                  </div><br className="brclear" />
                  {this.getSessionList()}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    )
  }
};
