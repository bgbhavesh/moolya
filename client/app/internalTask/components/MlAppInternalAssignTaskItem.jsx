/**
 * Created by pankaj on 18/8/17.
 */
import React from 'react';
import Datetime from "react-datetime";
var FontAwesome = require('react-fontawesome');
import {fetchInternalTaskInfo} from '../actions/fetchInternalTaskInfo';
import {updateInternalTaskInfo} from '../actions/updateInternalTask';
import moment from "moment";

export default class MlAppInternalAssignTaskItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      taskInfo: {
        docs:[],
        userInfo:[],
        community:{},
        expectedInput:'',
        note:'',
        expectedOutput:'',
        name:''
      },
      taskId: props.taskId ? props.taskId : ''
    };
    console.log('Props:',props)
  }

  componentDidMount(){
    this.fetchTaskInfo();
    setTimeout(function () {
      $('.float-label').jvFloat();
    },200);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps , this.state.taskId);
    if(this.state.taskId !== nextProps.taskId){
      console.log('Test');
      this.setState({
        taskId: nextProps.taskId
      }, function () {
        this.fetchTaskInfo();
      }.bind(this));

    }
  }

  async fetchTaskInfo() {
    console.log(this.props.taskId, this.state.taskId);
    if(this.state.taskId){
      let response = await fetchInternalTaskInfo(this.state.taskId);
      console.log(response);
      if(response){
        response.attendees = response.attendees ? response.attendees : [];
        response.docs = response.docs ? response.docs : [];
        this.setState({
          taskInfo:response
        }, function () {
          $('.float-label').jvFloat();
        })
      };
    }
  }

  async updateStatus(status){
    let taskId = this.state.taskId;
    let dataToUpdata = {
      status: status
    };
    let response = await updateInternalTaskInfo(taskId, dataToUpdata);
    if(response.success){
      toastr.success('Task Updated Successfully');
      this.props.fetchTaskList();
    }
  }

  render(){
    let task = this.state.taskInfo;
    task.docs = task.docs ? task.docs : [];
    const that = this;
    const renderActions = function () {
      if( task.status == 'pending') {
        return <div className="form-group ml_btn">
          <a href="" onClick={()=>that.updateStatus('accepted')} className="cancel_btn">Accept</a>
          <a href="" onClick={()=>that.updateStatus('rejected')} className="save_btn">Reject</a>
        </div>
      } else if ( task.status == 'accepted' ) {
        return <div className="form-group ml_btn">
          <a href="" onClick={()=>that.updateStatus('started')} className="cancel_btn">Start</a>
        </div>
      } else if (  task.status == 'started' ) {
        return <div className="form-group ml_btn">
          <a href="" onClick={()=>that.updateStatus('completed')} className="cancel_btn">Complete</a>
        </div>
      }
    };
    return(
      <div className="">
        <div className="col-md-6 nopadding-left">
          <div className="form_bg">
            <form>
              <div className="form-group">
                <input className="form-control float-label" placeholder="Task Name" value={task.name ? task.name : ''} />
              </div>

              <div className="form-group">
                <Datetime dateFormat="DD-MM-YYYY"
                          timeFormat={false}
                          inputProps={{placeholder: "Due Date", className:"form-control float-label"}}
                          closeOnSelect={true}
                          value={ task.dueDate ? moment(task.dueDate) : '' }
                          onChange={(date)=> this.dueDate(date)}/>
              </div>
              <div className="form-group">
                <textarea className="form-control float-label" placeholder="Expected Input" value={task.expectedInput ? task.expectedInput :''} ></textarea>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6 nopadding-right">
          <div className="form_bg">
            <form>
              <div className="form-group">
                <div className="input_types">
                  <label>Set Priority : </label>
                </div>
                <div className="input_types">
                  <input id="radio1" type="radio" checked={ task.priority == "low" } name="radio" value="low" /><label htmlFor="radio1"><span><span></span></span>Low</label>
                </div>
                <div className="input_types">
                  <input id="radio2" type="radio" checked={ task.priority == "medium" } name="radio" value="medium" /><label htmlFor="radio2"><span><span></span></span>Medium</label>
                </div>
                <div className="input_types">
                  <input id="radio3" type="radio" checked={ task.priority == "high" } name="radio" value="high" /><label htmlFor="radio3"><span><span></span></span>High</label>
                </div>
              </div>
              <br className="brclear" />
              <div className="form-group">
                <textarea className="form-control float-label" placeholder="Notes" value={task.note ? task.note : ''} ></textarea>
              </div>
              <div className="form-group">
                <textarea className="form-control float-label" placeholder="Expected Output" value={task.expectedOutput ? task.expectedOutput : '' } ></textarea>
              </div>

              <div className="panel panel-default">
                <div className="panel-heading"> Attendees </div>
                <div className="panel-body">
                  <ul className="users_list well well-sm">
                    {task.userInfo && task.userInfo.map(function(user, index){
                      return(
                        <li key={index}>
                          <a href="#">
                            <span></span>
                            <img src={ user.profileUrl ? user.profileUrl : "/images/def_profile.png"} /><br />
                            <div className="tooltiprefer">
                              <span>{user.name}</span>
                            </div>
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </form>
            {renderActions()}
          </div>
        </div>
      </div>


    )
  }

}
