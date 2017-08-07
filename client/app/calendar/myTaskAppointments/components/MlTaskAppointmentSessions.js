// import NPM module(s)
import React, { Component } from 'react';
import  Select from 'react-select';
import FontAwesome from 'react-fontawesome';
import Datetime from "react-datetime";
import Moment from "moment";
import ScrollArea from 'react-scrollbar';
import MlAppTaskAppointmentUser from './MlAppTaskAppointmentUser';
import {
  fetchActivitiesTeamsActionHandler,
  getTeamUsersActionHandler,
  fetchOfficeActionHandler } from '../actions/MlAppointmentActionHandler';

export default class MlTaskAppointmentSessions extends Component{

  constructor(props) {
    super(props);
    this.state = {
      isSessionExpand: true,
      activities: [],
      isExternal: props.selectedTask.isExternal || false,
      isInternal: props.selectedTask.isInternal || false,
      offices : []
    };
    this.options = [
      {value: 'Weekly', label: 'Weekly'},
      {value: 'Daily', label: 'Daily'},
      {value: 'Monthly', label: 'Monthly'}
    ];
    this.setSession = this.setSession.bind(this);
  }

  componentWillMount() {
    this.getOffices();
  }

  componentDidMount() {
    // let mySwiper = new Swiper('.manage_tasks', {
    //   speed: 400,
    //   spaceBetween:20,
    //   slidesPerView:'auto',
    //   pagination: '.swiper-pagination',
    //   paginationClickable: true
    // });
  }

  /**
   * Method :: getUsers
   * Desc   :: fetch the users of current team
   * @returns Void
   */
  async getUsers(resp, index){
    let {isSessionExpand} = this.state;
    const that = this;
    let activities = resp || [];

    let activityTeams = activities.map((activity) => {
      activity.teams = activity.teams ? activity.teams : [];
      let teams = activity.teams.map(async function (team) {
        let response ;
          if(team.resourceType == "office") {
            response = await getTeamUsersActionHandler(team.resourceId);
          }
          return response;
      });
      return teams;
    });

    Promise.all(activityTeams.map(Promise.all, Promise)).then(values => {
      console.log(values);
      values.forEach(function (teams, index) {
        let teamsInfo = teams.map(function (users, userIndex) {
          let team = activities[index].teams[userIndex];
          let usersInfo = users.map(function (user) {
            let userInfo = {
              name: user.name,
              profileId: user.profileId,
              profileImage: user.profileImage,
              userId: user.userId
            };
            let isFind = team.users.find(function (teamUser){ return teamUser.profileId == user.profileId && teamUser.userId == user.userId });
            if(isFind) {
              userInfo.isAdded = true;
              userInfo.isMandatory = isFind.isMandatory;
            }
            return userInfo;
          });
          activities[index].teams[userIndex].users = usersInfo;
          return usersInfo;
        });
      });
      console.log(activities);
      that.setState({
        activities : activities,
        isSessionExpand: !isSessionExpand,
        index: index
      });
    });


    // console.log('activityTeams', activityTeams);

    //activities = activities.map(async (activity) => {
    //   let teams = await activity.teams && activity.teams.map(async function (team) {
    //     if(team.resourceType == "office") {
    //       const resp = await getTeamUsersActionHandler(team.resourceId);
    //       let users = resp.map(function (user) {
    //         let userInfo = {
    //           name: user.name,
    //           profileId: user.profileId,
    //           profileImage: user.profileImage,
    //           userId: user.userId
    //         };
    //         let isFind = team.users.find(function (teamUser){ return teamUser.profileId == user.profileId && teamUser.userId == user.userId });
    //         if(isFind) {
    //           userInfo.isAdded = true;
    //           userInfo.isMandatory = isFind.isMandatory;
    //         }
    //         return userInfo;
    //       });
    //       team.users = users;
    //       return team;
    //     } else {
    //       return team;
    //     }
    //   });
    //  return activity;
    //});

    /**
     * Resolve the promise
     */
    // Promise.all(activities).then(function(value) {
    //   console.log('----promise--', index);
    //   that.setState({
    //     activities : value,
    //     isSessionExpand: !isSessionExpand,
    //     index: index
    //   });
    // });

  }

  /**
   * Method :: getOffices
   * Desc   :: fetch the offices of user
   * @returns Void
   */
  async getOffices () {
    let response = await fetchOfficeActionHandler();
    if(response){
      this.setState({
        offices:response
      })
    }
  }

  /**
   * Method :: setSession
   * Desc :: expand the session for appointment
   */
  async setSession(index, sessionId) {
    const {isSessionExpand} = this.state;
    let {selectedTaskId} = this.props;
    const resp = await fetchActivitiesTeamsActionHandler(selectedTaskId, sessionId);
    if(resp){
      this.getUsers(resp, index);
    }
  }
  /**
   * Method :: getSessionList
   * Desc :: List of task session
   * @return XML
   */

  getSessionList() {
    let session = this.props.selectedTask.session;
    const sessionsList = session ? session.map((data, index) => {
      if(data) {
        return(
          <div onClick={() => this.setSession(index, data.sessionId)} className="panel panel-info" key={index}>
            <div className="panel-heading" style={{'paddingBottom': '30px'}}>
              <div className="col-md-2 nopadding-left">Session {index+1}</div>
              <div className="col-md-4">
                <div  style={{'marginTop':'-4px'}}>
                  <label>Duration: &nbsp;
                    <input type="text"
                           className="form-control inline_input"
                           value={data.duration.hours || 0}/> Hours
                    <input type="text"
                           className="form-control inline_input"
                           value={data.duration.minutes || 0}/> Mins
                  </label>
                </div>
              </div>
              <div className="col-md-4 col-lg-4 pull-right">
                <div  style={{'marginTop':'-4px'}}>
                  <div className="input_types">
                    <input id="slottime" type="checkbox" slottime="clone" value="1"
                           onClick={''} checked />
                    <label htmlFor="slottime"><span><span></span></span></label>
                  </div>
                  <label style={{'marginTop':'5px'}} htmlFor="fancy-checkbox-default">
                    22nd May 2017 11:16:30
                  </label>
                </div>
              </div>
            </div>
            <div className="panel-body">
              <div className="swiper-container manage_tasks">
                <div className="swiper-wrapper">
                  { data.activities && data.activities.map((activity, index) => {
                    return (
                      <div className="swiper-slide funding_list list_block notrans" key={index}>
                        <p className="online">{activity.mode}</p>
                        <span>Duration:</span><br />
                        <div className="form-group">
                          <label><input type="text" className="form-control inline_input"
                                        value={activity.duration.hours || 0} disabled /> Hours
                            <input type="text" className="form-control inline_input"
                                   value={activity.duration.minutes || 0} disabled /> Mins
                          </label>
                        </div>
                        <h3>{activity.displayName}</h3>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )
      }
    }) : [];
    return sessionsList;
  }
  /**
   * Method :: React render
   * Desc :: Showing html page
   * @returns {XML}
   */
  render() {
    let isSessionExpand = this.state.isSessionExpand;
    const {activities, index, isExternal, isInternal, offices} = this.state;
    console.log('-----123--', activities, index, isSessionExpand);
    return (
      <div className="step_form_wrap step1">
        <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
          <br/>
          {isSessionExpand ?
            <div className="panel panel-default">
              <div className="panel-body">
                {this.getSessionList()}
              </div>
            </div>
            :
            <MlAppTaskAppointmentUser activities={activities}
                                      index={index}
                                      isExternal={isExternal}
                                      isInternal={isInternal}
                                      offices={offices}/>
          }
        </ScrollArea>
      </div>
    )
  }
};

