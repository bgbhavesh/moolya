/**
 * Created by pankaj on 21/6/17.
 */
import React from 'react';
var FontAwesome = require('react-fontawesome');
import {fetchInternalTaskInfo} from '../actions/fetchInternalTaskInfo';
import {updateInternalTaskInfo} from '../actions/updateInternalTask';
import moment from "moment";
import MlAccordion from "../../commons/components/MlAccordion";
import formHandler from "../../../commons/containers/MlFormHandler";
import MlAppActionComponent from "../../commons/components/MlAppActionComponent";

class MlAppInternalTaskItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      taskInfo: {
        docs:[],
        userInfo:[],
        community:{}
      },
      taskId: ''
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
    let mySwiper = new Swiper('.conversation-slider', {
      speed: 400,
      spaceBetween:20,
      slidesPerView:3
    });

  }

  async fetchTaskInfo() {
    if(this.props.taskId){
      let response = await fetchInternalTaskInfo(this.props.taskId);
      console.log(response);
      if(response){
        response.attendees = response.attendees ? response.attendees : [];
        response.docs = response.docs ? response.docs : [];
        console.log('response', response)
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
      toastr.success('Successfully moved '+ status);
      // toastr.success('Task Updated Successfully');
      this.props.fetchTaskList();
    }
  }

  render(){
    let task = this.state.taskInfo;
    const that = this;
    /**
     * Setting up action handler for activity different event
     */
    let appActionConfig = [];
    if( task.status == 'pending') {
      appActionConfig = [
        {
          showAction: true,
          actionName: 'accept',
          handler: async(event) => that.props.handler(that.updateStatus.bind(this, 'accepted'))
        },
        {
          showAction: true,
          actionName: 'reject',
          handler: async(event) => that.props.handler(that.updateStatus.bind(this, 'rejected'))
        }
      ];
    } else if (task.status == 'accepted') {
      appActionConfig = [
        {
          showAction: true,
          actionName: 'start',
          handler: async(event) => that.props.handler(that.updateStatus.bind(this, 'started'))
        }
      ];
    } else if (task.status == 'started') {
      appActionConfig = [
        {
          showAction: true,
          actionName: 'complete',
          handler: async(event) => that.props.handler(that.updateStatus.bind(this, 'completed'))
        }
      ];
    } else if (task.status == 'rejected') {
      appActionConfig = [
        {
          showAction: true,
          actionName: 'accept',
          handler: async(event) => that.props.handler(that.updateStatus.bind(this, 'accepted'))
        }
      ];
    }
    export const genericPortfolioAccordionConfig = {
      id: 'portfolioAccordion',
      panelItems: [
        {
          'title': 'Actions',
          isText: false,
          style: {'background': '#ef4647'},
          contentComponent: <MlAppActionComponent
            resourceDetails={{resourceId: 'mytask', resourceType: 'mytask'}}   //resource id need to be given
            actionOptions={appActionConfig}/>
        }]
    };
    /*const renderActions = function () {
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
    };*/
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
                            {task.docs.map(function(doc) {
                              return(
                                <div className="swiper-slide">
                                  <a href={doc.fileUrl} target="_blank">
                                    <FontAwesome name='eye'/>
                                  </a>
                                  <a href={doc.fileUrl} download="FileName">
                                    <FontAwesome name='download'/>
                                  </a>
                                </div>
                              )
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
                      <p>Client: { this.props.client }</p>
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
                              <a href="">
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
                  {/*{renderActions()}*/}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {task.status !== 'completed' &&
            <MlAccordion accordionOptions={genericPortfolioAccordionConfig} {...this.props} />
          }
        </div>
      </div>
    )
  }

}

export default MlAppInternalTaskItem = formHandler()(MlAppInternalTaskItem);

