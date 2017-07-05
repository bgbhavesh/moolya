/** ************************************************************
 * Date: 19 Jun, 2017
 * Programmer: Mukhil <mukhil.padnamanabhan@raksan.in>
 * Description : This is the list view
 * JavaScript XML file MlserviceCardsList.jsx
 * *************************************************************** */

/**
 * Imports libs and components
 */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
import {fetchTaskDetails, getTaskFromService} from '../actions/mlFindService'
import Moolyaselect from "../../../../commons/components/select/MoolyaSelect";


export default class MlServiceStep2 extends React.Component{

  /**
   * Constructor
   * @param props :: Object - Parents data
   */

  constructor(props) {
    super(props)
    this.state = {
      selectedTask: [],
      selectedActivity:" ",
      displayName:"", noOfSession:"", sessionFrequency:"",activities:[],hours:"", minutes:"",
      taskNames:[]
    }

    this.getInitialData.bind(this)
    this.getTaskDetailsInitially.bind(this)
  }

  /**
   * ComponentDidMount
   * Desc :: Initializing the float labels and task manager component is configured
   */

  componentDidMount()
  {
    var mySwiper = new Swiper('.manage_tasks', {
      speed: 400,
      spaceBetween:20,
      slidesPerView:'auto',
      pagination: '.swiper-pagination',
      paginationClickable: true
    });
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(290+$('.admin_header').outerHeight(true)));
  }

  /**
   * componentWillMount
   * Desc :: Calls the function getInitialData which would get the initial details
   */

  componentWillMount() {
    this.getInitialData()
  }

  /**
   * Method :: getInitialData
   * Desc   :: Based on the the serviceId all the tasks are obtained in an array
   *           which is further mapped through and each of the tasks are kept in a state
   *           which would further call a function getTaskDetailsInitially()
   * @returns :: void
   */

  async getInitialData() {
    let that = this;
    let serviceId = this.props.data._id
    const resp = await getTaskFromService(serviceId)
    let task = resp.tasks;
    task.map(function(data) {
      that.setState({selectedTask:data},function(){
        that.getTaskDetailsInitially()
      })
    })
  }

  /**
   * Method :: respectiveTab
   * Desc   :: getTaskDetails is called
   * @returns :: void
   */

  respectiveTab(name) {
    let that = this;
    that.setState({selectedTask:name},function(data) {
      that.getTaskDetails();
    })
  }

  /**
   * Method :: newTask
   * Desc   :: getTaskDetails is called
   * @returns :: void
   */

  newTask() {
    this.setState({ selectedTask:"",
      selectedActivity:" ",
      displayName:"", noOfSession:"", sessionFrequency:"",activities:[],hours:"", minutes:""})
  }

  /**
   * Method :: getTaskDetailsInitially
   * Desc   :: This is used to get the datas when the component is mounted for the first time
   * @returns :: resp - type :: Array
   */

  async getTaskDetailsInitially() {
    let task = this.state.selectedTask;
    let temp = this.state.taskNames;
    temp.push(task)
    this.setState({taskNames: temp})
    let tasks = this.state.selectedTask;
    if(!tasks) {
      this.setState({displayName:" ",noOfSession:" ",sessionFrequency:" ",
        hours:" ",minutes:" ",activities:" "})
    }else {
      const resp = await fetchTaskDetails(tasks);
      console.log(resp)
      this.setState({
        displayName: resp.displayName, noOfSession: resp.noOfSession, sessionFrequency: resp.sessionFrequency,
        hours: resp.duration.hours, minutes: resp.duration.minutes, activities: resp.session
      })
      return resp
    }
  }

  /**
   * Render
   * Desc   :: Render the HTML for this component
   * @returns {HTML}
   */

  render(){
    let that = this;
    const {displayName, noOfSession, sessionFrequency, hours, minutes, activities,taskNames} = that.state;
    const sessions = activities || []
    let temp = [{}];
    const taskTabs = taskNames || []
    let toggleTabs = []
    const tabs = taskTabs.map(function(tab, index){
      return (
        <li >
          <a href="" data-toggle="tab" onClick={that.respectiveTab.bind(that, tab)}><FontAwesome name='minus-square'/> {tab}</a>
        </li>
      )
    })
    const sessionsList = sessions.map(function(data,index) {
      if(data) {
        temp.push({
          duration :{
            hours:data.duration.hours?data.duration.hours:0,
            minutes:data.duration.minutes?data.duration.minutes:0
          },
          activities: data.activities[0]?data.activities[0]:"activity"
        })
        let tempActivity = []
        let activitiesArray = data.activities;
        let activity = activitiesArray.map(function(data) {
          tempActivity.push(data)
        })
        return(
          <div className="panel panel-info">
            <div className="panel-heading">
              <div className="col-md-2 nopadding-left">Session {index+1}</div>
              <div className="col-md-4">
                <div  style={{'marginTop':'-4px'}}>
                  <label>Duration: &nbsp; <input type="text" className="form-control inline_input" value={data.duration.hours} disabled/> Hours <input type="text" className="form-control inline_input" value={data.duration.minutes} disabled/> Mins </label>
                </div>
              </div>
              <div className="col-md-3"></div>
              &nbsp;
            </div>
            <div className="panel-body">
              <div className="swiper-container manage_tasks">
                <div className="swiper-wrapper">
                  {tempActivity.map(function(details){
                    return (
                      <div className="swiper-slide funding_list list_block notrans">
                        <p className="online">Online</p>
                        <span>Duration: <FontAwesome name='pencil'/></span><br />
                        <div className="form-group">
                          <label><input type="text" className="form-control inline_input" value={data.duration.hours} disabled/> Hours <input type="text" className="form-control inline_input" value={data.duration.minutes} disabled/> Mins </label>
                        </div>
                        <h3>{details}</h3>
                      </div>
                    )})}
                </div>
              </div>
            </div>
          </div>
        )
      }
    })
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} ><br/>
          <div className="panel panel-default new_profile_tabs">
            <div className="panel-heading">
              Add the tasks to the services created
            </div>
            <div className="panel-body">
              <div className="ml_tabs ml_tabs_large">
                <ul  className="nav nav-pills">
                  <li className="active">
                    <a href="#newTask" data-toggle="tab" className="add-contact" onClick={that.newTask.bind(that)}><FontAwesome name='plus-square'/> Add new task</a>
                  </li>
                  {tabs}
                </ul>
              </div>
              <div className="tab-content clearfix">
                <div className="tab-pane active" id="newTask">
                  <div className="col-md-6 nopadding-left">s
                    <form>
                      <div className="form-group">
                        <input  type="text" className="form-control" value={that.state.selectedTask} disabled/>
                      </div>
                      <div className="form-group">
                        <label>Total number of Sessions Rs. <input className="form-control inline_input"  value={noOfSession} disabled  /> </label>
                      </div>
                      <div className="form-group">
                        <label>Duration: &nbsp; <input type="text" className="form-control inline_input"  value={hours} disabled /> Hours <input type="text" className="form-control inline_input" value={minutes} disabled /> Mins </label>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-6 nopadding-right">
                    <form>
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Display Name" value={displayName}/>
                      </div>
                      <div className="form-group">
                        <span className="placeHolder active">Frequency</span>
                        <input className="form-control" value={sessionFrequency} disabled></input>
                      </div>
                      <div className="form-group switch_wrap inline_switch">
                        <label>Status
                        </label>
                        <label className="switch">
                          <input type="checkbox" disabled />
                          <div className="slider">
                          </div>
                        </label>
                       </div>
                    </form>
                  </div>
                  <br className="brclear"/>
                  {sessionsList}
                </div>
                <div className="tab-pane" id="2a">
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    )
  }
};
