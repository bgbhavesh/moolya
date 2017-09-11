/**
 * Created by pankaj on 20/6/17.
 */
import React from "react";
import MlAppScheduleHead from "../../commons/components/MlAppScheduleHead";
import {fetchTasksActionHandler} from "../actions/fetchTasks";
import CDNImage from "../../../../../commons/components/CDNImage/CDNImage";

export default class MlAppTaskList extends React.Component{
  constructor(props){
    super(props);
    this.editTask.bind(this)
    this.state = {
      tasks: []
    }
    return this
  }
  componentDidMount() {
    this.fetchTasks();
  }
  async fetchTasks(){
    let profileId = FlowRouter.getParam('profileId');
    let response = await fetchTasksActionHandler(profileId);
    if(response){
      this.setState({
        tasks:response
      });
    }
  }

  editTask(taskId, SelectedprofileId){
    let profileId = this.props.profileId === "all" ? SelectedprofileId : this.props.profileId;
    FlowRouter.go('/app/calendar/manageSchedule/'+profileId+'/editTask/'+taskId)
  }

  onClickAdd(){
    let profileId = FlowRouter.getParam('profileId');
    FlowRouter.go('/app/calendar/manageSchedule/'+profileId+'/createTask');
  }

  render() {
    let that = this
    return (
      <div className="app_main_wrap" style={{'overflow':'auto'}}>
        <div className="app_padding_wrap">
          <MlAppScheduleHead type="task"/>
          <div className="col-lg-12">
            <div className="row">
              {that.props.profileId !== "all" ?<div className="col-lg-2 col-md-4 col-sm-4">
                <a href="" onClick={()=>this.onClickAdd()}>
                  <div className="list_block notrans">
                    <div className="hex_outer"><span className="ml ml-plus "></span></div>
                    <h3>Create a task</h3>
                  </div>
                </a>
              </div>: <div></div>}
              { this.state.tasks.map(function (task, index) {
                return (
                <div className="col-lg-2 col-md-4 col-sm-4" key={index}>
                  <div className="card_block"  onClick={()=>that.editTask(task.taskId, task.profileId)}><h3>{task.displayName}</h3>
                    <div className={task.isActive ? 'active' : 'inactive'}></div>
                    <div className="clearfix"></div>
                    <div className="list_icon mart0">
                      <span className="price">Rs. {(task.payment && task.payment.derivedAmount) ? task.payment.derivedAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") : '0.00'}</span>
                      <span className="price pull-right">{(task.isExternal && !task.isInternal? 'EXT' : (task.isInternal && !task.isExternal ? 'INT' : (task.isExternal && task.isInternal ? 'INT + EXT' : '')))}</span>
                      <div className="clearfix"></div>
                      <i className="c_image ml my-ml-Ideator"></i>
                      <div className="clearfix"></div>
                      <span className="price">{task.duration ? `${task.duration.hours ? task.duration.hours : 0} Hrs ${task.duration.minutes ? task.duration.minutes : 0} Mins` : ''}</span>
                      <span className="price pull-right">{`${task.noOfSession ? task.noOfSession : '0'} Sessions`}</span>
                    </div><div className="block_footer"><span>{task.isServiceCardEligible ? 'Service Cardeable' : 'Non-Service Cardeable'}</span></div></div>
                </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
};
