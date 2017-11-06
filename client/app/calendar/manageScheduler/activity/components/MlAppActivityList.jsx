/**
 * Created by pankaj on 19/6/17.
 */
import React from 'react';
import MlAppScheduleHead from "../../commons/components/MlAppScheduleHead";
import {fetchActivitiesActionHandler} from '../actions/activityActionHandler';

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
    let profileId = FlowRouter.getParam('profileId') ;
    FlowRouter.go('/app/calendar/manageSchedule/'+profileId+'/createActivity');
  }

  editMode(id, selectedProfileId) {
    let profileId = FlowRouter.getParam('profileId')=== "all" ? selectedProfileId : FlowRouter.getParam('profileId')  ;
    FlowRouter.go('/app/calendar/manageSchedule/'+profileId+'/editActivity?id='+id);
  }

  fetchAllActivity() {
    this.fetchActivities();
  }

  render(){
    let profileId = FlowRouter.getParam('profileId');
    let that = this;
    return (
      <div className="app_main_wrap" style={{'overflow':'auto'}}>
        <div className="app_padding_wrap">
          <MlAppScheduleHead fetchAllActivity={that.fetchAllActivity.bind(that)}type="activity"/>
          <div className="col-lg-12" id="show">
            <div className="row">
              {profileId !== "all" ? <div className="col-lg-2 col-md-4 col-sm-4">
                <div className="card_block">
                <a href=" " onClick={() => that.addActivity()}>
                  <div className="add_task">
                    <div><span className="ml ml-plus "></span></div>
                    <div className="block_footer"><span>Create an activity</span></div>
                  </div>
                </a>
                </div>
              </div>: <div></div> }

              {this.state.activities.map(function (activity, index) {
                return (
                <div className="col-lg-2 col-md-4 col-sm-4" key={index}>
                  <div className="card_block" onClick={()=>that.editMode(activity._id, activity.profileId)}><h3>{activity.displayName}</h3>
                    <div className={activity.isActive ? 'active' : 'inactive'}></div>
                    <div className="clearfix"></div>
                    <div className="list_icon mart0">
                      <span className="price">Rs. {(activity.payment && activity.payment.derivedAmount) ? activity.payment.derivedAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") : '0.00'}</span>
                      <span className="price pull-right">{(activity.isExternal && !activity.isInternal? 'EXT' : (activity.isInternal && !activity.isExternal ? 'INT' : (activity.isExternal && activity.isInternal ? 'INT + EXT' : '')))}</span>
                      <div className="clearfix"></div>
                      {activity.imageLink ?
                        <img className="c_image" src={activity.imageLink ? activity.imageLink : "/images/activity_1.jpg"}/>
                        : <i className="c_image ml my-ml-activity"></i>
                      }
                      <div className="clearfix"></div>
                      <span className="price">{activity.duration ? `${activity.duration.hours ? activity.duration.hours : 0} Hrs ${activity.duration.minutes ? activity.duration.minutes : 0} Mins` : ''}</span>
                      <button className={`btn ${activity.mode === 'online' ? 'btn-danger' : 'btn-success'} pull-right`}>{activity.mode}</button>
                    </div><div className="block_footer"><span>{activity.isServiceCardEligible ? 'Service Cardeable' : 'Non-Service Cardeable'}</span></div></div>
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
