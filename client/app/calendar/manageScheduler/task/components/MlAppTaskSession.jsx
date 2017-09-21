import React, { Component } from "react";
import { findTaskActionHandler } from "../actions/saveCalanderTask";
import MoolyaSelect from "../../../../commons/components/MlAppSelectWrapper";
import { fetchActivitiesActionHandler, fetchActivitiesForTaskActionHandler } from '../../activity/actions/activityActionHandler';
import _ from "lodash";
import Select from 'react-select';
import ScrollArea from "react-scrollbar";
var FontAwesome = require('react-fontawesome');

export default class MlAppTaskSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      sessionData: [
        { activities: [] }
      ],
      activities: []
    };
    this.findTaskDetails.bind(this);
    return this;
  }

  isUpdated() {
    return true;
  }

  componentWillMount() {
    this.fetchActivities();
    const resp = this.findTaskDetails();
    this.props.activeComponent(1);
    return resp;
  }

  async findTaskDetails() {
    let taskId = this.props.taskId
    var response = await findTaskActionHandler(taskId);
    if (response) {
      let userSession = _.range(response ? response.noOfSession : 0);
      console.log(userSession);
      let sessionData = [];
      _.each(userSession, function (item, value) {
        sessionData.push({
          duration: { hours: 0, minutes: 0 },
          activities: [],
          isOffline: false,
        });
      });

      if (response && !this.props.editMode) {
        this.setState({ loading: false, data: response, sessionData: sessionData });
      } else {
        if (_.isEmpty(response.session)) {
          this.setState({ loading: false, data: response, sessionData: sessionData });
        } else {
          let sessionEditData = _.cloneDeep(response.session);
          sessionEditData.forEach((session, index) => {
            if (session.activities && session.activities.length) {
              sessionEditData[index].isOffline = this.isOfflineSession(session.activities);
            } else {
              sessionEditData[index].isOffline = false;
            }
          });
          this.setState({ loading: false, data: response, sessionData: sessionEditData });
        }
      }
    }

    return response
  }

  isOfflineSession(activities) {
    let isOffline = true;
    if (!this.state.offlineActivites || !(activities && activities.length))
      return false;
    activities.forEach(a => {
      if (this.state.offlineActivites.indexOf(a) === -1) {
        isOffline = false;
      }
    });
    return isOffline;
  }

  async fetchActivities() {
    let profileId = this.props.profileId;
    let taskId = this.props.taskId;
    if (taskId) {
      let response = await fetchActivitiesForTaskActionHandler(taskId);
      // let response = await fetchActivitiesActionHandler(profileId);
      let offlineActivites = [];
      _.each(response, a => {
        if (a.mode !== "online")
          offlineActivites.push(a._id);
      });
      if (response) {
        this.setState({
          activities: response,
          offlineActivites
        });
      }
    }
  }


  handelBlur(id, e) {
    let name = e.target.name;
    var value = e.target.value
    let data = this.state.sessionData
    let cloneBackUp = _.cloneDeep(data);
    let specificData = cloneBackUp[id]
    specificData.duration[name] = value
    data.splice(id, 1);
    data.splice(id, 0, specificData);
    this.setState({ sessionData: data }, function () {
      this.sendSessionDataToParent()
      this.handelBlurCopy(id, name, value)
    })
  }

  handelBlurCopy(id, name, value) {
    let dataList = this.state.sessionData     // anotherlist for listing
    let cloneBackUpList = _.cloneDeep(dataList);
    let specificDataList = cloneBackUpList[id]
    specificDataList.duration[name] = value
    dataList.splice(id, 1);
    dataList.splice(id, 0, specificDataList);
    this.setState({ sessionData: dataList })
  }

  sendSessionDataToParent() {
    let data = _.cloneDeep(this.state.sessionData);
    this.props.getSessionDetails(data, this.state.activities, this.state.data.isExternal);
  }

  componentDidMount() {
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight - (300 + $('.app_header').outerHeight(true)));
  }

  initilizeSwiper() {
    setTimeout(function () {
      var mySwiper = new Swiper('.manage_tasks', {
        speed: 400,
        spaceBetween: 20,
        slidesPerView: 5,
        pagination: '.swiper-pagination',
        paginationClickable: true
      });
    }, 100);
  }

  addActivity(activity, index) {
    let sessionData = this.state.sessionData;
    // sessionData[index].activities = (new Array(sessionData[index].activities))[0];
    console.log(sessionData);
    const that = this;
    sessionData[index].activities.push(activity.value);
    sessionData[index].isOffline = this.isOfflineSession(sessionData[index].activities);
    let totalMinutes = sessionData[index].activities.reduce(function (sum, value) {
      let activity = that.state.activities.find(function (activity) {
        return activity._id == value;
      });
      activity.duration = activity.duration ? activity.duration : {};
      return sum + (activity.duration.hours ? activity.duration.hours : 0) * 60 + (activity.duration.minutes ? activity.duration.minutes : 0);
    }, 0);
    sessionData[index].duration = {
      hours: parseInt(totalMinutes / 60),
      minutes: totalMinutes % 60
    };
    this.setState({
      sessionData: sessionData
    }, function () {
      this.initilizeSwiper()
      this.sendSessionDataToParent();
    }.bind(this));
  }

  removeActivity(index, idx) {
    const that = this;
    let sessionData = this.state.sessionData;
    sessionData[index].activities.splice(idx, 1);
    sessionData[index].isOffline = this.isOfflineSession(sessionData[index].activities);
    let totalMinutes = sessionData[index].activities.reduce(function (sum, value) {
      let activity = that.state.activities.find(function (activity) {
        return activity._id == value;
      });
      activity.duration = activity.duration ? activity.duration : {};
      return sum + (activity.duration.hours ? activity.duration.hours : 0) * 60 + (activity.duration.minutes ? activity.duration.minutes : 0);
    }, 0);
    sessionData[index].duration = {
      hours: parseInt(totalMinutes / 60),
      minutes: totalMinutes % 60
    };
    this.setState({
      sessionData: sessionData
    }, function () {
      this.sendSessionDataToParent();
    }.bind(this));
  }

  render() {
    const that = this;
    let options = that.state.activities ? that.state.activities.map(function (activity) {
      return { value: activity._id, label: activity.displayName }
    }) : [];
    const showLoader = this.state.loading;
    return (
      <div className="step_form_wrap step1">
        {/*{showLoader === true ? ( <MlLoader/>) : (*/}
        <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
          <div className="form_bg">
            {this.state.sessionData.map(function (session, id) {
              return (
                <div className="panel panel-default" key={id}>
                  <div className="panel-heading">
                    <div className="col-md-3 nopadding-left">Session {id + 1} {session.isOffline ? '(Offline)' : ''}</div>
                    <div className="col-md-3">
                      <div style={{ 'marginTop': '-4px' }}>
                        <label>Duration: &nbsp; <input type="Number" key={session.duration ? 'snotLoadedYetHrs' : 'sloadedHrs'} className="form-control inline_input" name="hours" value={session.duration ? session.duration.hours : 0} onChange={that.handelBlur.bind(that, id)} min="0" /> Hours
                        <input
                            type="Number" className="form-control inline_input" key={session.duration ? 'snotLoadedYetMin' : 'sloadedMin'} name="minutes" value={session.duration ? session.duration.minutes : 0} onChange={that.handelBlur.bind(that, id)} min="0" /> Mins </label>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div style={{ 'marginTop': '-12px' }}>
                        <Select
                          name="activity-list"
                          placeholder={'Select activity'}
                          options={options.filter(function (activity) {
                            console.log(session.activities.indexOf(activity.value));
                            return session.activities.indexOf(activity.value) == -1;
                          })}
                          onChange={(value) => {
                            console.log(value);
                            console.log(`Id: ${id}`);
                            that.addActivity(value, id)
                          }
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-3"></div>
                    &nbsp;
                  {/*<span className="see-more pull-right"><a href=""><FontAwesome name='plus'/>Add</a></span>*/}
                  </div>
                  <div className="panel-body" >
                    <div className="swiper-container manage_tasks">
                      <div className="swiper-wrapper">
                        {session.activities.map(function (ss, idx) {
                          let activity = that.state.activities.find(function (activity) { return ss == activity._id; });
                          console.log(activity);
                          if (activity) {
                            return (
                              <div className="col-lg-2 col-md-4 col-sm-4 swiper-slide" key={idx}>
                                <div className="card_block"><h3>Name of the Task</h3>
                                  <div className="inactive"><FontAwesome onClick={() => that.removeActivity(id, idx)} name='minus' /></div>
                                  <div className="clearfix"></div>
                                  <div className="list_icon mart0">
                                    <span className="price">Rs. 18,500</span>
                                    <span className="price pull-right">4 Sessions</span>
                                    <div className="clearfix"></div>
                                    <i className="c_image ml my-ml-Ideator"></i>
                                    <div className="clearfix"></div>
                                    <span className="price"><div className="form-group">
                                      <label>
                                        <span key={activity.duration ? 'notLoadedYetHrs' : 'loadedHrs'} disabled="true" className="inline_input">{(activity.duration && activity.duration.hours) ? activity.duration.hours : 0}</span> Hours
                                <span key={activity.duration ? 'notLoadedYetMin' : 'loadedMin'} disabled="true"
                                          className="inline_input"> {(activity.duration && activity.duration.minutes) ? activity.duration.minutes : 0}</span>
                                        Mins
                              </label>
                                    </div></span>
                                    <button className="btn btn-danger pull-right">{activity.mode}</button>
                                  </div><div className="block_footer"><span> {activity.displayName} </span></div></div>
                              </div>
                            )
                          }
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
        {/*)}*/}
      </div>
    )
  }
};
{/*<div className="swiper-slide funding_list list_block notrans funding_list" key={idx}>*/ }

{/*<span className="block_del"><FontAwesome onClick={()=>that.removeActivity(id, idx)} name='minus'/></span>*/ }
{/*<p className="online">{activity.mode}</p>*/ }
{/*<span>Duration:*/ }
{/*</span><br />*/ }
{/*<div className="form-group">*/ }
{/*<label><input type="text" key={activity.duration ? 'notLoadedYetHrs' : 'loadedHrs'} disabled="true" className="form-control inline_input" defaultValue={(activity.duration && activity.duration.hours) ? activity.duration.hours:0}/> Hours <input*/ }
{/*type="text" key={activity.duration ? 'notLoadedYetMin' : 'loadedMin'} disabled="true"*/ }
{/*className="form-control inline_input" defaultValue={(activity.duration && activity.duration.minutes) ? activity.duration.minutes : 0 }/>*/ }
{/*Mins</label>*/ }
{/*</div>*/ }

{/*<h3>{activity.displayName}</h3>*/ }
{/*/!*<span onClick={()=>that.removeActivity(id, idx)} aria-hidden="true" className="fa fa-lock"></span>*!/*/ }

{/*</div>*/ }
