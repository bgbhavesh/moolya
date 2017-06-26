/**
 * Created by Mukhil on 19/6/17.
 */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {fetchServiceActionHandler} from '../actions/MlServiceActionHandler'
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
import gql from 'graphql-tag'
import {fetchTaskDetailsActionHandler} from '../../task/actions/fetchTaskDetails'
import {updateServiceActionHandler} from '../actions/MlServiceActionHandler'
import Moolyaselect from "../../../../../commons/components/select/MoolyaSelect";


export default class MlAppServiceStep2 extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      selectedTask: [],
      selectedActivity:" ",
      displayName:"", noOfSession:"", sessionFrequency:"",activities:[],hours:"", minutes:"",
      taskNames:[]
    }
    this.getTaskDetails.bind(this)
    this.getInitialData.bind(this)
    this.getTaskDetailsInitially.bind(this)
    this.optionsBySelectService.bind(this)
  }
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
  componentWillMount() {
    this.getInitialData()
  }

  async getInitialData() {
    let that = this;
    let serviceId = FlowRouter.getQueryParam('id')
    const resp = await fetchServiceActionHandler(serviceId)
    let task = resp.tasks;
    task.map(function(data) {
      that.setState({selectedTask:data},function(){
        that.getTaskDetailsInitially()
      })
    })
    console.log(resp)
  }

  optionsBySelectService(value){
    let that = this;
    that.setState({selectedTask:value},function(data) {
      that.getTaskDetails();
    })
  }



  saveDetails() {
    let task = this.state.selectedTask;
    let temp = this.state.taskNames;
    temp.push(task)
    this.setState({taskNames: temp})
    this.setState({selectedTask: temp})
    this.storeData()
    this.setState({ selectedTask:"",
      selectedActivity:" ",
      displayName:"", noOfSession:"", sessionFrequency:"",activities:[],hours:"", minutes:""})

  }

  async storeData() {
    let serviceId = FlowRouter.getQueryParam('id')
    let task = {
      tasks :this.state.taskNames
    }
    const resp = await updateServiceActionHandler(serviceId,task)
    return resp
  }

  respectiveTab(name) {
    let that = this;
    that.setState({selectedTask:name},function(data) {
      that.getTaskDetails();
    })
  }
  newTask() {
    this.setState({ selectedTask:"",
      selectedActivity:" ",
      displayName:"", noOfSession:"", sessionFrequency:"",activities:[],hours:"", minutes:""})
  }
  async getTaskDetails() {
    let tasks = this.state.selectedTask;
    if(!tasks) {
      this.setState({displayName:" ",noOfSession:" ",sessionFrequency:" ",
        hours:" ",minutes:" ",activities:" "})
    }else {
        const resp = await fetchTaskDetailsActionHandler(tasks);
        console.log(resp)
        this.setState({
          displayName: resp.displayName, noOfSession: resp.noOfSession, sessionFrequency: resp.sessionFrequency,
          hours: resp.duration.hours, minutes: resp.duration.minutes, activities: resp.session
        })
        return resp
      }
    }


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
      const resp = await fetchTaskDetailsActionHandler(tasks);
      console.log(resp)
      this.setState({
        displayName: resp.displayName, noOfSession: resp.noOfSession, sessionFrequency: resp.sessionFrequency,
        hours: resp.duration.hours, minutes: resp.duration.minutes, activities: resp.session
      })
      return resp
    }
  }



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
                <label>Duration: &nbsp; <input type="text" className="form-control inline_input" value={data.duration.hours}/> Hours <input type="text" className="form-control inline_input" value={data.duration.minutes}/> Mins </label>
              </div>
            </div>

            {/*<div className="col-md-3">*/}
              {/*<div style={{'marginTop':'-12px'}}>*/}
                {/*<input placeholder="Select Activity" value={data.activities[0]} disabled />*/}
              {/*</div>*/}
            {/*</div>*/}
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
                        <label><input type="text" className="form-control inline_input" value={data.duration.hours}/> Hours <input type="text" className="form-control inline_input" value={data.duration.minutes}/> Mins </label>
                      </div>
                      <h3>{details}</h3>
                    </div>
              )
            })}
                </div>
              </div>
            </div>
          </div>
        )
      }
    })
    // that.setState({activities:temp})
    let profileId = FlowRouter.getParam('profileId')
    let serviceQuery = gql`query($profileId:String) {
     data: fetchTasks(profileId: $profileId) {
        value: name
        label: name
      }
    }
    `;
    let serviceOption={options: { variables: {profileId:profileId}}};
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap"smoothScrolling={true} default={true} >
          <br/>
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
                    <div className="col-md-6 nopadding-left">
                      <form>
                        <div className="form-group">
                          {/*<select className="form-control"><option>Select task</option></select>*/}
                          <Moolyaselect multiSelect={false} placeholder="Select Tasks" className="form-control float-label" valueKey={'value'} labelKey={'label'} selectedValue={this.state.selectedTask} queryType={"graphql"} query={serviceQuery} reExecuteQuery={true} queryOptions={serviceOption} isDynamic={true} onSelect={this.optionsBySelectService.bind(this)} />
                        </div>
                        <div className="form-group">
                          <label>Total number of Sessions Rs. <input className="form-control inline_input"  value={noOfSession}  /> </label>
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
                          <input className="form-control" value={sessionFrequency}></input>
                        </div>
                        <div className="form-group switch_wrap inline_switch">
                          <label>Status</label>
                          <label className="switch">
                            <input type="checkbox" />
                            <div className="slider"></div>
                          </label>
                        </div>
                      </form>
                    </div>
                    <br className="brclear"/>
                      {sessionsList}
                      {/*<div className="panel-body">*/}
                        {/*<div className="swiper-container manage_tasks">*/}
                          {/*<div className="swiper-wrapper">*/}

                            {/*<div className="swiper-slide funding_list list_block notrans">*/}
                              {/*<p className="online">Online</p>*/}
                              {/*<span>Duration: <FontAwesome name='pencil'/></span><br />*/}
                              {/*<div className="form-group">*/}
                                {/*<label><input type="text" className="form-control inline_input"/> Hours <input type="text" className="form-control inline_input"/> Mins </label>*/}
                              {/*</div>*/}
                              {/*<h3>Activity name 1</h3>*/}
                            {/*</div>*/}
                            {/*<div className="swiper-slide funding_list list_block notrans">*/}
                              {/*<p className="online">Online</p>*/}
                              {/*<span>Duration: <FontAwesome name='pencil'/></span><br />*/}
                              {/*<div className="form-group">*/}
                                {/*<label><input type="text" className="form-control inline_input"/> Hours <input type="text" className="form-control inline_input"/> Mins </label>*/}
                              {/*</div>*/}
                              {/*<h3>Activity name 1</h3>*/}
                            {/*</div>*/}
                            {/*<div className="swiper-slide funding_list list_block notrans">*/}
                              {/*<p className="online">Online</p>*/}
                              {/*<span>Duration: <FontAwesome name='pencil'/></span><br />*/}
                              {/*<div className="form-group">*/}
                                {/*<label><input type="text" className="form-control inline_input"/> Hours <input type="text" className="form-control inline_input"/> Mins </label>*/}
                              {/*</div>*/}
                              {/*<h3>Activity name 1</h3>*/}
                            {/*</div>*/}
                            {/*<div className="swiper-slide funding_list list_block notrans">*/}
                              {/*<p className="offline">Offline</p>*/}
                              {/*<span>Duration: <FontAwesome name='pencil'/></span><br />*/}
                              {/*<div className="form-group">*/}
                                {/*<label><input type="text" className="form-control inline_input"/> Hours <input type="text" className="form-control inline_input"/> Mins </label>*/}
                              {/*</div>*/}
                              {/*<h3>Activity name 1</h3>*/}
                            {/*</div>*/}
                            {/*<div className="swiper-slide funding_list list_block notrans">*/}
                              {/*<p className="online">Online</p>*/}
                              {/*<span>Duration: <FontAwesome name='pencil'/></span><br />*/}
                              {/*<div className="form-group">*/}
                                {/*<label><input type="text" className="form-control inline_input"/> Hours <input type="text" className="form-control inline_input"/> Mins </label>*/}
                              {/*</div>*/}
                              {/*<h3>Activity name 1</h3>*/}
                            {/*</div>*/}
                          {/*</div>*/}
                        {/*</div>*/}
                      {/*</div>*/}

                    <div className="ml_icon_btn">
                      <div className="save_btn" onClick={that.saveDetails.bind(that)}><span className="ml ml-save"></span></div>
                      <a href="#" className="cancel_btn"><span className="ml ml-delete"></span></a>
                    </div>
                  </div>
                  <div className="tab-pane" id="2a">
                    2
                  </div>
                </div>

              </div>
            </div>
        </ScrollArea>
      </div>
    )
  }
};
