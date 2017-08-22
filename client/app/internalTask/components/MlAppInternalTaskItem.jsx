/**
 * Created by pankaj on 21/6/17.
 */
import React from 'react';
var FontAwesome = require('react-fontawesome');
import {fetchInternalTaskInfo} from '../actions/fetchInternalTaskInfo';
import {updateInternalTaskInfo} from '../actions/updateInternalTask';
import moment from "moment";

export default class MlAppInternalTaskItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      taskInfo: {
        docs:[],
        userInfo:[],
        community:{}
      },
      taskId: props.taskId
    }
  }

  componentWillReceiveProps(newProps){
    if(this.state.taskId != newProps.taskId){
      this.setState({
        taskId: newProps.taskId
      }, function () {
        this.fetchTaskInfo();
      }.bind(this));

    }
  }

  async fetchTaskInfo() {
    if(this.props.taskId){
      let response = await fetchInternalTaskInfo(this.props.taskId);
      console.log(response);
      if(response){
        response.attendees = response.attendees ? response.attendees : [];
        response.docs = response.docs ? response.docs : [];
        this.setState({
          taskInfo:response
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
      <div id="details-div">
        <div>
          <div className="row">
            <div className="investement-view-content">
              <div className="col-md-6">
                <div className="form_bg">
                  <form>
                    <div className="panel panel-default">
                      <div className="panel-heading"> Task: {task.name} </div>
                      <div className="panel-body">
                        Stage: {task.stage}
                      </div>
                    </div>
                    <div className="panel panel-default mart20">
                      <div className="panel-heading"> Attached Documents </div>
                      <div className="panel-body">
                        <div className="swiper-container conversation-slider blocks_in_form">
                          <div className="swiper-wrapper">
                            {task.docs.map(function(doc){
                              <div className="swiper-slide"><FontAwesome name='eye'/><FontAwesome name='download'/></div>
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form_bg">
                  <div className="panel panel-default">
                    <div className="panel-heading"> Date & Time: {task.createdAt&&moment(task.createdAt).format('DD-MM-YYYY hh:mm:ss')} </div>
                    <div className="panel-body">
                      <p>Client: { task.client }</p>
                      <p>Community: {task.community.name}</p>
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading"> Attendees </div>
                    <div className="panel-body">
                      <ul className="users_list well well-sm">
                        {task.userInfo.map(function(user, index){
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
                  {renderActions()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
