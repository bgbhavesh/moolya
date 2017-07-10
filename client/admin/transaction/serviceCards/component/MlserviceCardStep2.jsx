/**
 * Created by Mukhil on 19/6/17.
 */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
// import {fetchServiceActionHandler} from '../actions/mlFindService'
var FontAwesome = require('react-fontawesome');
import ScrollArea from 'react-scrollbar';
import {getTaskFromService, fetchTaskDetails} from '../actions/mlFindService'


export default class MlAppServiceStep2 extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: "",
      selectedTask: [],
      selectedActivity:" ",
      displayName:"",
      noOfSession:"",
      sessionFrequency:"",
      activities:[],
      hours:"",
      minutes:"",
      taskNames: [],
      taskData: []
    }
  }
  componentDidMount() {
    let mySwiper = new Swiper('.manage_tasks', {
      speed: 400,
      spaceBetween:20,
      slidesPerView:'auto',
      pagination: '.swiper-pagination',
      paginationClickable: true
    });
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight-(220+$('.app_header').outerHeight(true)));
  }
  componentWillMount() {
    this.getInitialData()
  }

  async getInitialData() {
    let serviceId = this.props.data._id;
    const resp = await getTaskFromService(serviceId);
    if(resp) {
      let taskNames = resp.tasks.map(function (task) {
        return task.id;
      });
      this.setState({
        taskNames: taskNames
      });
    }
  }

  respectiveTab(name) {
    let that = this;
    that.setState({
      selectedTask:name,
      selectedTab:name
    },function() {
      that.getTaskDetails();
    });
  }

  async getTaskDetails() {
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

  // updateSessionSequence(evt, sessionId) {
  //   const that = this;
  //   let taskId = that.state.selectedTask;
  //   let taskData = that.state.taskData;
  //   let taskIndex = taskData.findIndex(function (task) {
  //     return task.id == taskId;
  //   });
  //   if(taskIndex != -1){
  //     let sessionIndex = taskData[taskIndex].sessions.findIndex(function (session) {
  //       return session.id == sessionId;
  //     });
  //     if( sessionIndex != -1 ) {
  //       taskData[taskIndex].sessions[sessionIndex].sequence = evt.target.value ;
  //     } else {
  //       taskData[taskIndex].sessions.push({
  //         id : sessionId,
  //         sequence: evt.target.value
  //       });
  //     }
  //   } else {
  //     let task = {
  //       id: taskId,
  //       sessions : [
  //         {
  //           id : sessionId,
  //           sequence: evt.target.value
  //         }
  //       ]
  //     };
  //     taskData.push(task);
  //   }
  //   console.log(taskData);
  //   that.setState({
  //     taskData: taskData
  //   });
  // };

  render() {
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
    });

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
        });
        return(
          <div className="panel panel-info" key={index}>
            <div className="panel-heading">
              <div className="col-md-2 nopadding-left">Session {index+1}</div>
              <div className="col-md-4">
                <div  style={{'marginTop':'-4px'}}>
                  <label>Duration: &nbsp; <input type="text" className="form-control inline_input" value={data.duration.hours}/> Hours <input type="text" className="form-control inline_input" value={data.duration.minutes}/> Mins </label>
                </div>
              </div>
              <div className="col-md-offset-2 col-md-3">
                <div  style={{'marginTop':'-4px'}}>
                  <label>
                    Sequence: &nbsp;
                    <input className="form-control inline_input" type="number" disabled />
                  </label>
                </div>
              </div>
              &nbsp;
            </div>
            <div className="panel-body">
              <div className="swiper-container manage_tasks">
                <div className="swiper-wrapper">
                  { tempActivity.map(function(details, index) {
                    return (
                      <div className="swiper-slide funding_list list_block notrans" key={index}>
                        <p className="online">Online</p>
                        <span>Duration: <FontAwesome name='pencil'/></span><br />
                        <div className="form-group">
                          <label><input type="text" className="form-control inline_input" value={data.duration.hours}/> Hours <input type="text" className="form-control inline_input" value={data.duration.minutes}/> Mins </label>
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
    // that.setState({activities:temp})
    let profileId = FlowRouter.getParam('profileId')
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
                  {tabs}
                </ul>
              </div>
              <div className="tab-content clearfix">
                <div className="tab-pane active" id="newTask">
                  <div className="col-md-6 nopadding-left">
                    <form>
                      <div className="form-group"><input type="text" className="form-control float-label" value={this.state.selectedTask} disabled />
                      </div>
                      <div className="form-group"><label>Total number of Sessions Rs. <input className="form-control inline_input"  value={noOfSession}  /> </label>
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
                      <div className="form-group"><span className="placeHolder active">Frequency</span><input className="form-control" value={sessionFrequency}></input>
                      </div>
                      <div className="form-group">
                        <label>Sequence<input className="form-control inline_input" type="number" min="0"/></label>
                      </div>
                    </form>
                  </div><br className="brclear"/>
                  {sessionsList}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    )
  }
};