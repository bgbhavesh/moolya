/**
 * Created by pankaj on 20/6/17.
 */
import React from 'react';
import MlAppScheduleHead from "../../commons/components/MlAppScheduleHead";
import {fetchTasksActionHandler} from '../actions/fetchTasks';


export default class MlAppTaskList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      tasks: []
    }
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

  onClickAdd(){
    let profileId = FlowRouter.getParam('profileId');
    FlowRouter.go('/app/calendar/manageSchedule/'+profileId+'/createTask');
  }

  render() {
    return (
      <div className="app_main_wrap" style={{'overflow':'auto'}}>
        <div className="app_padding_wrap">
          <MlAppScheduleHead type="task"/>
          <div className="col-lg-12">
            <div className="row">
              <div className="col-lg-2 col-md-4 col-sm-4">
                <a href="" onClick={()=>this.onClickAdd()}>
                  <div className="list_block notrans">
                    <div className="hex_outer"><span className="ml ml-plus "></span></div>
                    <h3>Add New</h3>
                  </div>
                </a>
              </div>
              { this.state.tasks.map(function (task, index) {
                return (
                  <div className="col-lg-2 col-md-4 col-sm-4" key={index}>
                    <div className="list_block img_list_block notrans">
                      <img src="/images/task_1.jpg"/>
                      <h3>{task.displayName}</h3>
                    </div>
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
