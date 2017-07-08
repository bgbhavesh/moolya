import React, {Component} from "react";
import gql from "graphql-tag";
import {findTaskActionHandler} from "../actions/saveCalanderTask";
import MoolyaSelect from "../../../../../commons/components/select/MoolyaSelect";
import {fetchActivitiesActionHandler} from '../../activity/actions/activityActionHandler';
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
        {activities:[]}
      ],
      activities: []
    };
    this.findTaskDetails.bind(this);
    return this;
  }

  componentWillMount() {
    this.fetchActivities();
    const resp = this.findTaskDetails();
    return resp;
  }

  async findTaskDetails() {
    let taskId = this.props.taskId
    var response = await findTaskActionHandler(taskId);
    if(response){
      let userSession = _.range(response ? response.noOfSession : 0);
      console.log(userSession);
      let sessionData = [];
      _.each(userSession, function (item, value) {
        sessionData.push({
          duration: {hours: 0,minutes: 0},
          activities: []
        });
      });

      if (response && !this.props.editMode) {
        this.setState({loading: false,data:response, sessionData: sessionData });
      }else{
        if(_.isEmpty(response.session)){
          this.setState({loading: false,data:response, sessionData: sessionData });
        }else {
          let sessionEditData = _.cloneDeep(response.session);
          this.setState({loading: false,data:response, sessionData: sessionEditData });
        }
      }
    }

    return response
  }

  async fetchActivities() {
    let profileId = this.props.profileId;
    let response = await fetchActivitiesActionHandler(profileId);
    if(response){
      this.setState({
        activities: response
      });
    }
  }


  handelBlur(id, e){
    let name = e.target.name;
    var value = e.target.value
    let data = this.state.sessionData
    let cloneBackUp = _.cloneDeep(data);
    let specificData = cloneBackUp[id]
    specificData.duration[name] = value
    data.splice(id, 1);
    data.splice(id, 0, specificData);
    this.setState({sessionData: data}, function () {
      this.sendSessionDataToParent()
      this.handelBlurCopy(id,name, value)
    })
  }

  handelBlurCopy(id, name, value){
    let dataList = this.state.sessionData     // anotherlist for listing
    let cloneBackUpList = _.cloneDeep(dataList);
    let specificDataList = cloneBackUpList[id]
    specificDataList.duration[name] = value
    dataList.splice(id, 1);
    dataList.splice(id, 0, specificDataList);
    this.setState({sessionData: dataList})
  }

  sendSessionDataToParent() {
    let data = _.cloneDeep(this.state.sessionData);
    this.props.getSessionDetails(data);
  }

  componentDidMount() {
    var mySwiper = new Swiper('.blocks_in_form', {
      speed: 400,
      spaceBetween: 20,
      slidesPerView: 5,
      pagination: '.swiper-pagination',
      paginationClickable: true
    });
    $('.float-label').jvFloat();
    var WinHeight = $(window).height();
    $('.step_form_wrap').height(WinHeight - (310 + $('.admin_header').outerHeight(true)));
  }

  addActivity(activity, index) {
    let sessionData = this.state.sessionData;
    // sessionData[index].activities = (new Array(sessionData[index].activities))[0];
    console.log(sessionData);
    const that = this;
    sessionData[index].activities.push(activity.value);
    let totalMinutes = sessionData[index].activities.reduce(function(sum, value) {
      let activity = that.state.activities.find(function (activity) {
        return activity._id == value;
      });
      activity.duration = activity.duration ? activity.duration : {};
      return sum + (activity.duration.hours ? activity.duration.hours : 0)*60 + ( activity.duration.minutes ? activity.duration.minutes : 0 ) ;
    }, 0);
    sessionData[index].duration = {
      hours: parseInt(totalMinutes/60),
      minutes: totalMinutes % 60
    };
    this.setState({
      sessionData: sessionData
    }, function () {
      this.sendSessionDataToParent();
    }.bind(this));
  }

  removeActivity(index, idx) {
    let sessionData = this.state.sessionData;
    sessionData[index].activities.splice(idx, 1);
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
                  <div className="col-md-3 nopadding-left">Session {id+1}</div>
                  <div className="col-md-3">
                    <div style={{'marginTop': '-4px'}}>
                      <label>Duration: &nbsp; <input type="Number" key={session.duration ? 'snotLoadedYetHrs' : 'sloadedHrs'} className="form-control inline_input" name="hours" value={session.duration?session.duration.hours:0} onChange={that.handelBlur.bind(that,id)} min="0"/> Hours
                        <input
                          type="Number" className="form-control inline_input" key={session.duration ? 'snotLoadedYetMin' : 'sloadedMin'} name="minutes" value={session.duration?session.duration.minutes:0} onChange={that.handelBlur.bind(that,id)} min="0"/> Mins </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div style={{'marginTop': '-12px'}}>
                      <Select
                        name="activity-list"
                        options={options.filter(function (activity) {
                          console.log(session.activities.indexOf(activity.value));
                          return session.activities.indexOf(activity.value) == -1;
                        })}
                        onChange={(value) => that.addActivity(value, id)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3"></div>
                  &nbsp;
                  {/*<span className="see-more pull-right"><a href=""><FontAwesome name='plus'/>Add</a></span>*/}
                </div>
                {session.activities.map(function (ss,idx) {
                  let activity = that.state.activities.find(function (activity) { return ss == activity._id; });
                  console.log(activity);
                  return(
                    <div className="panel-body" key={idx}>
                      <div className="swiper-container blocks_in_form">
                        <div className="swiper-wrapper">
                          <div className="swiper-slide">
                            <div className="list_block notrans funding_list">
                              <div>
                                <p className="online">{activity.mode}</p>
                                <span>Duration:
                                  {/*<FontAwesome name='pencil'/>*/}
                                </span><br />
                                <div className="form-group">
                                  <label><input type="text" key={activity.duration ? 'notLoadedYetHrs' : 'loadedHrs'} disabled="true" className="form-control inline_input" defaultValue={activity.duration ? activity.duration.hours:0}/> Hours <input
                                    type="text" key={activity.duration ? 'notLoadedYetMin' : 'loadedMin'} disabled="true"
                                    className="form-control inline_input" defaultValue={activity.duration ? activity.duration.minutes : 0 }/>
                                    Minutes</label>
                                </div>
                              </div>
                              <h3>{activity.displayName}</h3>
                              {/*<span onClick={()=>that.removeActivity(id, idx)} aria-hidden="true" className="fa fa-lock"></span>*/}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
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
