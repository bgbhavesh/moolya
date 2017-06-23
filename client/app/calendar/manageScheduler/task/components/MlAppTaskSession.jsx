import React, {Component} from "react";
import {render} from "react-dom";
import gql from "graphql-tag";
import ScrollArea from "react-scrollbar";
import {findTaskActionHandler} from "../actions/saveCalanderTask";
import MoolyaSelect from "../../../../../commons/components/select/MoolyaSelect";
import _ from "lodash";
// import {fetchActivitiesActionHandler} from "../../activity/actions/fetchActivities";
var FontAwesome = require('react-fontawesome');


export default class MlAppTaskSession extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, sessionData: [], sessionDataList:[]};
    this.findTaskDetails.bind(this);
    return this;
  }

  componentWillMount() {
    const resp = this.findTaskDetails();
    return resp;
  }

  async findTaskDetails() {
    let taskId = this.props.taskId
    var response = await findTaskActionHandler(taskId);
    if(response){
      let userSession = _.range(response ? response.noOfSession : 0)
      let obj = {
        duration: {hours: 0,minutes: 0},
        activities: []
      }
      let sessionData = []
      _.each(userSession, function (item, value) {
        sessionData.push(obj)
      })

      if (response && !this.props.editMode) {
        this.setState({loading: false, sessionData: sessionData, sessionDataList:sessionData});
      }else{
        if(_.isEmpty(response.session)){
          this.setState({loading: false, sessionData: sessionData, sessionDataList:sessionData});
        }else {
          this.setState({loading: false, sessionData: response.session, sessionDataList:response.session});
        }
      }
    }
    return response
  }

  // async fetchActivities() {
  //   let profileId = this.props.profileId;
  //   let response = await fetchActivitiesActionHandler(profileId);
  //   console.log(response)
  //   this.setState({activities: response});
  //   return response
  // }

  optionsBySelectActivity(id, selectedValue, callback, selObject) {
    let data = this.state.sessionData
    let cloneBackUp = _.cloneDeep(data);
    let specificData = cloneBackUp[id]
    specificData.activities = _.uniq(selectedValue)
    data.splice(id, 1);
    data.splice(id, 0, specificData);
    this.setState({sessionData: data}, function () {
      this.sendSessionDataToParent();
      this.copyToListActivity(id,selObject)
    })
  }

  copyToListActivity(id, selObject) {
    let dataList = this.state.sessionDataList  //for list of activities proceed to list view
    let cloneBackUpList = _.cloneDeep(dataList);
    let specificDataList = cloneBackUpList[id]
    specificDataList.activities = selObject
    dataList.splice(id, 1);
    dataList.splice(id, 0, specificDataList);
    this.setState({sessionDataList: dataList})
  }

  handelBlur(id, e){
    let name = e.target.name;
    let data = this.state.sessionData
    let cloneBackUp = _.cloneDeep(data);
    let specificData = cloneBackUp[id]
    specificData.duration[name] = e.target.value
    data.splice(id, 1);
    data.splice(id, 0, specificData);
    this.setState({sessionData: data}, function () {
      this.sendSessionDataToParent()
      this.handelBlurCopy(id,name, e.target.value)
    })
  }

  handelBlurCopy(id, name, value){
    let dataList = this.state.sessionDataList     // anotherlist for listing
    let cloneBackUpList = _.cloneDeep(dataList);
    let specificDataList = cloneBackUpList[id]
    specificDataList.duration[name] = value
    dataList.splice(id, 1);
    dataList.splice(id, 0, specificDataList);
    this.setState({sessionDataList: dataList})
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

  render() {

    let that = this
    let profileId = this.props.profileId
    let queryOptions = {
      options: {
        variables: {
          profileId: profileId
        }
      }
    };
    let query = gql`query($profileId:String) {
      data: fetchActivities(profileId: $profileId) {
        value:_id
        label: displayName
        imageLink
        mode
        duration {
          hours
          minutes
        }
      }
    }`;
    const showLoader = this.state.loading;
    return (
      <div className="step_form_wrap step1">
        {/*{showLoader === true ? ( <MlLoader/>) : (*/}
          <ScrollArea speed={0.8} className="step_form_wrap" smoothScrolling={true} default={true}>
          <div className="form_bg">
          {this.state.sessionDataList.map(function (session, id) {
            return (
              <div className="panel panel-default" key={id}>
                <div className="panel-heading">
                  <div className="col-md-3 nopadding-left">Section 1</div>
                  <div className="col-md-3">
                    <div style={{'marginTop': '-4px'}}>
                      <label>Duration: &nbsp; <input type="Number" defaultValue={session.duration?session.duration.hours:0} className="form-control inline_input" name="hours" min="0" onBlur={that.handelBlur.bind(that,id)}/> Hours
                        <input
                          type="Number" className="form-control inline_input" defaultValue={session.duration?session.duration.minutes:0} name="minutes" onBlur={that.handelBlur.bind(that,id)} min="0"/> Mins </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div style={{'marginTop': '-12px'}}>
                      <MoolyaSelect multiSelect={true} className="form-control float-label"
                                    valueKey={'value'}
                                    labelKey={'label'} queryType={"graphql"} query={query}
                                    queryOptions={queryOptions} isDynamic={true} placeholder="Select Activity"
                                    onSelect={that.optionsBySelectActivity.bind(that, id)}
                                    selectedValue={session.activities}
                      />
                    </div>
                  </div>
                  <div className="col-md-3"></div>
                  &nbsp;
                  {/*<span className="see-more pull-right"><a href=""><FontAwesome name='plus'/>Add</a></span>*/}
                </div>
                {session.activities.map(function (ss,idx) {
                  return(
                    <div className="panel-body" key={idx}>
                      <div className="swiper-container blocks_in_form">
                        <div className="swiper-wrapper">
                          <div className="swiper-slide">
                            <div className="list_block notrans funding_list">
                              <div>
                                <p className="online">{ss.mode}</p>
                                <span>Duration: <FontAwesome name='pencil'/></span><br />
                                <div className="form-group">
                                  <label><input type="text" className="form-control inline_input" defaultValue={ss.duration?ss.duration.hours:0}/> Hours <input
                                    type="text"
                                    className="form-control inline_input" defaultValue={ss.duration?ss.duration.minutes:0}/>
                                    Minutes</label>
                                </div>

                              </div>
                              <h3>{ss.label}</h3>
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
