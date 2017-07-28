/**
 * Created by pankaj on 6/7/17.
 */
import React from 'react';
import {fetchInternalTask} from '../actions/fetchInternalTasks';

export default class MlAppInternalRejectTask extends React.Component{

  constructor(props){
    super(props);
    this.state={
      tasks:[]
    }
  }

  componentDidMount() {
    this.fetchTaskList();
  }
  async fetchTaskList() {
    let response = await fetchInternalTask(['rejected']);
    if(response){
      this.setState({
        tasks:response
      })
    };
  }
  render(){
    const that = this;
    return (
      <div>
        <div className="requested_input">
          <div className="col-lg-12" id="show">
            <div className="row">
              {that.state.tasks.map(function (task, index) {
                return (
                  <div className="col-lg-2 col-md-4 col-sm-4" key={index}>
                    <div className="list_block list_block_intrests notrans">
                      <div className="hex_outer"><img src="/images/valuation.png"/></div>
                      <div className="task-status pending"></div>
                      <h3>{task.name}</h3>
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

