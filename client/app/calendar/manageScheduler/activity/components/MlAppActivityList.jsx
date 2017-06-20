/**
 * Created by pankaj on 19/6/17.
 */
import React from 'react';
import MlAppScheduleHead from "../../commons/components/MlAppScheduleHead";
import {fetchActivitiesActionHandler} from '../actions/fetchActivities';

export default class MlAppActivityList extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      activities:[]
    }
  }

  componentWillMount(){
    this.fetchActivities();
  }
  async fetchActivities(){
    let profileId = FlowRouter.getParam('profileId');
    let response = await fetchActivitiesActionHandler(profileId);
    if(response){
      this.setState({
        activities:response
      });
    }
  }
  addActivity() {
    let profileId = FlowRouter.getParam('profileId');
    console.log(profileId)
    FlowRouter.go('/app/calendar/manageSchedule/'+profileId+'/createActivity');
  }

  render(){
    return (
      <div className="app_main_wrap" style={{'overflow':'auto'}}>
        <div className="app_padding_wrap">
          <MlAppScheduleHead type="activity"/>
          <div className="col-lg-12" id="show">
            <div className="row">
              <div className="col-lg-2 col-md-4 col-sm-4">
                <a href=" " onClick={() => this.addActivity()}>
                  <div className="list_block notrans">
                    <div className="hex_outer"><span className="ml ml-plus "></span></div>
                    <h3>Add New</h3>
                  </div>
                </a>
              </div>

              {this.state.activities.map(function (actvity, index) {
                return (
                  <div className="col-lg-2 col-md-4 col-sm-4" key={index}>
                    <div className="list_block img_list_block notrans">
                      <img src={actvity.imageLink ? actvity.imageLink : "/images/activity_1.jpg"}/>
                      <h3>{actvity.displayName}</h3>
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
