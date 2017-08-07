// import NPM module(s)
import React, { Component } from 'react';
import  Select from 'react-select';
import FontAwesome from 'react-fontawesome';
import Datetime from "react-datetime";
import Moment from "moment";
import ScrollArea from 'react-scrollbar';
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
    this.getSessionDetails = this.getSessionDetails.bind(this);
  }

  componentWillMount() {
    this.getOffices();
  }

  componentDidMount() {
    let mySwiper = new Swiper('.manage_tasks', {
      speed: 400,
      spaceBetween:20,
      slidesPerView:'auto',
      pagination: '.swiper-pagination',
      paginationClickable: true
    });
  }

  /**
   * Method :: getUsers
   * Desc   :: fetch the users of current team
   * @returns Void
   */
  async getUsers(){
    const that = this;

    let activities = this.state.activities;
    activities = activities.map(async (activity) => {
      let teams = await activity.teams && activity.teams.map(async function (team) {
        if(team.resourceType == "office") {
          const resp = await getTeamUsersActionHandler(team.resourceId);
          console.log('---user--', resp);
          let users = resp.map(function (user) {
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
          team.users = users;
        }
        return team;
      });
      activity.teams = teams;
      return activity;
    });

    /**
     * Resolve the promise
     */
    console.log('activities', activities);
    Promise.all(activities).then(function(value) {
      console.log('Values: ',value);
      that.setState({
        activities : value
      });
    });

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
    if (resp) {
      console.log('---resp--', resp);
      this.setState({
        activities: resp,
        isSessionExpand: !isSessionExpand,
        index: index
      }, () => {
        this.getUsers();
      })
    }
  }

  getSessionDetails() {
    const {activities} = this.state;
    const that = this;
    console.log('----activities--', activities);
    return (
      <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
        <div className="col-md-12 nopadding-left">
          <div className="form_bg">
            <form>
              <div className="form-group">
                <label>{`Session ${this.state.index + 1}`}</label>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6 pull-right">
          <div className="form_bg">
            <form>
              <div className="form-group">
                <label>Time: &nbsp;
                  <input type="text"
                         className="form-control inline_input"
                         disabled={true}
                         value={1}  /> Hours
                  <input type="text"
                         className="form-control inline_input"
                         disabled={true}
                         value={2}  /> Mins
                </label>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-12 nopadding-right">
          <div className="form_bg">
            <form>
              {activities && activities.map((activity) => {
                return (
                  <div>
                    <div className="col-md-5">
                      <div className="form-group">
                        <label>Activity Name</label>
                        <input type="text"
                               placeholder="Activity Name"
                               className="form-control float-label"
                               id="name"
                               defaultValue={activity.name} />
                      </div>
                    </div>
                    <br/>
                    <div className="form-group pull-right">
                      <label>Time: &nbsp;
                        <input type="text"
                               className="form-control inline_input"
                               disabled={true}
                               defaultValue={activity.duration && activity.duration.hours} /> Hours
                        <input type="text"
                               className="form-control inline_input"
                               disabled={true}
                               defaultValue={activity.duration && activity.duration.minutes} /> Mins
                      </label>
                    </div>
                    <br className="brclear" />Attendees<br className="brclear" />
                    {
                      activity.teams && activity.teams.map(function (team, index) {
                        return (
                          <div className="col-md-12 pull-left" key={index}>
                            <div className="panel panel-default library-wrap">
                              <div className="panel-body nopadding">
                                <br className="brclear" />
                                <form>
                                  <div className="col-md-4">
                                    <div className="form-group">
                                      <span className="placeHolder active">Choose team Type</span>
                                      <select defaultValue="chooseTeam" value={ team.resourceType == 'office' && team.resourceId ? team.resourceId : team.resourceType } className="form-control" onChange={(evt)=>that.chooseTeamType(evt, index)}>
                                        <option value="chooseTeam" disabled="disabled">Choose team Type</option>
                                        <option value="connections">My Connections</option>
                                        <option hidden={!that.state.isExternal} disabled={!that.state.isExternal} value="moolyaAdmins">Moolya Admins</option>
                                        {that.state.offices.map(function (office , index) {
                                          return <option key={index} hidden={!that.state.isInternal} disabled={!that.state.isInternal} value={office._id}>{ office.officeName + " - " + office.branchType }</option>
                                        })}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-md-8 att_members">
                                    <ul className="users_list">
                                      {team.users.map(function (user, userIndex) {
                                        return (
                                          <li key={userIndex}>
                                            <a href="">
                                              <img src={user.profileImage ? user.profileImage : "/images/def_profile.png"} /><br />
                                              <div className="tooltiprefer">
                                                <span>{user.name}</span>
                                              </div>
                                              <span className="member_status" onClick={() => that.addUser(index, userIndex)}>
                      { user.isAdded ? <FontAwesome name="check" /> : <FontAwesome name="plus" /> }
                    </span>
                                            </a>
                                            <div className="input_types">
                                              <br />
                                              <input id={"mandatory"+index+userIndex} checked={ user.isMandatory ? true : false } name="Mandatory" type="checkbox" value="Mandatory" onChange={(evt)=>that.updateIsMandatory(evt, index, userIndex)} />
                                              <label htmlFor={"mandatory"+index+userIndex}>
                                                <span><span></span></span>
                                                Mandatory
                                              </label>
                                            </div>
                                          </li>
                                        )
                                      })}
                                    </ul>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
              }
            </form>
            {/* Attandees*/}
          </div>
        </div>
        <br className="brclear"/>
      </ScrollArea>
    )
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
            <div>{this.getSessionDetails()}</div>
          }
        </ScrollArea>
      </div>
    )
  }
};

